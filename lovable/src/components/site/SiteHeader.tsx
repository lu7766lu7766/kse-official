import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NAV } from "@/lib/site-data";
import logoCircle from "@/assets/kse-logo-circle.png.asset.json";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="container-kse flex h-[74px] items-center justify-between gap-4 lg:h-[92px]">
        <Link
          to="/"
          className="flex items-center gap-3"
          aria-label="KSE 美式筋膜放鬆教室"
          onClick={() => setOpen(false)}
        >
          <img
            src={logoCircle.url}
            alt="KSE 美式筋膜放鬆教室"
            className="h-[58px] w-[58px] shrink-0 object-contain lg:h-[72px] lg:w-[72px]"
          />

        </Link>

        <nav aria-label="主要導覽" className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              className="rounded-sm px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/faq"
            hash="booking"
            className="ml-3 inline-flex items-center rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            立即預約
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "關閉選單" : "開啟選單"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="行動裝置導覽"
          className="rise-in border-t border-border bg-background lg:hidden"
        >
          <ul className="container-kse flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-4 text-base font-bold text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
