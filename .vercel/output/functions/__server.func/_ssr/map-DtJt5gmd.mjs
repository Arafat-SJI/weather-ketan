import { L as jsxRuntimeExports, U as reactExports } from "./server-B2Kjs41y.mjs";
import { L as Link } from "./router-BEQnLJVo.mjs";
import { g as getApiKey } from "./openweather-DHjAlr9L.mjs";
import { M as MapContainer, T as TileLayer } from "./leaflet-D5TcdBfy.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const LAYERS = [
  { key: "temp_new", label: "Temperature" },
  { key: "precipitation_new", label: "Precipitation" },
  { key: "wind_new", label: "Wind" }
];
const LEGENDS = {
  temp_new: {
    label: "Temperature (°C)",
    stops: [
      { color: "#821692", value: "-40" },
      { color: "#208cec", value: "-20" },
      { color: "#23dddd", value: "0" },
      { color: "#c2ff28", value: "10" },
      { color: "#fff028", value: "20" },
      { color: "#ffc228", value: "25" },
      { color: "#fc8014", value: "30" }
    ]
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
      { color: "#7c1cd1", value: "200+" }
    ]
  },
  wind_new: {
    label: "Wind speed (m/s)",
    stops: [
      { color: "#ffffff", value: "0" },
      { color: "#a4e1ff", value: "5" },
      { color: "#7bb9ff", value: "15" },
      { color: "#7e5cd6", value: "25" },
      { color: "#c93fe6", value: "50" },
      { color: "#e6443f", value: "100+" }
    ]
  }
};
const GOA = [15.2993, 74.124];
function WeatherMap() {
  const [layer, setLayer] = reactExports.useState("temp_new");
  const [apiKey, setKey] = reactExports.useState(null);
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setMounted(true);
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);
  const legend = LEGENDS[layer];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full rounded-2xl border border-border/60 bg-surface/60 overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4 px-4 py-3 border-b border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold", children: "Weather map · Goa" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          role: "radiogroup",
          "aria-label": "Weather layer",
          className: "flex flex-wrap gap-3 text-sm",
          children: LAYERS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "inline-flex items-center gap-1.5 cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "radio",
                name: "weather-layer",
                value: l.key,
                checked: layer === l.key,
                onChange: () => setLayer(l.key),
                className: "accent-primary"
              }
            ),
            l.label
          ] }, l.key))
        }
      ),
      !apiKey && /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/settings", className: "ml-auto text-xs text-primary hover:underline", children: "Add API key in Settings →" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full", style: { height: 400 }, children: [
      mounted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        MapContainer,
        {
          center: GOA,
          zoom: 7,
          style: { height: "100%", width: "100%" },
          scrollWheelZoom: false,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TileLayer,
              {
                attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
                url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
            ),
            apiKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
              TileLayer,
              {
                url: `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`,
                opacity: 0.7,
                attribution: 'Weather data © <a href="https://openweathermap.org">OpenWeather</a>'
              },
              layer
            )
          ]
        }
      ),
      !apiKey && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Weather overlay needs an OpenWeather API key." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border/60", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-2", children: legend.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0", children: legend.stops.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2 w-full", style: { backgroundColor: s.color } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground mt-1 text-center", children: s.value })
      ] }, i)) })
    ] })
  ] });
}
function MapPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Weather map" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "Goa, India" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-xl", children: "Switch between temperature, precipitation, and wind layers from OpenWeather." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherMap, {})
  ] });
}
export {
  MapPage as component
};
