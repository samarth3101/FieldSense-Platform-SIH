"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Building, Microscope, Smartphone } from 'lucide-react';
import styles from '@/styles/components/landing/CTABanner.module.scss';


const CTABanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const ctaOptions = [
    {
      icon: Users,
      title: 'Farmer Dashboard',
      description: 'Start analyzing your crops with AI-powered insights',
      features: ['Soil Analysis', 'Crop Monitoring', 'Pest Detection', 'Yield Optimization'],
      cta: 'Start Farming Smarter',
      href: '/dashboard/farmer',
      color: 'green',
      badge: 'Free Trial'
    },
    {
      icon: Microscope,
      title: 'Research Access',
      description: 'Access agricultural datasets and APIs for research',
      features: ['Open Datasets', 'API Access', 'Research Tools', 'Collaboration Hub'],
      cta: 'Join Research Network',
      href: '/dashboard/researcher',
      color: 'blue',
      badge: 'Free for Academia'
    },
    {
      icon: Building,
      title: 'Government Portal',
      description: 'Monitor agricultural trends and support farmers',
      features: ['Regional Analytics', 'Policy Insights', 'Farmer Support', 'Data Export'],
      cta: 'Access Government Tools',
      href: '/dashboard/gov',
      color: 'purple',
      badge: 'Secure Access'
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
    <section className={styles.ctaBanner} ref={sectionRef}>
      <div className={styles.backgroundPattern}>
        <div className={styles.patternGrid}></div>
        <div className={styles.patternDots}></div>
      </div>

      <div className={styles.container}>
        {/* Main CTA Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.badge}>
            <Smartphone className={styles.badgeIcon} />
            <span>Ready to Transform Agriculture?</span>
          </div>
          
          <h2 className={styles.title}>
            Choose Your <span className={styles.highlight}>Path Forward</span>
          </h2>
          
          <p className={styles.subtitle}>
            Join thousands who are already using AI to revolutionize Indian agriculture. 
            Select the dashboard that fits your role and start your journey today.
          </p>
        </div>

        {/* CTA Options Grid */}
        <div className={`${styles.ctaGrid} ${isVisible ? styles.visible : ''}`}>
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className={`${styles.ctaCard} ${styles[option.color]}`}
              style={{ '--delay': `${index * 0.2}s` } as any}
            >
              {/* Badge */}
              <div className={styles.cardBadge}>
                {option.badge}
              </div>

              {/* Icon */}
              <div className={styles.cardIcon}>
                <option.icon className={styles.icon} />
              </div>

              {/* Content */}
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{option.title}</h3>
                <p className={styles.cardDescription}>{option.description}</p>

                {/* Features List */}
                <div className={styles.featuresList}>
                  {option.features.map((feature, i) => (
                    <div key={i} className={styles.feature}>
                      <div className={styles.featureIcon}>✓</div>
                      <span className={styles.featureText}>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Link href={option.href} className={styles.cardCta}>
                <span>{option.cta}</span>
                <ArrowRight className={styles.ctaIcon} />
              </Link>

              {/* Hover Effect */}
              <div className={styles.hoverEffect}></div>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className={`${styles.bottomActions} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.actionContent}>
            <h3 className={styles.actionTitle}>Not sure where to start?</h3>
            <p className={styles.actionDescription}>
              Speak with our agricultural technology experts to find the right solution for your needs
            </p>
          </div>
          
          <div className={styles.actionButtons}>
            <Link href="/contact" className={styles.primaryBtn}>
              Talk to Expert
            </Link>
            <Link href="/fpi" className={styles.secondaryBtn}>
              Explore API Docs
            </Link>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`${styles.trustSection} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.trustStats}>
            <div className={styles.trustStat}>
              <span className={styles.trustValue}>2,500+</span>
              <span className={styles.trustLabel}>Active Farmers</span>
            </div>
            <div className={styles.trustStat}>
              <span className={styles.trustValue}>127</span>
              <span className={styles.trustLabel}>Districts Covered</span>
            </div>
            <div className={styles.trustStat}>
              <span className={styles.trustValue}>12+</span>
              <span className={styles.trustLabel}>Research Partners</span>
            </div>
            <div className={styles.trustStat}>
              <span className={styles.trustValue}>99.9%</span>
              <span className={styles.trustLabel}>Uptime</span>
            </div>
          </div>

          <div className={styles.trustLogos}>
            <div className={styles.trustText}>Trusted by leading institutions</div>
            <div className={styles.logos}>
              <div className={styles.logo}>IIT Delhi</div>
              <div className={styles.logo}>ICRISAT</div>
              <div className={styles.logo}>ISRO</div>
              <div className={styles.logo}>ICAR</div>
              <div className={styles.logo}>Ministry of Agriculture</div>
            </div>
          </div>
        </div>

        {/* Final Message */}
        <div className={`${styles.finalMessage} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.messageContent}>
            <h4 className={styles.messageTitle}>🇮🇳 Made in India, for Indian Agriculture</h4>
            <p className={styles.messageText}>
              Supporting food security and sustainable farming practices across the nation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;
