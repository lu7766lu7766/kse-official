import { ref, readonly } from "vue"

export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
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
  /**
   * 初始化 LIFF SDK (僅在 client 端執行)
   */
  async function init(targetLiffId: string) {
    if (import.meta.server) return

    if (isInitialized.value && initializedLiffId.value === targetLiffId) return
    if (isInitializing.value) return

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

      await liff.init({ liffId: targetLiffId })

      initializedLiffId.value = targetLiffId

      isInitialized.value = true
      isReady.value = true
      isInClient.value = liff.isInClient()
      isLoggedIn.value = liff.isLoggedIn()

      if (liff.isLoggedIn()) {
        // 還原登入前之 URL 狀態
        if (typeof window !== "undefined") {
          try {
            const preLoginUrl = sessionStorage.getItem("kse_pre_login_url")
            if (preLoginUrl) {
              sessionStorage.removeItem("kse_pre_login_url")
              if (preLoginUrl !== window.location.href && preLoginUrl.startsWith(window.location.origin)) {
                window.history.replaceState(null, "", preLoginUrl)
              }
            }
          } catch (e) {}
        }

        try {
          const userProfile = await liff.getProfile()
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
          }
        }
      }
    } catch (err: any) {
      console.error("[LIFF] 初始化失敗:", err)
      initError.value = err?.message || "LIFF 初始化失敗"
    } finally {
      isInitializing.value = false
    }
  }

  /**
   * 觸發 LINE 登入 (外部瀏覽器跳轉)
   */
  function login(customRedirectUri?: string) {
    if (!liffInstance.value) {
      console.warn("[LIFF] 尚未初始化，無法執行登入")
      return
    }

    if (typeof window !== "undefined") {
      try {
        sessionStorage.setItem("kse_pre_login_url", window.location.href)
      } catch (e) {}
    }

    // 預設帶入當前環境之純淨重定向網址 (無 query/hash)
    const targetRedirectUri =
      customRedirectUri ||
      (typeof window !== "undefined"
        ? window.location.origin + window.location.pathname
        : undefined)

    if (targetRedirectUri) {
      try {
        liffInstance.value.login({ redirectUri: targetRedirectUri })
        return
      } catch (err) {
        console.warn("[LIFF] 帶 redirectUri 登入失敗，降級預設登入:", err)
      }
    }

    liffInstance.value.login()
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
   * 登出並更換 LINE 帳號
   */
  function switchAccount() {
    logout()
    login()
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
    switchAccount,
    closeWindow,
    savePhone,
    getSavedPhone,
  }
}
