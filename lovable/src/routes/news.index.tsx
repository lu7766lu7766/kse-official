import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { PageHero, Section } from "@/components/site/ui-blocks";
import { POST_IMAGES } from "@/lib/post-images";
import { CATEGORIES, POSTS } from "@/lib/site-data";

const DESC =
  "KSE 美式筋膜放鬆教室最新消息：活動公告、運動團隊合作、運動恢復知識，以及筋膜放鬆、動作訓練與肌力體能專業文章。";

export const Route = createFileRoute("/news/")({
  head: () => ({
    meta: [
      { title: "最新消息｜運動恢復與筋膜放鬆文章｜KSE 美式筋膜放鬆教室" },
      { name: "description", content: DESC },
      { property: "og:title", content: "最新消息｜KSE 美式筋膜放鬆教室" },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/news" }],
  }),
  component: NewsIndex,
});

function NewsIndex() {
  const [active, setActive] = useState<string>("全部");
  const posts = active === "全部" ? POSTS : POSTS.filter((p) => p.category === active);

  return (
    <>
      <PageHero
        eyebrow="News & Journal"
        title="最新消息"
        desc="活動公告、合作消息與運動恢復知識。以下文章為示範內容（CMS-ready），可於後台編輯。"
      />

      <Section>
        <div className="flex flex-wrap gap-2" role="group" aria-label="文章分類篩選">
          {["全部", ...CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              aria-pressed={active === cat}
              className={`rounded-sm border px-4 py-2 text-sm font-semibold transition-colors ${
                active === cat
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="surface-card overflow-hidden rounded-sm">
              <img
                src={POST_IMAGES[post.image]}
                alt={post.alt}
                width={1200}
                height={900}
                loading="lazy"
                className="h-48 w-full object-cover opacity-80"
              />
              <div className="p-6">
                <p className="text-xs text-muted-foreground">
                  <time dateTime={post.date}>{post.date}</time> ・{" "}
                  <span className="text-primary">{post.category}</span>
                </p>
                <h2 className="mt-2 text-lg leading-snug">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <Link
                  to="/news/$slug"
                  params={{ slug: post.slug }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                >
                  閱讀更多 <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        {posts.length === 0 && (
          <p className="mt-12 text-sm text-muted-foreground">此分類目前尚無文章。</p>
        )}
      </Section>
    </>
  );
}
