import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  id,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: "default" | "ink" | "cinematic";
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 lg:py-28",
        tone === "ink" && "bg-ink",
        tone === "cinematic" && "cinematic",
        className,
      )}
    >
      <div className="container-kse">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  desc,
  level = 2,
  center = false,
}: {
  eyebrow?: string;
  title: string;
  desc?: string;
  level?: 2 | 3;
  center?: boolean;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center")}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Tag className="mt-3 text-3xl leading-tight sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
      {desc && <p className="mt-4 text-base leading-relaxed text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function BookingButton({
  children = "立即預約",
  variant = "solid",
  className,
}: {
  children?: ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  return (
    <Link
      to="/faq"
      hash="booking"
      className={cn(
        "inline-flex items-center justify-center rounded-sm px-7 py-3.5 text-sm font-bold tracking-wide transition-all duration-300",
        variant === "solid"
          ? "bg-primary text-primary-foreground hover:scale-[1.03]"
          : "border border-border text-foreground hover:border-primary hover:text-primary",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc: string;
}) {
  return (
    <section className="cinematic border-b border-border py-20 lg:py-28">
      <div className="container-kse rise-in">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="mt-4 max-w-4xl text-4xl leading-[1.1] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground lg:text-lg">
          {desc}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <BookingButton />
          <BookingButton variant="outline">
            <span>聯絡我們</span>
          </BookingButton>
        </div>
      </div>
    </section>
  );
}

export function PlaceholderMedia({ label, note }: { label: string; note: string }) {
  return (
    <div className="flex aspect-video flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 p-6 text-center">
      <p className="text-base font-bold text-foreground">{label}</p>
      <p className="mt-2 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
