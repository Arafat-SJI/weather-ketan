import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { generateCityData, getAqiLevel, MAJOR_CITIES, POLLUTANTS_BASE } from "@/lib/aqi";
import { AqiGauge } from "@/components/aqi-gauge";
import { CitySearch } from "@/components/city-search";
import { MiniSpark, TrendArea } from "@/components/charts";
import { Cloud, Droplets, Sun, Wind, Flower2, Share2, AlertTriangle, Sparkles, Radio, Settings } from "lucide-react";
import { fetchLiveCityData, getApiKey, type LiveCityData } from "@/lib/openweather";

export const Route = createFileRoute("/city/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${decodeURIComponent(params.name)} air quality — Atmos` },
      { name: "description", content: `Live AQI, pollutant readings and weather for ${decodeURIComponent(params.name)}.` },
    ],
  }),
  component: CityPage,
});

function CityPage() {
  const { name } = Route.useParams();
  const city = decodeURIComponent(name);
  const mock = useMemo(() => generateCityData(city), [city]);
  const hasKey = typeof window !== "undefined" && !!getApiKey();

  const live = useQuery<LiveCityData | null>({
    queryKey: ["live-city", city],
    queryFn: () => fetchLiveCityData(city),
    enabled: hasKey,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  // Merge live readings over the mock skeleton so charts/forecast still render.
  const data = useMemo(() => {
    if (!live.data) return mock;
    const l = live.data;
    return {
      ...mock,
      aqi: l.aqi,
      pollutants: POLLUTANTS_BASE.map((p) => ({
        ...p,
        current: l.pollutants[p.key],
      })),
      weather: { ...mock.weather, ...l.weather },
    };
  }, [live.data, mock]);

  const level = getAqiLevel(data.aqi);
  const [range, setRange] = useState<"7d" | "30d">("7d");

  const tomorrow = Math.max(20, Math.round(data.aqi + (Math.random() - 0.5) * 30));
  const tomorrowLevel = getAqiLevel(tomorrow);

  const comparison = useMemo(
    () =>
      MAJOR_CITIES.slice(0, 6)
        .map((c) => ({ name: c.name, aqi: generateCityData(c.name).aqi }))
        .concat({ name: city, aqi: data.aqi })
        .filter((c, i, arr) => arr.findIndex((x) => x.name === c.name) === i)
        .sort((a, b) => a.aqi - b.aqi)
        .slice(0, 7),
    [city, data.aqi]
  );

  const share = async () => {
    const text = `Air quality in ${city}: AQI ${data.aqi} (${level.label}) via Atmos`;
    if (navigator.share) {
      try { await navigator.share({ title: "Atmos AQI", text, url: window.location.href }); } catch {}
    } else {
      await navigator.clipboard.writeText(`${text} — ${window.location.href}`);
      alert("Link copied to clipboard");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Live air quality</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">
            {live.data?.geo?.name ?? city}
            {live.data?.geo?.country && (
              <span className="ml-2 text-base font-normal text-muted-foreground">{live.data.geo.country}</span>
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1 inline-flex items-center gap-2">
            {live.isFetching ? (
              <>Fetching live data…</>
            ) : live.data ? (
              <><Radio className="h-3.5 w-3.5 text-[color:var(--aqi-good)]" /> Live · OpenWeather</>
            ) : live.error ? (
              <span className="text-[color:var(--aqi-unhealthy)]">API error — showing demo data</span>
            ) : hasKey ? (
              <>Demo data</>
            ) : (
              <>Demo data · <Link to="/settings" className="text-primary hover:underline inline-flex items-center gap-1"><Settings className="h-3 w-3" />Add API key</Link></>
            )}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={share} className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-surface/60 px-3 py-2 text-sm hover:bg-surface">
            <Share2 className="h-4 w-4" /> Share
          </button>
          <Link to="/alerts" className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <AlertTriangle className="h-4 w-4" /> Set alert
          </Link>
        </div>
      </div>

      <div className="max-w-2xl">
        <CitySearch initial={city} />
      </div>

      <div className="grid gap-4 lg:grid-cols-[420px_1fr]">
        {/* AQI hero card */}
        <div
          className="relative overflow-hidden rounded-2xl border border-border/60 p-6"
          style={{ background: `linear-gradient(160deg, color-mix(in oklab, ${level.colorVar} 22%, var(--surface)) 0%, var(--surface) 70%)` }}
        >
          <div className="flex flex-col items-center text-center">
            <AqiGauge aqi={data.aqi} />
            <p className="mt-4 max-w-sm text-sm text-foreground/90">{level.recommendation}</p>
            <ul className="mt-4 grid grid-cols-1 gap-1.5 text-sm w-full">
              {level.advice.map((a) => (
                <li key={a} className="flex items-center gap-2 rounded-md bg-background/40 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: level.colorVar }} />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trend + Weather */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="font-display text-lg font-semibold">AQI trend</h2>
                <p className="text-xs text-muted-foreground">Past {range === "7d" ? "7 days" : "30 days"}</p>
              </div>
              <div className="inline-flex rounded-lg border border-border/80 p-0.5 text-xs">
                {(["7d", "30d"] as const).map((r) => (
                  <button key={r} onClick={() => setRange(r)} className={`px-2.5 py-1 rounded-md ${range === r ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                    {r === "7d" ? "7 days" : "30 days"}
                  </button>
                ))}
              </div>
            </div>
            <TrendArea data={range === "7d" ? data.daily7 : data.daily30} color={level.colorVar} />
          </div>

          <div className="grid gap-3 grid-cols-2 sm:grid-cols-5">
            <WeatherTile icon={Cloud} label={data.weather.condition} value={`${data.weather.temp}°`} sub="Temp" />
            <WeatherTile icon={Droplets} label="Humidity" value={`${data.weather.humidity}%`} sub="" />
            <WeatherTile icon={Wind} label="Wind" value={`${data.weather.wind} km/h`} sub="" />
            <WeatherTile icon={Sun} label="UV index" value={`${data.weather.uv}`} sub={uvLabel(data.weather.uv)} />
            <WeatherTile icon={Flower2} label="Pollen" value={data.weather.pollen} sub="" />
          </div>
        </div>
      </div>

      {/* Pollutant breakdown */}
      <section>
        <header className="flex items-end justify-between mb-3">
          <div>
            <h2 className="font-display text-2xl font-semibold">Pollutant breakdown</h2>
            <p className="text-sm text-muted-foreground">24-hour readings and WHO safe limits.</p>
          </div>
        </header>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {data.pollutants.map((p, idx) => {
            const ratio = Math.min(2, p.current / p.safe);
            const over = p.current > p.safe;
            const color = over ? "var(--aqi-unhealthy)" : "var(--aqi-good)";
            return (
              <article key={p.key} className="rounded-2xl border border-border/60 bg-surface/60 p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.fullName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-2xl font-bold tabular-nums" style={{ color }}>
                      {p.current}
                    </p>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.unit}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground mb-1">
                    <span>0</span>
                    <span>Safe: {p.safe}</span>
                    <span>{p.safe * 2}</span>
                  </div>
                  <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-foreground/40" aria-hidden />
                    <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${(ratio / 2) * 100}%`, background: color }} />
                  </div>
                </div>
                <div className="mt-3">
                  <MiniSpark data={data.hourly24(p.current)} color={color} />
                </div>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{p.effects}</p>
                {over && (
                  <p className="mt-2 text-xs font-medium" style={{ color }}>
                    {(p.current / p.safe).toFixed(1)}× above WHO safe limit
                  </p>
                )}
                <span className="sr-only">Pollutant {idx + 1}</span>
              </article>
            );
          })}
        </div>
      </section>

      {/* Forecast & insights */}
      <section className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
          <h2 className="font-display text-xl font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" /> Tomorrow's outlook
          </h2>
          <div className="mt-3 flex items-center gap-4">
            <div className="text-center">
              <p className="font-display text-5xl font-bold tabular-nums" style={{ color: tomorrowLevel.colorVar }}>{tomorrow}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{tomorrowLevel.label}</p>
            </div>
            <div className="flex-1 text-sm text-muted-foreground">
              <p>
                Best window for outdoor activity: <span className="text-foreground font-medium">06:00–09:00</span>
              </p>
              <p className="mt-1">
                Avoid exertion between <span className="text-foreground font-medium">15:00–19:00</span> when ozone peaks.
              </p>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-5 gap-2">
            {data.forecast.map((d) => {
              const fl = getAqiLevel(d.aqi);
              return (
                <div key={d.day} className="rounded-xl bg-background/40 p-3 text-center">
                  <p className="text-[11px] text-muted-foreground">{d.day}</p>
                  <p className="font-display text-lg font-semibold mt-1">{d.hi}°<span className="text-muted-foreground text-sm font-normal">/{d.lo}°</span></p>
                  <p className="mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium" style={{ background: `color-mix(in oklab, ${fl.colorVar} 25%, transparent)`, color: fl.colorVar }}>
                    AQI {d.aqi}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-surface/60 p-5">
          <h2 className="font-display text-xl font-semibold">Compare with cities</h2>
          <p className="text-sm text-muted-foreground">Lower is better.</p>
          <ul className="mt-4 space-y-2">
            {comparison.map((c) => {
              const lvl = getAqiLevel(c.aqi);
              const max = Math.max(...comparison.map((x) => x.aqi));
              const isCurrent = c.name === city;
              return (
                <li key={c.name} className="flex items-center gap-3">
                  <span className={`w-28 text-sm truncate ${isCurrent ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{c.name}</span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(c.aqi / max) * 100}%`, background: lvl.colorVar }} />
                  </div>
                  <span className="w-10 text-right tabular-nums text-sm font-medium" style={{ color: lvl.colorVar }}>{c.aqi}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}

function WeatherTile({ icon: Icon, label, value, sub }: { icon: any; label: string; value: string; sub: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-surface/60 p-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</span>
        <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
      <p className="font-display text-xl font-semibold mt-1">{value}</p>
      {sub && <p className="text-[11px] text-muted-foreground">{sub}</p>}
    </div>
  );
}

function uvLabel(uv: number) {
  if (uv <= 2) return "Low";
  if (uv <= 5) return "Moderate";
  if (uv <= 7) return "High";
  if (uv <= 10) return "Very high";
  return "Extreme";
}
