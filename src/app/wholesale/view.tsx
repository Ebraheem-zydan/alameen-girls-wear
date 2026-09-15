"use client";

import { Banknote, Boxes, CalendarClock, Store, Truck, Stamp } from "lucide-react";
import { useStore } from "@/lib/store";
import { site, waLink } from "@/lib/site";
import { WhatsIcon } from "@/components/order-drawer";
import { Garment } from "@/components/garment";

const icons = [Store, Boxes, Banknote, CalendarClock, Truck, Stamp];

export function WholesaleView() {
  const { t, lang } = useStore();

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-white/60">
        <div className="grid-lines absolute inset-0 opacity-60" />
        <div className="wrap relative grid items-center gap-8 py-14 md:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="eyebrow">{t.common.wholesale}</span>
            <h1 className="mt-4 text-[36px] leading-tight sm:text-[44px]">{t.wholesalePage.title}</h1>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{t.wholesalePage.lede}</p>
          </div>
          <div className="mx-auto grid w-full max-w-[240px] grid-cols-2 gap-3">
            <div className="aspect-[5/6] overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <Garment shape="set" color="#E2789F" tint="#FAE3E8" />
            </div>
            <div className="aspect-[5/6] translate-y-5 overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <Garment shape="dress" color="#F2E8DC" tint="#F3E3D8" />
            </div>
          </div>
        </div>
      </section>

      <section className="wrap py-8">
        <p className="card px-6 py-4 text-[14px] font-semibold leading-relaxed text-muted">
          {t.wholesalePage.note}
        </p>
      </section>

      <section className="wrap grid gap-4 pb-16 md:grid-cols-2">
        {t.wholesalePage.sections.map((s, i) => {
          const Icon = icons[i % icons.length];
          return (
            <article key={s.t} className="card p-6">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="text-[18px] font-extrabold">{s.t}</h2>
              </div>
              <p className="mt-3.5 text-[14.5px] leading-relaxed text-muted">{s.d}</p>
            </article>
          );
        })}
      </section>

      <section className="wrap pb-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink px-8 py-12 text-center text-white">
          <div className="dots absolute inset-0 opacity-20" />
          <div className="relative">
            <h2 className="text-[26px] sm:text-[32px]">{t.wholesalePage.cta}</h2>
            <p className="mt-2 text-[15px] text-white/60" dir="ltr">
              {site.phones.join(" · ")}
            </p>
            <a
              href={waLink(
                lang === "ar"
                  ? "السلام عليكم، عندي سؤال عن شروط الجملة"
                  : "Hello, I have a question about your wholesale terms"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-6"
            >
              <WhatsIcon />
              {t.contactPage.whatsappCta}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
