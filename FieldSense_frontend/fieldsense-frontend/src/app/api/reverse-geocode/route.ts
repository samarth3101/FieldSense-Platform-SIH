import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  if (!lat || !lon) {
    return NextResponse.json({ error: "lat/lon required" }, { status: 400 });
  }

  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1&zoom=18&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "Accept": "application/json",
          "User-Agent": "FieldSense-Dashboard/1.0 (support@fieldsense.local)"
        },
        cache: "no-store"
      }
    );
    const body = await r.json();
    return NextResponse.json(body, { status: r.status });
  } catch (e: any) {
    return NextResponse.json({ error: "Upstream reverse geocode failed", detail: e?.message }, { status: 502 });
  }
}
