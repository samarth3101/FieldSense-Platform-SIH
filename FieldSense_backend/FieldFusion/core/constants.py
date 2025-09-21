# Sentinel-2 band references for NDVI: NDVI = (B8 - B4) / (B8 + B4)
BAND_RED = "B4"
BAND_NIR = "B8"
BAND_GREEN = "B3"
BAND_SWIR11 = "B11"
BAND_SWIR12 = "B12"

# Default thresholds (tune later)
NDVI_STRESS_LOW = 0.3
NDVI_STRESS_HIGH = 0.6
RH_HIGH = 70.0  # %
TEMP_WARM_C = 28.0
RAIN_RECENT_MM = 10.0

# NASA POWER parameter names (daily ag)
POWER_PARS = ["T2M", "RH2M", "PRECTOTCORR"]
