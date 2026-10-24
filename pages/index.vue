<template>
  <div>
    <!-- Hero：全版輪播照片 + 底部文案；sticky 固定在後，下方內容捲上來蓋過 -->
    <section
      class="sticky top-0 z-0 -mt-[68px] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-navy pt-[68px] text-white lg:-mt-[84px] lg:pt-[84px]"
    >
      <div class="absolute inset-0" aria-hidden="true">
        <img
          v-for="(slide, i) in HERO_SLIDES"
          :key="slide.src"
          :src="slide.src"
          alt=""
          :width="slide.width"
          :height="slide.height"
          :loading="i === 0 ? 'eager' : 'lazy'"
          :fetchpriority="i === 0 ? 'high' : 'auto'"
          :class="[
            'absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out',
            slide.position,
            i === activeSlide ? 'opacity-100' : 'opacity-0',
          ]"
        />
      </div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/45" aria-hidden="true" />
      <div class="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black/85 via-black/45 to-transparent" aria-hidden="true" />

      <!-- 照片人臉多在上方，文案整組壓在下緣；桌機改左右兩欄降低高度，避免擋臉 -->
      <div
        class="container-kse relative grid gap-8 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16"
      >
        <div>
          <span class="eyebrow rise-in text-gold">KSE 美式筋膜放鬆教室・台中南屯</span>
          <h1
            class="rise-in mt-4 text-4xl font-extrabold leading-[1.12] text-white [animation-delay:100ms] sm:text-5xl lg:text-6xl"
          >
            台中運動按摩<br />
            <span class="text-gold">美式筋膜放鬆</span>
          </h1>
        </div>
        <!-- 品牌主張：白、米相間逐行，金色左線收束；原副標降為補充說明 -->
        <div class="rise-in max-w-md border-l-2 border-gold pl-5 [animation-delay:200ms] sm:pl-6 lg:mb-1">
          <p class="text-lg font-medium leading-[1.7] tracking-[0.06em] sm:text-xl">
            <span class="block text-white">我們不只照顧選手</span>
            <span class="block text-[#e6d3b3]">更把職業級的照顧</span>
            <span class="block text-white">帶給每一個你</span>
          </p>
          <p class="mt-3 text-sm leading-relaxed text-white/65">
            不是單純放鬆，而是重新找回身體的活動能力。
          </p>
        </div>
        <div class="rise-in flex flex-wrap items-center gap-3 [animation-delay:300ms] lg:col-span-2">
          <NuxtLink to="/booking" class="btn-gold px-8 py-4 text-base">線上預約</NuxtLink>
          <NuxtLink
            to="/services"
            class="inline-flex items-center gap-2 rounded-[2px] bg-white/10 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
          >
            看服務項目 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>

      <a
        href="#intro"
        aria-label="往下捲動"
        class="absolute bottom-8 right-6 hidden h-14 w-14 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-gold hover:bg-gold hover:text-gold-foreground sm:flex"
      >
        <ArrowDown class="h-5 w-5" aria-hidden="true" />
      </a>
    </section>

    <!-- 首屏以下：z-10 蓋過 sticky Hero，intro 以漸層從透明接到底色 -->
    <div class="relative z-10">
    <section
      id="intro"
      class="bg-gradient-to-b from-transparent via-background to-background pb-4 pt-[20vh] [--tw-gradient-via-position:30%] sm:pt-[24vh]"
    >
      <div class="container-kse">
        <!-- 首段即答：地點 + 服務 + 對象 + 時間，方便搜尋摘要與 AI 引用 -->
        <p class="max-w-3xl text-xl font-bold leading-relaxed text-foreground sm:text-2xl">
          KSE 位於台中市南屯區大墩七街202號，以「評估 → 放鬆 → 動作 → 強化」四步流程，為運動員、跑者與久坐上班族處理肌肉緊繃、活動度受限與運動後恢復。{{ BRAND.hours.label }}，線上預約。
        </p>
        <dl class="mt-10 grid max-w-3xl grid-cols-2 gap-x-6 gap-y-5 border-t border-border pt-8 sm:grid-cols-4">
          <div v-for="f in HERO_FACTS" :key="f.label">
            <dt class="text-xs tracking-[0.14em] text-muted-foreground">{{ f.label }}</dt>
            <dd class="mt-1 font-display text-2xl font-bold text-foreground">{{ f.value }}</dd>
          </div>
        </dl>
      </div>
    </section>

    <div class="bg-background">
    <!-- Process -->
    <Section id="process">
      <SectionHeading eyebrow="The KSE Process" title="四步流程：讓改變留在身體裡" desc="每一次課程都遵循相同的邏輯，從評估開始，到訓練結束。" />
      <ol class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <li
          v-for="step in PROCESS"
          :key="step.no"
          class="surface-card group flex flex-col overflow-hidden"
        >
          <div v-if="PROCESS_IMAGES[step.no]" class="overflow-hidden">
            <img
              :src="PROCESS_IMAGES[step.no]"
              :alt="PROCESS_ALTS[step.no]"
              width="681"
              height="1024"
              loading="lazy"
              :class="['aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105', PROCESS_POSITIONS[step.no]]"
            />
          </div>
          <div class="flex flex-1 flex-col p-7">
            <span class="font-display text-6xl font-extrabold italic leading-none text-gold">{{ step.no }}</span>
            <h3 class="mt-5 text-xl">{{ step.title }}</h3>
            <p class="mt-3 text-sm leading-relaxed text-muted-foreground">
              {{ step.desc }}
            </p>
          </div>
        </li>
      </ol>
    </Section>

    <!-- Team -->
    <Section id="team" tone="ink">
      <SectionHeading
        eyebrow="Our Team"
        title="團隊介紹"
        desc="放鬆師與體能訓練師共同合作，從放鬆、動作調整到肌力訓練，依你的需求與手勁喜好安排最適合的人選。"
      />
      <ul class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="member in TEAM"
          :key="member.slug"
          class="surface-card group flex flex-col overflow-hidden"
        >
          <div class="overflow-hidden">
            <img
              :src="TEAM_IMAGES[member.slug]"
              :alt="`KSE ${member.role} ${member.name}`"
              width="720"
              height="1082"
              loading="lazy"
              class="aspect-[4/5] w-full object-cover object-[50%_20%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="flex flex-1 flex-col p-6">
            <p class="text-xs font-bold tracking-[0.16em] text-primary">{{ member.role }}</p>
            <h3 class="mt-1 font-display text-3xl font-extrabold">{{ member.name }}</h3>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li
                v-for="(tag, i) in member.tags"
                :key="tag"
                :class="[
                  'rounded-[2px] px-2.5 py-1 text-xs font-bold',
                  i === 0 ? 'bg-gold text-gold-foreground' : 'border border-border text-foreground',
                ]"
              >
                {{ tag }}
              </li>
            </ul>
            <ul class="mt-5 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <li v-for="point in member.points" :key="point" class="flex items-start gap-2">
                <Check class="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                {{ point }}
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </Section>

    <!-- Comparison -->
    <Section>
      <SectionHeading eyebrow="Difference" title="KSE 美式筋膜放鬆和一般按摩差在哪？" />
      <!-- 結論先行：給 AI 摘要直接引用 -->
      <p class="mt-5 max-w-3xl text-base leading-relaxed text-foreground">
        <strong>簡單說：</strong>一般按摩處理「當下的舒服感」，KSE 處理「動作能力」。我們先用靜態與動態評估找出受限來源，再做筋膜放鬆，最後用動作訓練把改變固定下來，並提供居家練習。
      </p>
      <div class="mt-10 overflow-x-auto border border-border bg-card">
        <table class="w-full min-w-[34rem] border-collapse text-left text-sm">
          <caption class="sr-only">KSE 美式筋膜放鬆與一般按摩的比較表</caption>
          <thead>
            <tr class="bg-navy text-white">
              <th scope="col" class="px-4 py-4 font-bold sm:px-6">比較項目</th>
              <th scope="col" class="px-4 py-4 font-bold text-gold sm:px-6">KSE 美式筋膜放鬆</th>
              <th scope="col" class="px-4 py-4 font-bold text-navy-foreground sm:px-6">一般按摩</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in COMPARISON" :key="row.topic" class="border-t border-border">
              <th scope="row" class="px-4 py-4 font-semibold sm:px-6">{{ row.topic }}</th>
              <td class="px-4 py-4 font-medium sm:px-6">
                <span class="flex items-start gap-2">
                  <Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  {{ row.kse }}
                </span>
              </td>
              <td class="px-4 py-4 text-muted-foreground sm:px-6">
                <span class="flex items-start gap-2">
                  <Minus class="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {{ row.other }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Section>

    <!-- Services -->
    <Section id="services" tone="ink">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Services" title="四項核心服務" desc="第一次來都會先評估，再依結果組合最適合的方案。" />
        <NuxtLink to="/services" class="inline-flex items-center gap-2 text-sm font-bold text-primary">
          查看服務項目 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article v-for="(service, i) in SERVICES" :key="service.slug" class="surface-card group flex flex-col overflow-hidden">
          <div class="overflow-hidden">
            <img
              :src="SERVICE_IMAGES[i]"
              :alt="SERVICE_ALTS[i]"
              width="1200"
              height="1600"
              loading="lazy"
              class="aspect-[4/3] w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div class="flex flex-1 flex-col p-6">
            <component :is="SERVICE_ICONS[i]" class="h-6 w-6 text-primary" aria-hidden="true" />
            <h3 class="mt-4 text-xl">{{ service.title }}</h3>
            <p class="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{{ service.short }}</p>
            <p class="mt-4 text-xs font-semibold text-foreground">{{ service.duration }}</p>
            <NuxtLink :to="`/services#${service.slug}`" class="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
              了解{{ service.title }} <ArrowRight class="h-4 w-4" aria-hidden="true" />
            </NuxtLink>
          </div>
        </article>
      </div>
    </Section>

    <!-- 中信兄弟合作 -->
    <section class="relative isolate overflow-hidden bg-navy text-white">
      <img
        src="~/assets/images/baseball.jpg"
        alt=""
        width="1600"
        height="912"
        loading="lazy"
        class="absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <div class="absolute inset-0 -z-10 bg-linear-to-r from-navy via-navy/90 to-navy/50" aria-hidden="true" />
      <div class="container-kse grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <span class="eyebrow text-gold">Official Partner</span>
          <h2 class="mt-5 font-display text-5xl font-extrabold italic leading-none text-white sm:text-7xl">
            KSE <span class="text-gold">×</span> 中信兄弟
          </h2>
          <p class="mt-6 max-w-lg text-base leading-relaxed text-navy-foreground">
            {{ PARTNERS[0]?.desc }}服務職業球隊的評估與恢復流程，同樣帶給台中的每一位運動員與上班族。
          </p>
          <NuxtLink
            to="/partners"
            class="mt-8 inline-flex items-center gap-2 rounded-[2px] border border-white/30 px-7 py-3.5 text-sm font-bold text-white transition-colors hover:border-gold hover:text-gold"
          >
            查看運動合作 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
        <ul class="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          <li v-for="p in PARTNERS" :key="p.name" class="border-l-2 border-gold bg-white/5 px-6 py-5 backdrop-blur-sm">
            <p class="text-xs tracking-[0.16em] text-gold">{{ p.type }}</p>
            <p class="mt-1 text-xl font-extrabold text-white">{{ p.name }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Audiences -->
    <Section>
      <SectionHeading eyebrow="Who We Train" title="適合哪些人？" desc="不論是職業運動員或每天久坐的上班族，只要身體卡卡、動作受限，都可以從一次評估開始。" />
      <ul class="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="(a, i) in AUDIENCES" :key="a.title" class="surface-card flex gap-4 p-6">
          <span class="font-display text-2xl font-extrabold text-gold">0{{ i + 1 }}</span>
          <div>
            <h3 class="text-base font-bold">{{ a.title }}</h3>
            <p class="mt-1.5 text-sm text-muted-foreground">{{ a.desc }}</p>
          </div>
        </li>
      </ul>
    </Section>

    <!-- 處理路徑 -->
    <Section tone="ink">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="How It Works" title="三種常見的處理路徑" desc="實際內容會依每個人的評估結果調整。" />
        <NuxtLink to="/cases" class="inline-flex items-center gap-2 text-sm font-bold text-primary">
          看完整流程 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article v-for="c in CASES" :key="c.slug" class="surface-card p-7">
          <span class="eyebrow">{{ c.tag }}</span>
          <h3 class="mt-4 text-lg leading-snug">{{ c.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ c.summary }}</p>
        </article>
      </div>
    </Section>

    <!-- Manifesto -->
    <Section tone="navy" class="text-center">
      <p class="font-display text-4xl font-extrabold italic leading-[1.05] tracking-[0.02em] text-white sm:text-6xl lg:text-7xl">
        MOVE BETTER.<br />
        FEEL BETTER.<br />
        <span class="text-gold">PERFORM BETTER.</span>
      </p>
    </Section>

    <!-- News -->
    <Section>
      <div class="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading eyebrow="Journal" title="運動恢復知識" />
        <NuxtLink to="/news" class="inline-flex items-center gap-2 text-sm font-bold text-primary">
          所有文章 <ArrowRight class="h-4 w-4" aria-hidden="true" />
        </NuxtLink>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        <article v-for="post in POSTS.slice(0, 3)" :key="post.slug" class="surface-card group overflow-hidden">
          <NuxtLink :to="`/news/${post.slug}`" class="block">
            <div class="overflow-hidden">
              <img
                :src="POST_IMAGES[post.image]"
                :alt="post.alt"
                width="1200"
                height="1600"
                loading="lazy"
                class="aspect-[16/10] w-full object-cover object-[50%_25%] transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div class="p-6">
              <p class="text-xs text-muted-foreground">
                <time :datetime="post.date">{{ post.date }}</time> ・ <span class="text-primary">{{ post.category }}</span>
              </p>
              <h3 class="mt-2 text-lg leading-snug transition-colors group-hover:text-primary">{{ post.title }}</h3>
              <p class="mt-2 line-clamp-3 text-sm text-muted-foreground">{{ post.excerpt }}</p>
            </div>
          </NuxtLink>
        </article>
      </div>
    </Section>

    <!-- FAQ -->
    <Section tone="ink">
      <div class="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading eyebrow="FAQ" title="常見問題" desc="第一次來之前最常被問的問題。" />
          <NuxtLink to="/faq" class="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
            查看全部 {{ FAQS.length }} 個問題 <ArrowRight class="h-4 w-4" aria-hidden="true" />
          </NuxtLink>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem v-for="f in FAQS.slice(0, 5)" :key="f.q" :value="f.q" :title="f.q">
            {{ f.a }}
          </AccordionItem>
        </Accordion>
      </div>
    </Section>

    <!-- CTA + Map -->
    <Section id="booking">
      <div class="grid gap-6 lg:grid-cols-2">
        <div class="relative isolate flex flex-col justify-between overflow-hidden bg-navy p-8 text-white sm:p-10">
          <div class="pointer-events-none absolute inset-0 -z-10 fiber-texture" aria-hidden="true" />
          <div>
            <span class="eyebrow text-gold">Book Online</span>
            <h2 class="mt-4 text-3xl font-extrabold text-white sm:text-4xl">從一次評估開始</h2>
            <p class="mt-4 text-sm leading-relaxed text-navy-foreground">
              線上查看按摩師週排班與可用時段，即時預約，也能查詢或取消預約。請至少提前半小時預約。
            </p>
            <dl class="mt-8 space-y-3 text-sm">
              <div class="flex gap-3">
                <dt class="sr-only">地址</dt>
                <MapPin class="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <dd>{{ BRAND.address }}</dd>
              </div>
              <div class="flex gap-3">
                <dt class="sr-only">營業時間</dt>
                <Clock class="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <dd>{{ BRAND.hours.label }}（預約制）</dd>
              </div>
              <div class="flex gap-3">
                <dt class="sr-only">電話</dt>
                <Phone class="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
                <dd><a :href="`tel:${BRAND.phone.replace(/-/g, '')}`" class="underline-offset-4 hover:underline">{{ BRAND.phone }}</a></dd>
              </div>
            </dl>
          </div>

        </div>

        <div class="flex flex-col overflow-hidden border border-border bg-card">
          <iframe
            title="KSE 美式筋膜放鬆教室 Google 地圖位置"
            src="https://maps.google.com/maps?q=KSE美式筋膜放鬆教室&t=&z=16&ie=UTF8&iwloc=&output=embed"
            class="min-h-[320px] w-full flex-1 border-0"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            allowfullscreen
          ></iframe>
          <div class="flex items-center justify-between gap-4 border-t border-border p-4 text-sm">
            <span class="font-medium text-foreground">{{ BRAND.address }}</span>
            <a :href="BRAND.mapUrl" target="_blank" rel="noopener noreferrer" class="shrink-0 font-bold text-primary hover:underline">
              開啟 Google 地圖
            </a>
          </div>
        </div>
      </div>
    </Section>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown, ArrowRight, Check, Minus, Waves, HeartPulse, Activity, Dumbbell, MapPin, Clock, Phone } from "lucide-vue-next"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import Accordion from "~/components/ui/Accordion.vue"
