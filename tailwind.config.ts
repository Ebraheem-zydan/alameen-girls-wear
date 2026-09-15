import type { Config } from "tailwindcss";

/**
 * الألوان مسحوبة من لوجو الأمين ومن بوستات الصفحة الرسمية:
 * وردي #D9536E — برتقالي #EE8B4F — بمبي الفراشة #E2789F — بيج اللوجو #E6D9C9
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF3EC",
        beige: "#E6D9C9",
        ink: "#2E2126",
        muted: "#8A7078",
        line: "#EADCCE",
        brand: {
          50: "#FDF2F4",
          100: "#FAE3E8",
          200: "#F5C6D0",
          300: "#EE9DAF",
          400: "#E4738C",
          500: "#D9536E",
          600: "#C23C58",
          700: "#A22E46",
          800: "#85273B",
          900: "#6F2333",
        },
        blossom: "#E2789F",
        sun: "#EE8B4F",
        coral: "#E4573D",
        sky: "#8FC7DE",
        grape: "#B48BC4",
      },
      fontFamily: {
        sans: ["var(--font-ar)", "system-ui", "sans-serif"],
        display: ["var(--font-ar)", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "1rem", "2xl": "1.5rem", "3xl": "2rem" },
      boxShadow: {
        soft: "0 1px 2px rgba(46,33,38,.04), 0 8px 24px -12px rgba(46,33,38,.18)",
        lift: "0 2px 4px rgba(46,33,38,.05), 0 18px 40px -18px rgba(46,33,38,.35)",
      },
      keyframes: {
        "fade-up": { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
      },
      animation: {
        "fade-up": "fade-up .5s cubic-bezier(.2,.7,.3,1) both",
        float: "float 6s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
