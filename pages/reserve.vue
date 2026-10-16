<template>
  <div class="min-h-screen bg-background text-foreground">
    <main id="main">
      <BookingSection :liff-id="config.public.reserveLiffId" />
    </main>
  </div>
</template>

<script setup lang="ts">
import BookingSection from "~/components/booking/BookingSection.vue"
import { SITE_URL } from "~/utils/site-data"

const config = useRuntimeConfig()

definePageMeta({
  layout: false,
})

// LIFF 專用入口，與 /booking 內容重複：不索引，canonical 指回 /booking
useSeoMeta({
  title: "快速預約｜KSE 美式筋膜放鬆教室",
  description: "KSE 美式筋膜放鬆教室 LINE 快速預約。",
  robots: "noindex, follow",
})
useHead({ link: [{ rel: "canonical", href: `${SITE_URL}/booking` }] })
</script>
