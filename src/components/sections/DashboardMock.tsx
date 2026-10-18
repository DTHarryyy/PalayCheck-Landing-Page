/** Hotspot markers on the stylised municipality map (viewBox units). */
const HOTSPOTS = [
  { x: 92, y: 74, color: "var(--color-alert)", label: "Rice Blast" },
  { x: 214, y: 118, color: "var(--color-gold)", label: "Brown Spot" },
  { x: 150, y: 168, color: "var(--color-alert)", label: "Tungro" },
  { x: 262, y: 58, color: "var(--color-verified)", label: "Verified" },
];

const KPIS = [
  { label: "New reports", value: "12", tone: "text-ink" },
  { label: "Verified", value: "8", tone: "text-verified" },
  { label: "Pending", value: "4", tone: "text-clay-700" },
];

/** Illustrative mock of the MAO officer dashboard. Decorative only. */
export function DashboardMock() {
  return (
    <div aria-hidden className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-olive-200 via-sand to-clay-200 blur-2xl" />
      <div className="rounded-[2rem] border border-white/60 bg-white/50 p-5 shadow-2xl shadow-ink/15 backdrop-blur-xl sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-bold tracking-wider text-earth-700 uppercase">
              MAO dashboard
            </p>
            <p className="text-lg font-extrabold">This week</p>
          </div>
          <span className="flex items-center gap-2 rounded-full bg-verified/15 px-3 py-1 text-xs font-bold text-olive-800">
            <span className="size-2 rounded-full bg-verified" />
            Live
          </span>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-3">
          {KPIS.map((kpi) => (
            <div key={kpi.label} className="rounded-2xl bg-paper p-3 sm:p-4">
              <p className={`text-2xl font-extrabold ${kpi.tone}`}>{kpi.value}</p>
              <p className="mt-1 text-xs font-semibold text-earth-700">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 overflow-hidden rounded-2xl bg-olive-100">
          <svg viewBox="0 0 320 220" className="h-auto w-full">
            <path
              d="M20 60 C 60 20, 140 30, 180 18 C 230 6, 290 30, 300 80 C 310 130, 280 170, 230 196 C 180 218, 110 210, 70 186 C 30 162, 6 110, 20 60 Z"
              fill="var(--color-olive-200)"
              stroke="var(--color-olive-400)"
              strokeWidth="2"
            />
            <path
              d="M40 140 C 90 120, 120 150, 170 130 C 220 110, 250 140, 300 120"
              fill="none"
              stroke="#8fb3c9"
              strokeWidth="6"
              strokeLinecap="round"
              opacity="0.7"
            />
            <path
              d="M110 30 L 130 200 M 200 20 L 190 205 M 40 100 L 295 95"
              stroke="var(--color-olive-400)"
              strokeWidth="1"
              strokeDasharray="4 5"
              opacity="0.6"
            />
            {HOTSPOTS.map((spot) => (
              <g key={spot.label}>
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r="14"
                  fill={spot.color}
                  opacity="0.25"
                  className="origin-center [transform-box:fill-box] motion-safe:animate-ping"
                />
                <circle
                  cx={spot.x}
                  cy={spot.y}
                  r="6"
                  fill={spot.color}
                  stroke="white"
                  strokeWidth="2"
                />
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-earth-800">
          {[
            ["bg-alert", "High risk"],
            ["bg-gold", "Medium risk"],
            ["bg-verified", "Verified"],
          ].map(([dot, label]) => (
            <span
              key={label}
              className="flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1"
            >
              <span className={`size-2 rounded-full ${dot}`} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
