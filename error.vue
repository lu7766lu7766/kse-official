<template>
  <div class="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-navy px-4 text-white">
    <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
    <div class="max-w-md text-center">
      <p class="font-display text-8xl font-extrabold italic text-gold">{{ error.statusCode || 404 }}</p>
      <h1 class="mt-4 text-2xl font-extrabold text-white">
        {{ is404 ? "找不到這個頁面" : "發生了一點問題" }}
      </h1>
      <p class="mt-3 text-sm text-navy-foreground">
        {{ is404 ? "頁面可能已移除或網址有誤，可以從以下連結繼續瀏覽。" : "請稍後再試，或直接回到首頁。" }}
      </p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" class="btn-gold cursor-pointer px-6 py-3 text-sm" @click="go('/')">回到首頁</button>
        <button
          type="button"
          class="cursor-pointer rounded-[2px] border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
          @click="go('/booking')"
        >
          線上預約
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();
const is404 = computed(() => (props.error.statusCode ?? 404) === 404);

useSeoMeta({
  title: is404.value ? "找不到頁面｜KSE 美式筋膜放鬆教室" : "發生錯誤｜KSE 美式筋膜放鬆教室",
  robots: "noindex, follow",
});

const go = (to: string) => clearError({ redirect: to });
</script>
