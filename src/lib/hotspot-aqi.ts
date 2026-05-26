import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getApiKey, pm25ToAqi } from "@/lib/openweather";
import { generateCityData } from "@/lib/aqi";

export type HotspotCity = { name: string; lat: number; lon: number };

export const HOTSPOT_CITIES: HotspotCity[] = [
  { name: "Delhi",       lat: 28.6139, lon: 77.2090 },
  { name: "Beijing",     lat: 39.9042, lon: 116.4074 },
  { name: "Tokyo",       lat: 35.6762, lon: 139.6503 },
  { name: "Jakarta",     lat: -6.2088, lon: 106.8456 },
  { name: "Mumbai",      lat: 19.0760, lon: 72.8777 },
  { name: "Cairo",       lat: 30.0444, lon: 31.2357 },
  { name: "Lagos",       lat: 6.5244,  lon: 3.3792 },
  { name: "São Paulo",   lat: -23.5505, lon: -46.6333 },
  { name: "Mexico City", lat: 19.4326, lon: -99.1332 },
  { name: "Los Angeles", lat: 34.0522, lon: -118.2437 },
  { name: "New York",    lat: 40.7128, lon: -74.0060 },
  { name: "London",      lat: 51.5074, lon: -0.1278 },
  { name: "Paris",       lat: 48.8566, lon: 2.3522 },
  { name: "Berlin",      lat: 52.52,   lon: 13.405 },
  { name: "Sydney",      lat: -33.8688, lon: 151.2093 },
  { name: "Stockholm",   lat: 59.3293, lon: 18.0686 },
  { name: "Vancouver",   lat: 49.2827, lon: -123.1207 },
];

export type HotspotReading = HotspotCity & { aqi: number; pm25: number };

async function fetchOneAqi(city: HotspotCity, key: string): Promise<HotspotReading> {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${city.lat}&lon=${city.lon}&appid=${key}`
  );
  if (!res.ok) throw new Error(`AQI fetch failed for ${city.name}: ${res.status}`);
  const json = await res.json();
  const c = json?.list?.[0]?.components ?? {};
  const pm25 = Number(c.pm2_5 ?? 0);
  return { ...city, pm25, aqi: pm25ToAqi(pm25) };
}

export type HotspotResult = {
  readings: HotspotReading[];
  source: "live" | "mock";
  loading: boolean;
};

export function useHotspotAqi(): HotspotResult {
  const [apiKey, setKey] = useState<string | null>(null);
  useEffect(() => {
    setKey(getApiKey());
    const onChange = () => setKey(getApiKey());
    window.addEventListener("atmos:key-changed", onChange);
    return () => window.removeEventListener("atmos:key-changed", onChange);
  }, []);

  const query = useQuery({
    queryKey: ["hotspot-aqi", apiKey],
    enabled: !!apiKey,
    staleTime: 5 * 60 * 1000,
    queryFn: async () => {
      const results = await Promise.all(
        HOTSPOT_CITIES.map((c) =>
          fetchOneAqi(c, apiKey!).catch(() => {
            const mock = generateCityData(c.name);
            return { ...c, pm25: 0, aqi: mock.aqi } as HotspotReading;
          })
        )
      );
      return results;
    },
  });

  if (apiKey && query.data) {
    return { readings: query.data, source: "live", loading: false };
  }
  return {
    readings: HOTSPOT_CITIES.map((c) => ({ ...c, pm25: 0, aqi: generateCityData(c.name).aqi })),
    source: "mock",
    loading: !!apiKey && query.isLoading,
  };
}
