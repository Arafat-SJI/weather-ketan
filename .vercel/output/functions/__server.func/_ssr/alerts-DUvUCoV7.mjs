import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { a as getAqiLevel } from "./aqi-DpxzJaXk.mjs";
import { B as Bell, c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$1 = [
  ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
  ["path", { d: "M22 8c0-2.3-.8-4.3-2-6", key: "5bb3ad" }],
  [
    "path",
    {
      d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
      key: "11g9vi"
    }
  ],
  ["path", { d: "M4 2C2.8 3.7 2 5.7 2 8", key: "tap9e0" }]
];
const BellRing = createLucideIcon("bell-ring", __iconNode$1);
const __iconNode = [
  ["path", { d: "m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7", key: "132q7q" }],
  ["rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", key: "izxlao" }]
];
const Mail = createLucideIcon("mail", __iconNode);
function AlertsPage() {
  const [threshold, setThreshold] = reactExports.useState(100);
  const [email, setEmail] = reactExports.useState("");
  const [city, setCity] = reactExports.useState("London");
  const [saved, setSaved] = reactExports.useState(false);
  const lvl = getAqiLevel(threshold);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Notifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "Stay ahead of the air" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-xl", children: "Get notified when AQI crosses your safe threshold so you can take action — close windows, wear a mask, or stay indoors." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_320px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }, className: "rounded-2xl border border-border/60 bg-surface/60 p-6 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", htmlFor: "city", children: "City" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "city", value: city, onChange: (e) => setCity(e.target.value), className: "mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "text-sm font-medium", htmlFor: "thr", children: [
            "Alert me when AQI exceeds ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-base", style: {
              color: lvl.colorVar
            }, children: threshold }),
            " (",
            lvl.label,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "thr", type: "range", min: 50, max: 300, step: 5, value: threshold, onChange: (e) => setThreshold(Number(e.target.value)), className: "mt-3 w-full", style: {
            accentColor: lvl.colorVar
          } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mt-2 h-2 rounded-full overflow-hidden", style: {
            background: "linear-gradient(to right, var(--aqi-good), var(--aqi-moderate), var(--aqi-sensitive), var(--aqi-unhealthy), var(--aqi-very-unhealthy))"
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 h-4 w-0.5 bg-foreground", style: {
            left: `${(threshold - 50) / 250 * 100}%`
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex justify-between text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Good 50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "150" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "200" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Very Unhealthy 300" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-sm font-medium", htmlFor: "email", children: "Email for notifications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-1.5 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-4 w-4 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "flex-1 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "text-sm font-medium mb-1", children: "Notify me about" }),
          ["When AQI crosses threshold", "Daily morning summary", "Severe weather + air quality combo", "Pollen spikes for allergy season"].map((label) => /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", defaultChecked: true, className: "rounded border-border" }),
            label
          ] }, label))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BellRing, { className: "h-4 w-4" }),
          " Save alert"
        ] }),
        saved && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[color:var(--aqi-good)]", children: "Alert preferences saved (demo)." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-base font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4 text-primary" }),
            " Current advice"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-1.5 text-sm", children: lvl.advice.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0", style: {
              background: lvl.colorVar
            } }),
            a
          ] }, a)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: "Recommended thresholds" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-3 space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Children" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "75" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Adults" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "100" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Asthma / lung conditions" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "50" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Athletes (outdoor training)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "80" })
            ] })
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  AlertsPage as component
};
