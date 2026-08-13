<template>
  <div
    class="flex aspect-video flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 p-6 text-center"
  >
    <p class="text-base font-bold text-foreground">{{ label }}</p>
    <p class="mt-2 text-xs text-muted-foreground">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  note: string;
}>();
</script>
