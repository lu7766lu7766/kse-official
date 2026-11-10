import tailwindcss from "@tailwindcss/vite"
import { imagetools } from "vite-imagetools"
import { BRAND } from "./utils/site-data"

/** 圖片網址以這些副檔名結尾時，不讓瀏覽器預先下載（見下方 build:manifest） */
const IMAGE_ASSET = /\.(?:png|jpe?g|webp|avif|gif|svg)$/i

/** 響應式寬度：小於原圖寬的才產生，最大不超過 1600 */
const RESPONSIVE_WIDTHS = [320, 480, 960, 1440]
const RESPONSIVE_MAX = 1600

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-08-13",
  devtools: { enabled: false },
  ssr: true,
  css: [
    // 自架標題字（只含拉丁字），取代外部 Google Fonts，避免阻擋首屏渲染
    "@fontsource/barlow-condensed/latin-600.css",
    "@fontsource/barlow-condensed/latin-700.css",
    "@fontsource/barlow-condensed/latin-800.css",
    "@fontsource/barlow-condensed/latin-800-italic.css",
    "~/assets/css/styles.css",
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3333",
      reserveLiffId: process.env.NUXT_PUBLIC_RESERVE_LIFFF_ID || "",
      bookingLiffId: process.env.NUXT_PUBLIC_BOOKING_LIFF_ID || "",
      bindLiffId: process.env.NUXT_PUBLIC_BIND_LIFF_ID || "",
    },
  },
  vite: {
    plugins: [
      tailwindcss(),
      // `?responsive`：build 時轉成多個寬度的 WebP，回傳 { src, w, h, srcset }（見 utils/images.ts）
      imagetools({
        defaultDirectives: async (url, metadata) => {
          if (!url.searchParams.has("responsive")) return new URLSearchParams()
          const { width = RESPONSIVE_MAX } = await metadata()
          const max = Math.min(width, RESPONSIVE_MAX)
          // 與最大寬差不到 15% 的就不另外產生，避免幾乎一樣大的檔案
          const widths = [...RESPONSIVE_WIDTHS.filter((w) => w < max * 0.85), max]
          return new URLSearchParams({ w: widths.join(";"), format: "webp", quality: "75", as: "img" })
        },
      }),
    ],
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
        { rel: "icon", href: "/favicon.ico", sizes: "48x48" },
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
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
  hooks: {
    // Nuxt 預設會把所有頁面用到的圖片都輸出成 <link rel="prefetch" as="image">（每頁約 100 個、10MB 以上），
    // 讓手機在閒置時把整站照片下載一遍。圖片改由各頁 <img> 自己載入
    "build:manifest": (manifest) => {
      for (const [key, chunk] of Object.entries(manifest)) {
        if (IMAGE_ASSET.test(key) || IMAGE_ASSET.test(chunk.file)) {
          chunk.prefetch = false
          chunk.preload = false
        }
        if (chunk.assets) chunk.assets = chunk.assets.filter((a) => !IMAGE_ASSET.test(a))
      }
    },
  },
  nitro: {
    prerender: {
      // 未被連結爬到的頁面（LIFF 入口）與 server route 產物需明確列出，靜態部署才會有實體檔
      routes: ["/reserve", "/bind", "/sitemap.xml", "/robots.txt", "/llms.txt"],
    },
  },
})
