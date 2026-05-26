export type AqiLevel = {
  label: string;
  range: [number, number];
  colorVar: string;
  textClass: string;
  bgClass: string;
  recommendation: string;
  advice: string[];
};

export const AQI_LEVELS: AqiLevel[] = [
  {
    label: "Good",
    range: [0, 50],
    colorVar: "var(--aqi-good)",
    textClass: "text-[color:var(--aqi-good)]",
    bgClass: "bg-[color:var(--aqi-good)]",
    recommendation: "Air quality is satisfactory. Enjoy outdoor activities.",
    advice: ["Great day for a run", "Open the windows", "No mask needed"],
  },
  {
    label: "Moderate",
    range: [51, 100],
    colorVar: "var(--aqi-moderate)",
    textClass: "text-[color:var(--aqi-moderate)]",
    bgClass: "bg-[color:var(--aqi-moderate)]",
    recommendation: "Acceptable for most. Sensitive groups should limit prolonged exertion.",
    advice: ["Sensitive groups take it easy", "Outdoor activities are fine", "Watch for symptoms"],
  },
  {
    label: "Unhealthy for Sensitive",
    range: [101, 150],
    colorVar: "var(--aqi-sensitive)",
    textClass: "text-[color:var(--aqi-sensitive)]",
    bgClass: "bg-[color:var(--aqi-sensitive)]",
    recommendation: "Sensitive groups may experience health effects. General public less likely affected.",
    advice: ["Limit prolonged outdoor exertion", "Children & elderly stay indoors", "Consider a mask"],
  },
  {
    label: "Unhealthy",
    range: [151, 200],
    colorVar: "var(--aqi-unhealthy)",
    textClass: "text-[color:var(--aqi-unhealthy)]",
    bgClass: "bg-[color:var(--aqi-unhealthy)]",
    recommendation: "Everyone may begin to experience health effects. Reduce outdoor activity.",
    advice: ["Wear an N95 mask outdoors", "Close windows", "Run an air purifier"],
  },
  {
    label: "Very Unhealthy",
    range: [201, 300],
    colorVar: "var(--aqi-very-unhealthy)",
    textClass: "text-[color:var(--aqi-very-unhealthy)]",
    bgClass: "bg-[color:var(--aqi-very-unhealthy)]",
    recommendation: "Health alert: serious effects possible for everyone. Avoid outdoor activity.",
    advice: ["Stay indoors", "Seal doors and windows", "Avoid all outdoor exertion"],
  },
  {
    label: "Hazardous",
    range: [301, 500],
    colorVar: "var(--aqi-hazardous)",
    textClass: "text-[color:var(--aqi-hazardous)]",
    bgClass: "bg-[color:var(--aqi-hazardous)]",
    recommendation: "Emergency conditions. Entire population affected.",
    advice: ["Remain indoors", "Wear N95 if you must go out", "Follow local advisories"],
  },
];

export function getAqiLevel(aqi: number): AqiLevel {
  return AQI_LEVELS.find((l) => aqi >= l.range[0] && aqi <= l.range[1]) ?? AQI_LEVELS[AQI_LEVELS.length - 1];
}

export type Pollutant = {
  key: "pm25" | "pm10" | "o3" | "no2" | "so2" | "co";
  name: string;
  fullName: string;
  unit: string;
  safe: number;
  current: number;
  effects: string;
};

export const POLLUTANTS_BASE: Omit<Pollutant, "current">[] = [
  { key: "pm25", name: "PM2.5", fullName: "Fine particulate matter", unit: "µg/m³", safe: 15, effects: "Penetrates deep into lungs and bloodstream; linked to heart and lung disease." },
  { key: "pm10", name: "PM10", fullName: "Coarse particulate matter", unit: "µg/m³", safe: 45, effects: "Irritates airways; can trigger asthma and reduce lung function." },
  { key: "o3",   name: "O₃",   fullName: "Ground-level ozone",        unit: "µg/m³", safe: 100, effects: "Causes throat irritation, coughing, and worsens asthma." },
  { key: "no2",  name: "NO₂",  fullName: "Nitrogen dioxide",          unit: "µg/m³", safe: 25, effects: "Inflames airways and reduces resistance to respiratory infections." },
  { key: "so2",  name: "SO₂",  fullName: "Sulfur dioxide",            unit: "µg/m³", safe: 40, effects: "Causes wheezing and shortness of breath, especially in asthmatics." },
  { key: "co",   name: "CO",   fullName: "Carbon monoxide",           unit: "mg/m³", safe: 4,  effects: "Reduces oxygen delivery to organs; harmful to heart patients." },
];

