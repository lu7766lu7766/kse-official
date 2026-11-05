import { IG_POSTS } from "./posts-ig"

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
  threads: "https://www.threads.com/@kse_release_studio",
  /** 只放進 schema sameAs 的其他官方頁面（IG 地點頁、FB 公開網址），頁面上的連結仍用 ig / fb */
  sameAsExtra: [
    "https://www.instagram.com/explore/locations/366327843228449/kse/",
    "https://www.facebook.com/p/Kse%E7%BE%8E%E5%BC%8F%E7%AD%8B%E8%86%9C%E6%94%BE%E9%AC%86%E6%95%99%E5%AE%A4-61562337030014/",
  ],
  area: "台中市南屯區大墩七街202號",
  // 座標與 Google 商家地圖釘一致（修改時兩邊同步）
  geo: {
    latitude: 24.1438506,
    longitude: 120.6494393,
  },
  priceRange: "$$",
  mapQuery: "KSE美式筋膜放鬆教室",
  // Google 商家 CID（Maps 網址 data 參數 0x…:0x4ef13ec513d116f 的第二段轉十進位）
  gbpCid: "355524801281724783",
  mapUrl: "https://maps.google.com/?cid=355524801281724783",
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
  "/": "2026-11-05",
  "/services": "2026-10-31",
  "/kse": "2026-10-16",
  "/booking": "2026-10-31",
  "/faq": "2026-11-05",
  "/partners": "2026-11-05",
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

/**
 * 服務欄位補充（SEO / GEO）：
 * - definition：一句話講完「這是什麼、做什麼、在哪裡」，服務頁首段與 llms.txt 共用，讓 AI 可整句引用
 * - aliases：客人實際會搜尋的同義說法，輸出為 Service schema 的 alternateName（只放真的指同一服務的詞）
 * - scenarios：「什麼時候適合做」的情境清單（選填），服務頁以定義清單呈現
 */
