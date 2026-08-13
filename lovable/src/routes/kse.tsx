import { createFileRoute } from "@tanstack/react-router";
import assessImg from "@/assets/assess.jpg";
import strengthImg from "@/assets/strength.jpg";
import { BookingButton, PageHero, Section, SectionHeading } from "@/components/site/ui-blocks";
import { PROCESS } from "@/lib/site-data";

const DESC =
  "KSE 的品牌理念、評估流程、筋膜放鬆技術與動作重建、肌力訓練方法。台中南屯運動恢復與身體功能工作室。";

export const Route = createFileRoute("/kse")({
  head: () => ({
    meta: [
      { title: "KSE專業｜評估、筋膜放鬆與動作重建｜KSE 美式筋膜放鬆教室" },
      { name: "description", content: DESC },
      { property: "og:title", content: "KSE專業｜評估、筋膜放鬆與動作重建" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/kse" }],
  }),
  component: KsePage,
});

function KsePage() {
  return (
    <>
      <PageHero
        eyebrow="About KSE"
        title="我們相信，恢復的終點是動得更好"
        desc="Kinetic Sports Enhancement — 以評估為起點，用筋膜放鬆打開限制，再用動作與訓練把改變留下來。"
      />

      <Section>
        <SectionHeading eyebrow="Philosophy" title="品牌理念" />
        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              KSE 不是傳統按摩、SPA 或美容店。我們是一間結合身體評估、徒手處理與運動訓練的運動恢復與身體功能工作室。
            </p>
            <p>
              疼痛與緊繃通常只是結果，真正的原因往往在別的地方：某個關節活動度不足、某個動作模式長期代償、或是核心無法在需要的時候穩定。因此我們不會只處理你指出的痠痛點。
            </p>
            <p>
              每一次課程都以評估開始、以動作結束。你會知道自己的限制在哪裡、我們處理了什麼，以及回家之後該練什麼。
            </p>
          </div>
          <img
            src={assessImg}
            alt="教練在深色空間中為運動員進行肩關節動態評估"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-sm border border-border object-cover"
          />
        </div>
      </Section>

      <Section tone="ink">
        <SectionHeading
          eyebrow="Assessment"
          title="評估流程"
          desc="靜態評估看結構，動態評估看功能，兩者一起才看得到全貌。"
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="surface-card rounded-sm p-8">
            <h3 className="text-xl">靜態評估</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>・ 站姿下的骨盆、肋廓與肩胛相對位置</li>
              <li>・ 脊椎排列與左右對稱性</li>
              <li>・ 呼吸模式與肋廓擴張方向</li>
              <li>・ 足踝與膝關節排列</li>
            </ul>
          </article>
          <article className="surface-card rounded-sm p-8">
            <h3 className="text-xl">動態評估</h3>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <li>・ 基本動作篩檢：深蹲、弓箭步、推拉、旋轉</li>
              <li>・ 單腳穩定與落地控制</li>
              <li>・ 專項動作觀察（投擲、跳躍、跑步）</li>
              <li>・ 處理前後的即時複評對照</li>
            </ul>
          </article>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Soft Tissue" title="筋膜放鬆" desc="以美式徒手技術處理受限的筋膜與軟組織。" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "組織滑動性", d: "恢復筋膜層之間的相對滑動，讓關節能走完應有的活動範圍。" },
            { t: "張力鏈路徑", d: "沿著筋膜連結處理，而不只是壓痛點所在的局部。" },
            { t: "主動式鬆動", d: "搭配你的主動動作進行處理，讓神經系統同步接受新的活動範圍。" },
            { t: "強度可控", d: "依評估結果與訓練週期調整處理深度，不以「痛」作為效果指標。" },
            { t: "即時複評", d: "處理後立刻重測原本受限的動作，確認改變確實發生。" },
            { t: "居家延續", d: "提供對應的自我放鬆與活動度練習，維持課後效果。" },
          ].map((i) => (
            <div key={i.t} className="surface-card rounded-sm p-6">
              <h3 className="text-base font-bold">{i.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{i.d}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="ink">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <img
            src={strengthImg}
            alt="深色健身房中進行槓鈴肌力訓練的運動員"
            width={1200}
            height={900}
            loading="lazy"
            className="w-full rounded-sm border border-border object-cover"
          />
          <div>
            <SectionHeading eyebrow="Movement & Strength" title="動作重建與肌力訓練" />
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              放鬆只是把空間打開，若沒有訓練，身體很快會回到原本熟悉的代償模式。動作重建的目的，是讓新的活動度變成你真的用得到的能力。
            </p>
            <ol className="mt-6 space-y-4">
              {PROCESS.map((p) => (
                <li key={p.no} className="flex gap-4">
                  <span className="text-xl font-black text-primary/50">{p.no}</span>
                  <div>
                    <h3 className="text-base font-bold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <BookingButton />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
