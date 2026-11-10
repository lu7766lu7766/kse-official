import { img, type Img } from "./images"

/** 服務列表頁與各服務頁共用的照片、alt 與裁切位置（以 SERVICES 的 slug 對應） */
export const SERVICE_IMAGES: Record<string, Img> = {
  fascia: img("stretch"),
  "sports-massage": img("sports-massage"),
  core: img("core"),
  strength: img("strength"),
}

export const SERVICE_ALTS: Record<string, string> = {
  fascia: "KSE 放鬆師在台中南屯教室為客人進行腿後側美式筋膜放鬆",
  "sports-massage": "KSE 放鬆師在台中南屯教室為客人進行臀腿下肢運動按摩",
  core: "KSE 教練在校園體育館指導學生進行核心穩定與伸展動作",
  strength: "KSE 教練在育英國中指導校隊學生進行彈力帶下肢肌力訓練",
}

export const SERVICE_POSITIONS: Record<string, string> = {
  fascia: "object-[50%_25%]",
  "sports-massage": "object-center",
  core: "object-[50%_25%]",
  strength: "object-[50%_25%]",
}
