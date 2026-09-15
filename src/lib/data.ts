export type Lang = "ar" | "en";
export type Shape =
  | "romper" | "tee" | "dress" | "pajama" | "jacket" | "shorts" | "hoodie" | "shirt" | "set" | "cap";

export type Category = {
  slug: string;
  ar: string;
  en: string;
  descAr: string;
  descEn: string;
  shape: Shape;
  tint: string;
};

/**
 * ⚠️ الموديلات دي نماذج وصفية عامة لشكل الكتالوج — مش أرقام موديلات حقيقية
 * من إنتاج الأمين. صاحب المصنع لازم يستبدلها بموديلاته الفعلية وصورها.
 * الأسعار المكتوبة أرقام تجريبية ومخفية من الموقع (site.showPrices = false).
 */
export type Product = {
  slug: string;
  cat: string;
  ar: string;
  en: string;
  shape: Shape;
  fabricAr: string;
  fabricEn: string;
  ageAr: string;
  ageEn: string;
  sizes: string[];
  colors: { hex: string; ar: string; en: string }[];
  /** عدد القطع في الباكو الواحد */
  pack: number;
  /** سعر تجريبي — مش معروض في الموقع لحد ما تتحط الأسعار الحقيقية */
  price: number;
  badge?: "new";
};

export const categories: Category[] = [
  { slug: "knitwear", ar: "تريكو وكارديجان", en: "Knitwear & Cardigans", descAr: "كارديجان وبلوفرات وصديري تريكو بتفاصيل يدوية.", descEn: "Cardigans, pullovers and knit vests with hand-finished detail.", shape: "jacket", tint: "#F3E3D8" },
  { slug: "tops", ar: "بلوزات وتيشيرتات", en: "Tops & Blouses", descAr: "بلوزات بناتي بأكمام كشكشة وتيشيرتات قطن.", descEn: "Ruffle-sleeve blouses and cotton tees.", shape: "tee", tint: "#FAE3E8" },
  { slug: "dresses", ar: "فساتين", en: "Dresses", descAr: "فساتين كاجوال وسواريه لكل المناسبات.", descEn: "Casual and occasion dresses.", shape: "dress", tint: "#F5D9E4" },
  { slug: "sets", ar: "أطقم بناتي", en: "Girls Sets", descAr: "أطقم قطعتين وتلاتة جاهزة للعرض.", descEn: "Two and three-piece sets, ready to shelve.", shape: "set", tint: "#FBEEDC" },
  { slug: "outerwear", ar: "جاكيتات وبلوفرات", en: "Jackets & Sweaters", descAr: "جاكيتات وسويت شيرت لموسم الشتا.", descEn: "Jackets and sweatshirts for the winter season.", shape: "hoodie", tint: "#EDE3F2" },
  { slug: "bottoms", ar: "بناطيل وجيبات", en: "Bottoms & Skirts", descAr: "بناطيل وليجن وجيبات بخامات مريحة.", descEn: "Trousers, leggings and skirts in comfortable fabrics.", shape: "shorts", tint: "#E4EDF2" },
  { slug: "baby-girl", ar: "بيبي بناتي", en: "Baby Girl", descAr: "من الولادة لسنتين — خامات ناعمة على بشرة البيبي.", descEn: "Newborn to 2 years, in soft skin-friendly fabrics.", shape: "romper", tint: "#F7E6E0" },
];

