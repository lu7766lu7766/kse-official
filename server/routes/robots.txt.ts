import { SITE_URL } from "~/utils/site-data";

export default defineEventHandler((event) => {
  const content = `User-agent: *
Allow: /

# AI Engine Search Crawlers (GEO Optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: Bytespider
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

  setHeader(event, "Content-Type", "text/plain; charset=utf-8");
  return content;
});
