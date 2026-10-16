<template>
  <footer class="relative isolate overflow-hidden bg-navy pt-16 pb-10 text-navy-foreground">
    <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
    <div class="container-kse grid gap-12 lg:grid-cols-[1.3fr_1fr_1.2fr]">
      <div>
        <div class="inline-flex items-center rounded-[2px] bg-white px-4 py-2.5">
          <img
            src="~/assets/images/kse-logo-horizontal-dark.png"
            alt="KSE 美式筋膜放鬆教室"
            width="400"
            height="63"
            class="h-8 w-auto object-contain"
            loading="lazy"
          />
        </div>
        <p class="mt-5 max-w-sm text-sm leading-relaxed">
          台中南屯的美式筋膜放鬆與運動按摩教室。以評估為起點，用筋膜放鬆打開限制，再用動作與訓練把改變留下來。
        </p>
        <p class="mt-6 font-display text-lg font-bold tracking-[0.12em] text-gold">{{ BRAND.slogan }}</p>
      </div>

      <nav aria-label="頁尾導覽">
        <h2 class="text-xs font-bold tracking-[0.2em] text-white">網站導覽</h2>
        <ul class="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink :to="item.to" class="transition-colors hover:text-white">{{ item.label }}</NuxtLink>
          </li>
        </ul>
      </nav>

      <!-- NAP 與 schema、Google 商家保持一字不差 -->
      <div>
        <h2 class="text-xs font-bold tracking-[0.2em] text-white">聯絡與位置</h2>
        <address class="mt-4 space-y-2.5 text-sm not-italic">
          <p>
            <a :href="BRAND.mapUrl" target="_blank" rel="noopener noreferrer" class="text-white underline-offset-4 hover:underline">
              {{ BRAND.address }}
            </a>
          </p>
          <p>營業時間：{{ BRAND.hours.label }}（預約制）</p>
          <p>
            電話：<a :href="`tel:${BRAND.phone.replace(/-/g, '')}`" class="text-white underline-offset-4 hover:underline">{{ BRAND.phone }}</a>
          </p>
          <p class="flex flex-wrap gap-x-4 gap-y-1 pt-1">
            <a :href="BRAND.line" target="_blank" rel="noopener noreferrer" class="hover:text-white">LINE 官方帳號</a>
            <a :href="BRAND.ig" target="_blank" rel="noopener noreferrer" class="hover:text-white">Instagram</a>
            <a :href="BRAND.fb" target="_blank" rel="noopener noreferrer" class="hover:text-white">Facebook</a>
          </p>
        </address>
      </div>
    </div>

    <div class="container-kse mt-12 border-t border-white/10 pt-6 text-xs">
      © {{ currentYear }} {{ BRAND.name }}・台中筋膜放鬆・台中運動按摩・南屯運動恢復
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BRAND, NAV } from "~/utils/site-data";

const currentYear = computed(() => new Date().getFullYear());
</script>
