import type { Shape } from "@/lib/data";
import { cn } from "@/lib/utils";

/**
 * رسم فلات-لاي للموديل بلون المنتج نفسه.
 * بيستخدم بدل صور المنتجات لحد ما صور المصنع الحقيقية تترفع في /public.
 */

const TEE =
  "M70,44 L55,50 L25,72 L44,102 L60,90 L60,196 Q60,205 69,205 L131,205 Q140,205 140,196 L140,90 L156,102 L175,72 L145,50 L130,44 Q115,60 100,60 Q85,60 70,44 Z";

const DRESS =
  "M72,44 L58,50 L32,72 L50,98 L64,86 L46,198 Q100,214 154,198 L136,86 L150,98 L168,72 L142,50 L128,44 Q114,60 100,60 Q86,60 72,44 Z";

const ROMPER =
  "M70,44 L55,50 L28,72 L46,100 L60,88 L60,146 L57,186 Q57,197 69,197 L85,197 Q95,197 96,187 L100,158 L104,187 Q105,197 115,197 L131,197 Q143,197 143,186 L140,146 L140,88 L154,100 L172,72 L145,50 L130,44 Q115,60 100,60 Q85,60 70,44 Z";

const SHORTS =
  "M50,62 L150,62 L157,124 L151,192 Q151,200 141,200 L117,200 Q109,200 107,192 L100,136 L93,192 Q91,200 83,200 L59,200 Q49,200 49,192 L43,124 Z";

const CAP =
  "M46,148 Q42,86 100,84 Q158,86 154,148 Z";

function Body({ d, color }: { d: string; color: string }) {
  return (
    <>
      <path d={d} fill={color} />
      <path d={d} fill="url(#shade)" />
      <path d={d} fill="none" stroke="rgba(27,36,50,.22)" strokeWidth="2.2" strokeLinejoin="round" />
    </>
  );
}

function Stitch({ d }: { d: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke="rgba(255,255,255,.65)"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeDasharray="4 5"
    />
  );
}

