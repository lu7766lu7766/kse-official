import type { RawMasseurAvailability } from "~/utils/timeSlotHelper"

export interface Masseur {
  id: number
  name: string
}

export interface AppointmentPayload {
  masseur_id: number
  start_at: string
  customer_name: string
  customer_phone: string
  note?: string
}

export interface AppointmentRecord {
  id: number
  booking_no: string
  masseur_id: number
  masseur_name: string
  customer_name: string
  customer_phone: string
  start_at: string
  end_at: string
  note?: string
  is_deducted?: boolean
  created_at?: string
}

export interface ApiResponse<T> {
  code: number | number[]
  data: T
  message?: string
}

const ERROR_MESSAGES: Record<number, string> = {
  8000: "查無此預約或預約編號/電話號碼不符",
  8001: "選擇的時間不在按摩師可預約排班範圍內，或已被其他客人預約",
  8002: "預約編號格式錯誤或未填",
  8003: "手機號碼格式錯誤（需為 10 碼數字，例如 0912345678）",
  8004: "顧客姓名格式錯誤或未填",
  8005: "預約起始時間格式錯誤或未填",
  8006: "按摩師編號格式錯誤或未填",
  8007: "無法取消過去或已開始的預約",
  8008: "權限不足",
  8009: "預約時間需至少提前半小時以上（30 分鐘）",
}

function normalizeCode(code: any): number {
  if (Array.isArray(code)) {
    return Number(code[0])
  }
  return Number(code)
}

function isSuccess(code: any): boolean {
  const c = normalizeCode(code)
  return c === 0 || c === 200
}

export function useBookingApi() {
  const config = useRuntimeConfig()
  const baseUrl = (config.public.apiBase as string) || "http://localhost:3333"

  /**
   * 取得可預約按摩師清單
   */
  async function fetchMasseurs(): Promise<Masseur[]> {
    try {
      const res = await $fetch<ApiResponse<Masseur[]>>(`${baseUrl}/api/client/booking/masseurs`)
      return res.data || []
    } catch (error: any) {
      console.error("fetchMasseurs failed:", error)
      throw new Error(extractErrorMessage(error, "取得按摩師清單失敗"))
    }
  }

  /**
   * 查詢指定日期區間可用時段 (週曆使用)
   */
  async function fetchAvailabilities(params: {
    start_at: string
    end_at: string
    masseur_id?: number | null
  }): Promise<RawMasseurAvailability[]> {
    try {
      const queryParams: Record<string, any> = {
        start_at: params.start_at,
        end_at: params.end_at,
      }
      if (params.masseur_id) {
        queryParams.masseur_id = params.masseur_id
      }

      const res = await $fetch<ApiResponse<RawMasseurAvailability[]>>(
        `${baseUrl}/api/client/booking/availabilities`,
        {
          params: queryParams,
        }
      )
      return res.data || []
    } catch (error: any) {
      console.error("fetchAvailabilities failed:", error)
      throw new Error(extractErrorMessage(error, "取得可用預約時段失敗"))
    }
  }

  /**
   * 送出預約
   */
  async function submitBooking(payload: AppointmentPayload): Promise<AppointmentRecord> {
    try {
      const body: any = {
        masseur_id: payload.masseur_id,
        start_at: payload.start_at,
        customer_name: payload.customer_name.trim(),
        customer_phone: payload.customer_phone.trim(),
      }

      if (payload.note && payload.note.trim()) {
        body.note = payload.note.trim()
      }

      const res = await $fetch<ApiResponse<AppointmentRecord>>(
        `${baseUrl}/api/client/booking/appointments`,
        {
          method: "POST",
          body,
        }
      )

      if (!isSuccess(res.code)) {
        const codeNum = normalizeCode(res.code)
        const errorMsg = ERROR_MESSAGES[codeNum] || res.message || "預約失敗"
        throw new Error(errorMsg)
      }

      return res.data
    } catch (error: any) {
      console.error("submitBooking failed:", error)
      throw new Error(extractErrorMessage(error, "預約送出失敗，請確認時段是否已被預約"))
    }
  }

  /**
   * 官網客人查詢預約
   */
  async function searchAppointments(params: {
    customer_phone: string
    booking_no?: string
  }): Promise<AppointmentRecord[]> {
    try {
      const queryParams: Record<string, any> = {
        customer_phone: params.customer_phone.trim(),
      }
      if (params.booking_no && params.booking_no.trim()) {
        queryParams.booking_no = params.booking_no.trim()
      }

      const res = await $fetch<ApiResponse<AppointmentRecord[]>>(
        `${baseUrl}/api/client/booking/appointments/search`,
        {
          params: queryParams,
        }
      )
      return res.data || []
    } catch (error: any) {
      console.error("searchAppointments failed:", error)
      throw new Error(extractErrorMessage(error, "查詢預約紀錄失敗"))
    }
  }

  /**
   * 官網客人取消預約
   */
  async function cancelAppointment(params: {
    booking_no: string
    customer_phone: string
  }): Promise<{ booking_no: string; deleted: boolean }> {
    try {
      const res = await $fetch<ApiResponse<{ booking_no: string; deleted: boolean }>>(
        `${baseUrl}/api/client/booking/appointments`,
        {
          method: "DELETE",
          body: {
            booking_no: params.booking_no.trim(),
            customer_phone: params.customer_phone.trim(),
          },
        }
      )

      if (!isSuccess(res.code)) {
        const codeNum = normalizeCode(res.code)
        const errorMsg = ERROR_MESSAGES[codeNum] || res.message || "取消預約失敗"
        throw new Error(errorMsg)
      }

      return res.data
    } catch (error: any) {
      console.error("cancelAppointment failed:", error)
      throw new Error(extractErrorMessage(error, "取消預約失敗，請確認預約編號與電話是否相符"))
    }
  }

  /**
   * 統一錯誤訊息提取
   */
  function extractErrorMessage(error: any, fallback: string): string {
    const rawCode = error?.data?.code ?? error?.response?._data?.code
    if (rawCode !== undefined) {
      const codeNum = normalizeCode(rawCode)
      if (ERROR_MESSAGES[codeNum]) {
        return ERROR_MESSAGES[codeNum]!
      }
    }
    if (error?.data?.message) {
      return String(error.data.message)
    }
    if (error?.response?._data?.message) {
      return String(error.response._data.message)
    }
    if (error?.message) {
      return String(error.message)
    }
    return fallback
  }

  return {
    fetchMasseurs,
    fetchAvailabilities,
    submitBooking,
    searchAppointments,
    cancelAppointment,
  }
}
