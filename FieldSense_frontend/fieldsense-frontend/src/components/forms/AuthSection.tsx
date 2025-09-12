// src/components/forms/AuthSection.tsx
"use client";
import { useState } from "react";
import styles from "./AuthSection.module.scss";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section id="auth" className={styles.authSection}>
      <div className={styles.authBox}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {!isLogin && <input type="text" placeholder="Full Name" required />}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p onClick={() => setIsLogin(!isLogin)} className={styles.switch}>
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </section>
  );
}
