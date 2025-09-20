// src/lib/api/auth.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export type Role = "farmer" | "researcher";

export interface RegisterPayload {
  name: string;
  email: string;
  mobile: string;
  password: string;
  requested_role: Role;
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
  // Backend returns UserOut; roles is a CSV string in current backend
  return res.json() as Promise<{ name: string; email: string; mobile: string; is_verified: boolean; roles: string }>;
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
  // returns { message, name, email, roles }
  return res.json() as Promise<{ message: string; name: string; email: string; roles: string }>;
}
