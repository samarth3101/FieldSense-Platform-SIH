"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./AuthModal.module.scss";
import { useRouter } from "next/navigation";
import { login, signup } from "@/lib/api/auth";

interface AuthModalProps {
  onClose: () => void;
}

export default function AuthModal({ onClose }: AuthModalProps) {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<"farmer" | "researcher">("farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialAuthHeight, setSocialAuthHeight] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const socialAuthRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Detect mobile for optimized layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle smooth height transition when role changes
  useEffect(() => {
    if (role === "researcher") {
      setIsTransitioning(true);
      const timer = setTimeout(() => {
        if (socialAuthRef.current) {
          setSocialAuthHeight(socialAuthRef.current.scrollHeight);
        }
        setTimeout(() => setIsTransitioning(false), 350);
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setIsTransitioning(true);
      setSocialAuthHeight(0);
      setTimeout(() => setIsTransitioning(false), 350);
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const res = await login(email, password);
        localStorage.setItem("token", res.access_token);

        // Redirect by role
        if (role === "farmer") {
          router.push("/dashboard/farmerdash");
        } else {
          router.push("/dashboard/researchdash");
        }
      } else {
        // Signup
        await signup("User", email, password); // if you have name input, pass it
        alert("Signup successful! Please log in.");
        setIsLogin(true);
      }

      handleClose();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    // Add haptic feedback for PWA
    if ('vibrate' in navigator) {
      navigator.vibrate(30);
    }
    console.log(`Authenticating with ${provider}`);
    // TODO: Implement social auth
  };

  // Enhanced close handler with reverse animation
  const handleClose = () => {
    setIsClosing(true);

    // Wait for animation to complete before calling onClose
    const animationDuration = isMobile ? 400 : 300;
    setTimeout(() => {
      onClose();
    }, animationDuration);
  };

  // Handle overlay click - mobile users can also tap outside to close
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Handle mobile gesture close (swipe down on handle)
  const handleHandleClick = () => {
    if (isMobile) {
      handleClose();
    }
  };

  const handleRoleChange = (newRole: "farmer" | "researcher") => {
    if (newRole !== role) {
      // Add haptic feedback for PWA
      if ('vibrate' in navigator) {
        navigator.vibrate(25);
      }
      setRole(newRole);
    }
  };

  return (
    <div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`} onClick={handleOverlayClick}>
      <div
        className={`${styles.modal} ${isTransitioning ? styles.transitioning : ''} ${isMobile ? styles.mobile : ''} ${isClosing ? styles.modalClosing : ''} ${!isLogin ? styles.signupMode : ''}`}
        ref={modalRef}
      >
        <div className={styles.modalHandle} onClick={handleHandleClick}></div>

        {/* Close button - only on desktop */}
        {!isMobile && (
          <button className={styles.closeBtn} onClick={handleClose}>
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

        {/* Enhanced Role Toggle */}
        <div className={styles.roleToggle}>
          <button
            className={`${styles.roleBtn} ${role === "farmer" ? styles.active : ""}`}
            onClick={() => handleRoleChange("farmer")}
            type="button"
          >
            <div className={styles.roleContent}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 9V7L15 4L12 5L9 4L3 7V9H21Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M21 10C21 10 20 10 18.5 10C17 10 15.5 10 15.5 12C15.5 14 16.5 14 18 14C19.5 14 21 14 21 14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M3 10C3 10 4 10 5.5 10C7 10 8.5 10 8.5 12C8.5 14 7.5 14 6 14C4.5 14 3 14 3 14" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6V22" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Farmer</span>
            </div>
          </button>
          <button
            className={`${styles.roleBtn} ${role === "researcher" ? styles.active : ""}`}
            onClick={() => handleRoleChange("researcher")}
            type="button"
          >
            <div className={styles.roleContent}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <span>Researcher</span>
            </div>
          </button>
        </div>

        {/* Enhanced Social Auth Container - WITH ANIMATION */}
        <div
          className={styles.socialAuthContainer}
          style={{
            height: socialAuthHeight,
            opacity: role === "researcher" ? 1 : 0
          }}
        >
          <div className={styles.socialAuth} ref={socialAuthRef}>
            {/* Horizontal Social Buttons - Icons Only */}
            <div className={styles.socialButtonsRow}>
              <button
                className={styles.socialBtn}
                onClick={() => handleSocialAuth("github")}
                type="button"
                title="Continue with GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017C2 16.624 5.865 20.462 10.839 21.74C11.339 21.835 11.521 21.521 11.521 21.252C11.521 21.017 11.521 20.624 11.521 20.062C7.726 20.748 7.121 18.435 7.121 18.435C6.696 17.318 6.026 17.018 6.026 17.018C5.121 16.412 6.097 16.412 6.097 16.412C7.097 16.482 7.621 17.435 7.621 17.435C8.521 18.935 9.97 18.482 11.097 18.018C11.182 17.348 11.436 16.895 11.715 16.624C8.1 16.353 4.34 15.018 4.34 10.624C4.34 9.435 4.765 8.482 7.097 7.435C6.996 7.165 6.621 6.018 7.198 4.435C7.198 4.435 8.026 4.165 11.521 6.435C12.339 6.201 13.182 6.084 14.021 6.084C14.859 6.084 15.703 6.201 16.521 6.435C20.016 4.165 20.844 4.435 20.844 4.435C21.421 6.018 21.046 7.165 20.945 7.435C23.277 8.482 23.702 9.435 23.702 10.624C23.702 15.018 19.942 16.353 16.327 16.624C16.702 16.935 17.021 17.556 17.021 18.488C17.021 19.838 17.021 20.918 17.021 21.252C17.021 21.521 17.203 21.835 17.703 21.74C22.677 20.462 26.542 16.624 26.542 12.017C26.542 6.484 22.065 2 16.542 2H12Z" fill="currentColor" />
                </svg>
              </button>

              <button
                className={styles.socialBtn}
                onClick={() => handleSocialAuth("google")}
                type="button"
                title="Continue with Google"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>

              <button
                className={styles.socialBtn}
                onClick={() => handleSocialAuth("microsoft")}
                type="button"
                title="Continue with Microsoft"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M2 2H11V11H2V2Z" fill="#F25022" />
                  <path d="M13 2H22V11H13V2Z" fill="#7FBA00" />
                  <path d="M2 13H11V22H2V13Z" fill="#00A4EF" />
                  <path d="M13 13H22V22H13V13Z" fill="#FFB900" />
                </svg>
              </button>
            </div>

            <div className={styles.divider}>
              <span>or continue with email</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            <div className={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="1.5" />
                <path d="L22 6L12 13L2 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              autoComplete="current-password"
            />
            <div className={styles.inputIcon}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className={`${styles.submitBtn} ${isLoading ? styles.loading : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className={styles.spinner}></div>
            ) : (
              <span>{isLogin ? "Sign In" : "Create Account"}</span>
            )}
          </button>
        </form>

        <div className={styles.footer}>
          <p className={styles.toggleText}>
            {isLogin ? "New to FieldSense?" : "Already have an account?"}<br />
            <button
              type="button"
              className={styles.toggleLink}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Create an account" : "Sign in instead"}
            </button>
          </p>

          {/* Terms text - always reserve space */}
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
