import { createFileRoute, Link } from "@tanstack/react-router";
import { CitySearch } from "@/components/city-search";
import { HotspotMap } from "@/components/hotspot-map";
import { getAqiLevel } from "@/lib/aqi";
import { useHotspotAqi } from "@/lib/hotspot-aqi";
import { ArrowUpRight, Globe2, Wind, Leaf } from "lucide-react";
import { useMemo } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atmos — Check air quality in your city" },
      { name: "description", content: "Real-time AQI hotspots around the world. Search any city for detailed pollutant, weather and environmental insights." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { readings, source } = useHotspotAqi();
  const cityData = useMemo(
    () =>
      readings
        .map((r) => ({ name: r.name, aqi: r.aqi }))
        .sort((a, b) => b.aqi - a.aqi),
    [readings]
  );
  const globalAvg = cityData.length
    ? Math.round(cityData.reduce((s, c) => s + c.aqi, 0) / cityData.length)
    : 0;
  const globalLevel = getAqiLevel(globalAvg);
  const worst = cityData.slice(0, 4);
  const best = [...cityData].reverse().slice(0, 4);


  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-[520px] bg-grid opacity-30 [mask-image:linear-gradient(to_bottom,black,transparent)] pointer-events-none" />
      <section className="relative mx-auto max-w-7xl px-4 sm:px-6 pt-14 pb-10">
        <div className="flex flex-col items-center text-center gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            Monitoring 11,000+ stations worldwide
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight max-w-3xl">
            Check air quality in <span className="text-primary">your city</span>.
          </h1>
          <p className="max-w-xl text-base text-muted-foreground">
            Real-time AQI, pollutant breakdown, weather, and personalized health guidance — anywhere on Earth.
          </p>
          <CitySearch autoFocus />
          <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground pt-2">
            <span className="opacity-70">Popular:</span>
            {["London", "Tokyo", "New York", "Delhi", "Paris"].map((c) => (
              <Link key={c} to="/city/$name" params={{ name: c }} className="rounded-full bg-surface px-3 py-1 hover:bg-surface-2 text-foreground transition-colors">
                {c}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 grid gap-4 md:grid-cols-3">
        <Stat icon={Globe2} label="Global avg AQI" value={String(globalAvg)} sub={`${globalLevel.label} · ${source === "live" ? "Live" : "Demo"}`} colorVar={globalLevel.colorVar} />
        <Stat icon={Wind} label="Stations reporting" value="11,248" sub="Last hour" />
        <Stat icon={Leaf} label="Cities monitored" value="1,902" sub="In 174 countries" />
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-8 grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="space-y-3">
          <header className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold">Air quality hotspots</h2>
              <p className="text-sm text-muted-foreground">Hover any city to see live readings.</p>
            </div>
          </header>
          <HotspotMap />
        </div>
        <aside className="space-y-3">
          <Panel title="Most polluted now">
            <CityList items={worst} />
          </Panel>
          <Panel title="Cleanest air right now">
            <CityList items={best} />
          </Panel>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 mt-12 grid gap-4 md:grid-cols-3">
        {[
          { title: "Forecast tomorrow", body: "AI-driven 24h AQI forecast for any monitored city.", to: "/learn", cta: "How it works" },
          { title: "Set personal alerts", body: "Get warned when AQI crosses your safe threshold.", to: "/alerts", cta: "Configure alerts" },
          { title: "Compare years", body: "See how this year stacks against last year, month by month.", to: "/history", cta: "View history" },
        ].map((c) => (
          <Link key={c.title} to={c.to} className="group rounded-2xl border border-border/60 bg-surface/60 p-5 transition-colors hover:bg-surface">
            <h3 className="font-display text-lg font-semibold">{c.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm text-primary group-hover:gap-2 transition-all">
              {c.cta} <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        ))}
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, sub, colorVar }: { icon: any; label: string; value: string; sub: string; colorVar?: string }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/60 p-5 backdrop-blur">
      <div className="flex items-center justify-between">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold tabular-nums" style={{ color: colorVar ?? "var(--color-foreground)" }}>{value}</span>
        <span className="text-sm text-muted-foreground">{sub}</span>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border/60 bg-surface/60 p-4 backdrop-blur">
      <h3 className="text-xs uppercase tracking-widest text-muted-foreground mb-3">{title}</h3>
      {children}
    </div>
  );
}

function CityList({ items }: { items: { name: string; aqi: number }[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((c) => {
        const lvl = getAqiLevel(c.aqi);
        return (
          <li key={c.name}>
            <Link to="/city/$name" params={{ name: c.name }} className="flex items-center justify-between rounded-md px-2 py-1.5 text-sm hover:bg-surface-2 transition-colors">
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: lvl.colorVar }} />
                {c.name}
              </span>
              <span className="tabular-nums font-medium" style={{ color: lvl.colorVar }}>{c.aqi}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
