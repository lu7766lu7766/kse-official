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

正式名用 `中信兄弟`，`兄弟象` 只作別名收錄一次。（2026-11-05 更新：改為 `/partners` 主打「中信兄弟（兄弟象）」，其他頁只透過 `PARTNERS[0].desc` 出現一次，見第 9 節）

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

## 7. 執行紀錄（2026-10-31）

已完成（commit `036fcb1`，Gemini 4 兩輪審查通過）：
- [x] 服務拆成獨立頁 `/services/{fascia,sports-massage,core,strength}`（`pages/services/[slug].vue`）：各自 title / description / canonical / 分享圖、完整 `Service` schema、麵包屑、相關 FAQ（展開顯示，FAQPage schema 只留 `/faq`）、延伸文章、其他服務內連；`/services` 改為列表 + `ItemList`，舊 `/services#slug` 錨點保留
- [x] 首頁團隊區輸出 `Person` schema（`knowsAbout`、`hasCredential` 只列正式證照、`worksFor`），卡片加 `#team-{slug}` 錨點；文章 `author` 欄位 → 頁面署名 + `personRef()`（只輸出頁面可見欄位，以同一 `@id` 指回首頁完整 Person）
- [x] sitemap `lastmod` 改用內容實際修改日，不再用 build 日期
- [x] 商家 `sameAs` 加入 IG 地點頁與 FB 公開網址；llms.txt 加「團隊」段落、服務連結改新網址
- [x] 自訂分享圖時一併覆寫 `og:image:secure_url`（原本 FB / LINE 可能抓到預設圖）
- [x] nginx：結尾斜線 301 到無斜線（正規式防 `//evil.com/` open redirect）、txt/xml 宣告 `charset=utf-8`、`absolute_redirect off`（Railway HTTPS proxy 後方只送相對轉址）

### 上線檢查與外部設定

- [ ] **步驟 1：Railway production 的 `kse-official` 服務設 `CRAWLER_ALLOW=true`**（2026-10-31 檢查：變數存在但值不是 `true`，正式站仍回 `x-robots-tag: noindex, nofollow`，全站不會被收錄）。這是 container 啟動時讀取的變數，改完需重新部署；dev 環境維持不設
  - 做法：Railway → 專案 `kse-system` → 左上切到 **production** 環境 → 服務 `kse-official` → Variables → `CRAWLER_ALLOW` 改為 `true`（全小寫、不加引號）→ 套用後會自動重新部署
  - 驗證：`curl -sI https://www.kse-release.com.tw/ | grep -i x-robots` 應無輸出
- [ ] **步驟 2：Google Search Console 與 Bing Webmaster Tools 提交 sitemap**（須在步驟 1 生效後做，否則會被判為「已排除：noindex」）
  - Google Search Console（https://search.google.com/search-console）
    1. 「新增資源」→ 選左邊「網域」→ 輸入 `kse-release.com.tw`（網域資源會一併涵蓋 www／無 www、http／https）
    2. 複製畫面上的 `google-site-verification=…` TXT 記錄 → 到 GoDaddy「我的產品 → 網域 → kse-release.com.tw → DNS → DNS 記錄 → 新增」：類型 `TXT`、名稱 `@`、值貼上、TTL 預設 → 儲存 → 回 GSC 按「驗證」（DNS 生效可能需幾分鐘到數小時，失敗就稍後再按）
    3. 左側「索引 → Sitemap」→ 輸入 `https://www.kse-release.com.tw/sitemap.xml` → 提交，狀態應顯示「成功」與 15 個網址
    4. 上方搜尋列逐一貼上新頁面網址檢查 →「要求建立索引」：`/services/fascia`、`/services/sports-massage`、`/services/core`、`/services/strength`、`/`（每日有配額，一次做幾頁即可）
    5. 之後每週看「索引 → 網頁」與「成效」；若有「已排除」先看原因
  - Bing Webmaster Tools（https://www.bing.com/webmasters；ChatGPT 搜尋／Copilot 依賴 Bing 索引）
    1. 用 Microsoft 帳號登入 → 選「從 Google Search Console 匯入」→ 授權同一個 Google 帳號 → 勾選網站匯入（會一併帶入已驗證狀態與 sitemap，免再驗證）
    2. 左側「Sitemap」確認 `https://www.kse-release.com.tw/sitemap.xml` 已在清單，沒有就按「提交 Sitemap」手動加入
    3. 左側「URL 提交」貼上 4 個服務頁網址提交
