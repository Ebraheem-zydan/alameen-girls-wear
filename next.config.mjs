/**
 * الموقع بيشتغل بطريقتين حسب مكان الرفع:
 *
 * 1. تطبيق Node (الافتراضي) — زي Hostinger Web Apps أو Vercel.
 *    `npm run build` وبعدين `npm start`.
 *
 * 2. تصدير ستاتيك — للاستضافة المشتركة اللي مفيهاش Node.
 *    `npm run build:static` بيطلّع مجلد `out/` ترفعه في public_html.
 *
 * @type {import('next').NextConfig}
 */
const isStatic = process.env.STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,

  ...(isStatic ? { output: "export" } : {}),

  /**
   * بيخلي كل مسار ينتهي بشرطة مايلة. مفيد في التصدير الستاتيك عشان كل صفحة
   * تطلع `<route>/index.html` وApache يخدمها لوحده، ومش بيضر في وضع Node.
   */
  trailingSlash: true,

  /**
   * تحسين الصور مقفول عن قصد: في التصدير الستاتيك مش متاح أصلاً، وفي وضع Node
   * بيحتاج حزمة sharp على السيرفر. الصور هنا مقاساتها صغيرة فمفيش فرق يذكر.
   */
  images: { unoptimized: true },
};

export default nextConfig;
