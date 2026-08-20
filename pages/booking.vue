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

const { injectLocalBusinessSchema, injectBreadcrumbsSchema } = useGeoSchema()
injectLocalBusinessSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "線上預約放鬆", item: "/booking" },
])

const SEO_TITLE = "線上預約｜KSE 美式筋膜放鬆教室｜台中按摩・南屯筋膜放鬆與運動按摩"
const SEO_DESC = "KSE 官方線上預約系統：位於台中市南屯區大墩七街202號。提供專業美式筋膜放鬆、台中運動按摩、南屯肌肉放鬆與動作評估預約。採全線上預約制，支援每週即時空檔點選與查詢。"

useHead({
  title: SEO_TITLE,
  meta: [
    { name: "description", content: SEO_DESC },
    {
      name: "keywords",
      content: "台中按摩預約,南屯按摩預約,台中運動按摩預約,台中筋膜放鬆預約,KSE預約,肌肉緊繃放鬆預約,南屯筋膜放鬆,美式筋膜放鬆",
    },
    { property: "og:title", content: SEO_TITLE },
    { property: "og:description", content: SEO_DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.kse-release.com.tw/booking" },
  ],
  link: [{ rel: "canonical", href: "https://www.kse-release.com.tw/booking" }],
})
</script>
