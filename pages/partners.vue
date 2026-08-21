<template>
  <div>
    <PageHero
      eyebrow="Partnership"
      title="與球隊、學校與運動員一起工作"
      desc="以下所有合作單位素材、Logo 與說明皆為預留版位，實際內容將於品牌方提供後替換，網站不會預先撰寫未經提供的合作細節。"
    />

    <section class="relative isolate overflow-hidden border-b border-border">
      <img
        src="~/assets/images/baseball.jpg"
        alt="夜間球場中揮棒的棒球選手，深藍黑色調運動攝影"
        width="1600"
        height="912"
        loading="lazy"
        class="absolute inset-0 h-full w-full object-cover opacity-35"
      />
      <div class="absolute inset-0 cinematic opacity-80" />
      <div class="container-kse relative py-24 text-center lg:py-32 text-white">
        <span class="eyebrow text-primary">Media Slot</span>
        <h2 class="mt-4 text-3xl sm:text-5xl text-white">合作主視覺版位</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm text-stone-200">合作素材／Logo 預留，後續替換。</p>
      </div>
    </section>

    <Section>
      <SectionHeading eyebrow="Partners" title="合作單位版位" />
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article
          v-for="p in PARTNERS"
          :key="p.name"
          :class="[
            'surface-card rounded-sm p-7 transition-all',
            p.name === '中信兄弟' && 'border-primary/50 ring-1 ring-primary/20 bg-linear-to-b from-card via-card to-secondary/30'
          ]"
        >
          <div
            :class="[
              'flex h-28 items-center justify-center rounded-sm text-xs transition-colors',
              p.name === '中信兄弟'
                ? 'bg-navy text-amber-300 font-bold border border-primary/40 shadow-sm'
                : 'border border-dashed border-border text-muted-foreground'
            ]"
          >
            {{ p.name === '中信兄弟' ? '中信兄弟 Logo 版位（即將上線）' : 'Logo 版位（待提供）' }}
          </div>
          <h3 class="mt-6 text-xl">{{ p.name }}</h3>
          <p class="mt-2 text-xs uppercase tracking-widest text-primary font-bold">
            {{ p.note }}
          </p>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
            {{ p.desc }}
          </p>
          <div class="mt-6">
            <PlaceholderMedia label="合作照片／影片版位" note="素材待提供後替換" />
          </div>
        </article>
      </div>
    </Section>

    <Section tone="ink">
      <SectionHeading eyebrow="Work With Us" title="球隊／學校／運動員合作" desc="以下為合作方向說明，實際方案將依單位需求討論後確認。" />
      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <div v-for="i in WORK_DIRECTIONS" :key="i.t" class="surface-card rounded-sm p-7">
          <h3 class="text-lg">{{ i.t }}</h3>
          <p class="mt-3 text-sm text-muted-foreground">{{ i.d }}</p>
        </div>
      </div>
      <div class="mt-12 rounded-sm border border-border bg-card p-8 sm:p-10 text-center surface-card">
        <h3 class="text-2xl font-extrabold text-foreground">洽談運動與球隊合作</h3>
        <p class="mt-3 max-w-xl mx-auto text-sm text-muted-foreground leading-relaxed">
          歡迎各級球隊、學校校隊、運動防護員或運動員個人與我們聯繫，我們將依單位需求與賽事週期安排專屬支援方案。
        </p>
        <div class="mt-6 flex flex-wrap items-center justify-center gap-3">
          <a
            :href="BRAND.line"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 rounded-sm bg-[#06C755] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#05b34c] hover:scale-105 shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            <MessageCircle class="h-4 w-4" />
            <span>LINE 官方帳號洽談</span>
          </a>
          <a
            :href="`tel:${BRAND.phone.replace(/[^0-9]/g, '')}`"
            class="inline-flex items-center justify-center gap-2 rounded-sm border border-border bg-secondary/60 px-6 py-3 text-sm font-bold text-foreground transition-all hover:border-primary hover:text-primary hover:scale-105 cursor-pointer"
          >
            <Phone class="h-4 w-4 text-primary" />
            <span>電話洽詢 ({{ BRAND.phone }})</span>
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
import PlaceholderMedia from "~/components/ui/PlaceholderMedia.vue"
import { BRAND, PARTNERS } from "~/utils/site-data"

const WORK_DIRECTIONS = [
  {
    t: "球隊合作",
    d: "隨隊恢復支援、賽季期間的定期筋膜處理與體能維護規劃。",
  },
  {
    t: "學校合作",
    d: "校隊動作評估、運動傷害預防講座與基礎肌力課程設計。",
  },
  {
    t: "運動員個人",
    d: "個別化的評估、恢復與訓練規劃，配合比賽週期安排。",
  },
]

const DESC = "KSE 運動合作專區：提供專業球隊隨隊恢復支援、校隊運動傷害防護講座、台中運動按摩與肌筋膜放鬆防護計畫。歡迎運動團體與選手洽談合作。"

useHead({
  title: "運動合作｜台中運動按摩與團隊傷害防護合作｜KSE 美式筋膜放鬆教室",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content: "台中運動按摩合作,球隊運動恢復,運動傷害防護,校隊筋膜放鬆,棒球運動恢復,賽後放鬆支援",
    },
    { property: "og:title", content: "運動合作｜台中運動按摩與團隊傷害防護｜KSE" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.kse-release.com.tw/partners" },
  ],
  link: [{ rel: "canonical", href: "https://www.kse-release.com.tw/partners" }],
})
</script>