const C = {
  cream: { hex: "#F2E8DC", ar: "كريمي", en: "Cream" },
  offwhite: { hex: "#F7F4EF", ar: "أوف وايت", en: "Off-white" },
  blossom: { hex: "#E2789F", ar: "بمبي", en: "Pink" },
  rose: { hex: "#D9536E", ar: "وردي", en: "Rose" },
  maroon: { hex: "#7E2B3C", ar: "نبيتي", en: "Maroon" },
  beige: { hex: "#E0CBB2", ar: "بيج", en: "Beige" },
  camel: { hex: "#C09468", ar: "جملي", en: "Camel" },
  grey: { hex: "#BDB6B4", ar: "رمادي", en: "Grey" },
  black: { hex: "#2E2126", ar: "أسود", en: "Black" },
  sky: { hex: "#8FC7DE", ar: "لبني", en: "Sky" },
  lilac: { hex: "#C4AEDC", ar: "ليلكي", en: "Lilac" },
  olive: { hex: "#8A8B63", ar: "زيتي", en: "Olive" },
  sun: { hex: "#EE8B4F", ar: "برتقالي", en: "Orange" },
  navy: { hex: "#31405F", ar: "كحلي", en: "Navy" },
};

const S = {
  baby: ["3-6m", "6-9m", "9-12m", "12-18m", "18-24m"],
  kids: ["2-3", "4-5", "6-7", "8-9", "10-11", "12-13"],
  big: ["4-5", "6-7", "8-9", "10-11", "12-13", "13-14"],
  small: ["2-3", "4-5", "6-7", "8-9"],
};

