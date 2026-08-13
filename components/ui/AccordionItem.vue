<template>
  <div class="border-b border-border">
    <button
      type="button"
      @click="accordion?.toggleItem(value)"
      :aria-expanded="isOpen"
      class="flex w-full items-center justify-between py-4 text-left text-sm font-medium transition-all hover:underline cursor-pointer"
    >
      <span>{{ title }}</span>
      <ChevronDown
        :class="
          cn(
            'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
            isOpen && 'rotate-180'
          )
        "
      />
    </button>
    <div v-show="isOpen" class="pb-4 pt-0 text-sm leading-relaxed text-muted-foreground">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, type Ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "~/utils/cn";

const props = defineProps<{
  value: string;
  title: string;
}>();

const accordion = inject<{
  activeItems: Ref<string[]>;
  toggleItem: (val: string) => void;
}>("accordion");

const isOpen = computed(() => {
  return accordion?.activeItems.value.includes(props.value) ?? false;
});
</script>
