import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Activity,
  ArrowRight,
  Check,
  Dumbbell,
  HeartPulse,
  MapPin,
  Waves,
  X,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import baseballImg from "@/assets/baseball.jpg";
import assessImg from "@/assets/assess.jpg";
import coreImg from "@/assets/core.jpg";
import strengthImg from "@/assets/strength.jpg";
import massageImg from "@/assets/massage.jpg";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  BookingButton,
  PlaceholderMedia,
  Section,
  SectionHeading,
} from "@/components/site/ui-blocks";
import {
  AUDIENCES,
  BRAND,
  CASES,
  COMPARISON,
  FAQS,
  PARTNERS,
  POSTS,
  PROCESS,
  SERVICES,
} from "@/lib/site-data";

const DESC =
  "KSE 美式筋膜放鬆教室位於台中南屯，結合靜態與動態身體評估、筋膜放鬆、運動按摩、動作訓練與肌力體能，專為運動員與久坐族提供運動恢復與身體功能重建。";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KSE 美式筋膜放鬆教室｜台中南屯運動恢復與筋膜放鬆" },
      { name: "description", content: DESC },
      { name: "keywords", content: "台中筋膜放鬆,台中運動按摩,南屯筋膜放鬆,南屯運動按摩,台中運動恢復,核心穩定,肌力訓練" },
      { property: "og:title", content: "KSE 美式筋膜放鬆教室｜台中南屯運動恢復" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      {
        property: "og:image",
        content:
          "https://id-preview--a0416a97-eb3d-4808-8a0c-9d9f37d99d42.lovable.app/__l5e/assets-v1/c4e4106d-132f-4150-a5a9-94b6ae5eed82/kse-logo-circle.png",
      },
      {
        name: "twitter:image",
        content:
          "https://id-preview--a0416a97-eb3d-4808-8a0c-9d9f37d99d42.lovable.app/__l5e/assets-v1/c4e4106d-132f-4150-a5a9-94b6ae5eed82/kse-logo-circle.png",
      },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SportsActivityLocation",
          name: BRAND.full,
          description: DESC,
          areaServed: "台中市南屯區",
          slogan: BRAND.slogan,
        }),
      },
    ],
  }),
  component: Home,
});

