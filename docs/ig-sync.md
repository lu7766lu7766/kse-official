# IG 每週同步流程

每週排程照這份文件執行：找出 KSE IG（`kse_release_studio`）上官網還沒有的貼文，依 SEO／AEO／GEO 整理成文章，驗證後直接推上 `main`（Railway 會自動部署）。
業主已同意：同步的文章可以調整文案與結構，完成驗證後直接更新 `main`，不需要再逐次確認。

## 1. 準備

```bash
git fetch origin main && git checkout main && git pull --ff-only origin main
npm ci   # node_modules 不存在時才需要
```

## 2. 抓取 IG

```bash
node scripts/ig-sync.cjs /tmp/ig-sync
```

- 結束碼 2：IG 要求登入或限流。等 10 分鐘再試一次；仍失敗就停止，回報「本週無法讀取 IG 帳號頁」，不要改任何檔案。
- **不要**用登入的帳號 cookie、IG 內部 API 或第三方鏡像站繞過登入。
- 已在官網的貼文代碼（`utils/*.ts` 裡的 IG 網址）與 `scripts/ig-sync.cjs` 的 `IGNORED_CODES` 會自動略過。
- 結果在 `/tmp/ig-sync/posts.json`：`code`、`url`、`owner`、`isOwnPost`、`date`（台灣日期）、`isVideo`、`caption`、`images`（已下載的檔名）。

## 3. 清掉過期優惠

`utils/service-info.ts` 的 `PROMOTIONS` 中，`end` 早於台灣今天的項目直接刪除，並把 `utils/site-data.ts` 的 `PAGE_UPDATED["/pricing"]` 改成今天。

## 4. 分類每則新貼文

| 類型 | 處理方式 |
|---|---|
| 不是 KSE 帳號發的（`isOwnPost: false`，例如合作夥伴的貼文） | 不做成文章，加進 `IGNORED_CODES` 並寫原因 |
| 優惠活動（有價格或活動期間） | 活動還沒結束：加進 `PROMOTIONS`（只寫貼文上明確寫的價格、對象、期間；沒寫結束日就不要加，改列在回報裡請業主確認）。已結束：略過。兩種都加進 `IGNORED_CODES` |
| 影片為主、文字很少（只有一兩句宣傳） | 略過，加進 `IGNORED_CODES` |
| 主題和現有文章幾乎相同 | 優先補進現有文章：在該文章 `sources` 加上新貼文網址、補上新資訊、更新 `updated`；沒有新資訊就略過並加進 `IGNORED_CODES` |
| 衛教、知識、案例、合作、活動紀錄 | 做成新文章（下一節） |

## 5. 新文章寫法（`utils/posts-ig.ts`）

照現有文章的格式加一個物件，依 `date` 放在檔案中對應的位置。

**欄位**
- `slug`：英文小寫、用連字號、描述主題（例如 `text-neck-weight`），不可和現有文章重複，之後不能再改。
- `title`（H1）：寫成讀者會搜尋的問句或「主題＋重點」，約 30 個全形字以內。
- `seoTitle`（選填）：要把搜尋詞往前放時才用，結尾 `｜KSE`，約 30 個全形字以內。
- `date`：`posts.json` 的 `date`（台灣日期）。不要填 `updated`。
- `category`：`CATEGORIES` 其中之一（KSE活動、合作消息、運動恢復、筋膜放鬆、動作訓練、肌力與體能）。
- `excerpt`：約 80 字，寫出這篇回答什麼問題、給誰看。
- `summary`：60–90 字，**第一句直接回答主題問題或給出定義**，讓搜尋精選摘要與 AI 可以整句引用。
- `image`／`gallery`：把 `/tmp/ig-sync/<code>-N.jpg` 複製成 `assets/images/news/<slug>-N.jpg`；`image` 用 `<slug>-1`，其餘放 `gallery`。
- `alt`：描述圖片內容；圖卡就寫出圖卡上的重點文字，不要寫「圖片1」。
- `sources: [IG("<code>")]`；不要填 `author`（除非業主告知作者）。

**內文 `body`**
- 用 `{ h2: "…？" }` 把內容分段，小標寫成大家實際會搜尋的問句；每個小標下方第一段先直接回答。
- 原因、步驟、比較用 `{ ul: [...] }` 條列；有多欄比較時才用 `table`。
- 去掉 emoji、hashtag、「私訊預約」這類社群用語，改成完整句子。
- 全文加**一次**站內連結，用 `{ p: ["…", { to: "/services/…", text: "錨點文字" }, "…"] }`，連到最相關的頁面：
  - 運動恢復、賽後恢復、南屯在地服務 → `/services/sports-massage`，錨點「南屯運動按摩」或「運動恢復」
  - 筋膜、緊繃、活動度 → `/services/fascia`，錨點「台中筋膜放鬆」或「美式筋膜放鬆」
  - 久坐、核心、姿勢 → `/services/core`；肌力、體能、青少年運動員 → `/services/strength`
  - 「運動按摩是什麼／禁忌」類問題 → `/news/sports-massage-guide`；價格 → `/pricing`，錨點「完整價目表」
- 談到疼痛或身體不適的文章，結尾加：「若有明顯疼痛、麻木或受傷，請先就醫評估。」

**禁止事項**
- 只能用貼文原文與官網既有資料（`utils/site-data.ts`、`utils/service-info.ts`）中的事實。
- 不新增療效、醫療或研究主張，不編造數據、評論、證照或客人說法。
- 文章裡不寫價格（貼文的價格可能已過期），需要時連到 `/pricing`。
- 不搶其他頁的主要關鍵字：「台中運動按摩」歸首頁、「運動按摩是什麼／禁忌」歸運動按摩指南、「運動按摩價格」歸 `/pricing`。
- 不建立西屯、北屯等沒有實際據點的地區內容。

## 6. 驗證（全部通過才可以推）

```bash
npx nuxi generate
npx vue-tsc --noEmit                         # 0 個 error TS（vue-router volar 的警告可忽略）
node scripts/seo-check.cjs .output/public    # 最後一行要是 "pages with issues: 0"，broken 為 []
```

再把每篇新文章（與改過的 `/pricing`）的 HTML 送到 validator.schema.org，必須 0 錯誤：

```bash
curl -s -X POST https://validator.schema.org/validate --data-urlencode "html@.output/public/news/<slug>/index.html" | tail -n +2 | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['totalNumErrors'], d['totalNumWarnings'])"
```

## 7. 上線

- 沒有任何檔案變動：不要 commit。
- 有變動：在 `main` commit（訊息例如 `content: sync 2 IG posts (2026-11-28)`），`git push origin main`。
- 等正式站更新（每 30 秒 `curl` 一次新文章網址，直到回 200，最多 20 分鐘），再確認新文章的 `<title>` 與 JSON-LD 在原始 HTML 裡。

## 8. 回報

用中文列出：
1. 新增的文章（網址、標題）
2. 加入或刪除的期間限定優惠
3. 略過的貼文與原因
4. 驗證與部署結果；失敗的話寫出卡在哪一步
5. 提醒業主到 Search Console 對新文章網址按「要求建立索引」
