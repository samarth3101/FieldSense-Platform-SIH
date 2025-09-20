// src/lib/api/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type Role = "farmer" | "researcher";

export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  role?: Role; // optional if backend doesn’t persist yet
}

export async function registerAPI(payload: RegisterPayload) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.detail || "Registration failed");
  }
  return res.json() as Promise<{ name: string; email: string; mobile: string; is_verified: boolean }>;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export async function loginAPI(payload: LoginPayload) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({}));
    throw new Error(e.detail || "Login failed");
  }
  return res.json() as Promise<{ message: string; name: string; email: string }>;
}
