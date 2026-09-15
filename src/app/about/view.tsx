"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { site } from "@/lib/site";
import { categories } from "@/lib/data";
import { num } from "@/lib/i18n";
import { Garment } from "@/components/garment";
import { cn } from "@/lib/utils";

const gallery = ["/brand/p04.jpg", "/brand/p05.jpg", "/brand/p06.jpg", "/brand/p03.jpg"];

export function AboutView() {
  const { t, lang, dir } = useStore();
  const flip = dir === "ltr" ? "rotate-180" : "";

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 to-cream" />
        <div className="dots absolute inset-0 -z-10 opacity-40" />
        <div className="wrap py-16 text-center">
          <span className="eyebrow">{site.tagline[lang]}</span>
          <h1 className="mx-auto mt-5 max-w-3xl text-[38px] leading-tight sm:text-[48px]">
            {t.aboutPage.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-relaxed text-muted">
            {t.aboutPage.lede}
          </p>
        </div>
      </section>

      {/* شريط الأرقام */}
      <section className="wrap">
        <dl className="card flex flex-wrap justify-center gap-x-16 gap-y-6 px-6 py-7">
          {site.stats.map((s) => (
            <div key={s.en} className="text-center">
              <dt className="text-[32px] font-extrabold leading-none text-brand-700">
                {lang === "ar" ? s.value : s.en_value}
              </dt>
              <dd className="mt-2 text-[13px] font-semibold text-muted">{s[lang]}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* القصة */}
      <section className="wrap grid gap-10 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <h2 className="text-[30px]">{t.aboutPage.storyTitle}</h2>
          <div className="mt-5 space-y-4">
            {t.aboutPage.story.map((p, i) => (
              <p key={i} className="text-[16px] leading-[1.9] text-ink/75">
                {p}
              </p>
            ))}
          </div>
          <Link href="/catalog" className="btn-primary mt-8">
            {t.common.browse}
            <ArrowLeft className={cn("h-4 w-4", flip)} />
          </Link>
        </div>

        <div className="self-start overflow-hidden rounded-[2rem] border border-line shadow-soft">
          <Image
            src="/brand/p02.jpg"
            alt={site.fullName[lang]}
            width={1080}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* بنصنّع إيه */}
      <section className="bg-white/60 py-16">
        <div className="wrap">
          <h2 className="text-[30px]">{t.aboutPage.capTitle}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/catalog?cat=${c.slug}`}
                className="group card flex items-center gap-4 p-5 transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <span
                  className="grid h-16 w-14 shrink-0 place-items-center rounded-2xl"
                  style={{ background: c.tint }}
                >
                  <span className="h-14 w-12 transition-transform duration-500 group-hover:scale-110">
                    <Garment shape={c.shape} color="#FFFFFF" tint="transparent" pattern={false} />
                  </span>
                </span>
                <div className="min-w-0">
                  <h3 className="text-[16px] font-extrabold">{c[lang]}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">
                    {lang === "ar" ? c.descAr : c.descEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* صور الجناح */}
      <section className="wrap py-16">
        <h2 className="text-[30px]">{t.aboutPage.galleryTitle}</h2>
        <p className="mt-2 max-w-xl text-[15.5px] text-muted">{t.aboutPage.gallerySub}</p>
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {gallery.map((src) => (
            <div key={src} className="overflow-hidden rounded-3xl border border-line shadow-soft">
              <Image
                src={src}
                alt={t.aboutPage.galleryTitle}
                width={1080}
                height={1080}
                className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>

      {/* القيم */}
      <section className="wrap pb-16">
        <h2 className="text-[30px]">{t.aboutPage.valuesTitle}</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.aboutPage.values.map((v, i) => (
            <div key={v.t} className="border-t-2 border-brand-500 pt-5">
              <span className="text-[13px] font-extrabold text-brand-600">
                {num(String(i + 1).padStart(2, "0"), lang)}
              </span>
              <h3 className="mt-2 text-[19px] font-extrabold">{v.t}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
