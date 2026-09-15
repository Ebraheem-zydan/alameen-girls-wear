import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";

export const metadata: Metadata = {
  title: "الكتالوج",
  description:
    "كتالوج موديلات الأمين للجملة — تريكو وكارديجان، بلوزات، فساتين، أطقم بناتي، وملابس بيبي.",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="wrap py-24 text-center text-muted">...</div>}>
      <CatalogClient />
    </Suspense>
  );
}
