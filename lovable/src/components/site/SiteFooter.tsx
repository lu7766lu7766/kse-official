import { Link } from "@tanstack/react-router";
import { BRAND, CONTACT_CHANNELS, NAV } from "@/lib/site-data";
import logoHorizontal from "@/assets/kse-logo-horizontal-dark.png.asset.json";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-ink pb-28 pt-16 lg:pb-16">
      <div className="container-kse grid gap-12 lg:grid-cols-3">
        <div>
          <div className="inline-flex items-center rounded-md bg-white px-5 py-3">
            <img
              src={logoHorizontal.url}
              alt="KSE 美式筋膜放鬆教室 American Fascia Release Studio"
              className="h-10 w-auto object-contain"
              loading="lazy"
            />
          </div>

          <p className="mt-2 text-sm text-muted-foreground">{BRAND.full}</p>
          <p className="mt-6 text-sm font-bold tracking-[0.16em] text-primary">{BRAND.slogan}</p>
        </div>

        <nav aria-label="頁尾導覽">
          <h2 className="text-sm font-bold tracking-[0.2em] text-foreground">網站導覽</h2>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-foreground">聯絡與位置</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {CONTACT_CHANNELS.map((c) => (
              <li key={c.label}>
                {c.label}：{c.value}
              </li>
            ))}
            <li>服務區域：{BRAND.area}</li>
          </ul>
        </div>
      </div>

      <div className="container-kse mt-12 border-t border-border pt-6 text-xs text-muted-foreground">
        © {new Date().getFullYear()} {BRAND.name}. 台中筋膜放鬆 ・ 台中運動按摩 ・ 南屯運動恢復。
      </div>
    </footer>
  );
}
