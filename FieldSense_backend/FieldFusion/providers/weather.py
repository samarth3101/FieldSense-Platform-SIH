import httpx
import numpy as np
from ..core.config import settings
from ..core.constants import POWER_PARS
from ..core.utils import date_range_for_power

def _safe_mean(values):
    nums = []
    for v in values or []:
        try:
            f = float(v)
            if np.isfinite(f) and -60 <= f <= 60:
                nums.append(f)
        except Exception:
            continue
    return float(np.mean(nums)) if nums else None

def _safe_mean_pct(values):
    nums = []
    for v in values or []:
        try:
            f = float(v)
            if np.isfinite(f) and 0 <= f <= 100:
                nums.append(f)
        except Exception:
            continue
    return float(np.mean(nums)) if nums else None

def _safe_sum(values):
    nums = []
    for v in values or []:
        try:
            f = float(v)
            if np.isfinite(f) and f >= 0:
                nums.append(f)
        except Exception:
            continue
    return float(np.sum(nums)) if nums else None

async def fetch_power_weather(lat: float, lon: float, days: int):
    start, end = date_range_for_power(days)
    params = {
        "parameters": ",".join(POWER_PARS),
        "community": settings.community,
        "latitude": lat,
        "longitude": lon,
        "start": start.replace("-", ""),
        "end": end.replace("-", ""),
        "format": "JSON"
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.get(settings.nasa_power_base, params=params)
        r.raise_for_status()
    data = r.json()
    p = data.get("properties", {}).get("parameter", {})

    t2m_vals = list(p.get("T2M", {}).values()) if p.get("T2M") else []
    rh2m_vals = list(p.get("RH2M", {}).values()) if p.get("RH2M") else []
    rain_vals = list(p.get("PRECTOTCORR", {}).values()) if p.get("PRECTOTCORR") else []

    t2m_c = _safe_mean(t2m_vals)
    rh2m = _safe_mean_pct(rh2m_vals)
    rain_mm = _safe_sum(rain_vals)

    soil_proxy = None
    if rain_mm is not None:
        soil_proxy = min(1.0, rain_mm / 50.0)

    vpd_proxy = None
    if t2m_c is not None and rh2m is not None:
        vpd_proxy = max(0.0, min(1.0, (1 - rh2m / 100.0) * max(0.0, t2m_c) / 40.0))

    return {
        "t2m_c": t2m_c,
        "rh2m_pct": rh2m,
        "rain_mm": rain_mm,
        "soil_moisture_proxy": soil_proxy,
        "vpd_proxy": vpd_proxy,
        "window_days": days
    }