export const products: Product[] = [
  // تريكو وكارديجان
  { slug: "knit-cardigan-flower", cat: "knitwear", ar: "كارديجان تريكو بورد", en: "Floral Knit Cardigan", shape: "jacket", fabricAr: "تريكو أكريليك ناعم بتطريز يدوي", fabricEn: "Soft acrylic knit with hand embroidery", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.cream, C.blossom, C.maroon], pack: 8, price: 0, badge: "new" },
  { slug: "knit-vest", cat: "knitwear", ar: "صديري تريكو بناتي", en: "Girls Knit Vest", shape: "tee", fabricAr: "تريكو مضلّع", fabricEn: "Ribbed knit", ageAr: "سنتين – ١٠ سنوات", ageEn: "2 to 10 years", sizes: S.small, colors: [C.offwhite, C.maroon, C.beige], pack: 10, price: 0 },
  { slug: "knit-crochet-cardigan", cat: "knitwear", ar: "كارديجان كورشيه مربعات", en: "Crochet Square Cardigan", shape: "jacket", fabricAr: "كورشيه بمربعات ملونة", fabricEn: "Granny-square crochet", ageAr: "٤ – ١٢ سنة", ageEn: "4 to 12 years", sizes: S.big, colors: [C.cream, C.grey, C.olive], pack: 6, price: 0, badge: "new" },
  { slug: "knit-bow-pullover", cat: "knitwear", ar: "بلوفر تريكو بفيونكة", en: "Bow Knit Pullover", shape: "hoodie", fabricAr: "تريكو ناعم بنقشة فيونكة بارزة", fabricEn: "Soft knit with raised bow motif", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.offwhite, C.blossom, C.camel], pack: 8, price: 0 },

  // بلوزات وتيشيرتات
  { slug: "ruffle-blouse", cat: "tops", ar: "بلوزة كشكشة بناتي", en: "Ruffle-Sleeve Blouse", shape: "tee", fabricAr: "قطن ليكرا مرن", fabricEn: "Stretch cotton-lycra", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.offwhite, C.blossom, C.lilac], pack: 12, price: 0 },
  { slug: "printed-tee-girls", cat: "tops", ar: "تيشيرت بناتي مطبوع", en: "Girls Printed Tee", shape: "tee", fabricAr: "قطن مفرّد بطباعة", fabricEn: "Printed cotton jersey", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.offwhite, C.rose, C.sky, C.grey], pack: 12, price: 0 },
  { slug: "striped-shirt-girls", cat: "tops", ar: "قميص بناتي مقلّم", en: "Girls Striped Shirt", shape: "shirt", fabricAr: "بوبلين قطن مقلّم", fabricEn: "Striped cotton poplin", ageAr: "٤ – ١٣ سنة", ageEn: "4 to 13 years", sizes: S.big, colors: [C.blossom, C.sky, C.offwhite], pack: 10, price: 0 },
  { slug: "smocked-top", cat: "tops", ar: "بلوزة سموك", en: "Smocked Top", shape: "tee", fabricAr: "قطن بخصر سموك مطاط", fabricEn: "Cotton with smocked elastic waist", ageAr: "سنتين – ١٠ سنوات", ageEn: "2 to 10 years", sizes: S.small, colors: [C.offwhite, C.rose, C.beige], pack: 12, price: 0, badge: "new" },

  // فساتين
  { slug: "ruffle-hem-dress", cat: "dresses", ar: "فستان بكشكشة من تحت", en: "Ruffle-Hem Dress", shape: "dress", fabricAr: "قطن مفرّد ناعم", fabricEn: "Soft cotton jersey", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.blossom, C.rose, C.offwhite], pack: 10, price: 0 },
  { slug: "tulle-party-dress", cat: "dresses", ar: "فستان تُل سواريه", en: "Tulle Party Dress", shape: "dress", fabricAr: "تل مبطن بساتان", fabricEn: "Satin-lined tulle", ageAr: "٣ – ١٢ سنة", ageEn: "3 to 12 years", sizes: S.small, colors: [C.rose, C.lilac, C.offwhite], pack: 6, price: 0, badge: "new" },
  { slug: "knit-winter-dress", cat: "dresses", ar: "فستان تريكو شتوي", en: "Winter Knit Dress", shape: "dress", fabricAr: "تريكو مبطن", fabricEn: "Lined knit", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.maroon, C.camel, C.grey], pack: 8, price: 0 },
  { slug: "floral-summer-dress", cat: "dresses", ar: "فستان صيفي مطبوع", en: "Printed Summer Dress", shape: "dress", fabricAr: "فيسكوز مطبوع خفيف", fabricEn: "Printed lightweight viscose", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.blossom, C.sun, C.sky], pack: 10, price: 0 },

  // أطقم
  { slug: "blouse-legging-set", cat: "sets", ar: "طقم بلوزة وليجن", en: "Blouse & Legging Set", shape: "set", fabricAr: "قطن ليكرا", fabricEn: "Cotton-lycra", ageAr: "سنتين – ١٠ سنوات", ageEn: "2 to 10 years", sizes: S.small, colors: [C.rose, C.grey, C.blossom], pack: 8, price: 0 },
  { slug: "knit-two-piece", cat: "sets", ar: "طقم تريكو قطعتين", en: "Two-Piece Knit Set", shape: "set", fabricAr: "تريكو ناعم", fabricEn: "Soft knit", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.cream, C.beige, C.maroon], pack: 8, price: 0, badge: "new" },
  { slug: "summer-short-set", cat: "sets", ar: "طقم صيفي بلوزة وشورت", en: "Summer Top & Shorts Set", shape: "set", fabricAr: "قطن مفرّد", fabricEn: "Cotton jersey", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.blossom, C.sky, C.sun], pack: 12, price: 0 },
  { slug: "tracksuit-set", cat: "sets", ar: "طقم تراكسوت بناتي", en: "Girls Tracksuit Set", shape: "set", fabricAr: "فوتر مبطن", fabricEn: "Lined terry", ageAr: "سنتين – ١٣ سنة", ageEn: "2 to 13 years", sizes: S.kids, colors: [C.grey, C.rose, C.lilac], pack: 8, price: 0 },

  // جاكيتات وبلوفرات
  { slug: "girls-hoodie", cat: "outerwear", ar: "هودي بناتي مبطن", en: "Lined Girls Hoodie", shape: "hoodie", fabricAr: "فوتر ببطانة وبر", fabricEn: "Fleece-back terry", ageAr: "سنتين – ١٣ سنة", ageEn: "2 to 13 years", sizes: S.kids, colors: [C.grey, C.rose, C.cream], pack: 8, price: 0 },
  { slug: "quilted-jacket", cat: "outerwear", ar: "جاكيت مبطن", en: "Quilted Jacket", shape: "jacket", fabricAr: "بوليستر مبطن بحشو حراري", fabricEn: "Thermal-filled polyester", ageAr: "٣ – ١٢ سنة", ageEn: "3 to 12 years", sizes: S.small, colors: [C.blossom, C.navy, C.black], pack: 6, price: 0 },
  { slug: "sweatshirt-embroidered", cat: "outerwear", ar: "سويت شيرت بتطريز", en: "Embroidered Sweatshirt", shape: "hoodie", fabricAr: "فوتر بتطريز صدر", fabricEn: "Terry with chest embroidery", ageAr: "٤ – ١٣ سنة", ageEn: "4 to 13 years", sizes: S.big, colors: [C.cream, C.maroon, C.olive], pack: 10, price: 0, badge: "new" },
  { slug: "denim-jacket-girls", cat: "outerwear", ar: "جاكيت جينز بناتي", en: "Girls Denim Jacket", shape: "jacket", fabricAr: "دنيم قطن", fabricEn: "Cotton denim", ageAr: "٤ – ١٢ سنة", ageEn: "4 to 12 years", sizes: S.small, colors: [C.sky, C.navy], pack: 8, price: 0 },

  // بناطيل وجيبات
  { slug: "girls-leggings", cat: "bottoms", ar: "ليجن بناتي قطن", en: "Girls Cotton Leggings", shape: "shorts", fabricAr: "قطن ليكرا مرن", fabricEn: "Stretch cotton-lycra", ageAr: "سنتين – ١٢ سنة", ageEn: "2 to 12 years", sizes: S.kids, colors: [C.black, C.grey, C.rose], pack: 12, price: 0 },
  { slug: "pleated-skirt", cat: "bottoms", ar: "جيبة بليسيه", en: "Pleated Skirt", shape: "dress", fabricAr: "قماش بليسيه مبطن", fabricEn: "Lined pleated fabric", ageAr: "٤ – ١٣ سنة", ageEn: "4 to 13 years", sizes: S.big, colors: [C.beige, C.navy, C.maroon], pack: 10, price: 0 },
  { slug: "wide-trousers", cat: "bottoms", ar: "بنطلون واسع بناتي", en: "Girls Wide Trousers", shape: "shorts", fabricAr: "كريب مريح", fabricEn: "Comfort crepe", ageAr: "٤ – ١٣ سنة", ageEn: "4 to 13 years", sizes: S.big, colors: [C.cream, C.black, C.camel], pack: 10, price: 0 },

  // بيبي بناتي
  { slug: "baby-girl-romper", cat: "baby-girl", ar: "بادي بيبي بناتي", en: "Baby Girl Romper", shape: "romper", fabricAr: "قطن ١٠٠٪ مفرّد", fabricEn: "100% cotton jersey", ageAr: "٣ شهور – سنتين", ageEn: "3 months to 2 years", sizes: S.baby, colors: [C.offwhite, C.blossom, C.cream], pack: 12, price: 0 },
  { slug: "baby-knit-set", cat: "baby-girl", ar: "طقم تريكو بيبي", en: "Baby Knit Set", shape: "set", fabricAr: "تريكو ناعم مضاد للحساسية", fabricEn: "Hypoallergenic soft knit", ageAr: "نيو بورن – ١٨ شهر", ageEn: "Newborn to 18 months", sizes: S.baby, colors: [C.cream, C.blossom, C.beige], pack: 8, price: 0, badge: "new" },
  { slug: "baby-girl-dress", cat: "baby-girl", ar: "فستان بيبي بناتي", en: "Baby Girl Dress", shape: "dress", fabricAr: "قطن ناعم مبطن", fabricEn: "Lined soft cotton", ageAr: "٦ شهور – سنتين", ageEn: "6 months to 2 years", sizes: S.baby, colors: [C.blossom, C.offwhite, C.lilac], pack: 10, price: 0 },
];

export const byCat = (slug: string) => products.filter((p) => p.cat === slug);
export const findProduct = (slug: string) => products.find((p) => p.slug === slug);
export const findCategory = (slug: string) => categories.find((c) => c.slug === slug);
