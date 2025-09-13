"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Play, ArrowRight, Satellite, TrendingUp, BarChart3 } from 'lucide-react';
import styles from '@/styles/components/landing/Hero.module.scss';

interface HeroProps {
  onTryDemo: () => void;
}

const Hero = ({ onTryDemo }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const stats = [
    { number: "1000+", label: "Farmers", icon: "🌾" },
    { number: "50+", label: "Districts", icon: "📍" },
    { number: "95%", label: "Accuracy", icon: "🎯" },
    { number: "24/7", label: "Monitoring", icon: "⏰" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Auto-cycle through stats
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, [stats.length]);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background with Parallax Effect */}
      <div className={styles.background}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.backgroundOverlay}></div>
        
        {/* Floating Animation Elements */}
        <div className={styles.floatingElements}>
          <div className={styles.floatingElement} style={{ '--delay': '0s' } as any}>
            <Satellite className={styles.icon} />
          </div>
          <div className={styles.floatingElement} style={{ '--delay': '2s' } as any}>
            <TrendingUp className={styles.icon} />
          </div>
          <div className={styles.floatingElement} style={{ '--delay': '4s' } as any}>
            <BarChart3 className={styles.icon} />
          </div>
          <div className={styles.floatingElement} style={{ '--delay': '1s' } as any}>
            🌱
          </div>
          <div className={styles.floatingElement} style={{ '--delay': '3s' } as any}>
            🚜
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          {/* Main Headline */}
          <div className={styles.headline}>
            <div className={styles.badge}>
              <span className={styles.badgeText}>🇮🇳 Made in India for Farmers of India</span>
            </div>
            
            <h1 className={styles.title}>
              <span className={styles.titleMain}>AI-powered Insights</span>
              <span className={styles.titleSub}>for Indian Agriculture</span>
            </h1>
            
            <p className={styles.subtitle}>
              From soil to yield, powered by <strong>KrishiMitra AI</strong>
            </p>
            
            <p className={styles.description}>
              Get real-time crop analysis, soil health insights, and personalized 
              farming recommendations using satellite data and cutting-edge AI technology. 
              Join thousands of farmers already transforming their yields.
            </p>
          </div>

          {/* CTAs */}
          <div className={styles.actions}>
            <button 
              className={styles.primaryCta}
              onClick={onTryDemo}
            >
              <Play className={styles.ctaIcon} />
              Try Demo
              <span className={styles.ctaSubtext}>Interactive Experience</span>
            </button>
            
            <Link href="/fpi" className={styles.secondaryCta}>
              <span>Access FPI</span>
              <ArrowRight className={styles.ctaIcon} />
              <span className={styles.ctaSubtext}>API Documentation</span>
            </Link>
          </div>

          {/* Quick Stats Carousel */}
          <div className={styles.statsContainer}>
            <div className={styles.statsCarousel}>
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${styles.stat} ${index === currentStat ? styles.active : ''}`}
                >
                  <span className={styles.statIcon}>{stat.icon}</span>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
            
            <div className={styles.statsIndicators}>
              {stats.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${index === currentStat ? styles.active : ''}`}
                  onClick={() => setCurrentStat(index)}
                />
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className={styles.trustIndicators}>
            <span className={styles.trustText}>Trusted by leading institutions</span>
            <div className={styles.trustLogos}>
              <div className={styles.trustLogo}>IIT</div>
              <div className={styles.trustLogo}>ISRO</div>
              <div className={styles.trustLogo}>ICAR</div>
              <div className={styles.trustLogo}>MSP</div>
            </div>
          </div>
        </div>

        {/* Plant Growth Animation */}
        <div className={styles.heroIllustration}>
          <div className={styles.plantContainer}>
            <div className={styles.plant}>
              <div className={styles.stem}></div>
              <div className={styles.leaf} style={{ '--leaf-delay': '0.5s' } as any}></div>
              <div className={styles.leaf} style={{ '--leaf-delay': '0.8s' } as any}></div>
              <div className={styles.leaf} style={{ '--leaf-delay': '1.1s' } as any}></div>
              <div className={styles.flower}>🌸</div>
            </div>
            
            {/* Data Visualization Overlay */}
            <div className={styles.dataOverlay}>
              <div className={styles.chartContainer}>
                <div className={styles.chartTitle}>NDVI Analysis</div>
                <div className={styles.chartBars}>
                  <div className={styles.chartBar} style={{ '--bar-height': '30%', '--bar-delay': '0.2s' } as any}></div>
                  <div className={styles.chartBar} style={{ '--bar-height': '60%', '--bar-delay': '0.4s' } as any}></div>
                  <div className={styles.chartBar} style={{ '--bar-height': '90%', '--bar-delay': '0.6s' } as any}></div>
                  <div className={styles.chartBar} style={{ '--bar-height': '75%', '--bar-delay': '0.8s' } as any}></div>
                  <div className={styles.chartBar} style={{ '--bar-height': '85%', '--bar-delay': '1s' } as any}></div>
                </div>
                <div className={styles.chartFooter}>Real-time monitoring</div>
              </div>
            </div>
          </div>
          
          {/* Floating Data Points */}
          <div className={styles.dataPoints}>
            <div className={styles.dataPoint} style={{ '--point-delay': '1.5s' } as any}>
              <span className={styles.dataValue}>28°C</span>
              <span className={styles.dataLabel}>Temperature</span>
            </div>
            <div className={styles.dataPoint} style={{ '--point-delay': '2s' } as any}>
              <span className={styles.dataValue}>65%</span>
              <span className={styles.dataLabel}>Humidity</span>
            </div>
            <div className={styles.dataPoint} style={{ '--point-delay': '2.5s' } as any}>
              <span className={styles.dataValue}>0.8</span>
              <span className={styles.dataLabel}>NDVI</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollText}>Discover More</div>
        <div className={styles.scrollArrow}>↓</div>
      </div>
    </section>
  );
};

export default Hero;
