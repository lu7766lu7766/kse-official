<template>
  <div>
    <PageHero
      eyebrow="Case Studies"
      title="從評估到訓練，流程長什麼樣子"
      desc="以下皆為示範案例，用以說明 KSE 的處理流程，內容為 CMS-ready 可編輯版位，並非真實個案，也未使用任何真實人物資料。"
    />

    <Section>
      <div
        class="rounded-sm border border-dashed border-border bg-secondary/40 p-5 text-sm text-muted-foreground"
      >
        注意：本頁三則案例為示範內容（Demo Content），可於內容管理後台自由編輯或替換為經當事人同意的真實案例。
      </div>

      <div class="mt-12 space-y-8">
        <article
          v-for="c in CASES"
          :key="c.slug"
          :id="c.slug"
          class="surface-card rounded-sm p-8 lg:p-10"
        >
          <span class="eyebrow">{{ c.tag }}・示範案例</span>
          <h2 class="mt-3 text-2xl sm:text-3xl">{{ c.title }}</h2>
          <p
            class="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground"
          >
            {{ c.summary }}
          </p>
          <ol class="mt-8 grid gap-6 lg:grid-cols-3">
            <li
              v-for="(s, i) in c.steps"
              :key="s.label"
              class="rounded-sm border border-border bg-background p-6"
            >
              <span class="text-3xl font-black text-primary/30">0{{ i + 1 }}</span>
              <h3 class="mt-3 text-lg">{{ s.label }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-muted-foreground">
                {{ s.text }}
              </p>
            </li>
          </ol>
        </article>
      </div>
    </Section>

    <Section tone="ink">
      <SectionHeading
        center
        eyebrow="Your Turn"
        title="你的流程，從一次評估開始"
      />
      <div class="mt-8 flex justify-center">
        <BookingButton />
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import PageHero from "~/components/ui/PageHero.vue";
import Section from "~/components/ui/Section.vue";
import SectionHeading from "~/components/ui/SectionHeading.vue";
import BookingButton from "~/components/ui/BookingButton.vue";
import { CASES } from "~/utils/site-data";

const DESC =
  "了解 KSE 如何協助運動員、久坐族與青少年：從靜態與動態檢測評估、美式筋膜放鬆、肌肉緊繃舒緩到動作控制訓練的真實恢復流程示範。";

useHead({
  title: "台中運動放鬆與受傷恢復案例｜KSE 美式筋膜放鬆與動作處理流程",
  meta: [
    { name: "description", content: DESC },
    {
      name: "keywords",
      content:
        "台中運動放鬆,受傷恢復案例,台中筋膜放鬆,美式筋膜放鬆,運動傷害防護,動作控制訓練,久坐肌肉舒緩",
    },
    { property: "og:title", content: "台中運動放鬆與受傷恢復案例｜KSE 美式筋膜放鬆" },
    { property: "og:description", content: DESC },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://kse-release.com/cases" },
  ],
  link: [
    { rel: "canonical", href: "https://kse-release.com/cases" },
  ],
});
</script>
