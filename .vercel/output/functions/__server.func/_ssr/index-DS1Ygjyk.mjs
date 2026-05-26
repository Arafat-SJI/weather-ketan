import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { L as Link, W as Wind, c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import { C as CitySearch, u as useQuery } from "./city-search-CS4_Z8VU.mjs";
import { a as getAqiLevel, g as generateCityData } from "./aqi-DpxzJaXk.mjs";
import { g as getApiKey, p as pm25ToAqi } from "./openweather-DHjAlr9L.mjs";
import { M as MapContainer, T as TileLayer, b as createPathComponent, a as createOverlayComponent, l as leafletSrcExports, c as createElementObject, e as extendContext } from "./leaflet-D5TcdBfy.mjs";
import { L as Leaf } from "./leaf-BHuzJAEM.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode$1);
const __iconNode = [
  ["path", { d: "M21.54 15H17a2 2 0 0 0-2 2v4.54", key: "1djwo0" }],
  [
    "path",
    {
      d: "M7 3.34V5a3 3 0 0 0 3 3a2 2 0 0 1 2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2c0-1.1.9-2 2-2h3.17",
      key: "1tzkfa"
    }
  ],
  ["path", { d: "M11 21.95V18a2 2 0 0 0-2-2a2 2 0 0 1-2-2v-1a2 2 0 0 0-2-2H2.05", key: "14pb5j" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const Earth = createLucideIcon("earth", __iconNode);
function updateCircle(layer, props, prevProps) {
  if (props.center !== prevProps.center) {
    layer.setLatLng(props.center);
  }
  if (props.radius != null && props.radius !== prevProps.radius) {
    layer.setRadius(props.radius);
  }
}
const CircleMarker = createPathComponent(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const marker = new leafletSrcExports.CircleMarker(center, options);
  return createElementObject(marker, extendContext(ctx, {
    overlayContainer: marker
  }));
}, updateCircle);
const Tooltip = createOverlayComponent(function createTooltip(props, context) {
  const tooltip = new leafletSrcExports.Tooltip(props, context.overlayContainer);
  return createElementObject(tooltip, context);
}, function useTooltipLifecycle(element, context, { position }, setOpen) {
  reactExports.useEffect(function addTooltip() {
    const container = context.overlayContainer;
    if (container == null) {
      return;
    }
    const { instance } = element;
    const onTooltipOpen = (event) => {
      if (event.tooltip === instance) {
        if (position != null) {
          instance.setLatLng(position);
        }
        instance.update();
        setOpen(true);
      }
    };
    const onTooltipClose = (event) => {
      if (event.tooltip === instance) {
        setOpen(false);
      }
    };
    container.on({
      tooltipopen: onTooltipOpen,
      tooltipclose: onTooltipClose
    });
    container.bindTooltip(instance);
    return function removeTooltip() {
      container.off({
        tooltipopen: onTooltipOpen,
        tooltipclose: onTooltipClose
      });
      if (container._map != null) {
        container.unbindTooltip();
      }
    };
  }, [
    element,
    context,
    setOpen,
    position
  ]);
});
const HOTSPOT_CITIES = [
  { name: "Delhi", lat: 28.6139, lon: 77.209 },
  { name: "Beijing", lat: 39.9042, lon: 116.4074 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { name: "Jakarta", lat: -6.2088, lon: 106.8456 },
  { name: "Mumbai", lat: 19.076, lon: 72.8777 },
  { name: "Cairo", lat: 30.0444, lon: 31.2357 },
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "New York", lat: 40.7128, lon: -74.006 },
  { name: "London", lat: 51.5074, lon: -0.1278 },
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093 },
  { name: "Stockholm", lat: 59.3293, lon: 18.0686 },
  { name: "Vancouver", lat: 49.2827, lon: -123.1207 }
];
async function fetchOneAqi(city, key) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${key}`
  );
  if (!res.ok) throw new Error(`AQI fetch failed for ${city.name}: ${res.status}`);
  const json = await res.json();
  const c = json?.list?.[0]?.components ?? {};
  const pm25 = Number(c.pm2_5 ?? 0);
  return { ...city, pm25, aqi: pm25ToAqi(pm25) };
}
function useHotspotAqi() {
  const [apiKey, setKey] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);
  const query = useQuery({
    queryKey: ["hotspot-aqi", apiKey],
    enabled: !!apiKey,
    staleTime: 5 * 60 * 1e3,
    queryFn: async () => {
      const results = await Promise.all(
        HOTSPOT_CITIES.map(
          (c) => fetchOneAqi(c, apiKey).catch(() => {
            const mock = generateCityData(c.name);
            return { ...c, pm25: 0, aqi: mock.aqi };
          })
        )
      );
      return results;
    }
  });
  if (apiKey && query.data) {
    return { readings: query.data, source: "live", loading: false };
  }
  return {
    readings: HOTSPOT_CITIES.map((c) => ({ ...c, pm25: 0, aqi: generateCityData(c.name).aqi })),
    source: "mock",
    loading: !!apiKey && query.isLoading
  };
}
function cssVarToColor(varExpr) {
  if (typeof window === "undefined") return "#22c55e";
  const m = varExpr.match(/var\((--[\w-]+)\)/);
  if (!m) return varExpr;
  const v = getComputedStyle(document.documentElement).getPropertyValue(m[1]).trim();
  return v || "#22c55e";
}
function HotspotMap() {
  const [mounted, setMounted] = reactExports.useState(false);
  const [apiKey, setKey] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setMounted(true);
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);
  const { readings, source, loading } = useHotspotAqi();
  const points = reactExports.useMemo(
    () => readings.map((r) => ({ ...r, level: getAqiLevel(r.aqi) })),
    [readings]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-[#0b1a2c]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-3 right-3 z-[400] flex items-center gap-2 text-[10px]", children: [
      loading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-background/80 px-2 py-0.5 backdrop-blur text-muted-foreground", children: "Loading live AQI…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `rounded-full px-2 py-0.5 backdrop-blur ${source === "live" ? "bg-[color:var(--aqi-good)]/20 text-[color:var(--aqi-good)]" : "bg-background/80 text-muted-foreground"}`,
          children: source === "live" ? "Live · OpenWeather" : "Demo data"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full", style: { height: 460 }, children: mounted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      MapContainer,
      {
        center: [20, 10],
        zoom: 2,
        minZoom: 2,
        worldCopyJump: true,
        scrollWheelZoom: false,
        style: { height: "100%", width: "100%", background: "#0b1a2c" },
        attributionControl: false,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TileLayer,
            {
              url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
              subdomains: ["a", "b", "c", "d"],
              attribution: "© OpenStreetMap © CARTO"
            }
          ),
          apiKey && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TileLayer,
            {
              url: `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
              opacity: 0.35,
              attribution: "Weather © OpenWeather"
            }
          ),
          points.map((p) => {
            const color = cssVarToColor(p.level.colorVar);
            const r = 6 + p.aqi / 300 * 10;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              CircleMarker,
              {
                center: [p.lat, p.lon],
                radius: r,
                pathOptions: {
                  color: "#ffffff",
                  weight: 1,
                  fillColor: color,
                  fillOpacity: 0.85
                },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { direction: "top", offset: [0, -4], opacity: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold", children: p.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { color }, children: [
                    "AQI ",
                    p.aqi,
                    " · ",
                    p.level.label
                  ] }),
                  source === "live" && p.pm25 > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-muted-foreground", children: [
                    "PM2.5 ",
                    p.pm25.toFixed(1),
                    " µg/m³"
                  ] })
                ] }) })
              },
              p.name
            );
          })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px]", children: [
      { l: "Good", v: "var(--aqi-good)" },
      { l: "Moderate", v: "var(--aqi-moderate)" },
      { l: "Sensitive", v: "var(--aqi-sensitive)" },
      { l: "Unhealthy", v: "var(--aqi-unhealthy)" },
      { l: "Very Unhealthy", v: "var(--aqi-very-unhealthy)" }
    ].map(({ l, v }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2 py-0.5 backdrop-blur", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: { background: v } }),
      l
    ] }, l)) })
  ] });
}
function HomePage() {
  const {
    readings,
    source
  } = useHotspotAqi();
  const cityData = reactExports.useMemo(() => readings.map((r) => ({
    name: r.name,
    aqi: r.aqi
  })).sort((a, b) => b.aqi - a.aqi), [readings]);
  const globalAvg = cityData.length ? Math.round(cityData.reduce((s, c) => s + c.aqi, 0) / cityData.length) : 0;
  const globalLevel = getAqiLevel(globalAvg);
  const worst = cityData.slice(0, 4);
  const best = [...cityData].reverse().slice(0, 4);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-0 top-0 h-[520px] bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-primary animate-pulse" }),
        "Monitoring 11,000+ stations worldwide"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl", children: [
        "Check air quality in ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "your city" }),
        "."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xl text-base text-muted-foreground", children: "Real-time AQI, pollutant breakdown, weather, and personalized health guidance — anywhere on Earth." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CitySearch, { autoFocus: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-2 text-xs text-muted-foreground pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-70", children: "Popular:" }),
        ["London", "Tokyo", "New York", "Delhi", "Paris"].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/city/$name", params: {
          name: c
        }, className: "rounded-full bg-surface px-3 py-1 hover:bg-surface-2 text-foreground transition-colors", children: c }, c))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Earth, label: "Global avg AQI", value: String(globalAvg), sub: `${globalLevel.label} · ${source === "live" ? "Live" : "Demo"}`, colorVar: globalLevel.colorVar }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Wind, label: "Stations reporting", value: "11,248", sub: "Last hour" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stat, { icon: Leaf, label: "Cities monitored", value: "1,902", sub: "In 174 countries" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 mt-8 grid gap-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Air quality hotspots" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Hover any city to see live readings." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(HotspotMap, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Most polluted now", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CityList, { items: worst }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Cleanest air right now", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CityList, { items: best }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-7xl px-4 sm:px-6 mt-12 grid gap-4 md:grid-cols-3", children: [{
      title: "Forecast tomorrow",
      body: "AI-driven 24h AQI forecast for any monitored city.",
      to: "/learn",
      cta: "How it works"
    }, {
      title: "Set personal alerts",
      body: "Get warned when AQI crosses your safe threshold.",
      to: "/alerts",
      cta: "Configure alerts"
    }, {
      title: "Compare years",
      body: "See how this year stacks against last year, month by month.",
      to: "/history",
      cta: "View history"
    }].map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: c.to, className: "group rounded-2xl border border-border/60 bg-surface/60 p-5 transition-colors hover:bg-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: c.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: c.body }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mt-3 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all", children: [
        c.cta,
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-4 w-4" })
      ] })
    ] }, c.title)) })
  ] });
}
function Stat({
  icon: Icon,
  label,
  value,
  sub,
  colorVar
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-baseline gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold tabular-nums", style: {
        color: colorVar ?? "var(--color-foreground)"
      }, children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: sub })
    ] })
  ] });
}
function Panel({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xs uppercase tracking-widest text-muted-foreground mb-3", children: title }),
    children
  ] });
}
function CityList({
  items
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: items.map((c) => {
    const lvl = getAqiLevel(c.aqi);
    return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/city/$name", params: {
      name: c.name
    }, className: "flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface-2 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: {
          background: lvl.colorVar
        } }),
        c.name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tabular-nums font-medium", style: {
        color: lvl.colorVar
      }, children: c.aqi })
    ] }) }, c.name);
  }) });
}
export {
  HomePage as component
};
