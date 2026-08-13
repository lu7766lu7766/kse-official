<template>
  <div>
    <!-- Hero -->
    <section class="relative isolate overflow-hidden border-b border-border">
      <img
        src="~/assets/images/hero.jpg"
        alt="治療師在深色運動恢復空間中為運動員進行大腿後側筋膜放鬆"
        width="1600"
        height="1008"
        class="absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30"
      />
      <div class="container-kse relative py-28 lg:py-40">
        <div class="rise-in max-w-3xl">
          <span class="eyebrow">Kinetic Sports Enhancement ・ 台中南屯</span>
          <h1 class="mt-4 text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
            KSE
            <br />
            美式筋膜放鬆教室
          </h1>
          <p
            class="mt-6 text-xl font-bold leading-snug text-foreground sm:text-2xl"
          >
            不是單純放鬆，而是重新找回身體的活動能力。
          </p>
          <p class="mt-4 text-sm tracking-[0.18em] text-primary sm:text-base">
            靜態評估 × 動態評估 × 筋膜放鬆 × 動作訓練
          </p>
          <div class="mt-10 flex flex-wrap gap-3">
            <BookingButton />
            <NuxtLink
              to="/kse"
              class="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              了解 KSE <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Process -->
    <Section id="process">
      <SectionHeading
        eyebrow="The KSE Process"
        title="四步流程：讓改變留在身體裡"
        desc="每一次課程都遵循相同的邏輯，從評估開始，到訓練結束。"
      />
      <ol class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="step in PROCESS"
          :key="step.no"
          class="surface-card rounded-sm p-7"
        >
          <span class="text-5xl font-black text-primary/30">{{ step.no }}</span>
          <h3 class="mt-4 text-xl">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ step.desc }}
          </p>
        </li>
      </ol>
    </Section>

    <!-- Comparison -->
    <Section tone="ink">
      <SectionHeading
        eyebrow="Difference"
        title="KSE 與一般按摩的差異"
        desc="我們處理的是動作能力，不是單次的舒服感受。"
      />
      <div class="mt-12 overflow-hidden rounded-sm border border-border">
        <table class="w-full border-collapse text-left text-sm">
          <caption class="sr-only">
            KSE 與一般按摩的比較表
          </caption>
          <thead>
            <tr class="bg-secondary">
              <th scope="col" class="px-4 py-4 font-bold sm:px-6">比較項目</th>
              <th
                scope="col"
                class="px-4 py-4 font-bold text-primary sm:px-6"
              >
                KSE
              </th>
              <th
                scope="col"
                class="px-4 py-4 font-bold text-muted-foreground sm:px-6"
              >
                一般按摩
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in COMPARISON"
              :key="row.topic"
              class="border-t border-border"
            >
              <th scope="row" class="px-4 py-4 font-semibold sm:px-6">
                {{ row.topic }}
              </th>
              <td class="px-4 py-4 sm:px-6">
                <span class="flex items-start gap-2">
                  <Check
                    class="mt-0.5 h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {{ row.kse }}
                </span>
              </td>
              <td class="px-4 py-4 text-muted-foreground sm:px-6">
                <span class="flex items-start gap-2">
                  <X class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {{ row.other }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <!-- Services -->
    <Section id="services">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Services" title="四項核心服務" />
        <NuxtLink
          to="/services"
          class="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          查看服務項目 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2">
        <article
          v-for="(service, i) in SERVICES"
          :key="service.slug"
          class="surface-card overflow-hidden rounded-sm"
        >
          <img
            :src="SERVICE_IMAGES[i]"
            :alt="`${service.title}情境照片`"
            width="1200"
            height="900"
            loading="lazy"
            class="h-48 w-full object-cover opacity-80"
          />
          <div class="p-7">
            <component
              :is="SERVICE_ICONS[i]"
              class="h-6 w-6 text-primary"
              aria-hidden="true"
            />
            <h3 class="mt-4 text-xl">{{ service.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ service.short }}
            </p>
            <NuxtLink
              :to="`/services#${service.slug}`"
              class="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              查看詳情 <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </Section>

    <!-- Cinematic collaboration -->
    <section class="relative isolate overflow-hidden border-y border-border">
      <img
        src="~/assets/images/baseball.jpg"
        alt="夜間球場中揮棒的棒球選手，深藍黑色調運動攝影"
        width="1600"
        height="912"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div class="absolute inset-0 cinematic opacity-80" />
      <div class="container-kse relative py-24 text-center lg:py-36">
        <span class="eyebrow">Collaboration</span>
        <h2 class="mt-4 text-4xl leading-tight sm:text-6xl">KSE × 中信兄弟</h2>
        <p class="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
          合作素材／Logo 預留，後續替換。實際合作內容與說明將於品牌方提供後更新。
        </p>
        <div class="mt-8 flex justify-center">
          <NuxtLink
            to="/partners"
            class="inline-flex items-center gap-2 rounded-sm border border-border bg-background/60 px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            查看運動合作 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Partners -->
    <Section tone="ink">
      <SectionHeading
        eyebrow="Partners"
        title="合作單位"
        desc="以下為合作版位示意，素材與說明後續替換。"
      />
      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div
          v-for="p in PARTNERS"
          :key="p.name"
          class="surface-card rounded-sm p-7"
        >
          <div
            class="flex h-24 items-center justify-center rounded-sm border border-dashed border-border text-xs text-muted-foreground"
          >
            Logo 版位
          </div>
          <h3 class="mt-5 text-lg">{{ p.name }}</h3>
          <p class="mt-2 text-xs uppercase tracking-widest text-primary">
            {{ p.note }}
          </p>
          <p class="mt-3 text-sm text-muted-foreground">{{ p.desc }}</p>
        </div>
      </div>
    </Section>

    <!-- Audiences -->
    <Section>
      <SectionHeading eyebrow="Who We Train" title="服務對象" />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="a in AUDIENCES"
          :key="a.title"
          class="surface-card rounded-sm p-6"
        >
          <h3 class="text-base font-bold">{{ a.title }}</h3>
          <p class="mt-2 text-sm text-muted-foreground">{{ a.desc }}</p>
        </li>
      </ul>
    </Section>

    <!-- Cases -->
    <Section tone="ink">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Case Studies"
          title="示範案例"
          desc="以下為示範內容，可於後台編輯，非真實個案。"
        />
        <NuxtLink
          to="/cases"
          class="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          查看案例分享 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="c in CASES"
          :key="c.slug"
          class="surface-card rounded-sm p-7"
        >
          <span class="eyebrow">{{ c.tag }}</span>
          <h3 class="mt-3 text-lg leading-snug">{{ c.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ c.summary }}
          </p>
        </article>
      </div>
    </Section>

    <!-- Manifesto -->
    <Section tone="cinematic" class="text-center">
      <p
        class="text-2xl font-black leading-tight tracking-[0.08em] sm:text-4xl lg:text-6xl"
      >
        MOVE BETTER.
        <br />
        FEEL BETTER.
        <br />
        PERFORM BETTER.
      </p>
    </Section>

    <!-- News -->
    <Section>
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="News" title="最新消息" />
        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          所有文章 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="post in POSTS.slice(0, 3)"
          :key="post.slug"
          class="surface-card overflow-hidden rounded-sm"
        >
          <img
            :src="getPostImage(post.image)"
            :alt="post.alt"
            width="1200"
            height="900"
            loading="lazy"
            class="h-44 w-full object-cover opacity-80"
          />
          <div class="p-6">
            <p class="text-xs text-muted-foreground">
              {{ post.date }} ・ {{ post.category }}
            </p>
            <h3 class="mt-2 text-lg leading-snug">{{ post.title }}</h3>
            <p class="mt-2 line-clamp-3 text-sm text-muted-foreground">
              {{ post.excerpt }}
            </p>
            <NuxtLink
              :to="`/news/${post.slug}`"
              class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              閱讀更多 <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </Section>

    <!-- FAQ -->
    <Section tone="ink">
      <SectionHeading eyebrow="FAQ" title="常見問題" />
      <Accordion type="single" collapsible class="mt-10 max-w-3xl">
        <AccordionItem
          v-for="f in FAQS.slice(0, 4)"
          :key="f.q"
          :value="f.q"
          :title="f.q"
        >
          {{ f.a }}
        </AccordionItem>
      </Accordion>
      <div class="mt-8">
        <NuxtLink
          to="/faq"
          class="inline-flex items-center gap-2 text-sm font-bold text-primary"
        >
          查看完整 FAQ <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </Section>

    <!-- CTA + Map -->
    <Section>
      <div class="grid gap-10 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Booking"
            title="準備好重新找回活動能力了嗎？"
            desc="採預約制，第一次來訪將從完整的身體評估開始。"
          />
          <div class="mt-8">
            <BookingButton />
          </div>
        </div>
        <div>
          <div class="overflow-hidden rounded-sm border border-border bg-secondary/40">
            <iframe
              title="KSE 美式筋膜放鬆教室 地圖"
              src="https://maps.google.com/maps?q=台中市南屯區大墩七街202號&t=&z=16&ie=UTF8&iwloc=&output=embed"
              class="aspect-video w-full border-0"
              loading="lazy"
              allowfullscreen
            ></iframe>
            <div class="p-3 bg-card border-t border-border flex items-center justify-between text-xs">
              <span class="font-medium text-foreground flex items-center gap-1">
                <MapPin class="h-4 w-4 text-primary shrink-0" /> {{ BRAND.address }}
              </span>
              <a
                :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BRAND.address)}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary font-bold hover:underline"
              >
                開啟 Google 地圖
              </a>
            </div>
          </div>
          <PlaceholderMedia
            label="第三方線上預約系統"
            note="系統串接版位預留，開通後可直接於此選擇時段"
          />
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowRight,
  Check,
  X,
  Waves,
  HeartPulse,
  Activity,
  Dumbbell,
  MapPin,
} from "lucide-vue-next";
import Section from "~/components/ui/Section.vue";
import SectionHeading from "~/components/ui/SectionHeading.vue";
import BookingButton from "~/components/ui/BookingButton.vue";
import PlaceholderMedia from "~/components/ui/PlaceholderMedia.vue";
import Accordion from "~/components/ui/Accordion.vue";
import AccordionItem from "~/components/ui/AccordionItem.vue";

