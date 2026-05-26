import { U as reactExports, L as jsxRuntimeExports } from "./server-B2Kjs41y.mjs";
import { g as getApiKey, s as setApiKey, c as clearApiKey } from "./openweather-DHjAlr9L.mjs";
import { c as createLucideIcon } from "./router-BEQnLJVo.mjs";
import "node:async_hooks";
import "node:stream/web";
import "node:stream";
const __iconNode$5 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
const Check = createLucideIcon("check", __iconNode$5);
const __iconNode$4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$4);
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$3);
const __iconNode$2 = [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Eye = createLucideIcon("eye", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4", key: "g0fldk" }],
  ["path", { d: "m21 2-9.6 9.6", key: "1j0ho8" }],
  ["circle", { cx: "7.5", cy: "15.5", r: "5.5", key: "yqb3hr" }]
];
const Key = createLucideIcon("key", __iconNode$1);
const __iconNode = [
  ["path", { d: "M10 11v6", key: "nco0om" }],
  ["path", { d: "M14 11v6", key: "outv1u" }],
  ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode);
function SettingsPage() {
  const [value, setValue] = reactExports.useState("");
  const [saved, setSaved] = reactExports.useState(null);
  const [reveal, setReveal] = reactExports.useState(false);
  const [status, setStatus] = reactExports.useState(null);
  const [testing, setTesting] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const k = getApiKey();
    setSaved(k);
    setValue(k ?? "");
  }, []);
  const save = (e) => {
    e.preventDefault();
    setApiKey(value.trim());
    setSaved(value.trim() || null);
    setStatus({
      ok: true,
      msg: "API key saved locally on this device."
    });
  };
  const remove = () => {
    clearApiKey();
    setSaved(null);
    setValue("");
    setStatus({
      ok: true,
      msg: "API key removed."
    });
  };
  const test = async () => {
    const key = value.trim();
    if (!key) return;
    setTesting(true);
    setStatus(null);
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5&lon=-0.12&appid=${key}`);
      if (res.ok) {
        setStatus({
          ok: true,
          msg: "Connection successful — air quality data is reachable."
        });
      } else {
        const body = await res.text();
        setStatus({
          ok: false,
          msg: `API responded ${res.status}: ${body.slice(0, 120)}`
        });
      }
    } catch (err) {
      setStatus({
        ok: false,
        msg: err?.message ?? "Network error"
      });
    } finally {
      setTesting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-widest text-muted-foreground", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl sm:text-4xl font-bold mt-1", children: "API connection" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground max-w-xl", children: "Atmos uses the OpenWeather API to fetch live air quality, weather, and forecast data. Add your personal API key below — it is stored only in your browser (localStorage) and never sent to our servers." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border/60 bg-surface/60 p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Key, { className: "h-4 w-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-semibold", children: "OpenWeather API key" }),
        saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto inline-flex items-center gap-1 rounded-full bg-[color:var(--aqi-good)]/15 px-2 py-0.5 text-[11px] text-[color:var(--aqi-good)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3 w-3" }),
          " Connected"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: save, className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "key", className: "block text-sm font-medium", children: "API key" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "key", type: reveal ? "text" : "password", value, onChange: (e) => setValue(e.target.value), placeholder: "e.g. 8f2a1c…", className: "w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/40", autoComplete: "off", spellCheck: false }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setReveal((r) => !r), "aria-label": reveal ? "Hide key" : "Show key", className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted", children: reveal ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "h-4 w-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-4 w-4" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2 pt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "submit", className: "inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }),
            " Save key"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: test, disabled: !value.trim() || testing, className: "inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm hover:bg-surface-2 disabled:opacity-50", children: testing ? "Testing…" : "Test connection" }),
          saved && /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { type: "button", onClick: remove, className: "inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted ml-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4" }),
            " Remove"
          ] })
        ] }),
        status && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { role: "status", className: `text-xs mt-2 ${status.ok ? "text-[color:var(--aqi-good)]" : "text-[color:var(--aqi-unhealthy)]"}`, children: status.msg })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "rounded-2xl border border-border/60 bg-surface/40 p-6 space-y-3 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-base font-semibold", children: "How to get a key" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ol", { className: "list-decimal pl-5 space-y-1.5 text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Create a free account at openweathermap.org." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Open the “API keys” tab in your profile." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Copy your default key (or generate a new one) and paste it above." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "New keys can take up to a few hours to activate." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://home.openweathermap.org/api_keys", target: "_blank", rel: "noreferrer", className: "inline-flex items-center gap-1 text-primary hover:underline", children: [
        "Open OpenWeather dashboard ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "h-3.5 w-3.5" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground pt-2", children: "Note: the One Call 3.0 “weather overview” endpoint requires a paid subscription. Air quality and basic weather work with the free tier." })
    ] })
  ] });
}
export {
  SettingsPage as component
};
