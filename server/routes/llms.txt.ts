import { BRAND, FAQS, PARTNERS, POSTS, SERVICES, servicePath, SITE_URL, TEAM } from "~/utils/site-data"

// llms.txt：給 AI 答案引擎的精簡事實摘要（https://llmstxt.org），內容全部取自 site-data，與頁面同步
export default defineEventHandler((event) => {
  setHeader(event, "Content-Type", "text/plain; charset=utf-8")
  return `# ${BRAND.name}

> ${BRAND.name}（Kinetic Sports Enhancement）是位於台中市南屯區的運動按摩與筋膜放鬆工作室，以「動作評估 → 徒手筋膜放鬆 → 運動衛教」三道流程，提供美式筋膜放鬆、運動按摩、核心穩定修復與肌力體能訓練。每次一對一約 60 分鐘，運動員、規律運動者與久坐上班族都適合。

## 基本資訊

- 地址：${BRAND.address}
- 營業時間：${BRAND.hours.label}（採預約制）
- 電話：${BRAND.phone}
- 線上預約：${SITE_URL}/booking
- LINE：${BRAND.line}
- Instagram：${BRAND.ig}
- Facebook：${BRAND.fb}
- Threads：${BRAND.threads}
- 服務區域：台中市南屯區、西屯區、西區及台中市全區

## 服務項目

${SERVICES.map((s) => `- [${s.title}](${SITE_URL}${servicePath(s.slug)})（又稱：${s.aliases.join("、")}）：${s.short}${s.duration}。適合：${s.audience}。`).join("\n")}

## 名詞定義

${SERVICES.map((s) => `### ${s.title}是什麼？\n${s.definition}`).join("\n\n")}

## 依需求找頁面

- 台中／南屯運動按摩、運動後按摩、賽前賽後恢復：${SITE_URL}${servicePath("sports-massage")}
- 台中筋膜放鬆、肌肉放鬆、肩頸緊繃、下背痠痛、活動度受限：${SITE_URL}${servicePath("fascia")}
- 久坐族核心無力、肩頸下背反覆不適：${SITE_URL}${servicePath("core")}
- 運動員肌力體能、青少年訓練、傷後回場：${SITE_URL}${servicePath("strength")}
- 運動按摩和一般按摩差在哪、按摩會不會痛、多久按一次：${SITE_URL}/faq
- 線上預約與空檔查詢：${SITE_URL}/booking

## 團隊

${TEAM.map((m) => `- ${m.name}（${m.role}）：專長 ${m.expertise.join("、")}。${m.points.join("；")}。`).join("\n")}

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
- [官方合作夥伴](${SITE_URL}/partners)
- [常見問題](${SITE_URL}/faq)
`
})
