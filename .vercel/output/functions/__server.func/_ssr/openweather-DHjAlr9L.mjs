const KEY_STORAGE = "atmos:openweather:key";
function getApiKey() {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(KEY_STORAGE);
}
function setApiKey(key) {
  if (typeof window === "undefined") return;
  if (key) window.localStorage.setItem(KEY_STORAGE, key);
  else window.localStorage.removeItem(KEY_STORAGE);
  window.dispatchEvent(new Event("atmos:key-changed"));
}
function clearApiKey() {
  setApiKey("");
}
async function jget(url) {
  const res = await fetch(url);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`OpenWeather ${res.status}: ${body.slice(0, 120) || res.statusText}`);
  }
  return res.json();
}
async function geocodeCity(city, key) {
  const data = await jget(
    `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${key}`
  );
  if (!data?.length) return null;
  const g = data[0];
  return { lat: g.lat, lon: g.lon, name: g.name, country: g.country, state: g.state };
}
function owmToUsAqi(o) {
  return { 1: 25, 2: 75, 3: 125, 4: 175, 5: 275 }[o] ?? 100;
}
function pm25ToAqi(pm) {
  const bp = [
    [0, 12, 0, 50],
    [12.1, 35.4, 51, 100],
    [35.5, 55.4, 101, 150],
    [55.5, 150.4, 151, 200],
    [150.5, 250.4, 201, 300],
    [250.5, 500.4, 301, 500]
  ];
  for (const [cl, ch, il, ih] of bp) {
    if (pm >= cl && pm <= ch) {
      return Math.round((ih - il) / (ch - cl) * (pm - cl) + il);
    }
  }
  return pm > 500 ? 500 : 0;
}
async function fetchOverview(lat, lon, key) {
  try {
    const data = await jget(
      `https://api.openweathermap.org/data/3.0/onecall/overview?lat=${lat}&lon=${lon}&appid=${key}`
    );
    return data.weather_overview;
  } catch {
    return void 0;
  }
}
async function fetchLiveCityData(city) {
  const key = getApiKey();
  if (!key) return null;
  const geo = await geocodeCity(city, key);
  if (!geo) throw new Error(`City "${city}" not found`);
  const { lat, lon } = geo;
  const [air, weather, forecast, overview] = await Promise.all([
    jget(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`),
    jget(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`),
    jget(`https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${key}`).catch(() => null),
    fetchOverview(lat, lon, key)
  ]);
  const list0 = air?.list?.[0];
  const c = list0?.components ?? {};
  const owmAqi = list0?.main?.aqi ?? 3;
  const aqi = c.pm2_5 != null ? pm25ToAqi(c.pm2_5) : owmToUsAqi(owmAqi);
  return {
    source: "live",
    geo,
    aqi,
    owmAqi,
    pollutants: {
      pm25: round1(c.pm2_5 ?? 0),
      pm10: round1(c.pm10 ?? 0),
      o3: round1(c.o3 ?? 0),
      no2: round1(c.no2 ?? 0),
      so2: round1(c.so2 ?? 0),
      co: round1((c.co ?? 0) / 1e3)
      // µg/m³ → mg/m³
    },
    weather: {
      temp: Math.round(weather?.main?.temp ?? 0),
      humidity: Math.round(weather?.main?.humidity ?? 0),
      wind: Math.round((weather?.wind?.speed ?? 0) * 3.6),
      // m/s → km/h
      condition: weather?.weather?.[0]?.main ?? "Clear"
    },
    overview,
    forecastAqi: (forecast?.list ?? []).slice(0, 24).map((x) => ({
      ts: x.dt * 1e3,
      aqi: x.components?.pm2_5 != null ? pm25ToAqi(x.components.pm2_5) : owmToUsAqi(x.main?.aqi ?? 3)
    })),
    historyAqi: []
  };
}
function round1(n) {
  return Math.round(n * 10) / 10;
}
export {
  clearApiKey as c,
  fetchLiveCityData as f,
  getApiKey as g,
  pm25ToAqi as p,
  setApiKey as s
};
