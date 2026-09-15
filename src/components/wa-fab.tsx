"use client";

import { useStore } from "@/lib/store";
import { site, waLink } from "@/lib/site";
import { WhatsIcon } from "./order-drawer";

export function WaFab() {
  const { lang } = useStore();
  const label = lang === "ar" ? "كلمنا واتساب" : "Chat on WhatsApp";

  return (
    <a
      href={waLink(
        lang === "ar"
          ? `السلام عليكم، حابب أستفسر عن الجملة في ${site.fullName.ar}`
          : `Hello, I'd like to ask about wholesale at ${site.fullName.en}`
      )}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="group fixed bottom-5 end-5 z-30 flex items-center gap-0 overflow-hidden rounded-full bg-[#25D366] p-4 text-white shadow-lift transition-all hover:gap-2 hover:pe-6"
    >
      <WhatsIcon className="h-6 w-6" />
      <span className="max-w-0 whitespace-nowrap text-[14px] font-extrabold opacity-0 transition-all duration-300 group-hover:max-w-[180px] group-hover:opacity-100">
        {label}
      </span>
    </a>
  );
}
