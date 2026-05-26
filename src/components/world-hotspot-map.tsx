import { MAJOR_CITIES, generateCityData, getAqiLevel } from "@/lib/aqi";
import { useMemo, useState } from "react";

// Stylized world map using a simple equirectangular continent SVG
export function WorldHotspotMap() {
  const [active, setActive] = useState<string | null>(null);
  const points = useMemo(
    () => MAJOR_CITIES.map((c) => ({ ...c, aqi: generateCityData(c.name).aqi })),
    []
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/60 backdrop-blur">
      <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      <svg viewBox="0 0 100 75" className="w-full h-auto block relative" role="img" aria-label="World map showing air quality hotspots">
        {/* simple continent silhouettes */}
        <g fill="oklch(0.28 0.05 230 / 60%)" stroke="oklch(0.40 0.05 220 / 50%)" strokeWidth="0.15">
          {/* North America */}
          <path d="M5,18 Q10,12 18,14 L26,18 L30,28 L24,38 L14,42 L8,32 Z" />
          {/* South America */}
          <path d="M27,46 L33,46 L36,58 L32,70 L28,70 L25,58 Z" />
          {/* Europe */}
          <path d="M44,20 L56,18 L58,28 L52,32 L46,30 Z" />
          {/* Africa */}
          <path d="M46,34 L58,32 L60,46 L54,60 L48,58 L45,46 Z" />
          {/* Asia */}
          <path d="M58,16 L86,18 L90,30 L82,42 L70,42 L62,34 L58,26 Z" />
          {/* India */}
          <path d="M68,38 L74,38 L72,48 L68,46 Z" />
          {/* SE Asia / Indonesia */}
          <path d="M78,52 L86,54 L88,58 L80,60 Z" />
          {/* Australia */}
          <path d="M84,62 L94,62 L94,70 L86,72 Z" />
        </g>

        {points.map((p) => {
          const level = getAqiLevel(p.aqi);
          const r = 0.8 + (p.aqi / 300) * 2;
          return (
            <g key={p.name} onMouseEnter={() => setActive(p.name)} onMouseLeave={() => setActive(null)} className="cursor-pointer">
              <circle cx={p.cx} cy={p.cy} r={r + 1.5} fill={level.colorVar} opacity="0.25">
                <animate attributeName="r" values={`${r + 1.5};${r + 3};${r + 1.5}`} dur="2.5s" repeatCount="indefinite" />
              </circle>
              <circle cx={p.cx} cy={p.cy} r={r} fill={level.colorVar} stroke="white" strokeWidth="0.15" />
              {active === p.name && (
                <g>
                  <rect x={p.cx + 1.5} y={p.cy - 4} width="18" height="6" rx="1" fill="oklch(0.16 0.04 240 / 95%)" stroke={level.colorVar} strokeWidth="0.15" />
                  <text x={p.cx + 2.5} y={p.cy - 1.8} fontSize="2" fill="white" fontWeight="600">{p.name}</text>
                  <text x={p.cx + 2.5} y={p.cy + 0.6} fontSize="2" fill={level.colorVar}>AQI {p.aqi} · {level.label}</text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
      <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px]">
        {["Good", "Moderate", "Sensitive", "Unhealthy", "Very Unhealthy"].map((l, i) => {
          const v = ["var(--aqi-good)", "var(--aqi-moderate)", "var(--aqi-sensitive)", "var(--aqi-unhealthy)", "var(--aqi-very-unhealthy)"][i];
          return (
            <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2 py-0.5 backdrop-blur">
              <span className="h-2 w-2 rounded-full" style={{ background: v }} />
              {l}
            </span>
          );
        })}
      </div>
    </div>
  );
}
