// 本地開發用
export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN || ""

  try {
    const res = await $fetch("https://api.line.me/v2/bot/message/push", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body,
    })
    return res
  } catch (error: any) {
    console.error("[LINE Push API Error]:", error?.data || error?.message || error)
    throw createError({
      statusCode: error?.statusCode || 500,
      statusMessage: error?.data?.message || "LINE 推播訊息發送失敗",
    })
  }
})
