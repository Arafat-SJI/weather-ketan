import { createFileRoute } from "@tanstack/react-router";
import { WeatherMap } from "@/components/weather-map";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Weather map — Atmos" },
      { name: "description", content: "Interactive weather map of Goa with temperature, precipitation, and wind layers." },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10 space-y-6">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Weather map</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">Goa, India</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Switch between temperature, precipitation, and wind layers from OpenWeather.
        </p>
      </header>
      <WeatherMap />
    </div>
  );
}