export const SERVICES = [
  {
    slug: "fascia",
    seoTitle: "台中南屯美式筋膜放鬆｜肩頸緊繃・下背痠痛・活動度受限｜KSE",
    seoDescription:
      "KSE 台中南屯美式筋膜放鬆：先做靜態與動態動作評估，再沿張力鏈以徒手與筋膜刀處理受限筋膜層，處理後即時複評。適合肩頸緊繃、下背痠痛、深蹲與舉手活動度不足者，單次約 60 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["difference", "massage-vs-fascia", "relax", "iastm", "pain", "after", "duration"],
    posts: ["muscle-vs-fascia", "kinetic-chain-fascia-tension", "soreness-series-faq"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-11-04",
    title: "美式筋膜放鬆",
    aliases: ["筋膜放鬆", "肌筋膜放鬆", "筋膜刀放鬆", "徒手筋膜放鬆"],
    definition:
      "美式筋膜放鬆是先做靜態與動態動作評估，再沿張力鏈以徒手與筋膜刀處理受限筋膜層的放鬆方式，目的在恢復組織滑動與關節活動度，而不是只按壓痠痛的地方。KSE 在台中南屯教室提供一對一約 60 分鐘的美式筋膜放鬆，處理後立即複評活動度。",
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
    seoTitle: "台中運動按摩・運動恢復｜賽後放鬆・賽前啟動・週間維護｜南屯 KSE",
    seoDescription:
      "KSE 台中南屯運動按摩與運動恢復：先做動作評估，再依訓練與比賽週期安排賽前啟動、運動後放鬆恢復與週間維護，與中信兄弟職棒選手相同的恢復流程，運動員與久坐族都適合，單次約 60 分鐘。",
    /** 服務頁顯示的相關 FAQ（對應 FAQS 的 id）與延伸文章（對應 POSTS 的 slug） */
    faqs: ["what-sports-massage", "recovery", "non-athlete", "massage-vs-fascia", "timing", "frequency", "injury", "pain"],
    posts: ["post-workout-recovery", "does-painful-massage-work-better", "sports-massage-for-everyone", "ctbc-brothers-on-site"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-11-05",
    title: "運動按摩",
    aliases: ["運動恢復按摩", "運動放鬆按摩", "運動後按摩", "Sports Massage"],
    definition:
      "運動按摩是以人體解剖構造為基礎，依肌肉、韌帶與筋膜走向，配合訓練與比賽週期調整手法與力道的按摩，目的在幫助運動後放鬆恢復、保持肌肉彈性與關節活動度、降低受傷風險。KSE 在台中南屯提供一對一約 60 分鐘的運動按摩，先做動作評估再處理，運動員與久坐上班族都適合。",
    scenarios: {
      title: "運動恢復怎麼安排？運動按摩的四個時機",
      items: [
        { label: "運動前・賽前", desc: "強度較輕，以提升組織延展性與神經肌肉啟動為主，讓身體進入狀態。" },
        { label: "運動後・賽後", desc: "安排較完整的放鬆處理，幫助降低疲勞與延遲性痠痛的不適感，加速恢復。" },
        { label: "訓練週間維護", desc: "處理高負荷部位累積的張力，例如投手肩後側與胸椎、跑者小腿與髂脛束、球類運動的髖與踝。" },
        { label: "日常放鬆保養", desc: "久坐久站、長時間用電腦或滑手機造成的肩頸緊繃與下背痠痛，沒有運動習慣也適合。" },
      ],
    },
    short: "依訓練或比賽週期安排的賽前啟動、賽後恢復與週間維護。",
    points: [
      "賽前：提升組織延展性與神經肌肉啟動",
      "賽後：加速代謝廢物排除、降低延遲性痠痛",
      "週間維護：處理高負荷部位累積張力",
      "依專項（棒球、籃球、羽球、跑步）調整重點",
    ],
    duration: "單次約 60 分鐘",
    audience: "棒球、籃球、羽球、跑步等運動員、規律訓練者與久坐上班族",
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
    posts: ["pelvic-tilt-causes", "text-neck-weight"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "核心穩定修復方案",
    aliases: ["核心訓練", "核心穩定訓練", "久坐族核心訓練"],
    definition:
      "核心穩定修復方案是為久坐上班族與肩頸、下背反覆不適者設計的系列課程，從呼吸與肋廓位置開始，喚醒橫膈、腹橫肌與骨盆底等深層核心，再整合髖與胸椎活動度，把穩定帶回日常坐姿與動作。KSE 在台中南屯開課，單堂約 50 分鐘。",
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
    posts: ["single-leg-balance-training", "knee-discomfort-lower-limb-stability", "yuying-basketball-training"],
    /** 服務頁內容最後修改日（sitemap lastmod） */
    updated: "2026-10-31",
    title: "肌力與體能訓練",
    aliases: ["肌力訓練", "體能訓練", "運動表現訓練", "青少年體能訓練"],
    definition:
      "肌力與體能訓練是依動作評估結果設計的個人化課表，涵蓋基礎肌力、爆發力、加減速與專項體能，把放鬆後恢復的活動度轉化為場上用得到的能力。KSE 在台中南屯為運動員、青少年運動員與傷後回場者開課，單堂約 60 分鐘。",
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
    /** 球迷常用的舊隊名，搜尋與 schema alternateName 用；頁面上以「中信兄弟（前身兄弟象）」呈現 */
    aliases: ["兄弟象", "CTBC Brothers", "中信兄弟棒球隊"],
    type: "職業棒球",
    desc: "KSE 為中信兄弟（前身為兄弟象）合作的運動恢復團隊，以動作評估、美式筋膜放鬆與運動按摩，支援職棒選手的賽後恢復與日常身體維護。",
    /** 相關合作文章（POSTS 的 slug），合作頁列出、文章頁回連合作頁 */
    posts: ["ctbc-brothers-partnership", "ctbc-brothers-on-site"],
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

/** 文章內文區塊：段落、H2 小標、條列清單 */
export type PostBlock = string | { h2: string } | { ul: string[] }

export type Post = {
  slug: string
  title: string
  date: string
  updated?: string
  category: (typeof CATEGORIES)[number]
  excerpt: string
  /** 文章開頭的重點摘要（約 60–90 字），讓搜尋引擎與 AI 直接引用 */
  summary: string
  /** 封面圖 key（見 utils/post-images.ts：內建圖或 assets/images/news/ 的檔名） */
  image: string
  alt: string
  /** 列表卡片裁成橫幅時的對焦位置（CSS object-position），預設 "50% 25%" */
  imagePosition?: string
  /** 文末相簿（key 同 image） */
  gallery?: { key: string; alt: string }[]
  /** 改寫自社群貼文時，原文網址 */
  sources?: string[]
  /** 作者（TEAM 的 slug）；有填才會顯示署名並輸出 Person 作者，未填則以商家為作者 */
  author?: string
  body: PostBlock[]
}

/** 全部文章，依發布日由新到舊（內容整理自 KSE 官方 IG／FB 貼文，見 utils/posts-ig.ts） */
export const POSTS: Post[] = [...IG_POSTS].sort((a, b) => b.date.localeCompare(a.date))

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
    id: "what-sports-massage",
    q: "運動按摩是什麼？和一般按摩有什麼不同？",
    a: "運動按摩以人體解剖構造為基礎，依肌肉、韌帶與筋膜走向調整手法與力道，目的在平衡身體張力、保持肌肉彈性與關節活動度，幫助運動後放鬆恢復；一般按摩多以經絡穴道按壓、哪裡痠就按哪裡為主，著重當下的舒緩。KSE 的運動按摩會先做動作評估，再決定處理部位與力道。",
  },
  {
    id: "recovery",
    q: "運動恢復有哪些方法？運動按摩扮演什麼角色？",
    a: "運動恢復通常包含充足睡眠、補充水分與營養、伸展與低強度活動，以及運動按摩等軟組織放鬆。運動按摩可能有助於降低延遲性痠痛的不適感、提升肌肉彈性與關節活動度，並重建肌群之間的張力平衡，讓身體更快回到可以再訓練的狀態。KSE 會先做動作評估，再依你的訓練與比賽時程安排恢復重點。",
  },
  {
    id: "non-athlete",
    q: "沒有運動習慣，也可以做運動按摩嗎？",
    a: "可以。運動按摩不只給運動員，久坐久站的上班族、長時間用電腦或滑手機造成肩頸痠痛、抱小孩造成媽媽手等，因肌肉長時間維持固定姿勢而緊繃的人也適合。放鬆師會依你的日常習慣與評估結果調整手法與力道。",
  },
  {
    id: "relax",
    q: "只想單純放鬆紓壓，適合來 KSE 嗎？",
    a: "適合。KSE 的按摩一樣能帶來放鬆與舒適感，差別在會先了解你的日常習慣與身體狀況，處理後確認緊繃處是否放鬆、動作是否變順，並提供回家可做的簡單練習。力道可以隨時溝通，怕痛的人也能選擇手法較輕柔的放鬆師。",
  },
  {
    id: "massage-vs-fascia",
    q: "運動按摩和美式筋膜放鬆差在哪？該選哪一個？",
    a: "兩者都會先做動作評估。運動按摩依訓練與比賽週期安排賽前啟動、賽後恢復與週間維護，適合規律運動或想在運動後放鬆恢復的人；美式筋膜放鬆沿張力鏈以徒手與筋膜刀處理受限的筋膜層，適合肩頸緊繃、下背痠痛、活動度受限的人。不確定的話，第一次來由放鬆師依評估結果建議。",
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
    id: "after",
    q: "按摩或筋膜放鬆後會痠痛嗎？可以馬上運動嗎？",
    a: "第一次放鬆後，有些人會像運動後一樣出現輕微的延遲性痠痛，通常 1–2 天內緩解。做完深層筋膜放鬆建議先休息幾小時再運動，讓身體適應新的活動範圍；若出現尖銳痛、麻或灼熱感，請告知放鬆師或就醫評估。",
  },
  {
    id: "frequency",
    q: "運動按摩多久做一次比較好？",
    a: "沒有固定答案，會依訓練量、比賽時程與身體狀況而定。規律訓練者可安排週間維護，比賽期則依賽前、賽後安排；第一次體驗結束時，放鬆師會依評估結果與你討論適合的保養頻率。",
  },
  {
    id: "injury",
    q: "受傷或肌肉拉傷後多久可以做運動按摩？",
    a: "急性受傷或有紅腫熱痛時，請先就醫評估。狀況穩定後，可透過美式筋膜放鬆與運動按摩處理受傷周邊的代償性緊繃，幫助恢復組織彈性與關節活動度。",
  },
  {
    id: "brothers",
    q: "KSE 和中信兄弟（兄弟象）是什麼合作關係？一般人也能體驗嗎？",
    a: "KSE 美式筋膜放鬆教室是中信兄弟（前身為兄弟象）的合作夥伴，團隊進入球場為職棒選手進行動作評估、美式筋膜放鬆與運動按摩，支援賽後恢復與賽季中的身體維護。同樣的評估與運動恢復流程，在台中南屯教室也提供給一般客人，線上即可預約。",
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
    href: "https://maps.google.com/?cid=355524801281724783",
  },
  { label: "LINE", value: "LINE 官方帳號", href: "https://lin.ee/z9MrmKK" },
  { label: "Instagram", value: "@kse_release_studio", href: "https://www.instagram.com/kse_release_studio" },
  { label: "Facebook", value: "KSE 美式筋膜放鬆教室", href: "https://www.facebook.com/profile.php?id=61562337030014" },
  { label: "Threads", value: "@kse_release_studio", href: "https://www.threads.com/@kse_release_studio" },
]