import AccordionItem from "~/components/ui/AccordionItem.vue"
import { POST_IMAGES } from "~/utils/post-images"

import stretchImg from "~/assets/images/stretch.jpg"
import massageImg from "~/assets/images/massage.jpg"
import coreImg from "~/assets/images/core.jpg"
import strengthImg from "~/assets/images/strength.jpg"
import movementImg from "~/assets/images/movement.jpg"
import releaseImg from "~/assets/images/release.jpg"
import teamKdImg from "~/assets/images/team-kd.jpg"
import teamEasonImg from "~/assets/images/team-eason.jpg"
import teamJoeyImg from "~/assets/images/team-joey.jpg"
import teamLinImg from "~/assets/images/team-lin.jpg"
import teamRexImg from "~/assets/images/team-rex.jpg"
import teamBirdyImg from "~/assets/images/team-birdy.jpg"
import heroSlide1 from "~/assets/images/hero-slide-1.jpg"
import heroSlide2 from "~/assets/images/hero-slide-2.jpg"
import heroSlide3 from "~/assets/images/hero-slide-3.jpg"
import heroSlide4 from "~/assets/images/hero-slide-4.jpg"
import heroSlide5 from "~/assets/images/hero-slide-5.jpg"
import heroSlide6 from "~/assets/images/hero-slide-6.jpg"

