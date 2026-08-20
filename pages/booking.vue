<template>
  <div>
    <!-- 頂部 Hero 區塊 -->
    <PageHero eyebrow="Online Booking" title="線上預約放鬆" desc="採預約制（請至少提前半小時以上預約）。歡迎點選合適的按摩師與時段，體驗美式筋膜放鬆、運動按摩與動作評估服務。" />

    <!-- 預約核心區塊元件 -->
    <BookingSection :liff-id="config.public.bookingLiffId" />
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue"
import BookingSection from "~/components/booking/BookingSection.vue"
import { BRAND } from "~/utils/site-data"

const config = useRuntimeConfig()

const SEO_TITLE = "線上預約｜KSE 美式筋膜放鬆教室｜台中運動按摩與動作評估"
const SEO_DESC = "KSE 官方線上預約系統：提供專業運動按摩、美式徒手筋膜放鬆、動作評估預約。支援週曆時段點選、線上預約查詢與取消。"

useHead({
  title: SEO_TITLE,
  meta: [
    { name: "description", content: SEO_DESC },
    {
      name: "keywords",
      content: "台中運動按摩預約,筋膜放鬆預約,KSE預約,南屯按摩預約,運動傷害恢復,動作訓練預約,美式筋膜放鬆",
    },
    { property: "og:title", content: SEO_TITLE },
    { property: "og:description", content: SEO_DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.kse-release.com.tw/booking" },
  ],
  link: [{ rel: "canonical", href: "https://www.kse-release.com.tw/booking" }],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "HealthAndBeautyBusiness",
        name: BRAND.name,
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.address,
          addressLocality: "台中市",
          addressCountry: "TW",
        },
        telephone: BRAND.phone,
        url: "https://www.kse-release.com.tw/booking",
        openingHours: "Mo-Su 09:00-21:00",
      }),
    },
  ],
})
</script>
