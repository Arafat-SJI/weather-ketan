import { useNavigate } from "@tanstack/react-router";
import { MapPin, Search } from "lucide-react";
import { useState } from "react";

export function CitySearch({ initial = "", autoFocus = false }: { initial?: string; autoFocus?: boolean }) {
  const [value, setValue] = useState(initial);
  const navigate = useNavigate();

  const go = (city: string) => {
    if (!city.trim()) return;
    navigate({ to: "/city/$name", params: { name: city.trim() } });
  };

  const detect = () => {
    // Demo: just go to a default city since geolocation reverse-geocoding requires an API
    go("Your Location");
  };

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); go(value); }}
      className="flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-border/80 bg-surface/70 p-2 backdrop-blur"
      role="search"
    >
      <Search className="ml-2 h-5 w-5 text-muted-foreground" aria-hidden />
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Check air quality in your city…"
        aria-label="Search for a city"
        className="flex-1 bg-transparent py-2.5 text-base outline-none placeholder:text-muted-foreground"
      />
      <button
        type="button"
        onClick={detect}
        className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
      >
        <MapPin className="h-3.5 w-3.5" />
        Auto-detect
      </button>
      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        Check
      </button>
    </form>
  );
}
