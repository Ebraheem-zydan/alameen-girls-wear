"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Mail, MapPin, Clock, Send } from "lucide-react";
import { TikTokIcon } from "./icons";
import { useStore } from "@/lib/store";
import { site, waLink } from "@/lib/site";
import { categories } from "@/lib/data";
import { num } from "@/lib/i18n";
import { Logo } from "./logo";
import { WhatsIcon } from "./order-drawer";

export function Footer() {
  const { t, lang } = useStore();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const links = [
    { href: "/catalog", label: t.nav.catalog },
    { href: "/wholesale", label: t.nav.wholesale },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="mt-24 bg-ink text-white">
      {/* النشرة */}
      <div className="border-b border-white/10">
        <div className="wrap grid gap-8 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="text-2xl font-extrabold">{t.footer.newsletter}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/60">
              {t.footer.newsletterSub}
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSent(true);
            }}
            className="flex gap-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.footer.emailPh}
              className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-[15px] text-white placeholder:text-white/40 focus:border-brand-300 focus:outline-none"
            />
            <button type="submit" className="btn bg-sun text-ink hover:brightness-105">
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline">{t.footer.subscribe}</span>
            </button>
          </form>
          {sent && <p className="text-[13px] font-bold text-brand-200 md:col-start-2">{t.footer.subscribed}</p>}
        </div>
      </div>

      <div className="wrap grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo ar={site.fullName[lang]} invert />
          <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-white/55">{t.footer.about}</p>
          <div className="mt-5 flex gap-2">
            {[
              { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: site.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
              { href: site.social.telegram, Icon: Send, label: "Telegram" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-[14px] font-extrabold text-white">{t.footer.quickLinks}</h4>
          <ul className="space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[14px] text-white/60 transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[14px] font-extrabold text-white">{t.footer.cats}</h4>
          <ul className="space-y-2.5">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/catalog?cat=${c.slug}`}
                  className="text-[14px] text-white/60 transition-colors hover:text-white"
                >
                  {c[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-[14px] font-extrabold text-white">{t.footer.contact}</h4>
          <ul className="space-y-3.5 text-[14px] text-white/60">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              <span className="leading-relaxed">{site.address[lang]}</span>
            </li>
            <li className="flex gap-2.5">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
              <span>{site.hours[lang]}</span>
            </li>
            {site.email && (
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <a href={`mailto:${site.email}`} className="hover:text-white" dir="ltr">
                  {site.email}
                </a>
              </li>
            )}
            {site.phones.map((ph) => (
              <li key={ph} className="flex gap-2.5">
                <WhatsIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-300" />
                <a href={waLink(lang === "ar" ? "السلام عليكم" : "Hello")} target="_blank" rel="noopener noreferrer" className="hover:text-white" dir="ltr">
                  {ph}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-6 text-[13px] text-white/45 sm:flex-row">
          <p>
            © {num(new Date().getFullYear(), lang)} {site.fullName[lang]} — {t.footer.rights}
          </p>
          <p className="font-semibold text-white/60">{t.footer.wholesaleOnly}</p>
        </div>
      </div>
    </footer>
  );
}