// Deterministic pseudo-random based on a seed string
export function seededRand(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6D2B79F5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateCityData(city: string) {
  const rnd = seededRand(city.toLowerCase());
  const base = 30 + Math.floor(rnd() * 180);
  const pollutants: Pollutant[] = POLLUTANTS_BASE.map((p) => ({
    ...p,
    current: Math.round((p.safe * (0.4 + rnd() * 1.8)) * 10) / 10,
  }));
  const daily7 = Array.from({ length: 7 }, (_, i) => ({
    day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i],
    aqi: Math.max(10, Math.round(base + (rnd() - 0.5) * 60)),
  }));
  const daily30 = Array.from({ length: 30 }, (_, i) => ({
    day: `${i + 1}`,
    aqi: Math.max(10, Math.round(base + Math.sin(i / 3) * 25 + (rnd() - 0.5) * 50)),
  }));
  const hourly24 = (mult: number) =>
    Array.from({ length: 24 }, (_, i) => ({
      h: `${i}:00`,
      v: Math.max(0, Math.round((mult * (0.6 + Math.sin(i / 4) * 0.3 + rnd() * 0.4)) * 10) / 10),
    }));
  const yearly = Array.from({ length: 12 }, (_, i) => ({
    month: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    current: Math.round(base + Math.sin((i + 2) / 2) * 30 + (rnd() - 0.5) * 20),
    previous: Math.round(base + 15 + Math.sin((i + 2) / 2) * 30 + (rnd() - 0.5) * 20),
  }));
  return {
    aqi: base,
    pollutants,
    daily7,
    daily30,
    hourly24,
    yearly,
    weather: {
      temp: Math.round(10 + rnd() * 22),
      humidity: Math.round(35 + rnd() * 50),
      wind: Math.round(3 + rnd() * 22),
      uv: Math.round(1 + rnd() * 10),
      pollen: ["Low", "Moderate", "High"][Math.floor(rnd() * 3)],
      condition: ["Clear", "Partly Cloudy", "Cloudy", "Hazy", "Light Rain"][Math.floor(rnd() * 5)],
    },
    forecast: Array.from({ length: 5 }, (_, i) => ({
      day: ["Tomorrow", "Wed", "Thu", "Fri", "Sat"][i],
      hi: Math.round(15 + rnd() * 20),
      lo: Math.round(5 + rnd() * 12),
      aqi: Math.max(15, Math.round(base + (rnd() - 0.5) * 70)),
      condition: ["Clear", "Cloudy", "Rain", "Hazy", "Sunny"][Math.floor(rnd() * 5)],
    })),
  };
}

export const MAJOR_CITIES = [
  { name: "Delhi",        cx: 70.5, cy: 38 },
  { name: "Beijing",      cx: 82,   cy: 33 },
  { name: "Tokyo",        cx: 87,   cy: 38 },
  { name: "Jakarta",      cx: 81,   cy: 58 },
  { name: "Mumbai",       cx: 69,   cy: 43 },
  { name: "Cairo",        cx: 56,   cy: 38 },
  { name: "Lagos",        cx: 50,   cy: 53 },
  { name: "São Paulo",    cx: 33,   cy: 64 },
  { name: "Mexico City",  cx: 21,   cy: 46 },
  { name: "Los Angeles",  cx: 15,   cy: 38 },
  { name: "New York",     cx: 25,   cy: 36 },
  { name: "London",       cx: 48,   cy: 27 },
  { name: "Paris",        cx: 49,   cy: 29 },
  { name: "Berlin",       cx: 51,   cy: 27 },
  { name: "Sydney",       cx: 89,   cy: 70 },
  { name: "Reykjavik",    cx: 43,   cy: 18 },
  { name: "Stockholm",    cx: 52,   cy: 22 },
  { name: "Vancouver",    cx: 15,   cy: 28 },
];
