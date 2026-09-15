"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingBag, Phone, Globe, ChevronLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { site, waLink } from "@/lib/site";
import { categories } from "@/lib/data";
import { num } from "@/lib/i18n";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

export function Header() {
  const { t, lang, setLang, lines, setOpen, dir } = useStore();
  const [menu, setMenu] = useState(false);
  const [stuck, setStuck] = useState(false);
  const path = usePathname();

  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    const on = () => setStuck(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menu]);

  const nav = [
    { href: "/", label: t.nav.home },
    { href: "/catalog", label: t.nav.catalog },
    { href: "/wholesale", label: t.nav.wholesale },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const count = lines.reduce((s, l) => s + l.packs, 0);
  const ticker = [...t.ticker, ...t.ticker];

  return (
    <>
      {/* شريط الإعلانات */}
      <div className="relative overflow-hidden bg-ink py-2 text-white">
        <div className="flex w-max animate-marquee gap-10 whitespace-nowrap" dir={dir}>
          {ticker.map((item, i) => (
            <span key={i} className="flex items-center gap-3 text-[12.5px] font-semibold text-white/85">
              <span className="h-1.5 w-1.5 rounded-full bg-sun" />
              {item}
            </span>
          ))}
        </div>
      </div>

      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          stuck
            ? "border-line bg-cream/90 shadow-soft backdrop-blur-md"
            : "border-transparent bg-cream"
        )}
      >
        <div className="wrap">
          <div className="flex h-[68px] items-center justify-between gap-4">
            <Link href="/" aria-label={site.fullName[lang]}>
              <Logo ar={site.fullName[lang]} tagline={site.tagline[lang]} />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex">
              {nav.map((n) => {
                const active = n.href === "/" ? path === "/" : path.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={cn(
                      "rounded-full px-4 py-2 text-[15px] font-bold transition-colors",
                      active ? "bg-brand-50 text-brand-700" : "text-ink/75 hover:bg-white hover:text-ink"
                    )}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setLang(lang === "ar" ? "en" : "ar")}
                className="hidden items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-2 text-[13px] font-bold text-ink transition-colors hover:border-brand-300 sm:flex"
                aria-label="Switch language"
              >
                <Globe className="h-4 w-4 text-muted" />
                {lang === "ar" ? "EN" : "ع"}
              </button>

              <a
                href={waLink(
                  lang === "ar"
                    ? `السلام عليكم، حابب أستفسر عن الجملة في ${site.fullName.ar}`
                    : `Hello, I'd like to ask about wholesale at ${site.fullName.en}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-[13px] font-bold text-white transition-transform hover:scale-[1.03] md:flex"
              >
                <Phone className="h-4 w-4" />
                {site.phones[0]}
              </a>

              <button
                onClick={() => setOpen(true)}
                className="relative flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-[13px] font-bold text-white transition-colors hover:bg-ink/90"
              >
                <ShoppingBag className="h-4 w-4" />
                <span className="hidden sm:inline">{t.common.order}</span>
                {count > 0 && (
                  <span
                    className="absolute grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1 text-[11px] font-extrabold text-ink"
                    style={dir === "rtl" ? { left: -6, top: -6 } : { right: -6, top: -6 }}
                  >
                    {num(count, lang)}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenu(true)}
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white lg:hidden"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* شريط الأقسام */}
          <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalog?cat=${c.slug}`}
                className="shrink-0 rounded-full border border-line bg-white px-4 py-1.5 text-[13px] font-bold text-ink/80 transition-all hover:-translate-y-px hover:border-brand-300 hover:text-brand-700"
              >
                {c[lang]}
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* قائمة الموبايل */}
      <div
        className={cn(
          "fixed inset-0 z-50 overflow-hidden lg:hidden",
          menu ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!menu}
      >
        <div
          onClick={() => setMenu(false)}
          className={cn(
            "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity",
            menu ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          className={cn(
            "absolute inset-y-0 end-0 w-[86%] max-w-sm bg-cream p-6 shadow-lift transition-transform duration-300",
            menu
              ? "translate-x-0"
              : dir === "rtl"
                ? "-translate-x-full"
                : "translate-x-full"
          )}
        >
          <div className="mb-8 flex items-center justify-between">
            <Logo ar={site.fullName[lang]} />
            <button
              onClick={() => setMenu(false)}
              className="grid h-10 w-10 place-items-center rounded-full border border-line bg-white"
              aria-label={t.common.close}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-[17px] font-bold text-ink hover:bg-white"
              >
                {n.label}
                <ChevronLeft className={cn("h-4 w-4 text-muted", dir === "ltr" && "rotate-180")} />
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-line pt-6">
            <p className="mb-3 text-[13px] font-bold text-muted">{t.nav.categories}</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/catalog?cat=${c.slug}`}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[13px] font-bold text-ink/80"
                >
                  {c[lang]}
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              className="btn-ghost w-full"
            >
              <Globe className="h-4 w-4" />
              {lang === "ar" ? "English" : "العربية"}
            </button>
            <a
              href={waLink(lang === "ar" ? "السلام عليكم" : "Hello")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa w-full"
            >
              <Phone className="h-4 w-4" />
              {site.phones[0]}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