- [ ] **步驟 3：修正無 www 網域的兩段轉址**（GoDaddy）
  - 現況：DNS 在 GoDaddy（NS `ns41/ns42.domaincontrol.com`），`kse-release.com.tw` 的 A 記錄指向 GoDaddy 轉址服務，目標被設成 `http://www.kse-release.com.tw`，所以 https 會先轉到 http 再由 Railway 轉回 https，多一跳。Railway 只綁 `www`，不用動
  - 做法：GoDaddy「我的產品 → 網域 → kse-release.com.tw → DNS → 轉址（Forwarding）」→「網域」那一列按編輯：
    1. 轉址到：通訊協定選 `https://`，網址填 `www.kse-release.com.tw`
    2. 轉址類型：永久（301）
    3. 轉址設定：僅轉址（不要選「遮罩／Forward with masking」，遮罩會用 iframe 包住網站，對 SEO 不利）
    4. 儲存（生效通常數分鐘，最長可能 48 小時）
  - 驗證：`curl -sI https://kse-release.com.tw/ -X GET | grep -i location` 應直接是 `https://www.kse-release.com.tw/`；`curl -sI http://kse-release.com.tw/ | grep -i location` 也一樣
  - 不要動 `www` 的 CNAME（指向 Railway）
- [ ] **步驟 4：Google 商家檔案（GBP）**
  - 進入方式：用管理者帳號登入 Google → 搜尋「KSE美式筋膜放鬆教室」或開 https://business.google.com → 在商家面板點「編輯個人檔案」
  - 商家名稱 ⚠️：目前是「KSE美式筋膜放鬆教室/運動按摩/徒手按摩/筋膜刀放鬆」，違反 Google 規範（名稱不得加關鍵字，需與招牌一致），被檢舉可能被強制改名或停權。改回「KSE美式筋膜放鬆教室」；改名可能需要重新審核數天
  - 類別：主要類別選最貼近的運動按摩類（如「運動按摩師」，以清單實際名稱為準），次要類別加「按摩師」等相關項目；關鍵字放在類別、服務與說明，不放名稱
  - 營業時間：每日 11:00–22:00（與 `BRAND.hours` 一致）；國定假日另設「特殊營業時間」
  - 地址與地圖釘：大墩七街202號；地圖釘目前 24.1438506, 120.6494393，網站座標已同步，之後若移動地圖釘要同步改 `BRAND.geo`
  - 聯絡資訊：電話 0901-403990；網站填 `https://www.kse-release.com.tw/?utm_source=google&utm_medium=organic&utm_campaign=gbp`（GA4 可分辨商家流量）；預約連結填 `https://www.kse-release.com.tw/booking`
  - 服務：「編輯服務」逐一新增美式筋膜放鬆、運動按摩、核心穩定修復方案、肌力與體能訓練、筋膜刀放鬆，每項填價格與 1–2 句說明（與網站 `SERVICES` 一致）
  - 商家說明（750 字內）：第一句寫清楚「台中南屯的美式筋膜放鬆與運動按摩教室」，再寫三道流程、適合族群、中信兄弟合作；不放網址與促銷字
  - 相片：店外招牌與入口（方便找路）、店內環境、放鬆師工作照、團隊照，至少 10 張，之後每月補幾張
  - 動態（新增更新）：每週 1 則，內容可用網站新文章、合作消息、優惠；附相片與「預約」按鈕
  - 評論：在 GBP 首頁「要求評論」複製評論連結 → 放進 LINE 官方帳號的服務後訊息與店內 QR Code；請客人自然寫出做了什麼服務、哪裡改善；每則評論都要回覆（含負評）。不可給優惠換評論，也不要在網站自行標註 `AggregateRating`
  - 商家 CID：`355524801281724783`（`https://maps.google.com/?cid=355524801281724783`），已用於網站地圖連結、schema `hasMap` 與 `sameAs`
