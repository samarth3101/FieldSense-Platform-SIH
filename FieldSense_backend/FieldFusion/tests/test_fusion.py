# from ..features.fusion import build_feature_vector
from FieldFusion.features.fusion import build_feature_vector


def test_fv_keys():
    s2 = {"ndvi": 0.6, "gndvi": 0.5, "ndwi": 0.1, "ndmi": 0.2, "savi": 0.4}
    wx = {"t2m_c": 30, "rh2m_pct": 60, "rain_mm": 5}
    fv = build_feature_vector(s2, wx, {"bytes": 100})
    for k in ["ndvi","gndvi","ndwi","ndmi","savi","t2m_c","rh2m_pct","rain_mm","img_bytes"]:
        assert k in fv
