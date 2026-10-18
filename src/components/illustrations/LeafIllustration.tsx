import type { LeafPattern } from "@/content/landing";

/** Blade outline and midrib of a rice leaf, drawn diagonally from base (bottom-left) to tip. */
const BLADE = "M8 110 C 48 64, 118 24, 194 8 C 150 52, 92 98, 8 110 Z";
const MIDRIB = "M8 110 C 70 76, 132 40, 194 8";
const VEINS = ["M20 104 C 76 72, 134 38, 186 13", "M24 107 C 80 78, 138 44, 188 15"];
/** Rotation (deg) that aligns a lesion with the midrib. */
const ALONG_LEAF = -29;

type Spot = { cx: number; cy: number; r?: number };

const BLAST_LESIONS: Spot[] = [
  { cx: 58, cy: 80 },
  { cx: 92, cy: 66 },
  { cx: 118, cy: 46 },
  { cx: 146, cy: 36 },
];

const BROWN_SPOTS: Spot[] = [
  { cx: 44, cy: 88, r: 2.2 },
  { cx: 62, cy: 80, r: 2.6 },
  { cx: 76, cy: 66, r: 2 },
  { cx: 90, cy: 72, r: 2.4 },
  { cx: 104, cy: 56, r: 2.8 },
  { cx: 120, cy: 52, r: 2 },
  { cx: 132, cy: 40, r: 2.4 },
  { cx: 150, cy: 34, r: 2 },
  { cx: 164, cy: 24, r: 1.8 },
];

const SHEATH_LESIONS: Spot[] = [
  { cx: 30, cy: 98 },
  { cx: 52, cy: 82 },
  { cx: 66, cy: 80 },
];

function TipDiscoloration({
  id,
  colors,
  reach,
}: {
  id: string;
  colors: [string, string];
  reach: number;
}) {
  return (
    <>
      <defs>
        <linearGradient id={id} x1="1" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={colors[0]} />
          <stop offset={reach * 0.6} stopColor={colors[1]} />
          <stop offset={reach} stopColor={colors[1]} stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="200" height="120" fill={`url(#${id})`} />
    </>
  );
}

function Symptoms({ pattern, idPrefix }: { pattern: LeafPattern; idPrefix: string }) {
  switch (pattern) {
    case "blast":
      return BLAST_LESIONS.map(({ cx, cy }) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="9"
          ry="3.4"
          transform={`rotate(${ALONG_LEAF} ${cx} ${cy})`}
          fill="#b7b2a2"
          stroke="#7a4424"
          strokeWidth="1.6"
        />
      ));
    case "brown":
      return BROWN_SPOTS.map(({ cx, cy, r = 2 }) => (
        <g key={`${cx}-${cy}`}>
          <circle cx={cx} cy={cy} r={r + 2.2} fill="#e5c95a" opacity="0.75" />
          <circle cx={cx} cy={cy} r={r} fill="#7a4a24" />
        </g>
      ));
    case "sheath":
      return SHEATH_LESIONS.map(({ cx, cy }) => (
        <ellipse
          key={`${cx}-${cy}`}
          cx={cx}
          cy={cy}
          rx="11"
          ry="4.6"
          transform={`rotate(${ALONG_LEAF} ${cx} ${cy})`}
          fill="#c9cfae"
          stroke="#8a5a2b"
          strokeWidth="1.4"
        />
      ));
    case "blb":
      return (
        <TipDiscoloration id={`${idPrefix}-blb`} colors={["#f3ecc8", "#dcc66a"]} reach={0.55} />
      );
    case "tungro":
      return (
        <TipDiscoloration id={`${idPrefix}-tungro`} colors={["#e98f2e", "#e8c04a"]} reach={0.85} />
      );
    case "healthy":
      return null;
  }
}

type LeafIllustrationProps = {
  pattern: LeafPattern;
  /** Unique per page: SVG gradient and clip ids are global to the document. */
  idPrefix: string;
  className?: string;
};

/** Original, stylised rice-leaf artwork showing each condition's typical symptom pattern. */
export function LeafIllustration({ pattern, idPrefix, className }: LeafIllustrationProps) {
  const clipId = `${idPrefix}-clip`;
  const fillId = `${idPrefix}-fill`;
  return (
    <svg viewBox="0 0 200 120" className={className} aria-hidden focusable="false">
      <defs>
        <linearGradient id={fillId} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4f7f34" />
          <stop offset="1" stopColor="#8dbd57" />
        </linearGradient>
        <clipPath id={clipId}>
          <path d={BLADE} />
        </clipPath>
      </defs>
      <path d={BLADE} fill={`url(#${fillId})`} />
      <g clipPath={`url(#${clipId})`}>
        {VEINS.map((d) => (
          <path key={d} d={d} fill="none" stroke="#cfe6a8" strokeOpacity="0.25" strokeWidth="0.8" />
        ))}
        <Symptoms pattern={pattern} idPrefix={idPrefix} />
      </g>
      <path d={MIDRIB} fill="none" stroke="#dcefb8" strokeOpacity="0.55" strokeWidth="1.4" />
    </svg>
  );
}
