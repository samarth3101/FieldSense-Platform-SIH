from ..providers.weather import fetch_power_weather
from ..providers.satellite import fetch_s2_indices
from ..providers.images import preprocess_user_image
from ..features.fusion import build_feature_vector
from ..models.crop_health import infer_crop_health
from ..models.soil_health import infer_soil_health
from ..models.pest_cnn import infer_pest_risk
from ..app.schemas import AnalyzeRequest, AnalyzeResponse, IndicesSnapshot, WeatherSummary

async def analyze_aoi(body: AnalyzeRequest, user_image=None) -> AnalyzeResponse:
    wx = await fetch_power_weather(body.lat, body.lon, body.include_forecast_days)
    s2 = await fetch_s2_indices(body.lat, body.lon, body.aoi_radius_m, max_cloud_pct=40)
    img_feats = await preprocess_user_image(user_image)
    fv = build_feature_vector(s2, wx, img_feats)

    soil = infer_soil_health(fv)
    crop = infer_crop_health(fv)
    pest = infer_pest_risk(fv)

    indices = IndicesSnapshot(**s2)
    weather = WeatherSummary(
        t2m_c=wx.get("t2m_c"),
        rh2m_pct=wx.get("rh2m_pct"),
        rain_mm=wx.get("rain_mm"),
        soil_moisture_proxy=fv.get("ndmi"),
        vpd_proxy=None,
        window_days=wx.get("window_days", body.include_forecast_days),
    )
    return AnalyzeResponse(indices=indices, weather=weather, soil=soil, crop=crop, pest=pest)
