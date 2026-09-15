"use client";

import { useState } from "react";
import { Clock, Facebook, Instagram, Mail, MapPin, Phone, Send } from "lucide-react";
import { TikTokIcon } from "@/components/icons";
import { useStore } from "@/lib/store";
import { site, waLink } from "@/lib/site";
import { WhatsIcon } from "@/components/order-drawer";

const GOVS = [
  ["القاهرة", "Cairo"],
  ["الجيزة", "Giza"],
  ["الإسكندرية", "Alexandria"],
  ["الدقهلية", "Dakahlia"],
  ["الشرقية", "Sharqia"],
  ["الغربية", "Gharbia"],
  ["المنوفية", "Menoufia"],
  ["القليوبية", "Qalyubia"],
  ["البحيرة", "Beheira"],
  ["كفر الشيخ", "Kafr El Sheikh"],
  ["دمياط", "Damietta"],
  ["بورسعيد", "Port Said"],
  ["الإسماعيلية", "Ismailia"],
  ["السويس", "Suez"],
  ["الفيوم", "Fayoum"],
  ["بني سويف", "Beni Suef"],
  ["المنيا", "Minya"],
  ["أسيوط", "Assiut"],
  ["سوهاج", "Sohag"],
  ["قنا", "Qena"],
  ["الأقصر", "Luxor"],
  ["أسوان", "Aswan"],
  ["البحر الأحمر", "Red Sea"],
  ["مطروح", "Matrouh"],
];

export function ContactView() {
  const { t, lang } = useStore();
  const [f, setF] = useState({ name: "", shop: "", phone: "", city: "", message: "" });

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setF((p) => ({ ...p, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg =
      lang === "ar"
        ? `السلام عليكم 👋\nالاسم: ${f.name}\nالنشاط: ${f.shop}\nالموبايل: ${f.phone}\nالمحافظة: ${f.city}\n\n${f.message}`
        : `Hello 👋\nName: ${f.name}\nBusiness: ${f.shop}\nMobile: ${f.phone}\nGovernorate: ${f.city}\n\n${f.message}`;
    window.open(waLink(msg), "_blank", "noopener,noreferrer");
  };

  const info = [
    { Icon: MapPin, k: t.contactPage.addr, v: site.address[lang], href: site.mapUrl },
    { Icon: Clock, k: t.contactPage.hours, v: site.hours[lang] },
    {
      Icon: Phone,
      k: t.footer.contact,
      v: site.phones.join(" · "),
      href: waLink(lang === "ar" ? "السلام عليكم" : "Hello"),
    },
    ...(site.email
      ? [{ Icon: Mail, k: "Email", v: site.email, href: `mailto:${site.email}` }]
      : []),
  ];

  const socials = [
    { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
    { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
    { href: site.social.tiktok, Icon: TikTokIcon, label: "TikTok" },
    { href: site.social.telegram, Icon: Send, label: "Telegram" },
  ];

  return (
    <>
      <section className="relative overflow-hidden border-b border-line bg-white/60">
        <div className="dots absolute inset-0 opacity-50" />
        <div className="wrap relative py-14">
          <h1 className="text-[36px] leading-tight sm:text-[44px]">{t.contactPage.title}</h1>
          <p className="mt-3 max-w-xl text-[17px] text-muted">{t.contactPage.lede}</p>
        </div>
      </section>

      <section className="wrap grid gap-10 py-14 lg:grid-cols-[1.2fr_1fr]">
        {/* الفورم */}
        <form onSubmit={submit} className="card p-6 sm:p-8">
          <h2 className="text-[22px] font-extrabold">{t.contactPage.formTitle}</h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{t.contactPage.formNote}</p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label" htmlFor="name">{t.contactPage.name}</label>
              <input id="name" required value={f.name} onChange={set("name")} className="field" />
            </div>
            <div>
              <label className="label" htmlFor="shop">{t.contactPage.shop}</label>
              <input id="shop" value={f.shop} onChange={set("shop")} className="field" />
            </div>
            <div>
              <label className="label" htmlFor="phone">{t.contactPage.phone}</label>
              <input
                id="phone"
                required
                type="tel"
                inputMode="tel"
                dir="ltr"
                value={f.phone}
                onChange={set("phone")}
                className="field"
                placeholder="01xxxxxxxxx"
              />
            </div>
            <div>
              <label className="label" htmlFor="city">{t.contactPage.city}</label>
              <select id="city" value={f.city} onChange={set("city")} className="field">
                <option value="">—</option>
                {GOVS.map(([ar, en]) => (
                  <option key={en} value={lang === "ar" ? ar : en}>
                    {lang === "ar" ? ar : en}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="label" htmlFor="msg">{t.contactPage.message}</label>
              <textarea
                id="msg"
                required
                rows={5}
                value={f.message}
                onChange={set("message")}
                placeholder={t.contactPage.messagePlaceholder}
                className="field resize-none"
              />
            </div>
          </div>

          <button type="submit" className="btn-wa mt-6 w-full sm:w-auto">
            <WhatsIcon />
            {t.contactPage.send}
          </button>
        </form>

        {/* البيانات */}
        <div>
          <div className="card p-6 sm:p-8">
            <h2 className="text-[22px] font-extrabold">{t.contactPage.infoTitle}</h2>
            <ul className="mt-6 space-y-5">
              {info.map(({ Icon, k, v, href }) => (
                <li key={k} className="flex gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[12.5px] font-bold text-muted">{k}</p>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[14.5px] font-semibold leading-relaxed text-ink hover:text-brand-700"
                      >
                        {v}
                      </a>
                    ) : (
                      <p className="text-[14.5px] font-semibold leading-relaxed text-ink">{v}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <a
              href={waLink(lang === "ar" ? "السلام عليكم" : "Hello")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-wa mt-7 w-full"
            >
              <WhatsIcon />
              {t.contactPage.whatsappCta}
            </a>

            <div className="mt-7 border-t border-line pt-5">
              <p className="mb-3 text-[13px] font-bold text-muted">{t.contactPage.followUs}</p>
              <div className="flex flex-wrap gap-2">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-ghost btn-sm"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-3xl border border-line">
            <iframe
              title="map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=31.72%2C30.24%2C31.84%2C30.34&layer=mapnik"
              className="h-64 w-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}
