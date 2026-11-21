#!/usr/bin/env node
/**
 * 找出 KSE IG 上、官網還沒有的貼文，抓下內文、日期與圖片，給每週同步排程使用。
 *
 * 用法：node scripts/ig-sync.cjs <輸出資料夾> [貼文代碼...]
 * - 不帶貼文代碼：以未登入的瀏覽器開啟 IG 帳號頁，取最新約 12 則貼文，
 *   略過 utils/ 已經用到的貼文代碼（文章 sources）與 IGNORED_CODES
 * - 帶貼文代碼：只處理指定的貼文（例如帳號頁被要求登入時，改用手動提供的連結）
 *
 * 輸出：<輸出資料夾>/posts.json 與每則貼文的圖片 <代碼>-<序號>.jpg
 * 結束碼：0 成功（可能 0 則新貼文）；2 IG 要求登入或限流，這次無法讀取帳號頁
 *
 * 只讀公開頁面，不登入、不呼叫 IG 內部 API；Playwright 用雲端環境預裝的版本（不列入專案依賴）。
 */
const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")
const { chromium } = require("playwright")

const ACCOUNT = "kse_release_studio"
const ROOT = path.join(__dirname, "..")

/**
 * 看過、決定不做成文章的貼文（優惠活動、其他帳號的合作貼文等），避免每週重複回報。
 * 優惠活動改放在 utils/service-info.ts 的 PROMOTIONS。
 */
const IGNORED_CODES = {
  DfL4wtatN6W: "雙11 優惠（已放進 /pricing 期間限定）",
  DbdpSJBJwtt: "兩週年優惠 8/1–9/30（已過期）",
  DBDE72gPMrh: "2024 開幕優惠影片（已過期）",
  Dbx0DV0hGRm: "寶琳娜工作室的合作貼文（非 KSE 帳號）",
}

