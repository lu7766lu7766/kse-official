<template>
  <div class="min-h-screen bg-background text-foreground">
    <a
      href="#main"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
    >
      跳至主要內容
    </a>
    <SiteHeader />
    <main id="main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue"
import SiteFooter from "~/components/SiteFooter.vue"
import { buildSiteGraph } from "~/composables/useGeoSchema"
import { SITE_URL } from "~/utils/site-data"

const BRAND_SUFFIX = "KSE 美式筋膜放鬆教室"
const defaultTitle = "台中運動按摩・南屯美式筋膜放鬆｜KSE 美式筋膜放鬆教室"
const defaultDesc =
  "KSE 美式筋膜放鬆教室位於台中市南屯區大墩七街202號，以評估、筋膜放鬆、動作訓練與肌力強化四步流程，處理肌肉緊繃、活動度受限與運動後恢復。每日 11:00–22:00，線上預約。"
const ogImageUrl = `${SITE_URL}/og-image.jpg`

useSeoMeta({
  title: defaultTitle,
  // 各頁 title 已含 KSE 就不重複加品牌尾綴
  titleTemplate: (titleChunk) => {
    if (!titleChunk) return defaultTitle
    return titleChunk.includes("KSE") ? titleChunk : `${titleChunk}｜${BRAND_SUFFIX}`
  },
  description: defaultDesc,
  ogSiteName: BRAND_SUFFIX,
  ogTitle: defaultTitle,
  ogDescription: defaultDesc,
  ogImage: ogImageUrl,
  ogImageSecureUrl: ogImageUrl,
  ogImageType: "image/jpeg",
  ogImageWidth: 1200,
  ogImageHeight: 630,
  ogImageAlt: "KSE 放鬆師在台中南屯教室為客人進行腿後側筋膜放鬆",
  ogLocale: "zh_TW",
  ogType: "website",
  twitterCard: "summary_large_image",
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
})

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(buildSiteGraph(defaultDesc)),
    },
  ],
})
</script>