import { AUDIENCES, BRAND, CASES, COMPARISON, FAQS, PARTNERS, POSTS, PROCESS, SERVICES, TEAM } from "~/utils/site-data"

const TEAM_IMAGES: Record<string, string> = {
  kd: teamKdImg,
  eason: teamEasonImg,
  joey: teamJoeyImg,
  lin: teamLinImg,
  rex: teamRexImg,
  birdy: teamBirdyImg,
}

const PROCESS_IMAGES: Record<string, string> = {
  "01": movementImg,
  "02": releaseImg,
}
const PROCESS_POSITIONS: Record<string, string> = {
  "01": "object-[50%_35%]",
  "02": "object-[50%_45%]",
}
const PROCESS_ALTS: Record<string, string> = {
  "01": "KSE 放鬆師在台中南屯教室進行動態動作評估與活動度篩檢",
  "02": "KSE 放鬆師在台中南屯教室為客人進行肩頸與上背美式筋膜放鬆",
}

const SERVICE_ICONS = [Waves, HeartPulse, Activity, Dumbbell]
const SERVICE_IMAGES = [stretchImg, massageImg, coreImg, strengthImg]
const SERVICE_ALTS = [
  "KSE 放鬆師為客人進行腿後側美式筋膜放鬆",
  "KSE 放鬆師為運動員進行小腿運動按摩",
  "KSE 教練在校園體育館指導學生進行核心與伸展動作",
  "KSE 教練在育英國中指導校隊學生進行彈力帶肌力訓練",
]

