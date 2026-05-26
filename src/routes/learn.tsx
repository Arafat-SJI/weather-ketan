import { createFileRoute } from "@tanstack/react-router";
import { POLLUTANTS_BASE, AQI_LEVELS } from "@/lib/aqi";
import { Leaf, Bike, Plug, Recycle, Trees } from "lucide-react";

export const Route = createFileRoute("/learn")({
  head: () => ({
    meta: [
      { title: "What is AQI? — Atmos" },
      { name: "description", content: "Understand the Air Quality Index, the health effects of each pollutant, and tips to reduce your carbon footprint." },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-10">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Learn</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Understanding air quality</h1>
        <p className="text-sm text-muted-foreground mt-2 max-w-2xl">
          The Air Quality Index (AQI) translates pollutant concentrations into a single number from 0 to 500.
          Lower is better. Here's what it means for your health and what you can do.
        </p>
      </header>

      <section>
        <h2 className="font-display text-2xl font-semibold mb-3">The AQI scale</h2>
        <div className="overflow-hidden rounded-2xl border border-border/60">
          <table className="w-full text-sm">
            <thead className="bg-surface text-muted-foreground text-xs uppercase tracking-widest">
              <tr>
                <th className="px-4 py-3 text-left">Range</th>
                <th className="px-4 py-3 text-left">Level</th>
                <th className="px-4 py-3 text-left">What it means</th>
              </tr>
            </thead>
            <tbody>
              {AQI_LEVELS.map((l) => (
                <tr key={l.label} className="border-t border-border/60">
                  <td className="px-4 py-3 font-mono text-xs">{l.range[0]}–{l.range[1]}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ background: l.colorVar }} />
                      <span className="font-medium">{l.label}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{l.recommendation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold mb-3">The six key pollutants</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {POLLUTANTS_BASE.map((p) => (
            <article key={p.key} className="rounded-2xl border border-border/60 bg-surface/60 p-5">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <span className="text-xs text-muted-foreground">Safe ≤ {p.safe} {p.unit}</span>
              </div>
              <p className="text-xs text-muted-foreground">{p.fullName}</p>
              <p className="mt-3 text-sm leading-relaxed">{p.effects}</p>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-display text-2xl font-semibold mb-3">Reduce your footprint</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Bike, title: "Walk, cycle, transit", body: "Skip short car trips. Transport is a top urban polluter." },
            { icon: Plug, title: "Switch to clean energy", body: "Choose a green tariff or install rooftop solar." },
            { icon: Recycle, title: "Buy less, repair more", body: "Manufacturing is energy-intensive. Extend product life." },
            { icon: Trees, title: "Plant & protect", body: "Trees filter PM and cool cities by several degrees." },
          ].map((t) => (
            <div key={t.title} className="rounded-2xl border border-border/60 bg-surface/60 p-5">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30 text-primary">
                <t.icon className="h-5 w-5" />
              </span>
              <h3 className="font-display text-base font-semibold mt-3">{t.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border/60 bg-surface/60 p-6">
        <div className="flex items-start gap-4">
          <Leaf className="h-6 w-6 text-primary flex-shrink-0" />
          <div>
            <h2 className="font-display text-xl font-semibold">Local initiatives</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Many cities run citizen-science programs, low-emission zones, and tree-planting drives. Check your municipal environment office, or look up groups like Breathe London, AirNow, or local Friends of the Earth chapters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
