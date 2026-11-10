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
            ・
            <NuxtLink v-if="author" :to="`/#${teamAnchor(author.slug)}`" class="hover:text-white">
              作者：{{ author.name }}（{{ author.role }}）
            </NuxtLink>
            <template v-else>{{ BRAND.name }}</template>
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

          <ResponsiveImage
            :image="cover"
            :alt="post.alt"
            sizes="(min-width: 768px) 768px, 100vw"
            fetchpriority="high"
            class="mx-auto mt-10 h-auto max-h-[70vh] w-auto max-w-full"
          />

          <div class="mt-10 space-y-5 text-[1.0625rem] leading-[1.9] text-foreground/85">
            <template v-for="(block, i) in post.body" :key="i">
              <p v-if="typeof block === 'string'">{{ block }}</p>
              <h2 v-else-if="'h2' in block" class="!mt-12 text-2xl text-foreground">{{ block.h2 }}</h2>
              <ul v-else-if="'ul' in block" class="list-disc space-y-2 pl-6 marker:text-primary">
                <li v-for="item in block.ul" :key="item">{{ item }}</li>
              </ul>
              <!-- 表格：比較與方案資訊，給精選摘要與 AI 直接引用 -->
              <div v-else-if="'table' in block" class="overflow-x-auto border border-border bg-card">
                <table class="w-full min-w-[32rem] border-collapse text-left text-sm leading-relaxed">
                  <caption class="sr-only">{{ block.table.caption }}</caption>
                  <thead>
                    <tr class="bg-navy text-white">
                      <th v-for="h in block.table.head" :key="h" scope="col" class="whitespace-nowrap px-4 py-3 font-bold">{{ h }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="row in block.table.rows" :key="row[0]" class="border-t border-border">
                      <template v-for="(cell, ci) in row" :key="ci">
                        <th v-if="ci === 0" scope="row" class="whitespace-nowrap px-4 py-3 font-semibold text-foreground">{{ cell }}</th>
                        <td v-else class="px-4 py-3">{{ cell }}</td>
                      </template>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul v-else-if="'links' in block" class="!mt-10 grid gap-3 sm:grid-cols-2">
                <li v-for="l in block.links" :key="l.to">
                  <NuxtLink :to="l.to" class="surface-card group flex items-center justify-between gap-3 p-4 text-base font-bold text-foreground">
                    <span class="transition-colors group-hover:text-primary">{{ l.label }}</span>
                    <ArrowRight class="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  </NuxtLink>
                </li>
              </ul>
            </template>
          </div>

          <!-- 相簿：原貼文的其他圖片 -->
          <section v-if="post.gallery?.length" class="mt-14" aria-label="文章相簿">
            <h2 class="text-2xl text-foreground">相片</h2>
            <ul class="mt-6 grid gap-4 sm:grid-cols-2">
              <li v-for="g in post.gallery" :key="g.key">
                <ResponsiveImage
                  :image="postImage(g.key)"
                  :alt="g.alt"
                  sizes="(min-width: 768px) 376px, (min-width: 640px) 50vw, 100vw"
                  loading="lazy"
                  class="h-auto w-full bg-ink"
                />
              </li>
            </ul>
          </section>

          <section v-if="post.references?.length" class="mt-14" aria-label="參考資料">
            <h2 class="text-2xl text-foreground">參考資料</h2>
            <ol class="mt-5 list-decimal space-y-3 pl-6 text-sm leading-relaxed text-muted-foreground marker:text-primary">
              <li v-for="r in post.references" :key="r.url">
                {{ r.title }}
                <a :href="r.url" target="_blank" rel="noopener noreferrer" class="break-all text-primary underline-offset-4 hover:underline">{{ r.url }}</a>
              </li>
            </ol>
          </section>

          <p v-if="post.sources?.length" class="mt-10 text-sm text-muted-foreground">
            {{ post.references?.length ? "部分內容改寫自" : "本文整理自" }} KSE 官方 Instagram 貼文：
            <template v-for="(src, i) in post.sources" :key="src">
              <a :href="src" target="_blank" rel="noopener noreferrer" class="text-primary underline-offset-4 hover:underline">原文{{ post.sources.length > 1 ? i + 1 : "" }}</a>
              <span v-if="i < post.sources.length - 1">、</span>
            </template>
          </p>

          <div class="relative isolate mt-14 overflow-hidden bg-navy p-8 text-white">
            <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
            <p class="text-xl font-extrabold text-white">想知道自己的狀況？從一次評估開始。</p>
            <p class="mt-2 text-sm text-navy-foreground">{{ BRAND.address }}・{{ BRAND.hours.label }}</p>
            <NuxtLink
              v-if="isBrothersPost"
              to="/partners"
              class="mt-6 mr-6 inline-flex items-center gap-2 text-sm font-bold text-gold underline-offset-4 hover:underline"
            >
              看 KSE × 中信兄弟（兄弟象）合作 <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
            <NuxtLink
              v-if="relatedService"
              :to="servicePath(relatedService.slug)"
              class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-gold underline-offset-4 hover:underline"
            >
              了解台中南屯{{ relatedService.title }} <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
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
import { ArrowRight } from "lucide-vue-next";
import Section from "~/components/ui/Section.vue";
import { isoDateTime, ORG_ID, personRef, serviceId, teamAnchor, WEBSITE_ID } from "~/composables/useGeoSchema";
import ResponsiveImage from "~/components/ui/ResponsiveImage.vue";
import { postImage } from "~/utils/post-images";
import { BRAND, PARTNERS, POSTS, SERVICES, servicePath, SITE_URL, TEAM } from "~/utils/site-data";

const route = useRoute();
const slug = computed(() => route.params.slug as string);
const post = computed(() => POSTS.find((p) => p.slug === slug.value));

// 不存在的文章回傳真正的 404，而不是 200 的空頁
if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: "找不到這篇文章", fatal: true });
}

