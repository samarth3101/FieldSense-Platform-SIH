from typing import Dict, List

def infer_pest_risk(fv: Dict) -> Dict:
    rh = fv.get("rh2m_pct")
    t = fv.get("t2m_c")
    img_bytes = fv.get("img_bytes")
    drivers: List[str] = []
    base = 0.2
    if rh is not None and rh > 70: 
        base += 0.3
        drivers.append(f"high_humidity={rh:.0f}%")
    if t is not None and 20 <= t <= 32:
        base += 0.2
        drivers.append(f"favorable_temp={t:.1f}C")
    if img_bytes:
        base += 0.2
        drivers.append("image_signals_present")
    level = "low"
    if base >= 0.6: level = "medium"
    if base >= 0.8: level = "high"
    return {"level": level, "drivers": drivers or ["insufficient_signals"], "confidence": min(0.9, base)}
