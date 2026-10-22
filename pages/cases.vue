<template>
  <div>
    <PageHero
      eyebrow="How It Works"
      title="從評估到訓練，流程長什麼樣子"
      desc="運動員、久坐上班族與青少年運動員三種常見的處理路徑。每個人的實際內容都會依評估結果調整。"
      :crumbs="[{ label: '案例分享' }]"
    />

    <Section>
      <p class="max-w-3xl text-sm text-muted-foreground">
        以下為常見處理路徑說明，不代表個別個案結果。
      </p>

      <div class="mt-10 space-y-8">
        <article v-for="c in CASES" :key="c.slug" :id="c.slug" class="surface-card p-8 lg:p-10">
          <span class="eyebrow">{{ c.tag }}</span>
          <h2 class="mt-3 text-2xl sm:text-3xl">{{ c.title }}</h2>
          <p class="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground">
            {{ c.summary }}
          </p>
          <ol class="mt-8 grid gap-6 lg:grid-cols-3">
            <li v-for="(s, i) in c.steps" :key="s.label" class="border-t-2 border-gold bg-background p-6">
              <span class="font-display text-4xl font-extrabold italic leading-none text-gold">0{{ i + 1 }}</span>
              <h3 class="mt-3 text-lg">{{ s.label }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ s.text }}
              </p>
            </li>
          </ol>
        </article>
      </div>
    </Section>

    <Section tone="navy">
      <SectionHeading dark center eyebrow="Your Turn" title="你的流程，從一次評估開始" desc="每個人的身體狀況不同，透過專業評估找出最適合你的處理與訓練路徑。" />
    </Section>
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { CASES } from "~/utils/site-data"

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "案例分享", item: "/cases" },
])

usePageSeo({
  title: "處理流程：運動員、久坐族、青少年怎麼做筋膜放鬆與訓練｜KSE",
  description:
    "KSE 台中南屯的三種常見處理路徑：投擲類運動員的動態評估與胸椎旋轉、久坐上班族的肩頸下背與核心穩定、青少年運動員的動作控制與漸進肌力訓練。",
  path: "/cases",
})
</script>
