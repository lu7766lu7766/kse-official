<template>
  <section class="cinematic border-b border-border py-20 lg:py-28">
    <div class="container-kse rise-in">
      <span class="eyebrow">{{ eyebrow }}</span>
      <h1 class="mt-4 max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">
        {{ title }}
      </h1>
      <p
        class="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg"
      >
        {{ desc }}
      </p>
      <div class="mt-8 flex flex-wrap gap-3">
        <BookingButton />
        <BookingButton variant="outline">
          <span>聯絡我們</span>
        </BookingButton>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BookingButton from "./BookingButton.vue";

defineProps<{
  eyebrow: string;
  title: string;
  desc: string;
}>();
</script>
