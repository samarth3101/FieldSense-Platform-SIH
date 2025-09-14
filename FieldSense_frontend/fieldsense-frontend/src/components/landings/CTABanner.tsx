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
      description: 'AI-powered crop insights and monitoring',
      features: ['Soil Analysis', 'Crop Health', 'Pest Detection'],
      cta: 'Start Free Trial',
      href: '/dashboard/farmer',
      color: 'green',
      badge: 'Free'
    },
    {
      icon: Microscope,
      title: 'Research Access',
      description: 'Agricultural datasets and research APIs',
      features: ['Open Data', 'API Access', 'Research Tools'],
      cta: 'Join Research',
      href: '/dashboard/researcher',
      color: 'blue',
      badge: 'Academia'
    },
    {
      icon: Building,
      title: 'Government Portal',
      description: 'Regional monitoring and farmer support',
      features: ['Analytics', 'Policy Tools', 'Data Export'],
      cta: 'Access Portal',
      href: '/dashboard/gov',
      color: 'purple',
      badge: 'Secure'
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
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.badge}>
            <Smartphone className={styles.badgeIcon} />
            <span>Ready to Transform Agriculture?</span>
          </div>
          
          <h2 className={styles.title}>
            Choose Your <span className={styles.highlight}>Dashboard</span>
          </h2>
          
          <p className={styles.subtitle}>
            Join thousands using AI to revolutionize Indian agriculture. 
            Select your role and start transforming farming today.
          </p>
        </div>

        {/* CTA Cards */}
        <div className={`${styles.ctaGrid} ${isVisible ? styles.visible : ''}`}>
          {ctaOptions.map((option, index) => (
            <div
              key={index}
              className={`${styles.ctaCard} ${styles[option.color]}`}
              style={{ '--delay': `${index * 0.15}s` } as any}
            >
              <div className={styles.cardBadge}>{option.badge}</div>

              <div className={styles.cardIcon}>
                <option.icon className={styles.icon} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{option.title}</h3>
                <p className={styles.cardDescription}>{option.description}</p>

                <div className={styles.featuresList}>
                  {option.features.map((feature, i) => (
                    <span key={i} className={styles.feature}>
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <Link href={option.href} className={styles.cardCta}>
                <span>{option.cta}</span>
                <ArrowRight className={styles.ctaIcon} />
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className={`${styles.bottomActions} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.actionContent}>
            <h3 className={styles.actionTitle}>Need Help Choosing?</h3>
            <p className={styles.actionDescription}>
              Speak with our experts to find the right solution
            </p>
          </div>
          
          <div className={styles.actionButtons}>
            <Link href="/contact" className={styles.primaryBtn}>
              Talk to Expert
            </Link>
            <Link href="/fpi" className={styles.secondaryBtn}>
              View API Docs
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default CTABanner;
