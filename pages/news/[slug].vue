<template>
  <div>
    <template v-if="post">
      <article>
        <header class="cinematic border-b border-border py-16 lg:py-24">
          <div class="container-kse">
            <NuxtLink
              to="/news"
              class="inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              <ArrowLeft class="h-4 w-4" aria-hidden="true" /> 最新消息
            </NuxtLink>
            <p class="mt-6 text-xs tracking-widest text-muted-foreground">
              <time :dateTime="post.date">{{ post.date }}</time> ・
              {{ post.category }}
            </p>
            <h1 class="mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">
              {{ post.title }}
            </h1>
          </div>
        </header>

        <Section>
          <img
            :src="POST_IMAGES[post.image]"
            :alt="post.alt"
            width="1200"
            height="900"
            class="w-full rounded-sm border border-border object-cover"
          />
          <div
            class="mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground"
          >
            <p v-for="p in post.body" :key="p">{{ p }}</p>
          </div>
          <div class="mt-12">
            <BookingButton />
          </div>
        </Section>
      </article>

      <Section tone="ink">
        <h2 class="text-2xl">其他文章</h2>
        <div class="mt-8 grid gap-6 lg:grid-cols-3">
          <article
            v-for="p in related"
            :key="p.slug"
            class="surface-card rounded-sm p-6"
          >
            <p class="text-xs text-muted-foreground">
              <time :dateTime="p.date">{{ p.date }}</time> ・ {{ p.category }}
            </p>
            <h3 class="mt-2 text-lg leading-snug">{{ p.title }}</h3>
            <NuxtLink
              :to="`/news/${p.slug}`"
              class="mt-4 inline-block text-sm font-bold text-primary"
            >
              閱讀更多
            </NuxtLink>
          </article>
        </div>
      </Section>
    </template>

    <Section v-else>
      <h1 class="text-3xl">找不到這篇文章</h1>
      <p class="mt-4 text-sm text-muted-foreground">
        文章可能已被移除或網址有誤。
      </p>
      <NuxtLink
        to="/news"
        class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary"
      >
        <ArrowLeft class="h-4 w-4" aria-hidden="true" /> 回到最新消息
      </NuxtLink>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ArrowLeft } from "lucide-vue-next";
import Section from "~/components/ui/Section.vue";
import BookingButton from "~/components/ui/BookingButton.vue";
import { POST_IMAGES } from "~/utils/post-images";
import { POSTS } from "~/utils/site-data";

const route = useRoute();
const slug = computed(() => route.params.slug as string);

const post = computed(() => POSTS.find((p) => p.slug === slug.value));

const related = computed(() =>
  POSTS.filter((p) => p.slug !== slug.value).slice(0, 3)
);

useHead(() => {
  if (!post.value) {
    return {
      title: "找不到文章｜KSE 美式筋膜放鬆教室",
      meta: [{ name: "robots", content: "noindex" }],
    };
  }

  const url = `https://www.kse-release.com.tw/news/${post.value.slug}`;

  return {
    title: `${post.value.title}｜KSE 美式筋膜放鬆教室`,
    meta: [
      { name: "description", content: post.value.excerpt },
      {
        name: "keywords",
        content: `台中按摩,南屯按摩,台中運動按摩,${post.value.category},美式筋膜放鬆,運動恢復`,
      },
      { property: "og:title", content: post.value.title },
      { property: "og:description", content: post.value.excerpt },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
    ],
    link: [{ rel: "canonical", href: url }],
    script: [
      {
        type: "application/ld+json" as any,
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.value.title,
          description: post.value.excerpt,
          datePublished: post.value.date,
          articleSection: post.value.category,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
          },
          author: {
            "@type": "Organization",
            name: "KSE 美式筋膜放鬆教室",
            url: "https://www.kse-release.com.tw",
          },
          publisher: {
            "@type": "Organization",
            name: "KSE 美式筋膜放鬆教室",
            logo: {
              "@type": "ImageObject",
              url: "https://www.kse-release.com.tw/favicon.png",
            },
          },
        }),
      },
    ],
  };
});
</script>
