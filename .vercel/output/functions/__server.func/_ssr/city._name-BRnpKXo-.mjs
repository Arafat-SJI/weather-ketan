import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { R as Route2, L as Link, S as Settings, W as Wind, c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import { u as useQuery, C as CitySearch } from "./city-search-CS4_Z8VU.mjs";
import { g as generateCityData, P as POLLUTANTS_BASE, a as getAqiLevel, M as MAJOR_CITIES } from "./aqi-DpxzJaXk.mjs";
import { T as TrendArea, M as MiniSpark } from "./charts-Bp4GQuYk.mjs";
import { g as getApiKey, f as fetchLiveCityData } from "./openweather-DHjAlr9L.mjs";
import { S as Share2 } from "./share-2-B957KKN0.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$6 = [
  ["path", { d: "M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z", key: "p7xjir" }]
];
const Cloud = createLucideIcon("cloud", __iconNode$6);
const __iconNode$5 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$5);
const __iconNode$4 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1",
      key: "3pnvol"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "2", key: "1822b1" }],
  ["path", { d: "M12 10v12", key: "6ubwww" }],
  ["path", { d: "M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z", key: "9hd38g" }],
  ["path", { d: "M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z", key: "ufn41s" }]
];
const Flower2 = createLucideIcon("flower-2", __iconNode$4);
const __iconNode$3 = [
  ["path", { d: "M16.247 7.761a6 6 0 0 1 0 8.478", key: "1fwjs5" }],
  ["path", { d: "M19.075 4.933a10 10 0 0 1 0 14.134", key: "ehdyv1" }],
  ["path", { d: "M4.925 19.067a10 10 0 0 1 0-14.134", key: "1q22gi" }],
  ["path", { d: "M7.753 16.239a6 6 0 0 1 0-8.478", key: "r2q7qm" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Radio = createLucideIcon("radio", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$2);
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }],
  ["path", { d: "M12 2v2", key: "tus03m" }],
  ["path", { d: "M12 20v2", key: "1lh1kg" }],
  ["path", { d: "m4.93 4.93 1.41 1.41", key: "149t6j" }],
  ["path", { d: "m17.66 17.66 1.41 1.41", key: "ptbguv" }],
  ["path", { d: "M2 12h2", key: "1t8f8n" }],
  ["path", { d: "M20 12h2", key: "1q8mjw" }],
  ["path", { d: "m6.34 17.66-1.41 1.41", key: "1m8zz5" }],
  ["path", { d: "m19.07 4.93-1.41 1.41", key: "1shlcs" }]
];
const Sun = createLucideIcon("sun", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function AqiGauge({ aqi, size = 220 }) {
  const level = getAqiLevel(aqi);
  const pct = Math.min(1, aqi / 300);
  const radius = size / 2 - 14;
  const circ = Math.PI * radius;
  const offset = circ * (1 - pct);
  const cx = size / 2;
  const cy = size / 2 + 10;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size / 2 + 40 }, role: "img", "aria-label": `Air Quality Index ${aqi}, ${level.label}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: size, height: size / 2 + 40, viewBox: `0 0 ${size} ${size / 2 + 40}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "aqi-grad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--aqi-good)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "25%", stopColor: "var(--aqi-moderate)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "50%", stopColor: "var(--aqi-sensitive)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "75%", stopColor: "var(--aqi-unhealthy)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--aqi-very-unhealthy)" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
          fill: "none",
          stroke: "var(--color-muted)",
          strokeWidth: "14",
          strokeLinecap: "round"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`,
          fill: "none",
          stroke: "url(#aqi-grad)",
          strokeWidth: "14",
          strokeLinecap: "round",
          strokeDasharray: circ,
          strokeDashoffset: offset,
          style: { transition: "stroke-dashoffset 800ms ease" }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-end pb-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-5xl font-bold tabular-nums", style: { color: level.colorVar }, children: aqi }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: level.label })
    ] })
  ] });
}
function CityPage() {
  const {
    name
  } = Route2.useParams();
  const city = decodeURIComponent(name);
  const mock = reactExports.useMemo(() => generateCityData(city), [city]);
  const hasKey = typeof window !== "undefined" && !!getApiKey();
  const live = useQuery({
    queryKey: ["live-city", city],
    queryFn: () => fetchLiveCityData(city),
    enabled: hasKey,
    staleTime: 5 * 60 * 1e3,
    retry: 1
  });
  const data = reactExports.useMemo(() => {
    if (!live.data) return mock;
    const l = live.data;
    return {
      ...mock,
      aqi: l.aqi,
      pollutants: POLLUTANTS_BASE.map((p) => ({
        ...p,
        current: l.pollutants[p.key]
      })),
      weather: {
        ...mock.weather,
        ...l.weather
      }
    };
  }, [live.data, mock]);
  const level = getAqiLevel(data.aqi);
  const [range, setRange] = reactExports.useState("7d");
  const tomorrow = Math.max(20, Math.round(data.aqi + (Math.random() - 0.5) * 30));
  const tomorrowLevel = getAqiLevel(tomorrow);
  const comparison = reactExports.useMemo(() => MAJOR_CITIES.slice(0, 6).map((c) => ({
    name: c.name,
    aqi: generateCityData(c.name).aqi
  })).concat({
    name: city,
    aqi: data.aqi
  }).filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i).sort((a, b) => a.aqi - b.aqi).slice(0, 7), [city, data.aqi]);
  const share = async () => {
    const text = `Air quality in ${city}: AQI ${data.aqi} (${level.label}) via Atmos`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Atmos AQI",
          text,
          url: window.location.href
        });
      } catch {
      }
    } else {
      await navigator.clipboard.writeText(`${text} — ${window.location.href}`);
      alert("Link copied to clipboard");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Live air quality" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: [
          live.data?.geo?.name ?? city,
          live.data?.geo?.country && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-base font-normal text-muted-foreground", children: live.data.geo.country })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 inline-flex items-center gap-2", children: live.isFetching ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Fetching live data…" }) : live.data ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "h-3.5 w-3.5 text-[color:var(--aqi-good)]" }),
          " Live · OpenWeather"
        ] }) : live.error ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--aqi-unhealthy)]", children: "API error — showing demo data" }) : hasKey ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Demo data" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          "Demo data · ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings", className: "text-primary hover:underline inline-flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-3 w-3" }),
            "Add API key"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: share, className: "inline-flex items-center gap-2 rounded-lg border border-border/80 bg-surface/60 px-3 py-2 text-sm hover:bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-4 w-4" }),
          " Share"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/alerts", className: "inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4" }),
          " Set alert"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CitySearch, { initial: city }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[420px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative overflow-hidden rounded-2xl border border-border/60 p-6", style: {
        background: `linear-gradient(160deg, color-mix(in oklab, ${level.colorVar} 22%, var(--surface)) 0%, var(--surface) 70%)`
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AqiGauge, { aqi: data.aqi }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 max-w-sm text-sm text-foreground/90", children: level.recommendation }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 grid grid-cols-1 gap-1.5 text-sm w-full", children: level.advice.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 rounded-md bg-background/40 px-3 py-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full", style: {
            background: level.colorVar
          } }),
          a
        ] }, a)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "AQI trend" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Past ",
                range === "7d" ? "7 days" : "30 days"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex rounded-lg border border-border/80 p-0.5 text-xs", children: ["7d", "30d"].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setRange(r), className: `px-2.5 py-1 rounded-md ${range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: r === "7d" ? "7 days" : "30 days" }, r)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendArea, { data: range === "7d" ? data.daily7 : data.daily30, color: level.colorVar })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 grid-cols-2 sm:grid-cols-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherTile, { icon: Cloud, label: data.weather.condition, value: `${data.weather.temp}°`, sub: "Temp" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherTile, { icon: Droplets, label: "Humidity", value: `${data.weather.humidity}%`, sub: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherTile, { icon: Wind, label: "Wind", value: `${data.weather.wind} km/h`, sub: "" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherTile, { icon: Sun, label: "UV index", value: `${data.weather.uv}`, sub: uvLabel(data.weather.uv) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(WeatherTile, { icon: Flower2, label: "Pollen", value: data.weather.pollen, sub: "" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "flex items-end justify-between mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold", children: "Pollutant breakdown" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "24-hour readings and WHO safe limits." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2 xl:grid-cols-3", children: data.pollutants.map((p, idx) => {
        const ratio = Math.min(2, p.current / p.safe);
        const over = p.current > p.safe;
        const color = over ? "var(--aqi-unhealthy)" : "var(--aqi-good)";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: p.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.fullName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl font-bold tabular-nums", style: {
                color
              }, children: p.current }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: p.unit })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-[10px] text-muted-foreground mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Safe: ",
                p.safe
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: p.safe * 2 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative h-1.5 rounded-full bg-muted overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-1/2 w-px bg-foreground/40", "aria-hidden": true }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-y-0 left-0 rounded-full", style: {
                width: `${ratio / 2 * 100}%`,
                background: color
              } })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MiniSpark, { data: data.hourly24(p.current), color }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-muted-foreground leading-relaxed", children: p.effects }),
          over && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-xs font-medium", style: {
            color
          }, children: [
            (p.current / p.safe).toFixed(1),
            "× above WHO safe limit"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "sr-only", children: [
            "Pollutant ",
            idx + 1
          ] })
        ] }, p.key);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 lg:grid-cols-[1fr_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-xl font-semibold flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-5 w-5 text-primary" }),
          " Tomorrow's outlook"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-5xl font-bold tabular-nums", style: {
              color: tomorrowLevel.colorVar
            }, children: tomorrow }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground mt-1", children: tomorrowLevel.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
              "Best window for outdoor activity: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "06:00–09:00" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1", children: [
              "Avoid exertion between ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "15:00–19:00" }),
              " when ozone peaks."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-5 grid grid-cols-5 gap-2", children: data.forecast.map((d) => {
          const fl = getAqiLevel(d.aqi);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-background/40 p-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: d.day }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-lg font-semibold mt-1", children: [
              d.hi,
              "°",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm font-normal", children: [
                "/",
                d.lo,
                "°"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium", style: {
              background: `color-mix(in oklab, ${fl.colorVar} 25%, transparent)`,
              color: fl.colorVar
            }, children: [
              "AQI ",
              d.aqi
            ] })
          ] }, d.day);
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Compare with cities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Lower is better." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-4 space-y-2", children: comparison.map((c) => {
          const lvl = getAqiLevel(c.aqi);
          const max = Math.max(...comparison.map((x) => x.aqi));
          const isCurrent = c.name === city;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-28 text-sm truncate ${isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}`, children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2 rounded-full bg-muted overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-full rounded-full", style: {
              width: `${c.aqi / max * 100}%`,
              background: lvl.colorVar
            } }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-10 text-right tabular-nums text-sm font-medium", style: {
              color: lvl.colorVar
            }, children: c.aqi })
          ] }, c.name);
        }) })
      ] })
    ] })
  ] });
}
function WeatherTile({
  icon: Icon,
  label,
  value,
  sub
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/60 bg-surface/60 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-3.5 w-3.5 text-muted-foreground" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xl font-semibold mt-1", children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground", children: sub })
  ] });
}
function uvLabel(uv) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very high";
  return "Extreme";
}
export {
  CityPage as component
};
