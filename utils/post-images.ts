import { buildImageMap, img, type Img } from "./images"

/** 文章圖片：內建 6 張 + assets/images/news/*.jpg（以檔名為 key，例如 "soreness-cycle-1"） */
export const POST_IMAGES: Record<string, Img> = {
  baseball: img("baseball"),
  core: img("core"),
  hero: img("hero"),
  massage: img("massage"),
  strength: img("strength"),
  stretch: img("stretch"),
  ...buildImageMap(
    import.meta.glob<string>("../assets/images/news/*.jpg", { eager: true, import: "default" }),
    import.meta.glob("../assets/images/news/*.jpg", { eager: true, import: "default", query: "?responsive" }),
  ),
}

/** 依 key 取得文章圖片；找不到時 build 會報錯，避免文章封面空白 */
export function postImage(key: string): Img {
  const found = POST_IMAGES[key]
  if (!found) throw new Error(`找不到文章圖片 ${key}（utils/post-images.ts）`)
  return found
}
