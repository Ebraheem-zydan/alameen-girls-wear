"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  BadgeCheck,
  Factory,
  Handshake,
  Ruler,
  Store,
  Sparkles,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { categories, products } from "@/lib/data";
import { num } from "@/lib/i18n";
import { site, waLink } from "@/lib/site";
import { Garment } from "@/components/garment";
import { ProductCard } from "@/components/product-card";
import { WhatsIcon } from "@/components/order-drawer";
import { TikTokIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const whyIcons = [Sparkles, BadgeCheck, Factory, Handshake, Store, MessageCircle];

/** صور حقيقية من جناح الأمين في المعرض */
const standPhotos = ["/brand/p04.jpg", "/brand/p05.jpg", "/brand/p06.jpg"];

export default function Home() {
  const { t, lang, dir } = useStore();
  const flip = dir === "ltr" ? "rotate-180" : "";

  const featured = products.slice(0, 4);
  const fresh = products.filter((p) => p.badge === "new").slice(0, 4);

  return (
    <>
      {/* الهيرو */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-50 via-cream to-cream" />
        <div className="dots absolute inset-0 -z-10 opacity-50" />
        <div className="absolute -top-24 start-1/4 -z-10 h-72 w-72 rounded-full bg-sun/20 blur-3xl" />
        <div className="absolute -bottom-32 end-0 -z-10 h-80 w-80 rounded-full bg-brand-200/50 blur-3xl" />

        <div className="wrap grid items-center gap-12 py-14 lg:grid-cols-[1.05fr_1fr] lg:py-20">
          <div className="animate-fade-up">
            <span className="eyebrow">
              <Factory className="h-4 w-4" />
              {t.home.eyebrow}
            </span>

            <h1 className="mt-5 text-[40px] leading-[1.15] sm:text-[54px] lg:text-[58px]">
              {t.home.title1}
              <br />
              <span className="relative inline-block">
                <span className="relative z-10">{t.home.title2}</span>
                <span className="absolute inset-x-0 bottom-1.5 -z-0 h-4 rounded bg-sun/40" />
              </span>
              <br />
              <span className="text-brand-600">{t.home.title3}</span>
            </h1>

            <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">{t.home.lede}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/catalog" className="btn-primary">
                {t.home.ctaCatalog}
                <ArrowLeft className={cn("h-4 w-4", flip)} />
              </Link>
              <a
                href={waLink(
                  lang === "ar"
                    ? `السلام عليكم، حابب أستفسر عن الجملة في ${site.fullName.ar}`
                    : `Hello, I'd like to ask about wholesale at ${site.fullName.en}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-wa"
              >
                <WhatsIcon />
                {t.home.ctaWhats}
              </a>
            </div>

            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {site.stats.map((s) => (
                <div key={s.en}>
                  <dt className="text-[30px] font-extrabold leading-none text-ink">
                    {lang === "ar" ? s.value : s.en_value}
                  </dt>
                  <dd className="mt-1.5 text-[13px] font-semibold text-muted">{s[lang]}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* صورة البراند الرسمية */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-lift">
              <Image
                src="/brand/p02.jpg"
                alt={site.fullName[lang]}
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-5 start-6 rounded-2xl border border-line bg-white px-5 py-3 shadow-lift">
              <p className="whitespace-nowrap text-[13px] font-extrabold">
                {t.footer.wholesaleOnly}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* الأقسام */}
      <section className="section">
        <div className="wrap">
          <Head title={t.home.shopByCat} sub={t.home.shopByCatSub} href="/catalog" cta={t.common.viewAll} flip={flip} />

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Link
                key={c.slug}
                href={`/catalog?cat=${c.slug}`}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-line bg-white p-5 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift",
                  i === 0 && "sm:col-span-2"
                )}
              >
                <div
                  className="absolute inset-0 opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ background: `linear-gradient(135deg, ${c.tint}, transparent 65%)` }}
                />
                <div className="relative flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[17px] font-extrabold">{c[lang]}</h3>
                    <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-muted">
                      {lang === "ar" ? c.descAr : c.descEn}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-[13px] font-bold text-brand-700">
                      {t.common.viewAll}
                      <ArrowLeft className={cn("h-3.5 w-3.5 transition-transform group-hover:-translate-x-1", flip)} />
                    </span>
                  </div>
                  <div className="h-24 w-20 shrink-0 transition-transform duration-500 group-hover:scale-110">
                    <Garment shape={c.shape} color="#FFFFFF" tint="transparent" pattern={false} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* نماذج من الإنتاج */}
      <section className="section bg-white/60 py-16">
        <div className="wrap">
          <Head title={t.home.bestSellers} sub={t.home.bestSellersSub} href="/catalog" cta={t.common.viewAll} flip={flip} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} p={p} tint={categories.find((c) => c.slug === p.cat)?.tint} />
            ))}
          </div>
        </div>
      </section>

      {/* ليه إحنا */}
      <section className="section">
        <div className="wrap">
          <Head title={t.home.whyTitle} sub={t.home.whySub} flip={flip} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.why.map((w, i) => {
              const Icon = whyIcons[i % whyIcons.length];
              return (
                <div key={w.t} className="card p-6 transition-all hover:-translate-y-1 hover:shadow-lift">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-[17px] font-extrabold">{w.t}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{w.d}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* خطوات الطلب */}
      <section className="section bg-ink text-white">
        <div className="wrap">
          <div className="mb-10 text-center">
            <h2 className="text-[32px] sm:text-[38px]">{t.home.how}</h2>
            <p className="mx-auto mt-3 max-w-xl text-[16px] text-white/60">{t.home.howSub}</p>
          </div>

          <div className="relative grid gap-6 md:grid-cols-3">
            <div className="absolute inset-x-[16%] top-8 hidden h-px bg-white/15 md:block" />
            {t.home.steps.map((s, i) => (
              <div key={s.t} className="relative text-center">
                <span className="relative z-10 mx-auto grid h-16 w-16 place-items-center rounded-full border border-white/15 bg-ink text-2xl font-extrabold text-sun">
                  {num(i + 1, lang)}
                </span>
                <h3 className="mt-5 text-[19px] font-extrabold">{s.t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[14.5px] leading-relaxed text-white/60">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* كوليكشن الموسم */}
      <section className="section">
        <div className="wrap">
          <Head title={t.home.newArrivals} sub={t.home.newArrivalsSub} href="/catalog" cta={t.common.viewAll} flip={flip} />
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {fresh.map((p) => (
              <ProductCard key={p.slug} p={p} tint={categories.find((c) => c.slug === p.cat)?.tint} />
            ))}
          </div>
        </div>
      </section>

      {/* المعرض — صور حقيقية من الجناح */}
      <section className="section bg-white/60 py-16">
        <div className="wrap">
          <Head title={t.home.fairTitle} sub={t.home.fairSub} flip={flip} />
          <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
            <div className="overflow-hidden rounded-3xl border border-line shadow-soft">
              <Image
                src="/brand/p08.jpg"
                alt={site.fair[lang]}
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {standPhotos.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "overflow-hidden rounded-3xl border border-line shadow-soft",
                    i === 0 && "col-span-2"
                  )}
                >
                  <Image
                    src={src}
                    alt={t.aboutPage.galleryTitle}
                    width={1080}
                    height={1080}
                    className={cn("w-full object-cover", i === 0 ? "h-56" : "h-44")}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* زور الفرع */}
      <section className="wrap">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 px-8 py-14 text-white sm:px-14">
          <div className="grid-lines absolute inset-0 opacity-25" />
          <div className="absolute -end-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-[30px] leading-tight sm:text-[38px]">{t.home.ctaBand}</h2>
              <p className="mt-3 max-w-xl text-[16px] leading-relaxed text-white/80">{t.home.ctaBandSub}</p>
              <a
                href={waLink(
                  lang === "ar"
                    ? "السلام عليكم، حابب أعرف مواعيد الفرع وأزوركم"
                    : "Hello, I'd like to know your branch hours and visit"
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn mt-7 bg-white text-brand-700 hover:bg-cream"
              >
                <WhatsIcon />
                {t.home.ctaBandBtn}
              </a>
            </div>
            <div className="overflow-hidden rounded-2xl border-4 border-white/20">
              <Image
                src="/brand/p03.jpg"
                alt={site.brand[lang]}
                width={1080}
                height={1080}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* السوشيال */}
      <section className="section">
        <div className="wrap text-center">
          <h2 className="text-[28px] sm:text-[32px]">{t.home.followTitle}</h2>
          <p className="mx-auto mt-2 max-w-lg text-[15.5px] text-muted">{t.home.followSub}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {[
              { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: site.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Icon className="h-4 w-4" />
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Head({
  title,
  sub,
  href,
  cta,
  flip,
}: {
  title: string;
  sub?: string;
  href?: string;
  cta?: string;
  flip?: string;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-[30px] leading-tight sm:text-[36px]">{title}</h2>
        {sub && <p className="mt-2 max-w-xl text-[15.5px] text-muted">{sub}</p>}
      </div>
      {href && cta && (
        <Link href={href} className="btn-ghost btn-sm">
          {cta}
          <ArrowLeft className={cn("h-3.5 w-3.5", flip)} />
        </Link>
      )}
    </div>
  );
}
