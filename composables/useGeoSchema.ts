import { BRAND, FAQS, SERVICES, SITE_URL } from "~/utils/site-data";

export function useGeoSchema() {
  const injectLocalBusinessSchema = () => {
    useHead({
      script: [
        {
          type: "application/ld+json" as any,
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["HealthAndBeautyBusiness", "SportsActivityLocation", "LocalBusiness"],
            "@id": `${SITE_URL}/#organization`,
            name: BRAND.name,
            alternateName: [
              "KSE 美式筋膜放鬆",
              "KSE筋膜放鬆教室",
              "台中KSE",
              "KSE 運動恢復教室",
              "台中南屯筋膜放鬆",
              "台中運動按摩",
            ],
            description:
              "台中市南屯區大墩七街專業美式筋膜放鬆與運動按摩教室。提供靜態與動態動作評估、肌肉緊繃舒緩、受傷防護放鬆、核心穩定修復與肌力體能訓練。採全線上預約制。",
            url: SITE_URL,
            logo: `${SITE_URL}/favicon.png`,
            image: `${SITE_URL}/favicon.png`,
            telephone: BRAND.phone,
            priceRange: BRAND.priceRange,
            address: {
              "@type": "PostalAddress",
              streetAddress: "大墩七街202號",
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
            openingHoursSpecification: [
              {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                  "Sunday",
                ],
                opens: "10:00",
                closes: "21:00",
              },
            ],
            sameAs: [BRAND.line, BRAND.ig, BRAND.fb, BRAND.mapUrl],
            potentialAction: {
              "@type": "ReserveAction",
              name: "線上預約時段",
              target: {
                "@type": "EntryPoint",
                urlTemplate: `${SITE_URL}/booking`,
                inLanguage: "zh-TW",
                actionPlatform: [
                  "http://schema.org/DesktopWebPlatform",
                  "http://schema.org/MobileWebPlatform",
                  "http://schema.org/IOSPlatform",
                  "http://schema.org/AndroidPlatform",
                ],
              },
              result: {
                "@type": "Reservation",
                name: "筋膜放鬆 / 運動按摩 預約紀錄",
              },
            },
            areaServed: [
              { "@type": "City", name: "台中市" },
              { "@type": "AdministrativeArea", name: "南屯區" },
              { "@type": "AdministrativeArea", name: "西區" },
              { "@type": "AdministrativeArea", name: "西屯區" },
            ],
            knowsAbout: [
              "台中按摩",
              "南屯按摩放鬆",
              "台中筋膜放鬆",
              "美式筋膜放鬆",
              "運動按摩",
              "運動傷害防護",
              "身體動作評估",
              "核心穩定修復",
              "肌力與體能訓練",
            ],
          }),
        },
      ],
    });
  };

  const injectFaqSchema = () => {
    useHead({
      script: [
        {
          type: "application/ld+json" as any,
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        },
      ],
    });
  };

  const injectServicesSchema = () => {
    useHead({
      script: [
        {
          type: "application/ld+json" as any,
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "KSE 美式筋膜放鬆與運動按摩服務項目",
            itemListElement: SERVICES.map((service, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                name: service.title,
                description: service.short,
                provider: {
                  "@type": "HealthAndBeautyBusiness",
                  name: BRAND.name,
                  url: SITE_URL,
                },
                areaServed: "台中市南屯區",
                offers: {
                  "@type": "Offer",
                  url: `${SITE_URL}/booking`,
                  availability: "https://schema.org/InStock",
                  priceSpecification: {
                    "@type": "PriceSpecification",
                    description: service.duration,
                  },
                },
              },
            })),
          }),
        },
      ],
    });
  };

  const injectBreadcrumbsSchema = (items: { name: string; item: string }[]) => {
    useHead({
      script: [
        {
          type: "application/ld+json" as any,
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: items.map((it, idx) => ({
              "@type": "ListItem",
              position: idx + 1,
              name: it.name,
              item: it.item.startsWith("http") ? it.item : `${SITE_URL}${it.item}`,
            })),
          }),
        },
      ],
    });
  };

  return {
    injectLocalBusinessSchema,
    injectFaqSchema,
    injectServicesSchema,
    injectBreadcrumbsSchema,
  };
}
