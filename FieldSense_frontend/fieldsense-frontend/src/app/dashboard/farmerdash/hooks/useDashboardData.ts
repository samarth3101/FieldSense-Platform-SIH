"use client";
import { useEffect, useState } from "react";
import { getTrustedWeather, type MiniWeather } from "../components/lib/fetchWeather";

function transliterateToHi(input: string) {
  if (!/^[\x00-\x7F]+$/.test(input)) return input;
  return input;
}

type Address = {
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  full?: string;
};

async function fetchWithTimeout(input: RequestInfo | URL, init: RequestInit & { timeout?: number } = {}) {
  const { timeout = 7000, ...rest } = init;
  const ctrl = new AbortController();
  const id = setTimeout(() => ctrl.abort(), timeout);
  try {
    const res = await fetch(input, { ...rest, signal: ctrl.signal });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export function useDashboardData(language: "hi" | "en") {
  const [rawName, setRawName] = useState<string>("Farmer");
  const [displayName, setDisplayName] = useState<string>("किसान");
  const [greeting, setGreeting] = useState<string>("");
  const [address, setAddress] = useState<Address>({});
  const [weather, setWeather] = useState<MiniWeather>({
    temp_c: undefined,
    humidity_pct: undefined,
    rain_chance_pct: undefined,
    wind_kph: undefined,
    pressure_hpa: undefined,
    cloud_pct: undefined,
    visibility_km: undefined,
    aqi: undefined,
    source: "open-meteo",
    as_of: new Date().toLocaleString(),
    locality: undefined
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const keys = ["fs_user", "user", "userData", "loginResponse", "auth_user"];
      for (const k of keys) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const p = JSON.parse(raw);
          const nm = p?.name || p?.fullName || p?.user?.name;
          if (nm) { setRawName(nm); break; }
        }
      }
    } catch {}
  }, []);

  useEffect(() => {
    const h = new Date().getHours();
    setGreeting(language === "hi" ? (h < 12 ? "सुप्रभात" : h < 18 ? "नमस्ते" : "शुभ संध्या")
                                 : (h < 12 ? "Good morning" : h < 18 ? "Hello" : "Good evening"));
    setDisplayName(language === "hi" ? transliterateToHi(rawName) || "किसान" : rawName || "Farmer");
  }, [language, rawName]);

  useEffect(() => {
    const setAllFromCoords = async (lat: number, lon: number) => {
      try {
        console.log("📍 Using coords:", { lat, lon });

        // Reverse geocode with 1‑hour cache and proxy route
        const revKey = `fs_revgeo_${Math.round(lat * 1000)}_${Math.round(lon * 1000)}`;
        let area: string | undefined, city: string | undefined, state: string | undefined, pincode: string | undefined;

        const cachedRev = localStorage.getItem(revKey);
        if (cachedRev) {
          const c = JSON.parse(cachedRev);
          if (Date.now() - c.ts < 3600_000 && c.data) {
            ({ area, city, state, pincode } = c.data);
          }
        }

        if (!area && !city) {
          // Try proxy route first (this prevents the "Failed to fetch" error)
          let res = await fetchWithTimeout(`/api/reverse-geocode?lat=${lat}&lon=${lon}`, { timeout: 7000, cache: "no-store" });
          if (!res.ok) {
            // Fallback to direct Nominatim only if proxy fails
            console.warn("Proxy failed, trying direct:", res.status);
            res = await fetchWithTimeout(
              `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${lat}&lon=${lon}`,
              { timeout: 7000, headers: { "Accept": "application/json" } }
            );
          }
          if (res.ok) {
            const j = await res.json();
            const a = j.address || {};
            area = a.suburb || a.neighbourhood || a.village || a.town || a.hamlet || a.locality;
            city = a.city || a.town || a.village || a.county;
            state = a.state;
            pincode = a.postcode;
            // localStorage.setItem(revKey, JSON.stringify({ ts: Date.now(), data: { area, city, state, pincode } }));
            localStorage.setItem(revKey, JSON.stringify({ ts: Date.now(), data: { area, city, state, pincode } }));

          }
        }

        const full = [area, city, state, pincode].filter(Boolean).join(", ");
        setAddress(prev => full ? { area, city, state, pincode, full } : (prev.full ? prev : { full: language === "hi" ? "स्थान उपलब्ध नहीं" : "Location unavailable" }));

        const locality = [area, city].filter(Boolean).join(", ") || city || state || "Locality";
        const wxKey = `fs_wx_${locality}_${Math.round(lat * 1000)}_${Math.round(lon * 1000)}`;

        // Weather cache (10 minutes)
        const cachedWx = localStorage.getItem(wxKey);
        if (cachedWx) {
          const c = JSON.parse(cachedWx);
          if (Date.now() - c.ts < 10 * 60 * 1000 && c.data && typeof c.data === "object") {
            console.log("♻️ Using cached weather:", c.data);
            setWeather(c.data);
            setLoading(false);
            return;
          } else {
            localStorage.removeItem(wxKey);
          }
        }

        const wx = await getTrustedWeather(lat, lon, locality);
        console.log("🌤️ Live weather:", wx);
        
        const hasAny =
          typeof wx.temp_c === "number" ||
          typeof wx.humidity_pct === "number" ||
          typeof wx.wind_kph === "number" ||
          typeof wx.pressure_hpa === "number" ||
          typeof wx.visibility_km === "number";

        if (hasAny) {
          setWeather(wx);
          localStorage.setItem(wxKey, JSON.stringify({ ts: Date.now(),  wx }));
        }
      } catch (err) {
        console.error("❌ setAllFromCoords error:", err);
        // Never crash UI; set a readable fallback
        setAddress(prev => prev.full ? prev : { full: language === "hi" ? "स्थान उपलब्ध नहीं" : "Location unavailable" });
      } finally {
        setLoading(false);
      }
    };

    // Use cached coords if recent
    try {
      const cached = localStorage.getItem("fs_cached_location");
      if (cached) {
        const { lat, lon, ts } = JSON.parse(cached);
        if (lat && lon && ts && Date.now() - ts < 3600_000) {
          setAllFromCoords(lat, lon);
          return;
        }
      }
    } catch {}

    // Geolocation or Pune fallback
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          localStorage.setItem("fs_cached_location", JSON.stringify({ lat, lon, ts: Date.now() }));
          setAllFromCoords(lat, lon);
        },
        () => {
          console.warn("⚠️ Geolocation denied, using Pune fallback");
          setAllFromCoords(18.5204, 73.8567);
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      console.warn("⚠️ Geolocation not available, using Pune fallback");
      setAllFromCoords(18.5204, 73.8567);
    }
  }, [language]);

  return { displayName, greeting, address, weather, loading };
}
