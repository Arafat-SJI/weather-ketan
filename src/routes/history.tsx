import { createFileRoute } from "@tanstack/react-router";
import { CompareBars, TrendArea } from "@/components/charts";
import { generateCityData, MAJOR_CITIES } from "@/lib/aqi";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Historical air quality trends — Atmos" },
      { name: "description", content: "Monthly and yearly air quality trends, seasonal patterns and year-over-year comparisons." },
    ],
  }),
  component: HistoryPage,
});

function HistoryPage() {
  const [city, setCity] = useState("London");
  const data = useMemo(() => generateCityData(city), [city]);
  const yearTotalCurr = Math.round(data.yearly.reduce((s, m) => s + m.current, 0) / 12);
  const yearTotalPrev = Math.round(data.yearly.reduce((s, m) => s + m.previous, 0) / 12);
  const delta = yearTotalCurr - yearTotalPrev;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Historical trends</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Air quality over time</h1>
        </div>
        <label className="text-sm">
          <span className="block text-xs text-muted-foreground mb-1">City</span>
          <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded-lg border border-border/80 bg-surface px-3 py-2 text-sm">
            {MAJOR_CITIES.map((c) => <option key={c.name}>{c.name}</option>)}
          </select>
        </label>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Card title="This year avg AQI" value={String(yearTotalCurr)} />
        <Card title="Last year avg AQI" value={String(yearTotalPrev)} />
        <Card title="Year-over-year" value={`${delta > 0 ? "+" : ""}${delta}`} sub={delta < 0 ? "Improving" : "Worsening"} good={delta < 0} />
      </div>

      <section className="rounded-2xl border border-border/60 bg-surface/60 p-5">
        <h2 className="font-display text-xl font-semibold mb-2">Monthly: this year vs last year</h2>
        <CompareBars data={data.yearly} />
        <div className="mt-2 flex gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-[color:var(--color-chart-5)]" /> Last year</span>
          <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded bg-primary" /> This year</span>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
          <h3 className="font-display text-lg font-semibold mb-2">30-day trend</h3>
          <TrendArea data={data.daily30} />
        </div>
        <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
          <h3 className="font-display text-lg font-semibold mb-2">Seasonal patterns</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex justify-between"><span>Winter</span><span className="text-muted-foreground">Higher PM2.5 from heating</span></li>
            <li className="flex justify-between"><span>Spring</span><span className="text-muted-foreground">Pollen peaks, moderate AQI</span></li>
            <li className="flex justify-between"><span>Summer</span><span className="text-muted-foreground">Ground-level ozone spikes</span></li>
            <li className="flex justify-between"><span>Autumn</span><span className="text-muted-foreground">Best overall air quality</span></li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function Card({ title, value, sub, good }: { title: string; value: string; sub?: string; good?: boolean }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{title}</p>
      <p className="font-display text-4xl font-bold mt-2 tabular-nums" style={{ color: good === undefined ? "var(--color-foreground)" : good ? "var(--aqi-good)" : "var(--aqi-unhealthy)" }}>{value}</p>
      {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
    </div>
  );
}
