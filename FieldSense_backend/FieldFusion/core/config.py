import os
from pydantic import BaseModel

class Settings(BaseModel):
    nasa_power_base: str = "https://power.larc.nasa.gov/api/temporal/daily/point"
    community: str = "ag"
    openweather_api_key: str = os.getenv("OPENWEATHER_API_KEY", "")
    use_openweather_agro: bool = False
    s2_max_cloud_pct: int = 40
    s2_lookback_days: int = 20

settings = Settings()
