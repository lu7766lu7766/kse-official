import { BRAND, FAQS, SERVICES, servicePath, SITE_URL, type TeamMember } from "~/utils/site-data"
import { isPricedService, PRICE_UPDATED, PRICING } from "~/utils/service-info"
import { img } from "~/utils/images"

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Service 實體 @id（全站共用，避免各處拼法不一致；網址 servicePath 定義在 site-data） */
export const serviceId = (slug: string) => `${SITE_URL}${servicePath(slug)}#service`

/** 團隊成員的 Person 實體 @id 與首頁團隊區錨點 */
export const personId = (slug: string) => `${SITE_URL}/#person-${slug}`
export const teamAnchor = (slug: string) => `team-${slug}`

/**
 * 只有日期（YYYY-MM-DD）的欄位補上台灣時區，讓 Google 不必用預設時區猜發布時間。
 * 時間固定 00:00，已含時間的字串原樣回傳
 */
export const isoDateTime = (date: string) => (/^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00+08:00` : date)

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`)

/** 服務區域（商家與各 Service 共用） */
const AREA_SERVED = [
  { "@type": "City", name: "台中市" },
  { "@type": "AdministrativeArea", name: "南屯區" },
  { "@type": "AdministrativeArea", name: "西屯區" },
  { "@type": "AdministrativeArea", name: "西區" },
]

const jsonLd = (data: object) => ({
  type: "application/ld+json" as any,
  innerHTML: JSON.stringify(data),
})

/** 全站唯一的商家實體（layout 注入一次），其他 schema 一律以 @id 參照，避免多份互相矛盾 */
export function buildSiteGraph(description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: BRAND.name,
        alternateName: "KSE",
        description,
        inLanguage: "zh-TW",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation"],
        "@id": ORG_ID,
        name: BRAND.name,
        alternateName: ["KSE", "Kinetic Sports Enhancement", "KSE Release Studio", "KSE 美式筋膜放鬆", "KSE 運動恢復教室"],
        description,
        slogan: BRAND.slogan,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
        image: [`${SITE_URL}/og-image.jpg`, ...["hero", "massage", "stretch"].map((name) => abs(img(name).src))],
        telephone: "+886-901-403990",
        priceRange: BRAND.priceRange,
        currenciesAccepted: "TWD",
        address: {
          "@type": "PostalAddress",
          streetAddress: BRAND.streetAddress,
          addressLocality: BRAND.addressLocality,
          addressRegion: BRAND.addressRegion,
          postalCode: BRAND.postalCode,
          addressCountry: "TW",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: BRAND.geo.latitude,
          longitude: BRAND.geo.longitude,
        },
        hasMap: BRAND.mapUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: BRAND.hours.opens,
            closes: BRAND.hours.closes,
          },
        ],
        sameAs: [BRAND.mapUrl, BRAND.fb, BRAND.ig, BRAND.threads, BRAND.line, ...BRAND.sameAsExtra],
        areaServed: AREA_SERVED,
        knowsAbout: [
          "運動按摩",
          "美式筋膜放鬆",
          "肌筋膜放鬆",
          "筋膜刀放鬆",
          "運動後放鬆",
          "肌肉放鬆",
          "運動恢復",
          "運動傷害預防",
          "動作評估",
          "核心穩定訓練",
          "肌力與體能訓練",
        ],
        keywords: "台中運動按摩, 南屯運動按摩, 台中按摩, 台中筋膜放鬆, 運動後放鬆, 運動恢復, 肩頸放鬆, 下背痠痛",
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": serviceId(s.slug), name: s.title, url: abs(servicePath(s.slug)) },
        })),
        potentialAction: {
          "@type": "ReserveAction",
          name: "線上預約",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/booking`,
            inLanguage: "zh-TW",
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
        },
      },
    ],
  }
}

/** 團隊成員的完整 Person 實體（只在顯示團隊介紹的首頁輸出） */
export function buildPerson(member: TeamMember, image?: string) {
  return {
    "@type": "Person",
    "@id": personId(member.slug),
    name: member.name,
    jobTitle: member.role,
    description: member.points.join("；"),
    url: `${SITE_URL}/#${teamAnchor(member.slug)}`,
    ...(image ? { image: abs(image) } : {}),
    knowsAbout: member.expertise,
    ...(member.credentials?.length
      ? {
          hasCredential: member.credentials.map((name) => ({
            "@type": "EducationalOccupationalCredential",
            name,
            credentialCategory: "certification",
          })),
        }
      : {}),
    worksFor: { "@id": ORG_ID },
  }
}

/** 文章等其他頁引用成員時只輸出該頁看得到的欄位，完整資料由首頁同一個 @id 的 Person 提供 */
export function personRef(member: TeamMember) {
  return {
    "@type": "Person",
    "@id": personId(member.slug),
    name: member.name,
    jobTitle: member.role,
    url: `${SITE_URL}/#${teamAnchor(member.slug)}`,
    worksFor: { "@id": ORG_ID },
  }
}

export function useGeoSchema() {
  const injectFaqSchema = (faqs: { q: string; a: string }[] = FAQS) => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      ],
    })
  }

  /** 服務列表頁：只列出各服務頁，完整 Service 內容定義在各自的服務頁 */
  const injectServicesSchema = () => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "KSE 台中南屯運動按摩與筋膜放鬆服務項目",
          itemListElement: SERVICES.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: abs(servicePath(service.slug)),
            item: {
              "@type": "Service",
              "@id": serviceId(service.slug),
              name: service.title,
              url: abs(servicePath(service.slug)),
            },
          })),
        }),
      ],
    })
  }

  /** 單一服務頁的完整 Service 實體 */
  const injectServiceSchema = (service: (typeof SERVICES)[number], image?: string) => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": serviceId(service.slug),
          name: service.title,
          alternateName: service.aliases,
          serviceType: service.title,
          description: service.definition,
          disambiguatingDescription: service.detail,
          url: abs(servicePath(service.slug)),
          ...(image ? { image: abs(image) } : {}),
          provider: { "@id": ORG_ID },
          areaServed: AREA_SERVED,
          audience: { "@type": "Audience", audienceType: service.audience },
          // 有公開價格的服務才輸出 offers（價格取自 utils/service-info.ts）
          ...(isPricedService(service.slug)
            ? {
                offers: [
                  { name: `單堂 60 分鐘（${PRICING.includes}）`, price: PRICING.single.price },
                  { name: "首次到店新客 60 分鐘", price: PRICING.firstVisit.price },
                  ...PRICING.packages.map((p) => ({ name: `${p.sessions} 堂課程方案`, price: p.total })),
                ].map((o) => ({
                  "@type": "Offer",
                  name: o.name,
                  price: o.price,
                  priceCurrency: "TWD",
                  availability: "https://schema.org/InStock",
                  url: abs("/pricing"),
                  validFrom: isoDateTime(PRICE_UPDATED),
                })),
              }
            : {}),
        }),
      ],
    })
  }

  /** 團隊成員 Person 實體（只在實際顯示團隊的頁面注入，images 以 slug 對應照片） */
  const injectTeamSchema = (team: TeamMember[], images: Record<string, string> = {}) => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@graph": team.map((member) => buildPerson(member, images[member.slug])),
        }),
      ],
    })
  }

  const injectBreadcrumbsSchema = (items: { name: string; item: string }[]) => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((it, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: it.name,
            item: abs(it.item),
          })),
        }),
      ],
    })
  }

  return {
    injectFaqSchema,
    injectServicesSchema,
    injectServiceSchema,
    injectTeamSchema,
    injectBreadcrumbsSchema,
  }
}
