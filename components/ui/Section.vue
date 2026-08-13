<template>
  <section
    :id="id"
    :class="
      cn(
        'py-20 lg:py-28',
        tone === 'ink' && 'bg-ink',
        tone === 'cinematic' && 'cinematic',
        props.class
      )
    "
  >
    <div class="container-kse">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
import { cn } from "~/utils/cn";

const props = withDefaults(
  defineProps<{
    id?: string;
    tone?: "default" | "ink" | "cinematic";
    class?: string;
  }>(),
  {
    tone: "default",
    class: "",
  }
);
</script>
