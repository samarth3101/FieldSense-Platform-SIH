// src/components/ui/LoaderScreen.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "./LoaderScreen.module.scss";

export default function LoaderScreen({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");
    if (hasSeenLoader) {
      setShowLoader(false);
    } else {
      const timer = setTimeout(() => {
        sessionStorage.setItem("hasSeenLoader", "true");
        setShowLoader(false);
      }, 2500); // 2.5s
      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoader) {
    return (
      <div className={styles.loaderWrapper}>
        <h1>🌱 FieldSense</h1>
        <p>AI-powered Agriculture Assistant</p>
      </div>
    );
  }

  return <>{children}</>;
}
