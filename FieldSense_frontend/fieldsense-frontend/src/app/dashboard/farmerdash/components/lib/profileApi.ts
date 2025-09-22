import type { ProfileData, PasswordPayload } from "../../types/profile";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function getServerProfile(email: string): Promise<Partial<ProfileData> | null> {
  try {
    const res = await fetch(`${API_URL}/profile?email=${encodeURIComponent(email)}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function updateServerProfile(data: ProfileData): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    return res.ok;
  } catch {
    return false;
  }
}

export async function changeServerPassword(payload: PasswordPayload): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.ok;
  } catch {
    return false;
  }
}