function Art({ shape, color }: { shape: Shape; color: string }) {
  switch (shape) {
    case "tee":
      return (
        <g>
          <Body d={TEE} color={color} />
          <path
            d="M70,44 Q85,60 100,60 Q115,60 130,44"
            fill="none"
            stroke="rgba(27,36,50,.22)"
            strokeWidth="2.2"
          />
          <Stitch d="M62,196 L138,196" />
          <circle cx="100" cy="120" r="24" fill="rgba(255,255,255,.5)" />
          <circle cx="100" cy="120" r="24" fill="none" stroke="rgba(27,36,50,.14)" strokeWidth="1.6" />
          <path d="M92,120 l6,7 l12,-14" fill="none" stroke="rgba(27,36,50,.3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );

    case "shirt":
      return (
        <g>
          <Body d={TEE} color={color} />
          <path d="M70,44 L100,74 L130,44 L124,40 L100,58 L76,40 Z" fill="rgba(255,255,255,.75)" stroke="rgba(27,36,50,.22)" strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M100,74 L100,205" stroke="rgba(27,36,50,.18)" strokeWidth="2" />
          {[100, 128, 156, 184].map((y) => (
            <circle key={y} cx="100" cy={y} r="3.2" fill="rgba(255,255,255,.9)" stroke="rgba(27,36,50,.25)" strokeWidth="1.2" />
          ))}
          <path d="M62,150 L84,150 L84,176 L62,176 Z" fill="none" stroke="rgba(27,36,50,.14)" strokeWidth="1.6" />
        </g>
      );

    case "dress":
      return (
        <g>
          <Body d={DRESS} color={color} />
          <path d="M60,132 Q100,144 140,132" fill="none" stroke="rgba(27,36,50,.18)" strokeWidth="2.4" />
          <Stitch d="M54,166 Q100,178 146,166" />
          <circle cx="100" cy="132" r="6" fill="rgba(255,255,255,.8)" stroke="rgba(27,36,50,.2)" strokeWidth="1.4" />
          <path d="M88,126 q12,-10 24,0" fill="none" stroke="rgba(255,255,255,.7)" strokeWidth="2" />
        </g>
      );

    case "romper":
      return (
        <g>
          <Body d={ROMPER} color={color} />
          <Stitch d="M62,150 Q100,162 138,150" />
          {[84, 100, 116].map((x) => (
            <circle key={x} cx={x} cy="182" r="3.4" fill="rgba(255,255,255,.9)" stroke="rgba(27,36,50,.25)" strokeWidth="1.2" />
          ))}
          <circle cx="100" cy="112" r="13" fill="rgba(255,255,255,.55)" />
          <circle cx="95" cy="109" r="2" fill="rgba(27,36,50,.45)" />
          <circle cx="105" cy="109" r="2" fill="rgba(27,36,50,.45)" />
          <path d="M94,117 q6,5 12,0" fill="none" stroke="rgba(27,36,50,.45)" strokeWidth="2" strokeLinecap="round" />
        </g>
      );

    case "shorts":
      return (
        <g>
          <Body d={SHORTS} color={color} />
          <rect x="49" y="62" width="102" height="16" rx="6" fill="rgba(255,255,255,.35)" stroke="rgba(27,36,50,.18)" strokeWidth="1.6" />
          <path d="M84,70 L116,70" stroke="rgba(27,36,50,.3)" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M56,118 L78,118 L80,150 L58,150 Z" fill="rgba(255,255,255,.28)" stroke="rgba(27,36,50,.14)" strokeWidth="1.5" />
          <Stitch d="M52,190 L84,190 M116,190 L148,190" />
        </g>
      );

    case "jacket":
      return (
        <g>
          <Body d={TEE} color={color} />
          <path d="M100,60 L100,205" stroke="rgba(27,36,50,.3)" strokeWidth="3" />
          <path d="M100,60 L100,205" stroke="rgba(255,255,255,.5)" strokeWidth="1.2" strokeDasharray="3 4" />
          <circle cx="100" cy="72" r="4.5" fill="rgba(255,255,255,.9)" stroke="rgba(27,36,50,.28)" strokeWidth="1.4" />
          <path d="M70,44 Q85,62 100,60 Q115,62 130,44" fill="none" stroke="rgba(27,36,50,.22)" strokeWidth="2.4" />
          <path d="M62,138 L86,138 L86,164 L62,164 Z" fill="rgba(255,255,255,.25)" stroke="rgba(27,36,50,.16)" strokeWidth="1.6" />
          <path d="M114,138 L138,138 L138,164 L114,164 Z" fill="rgba(255,255,255,.25)" stroke="rgba(27,36,50,.16)" strokeWidth="1.6" />
        </g>
      );

    case "hoodie":
      return (
        <g>
          <path d="M70,46 Q100,14 130,46 Q100,68 70,46 Z" fill={color} stroke="rgba(27,36,50,.22)" strokeWidth="2.2" strokeLinejoin="round" />
          <Body d={TEE} color={color} />
          <path d="M70,46 Q100,74 130,46" fill="none" stroke="rgba(27,36,50,.22)" strokeWidth="2.2" />
          <path d="M88,62 L84,96 M112,62 L116,96" stroke="rgba(255,255,255,.8)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="84" cy="99" r="3.4" fill="rgba(255,255,255,.85)" />
          <circle cx="116" cy="99" r="3.4" fill="rgba(255,255,255,.85)" />
          <path d="M66,146 L134,146 L128,178 L72,178 Z" fill="rgba(255,255,255,.22)" stroke="rgba(27,36,50,.16)" strokeWidth="1.6" strokeLinejoin="round" />
          <rect x="58" y="192" width="84" height="13" rx="5" fill="rgba(27,36,50,.1)" />
        </g>
      );

    case "pajama":
      return (
        <g>
          <g transform="translate(100,66) scale(.62) translate(-100,-120)">
            <Body d={TEE} color={color} />
            <Stitch d="M62,196 L138,196" />
          </g>
          <g transform="translate(100,176) scale(.62) translate(-100,-130)">
            <Body d="M50,62 L150,62 L156,140 L150,216 Q150,224 140,224 L118,224 Q110,224 108,216 L100,150 L92,216 Q90,224 82,224 L60,224 Q50,224 50,216 L44,140 Z" color={color} />
            <rect x="49" y="62" width="102" height="15" rx="6" fill="rgba(255,255,255,.35)" stroke="rgba(27,36,50,.18)" strokeWidth="1.6" />
          </g>
          {[[62, 40], [140, 52], [54, 190], [148, 196]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" fill="rgba(255,255,255,.6)" />
          ))}
        </g>
      );

    case "set":
      return (
        <g>
          <g transform="translate(100,72) scale(.66) translate(-100,-124)">
            <Body d={TEE} color={color} />
            <circle cx="100" cy="130" r="22" fill="rgba(255,255,255,.45)" />
          </g>
          <g transform="translate(100,180) scale(.66) translate(-100,-132)">
            <Body d={SHORTS} color={color} />
            <rect x="49" y="62" width="102" height="16" rx="6" fill="rgba(255,255,255,.35)" stroke="rgba(27,36,50,.18)" strokeWidth="1.6" />
          </g>
        </g>
      );

    case "cap":
      return (
        <g>
          <path d="M40,150 Q34,166 56,166 L150,166 Q176,166 168,148 Q150,140 130,146 Z" fill={color} stroke="rgba(27,36,50,.22)" strokeWidth="2.2" strokeLinejoin="round" />
          <Body d={CAP} color={color} />
          <path d="M100,84 L100,150 M74,88 Q86,118 84,150 M126,88 Q114,118 116,150" fill="none" stroke="rgba(27,36,50,.16)" strokeWidth="1.8" />
          <circle cx="100" cy="86" r="5" fill="rgba(255,255,255,.85)" stroke="rgba(27,36,50,.22)" strokeWidth="1.4" />
        </g>
      );
  }
}

export function Garment({
  shape,
  color,
  tint = "#F3EDE4",
  className,
  pattern = true,
}: {
  shape: Shape;
  color: string;
  tint?: string;
  className?: string;
  pattern?: boolean;
}) {
  const id = `${shape}-${color.replace("#", "")}`;
  return (
    <svg
      viewBox="0 0 200 240"
      className={cn("h-full w-full", className)}
      role="img"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`shade-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity=".28" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".12" />
        </linearGradient>
        <linearGradient id="shade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity=".28" />
          <stop offset="55%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity=".12" />
        </linearGradient>
        <pattern id={`dots-${id}`} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="1.6" fill="rgba(27,36,50,.10)" />
        </pattern>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#1B2432" floodOpacity=".16" />
        </filter>
      </defs>

      <rect width="200" height="240" rx="20" fill={tint} />
      {pattern && <rect width="200" height="240" rx="20" fill={`url(#dots-${id})`} />}
      <ellipse cx="100" cy="214" rx="58" ry="9" fill="rgba(27,36,50,.10)" />
      <g filter="url(#soft)">
        <Art shape={shape} color={color} />
      </g>
    </svg>
  );
}
