"use client";

export default function RegisterForm() {
  return (
    <form>
      <input type="text" placeholder="Name" required />
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
