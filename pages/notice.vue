<template>
  <div>
    <PageHero eyebrow="Safety First" :title="NOTICE.title" :desc="NOTICE.intro" :crumbs="[{ label: '服務注意事項' }]" />

    <Section>
      <div class="mx-auto max-w-3xl space-y-14">
        <section v-for="(sec, i) in NOTICE.sections" :key="sec.title" :aria-labelledby="`notice-${i}`">
          <div class="flex items-baseline gap-4">
            <span class="font-display text-4xl font-extrabold italic leading-none text-gold">0{{ i + 1 }}</span>
            <h2 :id="`notice-${i}`" class="text-2xl sm:text-3xl">{{ sec.title }}</h2>
          </div>
          <p v-if="sec.desc" class="mt-4 text-base leading-relaxed text-muted-foreground">{{ sec.desc }}</p>
          <ul class="mt-5 grid gap-3" :class="i < 2 && 'sm:grid-cols-2'">
            <li
              v-for="item in sec.items"
              :key="item"
              :class="[
                'flex items-start gap-3 border bg-card p-4 text-sm leading-relaxed text-foreground',
                i === 0 ? 'border-l-4 border-border border-l-[#b4442f]' : 'border-border',
              ]"
            >
              <component
                :is="i === 0 ? Ban : i === 1 ? MessageSquareWarning : Hand"
                :class="['mt-0.5 h-4 w-4 shrink-0', i === 0 ? 'text-[#b4442f]' : 'text-primary']"
                aria-hidden="true"
              />
              {{ item }}
            </li>
          </ul>
        </section>

        <section aria-labelledby="notice-safety">
          <div class="flex items-baseline gap-4">
            <span class="font-display text-4xl font-extrabold italic leading-none text-gold">04</span>
            <h2 id="notice-safety" class="text-2xl sm:text-3xl">服務安全提醒</h2>
          </div>
          <div class="mt-5 space-y-4 border-l-4 border-gold bg-ink p-6 text-base leading-relaxed text-foreground/85">
            <p v-for="t in NOTICE.safety" :key="t">{{ t }}</p>
            <p class="text-lg font-extrabold text-foreground">{{ NOTICE.motto }}</p>
          </div>
        </section>

        <div class="flex flex-wrap gap-3">
          <NuxtLink to="/pricing" class="inline-flex items-center gap-2 text-sm font-bold text-primary">
            查看價目表 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
          <NuxtLink to="/news/sports-massage-guide" class="inline-flex items-center gap-2 text-sm font-bold text-primary sm:ml-6">
            運動按摩完整指南 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Ban, Hand, MessageSquareWarning } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import { NOTICE } from "~/utils/service-info"

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "服務注意事項", item: "/notice" },
])

usePageSeo({
  title: "運動按摩禁忌與注意事項｜哪些情況不適合按摩｜KSE",
  description:
    "運動按摩前必看：發燒或急性感染、深層靜脈血栓、急性骨折、急性心血管疾病等情況不建議按摩；高血壓、糖尿病、懷孕、服用抗凝血藥物、近期手術請事先告知。KSE 台中南屯服務注意事項。",
  path: "/notice",
})
</script>
