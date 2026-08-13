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
        desc="歡迎透過電話、Instagram、Facebook 與我們聯繫預約，或造訪我們位於台中南屯的教室。"
      />
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <component
          :is="c.href ? 'a' : 'div'"
          v-for="c in CHANNELS"
          :key="c.label"
          :href="c.href"
          :target="c.href && !c.href.startsWith('tel:') ? '_blank' : undefined"
          :rel="c.href && !c.href.startsWith('tel:') ? 'noopener noreferrer' : undefined"
          class="surface-card rounded-sm p-6 transition-all hover:border-primary/60 block"
        >
          <component :is="c.icon" class="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 class="mt-4 text-base font-bold">{{ c.label }}</h3>
          <p class="mt-1 text-sm text-muted-foreground break-all">{{ c.value }}</p>
        </component>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <PlaceholderMedia
          label="第三方線上預約系統"
          note="系統串接版位預留，開通後可於此直接選擇服務與時段"
        />
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
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Phone, MessageCircle, Instagram, Facebook, MapPin } from "lucide-vue-next";
import PageHero from "~/components/ui/PageHero.vue";
import Section from "~/components/ui/Section.vue";
import SectionHeading from "~/components/ui/SectionHeading.vue";
import PlaceholderMedia from "~/components/ui/PlaceholderMedia.vue";
import Accordion from "~/components/ui/Accordion.vue";
import AccordionItem from "~/components/ui/AccordionItem.vue";
import { BRAND, FAQS } from "~/utils/site-data";

const CHANNELS = computed(() => [
  { icon: Phone, label: "電話", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/-/g, "")}` },
  { icon: MessageCircle, label: "LINE", value: "官方帳號待提供", href: undefined },
  { icon: Instagram, label: "Instagram", value: "@kse_release_studio", href: BRAND.ig },
  { icon: Facebook, label: "Facebook", value: "KSE 美式筋膜放鬆教室", href: BRAND.fb },
]);

const DESC =
  "KSE 常見問題與預約資訊：解答台中運動按摩、美式筋膜放鬆、受傷或肌肉拉傷後放鬆保養建議、與傳統推拿SPA差異及預約方式。";

useHead({
  title: "台中運動按摩與受傷舒緩常見問題｜FAQ與預約｜KSE 美式筋膜放鬆教室",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "台中運動按摩,受傷放鬆,台中筋膜放鬆,美式筋膜放鬆問答,拉傷按摩注意事項,肌肉緊繃保養,台中南屯按摩預約",
    },
    { property: "og:title", content: "台中運動按摩與受傷舒緩常見問題｜FAQ與預約｜KSE" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kse-release.com/faq" },
  ],
  link: [
    { rel: "canonical", href: "https://kse-release.com/faq" },
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
