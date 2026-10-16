# KSE 官網 SEO / AEO / 改版計畫（Plan）

> 部署前提：純前端靜態（`Dockerfile:25` `nuxt generate` + `Dockerfile:35` 只發佈 `.output/public`）。
> 因此 `server/routes/sitemap.xml.ts:1-39`、`server/routes/robots.txt.ts:1-34` 上線不生效，以 `public/sitemap.xml:1-17`、`public/robots.txt:1-4` 為準。

## 0. Grill-me 發現（已驗證）

- 雙軌 sitemap：動態 `server/routes/sitemap.xml.ts:17` 從 `utils/site-data.ts:187` `POSTS` 自動產生（含 `lastmod`/`changefreq`）；靜態 `public/sitemap.xml:11-16` 寫死 6 篇、無 `lastmod`。
- 純前端部署下只有靜態生效，工程師加 `POSTS` 還要手改 XML，必漏。
- 對策：建 build script 從 `POSTS` 生成 `public/sitemap.xml`，刪掉或標 deprecated server 雙軌。

## 1. P0 上線阻擋

- [ ] 移除 `(開發中)`：`layouts/default.vue:23`、`layouts/default.vue:30-35`
- [ ] 生成式 sitemap（含 `lastmod=date`、`changefreq`、`priority`），單一來源 `POSTS`
- [ ] `public/robots.txt` 合併 AI 白名單（`GPTBot`、`ChatGPT-User`、`PerplexityBot`、`ClaudeBot`、`Google-Extended`、`Applebot-Extended`、`Bytespider`，見 `server/routes/robots.txt.ts:7-27`）+ `Sitemap:` 絕對路徑
- [ ] 移除 `http-equiv: Cache-Control/Pragma/Expires`（`nuxt.config.ts:32-34`），viewport 拿掉 `maximum-scale=1.0, user-scalable=no`（`nuxt.config.ts:30`）
- [ ] HTML 快取改 `no-cache` 即可，不用 `no-store`（`nuxt.config.ts:51-59`、`nginx-entrypoint.sh:26-28`，`/_nuxt/` immutable 保留是對的）
- [ ] NAP 統一：`layouts/default.vue:85-87` 與 `composables/useGeoSchema.ts:32-33`、`utils/site-data.ts:9-10` 互相矛盾，統一為 locality=`台中市`、region=`台灣`（或 TW-TXG），營業時間統一 09:00 或 10:00（layout 09:00 vs `useGeoSchema.ts:55` 10:00）
- [ ] `nginx-entrypoint.sh:25` `try_files $uri $uri/ /index.html` 會 soft-404，改 `=404` + prerender `404.html`，`error.vue` 加 `noindex`
- [ ] 示範內容替換或下架前勿打 `推薦`：`pages/cases.vue:6-11`、`utils/site-data.ts:196-200` 全為示範

## 2. 關鍵字：台中 / 南屯 / 運動按摩 / 放鬆 / 推薦

現況：`pages/index.vue:357`、`pages/services.vue:83`、`pages/faq.vue:107`、`pages/cases.vue:59`、`pages/kse.vue:119` title 重複，自己搶排名；`推薦` 無對應頁。

- 首頁 `/`：`台中運動按摩 + 南屯筋膜放鬆`（交易型）。H1 已在 `pages/index.vue:16-20`，首段 100 字補地址+兩詞各一次。比較表 `pages/index.vue:60-68` 留著，加 50 字結論給 AI 引用。
- `/services`：四服務各吃一組 + `南屯`，`pages/services.vue:18-21` 每項補 80-120 字含症狀詞（肩頸緊繃、下背、髂脛束），anchor `/services#fascia` 做內連。
- `/faq` + `/news`：吃 `推薦怎麼選` + 長尾問句。FAQ 擴到 12-15 題（價格/痛感/推拿SPA差異/拉傷多久可按/運動前後），schema 已在 `composables/useGeoSchema.ts:101-121`。`news` excerpt 縮為 60-90 字，`pages/news/[slug].vue:124-148` 補 `image` 絕對路徑 + `article:published_time`。
- `推薦` 信任訊號：無真實評論前不加 `Review/AggregateRating` schema，先串 GBP + `components/SiteFooter.vue:64-65` NAP。
- `keywords` meta 僅參考（Google 忽略），重點改 title/H1/首段/alt/URL。

## 3. 中信兄弟指定合作（已授權）

正式名用 `中信兄弟`，`兄弟象` 只作別名收錄一次。

需備齊：Logo 檔+授權範圍（全隊/青訓/單次？期間？）、2-3 張真照+日期場次、一句可公開回饋、官方連結。

- `utils/site-data.ts:120-136`：`PARTNERS[0]` 換真實 期間/對象/項目/場次
- `pages/partners.vue:21-22`：主視覺換真照，alt=`KSE 為中信兄弟球員進行賽後運動按摩恢復`；`pages/partners.vue:45` 拿掉 `即將上線`；`pages/partners.vue:120/123` title/desc 改 `中信兄弟合作｜球隊運動恢復與賽後按摩支援｜KSE`
- `pages/index.vue:135-136`：`KSE × 中信兄弟` 留 social proof，連到 `/partners` 證據段
- 新增 1 篇 `/news` 新聞稿並手動加入 `public/sitemap.xml`（靜態）
- schema：`areaServed/sameAs` 補兄弟官方連結（`composables/useGeoSchema.ts:78-83`），`partners` 加 `SportsTeam`（隊名、運動類型、sponsor=KSE）
- FAQ 加一題合作範圍 50 字答案，給 AI Overviews 抓
- 其他頁不再堆兄弟字，避免稀釋 `台中南屯` 權重

