<template>
  <div>
    <!-- 頂部 Hero 區塊 -->
    <PageHero
      eyebrow="Online Booking"
      title="線上預約"
      desc="採預約制，請至少提前 3 小時預約。選擇按摩師與時段，體驗美式筋膜放鬆、運動按摩與動作評估服務。"
      :crumbs="[{ label: '線上預約' }]"
    >
      <p class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
        <NuxtLink to="/pricing" class="text-gold underline-offset-4 hover:underline">價目表（新客 {{ ntd(PRICING.firstVisit.price) }}）</NuxtLink>
        <NuxtLink to="/notice" class="text-gold underline-offset-4 hover:underline">預約前請閱讀服務注意事項</NuxtLink>
      </p>
    </PageHero>

    <!-- 預約核心區塊元件 -->
    <BookingSection :liff-id="config.public.bookingLiffId" />
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue"
import BookingSection from "~/components/booking/BookingSection.vue"
import { ntd, PRICING } from "~/utils/service-info"

const config = useRuntimeConfig()

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "線上預約", item: "/booking" },
])

usePageSeo({
  title: "線上預約｜台中南屯運動按摩・筋膜放鬆｜KSE",
  description:
    "KSE 美式筋膜放鬆教室官方線上預約：即時查看按摩師週排班與空檔，預約美式筋膜放鬆、運動按摩與動作評估，也可查詢或取消預約。台中市南屯區大墩七街202號，每日 11:00–22:00。",
  path: "/booking",
})
</script>
