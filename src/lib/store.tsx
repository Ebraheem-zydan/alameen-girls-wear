"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { dict, type Dict } from "./i18n";
import { findProduct, type Lang } from "./data";
import { showPrices, site, waLink } from "./site";

export type Line = {
  slug: string;
  size: string;
  /** اسم اللون بالعربي — بيتخزن مرة واحدة عشان الرسالة */
  color: string;
  packs: number;
};

type Store = {
  lang: Lang;
  t: Dict;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  lines: Line[];
  add: (line: Line) => void;
  setPacks: (i: number, packs: number) => void;
  remove: (i: number) => void;
  clear: () => void;
  totalPieces: number;
  totalPrice: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  ready: boolean;
};

const Ctx = createContext<Store | null>(null);
const LS_LANG = "tk.lang";
const LS_LINES = "tk.order";

export function Provider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const l = localStorage.getItem(LS_LANG);
      if (l === "ar" || l === "en") setLangState(l);
      const raw = localStorage.getItem(LS_LINES);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* التخزين مقفول — كمّل عادي */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(LS_LANG, lang);
    } catch {}
  }, [lang, ready]);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(LS_LINES, JSON.stringify(lines));
    } catch {}
  }, [lines, ready]);

  const add = useCallback((line: Line) => {
    setLines((prev) => {
      const i = prev.findIndex(
        (l) => l.slug === line.slug && l.size === line.size && l.color === line.color
      );
      if (i === -1) return [...prev, line];
      const next = [...prev];
      next[i] = { ...next[i], packs: next[i].packs + line.packs };
      return next;
    });
    setOpen(true);
  }, []);

  const setPacks = useCallback((i: number, packs: number) => {
    setLines((prev) =>
      prev.map((l, idx) => (idx === i ? { ...l, packs: Math.max(1, Math.min(999, packs)) } : l))
    );
  }, []);

  const remove = useCallback((i: number) => {
    setLines((prev) => prev.filter((_, idx) => idx !== i));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const { totalPieces, totalPrice } = useMemo(() => {
    let pieces = 0;
    let price = 0;
    for (const l of lines) {
      const p = findProduct(l.slug);
      if (!p) continue;
      pieces += p.pack * l.packs;
      price += p.pack * l.packs * p.price;
    }
    return { totalPieces: pieces, totalPrice: price };
  }, [lines]);

  const value: Store = {
    lang,
    t: dict[lang],
    dir: lang === "ar" ? "rtl" : "ltr",
    setLang: setLangState,
    lines,
    add,
    setPacks,
    remove,
    clear,
    totalPieces,
    totalPrice,
    open,
    setOpen,
    ready,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useStore must be used inside <Provider>");
  return c;
}

/** يبني رسالة واتساب مرتّبة من الطلبية */
export function buildOrderMessage(lines: Line[], lang: Lang, totalPieces: number, totalPrice: number) {
  const ar = lang === "ar";
  const head = ar
    ? `السلام عليكم 👋\nحابب أطلب من ${site.fullName.ar}:\n`
    : `Hello 👋\nI'd like to order from ${site.fullName.en}:\n`;

  const body = lines
    .map((l, i) => {
      const p = findProduct(l.slug);
      if (!p) return "";
      const name = ar ? p.ar : p.en;
      const pieces = p.pack * l.packs;
      const money = showPrices ? (ar ? ` × ${p.price} ج.م` : ` x EGP ${p.price}`) : "";
      return ar
        ? `${i + 1}. ${name}\n   المقاس: ${l.size} | اللون: ${l.color}\n   ${l.packs} باكو = ${pieces} قطعة${money}`
        : `${i + 1}. ${name}\n   Size: ${l.size} | Color: ${l.color}\n   ${l.packs} packs = ${pieces} pcs${money}`;
    })
    .filter(Boolean)
    .join("\n\n");

  const sum = showPrices
    ? ar
      ? ` — حوالي ${totalPrice.toLocaleString("en-US")} ج.م`
      : ` — about EGP ${totalPrice.toLocaleString("en-US")}`
    : "";
  const foot = ar
    ? `\n\nالإجمالي: ${totalPieces} قطعة${sum}\nياريت تأكدولي التوافر والأسعار.`
    : `\n\nTotal: ${totalPieces} pcs${sum}\nPlease confirm availability and pricing.`;

  return head + "\n" + body + foot;
}

export const orderWaLink = (lines: Line[], lang: Lang, pieces: number, price: number) =>
  waLink(buildOrderMessage(lines, lang, pieces, price));
