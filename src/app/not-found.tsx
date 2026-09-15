"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { Garment } from "@/components/garment";

export default function NotFound() {
  const { t, lang } = useStore();

  return (
    <section className="wrap grid place-items-center py-28 text-center">
      <div className="h-40 w-32 opacity-80">
        <Garment shape="dress" color="#F5C6D0" tint="#F3E3D8" />
      </div>
      <h1 className="mt-6 text-[40px]">404</h1>
      <p className="mt-2 max-w-sm text-[16px] text-muted">
        {lang === "ar"
          ? "الصفحة دي مش موجودة — يمكن الموديل اتشال أو اللينك قديم."
          : "This page doesn't exist — the style may have been removed or the link is old."}
      </p>
      <Link href="/catalog" className="btn-primary mt-7">
        {t.common.browse}
      </Link>
    </section>
  );
}
