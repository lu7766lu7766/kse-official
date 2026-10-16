import tailwindcss from "@tailwindcss/vite"

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
        { name: "geo.position", content: "24.14324;120.64756" },
        { name: "ICBM", content: "24.14324, 120.64756" },
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
  nitro: {
    prerender: {
      // 未被連結爬到的頁面（LIFF 入口）與 server route 產物需明確列出，靜態部署才會有實體檔
      routes: ["/reserve", "/bind", "/sitemap.xml", "/robots.txt", "/llms.txt"],
    },
  },
})
