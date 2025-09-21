"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import { registerAPI, loginAPI, type Role } from "@/lib/api/auth";

interface AuthModalProps {
  onClose: () => void;
}

type Mode = "login" | "signup" | "signup-success";

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter();

  // UI state
  const [mode, setMode] = useState<Mode>("login");
  const [role, setRole] = useState<Role>("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");      // signup only
  const [mobile, setMobile] = useState("");  // signup only

  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    const animationDuration = isMobile ? 400 : 300;
    setTimeout(() => onClose(), animationDuration);
  };

  const handleRoleChange = (newRole: Role) => {
    if (newRole !== role) {
      if ("vibrate" in navigator) navigator.vibrate(25);
      setRole(newRole);
    }
  };

  // Backend wiring
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (mode === "login") {
        const res = await loginAPI({ email, password }); // { message, name, email, roles }

        // ✅ STORE USER DATA IN LOCALSTORAGE
        const userData = {
          name: res.name,
          email: res.email,
          phone: mobile || "+91 XXXXXXXXXX"
        };

        localStorage.setItem('fs_user', JSON.stringify(userData));
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('loginResponse', JSON.stringify({ ...res, mobile }));

        console.log('✅ Stored user ', userData);

        const rolesCsv = res.roles || "";
        const roles = rolesCsv.split(",").map((r) => r.trim()).filter(Boolean);

        // Require the selected role to be enabled
        if (!roles.includes(role)) {
          alert(`${role === "farmer" ? "Farmer" : "Researcher"} access not enabled for this account. Use Sign up to add it.`);
          setMode("signup");
          setIsLoading(false);
          return;
        }

        // Route to exact pages
        const target = role === "farmer"
          ? "/dashboard/farmerdash"
          : "/dashboard/researchdash";

        // Small delay to ensure modal animation does not cancel navigation
        setTimeout(() => {
          router.push(target);
          handleClose();
        }, 50);
        return;


      } else if (mode === "signup") {
        await registerAPI({ name, email, mobile, password, requested_role: role });
        setMode("signup-success");
      }
    } catch (err: any) {
      alert(err.message || "Action failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${isMobile ? styles.mobile : ""} ${isClosing ? styles.modalClosing : ""} ${mode === "signup" ? styles.signupMode : ""}`}
        ref={modalRef}
      >
        {/* Mobile handle */}
        <div className={styles.modalHandle} onClick={() => isMobile && handleClose()} />

        {/* Desktop close */}
        {!isMobile && (
          <button className={styles.closeBtn} onClick={handleClose} aria-label="Close">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <div className={styles.header}>
          <div className={styles.logoContainer}>
            <div className={styles.logo}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor" />
                <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="currentColor" />
                <path d="M5 8L5.5 9.5L7 10L5.5 10.5L5 12L4.5 10.5L3 10L4.5 9.5L5 8Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className={styles.title}>FieldSense</h2>
          </div>
          <p className={styles.subtitle}>
            {mode === "login" ? "Welcome back to your dashboard" : mode === "signup" ? "Join the future of agriculture" : "Check email to verify"}
          </p>
        </div>

        {/* Role toggle */}
        <div className={styles.roleToggle}>
          <button className={`${styles.roleBtn} ${role === "farmer" ? styles.active : ""}`} onClick={() => handleRoleChange("farmer")} type="button">
            <div className={styles.roleContent}><span>👩‍🌾</span><span>Farmer</span></div>
          </button>
          <button className={`${styles.roleBtn} ${role === "researcher" ? styles.active : ""}`} onClick={() => handleRoleChange("researcher")} type="button">
            <div className={styles.roleContent}><span>🔬</span><span>Researcher</span></div>
          </button>
        </div>

        {/* Success pane */}
        {mode === "signup-success" ? (
          <div className={styles.successPane}>
            <div className={styles.successIcon}>✅</div>
            <h3 className={styles.successTitle}>Verification email sent</h3>
            <p className={styles.successText}>
              Open the inbox and click Verify to activate the account. Then continue to the {role === "farmer" ? "Farmer" : "Researcher"} dashboard.
            </p>
            <div className={styles.successRow}>
              <a className={styles.btn} href="https://mail.google.com" target="_blank" rel="noreferrer">Open Gmail</a>
              <button className={styles.btnSecondary} onClick={() => setMode("login")}>Go to Login</button>
            </div>
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className={styles.form}>
              {mode === "signup" && (
                <>
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className={styles.input}
                      autoComplete="name"
                    />
                  </div>
                  <div className={styles.inputGroup}>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      required
                      className={styles.input}
                      autoComplete="tel"
                    />
                  </div>
                </>
              )}

              <div className={styles.inputGroup}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                  autoComplete="email"
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="password"
                  placeholder={mode === "login" ? "Enter your password" : "Create a password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                />
              </div>

              <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`} disabled={isLoading}>
                {isLoading ? <div className={styles.spinner} /> : <span>{mode === "login" ? "Sign In" : "Create Account"}</span>}
              </button>
            </form>

            <div className={styles.footer}>
              <p className={styles.toggleText}>
                {mode === "login" ? "New to FieldSense?" : "Already have an account?"}
                <br />
                <button type="button" className={styles.toggleLink} onClick={() => setMode(mode === "login" ? "signup" : "login")}>
                  {mode === "login" ? "Create an account" : "Sign in instead"}
                </button>
              </p>
              <div className={styles.termsContainer}>
                {mode === "signup" && (
                  <p className={styles.termsText}>
                    By creating an account, you agree to our{" "}
                    <a href="#" className={styles.link}>Terms of Service</a> and{" "}
                    <a href="#" className={styles.link}>Privacy Policy</a>
                  </p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
