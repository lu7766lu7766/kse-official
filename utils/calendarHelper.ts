/**
 * 格式化日期為 UTC 格式 (YYYYMMDDTHHmmssZ)
 */
export function formatUtc(date: Date): string {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "")
}

/**
 * 安全解析日期字串為 Date 物件（相容 Safari 與各瀏覽器）
 */
export function parseAppointmentDate(dateStr: string | Date): Date {
  if (dateStr instanceof Date) return dateStr
  // 將 "2026-08-15 14:00:00" 轉成 "2026-08-15T14:00:00"
  const normalized = dateStr.trim().replace(" ", "T")
  const parsed = new Date(normalized)
  if (isNaN(parsed.getTime())) {
    // 降級備用替換成斜線格式
    return new Date(dateStr.trim().replace(/-/g, "/"))
  }
  return parsed
}

export interface AppointmentCalendarData {
  booking_no?: string
  masseur_name?: string
  customer_name?: string
  customer_phone?: string
  start_at: string | Date
  end_at?: string | Date
  note?: string
  location?: string
}

/**
 * 產生 Google 日曆新增行程連結 (Web Intent / TEMPLATE)
 */
export function createGoogleCalendarUrl(event: AppointmentCalendarData): string {
  const startDate = parseAppointmentDate(event.start_at)
  let endDate: Date
  if (event.end_at) {
    endDate = parseAppointmentDate(event.end_at)
  } else {
    // 預設 1 小時 (60 分鐘)
    endDate = new Date(startDate.getTime() + 60 * 60 * 1000)
  }

  const startStr = formatUtc(startDate)
  const endStr = formatUtc(endDate)

  const masseurName = event.masseur_name
    ? event.masseur_name.includes("師")
      ? event.masseur_name
      : `${event.masseur_name} 師傅`
    : "運動按摩師"
  const title = `【KSE 運動放鬆】預約 - ${masseurName}`
  const location = event.location || "台中市南屯區大墩七街202號"

  const lines = [
    `📋 預約資訊`,
    `• 預約編號：${event.booking_no || "無"}`,
    `• 預約師傅：${masseurName}`,
    `• 預約時段：${typeof event.start_at === "string" ? event.start_at : startDate.toLocaleString("zh-TW")}`,
  ]

  if (event.customer_name || event.customer_phone) {
    lines.push(`• 預約人：${event.customer_name || ""} ${event.customer_phone ? `(${event.customer_phone})` : ""}`)
  }

  if (event.note && event.note.trim()) {
    lines.push(`• 備註需求：${event.note.trim()}`)
  }

  lines.push(
    "",
    `📍 教室地點：${location}`,
    "",
    `💡 貼心提醒：`,
    `1. 請於預約時間前 5~10 分鐘抵達，以利進行完整評估。`,
    `2. 建議穿著寬鬆或富有彈性的運動服飾，以方便進行活動度評估。`
  )

  const details = lines.join("\n")

  const encodedTitle = encodeURIComponent(title)
  const encodedDetails = encodeURIComponent(details)
  const encodedLocation = encodeURIComponent(location)

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startStr}/${endStr}&details=${encodedDetails}&location=${encodedLocation}`
}
