<template>
  <div>
    <PageHero
      eyebrow="FAQ & Booking"
      title="常見問題與預約"
      desc="採預約制。第一次來訪會從完整的靜態與動態評估開始，再依結果安排後續處理。"
    />

    <Section>
      <SectionHeading eyebrow="Questions" title="常見問題" />
      <Accordion type="single" collapsible class="mt-10 max-w-3xl">
        <AccordionItem v-for="f in FAQS" :key="f.q" :value="f.q" :title="f.q">
          {{ f.a }}
        </AccordionItem>
      </Accordion>
    </Section>

    <Section id="booking" tone="ink">
      <SectionHeading
        eyebrow="Booking"
        title="立即預約"
        desc="聯絡方式與線上預約系統版位已預留，實際資訊由品牌方提供後更新，我們不會提供未經確認的聯絡方式。"
      />
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="c in CHANNELS" :key="c.label" class="surface-card rounded-sm p-6">
          <component :is="c.icon" class="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 class="mt-4 text-base font-bold">{{ c.label }}</h3>
          <p class="mt-1 text-sm text-muted-foreground">{{ c.value }}</p>
        </div>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <PlaceholderMedia
          label="第三方線上預約系統"
          note="系統串接版位預留，開通後可於此直接選擇服務與時段"
        />
        <div
          class="flex aspect-video flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 p-6 text-center"
        >
          <MapPin class="h-6 w-6 text-primary" aria-hidden="true" />
          <p class="mt-3 text-base font-bold">{{ BRAND.area }}</p>
          <p class="mt-2 text-xs text-muted-foreground">
            Google Map 版位預留・地址待提供
          </p>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { Phone, MessageCircle, Instagram, Facebook, MapPin } from "lucide-vue-next";
import PageHero from "~/components/ui/PageHero.vue";
import Section from "~/components/ui/Section.vue";
import SectionHeading from "~/components/ui/SectionHeading.vue";
import PlaceholderMedia from "~/components/ui/PlaceholderMedia.vue";
import Accordion from "~/components/ui/Accordion.vue";
import AccordionItem from "~/components/ui/AccordionItem.vue";
import { BRAND, FAQS } from "~/utils/site-data";

const CHANNELS = [
  { icon: Phone, label: "電話", value: "號碼待提供" },
  { icon: MessageCircle, label: "LINE", value: "官方帳號待提供" },
  { icon: Instagram, label: "Instagram", value: "帳號待提供" },
  { icon: Facebook, label: "Facebook", value: "粉絲專頁待提供" },
];

const DESC =
  "KSE 常見問題與預約資訊：第一次來訪流程、與一般按摩的差異、運動前後安排、久坐族方案與預約方式。台中南屯運動恢復。";

useHead({
  title: "FAQ 與預約｜台中南屯筋膜放鬆預約｜KSE 美式筋膜放鬆教室",
  meta: [
    { name: "description", content: DESC },
    { property: "og:title", content: "FAQ 與預約｜KSE 美式筋膜放鬆教室" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
  ],
  script: [
    {
      type: "application/ld+json",
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    },
  ],
});
</script>
