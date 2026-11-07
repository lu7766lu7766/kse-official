/**
 * 價目表與服務注意事項（業主提供，2026-11-06）。
 * 單一來源：/pricing、/notice、運動按摩服務頁、FAQ、Service schema、llms.txt 與運動按摩指南都從這裡取值。
 * 這個檔案刻意不 import 其他模組，避免與 site-data / 文章檔互相引用。
 */

export const PRICE_UPDATED = "2026-11-07"

/** 金額格式：1800 → "NT$1,800" */
export const ntd = (n: number) => `NT$${n.toLocaleString("en-US")}`

export const PRICING = {
  /** 適用這份價目表的服務（SERVICES 的 slug 與名稱）：價格會顯示在這些服務頁並輸出到其 Service schema。業主確認兩項同價（2026-11-07） */
  services: [
    { slug: "sports-massage", name: "運動按摩" },
    { slug: "fascia", name: "美式筋膜放鬆" },
  ],
  serviceName: "運動按摩",
  includes: "含動作評估、肌筋膜放鬆",
  single: { label: "單堂課程（原價）", duration: "60 分鐘（1 堂）", price: 1800 },
  firstVisit: {
    label: "首次到店新客優惠",
    duration: "60 分鐘",
    price: 1200,
    note: "新客優惠僅適用 60 分鐘課程，每人限用一次，需於預約時告知。",
  },
  packages: [
    { sessions: 4, total: 6400, perHour: 1600, discount: "約 8.9 折" },
    { sessions: 8, total: 12000, perHour: 1500, discount: "約 8.3 折" },
    { sessions: 16, total: 22400, perHour: 1400, discount: "約 7.8 折" },
    { sessions: 32, total: 41600, perHour: 1300, discount: "約 7.2 折" },
  ],
  notes: ["計價單位：1 堂 = 1 小時。", "折數以單堂原價每小時 NT$1,800 為基準換算。"],
  payment: ["現金", "信用卡", "銀行轉帳"],
  lineId: "@238jidgr",
  cancel: "取消或改期請於預約時間 3 小時前透過官方 LINE 告知。",
}

/** 適用價目表的服務名稱，例如「運動按摩、美式筋膜放鬆」 */
export const PRICED_SERVICE_NAMES = PRICING.services.map((s) => s.name).join("、")
export const isPricedService = (slug: string) => PRICING.services.some((s) => s.slug === slug)

/** 價格摘要句（FAQ、指南、llms.txt 共用） */
export const PRICE_SUMMARY = `KSE 運動按摩（${PRICING.includes}）與美式筋膜放鬆價格相同，單堂 60 分鐘 ${ntd(PRICING.single.price)}；首次到店新客 60 分鐘 ${ntd(PRICING.firstVisit.price)}，每人限用一次，需於預約時告知。另有 ${PRICING.packages.map((p) => p.sessions).join("、")} 堂課程方案，平均每小時 ${ntd(PRICING.packages[0]!.perHour)} 至 ${ntd(PRICING.packages.at(-1)!.perHour)}。付款方式：${PRICING.payment.join("、")}。`

export const NOTICE = {
  title: "運動按摩服務注意事項與禁忌",
  intro:
    "為了確保每位顧客在接受服務時的安全與品質，請於預約前確認自身健康狀況，並主動告知服務人員相關病史、用藥情形及近期身體狀況。",
  sections: [
    {
      title: "以下情況不建議接受運動按摩",
      desc: "如有以下狀況，請暫緩預約，並先尋求醫療專業人員評估：",
      items: [
        "發燒、急性感染或身體明顯不適。",
        "深層靜脈血栓或疑似血栓症狀。",
        "急性骨折或尚未穩定的骨骼損傷。",
        "急性出血或不明原因的嚴重腫脹。",
        "局部嚴重紅腫、發熱或疑似感染。",
        "急性心血管疾病或身體狀況不穩定。",
        "不明原因的劇烈疼痛或急性傷害。",
      ],
    },
    {
      title: "以下情況請事先告知服務人員",
      desc: "如有以下情況，服務前請主動告知，經評估後再決定是否適合進行服務，以及是否需要調整操作方式：",
      items: [
        "高血壓、糖尿病或心血管相關疾病。",
        "骨質疏鬆或曾有骨折病史。",
        "癌症病史或目前正在接受相關治療。",
        "懷孕或產後恢復期間。",
        "服用抗凝血藥物或有容易瘀青、出血的情況。",
        "靜脈曲張或循環相關問題。",
        "神經壓迫、肢體麻木或感覺異常。",
        "近期接受手術或尚在傷口癒合期間。",
        "肌肉拉傷、韌帶扭傷或其他近期運動傷害。",
      ],
    },
    {
      title: "服務過程中的注意事項",
      desc: "",
      items: [
        "請依照自身感受，隨時向服務人員反映操作力道及身體反應。",
        "若出現尖銳疼痛、麻木、電擊感、灼熱感或明顯不適，請立即告知。",
        "如服務過程中出現異常身體反應，服務人員有權暫停或終止服務。",
        "請勿隱瞞健康狀況、近期傷害或相關用藥資訊，以確保服務安全。",
      ],
    },
  ],
  safety: [
    "運動按摩及筋膜放鬆屬於徒手放鬆服務，並非醫療診斷或治療。如有急性傷害、疑似疾病或不明原因的疼痛，建議優先尋求醫療專業人員評估。",
    "KSE 美式筋膜放鬆教室重視每位顧客的身體狀況與服務安全，將依個別情況評估是否適合提供服務，必要時保留婉拒或暫緩服務之權利。",
  ],
  motto: "安全永遠優先於服務。",
}

/** 去掉句尾句號，方便串成一句（FAQ 用） */
const clause = (s: string) => s.replace(/。$/, "")

export const CONTRAINDICATION_SUMMARY = `${NOTICE.sections[0]!.items.map(clause).join("；")}，以上情況建議暫緩預約並先就醫評估。${NOTICE.sections[1]!.items.map(clause).join("；")}，以上情況請在服務前主動告知，經評估後再決定是否適合進行與如何調整。`
