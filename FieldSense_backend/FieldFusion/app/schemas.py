from typing import Optional, List
from pydantic import BaseModel, Field, confloat

class AnalyzeRequest(BaseModel):
    lat: confloat(ge=-90, le=90) = Field(..., description="Latitude in decimal degrees")
    lon: confloat(ge=-180, le=180) = Field(..., description="Longitude in decimal degrees")
    aoi_radius_m: int = Field(200, description="AOI buffer radius in meters")
    include_forecast_days: int = Field(7, description="Days of forecast aggregates")
    notes: Optional[str] = None

class RiskSection(BaseModel):
    level: str
    drivers: List[str]
    confidence: float

class IndicesSnapshot(BaseModel):
    ndvi: Optional[float] = None
    gndvi: Optional[float] = None
    ndwi: Optional[float] = None
    ndmi: Optional[float] = None
    savi: Optional[float] = None
    data_date: Optional[str] = None
    cloud_percent: Optional[float] = None

class WeatherSummary(BaseModel):
    t2m_c: Optional[float] = None
    rh2m_pct: Optional[float] = None
    rain_mm: Optional[float] = None
    soil_moisture_proxy: Optional[float] = None
    vpd_proxy: Optional[float] = None
    window_days: int

class AnalyzeResponse(BaseModel):
    indices: IndicesSnapshot
    weather: WeatherSummary
    soil: RiskSection
    crop: RiskSection
    pest: RiskSection
