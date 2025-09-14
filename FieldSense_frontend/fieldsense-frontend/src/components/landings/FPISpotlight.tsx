"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Database, 
  Code, 
  Key, 
  Zap, 
  Shield, 
  Globe,
  Copy,
  Check,
  ExternalLink
} from 'lucide-react';
import styles from '@/styles/components/landing/FPISpotlight.module.scss';

const FPISpotlight = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const codeExample = `import requests

# Initialize FieldSense API
api_key = "your_fpi_key_here"
headers = {"Authorization": f"Bearer {api_key}"}

# Get soil analysis
response = requests.post(
    "https://api.fieldsense.ai/v1/analyze/soil",
    headers=headers,
    json={
        "location": {"lat": 19.0760, "lng": 72.8777},
        "image_url": "your_soil_image.jpg"
    }
)

result = response.json()
print(f"Soil Health: {result['health_score']}")
print(f"NPK: {result['nutrients']}")`;

  const endpoints = [
    {
      method: 'POST',
      path: '/v1/analyze/soil',
      description: 'Analyze soil composition and health'
    },
    {
      method: 'POST',
      path: '/v1/analyze/crop', 
      description: 'Crop health and growth analysis'
    },
    {
      method: 'GET',
      path: '/v1/weather/{location}',
      description: 'Real-time weather and forecast data'
    },
    {
      method: 'GET',
      path: '/v1/satellite/{coords}',
      description: 'Satellite imagery and NDVI data'
    }
  ];

  const features = [
    {
      icon: Database,
      title: 'Comprehensive Data',
      description: 'Access satellite imagery, weather data, and crop insights',
      color: 'blue'
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Get instant results with high-performance AI infrastructure',
      color: 'yellow'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encrypted data transmission',
      color: 'green'
    }
  ];

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

  // Auto-rotate endpoints
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEndpoint((prev) => (prev + 1) % endpoints.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [endpoints.length]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeExample);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section className={styles.fpiSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.badge}>
            <Code className={styles.badgeIcon} />
            <span>FieldSense Public API</span>
          </div>
          
          <h2 className={styles.title}>
            Build with <span className={styles.highlight}>FPI</span>
          </h2>
          
          <p className={styles.subtitle}>
            Integrate agricultural AI into your applications with our comprehensive API. 
            Access the same technology that powers FieldSense.
          </p>
        </div>

        <div className={styles.content}>
          {/* Left: Code Example */}
          <div className={`${styles.codeSection} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.codeHeader}>
              <div className={styles.codeTitle}>
                <span className={styles.language}>Python</span>
                <span className={styles.filename}>soil_analysis.py</span>
              </div>
              
              <button 
                className={styles.copyBtn}
                onClick={handleCopyCode}
                title="Copy code"
              >
                {copiedCode ? (
                  <Check className={styles.copyIcon} />
                ) : (
                  <Copy className={styles.copyIcon} />
                )}
              </button>
            </div>

            <div className={styles.codeBlock}>
              <pre className={styles.code}>
                <code>{codeExample}</code>
              </pre>
            </div>

            {/* API Endpoints */}
            <div className={styles.endpoints}>
              <div className={styles.endpointsTitle}>Popular Endpoints</div>
              <div className={styles.endpointsList}>
                {endpoints.map((endpoint, index) => (
                  <div
                    key={index}
                    className={`${styles.endpoint} ${index === activeEndpoint ? styles.active : ''}`}
                    onClick={() => setActiveEndpoint(index)}
                  >
                    <div className={styles.endpointMethod}>
                      <span className={`${styles.method} ${styles[endpoint.method.toLowerCase()]}`}>
                        {endpoint.method}
                      </span>
                      <span className={styles.path}>{endpoint.path}</span>
                    </div>
                    <div className={styles.endpointDescription}>
                      {endpoint.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Features & CTA */}
          <div className={`${styles.infoSection} ${isVisible ? styles.visible : ''}`}>
            {/* Key Features */}
            <div className={styles.features}>
              <h3 className={styles.featuresTitle}>Why Choose FPI?</h3>
              <div className={styles.featuresList}>
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`${styles.feature} ${styles[feature.color]}`}
                  >
                    <div className={styles.featureIcon}>
                      <feature.icon className={styles.icon} />
                    </div>
                    <div className={styles.featureContent}>
                      <h4 className={styles.featureTitle}>{feature.title}</h4>
                      <p className={styles.featureDescription}>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* API Key Signup */}
            <div className={styles.apiKeySection}>
              <div className={styles.apiKeyHeader}>
                <Key className={styles.keyIcon} />
                <div>
                  <h4 className={styles.apiKeyTitle}>Get Your API Key</h4>
                  <p className={styles.apiKeyDescription}>
                    Start with 1,000 free API calls per month
                  </p>
                </div>
              </div>

              <div className={styles.keyPreview}>
                <span className={styles.keyPrefix}>fpi_</span>
                <span className={styles.keyValue}>live_sk_...</span>
                <span className={styles.keyStatus}>Ready</span>
              </div>

              <Link href="/fpi" className={styles.getKeyBtn}>
                Get Free API Key
                <ExternalLink className={styles.btnIcon} />
              </Link>
            </div>

            {/* Stats & Documentation */}
            <div className={styles.bottomSection}>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>99.9%</span>
                  <span className={styles.statLabel}>Uptime</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}>&lt;500ms</span>
                  <span className={styles.statLabel}>Response</span>
                </div>
              </div>

              <Link href="/fpi" className={styles.docBtn}>
                View Documentation
                <ExternalLink className={styles.btnIcon} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FPISpotlight;
