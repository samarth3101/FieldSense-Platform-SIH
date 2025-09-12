// src/components/forms/AuthModal.tsx
"use client";
import { useState } from "react";
import styles from "./AuthModal.module.scss";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>✖</button>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          {!isLogin && <input type="text" placeholder="Full Name" required />}
          <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
        </form>
        <p className={styles.switch} onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}
        </p>
      </div>
    </div>
  );
}
