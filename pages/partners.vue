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
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      />
      <div class="absolute inset-0 -z-10 bg-linear-to-b from-navy/95 via-navy/90 to-navy" aria-hidden="true" />
      <div class="container-kse py-16 lg:py-24">
        <!-- 頂部聯名標籤與雙品牌 LOGO 區塊 -->
        <div class="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
          <div class="flex items-center gap-3">
            <span class="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-bold tracking-wider text-gold">
              <span class="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              OFFICIAL PARTNER
            </span>
            <span class="text-xs font-medium text-navy-foreground sm:text-sm">中華職棒・職業棒球隊指定合作</span>
          </div>

          <!-- 雙品牌合作 LOGO -->
          <div class="inline-flex items-center gap-3.5 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/20">
            <div class="flex items-center gap-2">
              <img src="~/assets/images/kse-logo-circle.png" alt="KSE Logo" class="h-8 w-8 object-contain" />
              <span class="font-display text-sm font-bold tracking-wider text-white">KSE</span>
            </div>
            <span class="font-display text-base font-bold text-gold">×</span>
            <div class="flex items-center gap-2.5">
              <img :src="BROTHERS_LOGO" alt="中信兄弟棒球隊 Brothers" class="h-8 w-auto object-contain drop-shadow" />
              <span class="text-xs sm:text-sm font-bold tracking-wide text-white">中信兄弟 Brothers</span>
            </div>
          </div>
        </div>

        <!-- 合作主題文字與服務項目 -->
        <div class="mt-10 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <div class="flex items-start sm:items-center gap-5">
              <img :src="BROTHERS_LOGO" alt="中信兄弟" class="hidden sm:block h-16 lg:h-20 w-auto object-contain drop-shadow-xl shrink-0" />
              <div>
                <h2 class="font-display text-4xl font-extrabold italic leading-none text-white sm:text-6xl lg:text-7xl">
                  KSE <span class="text-gold">×</span> 中信兄弟
                </h2>
                <p class="mt-3 font-display text-base sm:text-lg font-bold tracking-wider text-gold">
                  BROTHERS BASEBALL CLUB 運動恢復合作團隊
                </p>
              </div>
            </div>
            <p class="mt-5 max-w-2xl text-base leading-relaxed text-navy-foreground lg:text-lg">
              {{ PARTNERS[0]?.desc }}
            </p>
          </div>

          <div class="lg:col-span-5">
            <ul class="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              <li
                v-for="item in BROTHERS_SCOPE"
                :key="item.t"
                class="rounded-lg border-l-4 border-gold bg-white/5 p-4 backdrop-blur-sm transition-colors hover:bg-white/10"
              >
                <p class="font-bold text-white text-base">{{ item.t }}</p>
                <p class="mt-1 text-xs sm:text-sm text-navy-foreground leading-relaxed">{{ item.d }}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 選手合作實錄照片牆 (Gallery) -->
        <div class="mt-16 border-t border-white/10 pt-10">
          <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <span class="text-xs font-bold tracking-[0.2em] text-gold uppercase">Player Gallery</span>
              <h3 class="mt-1 text-2xl font-bold text-white sm:text-3xl">職棒選手合作實錄</h3>
            </div>
            <p class="text-xs sm:text-sm text-navy-foreground">
              定期進駐支援職棒選手身體維護・專屬動作優化與運動按摩
            </p>
          </div>

          <!-- 照片網格 (4 欄 × 2 列，共 8 張，目前 5 張已就位) -->
          <div class="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            <div
              v-for="(photo, idx) in BROTHERS_PHOTOS"
              :key="idx"
              class="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-2xl hover:shadow-gold/10"
            >
              <div class="aspect-[3/4] w-full overflow-hidden bg-black/40">
                <img
                  :src="photo.src"
                  :alt="photo.alt"
                  width="800"
                  height="1024"
                  loading="lazy"
                  class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
              </div>
              <div class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
              <div class="absolute inset-x-0 bottom-0 p-3 sm:p-4 text-white">
                <span class="inline-block rounded-[2px] bg-gold px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-navy">
                  {{ photo.tag }}
                </span>
                <p class="mt-1.5 text-xs sm:text-sm font-bold text-white drop-shadow-md">
                  {{ photo.title }}
                </p>
              </div>
            </div>

            <!-- 待補 3 張照片之優雅佔位卡片 -->
            <div
              v-for="n in (8 - BROTHERS_PHOTOS.length)"
              :key="`placeholder-${n}`"
              class="hidden sm:flex aspect-[3/4] flex-col items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/[0.02] p-4 text-center transition-colors hover:border-white/20"
            >
              <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-gold text-lg font-bold">
                +
              </span>
              <p class="mt-3 text-xs font-bold text-white/80">選手合作記錄</p>
              <p class="mt-1 text-[11px] text-muted-foreground">即將更新</p>
            </div>
          </div>
        </div>
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
  {
    src: partnerBrothers1,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers2,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers3,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers4,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers5,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers6,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers7,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
  {
    src: partnerBrothers8,
    alt: "中信兄弟職業棒球選手與 KSE 團隊運動恢復合影",
    title: "中信兄弟選手 × KSE",
    tag: "指定合作",
  },
]

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
