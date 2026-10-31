<template>
  <div v-if="service">
    <PageHero
      eyebrow="Services"
      :title="`台中南屯${service.title}`"
      :desc="service.short"
      :crumbs="[{ label: '服務項目', to: '/services' }, { label: service.title }]"
    />

    <!-- 適合誰＋服務內容：答案先行，給搜尋摘要與 AI 引用 -->
    <Section>
      <div class="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        <div class="relative">
          <div class="absolute -left-3 -top-3 h-full w-full border border-gold/50" aria-hidden="true" />
          <img
            :src="SERVICE_IMAGES[service.slug]"
            :alt="SERVICE_ALTS[service.slug]"
            width="1200"
            height="1600"
            fetchpriority="high"
            :class="cn('relative aspect-[4/3] w-full object-cover', SERVICE_POSITIONS[service.slug] || 'object-[50%_25%]')"
          />
        </div>
        <div>
          <h2 class="text-3xl sm:text-4xl">{{ service.title }}適合誰？</h2>
          <p class="mt-5 text-base leading-relaxed text-foreground/85">{{ service.detail }}</p>

          <h3 class="mt-10 text-xl">服務內容</h3>
          <ul class="mt-4 space-y-3 text-sm text-foreground">
            <li v-for="p in service.points" :key="p" class="flex gap-3">
              <Check class="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              {{ p }}
            </li>
          </ul>

          <dl class="mt-10 grid gap-5 border-t border-border pt-6 text-sm sm:grid-cols-2">
            <div v-for="fact in facts" :key="fact.label">
              <dt class="text-xs font-bold tracking-[0.14em] text-muted-foreground">{{ fact.label }}</dt>
              <dd class="mt-1 font-semibold">{{ fact.value }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Section>

    <Section tone="ink">
      <SectionHeading
        eyebrow="Process"
        :title="`${service.title}的進行方式`"
        desc="每一次都依照相同的三道流程：先找出受限來源，再處理，最後把改變帶回日常。"
      />
      <ol class="mt-12 grid gap-6 md:grid-cols-3">
        <li v-for="step in PROCESS" :key="step.no" class="surface-card flex flex-col p-7">
          <span class="font-display text-5xl font-extrabold italic leading-none text-gold">{{ step.no }}</span>
          <h3 class="mt-5 text-xl">{{ step.title }}</h3>
          <p class="mt-3 text-sm leading-relaxed text-muted-foreground">{{ step.desc }}</p>
        </li>
      </ol>
    </Section>

    <!-- 相關問答直接展開（不收合），讓爬蟲與 AI 讀得到完整答案；FAQPage schema 只放在 /faq，避免重複 -->
    <Section v-if="faqs.length">
      <SectionHeading eyebrow="FAQ" :title="`${service.title}常見問題`" />
      <dl class="mt-10 max-w-3xl divide-y divide-border border-y border-border">
        <div v-for="f in faqs" :key="f.id" class="py-6">
          <dt class="text-lg font-bold text-foreground">{{ f.q }}</dt>
          <dd class="mt-3 text-base leading-relaxed text-muted-foreground">{{ f.a }}</dd>
        </div>
      </dl>
      <NuxtLink to="/faq" class="mt-8 inline-flex items-center gap-2 text-sm font-bold text-primary">
        看全部常見問題 <ArrowRight class="h-4 w-4" aria-hidden="true" />
      </NuxtLink>
    </Section>

    <Section v-if="posts.length" tone="ink">
      <h2 class="text-2xl">延伸閱讀</h2>
      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <article v-for="p in posts" :key="p.slug" class="surface-card p-6">
          <NuxtLink :to="`/news/${p.slug}`" class="group block">
            <p class="text-xs text-muted-foreground">
              <time :datetime="p.date">{{ p.date }}</time> ・ <span class="text-primary">{{ p.category }}</span>
            </p>
            <h3 class="mt-2 text-lg leading-snug transition-colors group-hover:text-primary">{{ p.title }}</h3>
            <p class="mt-2 line-clamp-2 text-sm text-muted-foreground">{{ p.excerpt }}</p>
          </NuxtLink>
        </article>
      </div>
    </Section>

    <Section>
      <h2 class="text-2xl">其他服務項目</h2>
      <ul class="mt-8 grid gap-4 sm:grid-cols-3">
        <li v-for="s in otherServices" :key="s.slug">
          <NuxtLink :to="servicePath(s.slug)" class="surface-card group block h-full p-6">
            <h3 class="text-lg transition-colors group-hover:text-primary">{{ s.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-muted-foreground">{{ s.short }}</p>
          </NuxtLink>
        </li>
      </ul>
    </Section>

    <Section tone="navy">
      <SectionHeading
        dark
        center
        eyebrow="Booking"
        title="從一次評估開始"
        :desc="`${BRAND.address}・${BRAND.hours.label}，採預約制，可線上即時查看空檔。`"
      />
      <div class="mt-10 flex justify-center">
        <BookingButton>線上預約</BookingButton>
      </div>
    </Section>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight, Check } from "lucide-vue-next"
import BookingButton from "~/components/ui/BookingButton.vue"
import PageHero from "~/components/ui/PageHero.vue"
import Section from "~/components/ui/Section.vue"
import SectionHeading from "~/components/ui/SectionHeading.vue"
import { cn } from "~/utils/cn"
import { SERVICE_ALTS, SERVICE_IMAGES, SERVICE_POSITIONS } from "~/utils/service-images"
import { BRAND, FAQS, POSTS, PROCESS, SERVICES, servicePath } from "~/utils/site-data"

const route = useRoute()
const service = SERVICES.find((s) => s.slug === route.params.slug)

// 不存在的服務回傳真正的 404，而不是 200 的空頁
if (!service) {
  throw createError({ statusCode: 404, statusMessage: "找不到這項服務", fatal: true })
}

const s = service!
const path = servicePath(s.slug)

const facts = [
  { label: "時間", value: s.duration },
  { label: "適合", value: s.audience },
  { label: "地點", value: BRAND.address },
  { label: "營業時間", value: `${BRAND.hours.label}（採預約制）` },
]

const faqs = s.faqs.map((id) => FAQS.find((f) => f.id === id)).filter((f) => !!f)
const posts = s.posts.map((slug) => POSTS.find((p) => p.slug === slug)).filter((p) => !!p)
const otherServices = SERVICES.filter((x) => x.slug !== s.slug)

const { injectServiceSchema, injectBreadcrumbsSchema } = useGeoSchema()
injectServiceSchema(s, SERVICE_IMAGES[s.slug])
injectBreadcrumbsSchema([
  { name: "首頁", item: "/" },
  { name: "服務項目", item: "/services" },
  { name: s.title, item: path },
])

usePageSeo({
  title: s.seoTitle,
  description: s.seoDescription,
  path,
  image: SERVICE_IMAGES[s.slug],
  imageAlt: SERVICE_ALTS[s.slug],
  imageWidth: 1200,
  imageHeight: 1600,
})
</script>
