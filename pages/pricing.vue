<template>
  <div>
    <PageHero
      eyebrow="Pricing"
      title="KSE 價目表｜台中南屯運動按摩・筋膜放鬆價格"
      :desc="`${PRICED_SERVICE_NAMES}價格相同（${PRICING.includes}）：單堂 60 分鐘 ${ntd(PRICING.single.price)}，首次到店新客 ${ntd(PRICING.firstVisit.price)}，另有 4–32 堂課程方案。採完全預約制。`"
      :crumbs="[{ label: '價目表' }]"
    />

    <!-- 單堂與新客：最常被問的兩個價格放最前面 -->
    <Section>
      <SectionHeading eyebrow="Single Session" title="單堂與新客優惠" :desc="`價目表更新日：${PRICE_UPDATED}`" />
      <div class="mt-10 grid gap-6 md:grid-cols-2">
        <article class="surface-card flex flex-col p-8">
          <p class="text-xs font-bold tracking-[0.16em] text-primary">{{ PRICING.single.label }}</p>
          <h2 class="mt-3 text-2xl">{{ PRICING.services.map((x) => x.name).join("／") }}</h2>
          <p class="mt-1 text-sm text-muted-foreground">{{ PRICING.includes }}・{{ PRICING.single.duration }}</p>
          <p class="mt-6 font-display text-5xl font-extrabold text-foreground">{{ ntd(PRICING.single.price) }}</p>
        </article>
        <article class="relative isolate flex flex-col overflow-hidden bg-navy p-8 text-white">
          <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
          <p class="text-xs font-bold tracking-[0.16em] text-gold">{{ PRICING.firstVisit.label }}</p>
          <h2 class="mt-3 text-2xl text-white">首次到店體驗</h2>
          <p class="mt-1 text-sm text-navy-foreground">{{ PRICED_SERVICE_NAMES }}皆適用</p>
          <p class="mt-1 text-sm text-navy-foreground">{{ PRICING.firstVisit.duration }}（原價 {{ ntd(PRICING.single.price) }}）</p>
          <p class="mt-6 font-display text-5xl font-extrabold text-gold">{{ ntd(PRICING.firstVisit.price) }}</p>
          <p class="mt-4 text-sm leading-relaxed text-navy-foreground">※ {{ PRICING.firstVisit.note }}</p>
        </article>
      </div>
    </Section>

    <!-- 課程方案 -->
    <Section tone="ink">
      <SectionHeading eyebrow="Packages" title="課程方案" desc="需要常態保養或訓練期維護的人，可依頻率選擇方案，堂數越多平均每小時越划算。" />
      <div class="mt-10 overflow-x-auto border border-border bg-card">
        <table class="w-full min-w-[34rem] border-collapse text-left text-sm sm:text-base">
          <caption class="sr-only">KSE 運動按摩課程方案價格</caption>
          <thead>
            <tr class="bg-navy text-white">
              <th scope="col" class="px-4 py-4 font-bold sm:px-6">方案</th>
              <th scope="col" class="px-4 py-4 font-bold sm:px-6">總價</th>
              <th scope="col" class="px-4 py-4 font-bold text-gold sm:px-6">平均每小時</th>
              <th scope="col" class="px-4 py-4 font-bold sm:px-6">折數</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in PRICING.packages" :key="p.sessions" class="border-t border-border">
              <th scope="row" class="px-4 py-4 font-semibold sm:px-6">{{ p.sessions }} 堂（{{ p.sessions }} 小時）</th>
              <td class="px-4 py-4 sm:px-6">{{ ntd(p.total) }}</td>
              <td class="px-4 py-4 font-bold sm:px-6">{{ ntd(p.perHour) }}</td>
              <td class="px-4 py-4 sm:px-6">{{ p.discount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul class="mt-5 space-y-1 text-sm text-muted-foreground">
        <li v-for="n in PRICING.notes" :key="n">※ {{ n }}</li>
      </ul>
    </Section>

    <!-- 付款與預約 -->
    <Section>
      <div class="grid gap-6 lg:grid-cols-3">
        <div class="surface-card p-7">
          <CreditCard class="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 class="mt-4 text-xl">付款方式</h2>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ PRICING.payment.join("、") }}</p>
        </div>
        <div class="surface-card p-7">
          <CalendarCheck class="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 class="mt-4 text-xl">預約方式</h2>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            本店採完全預約制。可官網線上預約，或透過官方 LINE
            <a :href="BRAND.line" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary hover:underline">{{ PRICING.lineId }}</a>、預約專線
            <a :href="`tel:${BRAND.phone.replace(/-/g, '')}`" class="font-semibold text-primary hover:underline">{{ BRAND.phone }}</a>。
          </p>
        </div>
        <div class="surface-card p-7">
          <Clock class="h-6 w-6 text-primary" aria-hidden="true" />
          <h2 class="mt-4 text-xl">取消與改期</h2>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ PRICING.cancel }}</p>
        </div>
      </div>

      <div class="mt-10 border-l-4 border-gold bg-ink p-6">
        <p class="text-base font-bold text-foreground">預約前請先閱讀服務注意事項</p>
        <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
          發燒、急性感染、疑似血栓、急性骨折等情況不建議接受運動按摩；高血壓、懷孕、服用抗凝血藥物等情況請事先告知。
        </p>
        <NuxtLink to="/notice" class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
          {{ NOTICE.title }} <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </Section>

    <Section tone="navy">
      <SectionHeading dark center eyebrow="Booking" title="從一次評估開始" :desc="`${BRAND.address}・${BRAND.hours.label}`" />
      <div class="mt-10 flex flex-wrap justify-center gap-3">
        <BookingButton>線上預約</BookingButton>
        <NuxtLink
          to="/news/sports-massage-guide"
          class="inline-flex items-center gap-2 rounded-[2px] border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
        >
          運動按摩完整指南 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, CalendarCheck, Clock, CreditCard } from "lucide-vue-next"
