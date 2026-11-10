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
            <ResponsiveImage
              :image="postImage(post.image)"
              :alt="post.alt"
              sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
              loading="lazy"
              :style="{ objectPosition: post.imagePosition ?? '50% 25%' }"
              class="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
import ResponsiveImage from "~/components/ui/ResponsiveImage.vue";
import { postImage } from "~/utils/post-images";
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
    "KSE 台中南屯運動恢復專欄：運動按摩是什麼、按摩越痛越有效嗎、運動後怎麼放鬆恢復、筋膜沾黏與肩頸下背痠痛，以及中信兄弟與校園球隊合作消息，由第一線放鬆師整理。",
  path: "/news",
});
</script>