- [ ] 每月用 ChatGPT / Perplexity / Gemini / Google AI Mode 實測「台中南屯運動按摩推薦」「台中筋膜放鬆」等問句，並在 GA4 追蹤 `chatgpt.com`、`perplexity.ai`、`gemini.google.com` 的推薦流量

### 待業主提供

- [ ] 各服務價格（單次／套票）→ 補進 `SERVICES` 與 `Offer` schema（目前全站沒有價格，是內容最大缺口）
- [ ] Birdy 學歷：「臺灣運動體育大學 競技運動學系碩士班」是畢業或在學？校名是否為「國立臺灣體育運動大學」？畢業可加 `alumniOf`
- [ ] Lin 是否仍持有護理師執照？有則列入 `credentials`
- [ ] 確認 4 篇文章的 `author` 為實際執筆或審稿人
- [ ] 服務頁補充：不適合做的情況（禁忌症）、各服務專屬 FAQ
- 註：不要自行在網站加 `AggregateRating`／`Review` schema。Google 不會為商家自己標註的評論顯示星等，評論請累積在 Google 商家（取代上方第 6 節的同名待辦）

### 日後維護規則（`utils/site-data.ts`）

- 改頁面文案 → 更新 `PAGE_UPDATED` 對應日期；服務頁改 `SERVICES[].updated`，文章改 `POSTS[].updated`（sitemap 不會自動用 build 日期）
- 新增文章 → 填 `author`（`TEAM` 的 slug），才有署名與具名作者 schema
- 新增服務 → `SERVICES` 填 `seoTitle`、`seoDescription`、`faqs`（`FAQS` 的 id）、`posts`、`updated`，並在 `utils/service-images.ts` 加照片、alt、裁切位置；頁面、sitemap、schema、llms.txt 會自動產生
- 新增成員／證照 → `TEAM.credentials` 只放正式證照，研習與經歷放 `points`
- 改營業時間 → `BRAND.hours` 與 Google 商家同步
- 審查用 agy 時，headless 無法執行指令：先把 diff 與建置產物寫成檔案再請它讀（見 Claude 記憶 `agy-review-headless`）

## 8. 關鍵字優化：運動／按摩／運動按摩／放鬆（2026-11-04）

### 關鍵字 → 主落地頁（避免自家頁面互搶）

| 關鍵字群 | 主頁 | 輔助頁 | 典型搜尋／AI 問句 |
|---|---|---|---|
| 運動按摩 | `/services/sports-massage` | `/`、`/faq`、文章 `sports-massage-for-everyone`、`post-workout-recovery` | 台中運動按摩、南屯運動按摩、運動按摩是什麼、運動按摩多久一次 |
| 按摩 | `/` | `/faq`、文章 `does-painful-massage-work-better` | 台中按摩推薦、南屯按摩、按摩會痛嗎、按摩後會痠嗎 |
| 放鬆 | `/services/fascia` | `/`、`/faq`（`relax`、`after`） | 台中筋膜放鬆、肌肉放鬆、運動後放鬆、肩頸放鬆 |
| 運動 | `/services/sports-massage`（運動恢復） | `/kse`、`/services/strength`、「運動恢復」分類文章 | 運動後恢復、運動傷害預防、運動前後按摩 |

### 已完成

