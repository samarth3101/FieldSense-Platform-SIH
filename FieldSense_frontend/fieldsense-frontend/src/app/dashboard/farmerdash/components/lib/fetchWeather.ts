export type MiniWeather = {
  temp_c?: number;
  humidity_pct?: number;
  rain_chance_pct?: number;
  wind_kph?: number;
  pressure_hpa?: number;
  cloud_pct?: number;
  visibility_km?: number;
  aqi?: number; // placeholder for future AQI integration
  source: "openweather" | "open-meteo";
  as_of: string;
  locality?: string;
};

const OPENWEATHER = process.env.NEXT_PUBLIC_OPENWEATHER_KEY;

export async function getTrustedWeather(lat: number, lon: number, locality: string): Promise<MiniWeather> {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";

  // Primary: OpenWeather current weather
  if (OPENWEATHER) {
    try {
      const u = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER}&units=metric`;
      const r = await fetch(u, { cache: "no-store" });
      if (r.ok) {
        const j = await r.json();
        const wind_kph = j?.wind?.speed != null ? Math.round(j.wind.speed * 3.6) : undefined;
        const visibility_km = j?.visibility != null ? Math.round((j.visibility / 1000) * 10) / 10 : undefined;
        return {
          temp_c: j?.main?.temp != null ? Math.round(j.main.temp) : undefined,
          humidity_pct: j?.main?.humidity,
          wind_kph,
          pressure_hpa: j?.main?.pressure,
          cloud_pct: j?.clouds?.all,
          visibility_km,
          rain_chance_pct: undefined, // not available in this endpoint; avoid guessing
          source: "openweather",
          as_of: new Date().toLocaleString("en-IN", { timeZone: tz }),
          locality
        };
      }
    } catch {}
  }

  // Fallback: Open‑Meteo (explicit timezone)
  try {
    const u = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability,pressure_msl,cloud_cover,visibility&timezone=${encodeURIComponent(tz)}&models=best_match`;
    const r = await fetch(u, { cache: "no-store" });
    const j = await r.json();
    return {
      temp_c: j?.current?.temperature_2m != null ? Math.round(j.current.temperature_2m) : undefined,
      humidity_pct: j?.current?.relative_humidity_2m,
      wind_kph: j?.current?.wind_speed_10m != null ? Math.round(j.current.wind_speed_10m * 3.6) : undefined,
      pressure_hpa: j?.current?.pressure_msl != null ? Math.round(j.current.pressure_msl) : undefined,
      cloud_pct: j?.current?.cloud_cover,
      visibility_km: j?.current?.visibility != null ? Math.round((j.current.visibility / 1000) * 10) / 10 : undefined,
      rain_chance_pct: j?.current?.precipitation_probability,
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
