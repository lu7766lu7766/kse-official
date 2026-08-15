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
import { BRAND } from "~/utils/site-data"

const siteUrl = "https://www.kse-release.com.tw"
const defaultTitle = "KSE 美式筋膜放鬆教室｜台中南屯運動按摩・動作控制與運動恢復"
const defaultDesc =
  "位於台中南屯的專業筋膜放鬆與運動按摩教室。結合靜態與動態動作評估、徒手美式筋膜技術與核心動作控制訓練，協助運動員與久坐族改善活動度、緩解緊繃並預防運動傷害。"
const ogImageUrl = `${siteUrl}/og-image.jpg`

useSeoMeta({
  title: defaultTitle,
  titleTemplate: (titleChunk) => (titleChunk ? (titleChunk.includes("KSE") ? titleChunk : `${titleChunk}｜KSE 美式筋膜放鬆教室`) : defaultTitle),
  description: defaultDesc,
  // Open Graph
  ogSiteName: "KSE 美式筋膜放鬆教室",
  ogTitle: defaultTitle,
  ogDescription: defaultDesc,
  ogImage: ogImageUrl,
  ogImageSecureUrl: ogImageUrl,
  ogImageType: "image/jpeg",
  ogImageWidth: 1600,
  ogImageHeight: 1008,
  ogImageAlt: "KSE 美式筋膜放鬆教室 - 專業運動按摩與動作恢復",
  ogUrl: siteUrl,
  ogLocale: "zh_TW",
  ogType: "website",
  // Twitter Card
  twitterCard: "summary_large_image",
  twitterTitle: defaultTitle,
  twitterDescription: defaultDesc,
  twitterImage: ogImageUrl,
  twitterImageAlt: "KSE 美式筋膜放鬆教室 - 專業運動按摩與動作恢復",
  // Robots
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
})

const schemaOrg = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: BRAND.name,
      description: defaultDesc,
      inLanguage: "zh-TW",
    },
    {
      "@type": ["LocalBusiness", "SportsActivityLocation", "HealthAndBeautyBusiness"],
      "@id": `${siteUrl}/#organization`,
      name: BRAND.name,
      alternateName: BRAND.full,
      url: siteUrl,
      logo: `${siteUrl}/favicon.png`,
      image: ogImageUrl,
      telephone: BRAND.phone,
      description: defaultDesc,
      slogan: BRAND.slogan,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "大墩七街202號",
        addressLocality: "台中市",
        addressRegion: "南屯區",
        postalCode: "408",
        addressCountry: "TW",
      },
      sameAs: [BRAND.fb, BRAND.ig, BRAND.line],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "09:00",
          closes: "21:00",
        },
      ],
    },
  ],
}

useHead({
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify(schemaOrg),
    },
  ],
})
</script>
