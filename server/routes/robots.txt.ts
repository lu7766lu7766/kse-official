import { SITE_URL } from "~/utils/site-data"

// 測試機的禁止索引由 nginx-entrypoint.sh 的 X-Robots-Tag（CRAWLER_ALLOW）控制，這裡固定輸出正式站內容
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
]

export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8")
  return `User-agent: *
Allow: /
Disallow: /reserve
Disallow: /bind

# AI 搜尋與答案引擎（AEO）
${AI_CRAWLERS.map((ua) => `User-agent: ${ua}\nAllow: /\nDisallow: /reserve\nDisallow: /bind`).join("\n\n")}

Sitemap: ${SITE_URL}/sitemap.xml
`
})
