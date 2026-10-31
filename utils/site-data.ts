export const SITE_URL = "https://www.kse-release.com.tw"

export const BRAND = {
  name: "KSE 美式筋膜放鬆教室",
  full: "KSE 美式筋膜放鬆教室｜Kinetic Sports Enhancement",
  slogan: "MOVE BETTER. FEEL BETTER. PERFORM BETTER.",
  url: SITE_URL,
  address: "台中市南屯區大墩七街202號",
  streetAddress: "大墩七街202號",
  addressLocality: "南屯區",
  addressRegion: "台中市",
  postalCode: "408",
  // 營業時間：每日 11:00–22:00（與 Google 商家一致，修改時請兩邊同步）
  hours: { opens: "11:00", closes: "22:00", label: "每日 11:00–22:00" },
  phone: "0901-403990",
  line: "https://lin.ee/z9MrmKK",
  fb: "https://www.facebook.com/profile.php?id=61562337030014",
  ig: "https://www.instagram.com/kse_release_studio",
  /** 只放進 schema sameAs 的其他官方頁面（IG 地點頁、FB 公開網址），頁面上的連結仍用 ig / fb */
  sameAsExtra: [
    "https://www.instagram.com/explore/locations/366327843228449/kse/",
    "https://www.facebook.com/p/Kse%E7%BE%8E%E5%BC%8F%E7%AD%8B%E8%86%9C%E6%94%BE%E9%AC%86%E6%95%99%E5%AE%A4-61562337030014/",
  ],
  area: "台中市南屯區大墩七街202號",
  geo: {
    latitude: 24.14324,
    longitude: 120.64756,
  },
  priceRange: "$$",
  mapQuery: "KSE美式筋膜放鬆教室",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=KSE%E7%BE%8E%E5%BC%8F%E7%AD%8B%E8%86%9C%E6%94%BE%E9%AC%86%E6%95%99%E5%AE%A4",
}


export const NAV = [
  { to: "/", label: "首頁" },
  { to: "/kse", label: "KSE專業" },
  { to: "/services", label: "服務項目" },
  { to: "/partners", label: "官方合作夥伴" },
  { to: "/news", label: "最新消息" },
  { to: "/faq", label: "常見問題" },
  { to: "/booking", label: "線上預約" },
] as const

/**
 * 各靜態頁的「內容」最後修改日（sitemap lastmod 用）。
 * 改到頁面文案時請同步更新；不要用 build 日期，否則 Google 會因每次部署都變動而忽略 lastmod。
 * /news 與文章頁、服務頁的日期分別取自 POSTS、SERVICES。
 */
export const PAGE_UPDATED: Record<string, string> = {
  "/": "2026-10-31",
  "/services": "2026-10-31",
  "/kse": "2026-10-16",
  "/booking": "2026-10-31",
  "/faq": "2026-10-31",
  "/partners": "2026-10-31",
}

export const PROCESS = [
  {
    no: "01",
    title: "動作評估",
    desc: "靜態姿勢排列與動態動作篩檢，找出限制活動度與代償的真正來源，而不是只處理痠痛的地方。",
  },
  {
    no: "02",
    title: "徒手筋膜放鬆",
    desc: "以美式徒手筋膜技術處理緊繃的筋膜層與軟組織，恢復組織滑動性與關節可動範圍。",
  },
  {
    no: "03",
    title: "運動衛教",
    desc: "分享與個人需求相關的身體知識、日常活動建議及簡單的自主練習方向，幫助你更了解自己的身體，建立適合自己的運動與放鬆習慣。",
  },
]

export const COMPARISON = [
  { topic: "目的", kse: "恢復動作能力與運動表現", other: "當下舒緩、放鬆感受" },
  { topic: "流程", kse: "動作評估 → 身體調整 → 運動衛教", other: "直接按壓痠痛部位" },
  { topic: "判斷依據", kse: "靜態＋動態身體評估結果", other: "客人主觀指定部位" },
  { topic: "後續", kse: "提供居家動作與訓練建議", other: "多半無後續安排" },
  { topic: "情境", kse: "運動前準備、賽後恢復、傷後回場", other: "以放鬆休閒為主" },
  { topic: "環境", kse: "運動恢復與訓練空間", other: "SPA／美容式空間" },
]

/** 服務頁網址（全站與 server route 共用） */
export const servicePath = (slug: string) => `/services/${slug}`

