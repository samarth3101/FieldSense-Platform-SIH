"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Sprout, 
  Bug, 
  Database, 
  Code, 
  TrendingUp, 
  Shield, 
  MapPin, 
  Zap,
  Users,
  Building,
  Smartphone,
  Globe
} from 'lucide-react';
import styles from '@/styles/components/landing/FeaturesGrid.module.scss';

const FeaturesGrid = () => {
  const [activeTab, setActiveTab] = useState('farmers');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const tabs = [
    { id: 'farmers', label: 'Farmers', icon: Sprout, color: 'green' },
    { id: 'researchers', label: 'Researchers', icon: Database, color: 'blue' },
    { id: 'government', label: 'Government', icon: Building, color: 'purple' },
    { id: 'startups', label: 'Startups', icon: Code, color: 'orange' },
  ];

  const features = {
    farmers: [
      {
        icon: Sprout,
        title: 'Soil & Crop Analysis',
        description: 'Real-time soil health monitoring and crop condition assessment using satellite and drone imagery',
        features: ['NDVI Analysis', 'Nutrient Mapping', 'Growth Tracking'],
        cta: 'Start Analysis',
        href: '/dashboard/farmer'
      },
      {
        icon: Bug,
        title: 'Pest Detection',
        description: 'Early pest and disease identification with AI-powered image recognition and prevention strategies',
        features: ['Image Recognition', 'Disease Alerts', 'Treatment Plans'],
        cta: 'Try Detection',
        href: '/dashboard/farmer/analysis'
      },
      {
        icon: TrendingUp,
        title: 'Yield Optimization',
        description: 'Personalized recommendations to maximize crop yield based on historical data and current conditions',
        features: ['Yield Prediction', 'Optimization Tips', 'Market Insights'],
        cta: 'Optimize Now',
        href: '/dashboard/farmer/advisory'
      },
      {
        icon: Smartphone,
        title: 'Mobile App',
        description: 'Easy-to-use mobile application with offline capabilities and voice commands in local languages',
        features: ['Offline Mode', 'Voice Commands', 'Multi-language'],
        cta: 'Download App',
        href: '#mobile-app'
      }
    ],
    researchers: [
      {
        icon: Database,
        title: 'Open Datasets',
        description: 'Access anonymized agricultural data from thousands of farms across India for research purposes',
        features: ['Satellite Data', 'Weather Records', 'Crop Analytics'],
        cta: 'Browse Data',
        href: '/fpi'
      },
      {
        icon: Code,
        title: 'API Integration',
        description: 'Comprehensive APIs for integrating FieldSense capabilities into your research applications',
        features: ['REST APIs', 'Real-time Data', 'Custom Models'],
        cta: 'View APIs',
        href: '/fpi'
      },
      {
        icon: Shield,
        title: 'Secure Access',
        description: 'Institutional verification and secure data access with proper attribution and citation support',
        features: ['Verified Access', 'Data Attribution', 'Usage Analytics'],
        cta: 'Request Access',
        href: '/dashboard/researcher'
      },
      {
        icon: Globe,
        title: 'Collaboration Hub',
        description: 'Connect with other researchers, share findings, and collaborate on agricultural innovation projects',
        features: ['Research Network', 'Data Sharing', 'Publication Support'],
        cta: 'Join Network',
        href: '/contact'
      }
    ],
    government: [
      {
        icon: MapPin,
        title: 'Regional Insights',
        description: 'District-level agricultural monitoring and policy impact assessment with real-time dashboards',
        features: ['District Analytics', 'Policy Tracking', 'Impact Assessment'],
        cta: 'View Dashboard',
        href: '/dashboard/gov'
      },
      {
        icon: TrendingUp,
        title: 'Crop Monitoring',
        description: 'Large-scale crop health monitoring and early warning systems for agricultural planning',
        features: ['Satellite Monitoring', 'Early Warnings', 'Seasonal Reports'],
        cta: 'Monitor Crops',
        href: '/dashboard/gov/overview'
      },
      {
        icon: Users,
        title: 'Farmer Support',
        description: 'Tools to identify farmers in need of support and track the effectiveness of agricultural schemes',
        features: ['Farmer Identification', 'Scheme Tracking', 'Support Analytics'],
        cta: 'Support Farmers',
        href: '/dashboard/gov/region'
      },
      {
        icon: Shield,
        title: 'Data Export',
        description: 'Secure data export capabilities with audit trails and compliance reporting for government use',
        features: ['Secure Export', 'Audit Trails', 'Compliance Reports'],
        cta: 'Export Data',
        href: '/dashboard/gov/export'
      }
    ],
    startups: [
      {
        icon: Code,
        title: 'Developer APIs',
        description: 'Build innovative agtech solutions using our comprehensive suite of agricultural AI APIs',
        features: ['ML Models', 'Satellite APIs', 'Weather Integration'],
        cta: 'Start Building',
        href: '/fpi'
      },
      {
        icon: Zap,
        title: 'Rapid Prototyping',
        description: 'Quickly prototype and test agricultural solutions with our sandbox environment and test data',
        features: ['Sandbox Environment', 'Test Data', 'Quick Deploy'],
        cta: 'Try Sandbox',
        href: '/fpi'
      },
      {
        icon: Database,
        title: 'Market Data',
        description: 'Access real-time agricultural market data, pricing trends, and demand forecasting',
        features: ['Price Data', 'Market Trends', 'Demand Forecasting'],
        cta: 'Access Data',
        href: '/fpi'
      },
      {
        icon: Users,
        title: 'Partner Network',
        description: 'Join our partner ecosystem and reach thousands of farmers through our distribution network',
        features: ['Partner Program', 'Farmer Network', 'Revenue Sharing'],
        cta: 'Become Partner',
        href: '/contact'
      }
    ]
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.featuresSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Features for Everyone</h2>
          <p className={styles.subtitle}>
            Tailored solutions for farmers, researchers, government, and startups
          </p>
        </div>

        {/* Persona Tabs */}
        <div className={`${styles.tabs} ${isVisible ? styles.visible : ''}`}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${styles[tab.color]} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className={styles.tabIcon} />
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className={`${styles.featuresGrid} ${isVisible ? styles.visible : ''}`}>
          {features[activeTab as keyof typeof features].map((feature, index) => (
            <div
              key={index}
              className={styles.featureCard}
              style={{ '--delay': `${index * 0.1}s` } as any}
            >
              <div className={styles.featureIcon}>
                <feature.icon className={styles.icon} />
              </div>
              
              <div className={styles.featureContent}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>{feature.description}</p>
                
                <div className={styles.featureList}>
                  {feature.features.map((item, i) => (
                    <span key={i} className={styles.featureItem}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className={styles.featureFooter}>
                <Link href={feature.href} className={styles.featureCta}>
                  {feature.cta}
                  <span className={styles.ctaArrow}>→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`${styles.bottomCta} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Ready to get started?</h3>
            <p className={styles.ctaDescription}>
              Choose your path and start transforming agriculture with AI
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/auth?mode=register" className={styles.primaryBtn}>
              Get Started Free
            </Link>
            <Link href="/contact" className={styles.secondaryBtn}>
              Contact Sales
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
