// OpenWeather integration. API key is stored in localStorage (client-only).
// Endpoints used:
//  - Geocoding:          https://api.openweathermap.org/geo/1.0/direct
//  - Air Pollution:      https://api.openweathermap.org/data/2.5/air_pollution
//  - Current weather:    https://api.openweathermap.org/data/2.5/weather
//  - One Call overview:  https://api.openweathermap.org/data/3.0/onecall/overview (user-requested)

const KEY_STORAGE = "atmos:openweather:key";

export function getApiKey(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY_STORAGE);
}

export function setApiKey(key: string) {
  if (typeof window === "undefined") return;
  if (key) window.localStorage.setItem(KEY_STORAGE, key);
  else window.localStorage.removeItem(KEY_STORAGE);
  window.dispatchEvent(new Event("atmos:key-changed"));
}

export function clearApiKey() {
  setApiKey("");
}

export type Geo = { lat: number; lon: number; name: string; country?: string; state?: string };

async function jget<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenWeather ${res.status}: ${body.slice(0, 120) || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export async function geocodeCity(city: string, key: string): Promise<Geo | null> {
  const data = await jget<any[]>(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
  );
  if (!data?.length) return null;
  const g = data[0];
  return { lat: g.lat, lon: g.lon, name: g.name, country: g.country, state: g.state };
}

export async function reverseGeocode(lat: number, lon: number, key: string): Promise<Geo | null> {
  const data = await jget<any[]>(
    `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${key}`
  );
  if (!data?.length) return null;
  const g = data[0];
  return { lat, lon, name: g.name, country: g.country, state: g.state };
}

export type LivePollutants = {
  pm25: number; pm10: number; o3: number; no2: number; so2: number; co: number;
};

export type LiveCityData = {
  source: "live";
  geo: Geo;
  aqi: number;            // converted to ~US AQI scale (0–500)
  owmAqi: 1 | 2 | 3 | 4 | 5;
  pollutants: LivePollutants;
  weather: {
    temp: number; humidity: number; wind: number; condition: string;
  };
  overview?: string;      // markdown text from onecall/overview
  forecastAqi: { ts: number; aqi: number }[];
  historyAqi: { ts: number; aqi: number }[];
};

// Convert OpenWeather AQI (1-5) to a representative US-style AQI number.
function owmToUsAqi(o: number): number {
  return ({ 1: 25, 2: 75, 3: 125, 4: 175, 5: 275 } as Record<number, number>)[o] ?? 100;
}

// Better: derive AQI from PM2.5 using US EPA breakpoints (more granular).
export function pm25ToAqi(pm: number): number {
  const bp: [number, number, number, number][] = [
    [0.0, 12.0, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 500.4, 301, 500],
  ];
  for (const [cl, ch, il, ih] of bp) {
    if (pm >= cl && pm <= ch) {
      return Math.round(((ih - il) / (ch - cl)) * (pm - cl) + il);
    }
  }
  return pm > 500 ? 500 : 0;
}

export async function fetchOverview(lat: number, lon: number, key: string): Promise<string | undefined> {
  try {
    const data = await jget<{ weather_overview?: string }>(
      `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return data.weather_overview;
  } catch {
    // One Call 3.0 requires a separate subscription; ignore failures.
    return undefined;
  }
}

export async function fetchLiveCityData(city: string): Promise<LiveCityData | null> {
  const key = getApiKey();
  if (!key) return null;

  const geo = await geocodeCity(city, key);
  if (!geo) throw new Error(`City "${city}" not found`);

  const { lat, lon } = geo;
  const [air, weather, forecast, overview] = await Promise.all([
    jget<any>(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`),
    jget<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`),
    jget<any>(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${key}`).catch(() => null),
    fetchOverview(lat, lon, key),
  ]);

  const list0 = air?.list?.[0];
  const c = list0?.components ?? {};
  const owmAqi = (list0?.main?.aqi ?? 3) as 1 | 2 | 3 | 4 | 5;
  const aqi = c.pm2_5 != null ? pm25ToAqi(c.pm2_5) : owmToUsAqi(owmAqi);

  return {
    source: "live",
    geo,
    aqi,
    owmAqi,
    pollutants: {
      pm25: round1(c.pm2_5 ?? 0),
      pm10: round1(c.pm10 ?? 0),
      o3:   round1(c.o3 ?? 0),
      no2:  round1(c.no2 ?? 0),
      so2:  round1(c.so2 ?? 0),
      co:   round1((c.co ?? 0) / 1000), // µg/m³ → mg/m³
    },
    weather: {
      temp: Math.round(weather?.main?.temp ?? 0),
      humidity: Math.round(weather?.main?.humidity ?? 0),
      wind: Math.round((weather?.wind?.speed ?? 0) * 3.6), // m/s → km/h
      condition: weather?.weather?.[0]?.main ?? "Clear",
    },
    overview,
    forecastAqi: (forecast?.list ?? []).slice(0, 24).map((x: any) => ({
      ts: x.dt * 1000,
      aqi: x.components?.pm2_5 != null ? pm25ToAqi(x.components.pm2_5) : owmToUsAqi(x.main?.aqi ?? 3),
    })),
    historyAqi: [],
  };
}

function round1(n: number) { return Math.round(n * 10) / 10; }
