<template>
  <div
    class="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 backdrop-blur lg:hidden"
  >
    <NuxtLink
      to="/faq#booking"
      class="flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-primary text-base font-bold text-primary-foreground"
    >
      <CalendarCheck class="h-5 w-5" aria-hidden="true" />
      立即預約
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { CalendarCheck } from "lucide-vue-next";
</script>
