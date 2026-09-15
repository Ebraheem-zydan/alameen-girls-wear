/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  /**
   * تصدير ستاتيك — بيطلع مجلد `out/` فيه HTML و CSS و JS بس،
   * عشان يترفع على استضافة عادية زي Hostinger من غير Node.
   */
  output: "export",

  /**
   * الاستضافة المشتركة بتخدم المجلدات لوحدها، فـ `/catalog/index.html`
   * بيشتغل على `/catalog/` من غير أي إعدادات إعادة توجيه.
   */
  trailingSlash: true,

  /** تحسين الصور محتاج سيرفر Node — مش متاح في التصدير الستاتيك */
  images: { unoptimized: true },
};

export default nextConfig;