import BookingButton from "~/components/ui/BookingButton.vue"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { ORG_ID, serviceId } from "~/composables/useGeoSchema"
import { NOTICE, ntd, PRICE_UPDATED, PRICED_SERVICE_NAMES, PRICING } from "~/utils/service-info"
import { BRAND, SITE_URL } from "~/utils/site-data"

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "價目表", item: "/pricing" },
])

// 價目表：OfferCatalog，每個方案都指回運動按摩 Service 實體
useHead({
  script: [
    {
      type: "application/ld+json" as any,
      innerHTML: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "OfferCatalog",
        "@id": `${SITE_URL}/pricing#catalog`,
        name: "KSE 美式筋膜放鬆教室價目表",
        url: `${SITE_URL}/pricing`,
        provider: { "@id": ORG_ID },
        // 每項適用服務各列一組方案，itemOffered 指回該服務實體
        itemListElement: PRICING.services.flatMap((svc) =>
          [
            { name: `${svc.name} 單堂 60 分鐘`, price: PRICING.single.price },
            { name: `${svc.name} 首次到店新客 60 分鐘`, price: PRICING.firstVisit.price },
            ...PRICING.packages.map((p) => ({ name: `${svc.name} ${p.sessions} 堂課程方案`, price: p.total })),
          ].map((o) => ({
            "@type": "Offer",
            name: o.name,
            price: o.price,
            priceCurrency: "TWD",
            itemOffered: { "@id": serviceId(svc.slug) },
          })),
        ),
      }),
    },
  ],
})

usePageSeo({
  title: "運動按摩・筋膜放鬆價格｜台中南屯 KSE 價目表・新客優惠",
  description: `KSE 台中南屯運動按摩與美式筋膜放鬆價目表（兩項同價）：${PRICING.includes}，單堂 60 分鐘 ${ntd(PRICING.single.price)}，首次到店新客 ${ntd(PRICING.firstVisit.price)}；4 到 32 堂課程方案平均每小時 ${ntd(PRICING.packages.at(-1)!.perHour)} 起。可付現、刷卡或轉帳，採預約制。`,
  path: "/pricing",
})
</script>
