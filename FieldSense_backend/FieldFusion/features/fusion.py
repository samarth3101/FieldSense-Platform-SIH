from typing import Dict, Any

def build_feature_vector(s2: Dict[str, Any], wx: Dict[str, Any], img_feats=None):
    fv = {
        "ndvi": s2.get("ndvi"),
        "gndvi": s2.get("gndvi"),
        "ndwi": s2.get("ndwi"),
        "ndmi": s2.get("ndmi"),
        "savi": s2.get("savi"),
        "t2m_c": wx.get("t2m_c"),
        "rh2m_pct": wx.get("rh2m_pct"),
        "rain_mm": wx.get("rain_mm"),
    }
    if img_feats is not None:
        fv["img_bytes"] = img_feats.get("bytes")
    return fv
