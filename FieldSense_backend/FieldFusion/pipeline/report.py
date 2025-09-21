# Stub for PDF/visual generation; return a simple dict now.
def build_report_payload(resp):
    return {
        "title": "FieldFusion Report",
        "indices": resp.indices.model_dump(),
        "weather": resp.weather.model_dump(),
        "soil": resp.soil,
        "crop": resp.crop,
        "pest": resp.pest,
    }
