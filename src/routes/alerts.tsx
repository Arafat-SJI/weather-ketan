import { createFileRoute } from "@tanstack/react-router";
import { getAqiLevel } from "@/lib/aqi";
import { Bell, BellRing, Mail } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/alerts")({
  head: () => ({
    meta: [
      { title: "Air quality alerts — Atmos" },
      { name: "description", content: "Set personal AQI thresholds and get notified when pollution rises in your city." },
    ],
  }),
  component: AlertsPage,
});

function AlertsPage() {
  const [threshold, setThreshold] = useState(100);
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("London");
  const [saved, setSaved] = useState(false);
  const lvl = getAqiLevel(threshold);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Notifications</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Stay ahead of the air</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-xl">Get notified when AQI crosses your safe threshold so you can take action — close windows, wear a mask, or stay indoors.</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <form
          onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); }}
          className="rounded-2xl border border-border/60 bg-surface/60 p-6 space-y-6"
        >
          <div>
            <label className="text-sm font-medium" htmlFor="city">City</label>
            <input id="city" value={city} onChange={(e) => setCity(e.target.value)} className="mt-1.5 w-full rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" />
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="thr">
              Alert me when AQI exceeds <span className="font-display text-base" style={{ color: lvl.colorVar }}>{threshold}</span> ({lvl.label})
            </label>
            <input id="thr" type="range" min={50} max={300} step={5} value={threshold} onChange={(e) => setThreshold(Number(e.target.value))} className="mt-3 w-full" style={{ accentColor: lvl.colorVar }} />
            <div className="relative mt-2 h-2 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, var(--aqi-good), var(--aqi-moderate), var(--aqi-sensitive), var(--aqi-unhealthy), var(--aqi-very-unhealthy))" }}>
              <div className="absolute -top-1 h-4 w-0.5 bg-foreground" style={{ left: `${((threshold - 50) / 250) * 100}%` }} />
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground">
              <span>Good 50</span><span>100</span><span>150</span><span>200</span><span>Very Unhealthy 300</span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="email">Email for notifications</label>
            <div className="mt-1.5 flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="flex-1 rounded-lg border border-border/80 bg-background px-3 py-2 text-sm" />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium mb-1">Notify me about</legend>
            {[
              "When AQI crosses threshold",
              "Daily morning summary",
              "Severe weather + air quality combo",
              "Pollen spikes for allergy season",
            ].map((label) => (
              <label key={label} className="flex items-center gap-2 text-sm">
                <input type="checkbox" defaultChecked className="rounded border-border" />
                {label}
              </label>
            ))}
          </fieldset>

          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <BellRing className="h-4 w-4" /> Save alert
          </button>
          {saved && <p className="text-sm text-[color:var(--aqi-good)]">Alert preferences saved (demo).</p>}
        </form>

        <aside className="space-y-3">
          <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
            <h3 className="font-display text-base font-semibold flex items-center gap-2"><Bell className="h-4 w-4 text-primary" /> Current advice</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {lvl.advice.map((a) => (
                <li key={a} className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ background: lvl.colorVar }} />{a}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border/60 bg-surface/60 p-5 text-sm">
            <h3 className="font-display text-base font-semibold">Recommended thresholds</h3>
            <ul className="mt-3 space-y-1.5">
              <li className="flex justify-between"><span>Children</span><span className="text-muted-foreground">75</span></li>
              <li className="flex justify-between"><span>Adults</span><span className="text-muted-foreground">100</span></li>
              <li className="flex justify-between"><span>Asthma / lung conditions</span><span className="text-muted-foreground">50</span></li>
              <li className="flex justify-between"><span>Athletes (outdoor training)</span><span className="text-muted-foreground">80</span></li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
