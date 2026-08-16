import { ref, readonly } from "vue"

export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

// 輔助函式：設定 Promise 逾時保護，避免 LINE SDK bridge 卡住無限等待
function withTimeout<T>(promise: Promise<T>, timeoutMs: number, errorMsg: string): Promise<T> {
  let timer: any = null
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new Error(errorMsg))
    }, timeoutMs)
  })

  return Promise.race([promise, timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer)
  })
}

// 全域共享狀態
const isInitialized = ref(false)
const initializedLiffId = ref<string | null>(null)
const isInitializing = ref(false)
const isReady = ref(false)
const isLoggedIn = ref(false)
const isInClient = ref(false)
const profile = ref<LiffProfile | null>(null)
const initError = ref<string | null>(null)
const liffInstance = ref<any>(null)

export function useLiff() {
  const config = useRuntimeConfig()
  const defaultLiffId = (config.public.liffId as string) || ""

  /**
   * 初始化 LIFF SDK (僅在 client 端執行)
   */
  async function init(customLiffId?: string, force = false) {
    if (import.meta.server) return
    const targetLiffId = customLiffId || defaultLiffId

    // 若已成功初始化且同一個 LIFF ID 且已有個人資料，無需重複執行
    if (!force && isInitialized.value && initializedLiffId.value === targetLiffId && profile.value) {
      return
    }

    if (!targetLiffId) {
      console.warn("[LIFF] LIFF ID 未設定，跳過 LIFF 初始化")
      return
    }

    isInitializing.value = true
    initError.value = null

    try {
      // 動態引入 @line/liff 避免 SSR 報錯
      const liffModule = await import("@line/liff")
      const liff = liffModule.default || liffModule

      liffInstance.value = liff

      // 設定 6 秒超時保護，避免在 LINE 內建瀏覽器或特定環境下 bridge 握手無回應
      await withTimeout(
        liff.init({ liffId: targetLiffId }),
        6000,
        "LINE 授權連線逾時，可能因為非透過 LIFF 專屬連結開啟"
      )

      initializedLiffId.value = targetLiffId
      isInitialized.value = true
      isReady.value = true
      isInClient.value = liff.isInClient()
      isLoggedIn.value = liff.isLoggedIn()

      if (liff.isLoggedIn()) {
        try {
          // 取得用戶 Profile (4 秒逾時保護)
          const userProfile = await withTimeout(
            liff.getProfile(),
            4000,
            "取得 LINE 個人資料逾時"
          )
          profile.value = {
            userId: userProfile.userId,
            displayName: userProfile.displayName,
            pictureUrl: userProfile.pictureUrl,
            statusMessage: userProfile.statusMessage,
          }
        } catch (profileErr: any) {
          console.warn("[LIFF] 取得個人資料失敗，嘗試從 ID Token 或 Context 取得:", profileErr)
          const decoded = typeof liff.getDecodedIDToken === "function" ? liff.getDecodedIDToken() : null
          const context = typeof liff.getContext === "function" ? liff.getContext() : null
          const fallbackUserId = (decoded as any)?.sub || (context as any)?.userId || ""
          if (fallbackUserId) {
            profile.value = {
              userId: fallbackUserId,
              displayName: (decoded as any)?.name || "LINE 用戶",
              pictureUrl: (decoded as any)?.picture,
            }
          } else {
            initError.value = "無法取得 LINE 授權身分，請嘗試重新登入"
          }
        }
      }
    } catch (err: any) {
      console.error("[LIFF] 初始化失敗:", err)
      initError.value = err?.message || "LIFF 初始化失敗"
      
      // 嘗試從 Context 或 Token 撈取備份資料
      try {
        if (liffInstance.value) {
          const context = typeof liffInstance.value.getContext === "function" ? liffInstance.value.getContext() : null
          const fallbackUserId = (context as any)?.userId || ""
          if (fallbackUserId) {
            profile.value = {
              userId: fallbackUserId,
              displayName: "LINE 用戶",
            }
            initError.value = null
          }
        }
      } catch (e) {
        // 忽略
      }
    } finally {
      isInitializing.value = false
    }
  }

  /**
   * 觸發 LINE 登入 (外部瀏覽器跳轉)
   */
  function login(redirectUri?: string) {
    if (!liffInstance.value) {
      console.warn("[LIFF] 尚未載入 SDK，嘗試直接跳轉")
      if (typeof window !== "undefined") {
        window.location.reload()
      }
      return
    }
    const targetUri = redirectUri || (typeof window !== "undefined" ? window.location.href : undefined)
    liffInstance.value.login(targetUri ? { redirectUri: targetUri } : undefined)
  }

  /**
   * 登出 LINE
   */
  function logout() {
    if (!liffInstance.value) return
    if (liffInstance.value.isLoggedIn()) {
      liffInstance.value.logout()
      isLoggedIn.value = false
      profile.value = null
    }
  }

  /**
   * 關閉當前 LIFF 視窗返回 LINE 聊天室
   */
  function closeWindow() {
    if (liffInstance.value && liffInstance.value.isInClient()) {
      liffInstance.value.closeWindow()
    }
  }

  /**
   * 本地儲存電話號碼（與 LINE 帳號連動快取）
   */
  function savePhone(phone: string) {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem("kse_booking_phone", phone)
      if (profile.value?.userId) {
        localStorage.setItem(`kse_phone_${profile.value.userId}`, phone)
      }
    } catch (e) {
      console.warn("無法存取 localStorage:", e)
    }
  }

  /**
   * 取得本地儲存之手機號碼
   */
  function getSavedPhone(): string {
    if (typeof window === "undefined") return ""
    try {
      if (profile.value?.userId) {
        const linePhone = localStorage.getItem(`kse_phone_${profile.value.userId}`)
        if (linePhone) return linePhone
      }
      return localStorage.getItem("kse_booking_phone") || ""
    } catch (e) {
      return ""
    }
  }

  return {
    isInitialized: readonly(isInitialized),
    isInitializing: readonly(isInitializing),
    isReady: readonly(isReady),
    isLoggedIn: readonly(isLoggedIn),
    isInClient: readonly(isInClient),
    profile: readonly(profile),
    initError: readonly(initError),
    init,
    login,
    logout,
    closeWindow,
    savePhone,
    getSavedPhone,
  }
}

