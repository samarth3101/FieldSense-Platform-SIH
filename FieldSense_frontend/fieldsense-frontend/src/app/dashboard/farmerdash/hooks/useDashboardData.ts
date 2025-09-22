"use client";
import { useEffect, useState } from "react";
import { getTrustedWeather, type MiniWeather } from "../components/lib/fetchWeather";

// Basic transliteration stub; swap with robust lib if needed
function transliterateToHi(input: string) {
    if (!/^[\x00-\x7F]+$/.test(input)) return input; // already non-ASCII
    return input; // keep Latin form for now (no fake mapping)
}

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
    //   const [weather, setWeather] = useState<MiniWeather>({ source: "open-meteo", as_of: new Date().toLocaleString() });
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

    // Read user name each session
    useEffect(() => {
        try {
            const keys = ["fs_user", "user", "userData", "loginResponse", "auth_user"];
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
        } catch { }
    }, []);

    // Greeting and localized name
    useEffect(() => {
        const h = new Date().getHours();
        setGreeting(language === "hi" ? (h < 12 ? "सुप्रभात" : h < 18 ? "नमस्ते" : "शुभ संध्या") : (h < 12 ? "Good morning" : h < 18 ? "Hello" : "Good evening"));
        if (language === "hi") {
            setDisplayName(transliterateToHi(rawName) || "किसान");
        } else {
            setDisplayName(rawName || "Farmer");
        }
    }, [language, rawName]);

    // Reverse geocode + weather with 10-min cache
    useEffect(() => {
        const setAllFromCoords = async (lat: number, lon: number) => {
            try {
                console.log("📍 Using coords:", { lat, lon });

                // Reverse geocode
                const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${lat}&lon=${lon}`);
                if (!res.ok) throw new Error(`Reverse geocode failed: ${res.status}`);
                const j = await res.json();
                const a = j.address || {};
                const area = a.suburb || a.neighbourhood || a.village || a.town || a.hamlet || a.locality;
                const city = a.city || a.town || a.village || a.county;
                const state = a.state;
                const pincode = a.postcode;
                const full = [area, city, state, pincode].filter(Boolean).join(", ");
                setAddress({ area, city, state, pincode, full });
                console.log("📌 Address:", { area, city, state, pincode });

                const locality = [area, city].filter(Boolean).join(", ") || city || state || "Locality";
                const key = `fs_wx_${locality}_${Math.round(lat * 1000)}_${Math.round(lon * 1000)}`;
                const cached = localStorage.getItem(key);
                if (cached) {
                    const c = JSON.parse(cached);
                    if (Date.now() - c.ts < 10 * 60 * 1000 && c.data && typeof c.data === "object") {
                        console.log("♻️ Using cached weather:", c.data);
                        setWeather(c.data);
                        setLoading(false);
                        return;
                    } else {
                        localStorage.removeItem(key);
                    }
                }

                // Live weather
                const wx = await getTrustedWeather(lat, lon, locality);
                console.log("🌤️ Live weather:", wx);

                // Validate at least one numeric field before caching
                const hasAny =
                    typeof wx.temp_c === "number" ||
                    typeof wx.humidity_pct === "number" ||
                    typeof wx.wind_kph === "number" ||
                    typeof wx.pressure_hpa === "number" ||
                    typeof wx.visibility_km === "number";

                if (hasAny) {
                    setWeather(wx);
                    localStorage.setItem(key, JSON.stringify({ ts: Date.now(), wx }));
                } else {
                    console.warn("⚠️ Weather empty – showing placeholders");
                }
            } catch (err) {
                console.error("❌ setAllFromCoords error:", err);
            } finally {
                setLoading(false);
            }
        };


        try {
            const cached = localStorage.getItem("fs_cached_location");
            if (cached) {
                const { lat, lon, ts } = JSON.parse(cached);
                if (lat && lon && ts && Date.now() - ts < 3600_000) {
                    setAllFromCoords(lat, lon);
                    return;
                }
            }
        } catch { }

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
