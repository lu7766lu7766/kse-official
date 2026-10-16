import { BRAND, FAQS, PARTNERS, POSTS, SERVICES, SITE_URL } from "~/utils/site-data"

// llms.txt：給 AI 答案引擎的精簡事實摘要（https://llmstxt.org），內容全部取自 site-data，與頁面同步
export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8")
  return `# ${BRAND.name}

> ${BRAND.name}（Kinetic Sports Enhancement）是位於台中市南屯區的運動恢復工作室，以「評估 → 筋膜放鬆 → 動作 → 強化」四步流程，提供美式筋膜放鬆、運動按摩、核心穩定修復與肌力體能訓練。

## 基本資訊

- 地址：${BRAND.address}
- 營業時間：${BRAND.hours.label}（採預約制）
- 電話：${BRAND.phone}
- 線上預約：${SITE_URL}/booking
- LINE：${BRAND.line}
- Instagram：${BRAND.ig}
- Facebook：${BRAND.fb}
- 服務區域：台中市南屯區、西屯區、西區及台中市全區

## 服務項目

${SERVICES.map((s) => `- [${s.title}](${SITE_URL}/services#${s.slug})：${s.short}${s.duration}。適合：${s.audience}。`).join("\n")}

## 合作單位

${PARTNERS.map((p) => `- ${p.name}（${p.type}）：${p.desc}`).join("\n")}

## 常見問題

${FAQS.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## 文章

${POSTS.map((p) => `- [${p.title}](${SITE_URL}/news/${p.slug})：${p.summary}`).join("\n")}

## 主要頁面

- [首頁](${SITE_URL}/)
- [服務項目](${SITE_URL}/services)
- [關於 KSE](${SITE_URL}/kse)
- [運動合作](${SITE_URL}/partners)
- [常見問題](${SITE_URL}/faq)
`
})
