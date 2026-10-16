<template>
  <div :class="cn('max-w-3xl', center && 'mx-auto text-center [&_.eyebrow]:justify-center')">
    <span v-if="eyebrow" :class="cn('eyebrow', dark && 'text-gold')">{{ eyebrow }}</span>
    <component
      :is="Tag"
      :class="cn('mt-4 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]', dark && 'text-white')"
    >
      {{ title }}
    </component>
    <p v-if="desc" :class="cn('mt-4 text-base leading-relaxed', dark ? 'text-navy-foreground' : 'text-muted-foreground')">
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
    dark?: boolean;
  }>(),
  {
    level: 2,
    center: false,
    dark: false,
  }
);

const Tag = computed(() => (props.level === 2 ? "h2" : "h3"));
</script>
