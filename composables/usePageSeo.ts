import { SITE_URL } from "~/utils/site-data"

type PageSeo = {
  title: string
  description: string
  /** 以 / 開頭的路徑，用於 canonical 與 og:url */
  path: string
  /** 絕對或站內路徑的分享圖；未給則用預設 og-image */
  image?: string
  imageAlt?: string
  /** 自訂分享圖時的實際尺寸（預設 og-image 為 1200x630） */
  imageWidth?: number
  imageHeight?: number
  type?: "website" | "article"
  noindex?: boolean
}

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`)

/** 每頁唯一的 title / description / canonical / OG / Twitter，集中一處避免各頁漏欄位 */
export function usePageSeo(seo: PageSeo) {
  const url = absoluteUrl(seo.path)
  const image = absoluteUrl(seo.image ?? "/og-image.jpg")
  const imageAlt = seo.imageAlt ?? "KSE 美式筋膜放鬆教室｜台中南屯運動按摩與筋膜放鬆"

  useSeoMeta({
    title: seo.title,
    description: seo.description,
    ogTitle: seo.title,
    ogDescription: seo.description,
    ogUrl: url,
    ogType: seo.type ?? "website",
    ogImage: image,
    ogImageAlt: imageAlt,
    ogImageWidth: seo.imageWidth ?? 1200,
    ogImageHeight: seo.imageHeight ?? 630,
    twitterTitle: seo.title,
    twitterDescription: seo.description,
    twitterImage: image,
    twitterImageAlt: imageAlt,
    ...(seo.noindex ? { robots: "noindex, follow" } : {}),
  })
  useHead({ link: [{ rel: "canonical", href: url }] })
}
