import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BookingButton, Section } from "@/components/site/ui-blocks";
import { POST_IMAGES } from "@/lib/post-images";
import { POSTS } from "@/lib/site-data";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "找不到文章｜KSE 美式筋膜放鬆教室" }, { name: "robots", content: "noindex" }],
      };
    }
    const { post } = loaderData;
    return {
      meta: [
        { title: `${post.title}｜KSE 美式筋膜放鬆教室` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/news/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/news/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            datePublished: post.date,
            articleSection: post.category,
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: PostPage,
});

function PostNotFound() {
  return (
    <Section>
      <h1 className="text-3xl">找不到這篇文章</h1>
      <p className="mt-4 text-sm text-muted-foreground">文章可能已被移除或網址有誤。</p>
      <Link to="/news" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> 回到最新消息
      </Link>
    </Section>
  );
}

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="cinematic border-b border-border py-16 lg:py-24">
          <div className="container-kse">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> 最新消息
            </Link>
            <p className="mt-6 text-xs tracking-widest text-muted-foreground">
              <time dateTime={post.date}>{post.date}</time> ・ {post.category}
            </p>
            <h1 className="mt-3 max-w-3xl text-3xl leading-tight sm:text-5xl">{post.title}</h1>
          </div>
        </header>

        <Section>
          <img
            src={POST_IMAGES[post.image]}
            alt={post.alt}
            width={1200}
            height={900}
            className="w-full rounded-sm border border-border object-cover"
          />
          <div className="mt-10 max-w-3xl space-y-6 text-base leading-relaxed text-muted-foreground">
            {post.body.map((p: string) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-12">
            <BookingButton />
          </div>
        </Section>
      </article>

      <Section tone="ink">
        <h2 className="text-2xl">其他文章</h2>
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {related.map((p) => (
            <article key={p.slug} className="surface-card rounded-sm p-6">
              <p className="text-xs text-muted-foreground">
                <time dateTime={p.date}>{p.date}</time> ・ {p.category}
              </p>
              <h3 className="mt-2 text-lg leading-snug">{p.title}</h3>
              <Link
                to="/news/$slug"
                params={{ slug: p.slug }}
                className="mt-4 inline-block text-sm font-bold text-primary"
              >
                閱讀更多
              </Link>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
