"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { orderWaLink, useStore } from "@/lib/store";
import { findProduct } from "@/lib/data";
import { num } from "@/lib/i18n";
import { showMoq, showPrices, site } from "@/lib/site";
import { Garment } from "./garment";
import { cn } from "@/lib/utils";

export function OrderDrawer() {
  const { open, setOpen, lines, setPacks, remove, clear, t, lang, dir, totalPieces, totalPrice } =
    useStore();

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [setOpen]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const belowMoq = showMoq && totalPieces > 0 && totalPieces < site.moq.pieces;

  return (
    <div className={cn("fixed inset-0 z-50 overflow-hidden", !open && "pointer-events-none")} aria-hidden={!open}>
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/45 backdrop-blur-sm transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0"
        )}
      />

      <aside
        className={cn(
          // الدرج بيطلع من جهة نهاية السطر: شمال في العربي، يمين في الإنجليزي.
          // الإخفاء لازم يبقى في نفس اتجاه الجهة دي عشان يخرج بره الشاشة فعلاً.
          "absolute inset-y-0 end-0 flex w-full max-w-md flex-col bg-cream shadow-lift transition-transform duration-300",
          open
            ? "translate-x-0"
            : dir === "rtl"
              ? "-translate-x-full"
              : "translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-extrabold">
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            {t.common.order}
          </h2>
          <button
            onClick={() => setOpen(false)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white"
            aria-label={t.common.close}
          >
            <X className="h-[18px] w-[18px]" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-5 h-28 w-24 opacity-60">
              <Garment shape="dress" color="#F5C6D0" tint="#FAE3E8" />
            </div>
            <p className="text-lg font-extrabold">{t.common.empty}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.common.emptyHint}</p>
            <Link href="/catalog" onClick={() => setOpen(false)} className="btn-primary mt-6">
              {t.common.browse}
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {lines.map((l, i) => {
                const p = findProduct(l.slug);
                if (!p) return null;
                const pieces = p.pack * l.packs;
                return (
                  <div key={`${l.slug}-${l.size}-${l.color}`} className="card flex gap-3 p-3">
                    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl">
                      <Garment
                        shape={p.shape}
                        color={p.colors.find((c) => c[lang] === l.color)?.hex ?? p.colors[0].hex}
                        tint="#F5EFE6"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${p.slug}`}
                          onClick={() => setOpen(false)}
                          className="text-[14px] font-extrabold leading-snug hover:text-brand-700"
                        >
                          {p[lang]}
                        </Link>
                        <button
                          onClick={() => remove(i)}
                          className="shrink-0 rounded-lg p-1 text-muted hover:bg-white hover:text-coral"
                          aria-label={t.common.remove}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <p className="mt-1 text-[12px] font-semibold text-muted">
                        {l.size} · {l.color}
                      </p>

                      <div className="mt-2.5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
                          <button
                            onClick={() => setPacks(i, l.packs - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream"
                            aria-label="-"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-8 text-center text-[13px] font-extrabold">
                            {num(l.packs, lang)}
                          </span>
                          <button
                            onClick={() => setPacks(i, l.packs + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-cream"
                            aria-label="+"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="text-end">
                          <p className="text-[12px] font-semibold text-muted">
                            {num(pieces, lang)} {t.common.pieces}
                          </p>
                          {showPrices && (
                            <p className="text-[14px] font-extrabold text-brand-700">
                              {num((pieces * p.price).toLocaleString("en-US"), lang)}{" "}
                              {site.currency[lang]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                onClick={clear}
                className="mx-auto block pt-2 text-[13px] font-bold text-muted underline underline-offset-4 hover:text-coral"
              >
                {t.common.clear}
              </button>
            </div>

            <div className="border-t border-line bg-white px-5 py-5">
              {belowMoq && (
                <p className="mb-3 rounded-2xl bg-sun/20 px-4 py-2.5 text-[12.5px] font-bold text-ink">
                  {t.common.minOrderNote} {site.moq[lang]}.
                </p>
              )}
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-muted">{t.common.total}</p>
                  {showPrices ? (
                    <p className="text-2xl font-extrabold">
                      {num(totalPrice.toLocaleString("en-US"), lang)}{" "}
                      <span className="text-base font-bold text-muted">{site.currency[lang]}</span>
                    </p>
                  ) : (
                    <p className="text-2xl font-extrabold">
                      {num(totalPieces, lang)}{" "}
                      <span className="text-base font-bold text-muted">{t.common.pieces}</span>
                    </p>
                  )}
                </div>
                <span className="chip">{t.common.wholesale}</span>
              </div>

              <a
                href={orderWaLink(lines, lang, totalPieces, totalPrice)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa w-full"
              >
                <WhatsIcon />
                {t.common.sendWhatsapp}
              </a>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function WhatsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.41-9.4 2.51 0 4.87.98 6.64 2.76a9.34 9.34 0 0 1 2.75 6.65c-.01 5.18-4.23 9.41-9.39 9.41zM20.52 3.49A11.8 11.8 0 0 0 12.04 0C5.46 0 .11 5.35.1 11.93c0 2.1.55 4.16 1.6 5.97L0 24l6.25-1.64a11.9 11.9 0 0 0 5.79 1.47h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.5-8.45z" />
    </svg>
  );
}
