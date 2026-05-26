import { getAqiLevel } from "@/lib/aqi";

export function AqiGauge({ aqi, size = 220 }: { aqi: number; size?: number }) {
  const level = getAqiLevel(aqi);
  const pct = Math.min(1, aqi / 300);
  const radius = size / 2 - 14;
  const circ = Math.PI * radius; // half circle
  const offset = circ * (1 - pct);
  const cx = size / 2;
  const cy = size / 2 + 10;
  return (
    <div className="relative" style={{ width: size, height: size / 2 + 40 }} role="img" aria-label={`Air Quality Index ${aqi}, ${level.label}`}>
      <svg width={size} height={size / 2 + 40} viewBox={`0 0 ${size} ${size / 2 + 40}`}>
        <defs>
          <linearGradient id="aqi-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--aqi-good)" />
            <stop offset="25%" stopColor="var(--aqi-moderate)" />
            <stop offset="50%" stopColor="var(--aqi-sensitive)" />
            <stop offset="75%" stopColor="var(--aqi-unhealthy)" />
            <stop offset="100%" stopColor="var(--aqi-very-unhealthy)" />
          </linearGradient>
        </defs>
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="var(--color-muted)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="url(#aqi-grad)"
          strokeWidth="14"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 800ms ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
        <span className="font-display text-5xl font-bold tabular-nums" style={{ color: level.colorVar }}>{aqi}</span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{level.label}</span>
      </div>
    </div>
  );
}
