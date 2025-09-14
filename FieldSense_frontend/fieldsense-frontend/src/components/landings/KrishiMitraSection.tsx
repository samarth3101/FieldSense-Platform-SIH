"use client";

import { useState, useEffect, useRef } from 'react';
import { Brain, Leaf, Bug, Zap, Play, TrendingUp } from 'lucide-react';
import styles from '@/styles/components/landing/KrishiMitraSection.module.scss';

interface KrishiMitraSectionProps {
  onTryDemo: () => void;
}

const KrishiMitraSection = ({ onTryDemo }: KrishiMitraSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const aiFeatures = [
    {
      icon: Leaf,
      title: 'Soil Analysis',
      description: 'AI-powered soil health monitoring with NPK analysis',
      color: 'green'
    },
    {
      icon: TrendingUp,
      title: 'Crop Health',
      description: 'Real-time crop condition assessment and yield prediction',
      color: 'blue'
    },
    {
      icon: Bug,
      title: 'Pest Detection',
      description: 'Early pest and disease identification with treatment plans',
      color: 'red'
    },
    {
      icon: Zap,
      title: 'Smart Insights',
      description: 'Multi-modal data fusion for comprehensive recommendations',
      color: 'purple'
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

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % aiFeatures.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [aiFeatures.length]);

  return (
    <section className={styles.krishiMitraSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.badge}>
              <Brain className={styles.badgeIcon} />
              <span>Powered by KrishiMitra AI</span>
            </div>
            
            <h2 className={styles.title}>
              AI That <span className={styles.highlight}>Understands</span> Agriculture
            </h2>
            
            <p className={styles.description}>
              Advanced machine learning models analyze soil, crops, and environmental data 
              to deliver precise, actionable insights for every farmer.
            </p>
          </div>

          {/* AI Features Grid */}
          <div className={styles.featuresGrid}>
            {aiFeatures.map((feature, index) => (
              <div
                key={index}
                className={`${styles.featureCard} ${styles[feature.color]} ${index === activeCard ? styles.active : ''}`}
                onMouseEnter={() => setActiveCard(index)}
              >
                <div className={styles.cardIcon}>
                  <feature.icon className={styles.icon} />
                </div>
                
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{feature.title}</h3>
                  <p className={styles.cardDescription}>{feature.description}</p>
                </div>

                <div className={styles.activeIndicator}></div>
              </div>
            ))}
          </div>

          {/* Compact Stats & CTA */}
          <div className={styles.bottomSection}>
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statValue}>99.2%</span>
                <span className={styles.statLabel}>Accuracy</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>&lt;60s</span>
                <span className={styles.statLabel}>Processing</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statValue}>24/7</span>
                <span className={styles.statLabel}>Monitoring</span>
              </div>
            </div>

            <button className={styles.demoBtn} onClick={onTryDemo}>
              <Play className={styles.playIcon} />
              Experience AI Demo
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default KrishiMitraSection;
