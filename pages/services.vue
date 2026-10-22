<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="台中南屯筋膜放鬆與運動按摩服務"
      desc="從徒手處理到訓練課表，依你的評估結果與運動週期，組合出最適合的方案。第一次來都會先做靜態與動態評估。"
      :crumbs="[{ label: '服務項目' }]"
    >
      <nav aria-label="服務項目快速導覽" class="mt-8 flex flex-wrap gap-2">
        <a
          v-for="s in SERVICES"
          :key="s.slug"
          :href="`#${s.slug}`"
          class="rounded-[2px] border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
        >
          {{ s.title }}
        </a>
      </nav>
    </PageHero>

    <Section>
      <div class="space-y-24">
        <article v-for="(service, i) in SERVICES" :key="service.slug" :id="service.slug" class="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div :class="cn('relative', i % 2 === 1 && 'lg:order-2')">
            <div class="absolute -left-3 -top-3 h-full w-full border border-gold/50" aria-hidden="true" />
            <img
              :src="IMAGES[service.slug]"
              :alt="ALTS[service.slug]"
              width="1200"
              height="1600"
              loading="lazy"
              :class="cn('relative aspect-[4/3] w-full object-cover', POSITIONS[service.slug] || 'object-[50%_25%]')"
            />
          </div>
          <div>
            <span class="font-display text-5xl font-extrabold italic leading-none text-gold">0{{ i + 1 }}</span>
            <h2 class="mt-3 text-3xl sm:text-4xl">{{ service.title }}</h2>
            <p class="mt-4 text-lg font-semibold leading-relaxed text-foreground">{{ service.short }}</p>
            <p class="mt-4 text-base leading-relaxed text-muted-foreground">{{ service.detail }}</p>
            <ul class="mt-6 space-y-3 text-sm text-foreground">
              <li v-for="p in service.points" :key="p" class="flex gap-3">
                <Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                {{ p }}
              </li>
            </ul>
            <dl class="mt-8 grid gap-4 border-t border-border pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt class="text-xs font-bold tracking-[0.14em] text-muted-foreground">時間</dt>
                <dd class="mt-1 font-semibold">{{ service.duration }}</dd>
              </div>
              <div>
                <dt class="text-xs font-bold tracking-[0.14em] text-muted-foreground">適合</dt>
                <dd class="mt-1 font-semibold">{{ service.audience }}</dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </Section>

    <Section tone="navy">
      <SectionHeading dark center eyebrow="Not Sure?" title="不確定該從哪一項開始？" desc="第一次來訪都會先進行完整評估，我們會依結果建議最適合的方案。" />
    </Section>
  </div>
</template>

<script setup lang="ts">
import { Check } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { cn } from "~/utils/cn"
import { SERVICES } from "~/utils/site-data"

import stretchImg from "~/assets/images/stretch.jpg"
import massageImg from "~/assets/images/sports-massage.jpg"
import coreImg from "~/assets/images/core.jpg"
import strengthImg from "~/assets/images/strength.jpg"

const IMAGES: Record<string, string> = {
  fascia: stretchImg,
  "sports-massage": massageImg,
  core: coreImg,
  strength: strengthImg,
}

const ALTS: Record<string, string> = {
  fascia: "KSE 放鬆師在台中南屯教室為客人進行腿後側美式筋膜放鬆",
  "sports-massage": "KSE 放鬆師為客人進行臀腿下肢運動按摩",
  core: "KSE 教練在校園體育館指導學生進行核心穩定與伸展動作",
  strength: "KSE 教練在育英國中指導校隊學生進行彈力帶下肢肌力訓練",
}

const POSITIONS: Record<string, string> = {
  fascia: "object-[50%_25%]",
  "sports-massage": "object-center",
  core: "object-[50%_25%]",
  strength: "object-[50%_25%]",
}

const { injectServicesSchema, injectBreadcrumbsSchema } = useGeoSchema()
injectServicesSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "服務項目", item: "/services" },
])

usePageSeo({
  title: "服務項目：美式筋膜放鬆・運動按摩・核心穩定・肌力訓練｜KSE",
  description:
    "KSE 台中南屯服務項目：美式筋膜放鬆、運動按摩（賽前賽後恢復）、久坐族核心穩定修復與肌力體能訓練，單次約 60 分鐘，先評估再處理，線上即時預約。",
  path: "/services",
})
</script>
