<template>
  <div :class="cn('divide-y divide-border', props.class)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from "vue";
import { cn } from "~/utils/cn";

const props = withDefaults(
  defineProps<{
    type?: "single" | "multiple";
    collapsible?: boolean;
    class?: string;
  }>(),
  {
    type: "single",
    collapsible: true,
    class: "",
  }
);

const activeItems = ref<string[]>([]);

function toggleItem(value: string) {
  if (props.type === "single") {
    if (activeItems.value.includes(value)) {
      if (props.collapsible) {
        activeItems.value = [];
      }
    } else {
      activeItems.value = [value];
    }
  } else {
    if (activeItems.value.includes(value)) {
      activeItems.value = activeItems.value.filter((i) => i !== value);
    } else {
      activeItems.value.push(value);
    }
  }
}

provide("accordion", {
  activeItems,
  toggleItem,
});
</script>