// 首屏背景輪播：中信兄弟球員合影（已裁到頭頂～看板），交叉淡入淡出
const HERO_SLIDES = [
  { src: heroSlide1, width: 1053, height: 940, position: "object-[50%_15%]" },
  { src: heroSlide2, width: 955, height: 920, position: "object-[50%_15%]" },
  { src: heroSlide3, width: 1031, height: 915, position: "object-[50%_15%]" },
  { src: heroSlide4, width: 1118, height: 1100, position: "object-[50%_15%]" },
  { src: heroSlide5, width: 1401, height: 1035, position: "object-[50%_15%]" },
  { src: heroSlide6, width: 1348, height: 1185, position: "object-[50%_15%]" },
]
const HERO_INTERVAL = 6000

const activeSlide = ref(0)
let slideTimer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
  slideTimer = setInterval(() => {
    activeSlide.value = (activeSlide.value + 1) % HERO_SLIDES.length
  }, HERO_INTERVAL)
})

onBeforeUnmount(() => clearInterval(slideTimer))

const HERO_FACTS = [
  { label: "單次療程", value: "60 分鐘" },
  { label: "營業時間", value: `${BRAND.hours.opens}–${BRAND.hours.closes}` },
  { label: "評估流程", value: "4 步驟" },
  { label: "位置", value: "台中南屯" },
]

usePageSeo({
  title: "台中運動按摩・南屯美式筋膜放鬆｜KSE 美式筋膜放鬆教室",
  description:
    "台中南屯運動按摩與美式筋膜放鬆推薦：KSE 位於大墩七街202號，先做動作評估再放鬆與訓練，處理肩頸緊繃、下背痠痛、跑者與球類運動恢復。每日 11:00–22:00，線上預約。",
  path: "/",
})
</script>