const knownCodes = () => {
  const text = fs
    .readdirSync(path.join(ROOT, "utils"))
    .filter((f) => f.endsWith(".ts"))
    .map((f) => fs.readFileSync(path.join(ROOT, "utils", f), "utf8"))
    .join("\n")
  return new Set([...text.matchAll(/(?:IG\("|instagram\.com\/(?:[\w.]+\/)?(?:p|reel)\/)([\w-]{8,})/g)].map((m) => m[1]))
}

const taipeiDate = (iso) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Taipei", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso))

/** og:title 形如「帳號名稱在 Instagram: "內文"」或「… on Instagram: "內文"」 */
const captionFromTitle = (t = "") => t.replace(/^[\s\S]*?(?:在|on) Instagram:\s*"/, "").replace(/"\s*$/, "")

async function listLatest(page) {
  await page.goto(`https://www.instagram.com/${ACCOUNT}/`, { waitUntil: "domcontentloaded", timeout: 45000 })
  await page.waitForTimeout(5000)
  if (page.url().includes("/accounts/login")) return null
  const hrefs = await page.$$eval("a[href*='/p/'], a[href*='/reel/']", (as) => as.map((a) => a.getAttribute("href")))
  const seen = new Map()
  for (const h of hrefs) {
    const m = h.match(/^\/(?:([\w.]+)\/)?(p|reel)\/([\w-]+)/)
    if (m && !seen.has(m[3])) seen.set(m[3], { code: m[3], owner: m[1] || null, kind: m[2] })
  }
  return [...seen.values()]
}

async function readPost(page, code, outDir) {
  await page.goto(`https://www.instagram.com/p/${code}/`, { waitUntil: "domcontentloaded", timeout: 45000 })
  await page.waitForTimeout(5000)
  if (page.url().includes("/accounts/login")) return { code, error: "login-wall" }
  const meta = await page.evaluate(() => ({
    title: document.querySelector('meta[property="og:title"]')?.content ?? "",
    ogUrl: document.querySelector('meta[property="og:url"]')?.content ?? "",
    time: document.querySelector("time[datetime]")?.getAttribute("datetime") ?? null,
    h1: document.querySelector("h1")?.innerText ?? "",
    video: !!document.querySelector("main video, article video"),
  }))
  // 主貼文的圖片在頁面上方；下方「更多貼文」縮圖也是大圖，用位置排除。輪播用「下一步」逐張讀取
  const images = new Map()
  for (let i = 0; i < 20; i++) {
    const found = await page.$$eval("img", (els) =>
      els
        .map((e) => {
          const r = e.getBoundingClientRect()
          return { src: e.currentSrc || e.src, alt: e.alt, top: r.top + scrollY, w: r.width }
        })
        .filter((x) => x.w > 300 && x.top < 800 && x.src.startsWith("https://")),
    )
    const before = images.size
    for (const f of found) {
      const key = f.src.split("?")[0].split("/").pop()
      if (!images.has(key)) images.set(key, f)
    }
    // 最後一張時「下一步」可能還在但點不到：點擊設短逾時，換頁後沒有新圖就結束
    if (i > 0 && images.size === before) break
    const next = await page.$('button[aria-label="下一步"]:visible, button[aria-label="Next"]:visible')
    if (!next) break
    const clicked = await next.click({ timeout: 3000 }).then(() => true, () => false)
    if (!clicked) break
    await page.waitForTimeout(1200)
  }
  const files = []
  let n = 1
  for (const img of images.values()) {
    // 用 curl 下載：Playwright 的 request 不走環境的 HTTPS proxy
    const file = `${code}-${n}.jpg`
    try {
      execFileSync("curl", ["-sfL", "--max-time", "30", "-o", path.join(outDir, file), img.src])
    } catch {
      continue
    }
    n++
    files.push({ file, alt: img.alt })
  }
  const owner = meta.ogUrl.match(/instagram\.com\/([\w.]+)\/(?:p|reel)\//)?.[1] ?? null
  const fromTitle = captionFromTitle(meta.title)
  return {
    code,
    url: `https://www.instagram.com/p/${code}/`,
    owner,
    isOwnPost: owner === ACCOUNT,
    time: meta.time,
    date: meta.time ? taipeiDate(meta.time) : null,
    isVideo: meta.video,
    caption: meta.h1.length > fromTitle.length ? meta.h1 : fromTitle,
    images: files,
  }
}

;(async () => {
  const outDir = process.argv[2]
  if (!outDir) {
    console.error("用法：node scripts/ig-sync.cjs <輸出資料夾> [貼文代碼...]")
    process.exit(1)
  }
  fs.mkdirSync(outDir, { recursive: true })
  const manual = process.argv.slice(3)
  const browser = await chromium.launch()
  const page = await browser.newPage({ locale: "zh-TW", viewport: { width: 1280, height: 1600 } })
  try {
    let codes = manual
    if (!codes.length) {
      const latest = await listLatest(page)
      if (!latest) {
        console.error("IG 要求登入（或限流），這次無法讀取帳號頁。可改用：node scripts/ig-sync.cjs <資料夾> <貼文代碼...>")
        process.exit(2)
      }
      const known = knownCodes()
      console.log(`帳號頁最新 ${latest.length} 則，官網已有 ${latest.filter((p) => known.has(p.code)).length} 則`)
      for (const p of latest.filter((p) => !known.has(p.code) && IGNORED_CODES[p.code]))
        console.log(`略過 ${p.code}：${IGNORED_CODES[p.code]}`)
      codes = latest.filter((p) => !known.has(p.code) && !IGNORED_CODES[p.code]).map((p) => p.code)
    }
    const posts = []
    for (const code of codes) {
      const post = await readPost(page, code, outDir)
      posts.push(post)
      console.log(post.error ? `${code}：${post.error}` : `${code}：${post.date}，${post.owner}，${post.images.length} 張圖${post.isVideo ? "，含影片" : ""}`)
    }
    fs.writeFileSync(path.join(outDir, "posts.json"), JSON.stringify(posts, null, 2))
    console.log(`新貼文 ${posts.length} 則 → ${path.join(outDir, "posts.json")}`)
  } finally {
    await browser.close()
  }
})()
