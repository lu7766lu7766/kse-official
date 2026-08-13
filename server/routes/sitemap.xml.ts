import { POSTS } from "~/utils/site-data";

export default defineEventHandler((event) => {
  const baseUrl = "https://kse-release.com";

  const staticPages = [
    "",
    "/kse",
    "/services",
    "/partners",
    "/cases",
    "/news",
    "/faq",
  ];

  const articlePages = POSTS.map((post) => `/news/${post.slug}`);

  const allPages = [...staticPages, ...articlePages];

  const currentDate = new Date().toISOString().split("T")[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.startsWith("/news/") ? "monthly" : "weekly"}</changefreq>
    <priority>${page === "" ? "1.0" : page.startsWith("/news/") ? "0.7" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  setHeader(event, "Content-Type", "application/xml; charset=utf-8");
  return xml;
});
