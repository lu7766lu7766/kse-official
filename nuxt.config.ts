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
        class: "dark",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "viewport",
          content:
            "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no, viewport-fit=cover",
        },
        { "http-equiv": "Cache-Control", content: "no-cache, no-store, must-revalidate" },
        { "http-equiv": "Pragma", content: "no-cache" },
        { "http-equiv": "Expires", content: "0" },
        { name: "keywords", content: "台中按摩, 南屯按摩放鬆, 台中運動按摩, 台中筋膜放鬆, 美式筋膜放鬆, 肌肉緊繃放鬆, 受傷後恢復, 運動傷害防護, 台中南屯按摩, 動作訓練, 線上預約按摩, 大墩七街按摩" },
        { name: "geo.region", content: "TW-TXG" },
        { name: "geo.placename", content: "台中市南屯區" },
        { name: "geo.position", content: "24.14324;120.64756" },
        { name: "ICBM", content: "24.14324, 120.64756" },
        { property: "og:site_name", content: "KSE 美式筋膜放鬆教室" },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    },
  },
  routeRules: {
    "/**": {
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  },
})
