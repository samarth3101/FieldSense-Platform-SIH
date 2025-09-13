"use client";

import { useState, useEffect, useRef } from 'react';
import { Brain, Leaf, Bug, Layers, Zap, Play } from 'lucide-react';
import styles from '@/styles/components/landing/KrishiMitraSection.module.scss';

interface KrishiMitraSectionProps {
  onTryDemo: () => void;
}

const KrishiMitraSection = ({ onTryDemo }: KrishiMitraSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const aiCards = [
    {
      icon: Leaf,
      title: 'Soil AI',
      description: 'Advanced soil composition analysis using spectral imaging and machine learning',
      features: ['NPK Analysis', 'pH Monitoring', 'Moisture Content', 'Organic Matter'],
      color: 'green',
      example: {
        input: 'Soil sample from Maharashtra',
        output: 'Nitrogen: 85mg/kg, Phosphorus: 23mg/kg, pH: 6.8'
      }
    },
    {
      icon: Leaf,
      title: 'Crop AI',
      description: 'Comprehensive crop health assessment and growth pattern analysis',
      features: ['NDVI Calculation', 'Growth Stages', 'Stress Detection', 'Yield Prediction'],
      color: 'blue',
      example: {
        input: 'Wheat field satellite image',
        output: 'Health Score: 92%, Expected yield: 4.2 tons/hectare'
      }
    },
    {
      icon: Bug,
      title: 'Pest AI',
      description: 'Early pest and disease detection with treatment recommendations',
      features: ['Disease Recognition', 'Pest Identification', 'Treatment Plans', 'Prevention Tips'],
      color: 'red',
      example: {
        input: 'Crop leaves with spots',
        output: 'Detected: Leaf Blight, Confidence: 94%, Apply fungicide'
      }
    },
    {
      icon: Layers,
      title: 'Fusion AI',
      description: 'Multi-modal data fusion for comprehensive agricultural insights',
      features: ['Weather Integration', 'Satellite + Drone', 'IoT Sensors', 'Historical Data'],
      color: 'purple',
      example: {
        input: 'Multiple data sources',
        output: 'Irrigation needed in 2 days, Harvest in 3 weeks'
      }
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

  // Auto-rotate cards
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % aiCards.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [aiCards.length]);

  return (
    <section className={styles.krishiMitraSection} ref={sectionRef}>
      <div className={styles.container}>
        <div className={styles.layout}>
          {/* Left Content */}
          <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.header}>
              <div className={styles.badge}>
                <Brain className={styles.badgeIcon} />
                <span>The Brain Behind FieldSense</span>
              </div>
              
              <h2 className={styles.title}>
                Meet <span className={styles.highlight}>KrishiMitra AI</span>
              </h2>
              
              <p className={styles.description}>
                Our advanced AI system combines multiple machine learning models 
                to provide comprehensive agricultural insights. From soil analysis 
                to pest detection, KrishiMitra processes complex agricultural data 
                to deliver actionable recommendations.
              </p>
            </div>

            {/* AI Cards */}
            <div className={styles.aiCards}>
              {aiCards.map((card, index) => (
                <div
                  key={index}
                  className={`${styles.aiCard} ${styles[card.color]} ${index === activeCard ? styles.active : ''}`}
                  onMouseEnter={() => setActiveCard(index)}
                >
                  <div className={styles.cardIcon}>
                    <card.icon className={styles.icon} />
                  </div>
                  
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDescription}>{card.description}</p>
                    
                    <div className={styles.cardFeatures}>
                      {card.features.map((feature, i) => (
                        <span key={i} className={styles.feature}>
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className={styles.cta}>
              <button className={styles.demoBtn} onClick={onTryDemo}>
                <Play className={styles.playIcon} />
                Try Interactive Demo
              </button>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statValue}>99.2%</span>
                  <span className={styles.statLabel}>Accuracy</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statValue}> 60s</span>
                  <span className={styles.statLabel}>Processing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Demo Panel */}
          <div className={`${styles.demoPanel} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.demoPanelHeader}>
              <div className={styles.panelTitle}>
                <Zap className={styles.panelIcon} />
                Live Analysis
              </div>
              <div className={styles.panelControls}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
              </div>
            </div>

            <div className={styles.demoContent}>
              {/* Active Card Demo */}
              <div className={styles.activeDemo}>
                <div className={styles.demoHeader}>
                  {(() => {
                    const Icon = aiCards[activeCard].icon;
                    return <Icon className={styles.demoIcon} />;
                  })()}
                  <span className={styles.demoTitle}>{aiCards[activeCard].title}</span>
                </div>

                <div className={styles.demoExample}>
                  <div className={styles.inputSection}>
                    <div className={styles.label}>Input</div>
                    <div className={styles.inputValue}>
                      {aiCards[activeCard].example.input}
                    </div>
                  </div>

                  <div className={styles.processingBar}>
                    <div className={styles.progressBar}>
                      <div className={styles.progress}></div>
                    </div>
                    <span className={styles.processingText}>Analyzing...</span>
                  </div>

                  <div className={styles.outputSection}>
                    <div className={styles.label}>Output</div>
                    <div className={styles.outputValue}>
                      {aiCards[activeCard].example.output}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visualization */}
              <div className={styles.visualization}>
                <div className={styles.chartContainer}>
                  <div className={styles.chartTitle}>Model Confidence</div>
                  <div className={styles.confidenceChart}>
                    {[92, 88, 96, 85].map((confidence, i) => (
                      <div key={i} className={styles.confidenceBar}>
                        <div 
                          className={styles.bar}
                          style={{ 
                            height: `${confidence}%`,
                            animationDelay: `${i * 0.2}s`
                          }}
                        ></div>
                        <span className={styles.barLabel}>{confidence}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sample Upload */}
            <div className={styles.sampleUpload}>
              <div className={styles.uploadArea}>
                <div className={styles.uploadIcon}>📸</div>
                <p className={styles.uploadText}>
                  Drop a sample image here or{' '}
                  <button className={styles.uploadBtn} onClick={onTryDemo}>
                    try our demo
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KrishiMitraSection;
