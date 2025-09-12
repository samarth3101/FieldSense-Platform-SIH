// src/app/page.tsx
"use client";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LoaderScreen from "@/components/ui/LoaderScreen";
import AuthModal from "@/components/forms/AuthModal";

import styles from "./page.module.scss";

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <LoaderScreen>
      <main className={styles.main}>
        <Navbar />
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>AI-powered Insights for Indian Agriculture</h1>
            <p>From soil to yield, powered by KrishiMitra AI</p>
            <button onClick={() => setShowAuth(true)} className={styles.ctaBtn}>
              Get Started
            </button>
          </div>
        </section>
        <Footer />
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </main>
    </LoaderScreen>
  );
}
