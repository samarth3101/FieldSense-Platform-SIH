// src/components/forms/AuthModal.tsx
"use client";

import { useState } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"farmer" | "researcher">("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: Replace with backend API call
    if (email && password) {
      if (role === "farmer") {
        router.push("/dashboard/farmerdash");
      } else {
        router.push("/dashboard/researchdash");
      }
      onClose();
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        {/* Role Toggle */}
        <div className={styles.roleToggle}>
          <button
            className={role === "farmer" ? styles.active : ""}
            onClick={() => setRole("farmer")}
          >
            Farmer
          </button>
          <button
            className={role === "researcher" ? styles.active : ""}
            onClick={() => setRole("researcher")}
          >
            Researcher
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className={styles.submitBtn}>
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className={styles.toggleText}>
          {isLogin ? "Need an account?" : "Already have an account?"}{" "}
          <span onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}
