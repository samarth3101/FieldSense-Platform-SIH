from typing import Dict, List
from ..core.constants import NDVI_STRESS_LOW, NDVI_STRESS_HIGH

def infer_crop_health(fv: Dict) -> Dict:
    ndvi = fv.get("ndvi")
    drivers: List[str] = []
    if ndvi is None:
        return {"level": "unknown", "drivers": ["no_ndvi"], "confidence": 0.3}
    if ndvi < NDVI_STRESS_LOW:
        level = "high"
        drivers.append(f"low_ndvi={ndvi:.2f}<{NDVI_STRESS_LOW}")
        conf = 0.8
    elif ndvi < NDVI_STRESS_HIGH:
        level = "medium"
        drivers.append(f"moderate_ndvi={ndvi:.2f}")
        conf = 0.6
    else:
        level = "low"
        drivers.append(f"healthy_ndvi={ndvi:.2f}")
        conf = 0.7
    return {"level": level, "drivers": drivers, "confidence": conf}
