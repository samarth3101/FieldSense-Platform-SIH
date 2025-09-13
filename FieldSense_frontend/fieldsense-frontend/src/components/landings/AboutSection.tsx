"use client";

import { useEffect, useRef, useState } from 'react';
import { Upload, Brain, MessageSquare, Share2 } from 'lucide-react';
import styles from '@/styles/components/landing/AboutSection.module.scss';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      icon: Upload,
      title: "Farmer",
      description: "Upload soil samples, crop images, or drone data through our intuitive mobile app",
      color: "green",
      delay: 0
    },
    {
      icon: Brain,
      title: "Data Upload",
      description: "Satellite imagery, weather data, and IoT sensors automatically enhance your submission",
      color: "blue",
      delay: 0.2
    },
    {
      icon: MessageSquare,
      title: "KrishiMitra AI",
      description: "Advanced AI analyzes multiple data points to generate precise insights and recommendations",
      color: "purple",
      delay: 0.4
    },
    {
      icon: Share2,
      title: "Advisory",
      description: "Receive personalized farming advice, pest alerts, and yield optimization strategies",
      color: "yellow",
      delay: 0.6
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
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>How FieldSense Works</h2>
          <p className={styles.subtitle}>
            From data collection to actionable insights in four simple steps
          </p>
        </div>

        {/* Steps Flow */}
        <div className={`${styles.stepsContainer} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.stepsFlow}>
            {steps.map((step, index) => (
              <div key={index} className={styles.stepWrapper}>
                <div 
                  className={`${styles.step} ${styles[step.color]}`}
                  style={{ '--delay': `${step.delay}s` } as any}
                >
                  <div className={styles.stepIcon}>
                    <step.icon className={styles.icon} />
                  </div>
                  
                  <div className={styles.stepContent}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDescription}>{step.description}</p>
                  </div>
                  
                  <div className={styles.stepNumber}>
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                </div>
                
                {/* Connector Arrow */}
                {index < steps.length - 1 && (
                  <div className={styles.connector}>
                    <div className={styles.connectorLine}></div>
                    <div className={styles.connectorArrow}>→</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className={`${styles.benefits} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>⚡</div>
              <h4 className={styles.benefitTitle}>Real-time Processing</h4>
              <p className={styles.benefitDescription}>
                Get instant analysis and recommendations within minutes of upload
              </p>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🎯</div>
              <h4 className={styles.benefitTitle}>Precision Agriculture</h4>
              <p className={styles.benefitDescription}>
                AI-powered insights tailored to your specific crop and location
              </p>
            </div>
            
            <div className={styles.benefit}>
              <div className={styles.benefitIcon}>🔒</div>
              <h4 className={styles.benefitTitle}>Secure & Private</h4>
              <p className={styles.benefitDescription}>
                Your data is encrypted and anonymized for research purposes only
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
