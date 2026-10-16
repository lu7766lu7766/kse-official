<template>
  <div class="border-b border-border">
    <h3 class="m-0 text-base font-bold">
      <button
        :id="`${uid}-q`"
        type="button"
        @click="accordion?.toggleItem(value)"
        :aria-expanded="isOpen"
        :aria-controls="`${uid}-a`"
        class="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-bold transition-colors hover:text-primary cursor-pointer"
      >
        <span>{{ title }}</span>
        <span
          :class="
            cn(
              'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border transition-all duration-200',
              isOpen && 'rotate-180 border-primary bg-primary text-primary-foreground'
            )
          "
          aria-hidden="true"
        >
          <ChevronDown class="h-4 w-4" />
        </span>
      </button>
    </h3>
    <!-- 用 v-show 保留答案在 HTML 中，讓搜尋引擎與 AI 可讀取 -->
    <div
      v-show="isOpen"
      :id="`${uid}-a`"
      role="region"
      :aria-labelledby="`${uid}-q`"
      class="pb-6 pr-12 text-[0.9375rem] leading-relaxed text-muted-foreground"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, computed, useId, type Ref } from "vue";
import { ChevronDown } from "lucide-vue-next";
import { cn } from "~/utils/cn";

const props = defineProps<{
  value: string;
  title: string;
}>();

const uid = useId();

const accordion = inject<{
  activeItems: Ref<string[]>;
  toggleItem: (val: string) => void;
}>("accordion");

const isOpen = computed(() => {
  return accordion?.activeItems.value.includes(props.value) ?? false;
});
</script>
