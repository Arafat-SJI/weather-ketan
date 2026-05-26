import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { C as CompareBars, T as TrendArea } from "./charts-Bp4GQuYk.mjs";
import { g as generateCityData, M as MAJOR_CITIES } from "./aqi-DpxzJaXk.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
import "./router-BEQnLJVo.mjs";
function HistoryPage() {
  const [city, setCity] = reactExports.useState("London");
  const data = reactExports.useMemo(() => generateCityData(city), [city]);
  const yearTotalCurr = Math.round(data.yearly.reduce((s, m) => s + m.current, 0) / 12);
  const yearTotalPrev = Math.round(data.yearly.reduce((s, m) => s + m.previous, 0) / 12);
  const delta = yearTotalCurr - yearTotalPrev;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Historical trends" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "Air quality over time" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-xs text-muted-foreground mb-1", children: "City" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: city, onChange: (e) => setCity(e.target.value), className: "rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm", children: MAJOR_CITIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { children: c.name }, c.name)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 md:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "This year avg AQI", value: String(yearTotalCurr) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Last year avg AQI", value: String(yearTotalPrev) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { title: "Year-over-year", value: `${delta > 0 ? "+" : ""}${delta}`, sub: delta < 0 ? "Improving" : "Worsening", good: delta < 0 })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold mb-2", children: "Monthly: this year vs last year" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CompareBars, { data: data.yearly }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex gap-4 text-xs text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded bg-[color:var(--color-chart-5)]" }),
          " Last year"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded bg-primary" }),
          " This year"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid gap-4 md:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-2", children: "30-day trend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendArea, { data: data.daily30 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold mb-2", children: "Seasonal patterns" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Winter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Higher PM2.5 from heating" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Spring" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Pollen peaks, moderate AQI" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Summer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Ground-level ozone spikes" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Autumn" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Best overall air quality" })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function Card({
  title,
  value,
  sub,
  good
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-bold mt-2 tabular-nums", style: {
      color: good === void 0 ? "var(--color-foreground)" : good ? "var(--aqi-good)" : "var(--aqi-unhealthy)"
    }, children: value }),
    sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
  ] });
}
export {
  HistoryPage as component
};
