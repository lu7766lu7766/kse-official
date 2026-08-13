import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero, PlaceholderMedia, Section, SectionHeading } from "@/components/site/ui-blocks";
import { BRAND, FAQS } from "@/lib/site-data";

const DESC =
  "KSE 常見問題與預約資訊：第一次來訪流程、與一般按摩的差異、運動前後安排、久坐族方案與預約方式。台中南屯運動恢復。";

const CHANNELS = [
  { icon: Phone, label: "電話", value: "號碼待提供" },
  { icon: MessageCircle, label: "LINE", value: "官方帳號待提供" },
  { icon: Instagram, label: "Instagram", value: "帳號待提供" },
  { icon: Facebook, label: "Facebook", value: "粉絲專頁待提供" },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ 與預約｜台中南屯筋膜放鬆預約｜KSE 美式筋膜放鬆教室" },
      { name: "description", content: DESC },
      { property: "og:title", content: "FAQ 與預約｜KSE 美式筋膜放鬆教室" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ & Booking"
        title="常見問題與預約"
        desc="採預約制。第一次來訪會從完整的靜態與動態評估開始，再依結果安排後續處理。"
      />

      <Section>
        <SectionHeading eyebrow="Questions" title="常見問題" />
        <Accordion type="single" collapsible className="mt-10 max-w-3xl">
          {FAQS.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-base font-bold">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <Section id="booking" tone="ink">
        <SectionHeading
          eyebrow="Booking"
          title="立即預約"
          desc="聯絡方式與線上預約系統版位已預留，實際資訊由品牌方提供後更新，我們不會提供未經確認的聯絡方式。"
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CHANNELS.map((c) => (
            <div key={c.label} className="surface-card rounded-sm p-6">
              <c.icon className="h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="mt-4 text-base font-bold">{c.label}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <PlaceholderMedia
            label="第三方線上預約系統"
            note="系統串接版位預留，開通後可於此直接選擇服務與時段"
          />
          <div className="flex aspect-video flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 p-6 text-center">
            <MapPin className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="mt-3 text-base font-bold">{BRAND.area}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Google Map 版位預留・地址待提供
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
