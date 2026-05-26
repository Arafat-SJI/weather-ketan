import { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link } from "@tanstack/react-router";
import { getApiKey } from "@/lib/openweather";
import "leaflet/dist/leaflet.css";

type LayerKey = "temp_new" | "precipitation_new" | "wind_new";

const LAYERS: { key: LayerKey; label: string }[] = [
  { key: "temp_new", label: "Temperature" },
  { key: "precipitation_new", label: "Precipitation" },
  { key: "wind_new", label: "Wind" },
];

const LEGENDS: Record<LayerKey, { label: string; stops: { color: string; value: string }[] }> = {
  temp_new: {
    label: "Temperature (°C)",
    stops: [
      { color: "#821692", value: "-40" },
      { color: "#208cec", value: "-20" },
      { color: "#23dddd", value: "0" },
      { color: "#c2ff28", value: "10" },
      { color: "#fff028", value: "20" },
      { color: "#ffc228", value: "25" },
      { color: "#fc8014", value: "30" },
    ],
  },
  precipitation_new: {
    label: "Precipitation (mm)",
    stops: [
      { color: "#fef9ca", value: "0" },
      { color: "#b9f7a8", value: "0.5" },
      { color: "#93f57d", value: "1" },
      { color: "#78c8a4", value: "10" },
      { color: "#5b9a8b", value: "40" },
      { color: "#2929b8", value: "100" },
      { color: "#7c1cd1", value: "200+" },
    ],
  },
  wind_new: {
    label: "Wind speed (m/s)",
    stops: [
      { color: "#ffffff", value: "0" },
      { color: "#a4e1ff", value: "5" },
      { color: "#7bb9ff", value: "15" },
      { color: "#7e5cd6", value: "25" },
      { color: "#c93fe6", value: "50" },
      { color: "#e6443f", value: "100+" },
    ],
  },
};

const GOA: [number, number] = [15.2993, 74.124];

export function WeatherMap() {
  const [layer, setLayer] = useState<LayerKey>("temp_new");
  const [apiKey, setKey] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);

  const legend = LEGENDS[layer];

  return (
    <div className="w-full rounded-2xl border border-border/60 bg-surface/60 overflow-hidden">
      <div className="flex flex-wrap items-center gap-4 px-4 py-3 border-b border-border/60">
        <h2 className="font-display text-sm font-semibold">Weather map · Goa</h2>
        <div
          role="radiogroup"
          aria-label="Weather layer"
          className="flex flex-wrap gap-3 text-sm"
        >
          {LAYERS.map((l) => (
            <label key={l.key} className="inline-flex items-center gap-1.5 cursor-pointer">
              <input
                type="radio"
                name="weather-layer"
                value={l.key}
                checked={layer === l.key}
                onChange={() => setLayer(l.key)}
                className="accent-primary"
              />
              {l.label}
            </label>
          ))}
        </div>
        {!apiKey && (
          <Link to="/settings" className="ml-auto text-xs text-primary hover:underline">
            Add API key in Settings →
          </Link>
        )}
      </div>

      <div className="relative w-full" style={{ height: 400 }}>
        {mounted && (
          <MapContainer
            center={GOA}
            zoom={7}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {apiKey && (
              <TileLayer
                key={layer}
                url={`https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`}
                opacity={0.7}
                attribution='Weather data &copy; <a href="https://openweathermap.org">OpenWeather</a>'
              />
            )}
          </MapContainer>
        )}
        {!apiKey && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm pointer-events-none">
            <p className="text-sm text-muted-foreground">
              Weather overlay needs an OpenWeather API key.
            </p>
          </div>
        )}
      </div>

      <div className="px-4 py-3 border-t border-border/60">
        <p className="text-xs text-muted-foreground mb-2">{legend.label}</p>
        <div className="flex items-center gap-0">
          {legend.stops.map((s, i) => (
            <div key={i} className="flex-1">
              <div className="h-2 w-full" style={{ backgroundColor: s.color }} />
              <p className="text-[10px] text-muted-foreground mt-1 text-center">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherMap;
