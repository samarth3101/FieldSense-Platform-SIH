import asyncio
# from ..app.schemas import AnalyzeRequest
# from ..pipeline.run_analysis import analyze_aoi

from FieldFusion.app.schemas import AnalyzeRequest
from FieldFusion.pipeline.run_analysis import analyze_aoi


def test_smoke_pipeline():
    req = AnalyzeRequest(lat=18.5204, lon=73.8567, aoi_radius_m=200, include_forecast_days=7)
    resp = asyncio.get_event_loop().run_until_complete(analyze_aoi(req, user_image=None))
    assert resp.indices.ndvi is not None
    assert resp.soil.level in {"low","medium","high","unknown"}
    assert resp.crop.level in {"low","medium","high","unknown"}
    assert resp.pest.level in {"low","medium","high","unknown"}
