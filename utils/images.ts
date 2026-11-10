/**
 * 站內照片清單：每張圖都有原檔（JPEG／PNG，作為舊瀏覽器備援、og:image 與 schema 用）
 * 與 build 時產生的多寬度 WebP（`?responsive`，見 nuxt.config.ts），搭配 components/ui/ResponsiveImage.vue 使用。
 * 寬高取自實際檔案，不用手寫 width / height。
 */
export type Img = {
  /** 原檔網址（JPEG／PNG）：備援、og:image、schema image */
  src: string
  /** WebP srcset（含寬度描述） */
  srcset: string
  width: number
  height: number
}

type Responsive = { src: string; w: number; h: number; srcset?: string }

export const toImg = (src: string, r: Responsive): Img => ({
  src,
  srcset: r.srcset ?? `${r.src} ${r.w}w`,
  width: r.w,
  height: r.h,
})

const fileKey = (path: string) => path.split("/").pop()!.replace(/\.(jpe?g|png)$/, "")

/** 把兩個 import.meta.glob（原檔、?responsive）依檔名合併成 Img 對照表 */
export const buildImageMap = (originals: Record<string, string>, responsive: Record<string, Responsive>) => {
  const map: Record<string, Img> = {}
  for (const [path, src] of Object.entries(originals)) {
    const r = responsive[path]
    if (r) map[fileKey(path)] = toImg(src, r)
  }
  return map
}

const IMAGES = buildImageMap(
  import.meta.glob<string>("../assets/images/*.{jpg,png}", { eager: true, import: "default" }),
  import.meta.glob<Responsive>("../assets/images/*.{jpg,png}", { eager: true, import: "default", query: "?responsive" }),
)

/** 依檔名（不含副檔名）取得 assets/images/ 的圖片，例如 img("hero-slide-1")；打錯字 build 時就會報錯 */
export function img(name: string): Img {
  const found = IMAGES[name]
  if (!found) throw new Error(`找不到圖片 assets/images/${name}.jpg|png`)
  return found
}
