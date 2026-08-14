import tailwindcss from "@tailwindcss/vite"

const isDev = process.env.NUXT_ENV === "dev"

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-08-13",
  devtools: { enabled: false },
  ssr: true,
  css: ["~/assets/css/styles.css"],
  routeRules: {
    ...(isDev
      ? {
          "/**": {
            headers: {
              "X-Robots-Tag": "noindex, nofollow",
              "X-UA-Compatible": "IE=edge",
            },
          },
        }
      : {}),
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3333",
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
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { property: "og:site_name", content: "KSE 美式筋膜放鬆教室" },
        { property: "og:locale", content: "zh_TW" },
        { property: "og:type", content: "website" },
        { name: "keywords", content: "台中運動按摩, 台中筋膜放鬆, 美式筋膜放鬆, 肌肉緊繃放鬆, 受傷後恢復, 運動傷害防護, 台中南屯按摩, 動作訓練" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(isDev ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      ],
      link: [
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    },
  },
})
