import { ref, readonly } from "vue"
import type { AppointmentRecord } from "~/composables/useBookingApi"
import { BRAND } from "~/utils/site-data"

export interface LiffProfile {
  userId: string
  displayName: string
  pictureUrl?: string
  statusMessage?: string
}

// 全域共享狀態
const isInitialized = ref(false)
const isInitializing = ref(false)
const isReady = ref(false)
const isLoggedIn = ref(false)
const isInClient = ref(false)
const profile = ref<LiffProfile | null>(null)
const initError = ref<string | null>(null)
const liffInstance = ref<any>(null)

export function useLiff() {
  const config = useRuntimeConfig()
  const liffId = (config.public.liffId as string) || ""

  /**
   * 初始化 LIFF SDK (僅在 client 端執行)
   */
  async function init() {
    if (import.meta.server) return
    if (isInitialized.value || isInitializing.value) return

    if (!liffId) {
      console.warn("[LIFF] NUXT_PUBLIC_LIFF_ID 未設定，跳過 LIFF 初始化")
      return
    }

    isInitializing.value = true
    initError.value = null

    try {
      // 動態引入 @line/liff 避免 SSR 報錯
      const liffModule = await import("@line/liff")
      const liff = liffModule.default || liffModule

      liffInstance.value = liff

      await liff.init({ liffId })

      isInitialized.value = true
      isReady.value = true
      isInClient.value = liff.isInClient()
      isLoggedIn.value = liff.isLoggedIn()

      if (liff.isLoggedIn()) {
        try {
          const userProfile = await liff.getProfile()
          profile.value = {
            userId: userProfile.userId,
            displayName: userProfile.displayName,
            pictureUrl: userProfile.pictureUrl,
            statusMessage: userProfile.statusMessage,
          }
        } catch (profileErr: any) {
          console.warn("[LIFF] 取得個人資料失敗:", profileErr)
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
  function login(redirectUri?: string) {
    if (!liffInstance.value) {
      console.warn("[LIFF] 尚未初始化，無法執行登入")
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
   * 建立預約成功的 Flex Message 結構
   */
  function buildBookingFlexMessage(appointment: AppointmentRecord) {
    const timeDisplay = appointment.end_at
      ? `${appointment.start_at} - ${appointment.end_at.split(" ")[1] || ""}`
      : appointment.start_at

    return {
      type: "bubble",
      size: "mega",
      header: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#09090b",
        paddingTop: "20px",
        paddingBottom: "16px",
        paddingStart: "20px",
        paddingEnd: "20px",
        contents: [
          {
            type: "text",
            text: "KSE 美式筋膜放鬆教室",
            weight: "bold",
            color: "#f97316",
            size: "xs",
            letterSpacing: "2px",
          },
          {
            type: "text",
            text: "預約成功確認",
            weight: "bold",
            color: "#ffffff",
            size: "xl",
            margin: "sm",
          },
        ],
      },
      body: {
        type: "box",
        layout: "vertical",
        backgroundColor: "#18181b",
        paddingAll: "20px",
        contents: [
          {
            type: "box",
            layout: "vertical",
            spacing: "md",
            contents: [
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "預約編號",
                    color: "#a1a1aa",
                    size: "xs",
                    flex: 3,
                  },
                  {
                    type: "text",
                    text: appointment.booking_no,
                    wrap: true,
                    color: "#f97316",
                    size: "xs",
                    weight: "bold",
                    flex: 7,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "預約時段",
                    color: "#a1a1aa",
                    size: "xs",
                    flex: 3,
                  },
                  {
                    type: "text",
                    text: timeDisplay,
                    wrap: true,
                    color: "#fafafa",
                    size: "xs",
                    weight: "bold",
                    flex: 7,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "服務老師",
                    color: "#a1a1aa",
                    size: "xs",
                    flex: 3,
                  },
                  {
                    type: "text",
                    text: appointment.masseur_name || "專業放鬆師",
                    wrap: true,
                    color: "#fafafa",
                    size: "xs",
                    weight: "bold",
                    flex: 7,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "預約者",
                    color: "#a1a1aa",
                    size: "xs",
                    flex: 3,
                  },
                  {
                    type: "text",
                    text: `${appointment.customer_name} (${appointment.customer_phone})`,
                    wrap: true,
                    color: "#fafafa",
                    size: "xs",
                    flex: 7,
                  },
                ],
              },
              {
                type: "box",
                layout: "baseline",
                spacing: "sm",
                contents: [
                  {
                    type: "text",
                    text: "教室地址",
                    color: "#a1a1aa",
                    size: "xs",
                    flex: 3,
                  },
                  {
                    type: "text",
                    text: BRAND.address,
                    wrap: true,
                    color: "#d4d4d8",
                    size: "xs",
                    flex: 7,
                  },
                ],
              },
            ],
          },
          {
            type: "separator",
            margin: "lg",
            color: "#27272a",
          },
          {
            type: "box",
            layout: "vertical",
            margin: "md",
            contents: [
              {
                type: "text",
                text: "💡 到訪須知：請於預約時間前 5~10 分鐘抵達教室。如需變更或取消，請提前透過官網或官方 LINE 告知。",
                size: "xxs",
                color: "#71717a",
                wrap: true,
              },
            ],
          },
        ],
      },
      footer: {
        type: "box",
        layout: "horizontal",
        spacing: "sm",
        backgroundColor: "#18181b",
        paddingStart: "20px",
        paddingEnd: "20px",
        paddingBottom: "18px",
        contents: [
          {
            type: "button",
            style: "primary",
            color: "#f97316",
            height: "sm",
            action: {
              type: "uri",
              label: "查詢 / 取消預約",
              uri: `https://www.kse-release.com.tw/reserve?tab=search&phone=${encodeURIComponent(
                appointment.customer_phone
              )}`,
            },
          },
          {
            type: "button",
            style: "secondary",
            height: "sm",
            action: {
              type: "uri",
              label: "教室導航",
              uri: BRAND.mapUrl,
            },
          },
        ],
      },
    }
  }

  /**
   * 發送預約確認 Flex Message（優先由 LINE 官方帳號主動推播）
   */
  async function sendBookingConfirmation(appointment: AppointmentRecord): Promise<{
    sent: boolean
    message?: string
  }> {
    const flexBubble = buildBookingFlexMessage(appointment)
    const flexPayload = {
      type: "flex",
      altText: `【KSE 預約確認】${appointment.customer_name} 您好，您已成功預約 ${appointment.start_at}`,
      contents: flexBubble,
    }

    // 優先策略 1: 若有 LINE userId，直接由官方帳號發送 Push Message
    if (profile.value?.userId) {
      try {
        await $fetch("/api/line-push", {
          method: "POST",
          body: {
            to: profile.value.userId,
            messages: [flexPayload],
          },
        })
        return { sent: true }
      } catch (pushErr: any) {
        console.warn("[LINE Bot Push] 官方帳號推播失敗，嘗試備用機制:", pushErr)
      }
    }

    // 備用策略 2: 若在 LINE App 內 (LIFF)，嘗試透過當前聊天室發送
    if (liffInstance.value && liffInstance.value.isInClient() && liffInstance.value.isLoggedIn()) {
      try {
        await liffInstance.value.sendMessages([flexPayload])
        return { sent: true }
      } catch (err: any) {
        console.warn("[LIFF] 聊天室發送失敗:", err)
        return { sent: false, message: err?.message || "發送訊息失敗" }
      }
    }

    return { sent: false, message: "尚未登入 LINE 或無法發送推播" }
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
    sendBookingConfirmation,
    savePhone,
    getSavedPhone,
  }
}
