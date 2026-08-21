<template>
  <section class="relative isolate overflow-hidden border-b border-border/80 bg-secondary/80 py-16 lg:py-24">
    <!-- 溫暖空間漫射光暈與層次漸層 -->
    <div class="pointer-events-none absolute inset-0 bg-linear-to-b from-ink/90 via-secondary/80 to-secondary/60" />
    <div class="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
    <div class="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />

    <div class="container-kse relative rise-in">
      <div class="inline-flex items-center gap-2">
        <span class="eyebrow rounded-sm border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
          {{ eyebrow }}
        </span>
      </div>
      <h1 class="mt-4 max-w-4xl text-3xl font-extrabold leading-[1.15] text-foreground sm:text-5xl lg:text-6xl tracking-tight">
        {{ title }}
      </h1>
      <p
        class="mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 lg:text-lg"
      >
        {{ desc }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  desc: string;
}>();
</script>
