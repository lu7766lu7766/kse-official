<template>
  <header
    class="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md"
  >
    <div
      class="container-kse flex h-[74px] items-center justify-between gap-4 lg:h-[92px]"
    >
      <NuxtLink
        to="/"
        class="flex items-center gap-3"
        aria-label="KSE 美式筋膜放鬆教室"
        @click="open = false"
      >
        <img
          src="~/assets/images/kse-logo-circle.png"
          alt="KSE 美式筋膜放鬆教室"
          class="h-[58px] w-[58px] shrink-0 object-contain lg:h-[72px] lg:w-[72px]"
        />
      </NuxtLink>

      <nav aria-label="主要導覽" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in NAV"
          :key="item.to"
          :to="item.to"
          class="rounded-sm px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-foreground"
          :exact="item.to === '/'"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink
          to="/booking"
          class="ml-3 inline-flex items-center rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
        >
          立即預約
        </NuxtLink>
      </nav>

      <button
        type="button"
        class="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
        :aria-expanded="open"
        aria-controls="mobile-nav"
        :aria-label="open ? '關閉選單' : '開啟選單'"
        @click="open = !open"
      >
        <X v-if="open" class="h-5 w-5" />
        <Menu v-else class="h-5 w-5" />
      </button>
    </div>

    <nav
      v-if="open"
      id="mobile-nav"
      aria-label="行動裝置導覽"
      class="rise-in border-t border-border bg-background lg:hidden"
    >
      <ul class="container-kse flex flex-col py-2">
        <li v-for="item in NAV" :key="item.to">
          <NuxtLink
            :to="item.to"
            @click="open = false"
            class="block border-b border-border/60 py-4 text-base font-bold text-foreground"
            active-class="text-primary"
            :exact="item.to === '/'"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Menu, X } from "lucide-vue-next";
import { NAV } from "~/utils/site-data";

const open = ref(false);
</script>