## 4. 改版：選項 C（首屏深 + 內容淺，混合式）

現況 `assets/css/styles.css:9` 為 Japandi 大地調，放鬆夠、運動感弱。

- 色階：保留藏青 `assets/css/styles.css:56` 作深色首屏底，淺區內文對比加深，主金 `assets/css/styles.css:65` 只用 CTA/數據
- 字體：H1/H2 收緊 `letter-spacing`，數字放大成 performance data
- 質感：Hero 加筋膜線條/斜紋 overlay，卡片 hover 改上浮+左側金線，運動區用 2-4px 硬角（現 `assets/css/styles.css:161-175` `surface-card`）
- 圖片：換高對比訓練凍結照，alt 維持 SEO 寫法
- 動效：保留 `rise-in`（`assets/css/styles.css:190-203`）+ 數字 count-up，不做大 parallax 保 LCP
- Hero LCP 圖 `pages/index.vue:5-11` 加 `fetchpriority="high"` + preload，其餘維持 `loading="lazy"` + `width/height`

## 5. 待決策問題（需回覆才能動工）

| # | 問題 | 選項 | 建議 | 影響檔案 |
|---|------|------|------|----------|
| D1 | 兄弟授權四欄 | 期間 / 對象 / 項目 / 場次 + Logo 檔 + 官方連結 | 缺一不上線，先維持洽談中寫法 | `utils/site-data.ts:120-136`、`pages/partners.vue:21-22` |
| D2 | NAP/營業時間 | locality=`台中市`、region=`台灣`；營業 09:00 或 10:00 二選一 | 統一後一次改 schema + 頁面文案 | `layouts/default.vue:85-87`、`composables/useGeoSchema.ts:32-33,55` |
| D3 | sitemap 做法 | A. build script 生成 `public/sitemap.xml` / B. 维持手動 | 選 A，單一來源 `POSTS` | `public/sitemap.xml:1-17`、`server/routes/sitemap.xml.ts:1-39` |
| D4 | 404 策略 | A. `try_files ... =404` + prerender 404 / B. 維持 SPA fallback | 選 A，避免 soft-404 傷 SEO | `nginx-entrypoint.sh:25`、`error.vue` |
| D5 | `推薦` 內容 | A. 先做挑選指南 / B. 等真實案例才寫 | 選 A，真實 `Review` schema 等 GBP 評論後再加 | `pages/cases.vue:6-11`、`pages/faq.vue:104` |
| D6 | 各頁 title 清單 | 要我先列新 title/description 表？ | 要，先定稿才改 | `pages/index.vue:357` 等 7 頁 |
| D7 | 改版交付 | A. 先出 token 清單 / B. 直接改 | 選 A，確認色階/字體/圓角後再動工 | `assets/css/styles.css:49-105` |

## 6. 執行紀錄（2026-10-16）

決策：D2 營業時間 = 每日 11:00–22:00；D1 中信兄弟 = 全權授權公開；D3/D4/D5/D7 依建議（A）執行。

已完成：
- [x] 移除 `(開發中)`，各頁 title / description 改為唯一（`composables/usePageSeo.ts` 統一輸出 canonical、OG、Twitter）
- [x] sitemap / robots / llms.txt 單一來源：`server/routes/*.ts` 由 `nitro.prerender.routes` 產出靜態檔，刪除 `public/sitemap.xml`、`public/robots.txt`
- [x] robots 加 AI 爬蟲白名單，`/reserve`、`/bind` disallow；`/reserve` noindex + canonical 指回 `/booking`
- [x] nginx：`try_files ... =404` + `error_page 404 /404.html`；HTML 改 `no-cache`；`error.vue` 中文化 + noindex；不存在的文章 throw 404
- [x] NAP 統一（`BRAND.hours` 單一來源），全站只剩一份 LocalBusiness schema（`buildSiteGraph`），其餘以 `@id` 參照
- [x] Article schema 補 image 絕對路徑、dateModified、author/publisher；文章加「重點摘要」與 H2 段落
- [x] FAQ 擴充為 15 題，答案先行；首頁不再重複注入 FAQPage
- [x] 移除所有「示範／版位／預留」對外文案；2 篇純佔位文章下架，4 篇知識文擴寫
- [x] 圖片：原檔 3–4MB iPhone 照 → 1600px mozjpeg（約 150KB），並移除 EXIF GPS；OG 圖改 1200×630；alt 改為照片實際內容
- [x] 縮放鎖定只限 LIFF 情境（`/reserve`、`/bind`、LINE 內建瀏覽器），官網恢復可縮放
- [x] 改版選項 C：深藏青首屏 + 燕麥白內容區、亮金 CTA、2px 硬角卡片＋左側金線、Barlow Condensed 數字字體、色彩對比全數過 WCAG AA

待辦（需業主提供）：
- [ ] 中信兄弟：Logo 檔、合作照片、官方連結（可再加 `sameAs` / 合作新聞稿）
- [ ] Google 商家（GBP）營業時間同步為 11:00–22:00，累積真實評論後再加 `AggregateRating`
- [ ] 真實個案（經同意）取代「常見處理路徑」；放鬆師個人介紹與證照（E-E-A-T）
- [ ] 價格資訊（目前 schema 僅 `priceRange: $$`）