const SERVICE_ICONS = [Waves, HeartPulse, Activity, Dumbbell];
const SERVICE_IMAGES = [heroImg, massageImg, coreImg, strengthImg];

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <img
          src={heroImg}
          alt="治療師在深色運動恢復空間中為運動員進行大腿後側筋膜放鬆"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
        <div className="container-kse relative py-28 lg:py-40">
          <div className="rise-in max-w-3xl">
            <span className="eyebrow">Kinetic Sports Enhancement ・ 台中南屯</span>
            <h1 className="mt-4 text-4xl leading-[1.08] sm:text-6xl lg:text-7xl">
              KSE
              <br />
              美式筋膜放鬆教室
            </h1>
            <p className="mt-6 text-xl font-bold leading-snug text-foreground sm:text-2xl">
              不是單純放鬆，而是重新找回身體的活動能力。
            </p>
            <p className="mt-4 text-sm tracking-[0.18em] text-primary sm:text-base">
              靜態評估 × 動態評估 × 筋膜放鬆 × 動作訓練
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <BookingButton />
              <Link
                to="/kse"
                className="inline-flex items-center gap-2 rounded-sm border border-border px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                了解 KSE <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <Section id="process">
        <SectionHeading
          eyebrow="The KSE Process"
          title="四步流程：讓改變留在身體裡"
          desc="每一次課程都遵循相同的邏輯，從評估開始，到訓練結束。"
        />
        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((step) => (
            <li key={step.no} className="surface-card rounded-sm p-7">
              <span className="text-5xl font-black text-primary/30">{step.no}</span>
              <h3 className="mt-4 text-xl">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Comparison */}
      <Section tone="ink">
        <SectionHeading
          eyebrow="Difference"
          title="KSE 與一般按摩的差異"
          desc="我們處理的是動作能力，不是單次的舒服感受。"
        />
        <div className="mt-12 overflow-hidden rounded-sm border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <caption className="sr-only">KSE 與一般按摩的比較表</caption>
            <thead>
              <tr className="bg-secondary">
                <th scope="col" className="px-4 py-4 font-bold sm:px-6">
                  比較項目
                </th>
                <th scope="col" className="px-4 py-4 font-bold text-primary sm:px-6">
                  KSE
                </th>
                <th scope="col" className="px-4 py-4 font-bold text-muted-foreground sm:px-6">
                  一般按摩
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((row) => (
                <tr key={row.topic} className="border-t border-border">
                  <th scope="row" className="px-4 py-4 font-semibold sm:px-6">
                    {row.topic}
                  </th>
                  <td className="px-4 py-4 sm:px-6">
                    <span className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                      {row.kse}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-muted-foreground sm:px-6">
                    <span className="flex items-start gap-2">
                      <X className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      {row.other}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Services */}
      <Section id="services">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Services" title="四項核心服務" />
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary"
          >
            查看服務項目 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i]!;
            return (
              <article key={service.slug} className="surface-card overflow-hidden rounded-sm">
                <img
                  src={SERVICE_IMAGES[i]}
                  alt={`${service.title}情境照片`}
                  width={1200}
                  height={900}
                  loading="lazy"
                  className="h-48 w-full object-cover opacity-80"
                />
                <div className="p-7">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-xl">{service.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.short}
                  </p>
                  <Link
                    to="/services"
                    hash={service.slug}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    查看詳情 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </Section>

      {/* Cinematic collaboration */}
      <section className="relative isolate overflow-hidden border-y border-border">
        <img
          src={baseballImg}
          alt="夜間球場中揮棒的棒球選手，深藍黑色調運動攝影"
          width={1600}
          height={912}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 cinematic opacity-80" />
        <div className="container-kse relative py-24 text-center lg:py-36">
          <span className="eyebrow">Collaboration</span>
          <h2 className="mt-4 text-4xl leading-tight sm:text-6xl">KSE × 中信兄弟</h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm text-muted-foreground">
            合作素材／Logo 預留，後續替換。實際合作內容與說明將於品牌方提供後更新。
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/60 px-7 py-3.5 text-sm font-bold text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              查看運動合作 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Partners */}
      <Section tone="ink">
        <SectionHeading eyebrow="Partners" title="合作單位" desc="以下為合作版位示意，素材與說明後續替換。" />
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {PARTNERS.map((p) => (
            <div key={p.name} className="surface-card rounded-sm p-7">
              <div className="flex h-24 items-center justify-center rounded-sm border border-dashed border-border text-xs text-muted-foreground">
                Logo 版位
              </div>
              <h3 className="mt-5 text-lg">{p.name}</h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-primary">{p.note}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Audiences */}
      <Section>
        <SectionHeading eyebrow="Who We Train" title="服務對象" />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map((a) => (
            <li key={a.title} className="surface-card rounded-sm p-6">
              <h3 className="text-base font-bold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.desc}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Cases */}
      <Section tone="ink">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Case Studies" title="示範案例" desc="以下為示範內容，可於後台編輯，非真實個案。" />
          <Link to="/cases" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            查看案例分享 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {CASES.map((c) => (
            <article key={c.slug} className="surface-card rounded-sm p-7">
              <span className="eyebrow">{c.tag}</span>
              <h3 className="mt-3 text-lg leading-snug">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* Manifesto */}
      <Section tone="cinematic" className="text-center">
        <p className="text-2xl font-black leading-tight tracking-[0.08em] sm:text-4xl lg:text-6xl">
          MOVE BETTER.
          <br />
          FEEL BETTER.
          <br />
          PERFORM BETTER.
        </p>
      </Section>

      {/* News */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="News" title="最新消息" />
          <Link to="/news" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            所有文章 <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {POSTS.slice(0, 3).map((post) => (
            <article key={post.slug} className="surface-card overflow-hidden rounded-sm">
              <img
                src={post.image === "baseball" ? baseballImg : post.image === "assess" ? assessImg : massageImg}
                alt={post.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-44 w-full object-cover opacity-80"
              />
              <div className="p-6">
                <p className="text-xs text-muted-foreground">
                  {post.date} ・ {post.category}
                </p>
                <h3 className="mt-2 text-lg leading-snug">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/news/$slug"
                  params={{ slug: post.slug }}
                  className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  閱讀更多 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section tone="ink">
        <SectionHeading eyebrow="FAQ" title="常見問題" />
        <Accordion type="single" collapsible className="mt-10 max-w-3xl">
          {FAQS.slice(0, 4).map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-8">
          <Link to="/faq" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
            查看完整 FAQ <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Section>

      {/* CTA + Map */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Booking" title="準備好重新找回活動能力了嗎？" desc="採預約制，第一次來訪將從完整的身體評估開始。" />
            <div className="mt-8">
              <BookingButton />
            </div>
          </div>
          <div>
            <div className="flex aspect-video flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 text-center">
              <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
              <p className="mt-3 text-base font-bold">台中市南屯區</p>
              <p className="mt-1 text-xs text-muted-foreground">Google Map 版位預留・地址待提供</p>
            </div>
            <PlaceholderMedia
              label="第三方線上預約系統"
              note="系統串接版位預留，開通後可直接於此選擇時段"
            />
          </div>
        </div>
      </Section>
    </>
  );
}
