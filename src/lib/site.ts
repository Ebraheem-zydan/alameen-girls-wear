/**
 * كل بيانات المصنع في مكان واحد — غيّرها من هنا وهتتغير في كل الموقع.
 *
 * البيانات المعلّمة بـ ✅ متأكد منها (مسحوبة من صفحة فيسبوك وانستجرام الرسمية).
 * البيانات المعلّمة بـ ⚠️ مؤقتة — لازم صاحب المصنع يأكدها قبل النشر.
 */
export const site = {
  /** ✅ الاسم الرسمي زي ما هو على اللافتة والصفحات */
  brand: { ar: "الأمين", en: "Alameen" },
  fullName: {
    ar: "مصنع الأمين لملابس الأطفال",
    en: "Alameen — Kidswear Factory",
  },
  tagline: { ar: "ملابس بناتي — بيع جملة", en: "Girls wear — wholesale" },

  /** ✅ من البايو: «خبره اكثر من ٣٠ عام في صناعه ملابس الاطفال» */
  experienceYears: 30,

  /** ✅ الأرقام المنشورة على صفحة الفيسبوك */
  phones: ["01060066958", "01006909021"],
  /** رقم الواتساب بصيغة دولية من غير + ولا مسافات (نفس الرقم الأول) */
  whatsapp: "201060066958",

  /** ⚠️ مفيش إيميل منشور — سيبه فاضي وهيختفي من الموقع، أو حط الإيميل الرسمي */
  email: "",

  /** ⚠️ العنوان الكامل مش منشور — البتاعة الوحيدة المعروفة إن فيه فرع في العبور */
  address: {
    ar: "فرع العبور — القاهرة",
    en: "Obour branch — Cairo",
  },
  /** ⚠️ أكّد المواعيد */
  hours: { ar: "السبت – الخميس، ١٠ ص – ٦ م", en: "Sat – Thu, 10am – 6pm" },
  /** ⚠️ حط لينك الموقع الدقيق على جوجل مابس */
  mapUrl: "https://maps.google.com/?q=Obour+City+Cairo",

  /** ✅ كل اللينكات من البايو الرسمي */
  social: {
    facebook: "https://www.facebook.com/alameenegy",
    instagram: "https://www.instagram.com/alameen_girls_wear",
    tiktok: "https://www.tiktok.com/@alameengroup4",
    telegram: "https://t.me/+E-xSJ_0w1GhkM2Q0",
  },

  /**
   * الأرقام اللي بتظهر في شريط الإحصائيات.
   * ✅ دول بس اللي متأكدين منهم. ضيف أرقام تانية (طاقة الإنتاج، عدد العملاء،
   * عدد خطوط الإنتاج) بعد ما صاحب المصنع يأكدها — الشريط بيتوسّع لوحده.
   */
  stats: [
    { value: "+٣٠", en_value: "30+", ar: "سنة خبرة في ملابس الأطفال", en: "years in kidswear" },
    { value: "١٢ ألف", en_value: "12K", ar: "متابع على فيسبوك", en: "followers on Facebook" },
  ],

  /** ✅ بيعرضوا في معرض نيللي كيدز — أكبر معرض لملابس الأطفال في الشرق الأوسط */
  fair: {
    ar: "معرض نيللي كيدز للملابس — مركز مصر للمعارض الدولية",
    en: "Nelly Kids Fashion Fair — Egypt International Exhibition Center",
  },

  /**
   * ⚠️ عرض الأسعار مقفول.
   * الأسعار الموجودة في data.ts أرقام تجريبية مش حقيقية، فالموقع بيعرض
   * «السعر عند الطلب» بدالها. لما تدخل الأسعار الصح، خلّي ده true.
   */
  showPrices: false,

  /**
   * ⚠️ الحد الأدنى للطلب مش مؤكّد، فمخفي من الموقع.
   * خلّي showMoq = true بعد ما تأكّد الرقم.
   */
  showMoq: false,
  moq: { pieces: 60, ar: "٦٠ قطعة", en: "60 pieces" },
  currency: { ar: "ج.م", en: "EGP" },
} as const;

/** boolean صريح عشان `as const` ميخليهوش نوع ثابت في باقي الملفات */
export const showPrices: boolean = site.showPrices;
export const showMoq: boolean = site.showMoq;

export const waLink = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
