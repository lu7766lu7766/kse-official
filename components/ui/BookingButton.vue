<template>
  <NuxtLink
    to="/booking"
    :class="
      cn(
        'px-7 py-3.5 text-sm',
        variant === 'solid'
          ? 'btn-gold'
          : 'inline-flex items-center justify-center gap-2 rounded-[2px] border border-current font-bold tracking-wide transition-colors hover:border-primary hover:text-primary',
        props.class
      )
    "
  >
    <slot>立即預約</slot>
    <ArrowRight v-if="variant === 'solid'" class="h-4 w-4" aria-hidden="true" />
  </NuxtLink>
</template>

<script setup lang="ts">
import { ArrowRight } from "lucide-vue-next";
import { cn } from "~/utils/cn";

const props = withDefaults(
  defineProps<{
    variant?: "solid" | "outline";
    class?: string;
  }>(),
  {
    variant: "solid",
    class: "",
  }
);
</script>
