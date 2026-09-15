"use client";

import Link from "next/link";
import { useState } from "react";
import { Check, Plus, X } from "lucide-react";
import type { Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { num } from "@/lib/i18n";
import { showPrices, site } from "@/lib/site";
import { Garment } from "./garment";
import { cn } from "@/lib/utils";

const badgeStyle: Record<string, string> = {
  new: "bg-sky text-ink",
  best: "bg-sun text-ink",
  offer: "bg-coral text-white",
};

export function ProductCard({ p, tint }: { p: Product; tint?: string }) {
  const { t, lang, add } = useStore();
  const [color, setColor] = useState(0);
  const [picking, setPicking] = useState(false);
  const [done, setDone] = useState(false);

  const onPick = (size: string) => {
    add({ slug: p.slug, size, color: p.colors[color][lang], packs: 1 });
    setPicking(false);
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  };

  return (
    <div className="group card overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative">
        <Link href={`/product/${p.slug}`} className="block aspect-[5/6] overflow-hidden">
          <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
            <Garment shape={p.shape} color={p.colors[color].hex} tint={tint ?? "#F5EFE6"} />
          </div>
        </Link>

        {p.badge && (
          <span
            className={cn(
              "absolute start-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-extrabold shadow-soft",
              badgeStyle[p.badge]
            )}
          >
            {t.common[p.badge]}
          </span>
        )}

        <span className="absolute end-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-extrabold text-ink shadow-soft backdrop-blur">
          {t.common.pack} {num(p.pack, lang)}
        </span>

        {/* الإضافة السريعة */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-white/95 p-3 backdrop-blur transition-all duration-300",
            picking ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
          )}
        >
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[12px] font-extrabold">{t.common.sizes}</span>
            <button onClick={() => setPicking(false)} aria-label={t.common.close}>
              <X className="h-4 w-4 text-muted" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {p.sizes.map((s) => (
              <button
                key={s}
                onClick={() => onPick(s)}
                className="rounded-lg border border-line px-2.5 py-1.5 text-[12px] font-bold hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2 flex items-center gap-1.5">
          {p.colors.map((c, i) => (
            <button
              key={c.hex}
              onClick={() => setColor(i)}
              title={c[lang]}
              aria-label={c[lang]}
              className={cn(
                "h-5 w-5 rounded-full border-2 transition-transform hover:scale-110",
                i === color ? "border-ink" : "border-line"
              )}
              style={{ background: c.hex }}
            />
          ))}
        </div>

        <Link href={`/product/${p.slug}`}>
          <h3 className="text-[15px] font-extrabold leading-snug hover:text-brand-700">{p[lang]}</h3>
        </Link>
        <p className="mt-1 line-clamp-1 text-[12.5px] font-semibold text-muted">
          {lang === "ar" ? p.fabricAr : p.fabricEn}
        </p>

        <div className="mt-3 flex items-end justify-between gap-2">
          <div>
            {showPrices ? (
              <>
                <p className="flex items-baseline gap-1.5">
                  <span className="text-[19px] font-extrabold text-ink">{num(p.price, lang)}</span>
                  <span className="text-[12px] font-bold text-muted">{site.currency[lang]}</span>
                </p>
                <p className="text-[11.5px] font-semibold text-muted">{t.common.perPiece}</p>
              </>
            ) : (
              <>
                <p className="text-[15px] font-extrabold text-brand-700">
                  {t.common.priceOnRequest}
                </p>
                <p className="text-[11.5px] font-semibold text-muted">{t.common.wholesale}</p>
              </>
            )}
          </div>

          <button
            onClick={() => (done ? null : setPicking((v) => !v))}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full transition-all",
              done ? "bg-brand-500 text-white" : "bg-ink text-white hover:scale-105"
            )}
            aria-label={t.common.addToOrder}
          >
            {done ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