- [x] `SERVICES` 新增 `definition`（一句話定義：是什麼＋目的＋地點＋時間，供 AI 整句引用）、`aliases`（同義搜尋詞 → Service `alternateName`）、`scenarios`（運動按摩「什麼時候適合做」四情境）
- [x] 服務頁首段改為「○○是什麼？」H2 + 定義句，再接「適合誰」；運動按摩頁加情境清單；Service schema 加 `alternateName`、`description` 改用定義句、`areaServed` 與商家一致
- [x] FAQ 新增 6 題（運動按摩是什麼／沒運動也能做嗎／只想放鬆紓壓／運動按摩 vs 筋膜放鬆／按摩後會痠嗎可以運動嗎／多久做一次），答案皆取自既有文章與服務內容，不新增未經確認的事實；各服務頁的相關 FAQ 同步擴充
- [x] 首頁補「首段即答」段落（地址＋運動按摩＋筋膜放鬆＋對象＋時間），並以關鍵字錨點連到兩個服務頁；比較表標題改為「運動按摩、筋膜放鬆和一般按摩差在哪」
- [x] 文章頁文末依「服務頁延伸閱讀 → 分類」對應相關服務，加「了解台中南屯○○」內連；Article schema 加 `about` 指向該 Service
- [x] 商家 schema：`knowsAbout` 補運動後放鬆、肌肉放鬆、筋膜刀放鬆；加 `keywords`；`alternateName` 補 `KSE Release Studio`（文章已使用的正式英文名）
- [x] llms.txt：開頭摘要改為「運動按摩與筋膜放鬆工作室」，新增「名詞定義」與「依需求找頁面」兩段
- [x] title／description：運動按摩頁加入「運動後放鬆恢復」；FAQ、文章列表、全站預設 description 改為現有內容（文章列表原本仍寫已下架文章的主題）

### 後續建議（需業主配合）

- [ ] Google 商家「服務」名稱與網站一致：運動按摩、美式筋膜放鬆（說明可直接用 `definition`），主要類別用運動按摩類
- [ ] 請客人在評論中自然寫出做了什麼（例：「運動按摩」「筋膜放鬆」「肩頸放鬆」），這是「台中按摩推薦」類問句在地圖包與 AI 回答中最有力的訊號
- [ ] 價格公開後補進 `SERVICES` 與 `Offer`（「運動按摩 價格」是高意圖查詢）
- [ ] 內容缺口：可再寫「運動後怎麼放鬆？自己做 vs 找人按摩」、「跑步／重訓後按摩部位指南」兩篇，分類放「運動恢復」即會自動連到運動按摩頁
- [ ] 每月實測 ChatGPT／Perplexity／Gemini：「台中運動按摩推薦」「南屯按摩」「運動按摩是什麼」，記錄是否被引用與引用哪一頁

## 9. 關鍵字優化：運動恢復／兄弟象（2026-11-05）

| 關鍵字群 | 主頁 | 輔助頁 |
|---|---|---|
| 運動恢復（台中運動恢復、賽後恢復、運動後恢復方法） | `/services/sports-massage` | `/partners`、`/faq`（`recovery`）、`/news`「運動恢復」分類 |
| 兄弟象／中信兄弟（兄弟象 運動按摩、中信兄弟 合作） | `/partners` | `/faq`（`brothers`）、首頁合作區、兩篇中信兄弟文章 |

已完成：
- [x] 運動按摩頁 title / description 加「運動恢復」；情境區標題改為「運動恢復怎麼安排？運動按摩的四個時機」；相關 FAQ 加 `recovery`、延伸閱讀加 `ctbc-brothers-on-site`
- [x] FAQ 新增「運動恢復有哪些方法？」與「KSE 和中信兄弟（兄弟象）是什麼合作關係？」（共 15 題）
- [x] `PARTNERS[0]` 加 `aliases`（兄弟象、CTBC Brothers、中信兄弟棒球隊）與 `posts`；desc 改為「中信兄弟（前身為兄弟象）」，首頁、合作頁、llms.txt 同步
- [x] `/partners`：H1、title、description 帶「中信兄弟（兄弟象）」與「運動恢復」；中信兄弟段落補一句「前身為中華職棒創始球隊之一的兄弟象」；新增合作問答（展開顯示）與合作文章區塊；輸出 `AboutPage` + `SportsTeam`（`alternateName` 含兄弟象、`sameAs` 中文維基）
- [x] 中信兄弟文章文末加「看 KSE × 中信兄弟（兄弟象）合作」回連 `/partners`
- [x] llms.txt：合作單位列出別名、「依需求找頁面」加運動恢復與兄弟象

注意：
- 文章（`utils/posts-ig.ts`）整理自 IG 原文，不為了關鍵字改寫標題或內文
- `兄弟象` 不再擴散到其他頁，避免稀釋「台中南屯運動按摩」的權重；也不要把球隊名稱放進 Google 商家名稱
- 中信兄弟官方網站網址未經確認，`SportsTeam.sameAs` 暫只放維基百科；確認後可補官方網址
