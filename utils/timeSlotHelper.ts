export interface RawAvailableSlot {
  start_at: string // "2026-08-17 09:00:00"
  end_at: string   // "2026-08-17 12:00:00"
}

export interface RawMasseurAvailability {
  masseur_id: number
  masseur_name: string
  available_slots: RawAvailableSlot[]
}

export interface HourlySlot {
  id: string              // unique key e.g. "2-2026-08-17-09:00"
  masseur_id: number
  masseur_name: string
  start_at: string        // "2026-08-17 09:00:00"
  end_at: string          // "2026-08-17 10:00:00"
  date: string            // "2026-08-17"
  time_display: string    // "09:00"
  label: string           // "09:00 ~ 10:00"
  isPast?: boolean
}

export interface WeekDay {
  date: Date
  dateString: string      // "2026-08-17"
  dayLabel: string        // "週一"
  shortDate: string       // "8/17"
  isToday: boolean
  isPast: boolean
}

const WEEKDAY_NAMES = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"]

/**
 * 補零輔助
 */
export function padZero(num: number): string {
  return num < 10 ? `0${num}` : `${num}`
}

/**
 * 格式化 Date 物件為 YYYY-MM-DD
 */
export function formatDate(d: Date): string {
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  return `${year}-${month}-${day}`
}

/**
 * 格式化 Date 物件為 YYYY-MM-DD HH:mm:ss
 */
export function formatDateTime(d: Date): string {
  const year = d.getFullYear()
  const month = padZero(d.getMonth() + 1)
  const day = padZero(d.getDate())
  const hour = padZero(d.getHours())
  const min = padZero(d.getMinutes())
  const sec = padZero(d.getSeconds())
  return `${year}-${month}-${day} ${hour}:${min}:${sec}`
}

/**
 * 解析 "YYYY-MM-DD HH:mm:ss" 或 "YYYY-MM-DD"（以本地時間安全解析）
 */
export function parseDateString(str: string): Date {
  if (!str) return new Date()
  const parts = str.trim().split(/[- :T]/)
  if (parts.length >= 3) {
    const year = parseInt(parts[0] || "0", 10)
    const month = Math.max(0, parseInt(parts[1] || "1", 10) - 1)
    const day = parseInt(parts[2] || "1", 10)
    const hour = parts[3] ? parseInt(parts[3], 10) : 0
    const min = parts[4] ? parseInt(parts[4], 10) : 0
    const sec = parts[5] ? parseInt(parts[5], 10) : 0
    return new Date(year, month, day, hour, min, sec)
  }
  return new Date(str)
}

/**
 * 判斷特定起始時間是否已過期（需至少提前 minAdvanceMinutes 分鐘）
 */
export function isSlotPast(startAtStr: string, minAdvanceMinutes: number = 30): boolean {
  if (!startAtStr) return true
  const slotTime = parseDateString(startAtStr).getTime()
  const minValidTime = Date.now() + minAdvanceMinutes * 60 * 1000
  return slotTime < minValidTime
}

/**
 * 取得指定週（以週一為起始）的 7 天日期陣列
 */
export function getWeekDays(referenceDate: Date = new Date()): {
  weekDays: WeekDay[]
  startOfWeek: Date
  endOfWeek: Date
  rangeLabel: string
} {
  const now = new Date()
  const todayStr = formatDate(now)

  // 計算週一（若今天為週日，day為0，需往前回推6天）
  const d = new Date(referenceDate)
  d.setHours(0, 0, 0, 0)
  const dayOfWeek = d.getDay()
  const distanceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek

  const monday = new Date(d)
  monday.setDate(d.getDate() + distanceToMonday)
  monday.setHours(0, 0, 0, 0)

  const sunday = new Date(monday)
  sunday.setDate(monday.getDate() + 6)
  sunday.setHours(23, 59, 59, 999)

  const weekDays: WeekDay[] = []
  for (let i = 0; i < 7; i++) {
    const current = new Date(monday)
    current.setDate(monday.getDate() + i)
    const dateStr = formatDate(current)
    const isPast = dateStr < todayStr

    weekDays.push({
      date: current,
      dateString: dateStr,
      dayLabel: WEEKDAY_NAMES[current.getDay()] || "週一",
      shortDate: `${current.getMonth() + 1}/${current.getDate()}`,
      isToday: dateStr === todayStr,
      isPast,
    })
  }

  const rangeLabel = `${monday.getFullYear()} 年 ${monday.getMonth() + 1} 月 ${monday.getDate()} 日 - ${sunday.getMonth() + 1} 月 ${sunday.getDate()} 日`

  return {
    weekDays,
    startOfWeek: monday,
    endOfWeek: sunday,
    rangeLabel,
  }
}

/**
 * 將後端連續可用區間（Available Slots）切片成 1 小時一個單位的預約時段
 */
export function sliceToHourlySlots(
  masseurAvailabilities: RawMasseurAvailability[]
): Record<string, HourlySlot[]> {
  const now = new Date()
  const nowTime = now.getTime()
  const slotsByDate: Record<string, HourlySlot[]> = {}

  for (const masseur of masseurAvailabilities) {
    for (const rawSlot of masseur.available_slots) {
      let current = parseDateString(rawSlot.start_at)
      const end = parseDateString(rawSlot.end_at)

      // 每次預約固定 1 小時 (60分鐘)，起始點以 30 分鐘為單位步進
      const durationMs = 60 * 60 * 1000
      const stepMs = 30 * 60 * 1000

      while (current.getTime() + durationMs <= end.getTime()) {
        const nextHour = new Date(current.getTime() + durationMs)
        const dateStr = formatDate(current)
        const startStr = formatDateTime(current)
        const endStr = formatDateTime(nextHour)

        const startHour = padZero(current.getHours())
        const startMin = padZero(current.getMinutes())
        const endHour = padZero(nextHour.getHours())
        const endMin = padZero(nextHour.getMinutes())

        // 至少需提前 30 分鐘預約，小於 30 分鐘或過去時段視為無法預約
        const minAdvanceMs = 30 * 60 * 1000
        const isPast = current.getTime() < nowTime + minAdvanceMs

        if (!slotsByDate[dateStr]) {
          slotsByDate[dateStr] = []
        }

        slotsByDate[dateStr]!.push({
          id: `${masseur.masseur_id}-${startStr}`,
          masseur_id: masseur.masseur_id,
          masseur_name: masseur.masseur_name,
          start_at: startStr,
          end_at: endStr,
          date: dateStr,
          time_display: `${startHour}:${startMin}`,
          label: `${startHour}:${startMin} ~ ${endHour}:${endMin}`,
          isPast,
        })

        current = new Date(current.getTime() + stepMs)
      }
    }
  }

  // 排序每個日期的時段（先按開始時間，再按按摩師）
  for (const date in slotsByDate) {
    const list = slotsByDate[date]
    if (list) {
      list.sort((a, b) => {
        if (a.start_at !== b.start_at) {
          return a.start_at.localeCompare(b.start_at)
        }
        return a.masseur_id - b.masseur_id
      })
    }
  }

  return slotsByDate
}
