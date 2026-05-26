import { L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { A as AQI_LEVELS, P as POLLUTANTS_BASE } from "./aqi-DpxzJaXk.mjs";
import { c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import { L as Leaf } from "./leaf-BHuzJAEM.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$3 = [
  ["circle", { cx: "18.5", cy: "17.5", r: "3.5", key: "15x4ox" }],
  ["circle", { cx: "5.5", cy: "17.5", r: "3.5", key: "1noe27" }],
  ["circle", { cx: "15", cy: "5", r: "1", key: "19l28e" }],
  ["path", { d: "M12 17.5V14l-3-3 4-3 2 3h2", key: "1npguv" }]
];
const Bike = createLucideIcon("bike", __iconNode$3);
const __iconNode$2 = [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  [
    "path",
    { d: "M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z", key: "1xoxul" }
  ],
  ["path", { d: "M9 8V2", key: "14iosj" }]
];
const Plug = createLucideIcon("plug", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5",
      key: "x6z5xu"
    }
  ],
  [
    "path",
    {
      d: "M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12",
      key: "1x4zh5"
    }
  ],
  ["path", { d: "m14 16-3 3 3 3", key: "f6jyew" }],
  ["path", { d: "M8.293 13.596 7.196 9.5 3.1 10.598", key: "wf1obh" }],
  [
    "path",
    {
      d: "m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843",
      key: "9tzpgr"
    }
  ],
  ["path", { d: "m13.378 9.633 4.096 1.098 1.097-4.096", key: "1oe83g" }]
];
const Recycle = createLucideIcon("recycle", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z", key: "1l6gj6" }],
  ["path", { d: "M7 16v6", key: "1a82de" }],
  ["path", { d: "M13 19v3", key: "13sx9i" }],
  [
    "path",
    {
      d: "M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5",
      key: "1sj9kv"
    }
  ]
];
const Trees = createLucideIcon("trees", __iconNode);
function LearnPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Learn" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "Understanding air quality" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-2xl", children: "The Air Quality Index (AQI) translates pollutant concentrations into a single number from 0 to 500. Lower is better. Here's what it means for your health and what you can do." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold mb-3", children: "The AQI scale" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden rounded-2xl border border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { className: "bg-surface text-muted-foreground text-xs uppercase tracking-widest", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left", children: "What it means" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: AQI_LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-t border-border/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 font-mono text-xs", children: [
            l.range[0],
            "–",
            l.range[1]
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2.5 w-2.5 rounded-full", style: {
              background: l.colorVar
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: l.label })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground", children: l.recommendation })
        ] }, l.label)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold mb-3", children: "The six key pollutants" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 md:grid-cols-2", children: POLLUTANTS_BASE.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
            "Safe ≤ ",
            p.safe,
            " ",
            p.unit
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: p.fullName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-sm leading-relaxed", children: p.effects })
      ] }, p.key)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-2xl font-semibold mb-3", children: "Reduce your footprint" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [{
        icon: Bike,
        title: "Walk, cycle, transit",
        body: "Skip short car trips. Transport is a top urban polluter."
      }, {
        icon: Plug,
        title: "Switch to clean energy",
        body: "Choose a green tariff or install rooftop solar."
      }, {
        icon: Recycle,
        title: "Buy less, repair more",
        body: "Manufacturing is energy-intensive. Extend product life."
      }, {
        icon: Trees,
        title: "Plant & protect",
        body: "Trees filter PM and cool cities by several degrees."
      }].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30 text-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx(t.icon, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold mt-3", children: t.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: t.body })
      ] }, t.title)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "rounded-2xl border border-border/60 bg-surface/60 p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Leaf, { className: "h-6 w-6 text-primary flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Local initiatives" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Many cities run citizen-science programs, low-emission zones, and tree-planting drives. Check your municipal environment office, or look up groups like Breathe London, AirNow, or local Friends of the Earth chapters." })
      ] })
    ] }) })
  ] });
}
export {
  LearnPage as component
};
