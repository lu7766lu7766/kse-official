<template>
  <section
    :id="id"
    :class="
      cn(
        'py-20 lg:py-28',
        tone === 'ink' && 'bg-ink',
        tone === 'navy' && 'relative isolate overflow-hidden bg-navy text-white',
        props.class
      )
    "
  >
    <div v-if="tone === 'navy'" class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
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
    tone?: "default" | "ink" | "navy";
    class?: string;
  }>(),
  {
    tone: "default",
    class: "",
  }
);
</script>
