<template>
  <footer class="border-t border-border bg-ink py-16">
    <div class="container-kse grid gap-12 lg:grid-cols-3">
      <div>
        <div class="inline-flex items-center rounded-md bg-white px-5 py-3">
          <img
            src="~/assets/images/kse-logo-horizontal-dark.png"
            alt="KSE 美式筋膜放鬆教室 American Fascia Release Studio"
            class="h-10 w-auto object-contain"
            loading="lazy"
          />
        </div>

        <p class="mt-2 text-sm text-muted-foreground">{{ BRAND.full }}</p>
        <p class="mt-6 text-sm font-bold tracking-[0.16em] text-primary">
          {{ BRAND.slogan }}
        </p>
      </div>

      <nav aria-label="頁尾導覽">
        <h2 class="text-sm font-bold tracking-[0.2em] text-foreground">
          網站導覽
        </h2>
        <ul class="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
          <li v-for="item in NAV" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="transition-colors hover:text-foreground"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <div>
        <h2 class="text-sm font-bold tracking-[0.2em] text-foreground">
          聯絡與位置
        </h2>
        <ul class="mt-4 space-y-2 text-sm text-muted-foreground">
          <li v-for="c in CONTACT_CHANNELS" :key="c.label">
            <template v-if="c.href">
              {{ c.label }}：
              <a
                :href="c.href"
                :target="c.href.startsWith('tel:') ? undefined : '_blank'"
                rel="noopener noreferrer"
                class="transition-colors hover:text-foreground underline underline-offset-4"
              >
                {{ c.value }}
              </a>
            </template>
            <template v-else>
              {{ c.label }}：{{ c.value }}
            </template>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="container-kse mt-12 border-t border-border pt-6 text-xs text-muted-foreground"
    >
      © {{ currentYear }} {{ BRAND.name }}。 台中筋膜放鬆 ・ 台中運動按摩 ・
      南屯運動恢復。
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { BRAND, CONTACT_CHANNELS, NAV } from "~/utils/site-data";

const currentYear = computed(() => new Date().getFullYear());
</script>