export const SERVICES = [
  {
    slug: "fascia",
    seoTitle: "台中南屯美式筋膜放鬆｜肩頸緊繃・下背痠痛・活動度受限｜KSE",
    seoDescription:
      "KSE 台中南屯美式筋膜放鬆：先做靜態與動態動作評估，再沿張力鏈以徒手與筋膜刀處理受限筋膜層，處理後即時複評。適合肩頸緊繃、下背痠痛、深蹲與舉手活動度不足者，單次約 60 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["difference", "iastm", "pain", "duration"],
    posts: ["fascia-basics", "core-stability-desk"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "美式筋膜放鬆",
    short: "針對受限筋膜層與軟組織的徒手與筋膜刀處理，恢復組織滑動與關節活動度。",
    points: [
      "靜態姿勢與動態動作評估後再進行處理",
      "深層筋膜、激痛點與張力鏈路徑徒手及筋膜刀放鬆",
      "搭配主動動作的筋膜鬆動（Active Release 概念）",
      "處理後即時複評，確認活動度改變",
    ],
    duration: "單次約 60 分鐘（依評估結果調整）",
    audience: "肩頸緊繃、下背不適、活動度受限者與運動族群",
    detail:
      "適合肩頸緊繃、下背痠痛、髖關節或胸椎卡卡、深蹲與舉手活動度不足的人。在台中南屯教室先做動作評估，再沿張力鏈以徒手與筋膜刀處理受限的筋膜層，處理後立即複評，讓你清楚感受到活動範圍的改變。",
  },
  {
    slug: "sports-massage",
    seoTitle: "台中運動按摩｜賽前啟動・賽後恢復・週間維護｜南屯 KSE",
    seoDescription:
      "KSE 台中南屯運動按摩：依訓練與比賽週期安排賽前啟動、賽後恢復與週間維護，針對棒球、籃球、羽球、跑步等專項高負荷部位調整處理深度，單次約 60 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["timing", "injury", "pain"],
    posts: ["recovery-after-game", "fascia-basics"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "運動按摩",
    short: "依訓練或比賽週期安排的賽前啟動、賽後恢復與週間維護。",
    points: [
      "賽前：提升組織延展性與神經肌肉啟動",
      "賽後：加速代謝廢物排除、降低延遲性痠痛",
      "週間維護：處理高負荷部位累積張力",
      "依專項（棒球、籃球、羽球、跑步）調整重點",
    ],
    duration: "單次約 60 分鐘",
    audience: "棒球、籃球、羽球、跑步等運動員與規律訓練者",
    detail:
      "適合賽前啟動、賽後恢復與訓練週期中的身體維護。針對投手肩後側與胸椎、跑者小腿與髂脛束、球類運動的髖與踝等高負荷部位，依比賽時程調整處理深度，降低延遲性痠痛與累積性傷害風險。",
  },
  {
    slug: "core",
    seoTitle: "核心穩定修復方案｜久坐族肩頸下背・呼吸與核心重建｜台中南屯 KSE",
    seoDescription:
      "KSE 核心穩定修復方案：為久坐上班族與肩頸、下背反覆不適者設計，從呼吸與肋廓位置開始重建深層核心，再整合髖與胸椎活動度，帶回日常坐姿與動作。台中南屯，單堂約 50 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["difference", "duration"],
    posts: ["core-stability-desk"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "核心穩定修復方案",
    short: "為久坐族與下背、肩頸不適者設計的呼吸、核心與動作控制重建課程。",
    points: ["呼吸模式與肋廓位置重建", "深層核心（橫膈、腹橫肌、骨盆底）啟動", "髖與胸椎活動度整合", "日常姿勢與辦公室動作策略"],
    duration: "系列課程，單堂約 50 分鐘",
    audience: "久坐上班族與下背、肩頸反覆不適者",
    detail:
      "適合長時間坐辦公室、肩頸常緊、下背容易痠、久站久坐都不舒服的人。從呼吸與肋廓位置開始，喚醒橫膈、腹橫肌與骨盆底等深層核心，再整合髖與胸椎活動度，最後帶回日常的坐姿與起身動作。",
  },
  {
    slug: "strength",
    seoTitle: "台中肌力與體能訓練｜運動員・青少年・傷後回場｜南屯 KSE",
    seoDescription:
      "KSE 台中南屯肌力與體能訓練：依評估結果設計個人化課表，涵蓋基礎肌力、爆發力、加減速與專項體能，適合運動員、青少年運動員與傷後回場者，單堂約 60 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["injury", "timing"],
    posts: ["youth-strength", "recovery-after-game"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "肌力與體能訓練",
    short: "把恢復到的活動能力轉化為力量、速度與續航的個人化訓練。",
    points: ["個人化課表設計與週期安排", "基礎肌力、爆發力與加減速訓練", "專項體能與傷後回場漸進計畫", "青少年運動員長期發展導向訓練"],
    duration: "單堂約 60 分鐘，建議每週 1–2 次",
    audience: "運動員、青少年運動員與傷後回場者",
    detail:
      "適合想提升表現、傷後準備回場，或成長期需要打好基礎的運動員。依評估結果設計個人化課表，從基礎肌力、爆發力到加減速與專項體能，循序漸進把恢復的活動度轉化為場上用得到的能力。",
  },
]

export const AUDIENCES = [
  { title: "運動員", desc: "需要穩定維持狀態、縮短恢復時間並降低受傷風險。" },
  { title: "棒球／籃球／羽球族", desc: "肩、肘、膝與踝的專項高負荷部位修復。" },
  { title: "跑者", desc: "小腿、足底、髂脛束張力與跑姿調整。" },
  { title: "健身族", desc: "活動度不足導致的動作代償與訓練卡關。" },
  { title: "久坐上班族", desc: "肩頸緊繃、下背不適與核心無力。" },
  { title: "青少年運動員", desc: "成長期的核心控制、姿勢與基礎肌力建立。" },
]

export type TeamMember = {
  slug: string
  name: string
  role: string
  tags: string[]
  points: string[]
  /** 專長領域（Person schema 的 knowsAbout） */
  expertise: string[]
  /** 正式證照（Person schema 的 hasCredential）；研習、經歷不列入 */
  credentials?: string[]
}

export const TEAM: TeamMember[] = [
  {
    slug: "kd",
    expertise: ["腰痠調整", "運動族群身體調整"],
    name: "KD",
    role: "放鬆師",
    tags: ["專長：腰痠調整", "手勁中等｜可依喜好調整"],
    points: ["專注運動族群身體調整", "放鬆後建立正確動作順序，讓你更了解自己的身體"],
  },
  {
    slug: "eason",
    expertise: ["肩頸痠痛", "動作調整", "健力舉重重量訓練"],
    name: "Eason",
    role: "放鬆師",
    tags: ["專長：肩頸痠痛｜動作調整", "手勁中等｜可依喜好調整"],
    points: ["健力舉重重量訓練專長", "專項運動身體調整", "肩頸痠痛、下背不適調整"],
  },
  {
    slug: "joey",
    expertise: ["運動按摩", "功能性訓練"],
    name: "Joey",
    role: "放鬆師",
    tags: ["運動按摩｜功能性訓練", "手勁適中｜無痛手法", "習慣力重者勿約"],
    points: ["適合怕痛的人體驗無痛卻深層的放鬆", "放鬆搭配功能性訓練讓妳的身體無憂"],
  },
  {
    slug: "lin",
    expertise: ["運動按摩", "運動恢復指導"],
    name: "Lin",
    role: "放鬆師",
    tags: ["專長：運動按摩、恢復指導", "手勁中等｜可依喜好調整"],
    points: ["專注於職業運動員的放鬆恢復", "開刀房護理師"],
  },
  {
    slug: "rex",
    expertise: ["肩頸痠痛調整", "運動族群身體調整"],
    name: "Rex",
    role: "放鬆師",
    tags: ["專長：肩頸痠痛調整", "手勁中等｜可依喜好調整"],
    points: ["專注運動族群身體調整", "一般族群累積的日常疲勞也能得到舒緩"],
  },
  {
    slug: "birdy",
    expertise: ["肌力與體能訓練", "青少年運動員體能訓練", "矯正訓練"],
    name: "Birdy",
    role: "體能訓練師",
    tags: ["專長：肌力與體能訓練", "臺灣運動體育大學 競技運動學系碩士班"],
    points: [
      "NSCA CSCS 肌力與體能訓練",
      "AFAA-PFT 個人體適能顧問認證",
      "ASNP 應用運動營養研習",
      "KBC 壺鈴 Lv.1 & Lv.2",
      "Flexible Steel Lv.1 & Lv.2 剛硬靈活訓練認證",
      "NASM CES 矯正訓練專家證照研習",
      "SPS 運動員肌力訓練專家（2022.10）",
      "SPS Level 1 運動表現專家（2023.02）",
      "速度與協調訓練專家研習",
      "台體女排、育英國中女籃、大智國小女籃體能訓練師",
    ],
    credentials: [
      "NSCA CSCS 肌力與體能訓練",
      "AFAA-PFT 個人體適能顧問認證",
      "KBC 壺鈴 Lv.1 & Lv.2",
      "Flexible Steel Lv.1 & Lv.2 剛硬靈活訓練認證",
      "SPS 運動員肌力訓練專家",
      "SPS Level 1 運動表現專家",
    ],
  },
]

export const PARTNERS = [
  {
    name: "中信兄弟",
    type: "職業棒球",
    desc: "KSE 為中信兄弟合作的運動恢復團隊，以動作評估、美式筋膜放鬆與運動按摩，支援球員的賽後恢復與日常身體維護。",
  },
  {
    name: "大智國小",
    type: "校園運動",
    desc: "校園運動團隊的基礎動作評估、伸展放鬆與動作控制練習，從小建立正確的身體使用習慣。",
  },
  {
    name: "育英國中",
    type: "校園運動",
    desc: "校隊成長期的動作品質檢查與基礎肌力課程，配合學校訓練週期降低運動傷害風險。",
  },
]

export const CATEGORIES = ["KSE活動", "合作消息", "運動恢復", "筋膜放鬆", "動作訓練", "肌力與體能"] as const

export type PostBlock = string | { h2: string }

export type Post = {
  slug: string
  title: string
  date: string
  updated?: string
  category: (typeof CATEGORIES)[number]
  excerpt: string
  /** 文章開頭的重點摘要（約 60–90 字），讓搜尋引擎與 AI 直接引用 */
  summary: string
  image: "hero" | "baseball" | "assess" | "core" | "strength" | "massage" | "stretch"
  alt: string
  /** 作者（TEAM 的 slug）；有填才會顯示署名並輸出 Person 作者，未填則以商家為作者 */
  author?: string
  body: PostBlock[]
}

export const POSTS: Post[] = [
  {
    slug: "recovery-after-game",
    title: "賽後 48 小時怎麼恢復？運動按摩與筋膜放鬆的時間安排",
    date: "2026-06-30",
    updated: "2026-10-31",
    category: "運動恢復",
    author: "lin",
    excerpt: "比賽或高強度訓練後，運動按摩與筋膜放鬆該在什麼時候做、做多重？依 0–24 與 24–48 小時拆解賽後恢復重點。",
    summary:
      "賽後 24 小時內以輕度運動按摩降低疲勞為主，避免深壓；24–48 小時可安排較完整的筋膜放鬆與活動度處理，並在下次訓練前完成動作複評。",
    image: "massage",
    alt: "KSE 放鬆師在台中南屯教室為運動員進行小腿與腿後側運動按摩",
    body: [
      { h2: "為什麼賽後恢復要分時段？" },
      "高強度比賽後，肌肉會出現微小損傷與發炎反應，神經系統也處於疲勞狀態。這時候「按得越重越好」反而可能增加不適，所以 KSE 會依賽後經過的時間調整處理方式與強度。",
      { h2: "賽後 0–24 小時：降低疲勞、不追求深壓" },
      "以輕度運動按摩、低強度活動與呼吸放鬆為主，目的是讓身體從比賽的高張力狀態降下來。這個階段不建議做強力的深層筋膜處理。",
      { h2: "賽後 24–48 小時：處理累積張力與活動度" },
      "延遲性痠痛通常在這個時段最明顯。可以安排較完整的美式筋膜放鬆，處理高負荷部位（例如投手的肩後側與胸椎、跑者的小腿與髂脛束）累積的張力，並搭配主動動作恢復關節活動度。",
      { h2: "回到訓練前：用動作複評確認狀態" },
      "恢復的重點不是當下舒不舒服，而是下一次訓練前能不能正確發力。KSE 會在處理後重測原本受限的動作，確認改變確實發生，再給出居家延續練習。",
      "若有明顯紅腫熱痛、無法承重或疑似拉傷，請先就醫評估，狀況穩定後再安排放鬆與恢復處理。",
    ],
  },
  {
    slug: "fascia-basics",
    title: "什麼是美式筋膜放鬆？肌肉緊繃與動作受限的處理原理",
    date: "2026-06-12",
    updated: "2026-10-31",
    category: "筋膜放鬆",
    author: "kd",
    excerpt: "美式筋膜放鬆和一般按摩差在哪？從筋膜滑動性、張力鏈與代償模式，說明 KSE 為什麼先評估、再放鬆、最後用動作整合。",
    summary:
      "美式筋膜放鬆是以評估結果為依據，用徒手技術恢復筋膜層之間的滑動性，並搭配主動動作讓關節走完應有的活動範圍；重點在改善動作能力，而不只是當下的放鬆感。",
    image: "stretch",
    alt: "KSE 放鬆師在台中南屯教室為客人進行腿後側筋膜放鬆與伸展",
    body: [
      { h2: "筋膜是什麼？" },
      "筋膜是包覆並連結全身肌肉、骨骼與器官的結締組織網絡。當某一段筋膜的滑動性下降，鄰近關節就會出現活動度不足，身體便以其他部位代償，久而久之形成肌肉緊繃、痠痛或反覆的小傷。",
      { h2: "美式筋膜放鬆和一般按摩差在哪？" },
      "一般按摩多以客人指定的痠痛部位與主觀舒適感為主；美式筋膜放鬆則先做靜態與動態評估，找出真正受限的位置，再沿著張力鏈處理，並搭配主動動作（Active Release 概念）讓神經系統同步接受新的活動範圍。",
      { h2: "KSE 的處理順序" },
      "動作評估 → 徒手筋膜放鬆 → 運動衛教。先找出受限來源，再處理筋膜與軟組織，最後分享日常活動建議與自主練習方向，把新的活動度「存」進身體，變成實際可用的能力。",
      { h2: "筋膜放鬆會很痛嗎？" },
      "不會以「痛」作為效果指標。處理強度會依評估結果、當天狀態與訓練週期調整，過程中可隨時溝通。",
    ],
  },
  {
    slug: "core-stability-desk",
    title: "久坐族肩頸緊繃、下背不適？核心穩定從呼吸開始",
    date: "2026-05-26",
    updated: "2026-10-31",
    category: "動作訓練",
    author: "eason",
    excerpt: "久坐上班族的肩頸與下背問題，常與呼吸模式和深層核心無力有關。說明為什麼核心穩定訓練要從呼吸重建開始。",
    summary:
      "久坐容易讓呼吸變淺、肋廓外開，深層核心難以參與，導致肩頸與下背代償。先處理肩頸與髖部的筋膜受限，再重建呼吸與深層核心，是久坐族最有效率的起點。",
    image: "hero",
    alt: "KSE 放鬆師為久坐上班族處理背部筋膜張力",
    body: [
      { h2: "為什麼久坐會肩頸緊、下背痠？" },
      "長時間坐姿讓髖屈肌群縮短、胸椎活動度下降，呼吸也容易變成以肩頸用力的淺呼吸。深層核心（橫膈、腹橫肌、骨盆底）參與變少，下背與頸肩就被迫長時間撐住身體。",
      { h2: "第一步：放鬆受限部位" },
      "先以筋膜放鬆處理頸肩、胸小肌與髖屈肌群的受限，讓肋廓與骨盆回到比較好的相對位置。",
      { h2: "第二步：呼吸與深層核心重建" },
      "從仰躺呼吸練習開始，讓肋廓能往下、往側邊擴張，再進入死蟲式、鳥狗式等控制練習，學會在呼吸時維持軀幹穩定。",
      { h2: "第三步：帶回日常" },
      "最後把練習整合到辦公室日常：坐姿調整、起身與搬物的動作策略，以及工作間的 3 分鐘活動度練習。KSE 的「核心穩定修復方案」即依此流程設計。",
    ],
  },
  {
    slug: "youth-strength",
    title: "青少年運動員可以做肌力訓練嗎？成長期的訓練原則",
    date: "2026-05-08",
    updated: "2026-10-31",
    category: "肌力與體能",
    author: "birdy",
    excerpt: "青少年運動員可以做肌力訓練，但要先建立動作品質與落地控制，再漸進加入負荷，並與學校球隊的訓練週期整合。",
    summary:
      "可以。青少年肌力訓練應以動作品質與長期發展為優先：先建立深蹲、單腳、推拉與落地控制等基本動作，再從自身體重漸進到外部負荷，並與球隊訓練量整合以避免過度負荷。",
    image: "strength",
    alt: "KSE 教練在育英國中體育館指導校隊學生進行彈力帶下肢訓練",
    body: [
      { h2: "成長期做肌力訓練會不會長不高？" },
      "在專業指導、動作正確且負荷漸進的前提下，肌力訓練是青少年運動員降低受傷風險、提升運動表現的重要基礎。真正需要注意的是動作品質與總訓練量，而不是「能不能練」。",
      { h2: "先練動作，再練重量" },
      "基本動作篩檢包含深蹲、弓箭步、推拉、單腳站立與落地緩衝。動作控制穩定後，才從自身體重進入彈力帶、啞鈴等外部負荷。",
      { h2: "和學校球隊訓練怎麼整合？" },
      "學生運動員往往同時有校隊練習與比賽，額外的肌力訓練需要配合賽季週期安排，避免累積過度負荷。KSE 與大智國小、育英國中等校園運動團隊合作時，也以此原則規劃課程。",
    ],
  },
]

export const FAQS = [
  {
    id: "duration",
    q: "一次體驗時間大約多久？",
    a: "體驗時間為 60 分鐘，內容包含身體狀況詢問、動作評估，以及安排適當的徒手與運動按摩並且解釋狀況、給予回家的運動衛教和安排下次身體保養追蹤時間。而身體保養時間與頻率則會因不同客戶各自狀況差異而有所不同，將由按摩師於初次體驗結束時與您討論。",
  },
  {
    id: "access",
    q: "交通與停車方便嗎？",
    a: "KSE 位於台中市南屯區大墩七街202號，鄰近捷運文心森林公園站與 IKEA 台中店，位於南屯、西區與西屯七期、公益路商圈交界處，周邊設有路邊收費停車格與多處收費停車場，開車、騎車或搭捷運前來都很方便。",
  },
  {
    id: "difference",
    q: "美式筋膜放鬆和一般按摩有什麼差異？",
    a: "一般按摩可以帶來舒適與放鬆，而美式筋膜放鬆會從了解你的日常習慣、運動方式，到觀察身體的活動情況，依照當下需求安排適合的徒手放鬆方式，並透過操作前後的活動觀察，了解身體感受的變化。",
  },
  {
    id: "iastm",
    q: "什麼情況會搭配筋膜刀放鬆？會痛或出痧嗎？",
    a: "筋膜刀（器械輔助軟組織鬆動）常用於處理表層至中層筋膜的滑動受限與局部張力集中處。放鬆師會依動作評估結果決定以徒手為主或搭配筋膜刀輔助，力道溫和可控，不追求刮痧式的疼痛或大片瘀紅，重點在於恢復組織滑動性與關節活動度。",
  },
  {
    id: "pain",
    q: "筋膜放鬆會很痛嗎？",
    a: "不會以「痛」作為效果指標。處理強度會依你的評估結果、當天狀態與訓練週期調整，過程中可以隨時溝通調整力道。",
  },
  {
    id: "injury",
    q: "受傷或肌肉拉傷後多久可以做運動按摩？",
    a: "急性受傷或有紅腫熱痛時，請先就醫評估。狀況穩定後，可透過美式筋膜放鬆與運動按摩處理受傷周邊的代償性緊繃，幫助恢復組織彈性與關節活動度。",
  },
  {
    id: "timing",
    q: "運動前和運動後都適合做嗎？",
    a: "都適合，但處理方式不同。運動前以啟動與提升組織延展性為主、強度較輕；運動後著重降低疲勞與加速恢復，可安排較完整的處理。",
  },
]

export const CONTACT_CHANNELS = [
  { label: "電話", value: "0901-403990", href: "tel:0901403990" },
  {
    label: "地址",
    value: "台中市南屯區大墩七街202號",
    href: "https://www.google.com/maps/search/?api=1&query=KSE%E7%BE%8E%E5%BC%8F%E7%AD%8B%E8%86%9C%E6%94%BE%E9%AC%86%E6%95%99%E5%AE%A4",
  },
  { label: "LINE", value: "LINE 官方帳號", href: "https://lin.ee/z9MrmKK" },
  { label: "Instagram", value: "@kse_release_studio", href: "https://www.instagram.com/kse_release_studio" },
  { label: "Facebook", value: "KSE 美式筋膜放鬆教室", href: "https://www.facebook.com/profile.php?id=61562337030014" },
]
