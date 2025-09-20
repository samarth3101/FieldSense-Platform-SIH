"use client";

import { useState } from "react";
import { loginAPI } from "@/lib/api/auth";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setLoading(true);
    try {
      const res = await loginAPI({ email, password });
      setMsg("Login successful");
      console.log("Login:", res);
      if ("vibrate" in navigator) navigator.vibrate(30);
    } catch (err: any) {
      setMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
