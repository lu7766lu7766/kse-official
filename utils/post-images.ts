import baseball from "~/assets/images/baseball.jpg";
import core from "~/assets/images/core.jpg";
import hero from "~/assets/images/hero.jpg";
import massage from "~/assets/images/massage.jpg";
import strength from "~/assets/images/strength.jpg";
import stretch from "~/assets/images/stretch.jpg";
import newsSizes from "./news-image-sizes.json";

/** 文章圖片：內建 6 張 + assets/images/news/*.jpg（以檔名為 key，例如 "soreness-cycle-1"） */
export const POST_IMAGES: Record<string, string> = {
  baseball,
  core,
  hero,
  massage,
  strength,
  stretch,
};

const NEWS_IMAGES = import.meta.glob<string>("../assets/images/news/*.jpg", { eager: true, import: "default" });
for (const [path, url] of Object.entries(NEWS_IMAGES)) {
  POST_IMAGES[path.split("/").pop()!.replace(/\.jpg$/, "")] = url;
}

const SIZES: Record<string, number[]> = newsSizes;

/** 圖片實際寬高（給 width/height 屬性與 og:image 尺寸）；內建圖皆為 1200×1600 */
export const postImageSize = (key: string): [number, number] => {
  const s = SIZES[key];
  return s ? [s[0]!, s[1]!] : [1200, 1600];
};
