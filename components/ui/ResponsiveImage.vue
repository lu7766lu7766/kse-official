<template>
  <!-- picture 設為 display: contents，版面上等同直接放 img，原本 img 上的 class 不用改 -->
  <picture class="contents">
    <source type="image/webp" :srcset="image.srcset" :sizes="sizes" />
    <img :src="image.src" :width="image.width" :height="image.height" :alt="alt" decoding="async" v-bind="$attrs" />
  </picture>
</template>

<script setup lang="ts">
import type { Img } from "~/utils/images"

// class、loading、fetchpriority 等屬性一律放在 img 上
defineOptions({ inheritAttrs: false })

withDefaults(
  defineProps<{
    image: Img
    alt: string
    /** 圖片在版面上的顯示寬度，讓瀏覽器挑最小夠用的 WebP；預設滿版 */
    sizes?: string
  }>(),
  { sizes: "100vw" },
)
</script>
