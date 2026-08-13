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
    <MobileBookingBar />
  </div>
</template>

<script setup lang="ts">
import SiteHeader from "~/components/SiteHeader.vue";
import SiteFooter from "~/components/SiteFooter.vue";
import MobileBookingBar from "~/components/MobileBookingBar.vue";
</script>
