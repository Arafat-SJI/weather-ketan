import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Key, Check, ExternalLink, Trash2, Eye, EyeOff } from "lucide-react";
import { getApiKey, setApiKey, clearApiKey } from "@/lib/openweather";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Atmos" },
      { name: "description", content: "Connect your OpenWeather API key to enable live air quality data." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [value, setValue] = useState("");
  const [saved, setSaved] = useState<string | null>(null);
  const [reveal, setReveal] = useState(false);
  const [status, setStatus] = useState<null | { ok: boolean; msg: string }>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const k = getApiKey();
    setSaved(k);
    setValue(k ?? "");
  }, []);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(value.trim());
    setSaved(value.trim() || null);
    setStatus({ ok: true, msg: "API key saved locally on this device." });
  };

  const remove = () => {
    clearApiKey();
    setSaved(null);
    setValue("");
    setStatus({ ok: true, msg: "API key removed." });
  };

  const test = async () => {
    const key = value.trim();
    if (!key) return;
    setTesting(true);
    setStatus(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=51.5&lon=-0.12&appid=${key}`
      );
      if (res.ok) {
        setStatus({ ok: true, msg: "Connection successful — air quality data is reachable." });
      } else {
        const body = await res.text();
        setStatus({ ok: false, msg: `API responded ${res.status}: ${body.slice(0, 120)}` });
      }
    } catch (err: any) {
      setStatus({ ok: false, msg: err?.message ?? "Network error" });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 space-y-8">
      <header>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Settings</p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold mt-1">API connection</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xl">
          Atmos uses the OpenWeather API to fetch live air quality, weather, and forecast data.
          Add your personal API key below — it is stored only in your browser (localStorage) and never sent to our servers.
        </p>
      </header>

      <section className="rounded-2xl border border-border/60 bg-surface/60 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Key className="h-4 w-4 text-primary" />
          <h2 className="font-display text-lg font-semibold">OpenWeather API key</h2>
          {saved && (
            <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[color:var(--aqi-good)]/15 px-2 py-0.5 text-[11px] text-[color:var(--aqi-good)]">
              <Check className="h-3 w-3" /> Connected
            </span>
          )}
        </div>

        <form onSubmit={save} className="space-y-3">
          <label htmlFor="key" className="block text-sm font-medium">
            API key
          </label>
          <div className="relative">
            <input
              id="key"
              type={reveal ? "text" : "password"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="e.g. 8f2a1c…"
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 pr-10 text-sm font-mono outline-none focus:ring-2 focus:ring-primary/40"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setReveal((r) => !r)}
              aria-label={reveal ? "Hide key" : "Show key"}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              {reveal ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              <Check className="h-4 w-4" /> Save key
            </button>
            <button
              type="button"
              onClick={test}
              disabled={!value.trim() || testing}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm hover:bg-surface-2 disabled:opacity-50"
            >
              {testing ? "Testing…" : "Test connection"}
            </button>
            {saved && (
              <button
                type="button"
                onClick={remove}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted ml-auto"
              >
                <Trash2 className="h-4 w-4" /> Remove
              </button>
            )}
          </div>

          {status && (
            <p
              role="status"
              className={`text-xs mt-2 ${status.ok ? "text-[color:var(--aqi-good)]" : "text-[color:var(--aqi-unhealthy)]"}`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </section>

      <section className="rounded-2xl border border-border/60 bg-surface/40 p-6 space-y-3 text-sm">
        <h3 className="font-display text-base font-semibold">How to get a key</h3>
        <ol className="list-decimal pl-5 space-y-1.5 text-muted-foreground">
          <li>Create a free account at openweathermap.org.</li>
          <li>Open the “API keys” tab in your profile.</li>
          <li>Copy your default key (or generate a new one) and paste it above.</li>
          <li>New keys can take up to a few hours to activate.</li>
        </ol>
        <a
          href="https://home.openweathermap.org/api_keys"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
        >
          Open OpenWeather dashboard <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <p className="text-xs text-muted-foreground pt-2">
          Note: the One Call 3.0 “weather overview” endpoint requires a paid subscription.
          Air quality and basic weather work with the free tier.
        </p>
      </section>
    </div>
  );
}
