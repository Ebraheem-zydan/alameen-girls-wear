import type { Metadata } from "next";
import { WholesaleView } from "./view";

export const metadata: Metadata = {
  title: "التعامل بالجملة",
  description:
    "إزاي التاجر بيشتغل مع مصنع الأمين — الطلب بالباكو، الأسعار، الاستلام والشحن، وزيارة الفرع أو الجناح في المعرض.",
};

export default function Page() {
  return <WholesaleView />;
}
