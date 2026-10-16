<template>
  <div>
    <PageHero
      eyebrow="Journal"
      title="運動恢復知識專欄"
      desc="筋膜放鬆、運動按摩、核心穩定與肌力訓練的實用知識，以及 KSE 的活動與合作消息。"
      :crumbs="[{ label: '最新消息' }]"
    />

    <Section>
      <div class="flex flex-wrap gap-2" role="group" aria-label="文章分類篩選">
        <button
          v-for="cat in ['全部', ...usedCategories]"
          :key="cat"
          type="button"
          @click="active = cat"
          :aria-pressed="active === cat"
          :class="
            cn(
              'rounded-[2px] border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer',
              active === cat
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border text-muted-foreground hover:text-foreground'
            )
          "
        >
          {{ cat }}
        </button>
      </div>

      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="post in posts"
          :key="post.slug"
          class="surface-card group overflow-hidden"
        >
          <div class="overflow-hidden">
            <img
              :src="POST_IMAGES[post.image]"
              :alt="post.alt"
              width="1200"
              height="1600"
              loading="lazy"
              class="aspect-[16/10] w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="p-6">
            <p class="text-xs text-muted-foreground">
              <time :datetime="post.date">{{ post.date }}</time> ・
              <span class="text-primary">{{ post.category }}</span>
            </p>
            <h2 class="mt-2 text-lg leading-snug">{{ post.title }}</h2>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ post.excerpt }}
            </p>
            <NuxtLink
              :to="`/news/${post.slug}`"
              class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              閱讀全文 <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
      <p v-if="posts.length === 0" class="mt-12 text-sm text-muted-foreground">
        此分類目前尚無文章。
      </p>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { ArrowRight } from "lucide-vue-next";
import PageHero from "~/components/ui/PageHero.vue";
import Section from "~/components/ui/Section.vue";
import { cn } from "~/utils/cn";
import { POST_IMAGES } from "~/utils/post-images";
import { CATEGORIES, POSTS } from "~/utils/site-data";

const active = ref<string>("全部");
// 只顯示有文章的分類，避免點到空分類
const usedCategories = CATEGORIES.filter((c) => POSTS.some((p) => p.category === c));

const posts = computed(() =>
  active.value === "全部"
    ? POSTS
    : POSTS.filter((p) => p.category === active.value)
);

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "最新消息", item: "/news" },
])

usePageSeo({
  title: "運動恢復知識專欄：筋膜放鬆・運動按摩・核心訓練｜KSE",
  description:
    "KSE 台中南屯運動恢復專欄：賽後 48 小時恢復怎麼安排、美式筋膜放鬆原理、久坐族肩頸下背與核心穩定、青少年肌力訓練原則，由第一線放鬆師整理。",
  path: "/news",
});
</script>
