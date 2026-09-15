import type { Metadata } from "next";
import { AboutView } from "./view";

export const metadata: Metadata = {
  title: "عن المصنع",
  description:
    "مصنع الأمين لملابس الأطفال — أكتر من ٣٠ سنة في ملابس البنات، بنورّد جملة للمحلات والمعارض وبنعرض في معرض نيللي كيدز.",
};

export default function Page() {
  return <AboutView />;
}
