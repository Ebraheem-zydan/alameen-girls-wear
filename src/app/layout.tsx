import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { Provider } from "@/lib/store";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { OrderDrawer } from "@/components/order-drawer";
import { WaFab } from "@/components/wa-fab";
import { site } from "@/lib/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-ar",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName.ar} — ${site.tagline.ar}`,
    template: `%s | ${site.brand.ar}`,
  },
  description:
    "مصنع الأمين لملابس الأطفال — خبرة أكتر من ٣٠ سنة في ملابس البنات، بيع جملة للمحلات والمعارض في مصر. تريكو وكارديجان وفساتين وأطقم بناتي.",
  keywords: [
    "مصنع الأمين",
    "ملابس بناتي جملة",
    "مصنع ملابس أطفال",
    "تريكو بناتي جملة",
    "Alameen girls wear",
  ],
  icons: {
    icon: "/brand/logo-square.png",
    apple: "/brand/logo-square.png",
  },
  openGraph: {
    type: "website",
    locale: "ar_EG",
    title: `${site.fullName.ar} — ${site.tagline.ar}`,
    description: "ملابس بناتي من مصنع الأمين — بيع جملة للتجار والمعارض.",
    images: ["/brand/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-screen">
        <Provider>
          <Header />
          <main>{children}</main>
          <Footer />
          <OrderDrawer />
          <WaFab />
        </Provider>
      </body>
    </html>
  );
}
