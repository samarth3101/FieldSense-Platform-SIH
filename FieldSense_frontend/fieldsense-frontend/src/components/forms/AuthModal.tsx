"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import { registerAPI, loginAPI, type Role } from "@/lib/api/auth";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter();

  // UI state
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");      // signup only
  const [mobile, setMobile] = useState("");  // signup only

  const [isLoading, setIsLoading] = useState(false);
  const [socialAuthHeight, setSocialAuthHeight] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const socialAuthRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Animate social container height for researcher role
  useEffect(() => {
    if (role === "researcher") {
      setIsTransitioning(true);
      const t = setTimeout(() => {
        if (socialAuthRef.current) {
          setSocialAuthHeight(socialAuthRef.current.scrollHeight);
        }
        setTimeout(() => setIsTransitioning(false), 350);
      }, 50);
      return () => clearTimeout(t);
    } else {
      setIsTransitioning(true);
      setSocialAuthHeight(0);
      setTimeout(() => setIsTransitioning(false), 350);
    }
  }, [role]);

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

  const handleSocialAuth = (provider: string) => {
    if ("vibrate" in navigator) navigator.vibrate(30);
    console.log("Social auth:", provider);
  };

  // Backend wiring
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (isLogin) {
        await loginAPI({ email, password });
        if (role === "farmer") {
          router.push("/dashboard/farmerdash");
        } else {
          router.push("/dashboard/researchdash");
        }
        handleClose();
      } else {
        await registerAPI({ name, email, mobile, password, role });
        alert("Registration successful. Check email to verify.");
        // Optionally switch to login tab:
        // setIsLogin(true);
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

  const handleHandleClick = () => {
    if (isMobile) handleClose();
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${isTransitioning ? styles.transitioning : ""} ${isMobile ? styles.mobile : ""} ${isClosing ? styles.modalClosing : ""} ${!isLogin ? styles.signupMode : ""}`}
        ref={modalRef}
      >
        <div className={styles.modalHandle} onClick={handleHandleClick} />

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
            {isLogin ? "Welcome back to your dashboard" : "Join the future of agriculture"}
          </p>
        </div>

        {/* Role toggle */}
        <div className={styles.roleToggle}>
          <button className={`${styles.roleBtn} ${role === "farmer" ? styles.active : ""}`} onClick={() => handleRoleChange("farmer")} type="button">
            <div className={styles.roleContent}>
              <span>👩‍🌾</span><span>Farmer</span>
            </div>
          </button>
          <button className={`${styles.roleBtn} ${role === "researcher" ? styles.active : ""}`} onClick={() => handleRoleChange("researcher")} type="button">
            <div className={styles.roleContent}>
              <span>🔬</span><span>Researcher</span>
            </div>
          </button>
        </div>

        {/* Social auth area (animated for researcher) */}
        <div
          className={styles.socialAuthContainer}
          style={{ height: socialAuthHeight, opacity: role === "researcher" ? 1 : 0 }}
        >
          <div className={styles.socialAuth} ref={socialAuthRef}>
            <div className={styles.socialButtonsRow}>
              <button className={styles.socialBtn} onClick={() => handleSocialAuth("github")} type="button" title="Continue with GitHub">🐙</button>
              <button className={styles.socialBtn} onClick={() => handleSocialAuth("google")} type="button" title="Continue with Google">🟦</button>
              <button className={styles.socialBtn} onClick={() => handleSocialAuth("microsoft")} type="button" title="Continue with Microsoft">🟨</button>
            </div>
            <div className={styles.divider}><span>or continue with email</span></div>
          </div>
        </div>

        {/* Email/password form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          {!isLogin && (
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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              autoComplete={isLogin ? "current-password" : "new-password"}
            />
          </div>

          <button type="submit" className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`} disabled={isLoading}>
            {isLoading ? <div className={styles.spinner} /> : <span>{isLogin ? "Sign In" : "Create Account"}</span>}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.toggleText}>
            {isLogin ? "New to FieldSense?" : "Already have an account?"}
            <br />
            <button type="button" className={styles.toggleLink} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Create an account" : "Sign in instead"}
            </button>
          </p>

          <div className={styles.termsContainer}>
            {!isLogin && (
              <p className={styles.termsText}>
                By creating an account, you agree to our{" "}
                <a href="#" className={styles.link}>Terms of Service</a> and{" "}
                <a href="#" className={styles.link}>Privacy Policy</a>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
