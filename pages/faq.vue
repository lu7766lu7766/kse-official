<template>
  <div>
    <PageHero
      eyebrow="FAQ"
      title="台中筋膜放鬆、運動按摩常見問題"
      desc="從第一次來會做什麼、會不會痛、多久一次到如何預約，整理最常被問到的問題。"
      :crumbs="[{ label: '常見問題' }]"
    />

    <Section>
      <div class="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
        <aside class="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading eyebrow="Questions" :title="`${FAQS.length} 個常見問題`" />
          <p class="mt-4 text-sm leading-relaxed text-muted-foreground">
            找不到答案？歡迎透過 LINE 官方帳號或電話 {{ BRAND.phone }} 直接詢問。
          </p>
          <a
            :href="BRAND.line"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-6 inline-flex items-center gap-2 rounded-[2px] bg-[#06C755] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
          >
            <MessageCircle class="h-4 w-4" aria-hidden="true" />
            LINE 詢問
          </a>
        </aside>
        <Accordion type="multiple" collapsible>
          <AccordionItem v-for="f in FAQS" :key="f.q" :value="f.q" :title="f.q">
            {{ f.a }}
          </AccordionItem>
        </Accordion>
      </div>
    </Section>

    <Section id="booking" tone="ink">
      <SectionHeading eyebrow="Booking" title="預約與聯絡方式" :desc="`${BRAND.hours.label}，採預約制。可線上預約，或透過以下管道與我們聯繫。`" />
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <a
          v-for="c in CHANNELS"
          :key="c.label"
          :href="c.href"
          :target="!c.href.startsWith('tel:') ? '_blank' : undefined"
          :rel="!c.href.startsWith('tel:') ? 'noopener noreferrer' : undefined"
          class="surface-card block p-6"
        >
          <component :is="c.icon" class="h-6 w-6 text-primary" aria-hidden="true" />
          <h3 class="mt-4 text-base font-bold">{{ c.label }}</h3>
          <p class="mt-1 break-all text-sm text-muted-foreground">{{ c.value }}</p>
        </a>
      </div>

      <div class="mt-12 grid gap-6 lg:grid-cols-2">
        <div class="relative isolate flex flex-col justify-between overflow-hidden bg-navy p-8 text-white">
          <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
          <div>
            <span class="eyebrow text-gold">Book Online</span>
            <h3 class="mt-4 text-2xl font-extrabold text-white">線上預約，即時查看空檔</h3>
            <p class="mt-3 text-sm leading-relaxed text-navy-foreground">
              查看按摩師週排班與可用時段，支援即時預約與查詢取消。請至少提前半小時預約。
            </p>
          </div>
        </div>
        <div class="flex flex-col overflow-hidden border border-border bg-card">
          <iframe
            title="KSE 美式筋膜放鬆教室 Google 地圖位置"
            src="https://maps.google.com/maps?q=KSE美式筋膜放鬆教室&t=&z=16&ie=UTF8&iwloc=&output=embed"
            class="min-h-[280px] w-full flex-1 border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
          <div class="flex items-center justify-between gap-4 border-t border-border p-4 text-sm">
            <span class="flex items-center gap-1 font-medium text-foreground">
              <MapPin class="h-4 w-4 shrink-0 text-primary" aria-hidden="true" /> {{ BRAND.address }}
            </span>
            <a :href="BRAND.mapUrl" target="_blank" rel="noopener noreferrer" class="shrink-0 font-bold text-primary hover:underline">
              開啟 Google 地圖
            </a>
          </div>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { Phone, MessageCircle, Instagram, Facebook, MapPin } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import Accordion from "~/components/ui/Accordion.vue"
import AccordionItem from "~/components/ui/AccordionItem.vue"
import { BRAND, FAQS } from "~/utils/site-data"

const CHANNELS = [
  { icon: Phone, label: "電話", value: BRAND.phone, href: `tel:${BRAND.phone.replace(/-/g, "")}` },
  { icon: MessageCircle, label: "LINE", value: "LINE 官方帳號", href: BRAND.line },
  { icon: Instagram, label: "Instagram", value: "@kse_release_studio", href: BRAND.ig },
  { icon: Facebook, label: "Facebook", value: "KSE 美式筋膜放鬆教室", href: BRAND.fb },
]

const { injectFaqSchema, injectBreadcrumbsSchema } = useGeoSchema()
injectFaqSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "常見問題", item: "/faq" },
])

usePageSeo({
  title: `台中筋膜放鬆、運動按摩常見問題 ${FAQS.length} 問｜KSE`,
  description:
    "美式筋膜放鬆會痛嗎？和推拿、SPA 有何不同？拉傷後多久能按摩？KSE 台中南屯整理營業時間、療程時間、預約方式等常見問題，一次解答。",
  path: "/faq",
})
</script>
