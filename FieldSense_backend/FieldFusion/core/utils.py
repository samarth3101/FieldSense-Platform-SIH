from datetime import datetime, timedelta

def date_range_for_power(days: int):
    end = datetime.utcnow().date()
    start = end - timedelta(days=days)
    return start.isoformat(), end.isoformat()

def safe_div(n, d):
    return (n / d) if d not in (0, None) and n is not None else None
