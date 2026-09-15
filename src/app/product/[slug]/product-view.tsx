"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { byCat, findCategory, type Product } from "@/lib/data";
import { useStore } from "@/lib/store";
import { num } from "@/lib/i18n";
import { showMoq, showPrices, site, waLink } from "@/lib/site";
import { Garment } from "@/components/garment";
import { ProductCard } from "@/components/product-card";
import { WhatsIcon } from "@/components/order-drawer";
import { cn } from "@/lib/utils";

export function ProductView({ p }: { p: Product }) {
  const { t, lang, dir, add } = useStore();
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(p.sizes[Math.min(1, p.sizes.length - 1)]);
  const [packs, setPacks] = useState(1);
  const [done, setDone] = useState(false);

  const cat = findCategory(p.cat);
  const related = byCat(p.cat).filter((x) => x.slug !== p.slug).slice(0, 4);
  const pieces = p.pack * packs;
  const total = pieces * p.price;
  const flip = dir === "ltr" ? "rotate-180" : "";

  const onAdd = () => {
    add({ slug: p.slug, size, color: p.colors[color][lang], packs });
    setDone(true);
    setTimeout(() => setDone(false), 1800);
  };

  const specs = [
    { k: t.common.fabric, v: lang === "ar" ? p.fabricAr : p.fabricEn },
    { k: t.common.ages, v: lang === "ar" ? p.ageAr : p.ageEn },
    { k: t.common.pack, v: `${num(p.pack, lang)} ${t.common.pieces}` },
    { k: t.common.sizes, v: p.sizes.join(" · ") },
    { k: t.common.colors, v: p.colors.map((c) => c[lang]).join(" · ") },
  ];

  return (
    <>
      <div className="wrap pt-8">
        <Link
          href="/catalog"
          className="inline-flex items-center gap-1.5 text-[13.5px] font-bold text-muted hover:text-ink"
        >
          <ArrowLeft className={cn("h-4 w-4", flip)} />
          {t.common.backToCatalog}
        </Link>
      </div>

      <section className="wrap grid gap-10 py-8 lg:grid-cols-2 lg:gap-14">
        {/* الصور */}
        <div>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-soft">
            <div className="aspect-[5/6]">
              <Garment shape={p.shape} color={p.colors[color].hex} tint={cat?.tint ?? "#F5EFE6"} />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {p.colors.map((c, i) => (
              <button
                key={c.hex}
                onClick={() => setColor(i)}
                className={cn(
                  "aspect-square overflow-hidden rounded-2xl border-2 bg-white transition-all",
                  i === color ? "border-ink" : "border-line hover:border-brand-300"
                )}
                aria-label={c[lang]}
              >
                <Garment shape={p.shape} color={c.hex} tint="#FFFFFF" pattern={false} />
              </button>
            ))}
          </div>
        </div>

        {/* التفاصيل */}
        <div>
          {cat && (
            <Link href={`/catalog?cat=${cat.slug}`} className="chip hover:border-brand-300">
              {cat[lang]}
            </Link>
          )}

          <h1 className="mt-3 text-[32px] leading-tight sm:text-[38px]">{p[lang]}</h1>
          <p className="mt-2 text-[15px] text-muted">{lang === "ar" ? p.fabricAr : p.fabricEn}</p>

          <div className="mt-5 flex flex-wrap items-baseline gap-3">
            {showPrices ? (
              <>
                <span className="text-[38px] font-extrabold leading-none text-ink">
                  {num(p.price, lang)}
                </span>
                <span className="text-[16px] font-bold text-muted">
                  {site.currency[lang]} / {t.common.perPiece}
                </span>
              </>
            ) : (
              <>
                <span className="text-[30px] font-extrabold leading-none text-brand-700">
                  {t.common.priceOnRequest}
                </span>
                <span className="text-[15px] font-bold text-muted">{t.common.wholesale}</span>
              </>
            )}
          </div>

          <div className="mt-6 space-y-5 rounded-3xl border border-line bg-white p-5">
            {/* الألوان */}
            <div>
              <p className="label">
                {t.common.colors}: <span className="text-muted">{p.colors[color][lang]}</span>
              </p>
              <div className="flex flex-wrap gap-2">
                {p.colors.map((c, i) => (
                  <button
                    key={c.hex}
                    onClick={() => setColor(i)}
                    title={c[lang]}
                    aria-label={c[lang]}
                    className={cn(
                      "h-9 w-9 rounded-full border-2 transition-transform hover:scale-110",
                      i === color ? "border-ink" : "border-line"
                    )}
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
            </div>

            {/* المقاسات */}
            <div>
              <p className="label">{t.common.sizes}</p>
              <div className="flex flex-wrap gap-2">
                {p.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={cn(
                      "rounded-xl border px-3.5 py-2 text-[13px] font-bold transition-colors",
                      size === s
                        ? "border-ink bg-ink text-white"
                        : "border-line bg-white hover:border-brand-400"
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* الكمية */}
            <div>
              <p className="label">
                {t.common.quantity} ({t.common.packs} × {num(p.pack, lang)})
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 rounded-full border border-line p-1">
                  <button
                    onClick={() => setPacks((v) => Math.max(1, v - 1))}
                    className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
                    aria-label="-"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-10 text-center text-[15px] font-extrabold">
                    {num(packs, lang)}
                  </span>
                  <button
                    onClick={() => setPacks((v) => Math.min(999, v + 1))}
                    className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream"
                    aria-label="+"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div>
                  <p className="text-[13px] font-semibold text-muted">
                    {num(packs, lang)} {t.common.packs}
                  </p>
                  <p className="text-[18px] font-extrabold text-brand-700">
                    {showPrices
                      ? `${num(total.toLocaleString("en-US"), lang)} ${site.currency[lang]}`
                      : `${num(pieces, lang)} ${t.common.pieces}`}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">
              <button onClick={onAdd} className={cn("btn-primary flex-1", done && "bg-brand-500")}>
                {done ? <Check className="h-4 w-4" /> : <ShoppingBag className="h-4 w-4" />}
                {done ? t.common.inOrder : t.common.addToOrder}
              </button>
              <a
                href={waLink(
                  lang === "ar"
                    ? `السلام عليكم، عايز أستفسر عن: ${p.ar} — مقاس ${size}، لون ${p.colors[color].ar}`
                    : `Hello, I'd like to ask about: ${p.en} — size ${size}, ${p.colors[color].en}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsIcon />
                <span className="sm:hidden lg:inline">{t.common.askAbout}</span>
              </a>
            </div>
          </div>

          {/* المواصفات */}
          <dl className="mt-6 divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
            {specs.map((s) => (
              <div key={s.k} className="flex gap-4 px-5 py-3.5">
                <dt className="w-28 shrink-0 text-[13.5px] font-bold text-muted">{s.k}</dt>
                <dd className="text-[13.5px] font-semibold text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-4 text-[13px] leading-relaxed text-muted">
            {showMoq ? `${t.common.minOrderNote} ${site.moq[lang]}.` : t.common.tradeOnly}{" "}
            <Link href="/wholesale" className="font-bold text-brand-700 underline underline-offset-4">
              {t.nav.wholesale}
            </Link>
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="wrap py-14">
          <h2 className="mb-6 text-[26px]">{t.common.relatedTitle}</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.slug} p={r} tint={cat?.tint} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
