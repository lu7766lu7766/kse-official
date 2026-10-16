import { POSTS, SITE_URL } from "~/utils/site-data"

// 單一來源：nuxt generate 時 prerender 成 .output/public/sitemap.xml（見 nuxt.config.ts nitro.prerender）
// 新增文章只要改 utils/site-data.ts 的 POSTS，sitemap 會自動帶上
const STATIC_PAGES = ["/", "/services", "/kse", "/booking", "/faq", "/partners", "/cases", "/news"]

export default defineEventHandler((event) => {
  const buildDate = new Date().toISOString().split("T")[0]
  const latestPost = POSTS.map((p) => p.updated ?? p.date).sort().at(-1) ?? buildDate

  const urls = [
    ...STATIC_PAGES.map((path) => ({ loc: `${SITE_URL}${path}`, lastmod: path === "/news" ? latestPost : buildDate })),
    ...POSTS.map((post) => ({ loc: `${SITE_URL}/news/${post.slug}`, lastmod: post.updated ?? post.date })),
  ]

  setHeader(event, "Content-Type", "application/xml; charset=utf-8")
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join("\n")}
</urlset>
`
})
