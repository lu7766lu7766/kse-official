<template>
  <NuxtLink
    to="/booking"
    :class="
      cn(
        'inline-flex items-center justify-center rounded-sm px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300',
        variant === 'solid'
          ? 'bg-primary text-primary-foreground hover:scale-[1.03]'
          : 'border border-border text-foreground hover:border-primary hover:text-primary',
        props.class
      )
    "
  >
    <slot>立即預約</slot>
  </NuxtLink>
</template>

<script setup lang="ts">
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
