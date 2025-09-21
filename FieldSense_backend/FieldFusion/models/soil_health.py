from typing import Dict, List
from ..core.constants import RAIN_RECENT_MM

def infer_soil_health(fv: Dict) -> Dict:
    ndmi = fv.get("ndmi")
    rain = fv.get("rain_mm") or 0.0
    drivers: List[str] = []
    if ndmi is None:
        return {"level": "unknown", "drivers": ["no_ndmi"], "confidence": 0.3}
    # Simple heuristic: very low NDMI and low recent rain => dryness risk
    if ndmi < 0.1 and rain < RAIN_RECENT_MM:
        level = "high"
        drivers += [f"low_ndmi={ndmi:.2f}", f"low_rain={rain:.1f}mm"]
        conf = 0.75
    elif ndmi < 0.25:
        level = "medium"
        drivers += [f"moderate_ndmi={ndmi:.2f}"]
        conf = 0.6
    else:
        level = "low"
        drivers += [f"adequate_ndmi={ndmi:.2f}"]
        conf = 0.7
    return {"level": level, "drivers": drivers, "confidence": conf}
