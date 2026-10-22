<template>
  <div>
    <PageHero
      eyebrow="Sports Partners"
      title="球隊與校園運動恢復合作"
      desc="KSE 與職業球隊、學校校隊與運動員深度合作，以動態評估為起點，結合美式筋膜放鬆與專項運動按摩，支援賽季中的身體維護與賽後恢復。"
      :crumbs="[{ label: '運動合作' }]"
    >
      <nav aria-label="合作單位快速導覽" class="mt-8 flex flex-wrap gap-2">
        <a
          v-for="p in PARTNERS"
          :key="p.name"
          :href="p.name === '中信兄弟' ? '#brothers' : '#schools'"
          class="inline-flex items-center gap-2 rounded-[2px] border border-white/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:border-gold hover:text-gold"
        >
          {{ p.name }}
          <span class="text-xs font-medium text-navy-foreground">{{ p.type }}</span>
        </a>
      </nav>
    </PageHero>

    <!-- 中信兄弟指定合作 -->
    <Section id="brothers">
      <div class="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div class="lg:col-span-6">
          <div class="flex flex-wrap items-center gap-3">
            <span class="inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/10 px-3.5 py-1 text-xs font-bold tracking-wider text-primary">
              <span class="h-1.5 w-1.5 rounded-full bg-gold" />
              OFFICIAL PARTNER
            </span>
            <span class="text-xs font-medium text-muted-foreground sm:text-sm">中華職棒・職業棒球隊指定合作</span>
          </div>

          <div class="mt-6 flex items-center gap-4">
            <img src="~/assets/images/kse-logo-circle.png" alt="KSE Logo" width="56" height="56" class="h-12 w-12 object-contain sm:h-14 sm:w-14" />
            <span class="font-display text-2xl font-bold text-gold" aria-hidden="true">×</span>
            <img :src="BROTHERS_LOGO" alt="中信兄弟棒球隊 Brothers" width="315" height="315" class="h-14 w-auto object-contain sm:h-16" />
          </div>

          <h2 class="mt-6 font-display text-4xl font-extrabold italic leading-none sm:text-5xl">
            KSE <span class="text-gold">×</span> 中信兄弟
          </h2>
          <p class="mt-3 font-display text-sm font-bold tracking-wider text-primary sm:text-base">
            BROTHERS BASEBALL CLUB 運動恢復合作團隊
          </p>
          <p class="mt-5 text-base leading-relaxed text-muted-foreground">
            以動態評估為起點，結合美式筋膜放鬆與專項運動按摩，支援中信兄弟職棒選手在緊湊高張力的賽事週期中，維持最佳活動度與賽後體能恢復。
          </p>

          <ol class="mt-8 grid gap-4 sm:grid-cols-3">
            <li v-for="(item, idx) in BROTHERS_SCOPE" :key="item.t" class="border-t-2 border-gold bg-ink p-5">
              <span class="font-display text-2xl font-extrabold italic leading-none text-gold">0{{ idx + 1 }}</span>
              <p class="mt-2 font-bold">{{ item.t }}</p>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">{{ item.d }}</p>
            </li>
          </ol>
        </div>

        <!-- 主視覺：兩張錯位照片 -->
        <div class="relative lg:col-span-6">
          <div class="grid grid-cols-2 gap-4 sm:gap-6">
            <div v-for="(photo, idx) in BROTHERS_FEATURED" :key="idx" :class="cn('relative', idx === 1 && 'mt-12 sm:mt-16')">
              <div class="absolute -left-3 -top-3 h-full w-full border border-gold/50" aria-hidden="true" />
              <img
                :src="photo.src"
                :alt="photo.alt"
                width="800"
                height="1024"
                loading="lazy"
                class="relative aspect-[3/4] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 選手合作實錄照片牆 -->
      <div class="mt-20 border-t border-border pt-10">
        <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span class="eyebrow">Player Gallery</span>
            <h3 class="mt-3 text-2xl sm:text-3xl">職棒選手合作實錄</h3>
          </div>
          <p class="text-sm text-muted-foreground">定期進駐支援職棒選手身體維護・專屬動作優化與運動按摩</p>
        </div>
        <div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          <div v-for="(photo, idx) in BROTHERS_GALLERY" :key="idx" class="group overflow-hidden rounded-[2px] bg-ink">
            <img
              :src="photo.src"
              :alt="photo.alt"
              width="800"
              height="1024"
              loading="lazy"
              class="aspect-[3/4] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </Section>

    <!-- 校園合作 -->
    <Section id="schools" tone="ink">
      <SectionHeading eyebrow="School Partners" title="校園運動合作" desc="從成長期就建立正確的動作品質，是降低運動傷害最有效的方式。" />
      <div class="mt-12 grid gap-8 lg:grid-cols-2">
        <article v-for="(p, i) in SCHOOL_PARTNERS" :key="p.name" class="surface-card overflow-hidden">
          <img
            :src="SCHOOL_IMAGES[i]"
            :alt="SCHOOL_ALTS[i]"
            width="1024"
            height="768"
            loading="lazy"
            class="aspect-[4/3] w-full object-cover"
          />
          <div class="p-7">
            <p class="text-xs font-bold tracking-[0.16em] text-primary">{{ p.type }}</p>
            <h3 class="mt-2 text-2xl">{{ p.name }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ p.desc }}</p>
          </div>
        </article>
      </div>
    </Section>

    <Section>
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
import { cn } from "~/utils/cn"
import { BRAND, PARTNERS } from "~/utils/site-data"

import partnerDazhiImg from "~/assets/images/partner-dazhi.jpg"
import partnerYuyingImg from "~/assets/images/partner-yuying.jpg"

import brothersLogoImg from "~/assets/images/brothers-logo.png"
import partnerBrothers1 from "~/assets/images/partner-brothers-1.jpg"
import partnerBrothers2 from "~/assets/images/partner-brothers-2.jpg"
import partnerBrothers3 from "~/assets/images/partner-brothers-3.jpg"
import partnerBrothers4 from "~/assets/images/partner-brothers-4.jpg"
import partnerBrothers5 from "~/assets/images/partner-brothers-5.jpg"
import partnerBrothers6 from "~/assets/images/partner-brothers-6.jpg"
import partnerBrothers7 from "~/assets/images/partner-brothers-7.jpg"
import partnerBrothers8 from "~/assets/images/partner-brothers-8.jpg"

const BROTHERS_LOGO = brothersLogoImg

const BROTHERS_PHOTOS = [
  partnerBrothers1,
  partnerBrothers2,
  partnerBrothers3,
  partnerBrothers4,
  partnerBrothers5,
  partnerBrothers6,
  partnerBrothers7,
  partnerBrothers8,
].map((src) => ({ src, alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影" }))
const BROTHERS_FEATURED = BROTHERS_PHOTOS.slice(0, 2)
const BROTHERS_GALLERY = BROTHERS_PHOTOS.slice(2)

const SCHOOL_PARTNERS = PARTNERS.slice(1)
const SCHOOL_IMAGES = [partnerDazhiImg, partnerYuyingImg]
const SCHOOL_ALTS = [
  "大智國小女童籃球隊榮獲臺中市國小學生籃球聯賽冠軍，與 KSE 美式筋膜放鬆教室合影",
  "育英國中籃球隊與 KSE 美式筋膜放鬆教室團隊於體育館合影",
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
