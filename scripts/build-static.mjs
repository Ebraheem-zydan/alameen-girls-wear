/**
 * بناء نسخة ستاتيك للاستضافة المشتركة (مفيهاش Node).
 * بيظبط STATIC_EXPORT وبينادي `next build`، والنتيجة مجلد `out/`.
 *
 * سبب وجوده كملف بدل سطر في package.json: تظبيط متغير بيئة في سطر الأوامر
 * شكله مختلف بين ويندوز ولينكس، والملف ده بيشتغل على الاتنين.
 */
import { spawnSync } from "node:child_process";

const result = spawnSync("npx", ["next", "build"], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, STATIC_EXPORT: "true" },
});

process.exit(result.status ?? 1);
