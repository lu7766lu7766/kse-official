<template>
  <div>
    <PageHero
      eyebrow="Services"
      title="台中南屯筋膜放鬆與運動按摩服務"
      desc="從徒手處理到訓練課表，依你的評估結果與運動週期，組合出最適合的方案。第一次來都會先做靜態與動態評估。"
      :crumbs="[{ label: '服務項目' }]"
    >
      <nav aria-label="服務項目快速導覽" class="mt-8 flex flex-wrap gap-2">
        <NuxtLink
          v-for="s in SERVICES"
          :key="s.slug"
          :to="servicePath(s.slug)"
          class="rounded-[2px] border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
        >
          {{ s.title }}
        </NuxtLink>
      </nav>
    </PageHero>

    <Section>
      <div class="space-y-24">
        <!-- 保留 #slug 錨點，舊連結 /services#fascia 仍可落在對應區塊 -->
        <article v-for="(service, i) in SERVICES" :key="service.slug" :id="service.slug" class="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div :class="cn('relative', i % 2 === 1 && 'lg:order-2')">
            <div class="absolute -left-3 -top-3 h-full w-full border border-gold/50" aria-hidden="true" />
            <ResponsiveImage
              :image="SERVICE_IMAGES[service.slug]!"
              :alt="SERVICE_ALTS[service.slug]!"
              sizes="(min-width: 1024px) 600px, 100vw"
              loading="lazy"
              :class="cn('relative aspect-[4/3] w-full object-cover', SERVICE_POSITIONS[service.slug] || 'object-[50%_25%]')"
            />
          </div>
          <div>
            <span class="font-display text-5xl font-extrabold italic leading-none text-gold">0{{ i + 1 }}</span>
            <h2 class="mt-3 text-3xl sm:text-4xl">
              <NuxtLink :to="servicePath(service.slug)" class="transition-colors hover:text-primary">{{ service.title }}</NuxtLink>
            </h2>
            <p class="mt-4 text-lg font-semibold leading-relaxed text-foreground">{{ service.short }}</p>
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
            <NuxtLink :to="servicePath(service.slug)" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
              看{{ service.title }}完整介紹 <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
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
import { ArrowRight, Check } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import ResponsiveImage from "~/components/ui/ResponsiveImage.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { cn } from "~/utils/cn"
import { SERVICE_ALTS, SERVICE_IMAGES, SERVICE_POSITIONS } from "~/utils/service-images"
import { SERVICES, servicePath } from "~/utils/site-data"

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
