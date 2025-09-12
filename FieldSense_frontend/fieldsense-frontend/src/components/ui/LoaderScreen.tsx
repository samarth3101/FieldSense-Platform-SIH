"use client";
import { useEffect, useState } from "react";
import styles from "./LoaderScreen.module.scss";

export default function LoaderScreen({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // 2s fake load
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.loader}>
        <h1>🌱 FieldSense</h1>
        <p>Empowering Agriculture with AI...</p>
      </div>
    );
  }

  return <>{children}</>;
}
