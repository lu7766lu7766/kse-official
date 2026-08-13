<template>
  <div :class="cn('max-w-3xl', center && 'mx-auto text-center')">
    <span v-if="eyebrow" class="eyebrow">{{ eyebrow }}</span>
    <component
      :is="Tag"
      class="mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]"
    >
      {{ title }}
    </component>
    <p v-if="desc" class="mt-4 text-base leading-relaxed text-muted-foreground">
      {{ desc }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { cn } from "~/utils/cn";

const props = withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    desc?: string;
    level?: 2 | 3;
    center?: boolean;
  }>(),
  {
    level: 2,
    center: false,
  }
);

const Tag = computed(() => (props.level === 2 ? "h2" : "h3"));
</script>
