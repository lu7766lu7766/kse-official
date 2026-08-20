<template>
  <div>
    <PageHero
      eyebrow="News & Journal"
      title="最新消息"
      desc="活動公告、合作消息與運動恢復知識。以下文章為示範內容（CMS-ready），可於後台編輯。"
    />

    <Section>
      <div class="flex flex-wrap gap-2" role="group" aria-label="文章分類篩選">
        <button
          v-for="cat in ['全部', ...CATEGORIES]"
          :key="cat"
          type="button"
          @click="active = cat"
          :aria-pressed="active === cat"
          :class="
            cn(
              'rounded-sm border px-4 py-2 text-sm font-semibold transition-colors cursor-pointer',
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
          class="surface-card overflow-hidden rounded-sm"
        >
          <img
            :src="POST_IMAGES[post.image]"
            :alt="post.alt"
            width="1200"
            height="900"
            loading="lazy"
            class="h-48 w-full object-cover opacity-80"
          />
          <div class="p-6">
            <p class="text-xs text-muted-foreground">
              <time :dateTime="post.date">{{ post.date }}</time> ・
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
              閱讀更多 <ArrowRight class="h-4 w-4" aria-hidden="true" />
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

const DESC =
  "KSE 美式筋膜放鬆教室最新消息：位於台中市南屯區大墩七街202號。提供活動公告、運動團隊合作、台中按摩與運動恢復知識、筋膜放鬆、動作訓練與肌力體能專業文章。";

useHead({
  title: "最新消息｜台中按摩・南屯筋膜放鬆與運動恢復專欄｜KSE",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content: "台中按摩,南屯按摩,台中運動按摩,台中筋膜放鬆,美式筋膜放鬆,運動恢復專欄,運動傷害防護,肌力體能文章",
    },
    { property: "og:title", content: "最新消息｜台中按摩・南屯筋膜放鬆與運動恢復專欄｜KSE" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.kse-release.com.tw/news" },
  ],
  link: [{ rel: "canonical", href: "https://www.kse-release.com.tw/news" }],
});
</script>
