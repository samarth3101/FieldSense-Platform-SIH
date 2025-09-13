"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  Upload, 
  Brain, 
  MessageSquare, 
  Share2, 
  CheckCircle, 
  ArrowRight 
} from 'lucide-react';
import styles from '@/styles/components/landing/HowItWorks.module.scss';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const steps = [
    {
      id: 1,
      icon: Upload,
      title: 'Upload',
      subtitle: 'Capture or Upload Data',
      description: 'Take photos of your crops, upload drone imagery, or import soil samples. Our system accepts multiple data formats including images, GeoTIFF files, and sensor data.',
      details: [
        'Mobile camera capture with GPS tagging',
        'Drone and satellite imagery support',
        'Soil sample uploads with metadata',
        'IoT sensor data integration'
      ],
      visual: 'upload',
      color: 'blue'
    },
    {
      id: 2,
      icon: Brain,
      title: 'KrishiMitra Analysis',
      subtitle: 'AI Processing & Enhancement',
      description: 'Our advanced AI system processes your data, combining it with satellite imagery, weather data, and historical patterns to generate comprehensive insights.',
      details: [
        'Multi-spectral image analysis',
        'Weather and climate correlation',
        'Historical data pattern matching',
        'Machine learning model ensemble'
      ],
      visual: 'analysis',
      color: 'purple'
    },
    {
      id: 3,
      icon: MessageSquare,
      title: 'Advisory',
      subtitle: 'Personalized Recommendations',
      description: 'Receive actionable insights tailored to your specific crop, location, and farming practices. All recommendations are provided in your preferred language with confidence scores.',
      details: [
        'Crop-specific recommendations',
        'Location-based insights',
        'Multi-language support',
        'Confidence scoring'
      ],
      visual: 'advisory',
      color: 'green'
    },
    {
      id: 4,
      icon: Share2,
      title: 'Research Feed',
      subtitle: 'Anonymous Data Contribution',
      description: 'Your anonymized data contributes to agricultural research, helping improve farming practices across India while maintaining complete privacy and data security.',
      details: [
        'Complete data anonymization',
        'Contribution to research database',
        'Privacy-first approach',
        'Community benefit'
      ],
      visual: 'research',
      color: 'orange'
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

  // Auto-progress through steps
  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isVisible, steps.length]);

  return (
    <section className={styles.howItWorksSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>How It Works</h2>
          <p className={styles.subtitle}>
            From upload to insights in four simple steps
          </p>
        </div>

        <div className={styles.content}>
          {/* Vertical Stepper */}
          <div className={`${styles.stepper} ${isVisible ? styles.visible : ''}`}>
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`${styles.step} ${styles[step.color]} ${index === activeStep ? styles.active : ''} ${index <= activeStep ? styles.completed : ''}`}
                onClick={() => setActiveStep(index)}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>
                    {index <= activeStep ? (
                      <CheckCircle className={styles.checkIcon} />
                    ) : (
                      <span className={styles.number}>{step.id}</span>
                    )}
                  </div>
                  
                  <div className={styles.stepIcon}>
                    <step.icon className={styles.icon} />
                  </div>
                  
                  <div className={styles.stepTitles}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepSubtitle}>{step.subtitle}</p>
                  </div>
                  
                  <div className={styles.stepArrow}>
                    <ArrowRight className={styles.arrow} />
                  </div>
                </div>

                <div className={styles.stepContent}>
                  <p className={styles.stepDescription}>{step.description}</p>
                  
                  <div className={styles.stepDetails}>
                    {step.details.map((detail, i) => (
                      <div key={i} className={styles.detail}>
                        <div className={styles.detailDot}></div>
                        <span className={styles.detailText}>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={styles.connector}>
                    <div className={`${styles.connectorLine} ${index < activeStep ? styles.completed : ''}`}></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual Panel */}
          <div className={`${styles.visualPanel} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.visualContainer}>
              <div className={styles.visualHeader}>
                <div className={styles.visualTitle}>
                  Step {activeStep + 1}: {steps[activeStep].title}
                </div>
                <div className={styles.visualProgress}>
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`${styles.progressDot} ${index === activeStep ? styles.active : ''} ${index < activeStep ? styles.completed : ''}`}
                    />
                  ))}
                </div>
              </div>

              <div className={styles.visualContent}>
                {/* Upload Visual */}
                {steps[activeStep].visual === 'upload' && (
                  <div className={styles.uploadVisual}>
                    <div className={styles.phoneDemo}>
                      <div className={styles.phoneScreen}>
                        <div className={styles.camera}>📱</div>
                        <div className={styles.uploadProgress}>
                          <div className={styles.progressBar}>
                            <div className={styles.progress}></div>
                          </div>
                          <span>Uploading crop image...</span>
                        </div>
                      </div>
                    </div>
                    <div className={styles.dataFlow}>
                      <div className={styles.dataPoint}>📸 Image</div>
                      <div className={styles.dataPoint}>📍 GPS</div>
                      <div className={styles.dataPoint}>⏰ Timestamp</div>
                    </div>
                  </div>
                )}

                {/* Analysis Visual */}
                {steps[activeStep].visual === 'analysis' && (
                  <div className={styles.analysisVisual}>
                    <div className={styles.aiProcessor}>
                      <div className={styles.processorCore}>
                        <Brain className={styles.brainIcon} />
                        <div className={styles.processingRings}>
                          <div className={styles.ring}></div>
                          <div className={styles.ring}></div>
                          <div className={styles.ring}></div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.dataInputs}>
                      <div className={styles.dataInput}>🛰️ Satellite</div>
                      <div className={styles.dataInput}>🌤️ Weather</div>
                      <div className={styles.dataInput}>📊 Historical</div>
                      <div className={styles.dataInput}>🌱 Crop Data</div>
                    </div>
                  </div>
                )}

                {/* Advisory Visual */}
                {steps[activeStep].visual === 'advisory' && (
                  <div className={styles.advisoryVisual}>
                    <div className={styles.reportCard}>
                      <div className={styles.reportHeader}>
                        <span className={styles.reportTitle}>Crop Analysis Report</span>
                        <span className={styles.confidence}>95% Confidence</span>
                      </div>
                      <div className={styles.reportContent}>
                        <div className={styles.metric}>
                          <span className={styles.label}>Soil Health</span>
                          <div className={styles.healthBar}>
                            <div className={styles.healthLevel}></div>
                          </div>
                          <span className={styles.value}>Good</span>
                        </div>
                        <div className={styles.recommendations}>
                          <div className={styles.recommendation}>
                            ✅ Apply nitrogen fertilizer
                          </div>
                          <div className={styles.recommendation}>
                            🚨 Monitor for pest signs
                          </div>
                          <div className={styles.recommendation}>
                            💧 Increase irrigation frequency
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Research Visual */}
                {steps[activeStep].visual === 'research' && (
                  <div className={styles.researchVisual}>
                    <div className={styles.dataAnonymization}>
                      <div className={styles.originalData}>
                        <div className={styles.dataBox}>
                          <span className={styles.dataLabel}>Your Data</span>
                          <div className={styles.dataDetails}>
                            <div className={styles.personal}>📍 Location</div>
                            <div className={styles.personal}>👤 Farmer ID</div>
                            <div className={styles.personal}>📱 Device Info</div>
                          </div>
                        </div>
                        <ArrowRight className={styles.transformArrow} />
                        <div className={styles.anonymizedData}>
                          <span className={styles.dataLabel}>Anonymized</span>
                          <div className={styles.dataDetails}>
                            <div className={styles.anonymous}>🌐 Region Hash</div>
                            <div className={styles.anonymous}>🔢 Anonymous ID</div>
                            <div className={styles.anonymous}>📊 Crop Patterns</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={styles.researchNetwork}>
                      <div className={styles.networkNode}>🎓 Universities</div>
                      <div className={styles.networkNode}>🔬 Research Labs</div>
                      <div className={styles.networkNode}>🏛️ Government</div>
                      <div className={styles.networkNode}>🌾 Farmers</div>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.visualFooter}>
                <div className={styles.processingTime}>
                  ⚡ Processing time: {['2-5 seconds', '30-60 seconds', '1-2 seconds', 'Instant'][activeStep]}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
