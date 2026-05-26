import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { getAqiLevel } from "@/lib/aqi";
import { getApiKey } from "@/lib/openweather";
import { useHotspotAqi } from "@/lib/hotspot-aqi";
import "leaflet/dist/leaflet.css";

function cssVarToColor(varExpr: string): string {
  if (typeof window === "undefined") return "#22c55e";
  const m = varExpr.match(/var\((--[\w-]+)\)/);
  if (!m) return varExpr;
  const v = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim();
  return v || "#22c55e";
}

export function HotspotMap() {
  const [mounted, setMounted] = useState(false);
  const [apiKey, setKey] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);

  const { readings, source, loading } = useHotspotAqi();

  const points = useMemo(
    () => readings.map((r) => ({ ...r, level: getAqiLevel(r.aqi) })),
    [readings]
  );

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-border/60 bg-[#0b1a2c]">
      <div className="absolute top-3 right-3 z-[400] flex items-center gap-2 text-[10px]">
        {loading && (
          <span className="rounded-full bg-background/80 px-2 py-0.5 backdrop-blur text-muted-foreground">
            Loading live AQI…
          </span>
        )}
        <span
          className={`rounded-full px-2 py-0.5 backdrop-blur ${
            source === "live"
              ? "bg-[color:var(--aqi-good)]/20 text-[color:var(--aqi-good)]"
              : "bg-background/80 text-muted-foreground"
          }`}
        >
          {source === "live" ? "Live · OpenWeather" : "Demo data"}
        </span>
      </div>

      <div className="relative w-full" style={{ height: 460 }}>
        {mounted && (
          <MapContainer
            center={[20, 10]}
            zoom={2}
            minZoom={2}
            worldCopyJump
            scrollWheelZoom={false}
            style={{ height: "100%", width: "100%", background: "#0b1a2c" }}
            attributionControl={false}
          >
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              subdomains={["a", "b", "c", "d"]}
              attribution='&copy; OpenStreetMap &copy; CARTO'
            />
            {apiKey && (
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`}
                opacity={0.35}
                attribution='Weather &copy; OpenWeather'
              />
            )}
            {points.map((p) => {
              const color = cssVarToColor(p.level.colorVar);
              const r = 6 + (p.aqi / 300) * 10;
              return (
                <CircleMarker
                  key={p.name}
                  center={[p.lat, p.lon]}
                  radius={r}
                  pathOptions={{
                    color: "#ffffff",
                    weight: 1,
                    fillColor: color,
                    fillOpacity: 0.85,
                  }}
                >
                  <Tooltip direction="top" offset={[0, -4]} opacity={1}>
                    <div className="text-xs">
                      <div className="font-semibold">{p.name}</div>
                      <div style={{ color }}>AQI {p.aqi} · {p.level.label}</div>
                      {source === "live" && p.pm25 > 0 && (
                        <div className="text-muted-foreground">PM2.5 {p.pm25.toFixed(1)} µg/m³</div>
                      )}
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px]">
        {[
          { l: "Good", v: "var(--aqi-good)" },
          { l: "Moderate", v: "var(--aqi-moderate)" },
          { l: "Sensitive", v: "var(--aqi-sensitive)" },
          { l: "Unhealthy", v: "var(--aqi-unhealthy)" },
          { l: "Very Unhealthy", v: "var(--aqi-very-unhealthy)" },
        ].map(({ l, v }) => (
          <span key={l} className="inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-0.5 backdrop-blur">
            <span className="h-2 w-2 rounded-full" style={{ background: v }} />
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HotspotMap;
