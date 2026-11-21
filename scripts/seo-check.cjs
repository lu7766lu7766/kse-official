#!/usr/bin/env node
/**
 * 檢查 nuxt generate 產出（.output/public）裡 sitemap 列出的每一頁：檔案存在、canonical 指向自己、沒有 noindex、
 * 只有一個 H1、麵包屑與 BreadcrumbList 一致、FAQPage 問答與頁面文字一致，以及站內連結沒有 404。
 * 用法：node scripts/seo-check.cjs .output/public（最後一行 "pages with issues: 0" 代表通過）
 */
const fs = require("fs"), path = require("path")
const root = process.argv[2]
const SITE = "https://www.kse-release.com.tw"
const sitemap = fs.readFileSync(path.join(root, "sitemap.xml"), "utf8")
const locs = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1])
const fileFor = (p) => {
  const clean = p.replace(/\/$/, "")
  for (const f of [path.join(root, clean, "index.html"), path.join(root, clean + ".html")]) if (fs.existsSync(f)) return f
  return null
}
const decode = (s) => s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'")
const strip = (s) => decode(s.replace(/<!--.*?-->/gs, "").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim()
let problems = 0
const internal = new Set()
const report = []
for (const loc of locs) {
  const p = loc.replace(SITE, "") || "/"
  const f = fileFor(p)
  if (!f) { console.log("MISSING", p); problems++; continue }
  const html = fs.readFileSync(f, "utf8")
  const title = decode(html.match(/<title>(.*?)<\/title>/s)?.[1] ?? "")
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "")
  const canon = html.match(/<link rel="canonical" href="([^"]*)"/g) ?? []
  const robots = html.match(/<meta name="robots" content="([^"]*)"/g) ?? []
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length
  const lds = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)].map((m) => JSON.parse(m[1]))
  const types = lds.flatMap((d) => (d["@graph"] ? d["@graph"].map((g) => g["@type"]) : [d["@type"]])).map((t) => [].concat(t).join("+"))
  const issues = []
  if (canon.length !== 1 || !canon[0].includes(`href="${loc}"`)) issues.push("canonical " + canon.join(","))
  if (robots.some((r) => /noindex/.test(r))) issues.push("noindex")
  if (h1 !== 1) issues.push("h1=" + h1)
  // breadcrumb vs visible nav
  const bc = lds.find((d) => d["@type"] === "BreadcrumbList")
  const nav = html.match(/<nav aria-label="麵包屑"[^>]*>(.*?)<\/nav>/s)?.[1]
  if (bc) {
    const names = bc.itemListElement.map((i) => i.name)
    const visible = nav ? [...nav.matchAll(/<li[^>]*>(.*?)<\/li>/gs)].map((m) => strip(m[1])).filter((t) => t && t !== "/").map((t) => t.replace(/^\/\s*/, "")) : []
    if (JSON.stringify(names) !== JSON.stringify(visible)) issues.push(`breadcrumb mismatch ld=${JSON.stringify(names)} visible=${JSON.stringify(visible)}`)
    if (bc.itemListElement.at(-1).item !== loc) issues.push("breadcrumb last item != url")
  } else if (p !== "/") issues.push("no BreadcrumbList")
  // FAQPage text must be visible
  const faq = lds.find((d) => d["@type"] === "FAQPage")
  if (faq) {
    const body = strip(html.replace(/<script.*?<\/script>/gs, ""))
    for (const q of faq.mainEntity) {
      if (!body.includes(q.name)) issues.push("faq q not visible: " + q.name)
      if (!body.includes(q.acceptedAnswer.text)) issues.push("faq a not visible: " + q.name)
    }
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) internal.add(m[1])
  if (issues.length) problems++
  report.push({ p, title, tlen: title.length, desc, dlen: desc.length, h1, types: [...new Set(types)].join(" "), issues })
}
for (const r of report) console.log(JSON.stringify(r))
const broken = [...internal].filter((l) => !fileFor(l) && !["/sitemap.xml", "/robots.txt", "/llms.txt"].includes(l))
console.log("internal links:", internal.size, "broken:", JSON.stringify(broken))
console.log("pages:", locs.length, "pages with issues:", problems)
