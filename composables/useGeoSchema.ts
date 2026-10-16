import { BRAND, FAQS, SERVICES, SITE_URL } from "~/utils/site-data"
import heroImg from "~/assets/images/hero.jpg"
import massageImg from "~/assets/images/massage.jpg"
import stretchImg from "~/assets/images/stretch.jpg"

export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

const abs = (p: string) => (p.startsWith("http") ? p : `${SITE_URL}${p}`)

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
        alternateName: ["KSE", "Kinetic Sports Enhancement", "KSE 美式筋膜放鬆", "KSE 運動恢復教室"],
        description,
        slogan: BRAND.slogan,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png`, width: 512, height: 512 },
        image: [`${SITE_URL}/og-image.jpg`, abs(heroImg), abs(massageImg), abs(stretchImg)],
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
        sameAs: [BRAND.fb, BRAND.ig, BRAND.line],
        areaServed: [
          { "@type": "City", name: "台中市" },
          { "@type": "AdministrativeArea", name: "南屯區" },
          { "@type": "AdministrativeArea", name: "西屯區" },
          { "@type": "AdministrativeArea", name: "西區" },
        ],
        knowsAbout: [
          "美式筋膜放鬆",
          "運動按摩",
          "肌筋膜放鬆",
          "運動恢復",
          "運動傷害預防",
          "動作評估",
          "核心穩定訓練",
          "肌力與體能訓練",
        ],
        makesOffer: SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", "@id": `${SITE_URL}/services#${s.slug}`, name: s.title },
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

  const injectServicesSchema = () => {
    useHead({
      script: [
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "KSE 美式筋膜放鬆與運動按摩服務項目",
          itemListElement: SERVICES.map((service, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "Service",
              "@id": `${SITE_URL}/services#${service.slug}`,
              name: service.title,
              serviceType: service.title,
              description: `${service.short}${service.detail}`,
              url: `${SITE_URL}/services#${service.slug}`,
              provider: { "@id": ORG_ID },
              areaServed: { "@type": "City", name: "台中市" },
              audience: { "@type": "Audience", audienceType: service.audience },
            },
          })),
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
    injectBreadcrumbsSchema,
  }
}