// 延伸閱讀：同分類優先，不足再補最新文章
const related = computed(() => {
  const others = POSTS.filter((p) => p.slug !== slug.value);
  const same = others.filter((p) => p.category === post.value?.category);
  return [...same, ...others.filter((p) => !same.includes(p))].slice(0, 3);
});

const p = post.value!;

// 文末導向相關服務頁（關鍵字錨點內連）：服務頁有列為延伸閱讀的優先，否則依分類對應
const CATEGORY_SERVICE: Record<string, string> = {
  運動恢復: "sports-massage",
  筋膜放鬆: "fascia",
  動作訓練: "core",
  肌力與體能: "strength",
  合作消息: "sports-massage",
  KSE活動: "fascia",
};
const isBrothersPost = PARTNERS[0]?.posts?.includes(p.slug) ?? false;
const relatedService =
  SERVICES.find((s) => s.posts.includes(p.slug)) ?? SERVICES.find((s) => s.slug === CATEGORY_SERVICE[p.category]);
// 有指定作者就用具名的 Person（E-E-A-T），否則以商家為作者
const author = p.author ? TEAM.find((m) => m.slug === p.author) : undefined;
const path = `/news/${p.slug}`;
const url = `${SITE_URL}${path}`;
const cover = postImage(p.image);
const imageUrl = absoluteUrl(cover.src);

usePageSeo({
  title: `${p.title}｜KSE`,
  description: p.excerpt,
  path,
  type: "article",
  image: cover.src,
  imageAlt: p.alt,
  imageWidth: cover.width,
  imageHeight: cover.height,
});

useSeoMeta({
  articlePublishedTime: isoDateTime(p.date),
  articleModifiedTime: isoDateTime(p.updated ?? p.date),
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
        image: [imageUrl, ...(p.gallery ?? []).map((g) => absoluteUrl(postImage(g.key).src))],
        datePublished: isoDateTime(p.date),
        dateModified: isoDateTime(p.updated ?? p.date),
        articleSection: p.category,
        ...(relatedService ? { about: { "@id": serviceId(relatedService.slug) } } : {}),
        ...(p.references?.length
          ? { citation: p.references.map((r) => ({ "@type": "ScholarlyArticle", name: r.title, url: r.url })) }
          : {}),
        inLanguage: "zh-TW",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": WEBSITE_ID },
        author: author ? personRef(author) : { "@id": ORG_ID },
        publisher: { "@id": ORG_ID },
      }),
    },
  ],
});
</script>
