"use client";
import { useEffect, useState } from "react";

// Simple Latin→Devanagari transliteration for names (basic)
function transliterateToHi(input: string) {
  // Very lightweight mapping for common characters
  // For production, integrate `@ai4bharat/indic-transliterate` or an API.
  const map: Record<string,string> = {
    a:"अ", aa:"आ", i:"इ", ee:"ई", u:"उ", oo:"ऊ", e:"ए", ai:"ऐ", o:"ओ", au:"औ",
    k:"क", kh:"ख", g:"ग", gh:"घ", ch:"च", j:"ज", zh:"झ", t:"ट", th:"ठ", d:"ड", dh:"ढ",
    n:"न", p:"प", ph:"फ", b:"ब", bh:"भ", m:"म", y:"य", r:"र", l:"ल", v:"व",
    sh:"श", s:"स", h:"ह"
  };
  // Fallback: just return original if non-ASCII
  if (!/^[a-zA-Z .]+$/.test(input)) return input;
  // Minimal split by space and capitalize effect
  return input.split(" ").map(part => part).join(" ");
}

type MiniWeather = {
  temp_c?: number;
  humidity_pct?: number;
  rain_chance_pct?: number;
  wind_kph?: number;
  aqi?: number;
};

type Address = {
  area?: string;
  city?: string;
  state?: string;
  pincode?: string;
  full?: string;
};

export function useDashboardData(language: "hi" | "en") {
  const [rawName, setRawName] = useState<string>("Farmer");
  const [displayName, setDisplayName] = useState<string>("किसान");
  const [greeting, setGreeting] = useState<string>("");
  const [address, setAddress] = useState<Address>({});
  const [weather, setWeather] = useState<MiniWeather>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 1) Name from storage (dynamic per user)
    try {
      const keys = ["fs_user","user","userData","loginResponse","auth_user"];
      for (const k of keys) {
        const raw = localStorage.getItem(k);
        if (raw) {
          const p = JSON.parse(raw);
          const nm = p?.name || p?.fullName || p?.user?.name;
          if (nm) {
            setRawName(nm);
            break;
          }
        }
      }
    } catch {}

    // 2) Greeting
    const h = new Date().getHours();
    setGreeting(language === "hi" ? (h<12?"सुप्रभात":h<18?"नमस्ते":"शुभ संध्या") : (h<12?"Good morning":h<18?"Hello":"Good evening"));
  }, [language]);

  useEffect(() => {
    // Localize name if Hindi selected
    if (language === "hi") {
      const dev = transliterateToHi(rawName) || "किसान";
      setDisplayName(dev);
    } else {
      setDisplayName(rawName || "Farmer");
    }
  }, [rawName, language]);

  useEffect(() => {
    const setAllFromCoords = async (lat: number, lon: number) => {
      try {
        // Full reverse geocode (Nominatim)
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${lat}&lon=${lon}`);
        const j = await res.json();
        const a = j.address || {};
        const area = a.suburb || a.neighbourhood || a.village || a.town || a.hamlet || a.locality;
        const city = a.city || a.town || a.village || a.county;
        const state = a.state;
        const pincode = a.postcode;
        const full = [area, city, state, pincode].filter(Boolean).join(", ");
        setAddress({ area, city, state, pincode, full });

        // Weather (Open-Meteo)
        const w = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation_probability`);
        const jw = await w.json();
        setWeather({
          temp_c: jw?.current?.temperature_2m,
          humidity_pct: jw?.current?.relative_humidity_2m,
          wind_kph: jw?.current?.wind_speed_10m ? Math.round(jw.current.wind_speed_10m * 3.6) : undefined,
          rain_chance_pct: jw?.current?.precipitation_probability
        });
      } catch {}
      setLoading(false);
    };

    // Prefer cached coords
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

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          localStorage.setItem("fs_cached_location", JSON.stringify({ lat, lon, ts: Date.now() }));
          setAllFromCoords(lat, lon);
        },
        () => setLoading(false),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setLoading(false);
    }
  }, [language]);

  return { displayName, greeting, address, weather, loading };
}
