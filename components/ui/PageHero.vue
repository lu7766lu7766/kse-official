<template>
  <section class="relative isolate overflow-hidden bg-navy text-white">
    <div class="pointer-events-none absolute inset-0 fiber-texture" aria-hidden="true" />
    <div class="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />

    <div class="container-kse relative py-16 lg:py-24 rise-in">
      <nav v-if="crumbs?.length" aria-label="麵包屑" class="mb-8 text-xs text-navy-foreground">
        <ol class="flex flex-wrap items-center gap-2">
          <li><NuxtLink to="/" class="hover:text-white">首頁</NuxtLink></li>
          <li v-for="c in crumbs" :key="c.label" class="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            <NuxtLink v-if="c.to" :to="c.to" class="hover:text-white">{{ c.label }}</NuxtLink>
            <span v-else aria-current="page" class="text-white">{{ c.label }}</span>
          </li>
        </ol>
      </nav>
      <span class="eyebrow text-gold">{{ eyebrow }}</span>
      <h1 class="mt-5 max-w-4xl text-3xl font-extrabold text-white sm:text-5xl lg:text-6xl">
        {{ title }}
      </h1>
      <p class="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground lg:text-lg">
        {{ desc }}
      </p>
      <slot />
    </div>
    <div class="h-1 w-full bg-linear-to-r from-gold via-gold/40 to-transparent" aria-hidden="true" />
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  desc: string;
  crumbs?: { label: string; to?: string }[];
}>();
</script>
