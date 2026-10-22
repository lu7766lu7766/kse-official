<template>
  <div v-if="post">
    <article>
      <header class="relative isolate overflow-hidden bg-navy text-white">
        <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
        <div class="container-kse py-14 lg:py-20">
          <nav aria-label="麵包屑" class="text-xs text-navy-foreground">
            <ol class="flex flex-wrap items-center gap-2">
              <li><NuxtLink to="/" class="hover:text-white">首頁</NuxtLink></li>
              <li aria-hidden="true">/</li>
              <li><NuxtLink to="/news" class="hover:text-white">最新消息</NuxtLink></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" class="text-white">{{ post.category }}</li>
            </ol>
          </nav>
          <h1 class="mt-6 max-w-4xl text-3xl leading-tight text-white sm:text-5xl">{{ post.title }}</h1>
          <p class="mt-6 text-sm text-navy-foreground">
            <span class="text-gold">{{ post.category }}</span> ・ 發布
            <time :datetime="post.date">{{ post.date }}</time>
            <template v-if="post.updated && post.updated !== post.date">
              ・ 更新 <time :datetime="post.updated">{{ post.updated }}</time>
            </template>
            ・ {{ BRAND.name }}
          </p>
        </div>
        <div class="h-1 w-full bg-linear-to-r from-gold via-gold/40 to-transparent" aria-hidden="true" />
      </header>

      <Section>
        <div class="mx-auto max-w-3xl">
          <!-- 重點摘要：答案先行，供精選摘要與 AI 引用 -->
          <aside class="border-l-4 border-gold bg-ink p-6" aria-label="重點摘要">
            <p class="text-xs font-bold tracking-[0.2em] text-primary">重點摘要</p>
            <p class="mt-2 text-base font-semibold leading-relaxed text-foreground">{{ post.summary }}</p>
          </aside>

          <img
            :src="POST_IMAGES[post.image]"
            :alt="post.alt"
            width="1200"
            height="1600"
            fetchpriority="high"
            class="mt-10 aspect-[16/10] w-full object-cover object-[50%_25%]"
          />

          <div class="mt-10 space-y-5 text-[1.0625rem] leading-[1.9] text-foreground/85">
            <template v-for="(block, i) in post.body" :key="i">
              <h2 v-if="typeof block !== 'string'" class="!mt-12 text-2xl text-foreground">{{ block.h2 }}</h2>
              <p v-else>{{ block }}</p>
            </template>
          </div>

          <div class="relative isolate mt-14 overflow-hidden bg-navy p-8 text-white">
            <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
            <p class="text-xl font-extrabold text-white">想知道自己的狀況？從一次評估開始。</p>
            <p class="mt-2 text-sm text-navy-foreground">{{ BRAND.address }}・{{ BRAND.hours.label }}</p>
          </div>
        </div>
      </Section>
    </article>

    <Section tone="ink">
      <h2 class="text-2xl">延伸閱讀</h2>
      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <article v-for="p in related" :key="p.slug" class="surface-card p-6">
          <NuxtLink :to="`/news/${p.slug}`" class="group block">
            <p class="text-xs text-muted-foreground">
              <time :datetime="p.date">{{ p.date }}</time> ・ <span class="text-primary">{{ p.category }}</span>
            </p>
            <h3 class="mt-2 text-lg leading-snug transition-colors group-hover:text-primary">{{ p.title }}</h3>
            <p class="mt-2 line-clamp-2 text-sm text-muted-foreground">{{ p.excerpt }}</p>
          </NuxtLink>
        </article>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Section from "~/components/ui/Section.vue";
import { ORG_ID, WEBSITE_ID } from "~/composables/useGeoSchema";
import { POST_IMAGES } from "~/utils/post-images";
import { BRAND, POSTS, SITE_URL } from "~/utils/site-data";

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const post = computed(() => POSTS.find((p) => p.slug === slug.value));

// 不存在的文章回傳真正的 404，而不是 200 的空頁
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "找不到這篇文章", fatal: true });
}

const related = computed(() => POSTS.filter((p) => p.slug !== slug.value).slice(0, 3));

const p = post.value!;
const path = `/news/${p.slug}`;
const url = `${SITE_URL}${path}`;
const postImage = POST_IMAGES[p.image] ?? "/og-image.jpg";
const imageUrl = absoluteUrl(postImage);

usePageSeo({
  title: `${p.title}｜KSE`,
  description: p.excerpt,
  path,
  type: "article",
  image: postImage,
  imageAlt: p.alt,
  imageWidth: 1200,
  imageHeight: 1600,
});

useSeoMeta({
  articlePublishedTime: p.date,
  articleModifiedTime: p.updated ?? p.date,
  articleSection: p.category,
});

const { injectBreadcrumbsSchema } = useGeoSchema();
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "最新消息", item: "/news" },
  { name: p.title, item: path },
]);

useHead({
  script: [
    {
      type: "application/ld+json" as any,
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": `${url}#article`,
        headline: p.title,
        description: p.excerpt,
        abstract: p.summary,
        image: [imageUrl],
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        articleSection: p.category,
        inLanguage: "zh-TW",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": WEBSITE_ID },
        author: { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      }),
    },
  ],
});
</script>
