<template>
  <div>
    <PageHero
      eyebrow="Partnership"
      title="中信兄弟與校園運動合作"
      desc="KSE 與職業球隊、學校校隊與運動員一起工作，把評估、筋膜放鬆與動作訓練帶進訓練與比賽週期。"
      :crumbs="[{ label: '運動合作' }]"
    />

    <!-- 中信兄弟 -->
    <section class="relative isolate overflow-hidden bg-navy text-white">
      <img
        src="~/assets/images/baseball.jpg"
        alt=""
        width="1600"
        height="912"
        loading="lazy"
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div class="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/90 to-navy/40" aria-hidden="true" />
      <div class="container-kse py-20 lg:py-28">
        <span class="eyebrow text-gold">Official Partner・職業棒球</span>
        <h2 class="mt-5 font-display text-5xl font-extrabold italic leading-none text-white sm:text-7xl">
          KSE <span class="text-gold">×</span> 中信兄弟
        </h2>
        <p class="mt-6 max-w-2xl text-base leading-relaxed text-navy-foreground lg:text-lg">{{ PARTNERS[0]?.desc }}</p>
        <ul class="mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          <li v-for="item in BROTHERS_SCOPE" :key="item.t" class="border-l-2 border-gold bg-white/5 px-5 py-4">
            <p class="font-bold text-white">{{ item.t }}</p>
            <p class="mt-1 text-sm text-navy-foreground">{{ item.d }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- 校園合作 -->
    <Section>
      <SectionHeading eyebrow="School Partners" title="校園運動合作" desc="從成長期就建立正確的動作品質，是降低運動傷害最有效的方式。" />
      <div class="mt-12 grid gap-8 lg:grid-cols-2">
        <article v-for="(p, i) in SCHOOL_PARTNERS" :key="p.name" class="surface-card overflow-hidden">
          <img
            :src="SCHOOL_IMAGES[i]"
            :alt="SCHOOL_ALTS[i]"
            width="1200"
            height="1600"
            loading="lazy"
            class="aspect-[4/3] w-full object-cover object-[50%_25%]"
          />
          <div class="p-7">
            <p class="text-xs font-bold tracking-[0.16em] text-primary">{{ p.type }}</p>
            <h3 class="mt-2 text-2xl">{{ p.name }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ p.desc }}</p>
          </div>
        </article>
      </div>
    </Section>

    <Section tone="ink">
      <SectionHeading eyebrow="Work With Us" title="球隊／學校／運動員合作方式" desc="實際方案依單位需求與賽季週期討論後確認。" />
      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div v-for="(i, idx) in WORK_DIRECTIONS" :key="i.t" class="surface-card p-7">
          <span class="font-display text-4xl font-extrabold italic leading-none text-gold">0{{ idx + 1 }}</span>
          <h3 class="mt-4 text-lg">{{ i.t }}</h3>
          <p class="mt-3 text-sm text-muted-foreground">{{ i.d }}</p>
        </div>
      </div>
      <div class="relative isolate mt-12 overflow-hidden bg-navy p-8 text-center text-white sm:p-12">
        <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
        <h3 class="text-2xl font-extrabold text-white sm:text-3xl">洽談運動與球隊合作</h3>
        <p class="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-navy-foreground">
          歡迎各級球隊、學校校隊、運動防護員或運動員個人與我們聯繫，我們將依單位需求與賽事週期安排專屬支援方案。
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            :href="BRAND.line"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-[2px] bg-[#06C755] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#05b34c]"
          >
            <MessageCircle class="h-4 w-4" aria-hidden="true" />
            LINE 官方帳號洽談
          </a>
          <a
            :href="`tel:${BRAND.phone.replace(/[^0-9]/g, '')}`"
            class="inline-flex items-center justify-center gap-2 rounded-[2px] border border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
          >
            <Phone class="h-4 w-4" aria-hidden="true" />
            電話洽詢 {{ BRAND.phone }}
          </a>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { MessageCircle, Phone } from "lucide-vue-next"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { BRAND, PARTNERS } from "~/utils/site-data"

import coreImg from "~/assets/images/core.jpg"
import strengthImg from "~/assets/images/strength.jpg"

const SCHOOL_PARTNERS = PARTNERS.slice(1)
const SCHOOL_IMAGES = [coreImg, strengthImg]
const SCHOOL_ALTS = [
  "KSE 教練在校園體育館指導學生進行伸展與動作控制練習",
  "KSE 教練在育英國中體育館指導校隊學生進行彈力帶下肢訓練",
]

const BROTHERS_SCOPE = [
  { t: "動作評估", d: "找出高負荷部位的活動度限制與代償。" },
  { t: "筋膜放鬆", d: "處理肩、胸椎、髖等專項受限部位。" },
  { t: "賽後恢復", d: "依賽程安排運動按摩與身體維護。" },
]

const WORK_DIRECTIONS = [
  { t: "球隊合作", d: "隨隊恢復支援、賽季期間的定期筋膜處理與體能維護規劃。" },
  { t: "學校合作", d: "校隊動作評估、運動傷害預防講座與基礎肌力課程設計。" },
  { t: "運動員個人", d: "個別化的評估、恢復與訓練規劃，配合比賽週期安排。" },
]

const { injectBreadcrumbsSchema } = useGeoSchema()
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "運動合作", item: "/partners" },
])

usePageSeo({
  title: "中信兄弟合作｜球隊與校園運動恢復合作｜KSE",
  description:
    "KSE 美式筋膜放鬆教室為中信兄弟合作的運動恢復團隊，並與大智國小、育英國中等校園運動團隊合作，提供動作評估、筋膜放鬆、賽後恢復與基礎肌力課程。歡迎球隊洽談。",
  path: "/partners",
  image: "/og-image.jpg",
})
</script>
