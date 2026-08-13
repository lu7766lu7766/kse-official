<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="四項服務，一套完整邏輯"
      desc="從徒手處理到訓練課表，依你的評估結果與運動週期組合出最適合的方案。"
    />

    <Section>
      <div class="space-y-20">
        <article
          v-for="(service, i) in SERVICES"
          :key="service.slug"
          :id="service.slug"
          class="grid items-center gap-10 lg:grid-cols-2"
        >
          <img
            :src="IMAGES[service.slug]"
            :alt="ALTS[service.slug]"
            width="1200"
            height="900"
            loading="lazy"
            :class="
              cn(
                'w-full rounded-sm border border-border object-cover',
                i % 2 === 1 && 'lg:order-2'
              )
            "
          />
          <div>
            <span class="eyebrow">0{{ i + 1 }}</span>
            <h2 class="mt-3 text-3xl sm:text-4xl">{{ service.title }}</h2>
            <p class="mt-4 text-base leading-relaxed text-muted-foreground">
              {{ service.short }}
            </p>
            <ul class="mt-6 space-y-3 text-sm text-muted-foreground">
              <li v-for="p in service.points" :key="p" class="flex gap-3">
                <span
                  class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                />
                {{ p }}
              </li>
            </ul>
            <p class="mt-6 text-sm font-bold text-foreground">
              {{ service.duration }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <BookingButton>預約此服務</BookingButton>
              <BookingButton variant="outline">
                <span>詢問詳情</span>
              </BookingButton>
            </div>
          </div>
        </article>
      </div>
    </Section>

    <Section tone="ink">
      <SectionHeading
        center
        eyebrow="Not Sure?"
        title="不確定該從哪一項開始？"
        desc="第一次來訪都會先進行完整評估，我們會依結果建議最適合的方案。"
      />
      <div class="mt-8 flex justify-center">
        <BookingButton />
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue";
import Section from "~/components/ui/Section.vue";
import SectionHeading from "~/components/ui/SectionHeading.vue";
import BookingButton from "~/components/ui/BookingButton.vue";
import { cn } from "~/utils/cn";
import { SERVICES } from "~/utils/site-data";

import heroImg from "~/assets/images/hero.jpg";
import massageImg from "~/assets/images/massage.jpg";
import coreImg from "~/assets/images/core.jpg";
import strengthImg from "~/assets/images/strength.jpg";

const IMAGES: Record<string, string> = {
  fascia: heroImg,
  "sports-massage": massageImg,
  core: coreImg,
  strength: strengthImg,
};

const ALTS: Record<string, string> = {
  fascia: "治療師為運動員進行深層筋膜放鬆",
  "sports-massage": "治療師以雙手為跑者進行小腿運動按摩",
  core: "訓練者在深色空間進行核心穩定地板動作",
  strength: "運動員在深色健身房進行槓鈴肌力訓練",
};

const DESC =
  "KSE 台中南屯提供美式筋膜放鬆、台中運動按摩、核心穩定修復與肌力體能訓練，專處理肌肉緊繃、受傷後身體舒緩與動作功能恢復保養，客製化個人極致恢復方案。";

useHead({
  title: "專業服務項目｜台中美式筋膜放鬆・運動按摩・受傷後動作恢復｜KSE",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "台中運動按摩,台中筋膜放鬆,美式筋膜放鬆,受傷放鬆保養,肌肉緊繃舒緩,南屯運動按摩,核心穩定修復,肌力體能訓練",
    },
    { property: "og:title", content: "專業服務項目｜台中美式筋膜放鬆・運動按摩｜KSE" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kse-release.com/services" },
  ],
  link: [
    { rel: "canonical", href: "https://kse-release.com/services" },
  ],
});
</script>
