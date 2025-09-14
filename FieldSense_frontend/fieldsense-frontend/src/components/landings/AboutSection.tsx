"use client";

import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Zap } from 'lucide-react';
import styles from '@/styles/components/landing/AboutSection.module.scss';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const infoCards = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Helping Indian agriculture thrive using AI-powered insights for data-driven farming decisions.",
      color: "green"
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "Accessible insights for farmers, researchers & policymakers in a unified ecosystem.",
      color: "blue"
    },
    {
      icon: Zap,
      title: "Why FieldSense?",
      description: "Affordable, scalable, easy-to-use platform designed for Indian agricultural conditions.",
      color: "yellow"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.aboutSection} ref={sectionRef}>
      {/* Neutral Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={`${styles.heroText} ${isVisible ? styles.visible : ''}`}>
            <h2 className={styles.heroTitle}>Empowering Farmers with Data-Driven Decisions</h2>
            <p className={styles.heroSubtitle}>
              Transforming Indian agriculture through intelligent insights and technology that works for every farmer.
            </p>
          </div>
        </div>
      </div>

      {/* Compact Info Cards */}
      <div className={styles.container}>
        <div className={`${styles.infoCardsSection} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.cardsGrid}>
            {infoCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <div 
                  key={index} 
                  className={`${styles.infoCard} ${styles[card.color]}`}
                  style={{ '--delay': `${index * 0.2}s` } as any}
                >
                  <div className={styles.cardIcon}>
                    <IconComponent className={styles.icon} />
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
