"use client";
import { useEffect, useState } from "react";
import styles from "./LoaderScreen.module.scss";

export default function LoaderScreen({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setShowLoader(false);
    } else {
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          sessionStorage.setItem("hasSeenLoader", "true");
          setShowLoader(false);
        }, 800); // Smooth fade out duration
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoader) {
    return (
      <div className={`${styles.loaderWrapper} ${fadeOut ? styles.fadeOut : ''}`}>
        <div className={styles.loaderContent}>
          <div className={styles.iconContainer}>
            <div className={styles.leafIcon}>
              🌱
            </div>
            <div className={styles.pulseRing}></div>
          </div>
          
          <div className={styles.textContainer}>
            <h1 className={styles.brandName}>FieldSense</h1>
            <p className={styles.tagline}>AI-powered Agriculture Assistant</p>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill}></div>
            </div>
            <div className={styles.loadingDots}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
