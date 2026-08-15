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
      <div class="container-kse relative py-24 text-center lg:py-32">
        <span class="eyebrow">Media Slot</span>
        <h2 class="mt-4 text-3xl sm:text-5xl">合作主視覺版位</h2>
        <p class="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">合作素材／Logo 預留，後續替換。</p>
      </div>
    </section>

    <Section>
      <SectionHeading eyebrow="Partners" title="合作單位版位" />
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article v-for="p in PARTNERS" :key="p.name" class="surface-card rounded-sm p-7">
          <div class="flex h-28 items-center justify-center rounded-sm border border-dashed border-border text-xs text-muted-foreground">
            Logo 版位（待提供）
          </div>
          <h3 class="mt-6 text-xl">{{ p.name }}</h3>
          <p class="mt-2 text-xs uppercase tracking-widest text-primary">
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
      <div class="mt-12 rounded-sm border border-border bg-card p-8 text-center">
        <h3 class="text-2xl">洽談合作</h3>
        <p class="mt-3 text-sm text-muted-foreground">歡迎透過電話、LINE 官方帳號、Instagram 或 Facebook 粉絲專頁與我們聯繫洽談。</p>
        <div class="mt-6 flex justify-center">
          <BookingButton>聯絡我們</BookingButton>
        </div>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import BookingButton from "~/components/ui/BookingButton.vue"
import PlaceholderMedia from "~/components/ui/PlaceholderMedia.vue"
import { PARTNERS } from "~/utils/site-data"

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
