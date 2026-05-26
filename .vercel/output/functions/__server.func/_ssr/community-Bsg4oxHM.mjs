import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { M as MAJOR_CITIES, g as generateCityData, a as getAqiLevel } from "./aqi-DpxzJaXk.mjs";
import { c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import { S as Share2 } from "./share-2-B957KKN0.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$2 = [
  [
    "path",
    {
      d: "M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528",
      key: "1jaruq"
    }
  ]
];
const Flag = createLucideIcon("flag", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
      key: "18887p"
    }
  ]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z",
      key: "emmmcr"
    }
  ],
  ["path", { d: "M7 10v12", key: "1qc93n" }]
];
const ThumbsUp = createLucideIcon("thumbs-up", __iconNode);
function WorldHotspotMap() {
  const [active, setActive] = reactExports.useState(null);
  const points = reactExports.useMemo(
    () => MAJOR_CITIES.map((c) => ({ ...c, aqi: generateCityData(c.name).aqi })),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full overflow-hidden rounded-2xl border border-border/60 bg-surface/60 backdrop-blur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 75", className: "w-full h-auto block relative", role: "img", "aria-label": "World map showing air quality hotspots", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { fill: "oklch(0.28 0.05 230 / 60%)", stroke: "oklch(0.40 0.05 220 / 50%)", strokeWidth: "0.15", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5,18 Q10,12 18,14 L26,18 L30,28 L24,38 L14,42 L8,32 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M27,46 L33,46 L36,58 L32,70 L28,70 L25,58 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M44,20 L56,18 L58,28 L52,32 L46,30 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M46,34 L58,32 L60,46 L54,60 L48,58 L45,46 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M58,16 L86,18 L90,30 L82,42 L70,42 L62,34 L58,26 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M68,38 L74,38 L72,48 L68,46 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M78,52 L86,54 L88,58 L80,60 Z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M84,62 L94,62 L94,70 L86,72 Z" })
      ] }),
      points.map((p) => {
        const level = getAqiLevel(p.aqi);
        const r = 0.8 + p.aqi / 300 * 2;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { onMouseEnter: () => setActive(p.name), onMouseLeave: () => setActive(null), className: "cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: p.cx, cy: p.cy, r: r + 1.5, fill: level.colorVar, opacity: "0.25", children: /* @__PURE__ */ jsxRuntimeExports.jsx("animate", { attributeName: "r", values: `${r + 1.5};${r + 3};${r + 1.5}`, dur: "2.5s", repeatCount: "indefinite" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: p.cx, cy: p.cy, r, fill: level.colorVar, stroke: "white", strokeWidth: "0.15" }),
          active === p.name && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: p.cx + 1.5, y: p.cy - 4, width: "18", height: "6", rx: "1", fill: "oklch(0.16 0.04 240 / 95%)", stroke: level.colorVar, strokeWidth: "0.15" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { x: p.cx + 2.5, y: p.cy - 1.8, fontSize: "2", fill: "white", fontWeight: "600", children: p.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { x: p.cx + 2.5, y: p.cy + 0.6, fontSize: "2", fill: level.colorVar, children: [
              "AQI ",
              p.aqi,
              " · ",
              level.label
            ] })
          ] })
        ] }, p.name);
      })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 text-[10px]", children: ["Good", "Moderate", "Sensitive", "Unhealthy", "Very Unhealthy"].map((l, i) => {
      const v = ["var(--aqi-good)", "var(--aqi-moderate)", "var(--aqi-sensitive)", "var(--aqi-unhealthy)", "var(--aqi-very-unhealthy)"][i];
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5 rounded-full bg-background/70 px-2 py-0.5 backdrop-blur", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full", style: { background: v } }),
        l
      ] }, l);
    }) })
  ] });
}
const initialReports = [{
  id: 1,
  user: "Aisha · Delhi",
  text: "Heavy smoke from construction site near Connaught Place.",
  time: "12m ago",
  likes: 14,
  tag: "Dust"
}, {
  id: 2,
  user: "Marco · Milan",
  text: "Idling diesel trucks outside school zone all morning.",
  time: "47m ago",
  likes: 9,
  tag: "Traffic"
}, {
  id: 3,
  user: "Sara · São Paulo",
  text: "Illegal burning at the edge of the forest visible from highway.",
  time: "2h ago",
  likes: 31,
  tag: "Fire"
}, {
  id: 4,
  user: "Kenji · Tokyo",
  text: "Strong chemical smell near industrial zone — air feels heavy.",
  time: "5h ago",
  likes: 6,
  tag: "Industry"
}];
function CommunityPage() {
  const [reports, setReports] = reactExports.useState(initialReports);
  const [text, setText] = reactExports.useState("");
  const [tag, setTag] = reactExports.useState("Traffic");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Community" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "Citizen air watch" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 max-w-2xl", children: "Crowdsourced pollution reports complement official monitoring stations. Together, we can paint a fuller picture of the air we breathe." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-4 lg:grid-cols-[1fr_380px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-xl font-semibold", children: "Community map" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(WorldHotspotMap, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
          e.preventDefault();
          if (!text.trim()) return;
          setReports([{
            id: Date.now(),
            user: "You",
            text,
            time: "now",
            likes: 0,
            tag
          }, ...reports]);
          setText("");
        }, className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display text-lg font-semibold flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { className: "h-4 w-4 text-primary" }),
            " Report pollution"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), placeholder: "What did you see, smell, or experience?", className: "mt-3 w-full min-h-24 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Tag:" }),
            ["Traffic", "Industry", "Dust", "Fire", "Odor"].map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setTag(t), className: `text-xs rounded-full px-2.5 py-1 border ${tag === t ? "bg-primary text-primary-foreground border-primary" : "border-border/80 text-muted-foreground hover:text-foreground"}`, children: t }, t))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-4 w-4" }),
            " Submit report"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border/60 bg-surface/60 p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-lg font-semibold", children: "Recent reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-3 space-y-3", children: reports.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "rounded-xl bg-background/40 p-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: r.user }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: r.time })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm mt-1", children: r.text }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] rounded-full bg-primary/15 text-primary px-2 py-0.5", children: r.tag }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setReports(reports.map((x) => x.id === r.id ? {
                  ...x,
                  likes: x.likes + 1
                } : x)), className: "inline-flex items-center gap-1 hover:text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "h-3.5 w-3.5" }),
                  " ",
                  r.likes
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "inline-flex items-center gap-1 hover:text-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "h-3.5 w-3.5" }),
                  " Share"
                ] })
              ] })
            ] })
          ] }, r.id)) })
        ] })
      ] })
    ] })
  ] });
}
export {
  CommunityPage as component
};
