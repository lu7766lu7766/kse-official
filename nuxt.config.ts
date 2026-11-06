import tailwindcss from "@tailwindcss/vite"
import { BRAND } from "./utils/site-data"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-08-13",
  devtools: { enabled: false },
  ssr: true,
  css: ["~/assets/css/styles.css"],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3333",
      reserveLiffId: process.env.NUXT_PUBLIC_RESERVE_LIFFF_ID || "",
      bookingLiffId: process.env.NUXT_PUBLIC_BOOKING_LIFF_ID || "",
      bindLiffId: process.env.NUXT_PUBLIC_BIND_LIFF_ID || "",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant-TW",
      },
      meta: [
        { charset: "utf-8" },
        // 官網保留縮放（無障礙）；LIFF 頁面另由 plugins/prevent-zoom.client.ts 鎖定
        { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
        { name: "theme-color", content: "#0b1b2e" },
        { name: "geo.region", content: "TW-TXG" },
        { name: "geo.placename", content: "台中市南屯區" },
        { name: "geo.position", content: `${BRAND.geo.latitude};${BRAND.geo.longitude}` },
        { name: "ICBM", content: `${BRAND.geo.latitude}, ${BRAND.geo.longitude}` },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/logo.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        // 只載入拉丁字的運動感標題字（數字、英文標語），中文沿用系統字以維持效能
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,600;0,700;0,800;1,800&display=swap",
        },
      ],
    },
  },
  // 轉址新增或修改時，nginx-entrypoint.sh 也要加同一條 return 301（正式站靠 nginx 送真正的 301）
  routeRules: {
    // 案例分享頁已移除，舊網址導回首頁
    "/cases": { redirect: { to: "/", statusCode: 301 } },
    // 原本 4 篇自撰文章已改以 IG／FB 貼文整理的文章為主，舊網址導向內容最接近的新文章
    "/news/recovery-after-game": { redirect: { to: "/news/post-workout-recovery", statusCode: 301 } },
    "/news/fascia-basics": { redirect: { to: "/news/muscle-vs-fascia", statusCode: 301 } },
    "/news/core-stability-desk": { redirect: { to: "/news/pelvic-tilt-causes", statusCode: 301 } },
    "/news/youth-strength": { redirect: { to: "/news/yuying-basketball-training", statusCode: 301 } },
    // 短篇「運動按摩是什麼」已整併進完整指南（同主題只留一頁，避免自家文章互搶）
    "/news/sports-massage-for-everyone": { redirect: { to: "/news/sports-massage-guide", statusCode: 301 } },
  },
  nitro: {
    prerender: {
      // 未被連結爬到的頁面（LIFF 入口）與 server route 產物需明確列出，靜態部署才會有實體檔
      routes: ["/reserve", "/bind", "/sitemap.xml", "/robots.txt", "/llms.txt"],
    },
  },
})
