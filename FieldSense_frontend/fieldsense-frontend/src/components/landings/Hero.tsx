"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Play, 
  ArrowRight, 
  Satellite, 
  TrendingUp, 
  BarChart3, 
  Globe,
  ChevronDown
} from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from '@/styles/components/landing/Hero.module.scss';

// Dynamic import for Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface HeroProps {
  onTryDemo: () => void;
}

const Hero = ({ onTryDemo }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isLottieLoading, setIsLottieLoading] = useState(true);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Load Lottie animation data
  useEffect(() => {
    const loadAnimation = async () => {
      try {
        setIsLottieLoading(true);
        const response = await fetch('/animation/smart-agriculture.json');
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Failed to load Lottie animation:', error);
      } finally {
        setIsLottieLoading(false);
      }
    };

    // Only load on client side
    if (typeof window !== 'undefined') {
      loadAnimation();
    }
  }, []);

  // Scroll to next section function
  const scrollToNextSection = () => {
    // Find next section after hero
    const nextSection = document.querySelector('section:nth-of-type(2)') || 
                       document.querySelector('#features') || 
                       document.querySelector('#about') ||
                       document.querySelector('main > *:nth-child(2)');
    
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Fallback: scroll down by viewport height
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.hero} ref={heroRef}>
      {/* Background Elements */}
      <div className={styles.background}>
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
        </div>
      </div>

      <div className={styles.container}>
        {/* Main Content */}
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          {/* Badge */}
          <div className={styles.badge}>
            <Globe className={styles.badgeIcon} />
            <span className={styles.badgeText}>Made in India for Farmers of India</span>
          </div>
          
          {/* Main Headline */}
          <div className={styles.headline}>
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
              <span>Try Demo</span>
            </button>
            
            <Link href="/fpi" className={styles.secondaryCta}>
              <span>Access FPI</span>
              <ArrowRight className={styles.ctaIcon} />
            </Link>
          </div>
        </div>

        {/* Clean Smart Agriculture Lottie Animation */}
        <div className={styles.lottieVisualization}>
          <div className={styles.lottieContainer}>
            {/* Main Lottie Animation */}
            <div className={styles.lottieWrapper}>
              {isLottieLoading ? (
                <div className={styles.lottieLoader}>
                  <div className={styles.loadingSpinner}></div>
                  <span className={styles.loadingText}>Loading Smart Agriculture...</span>
                </div>
              ) : animationData ? (
                <Lottie
                  animationData={animationData}
                  loop={true}
                  autoplay={true}
                  className={styles.smartAgricultureAnimation}
                  style={{ width: '100%', height: '100%' }}
                />
              ) : (
                <div className={styles.lottieError}>
                  <span>Smart Agriculture</span>
                  <span className={styles.errorSubtext}>Preview Available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={styles.scrollIndicator} onClick={scrollToNextSection}>
        <div className={styles.scrollText}>Discover More</div>
        <div className={styles.scrollArrow}>
          <ChevronDown className={styles.scrollIcon} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
