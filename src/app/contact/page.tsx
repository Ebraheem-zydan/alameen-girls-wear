import type { Metadata } from "next";
import { ContactView } from "./view";

export const metadata: Metadata = {
  title: "تواصل معنا",
  description: "كلمنا واتساب أو ابعتلنا طلبك — مصنع الأمين لملابس الأطفال، فرع العبور.",
};

export default function Page() {
  return <ContactView />;
}
