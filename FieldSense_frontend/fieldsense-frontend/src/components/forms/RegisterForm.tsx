"use client";

import { useState } from "react";
import { registerAPI, type Role } from "@/lib/api/auth";

export default function RegisterForm() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("farmer");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      await registerAPI({ name, email, mobile, password, requested_role: role });
      setMsg("Registration successful. Check email to verify.");
      if ("vibrate" in navigator) navigator.vibrate(40);
    } catch (err: any) {
      setMsg(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Full name" value={name} onChange={(e)=>setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
      <input type="tel" placeholder="Mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
      <div style={{ display:"flex", gap:12, margin:"8px 0" }}>
        <label><input type="radio" name="role" checked={role==="farmer"} onChange={()=>setRole("farmer")} /> Farmer</label>
        <label><input type="radio" name="role" checked={role==="researcher"} onChange={()=>setRole("researcher")} /> Researcher</label>
      </div>
      <button type="submit" disabled={loading}>{loading ? "Signing up..." : "Sign Up"}</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}