import heroImg from "~/assets/images/hero.jpg";
import massageImg from "~/assets/images/massage.jpg";
import coreImg from "~/assets/images/core.jpg";
import strengthImg from "~/assets/images/strength.jpg";
import assessImg from "~/assets/images/assess.jpg";
import baseballImg from "~/assets/images/baseball.jpg";

import {
  AUDIENCES,
  BRAND,
  CASES,
  COMPARISON,
  FAQS,
  PARTNERS,
  POSTS,
  PROCESS,
  SERVICES,
} from "~/utils/site-data";

const SERVICE_ICONS = [Waves, HeartPulse, Activity, Dumbbell];
const SERVICE_IMAGES = [heroImg, massageImg, coreImg, strengthImg];

function getPostImage(img: string) {
  switch (img) {
    case "baseball":
      return baseballImg;
    case "assess":
      return assessImg;
    default:
      return massageImg;
  }
}

const DESC =
  "KSE 美式筋膜放鬆教室位於台中南屯，提供專業美式筋膜放鬆、台中運動按摩、靜態與動態姿勢評估、受傷後肌肉緊繃舒緩與動作恢復訓練，協助運動員與久坐族重塑動作品質與運動表現。";

useHead({
  title: "KSE 美式筋膜放鬆教室｜台中運動按摩・受傷後動作恢復與肌肉舒緩",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "台中運動按摩,台中筋膜放鬆,美式筋膜放鬆,受傷放鬆,肌肉緊繃舒緩,運動傷害恢復,台中南屯按摩,動作訓練,運動恢復",
    },
    { property: "og:title", content: "KSE 美式筋膜放鬆教室｜台中運動按摩・受傷後動作恢復" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kse-release.com/" },
  ],
  link: [
    { rel: "canonical", href: "https://kse-release.com/" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "SportsActivityLocation"],
        name: BRAND.full,
        image: "https://kse-release.com/favicon.png",
        telephone: BRAND.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "大墩七街202號",
          addressLocality: "台中市",
          addressRegion: "南屯區",
          postalCode: "408",
          addressCountry: "TW",
        },
        url: "https://kse-release.com/",
        priceRange: "$$",
        description: DESC,
        slogan: BRAND.slogan,
        sameAs: [BRAND.fb, BRAND.ig],
      }),
    },
  ],
});
</script>
