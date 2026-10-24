<template>
  <header
    :class="[
      'sticky top-0 z-50 border-b transition-colors duration-300',
      overlay ? 'border-transparent bg-transparent' : 'border-border/70 bg-background/90 backdrop-blur-md',
    ]"
  >
    <div class="container-kse flex h-[68px] items-center justify-between gap-4 lg:h-[84px]">
      <NuxtLink to="/" class="flex items-center gap-3" @click="open = false">
        <img
          src="~/assets/images/kse-logo-circle.png"
          alt=""
          width="64"
          height="64"
          class="h-12 w-12 shrink-0 object-contain lg:h-16 lg:w-16"
        />
        <span class="leading-tight">
          <span :class="['block text-[0.9375rem] font-extrabold tracking-tight', overlay ? 'text-white' : 'text-foreground']">KSE 美式筋膜放鬆教室</span>
          <span :class="['block text-[0.6875rem] font-semibold tracking-[0.12em]', overlay ? 'text-white/70' : 'text-muted-foreground']">台中南屯・運動按摩與恢復</span>
        </span>
      </NuxtLink>

      <nav aria-label="主要導覽" class="hidden items-center gap-1 lg:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          :class="[
            'nav-link relative px-3 py-2 text-sm font-semibold transition-colors',
            overlay ? 'text-white/75 hover:text-white' : 'text-muted-foreground hover:text-foreground',
          ]"
          :active-class="overlay ? 'is-active !text-white' : 'is-active text-foreground'"
          :exact="item.to === '/'"
        >
          {{ item.label }}
        </NuxtLink>
        <NuxtLink to="/booking" class="btn-gold ml-4 px-5 py-2.5 text-sm">線上預約</NuxtLink>
      </nav>

      <div class="flex items-center gap-2 lg:hidden">
        <NuxtLink to="/booking" class="btn-gold px-4 py-2 text-xs" @click="open = false">預約</NuxtLink>
        <button
          type="button"
          :class="[
            'inline-flex h-10 w-10 items-center justify-center rounded-[2px] border',
            overlay ? 'border-white/30 text-white' : 'border-border text-foreground',
          ]"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          :aria-label="open ? '關閉選單' : '開啟選單'"
          @click="open = !open"
        >
          <X v-if="open" class="h-5 w-5" />
          <Menu v-else class="h-5 w-5" />
        </button>
      </div>
    </div>

    <nav v-if="open" id="mobile-nav" aria-label="行動裝置導覽" class="rise-in border-t border-border bg-background lg:hidden">
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
        <li class="py-4 text-sm text-muted-foreground">
          <a :href="`tel:${BRAND.phone.replace(/-/g, '')}`" class="font-bold text-foreground">{{ BRAND.phone }}</a>
          ・{{ BRAND.hours.label }}
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { Menu, X } from "lucide-vue-next";
import { BRAND, NAV } from "~/utils/site-data";

const open = ref(false);
const navItems = computed(() => NAV.filter((item) => item.to !== "/booking"));

// 首頁頂端時透明疊在全版 Hero 上，捲動或展開選單後回到實底
const route = useRoute();
const scrolled = ref(false);
const overlay = computed(() => route.path === "/" && !scrolled.value && !open.value);

function onScroll() {
  scrolled.value = window.scrollY > 24;
}

onMounted(() => {
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
});

onBeforeUnmount(() => window.removeEventListener("scroll", onScroll));
</script>

<style scoped>
.nav-link::after {
  content: "";
  position: absolute;
  left: 0.75rem;
  right: 0.75rem;
  bottom: 0.25rem;
  height: 2px;
  background: var(--color-gold);
  transform: scaleX(0);
  transition: transform 0.25s ease;
}
.nav-link:hover::after,
.nav-link.is-active::after {
  transform: scaleX(1);
}
</style>
