"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { categories, products } from "@/lib/data";
import { useStore } from "@/lib/store";
import { num } from "@/lib/i18n";
import { showMoq, showPrices, site } from "@/lib/site";
import { ProductCard } from "@/components/product-card";
import { cn } from "@/lib/utils";

type Sort = "new" | "low" | "high";

export function CatalogClient() {
  const { t, lang } = useStore();
  const router = useRouter();
  const params = useSearchParams();
  const cat = params.get("cat") ?? "";

  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("new");

  const active = categories.find((c) => c.slug === cat);

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let out = products.filter((p) => {
      if (cat && p.cat !== cat) return false;
      if (!needle) return true;
      return (
        p.ar.toLowerCase().includes(needle) ||
        p.en.toLowerCase().includes(needle) ||
        p.fabricAr.toLowerCase().includes(needle) ||
        p.fabricEn.toLowerCase().includes(needle)
      );
    });
    if (sort === "low") out = [...out].sort((a, b) => a.price - b.price);
    if (sort === "high") out = [...out].sort((a, b) => b.price - a.price);
    return out;
  }, [cat, q, sort]);

  const setCat = (slug: string) =>
    router.replace(slug ? `/catalog?cat=${slug}` : "/catalog", { scroll: false });

  return (
    <>
      {/* الترويسة */}
      <section className="relative overflow-hidden border-b border-line bg-white/60">
        <div className="dots absolute inset-0 opacity-50" />
        <div className="wrap relative py-12">
          <h1 className="text-[34px] leading-tight sm:text-[42px]">
            {active ? active[lang] : t.nav.catalog}
          </h1>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-muted">
            {active
              ? lang === "ar"
                ? active.descAr
                : active.descEn
              : showMoq
                ? `${t.common.minOrderNote} ${site.moq[lang]}.`
                : t.common.tradeOnly}
          </p>
        </div>
      </section>

      {/* الفلاتر */}
      <section className="sticky top-[68px] z-20 border-b border-line bg-cream/90 backdrop-blur-md">
        <div className="wrap flex flex-wrap items-center gap-3 py-3">
          <div className="relative min-w-[200px] flex-1">
            <Search className="absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t.common.search}
              className="field ps-10 py-2.5"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute inset-y-0 end-3 my-auto h-5 w-5 text-muted hover:text-ink"
                aria-label={t.common.close}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="relative">
            <SlidersHorizontal className="pointer-events-none absolute inset-y-0 start-3 my-auto h-4 w-4 text-muted" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="field appearance-none py-2.5 ps-10 pe-8 font-bold"
              aria-label={t.common.sortBy}
            >
              <option value="new">{t.common.sortNew}</option>
              {showPrices && (
                <>
                  <option value="low">{t.common.sortLow}</option>
                  <option value="high">{t.common.sortHigh}</option>
                </>
              )}
            </select>
          </div>
        </div>

        <div className="wrap no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:px-8">
          <button
            onClick={() => setCat("")}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-bold transition-colors",
              !cat ? "border-ink bg-ink text-white" : "border-line bg-white text-ink/75 hover:border-brand-300"
            )}
          >
            {t.common.filterAll}
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setCat(c.slug)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-[13px] font-bold transition-colors",
                cat === c.slug
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-white text-ink/75 hover:border-brand-300"
              )}
            >
              {c[lang]}
            </button>
          ))}
        </div>
      </section>

      {/* الشبكة */}
      <section className="wrap py-10">
        <p className="mb-6 text-[13.5px] font-bold text-muted">
          {num(list.length, lang)} {t.common.results}
        </p>

        {list.length === 0 ? (
          <div className="card grid place-items-center px-6 py-20 text-center">
            <p className="text-lg font-extrabold">{t.common.noResults}</p>
            <button
              onClick={() => {
                setQ("");
                setCat("");
              }}
              className="btn-ghost btn-sm mt-5"
            >
              {t.common.filterAll}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p) => (
              <ProductCard
                key={p.slug}
                p={p}
                tint={categories.find((c) => c.slug === p.cat)?.tint}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
