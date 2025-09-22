export type MiniWeather = {
  temp_c?: number;
  humidity_pct?: number;
  rain_chance_pct?: number;
  wind_kph?: number;
  source: "openweather" | "open-meteo";
  as_of: string;
  locality?: string;
};

// Requires NEXT_PUBLIC_OPENWEATHER_KEY in .env.local
const OPENWEATHER = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

export async function getTrustedWeather(lat: number, lon: number, locality: string): Promise<MiniWeather> {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";

  // 1) Primary: OpenWeather current weather + prob (if available)
  if (OPENWEATHER) {
    try {
      const u = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER}&units=metric`;
      const r = await fetch(u, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        // Some OpenWeather responses don’t contain precipitation probability; keep undefined if not present
        const wind_kph = j?.wind?.speed != null ? Math.round(j.wind.speed * 3.6) : undefined;
        return {
          temp_c: j?.main?.temp != null ? Math.round(j.main.temp) : undefined,
          humidity_pct: j?.main?.humidity,
          rain_chance_pct: undefined, // OpenWeather "current" doesn’t return PoP; leave undefined instead of guessing
          wind_kph,
          source: "openweather",
          as_of: new Date().toLocaleString("en-IN", { timeZone: tz }),
          locality
        };
      }
    } catch {}
  }

  // 2) Fallback: Open‑Meteo (explicit timezone and nearest_cell)
  try {
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability&timezone=${encodeURIComponent(tz)}&models=best_match`;
    const r = await fetch(u, { cache: "no-store" });
    const j = await r.json();
    return {
      temp_c: j?.current?.temperature_2m != null ? Math.round(j.current.temperature_2m) : undefined,
      humidity_pct: j?.current?.relative_humidity_2m,
      rain_chance_pct: j?.current?.precipitation_probability,
      wind_kph: j?.current?.wind_speed_10m != null ? Math.round(j.current.wind_speed_10m * 3.6) : undefined,
      source: "open-meteo",
      as_of: new Date().toLocaleString("en-IN", { timeZone: tz }),
      locality
    };
  } catch {}

  return {
    source: "open-meteo",
    as_of: new Date().toLocaleString("en-IN", { timeZone: tz }),
    locality
  };
}
