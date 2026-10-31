import { PAGE_UPDATED, POSTS, SERVICES, servicePath, SITE_URL } from "~/utils/site-data"

// 單一來源：nuxt generate 時 prerender 成 .output/public/sitemap.xml（見 nuxt.config.ts nitro.prerender）
// lastmod 一律用「內容」實際修改日，不用 build 日期：
// - 靜態頁：utils/site-data.ts 的 PAGE_UPDATED（改頁面文案時手動更新）
// - 服務頁：SERVICES[].updated
// - /news 與文章：POSTS 的 updated ?? date
export default defineEventHandler((event) => {
  const latestPost = POSTS.map((p) => p.updated ?? p.date).sort().at(-1)

  const urls = [
    ...Object.entries(PAGE_UPDATED).map(([path, lastmod]) => ({ loc: `${SITE_URL}${path}`, lastmod })),
    ...SERVICES.map((s) => ({ loc: `${SITE_URL}${servicePath(s.slug)}`, lastmod: s.updated })),
    { loc: `${SITE_URL}/news`, lastmod: latestPost },
    ...POSTS.map((post) => ({ loc: `${SITE_URL}/news/${post.slug}`, lastmod: post.updated ?? post.date })),
  ]

  setHeader(event, "Content-Type", "application/xml; charset=utf-8")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map((u) => `  <url>\n    <loc>${u.loc}</loc>${u.lastmod ? `\n    <lastmod>${u.lastmod}</lastmod>` : ""}\n  </url>`)
  .join("\n")}
</urlset>
`
})
