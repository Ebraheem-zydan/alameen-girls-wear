import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { findProduct, products } from "@/lib/data";
import { ProductView } from "./product-view";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = findProduct(params.slug);
  if (!p) return {};
  return {
    title: p.ar,
    description: `${p.ar} — ${p.fabricAr}. الباكو ${p.pack} قطعة، بيع جملة من مصنع الأمين.`,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const p = findProduct(params.slug);
  if (!p) notFound();
  return <ProductView p={p} />;
}
