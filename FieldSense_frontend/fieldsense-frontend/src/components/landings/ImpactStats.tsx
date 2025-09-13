"use client";

import { useState, useEffect, useRef } from 'react';
import { TrendingUp, Users, MapPin, Award, Leaf, Droplets } from 'lucide-react';
import styles from '@/styles/components/landing/ImpactStats.module.scss';

const ImpactStats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showModal, setShowModal] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const stats = [
    {
      id: 1,
      icon: TrendingUp,
      value: 35,
      suffix: '%',
      label: 'Fertilizer Waste Reduced',
      description: 'Average reduction in chemical fertilizer usage through AI-powered soil analysis',
      color: 'green',
      story: {
        title: 'Ravi\'s Success Story - Maharashtra',
        content: 'Ravi Kumar from Nashik reduced his fertilizer costs by ₹15,000 per season using FieldSense soil analysis. Our AI detected optimal nutrient levels, preventing over-application and improving soil health.',
        metrics: ['₹15,000 saved per season', '40% less fertilizer usage', '25% yield improvement']
      }
    },
    {
      id: 2,
      icon: Users,
      value: 2500,
      suffix: '+',
      label: 'Farmers Helped',
      description: 'Active farmers using FieldSense across India',
      color: 'blue',
      story: {
        title: 'Growing Farmer Community',
        content: 'From Punjab to Tamil Nadu, our farmer community spans 15 states. Each farmer contributes to our collective knowledge while improving their own yields through AI insights.',
        metrics: ['15 states coverage', '2,500+ active users', '95% satisfaction rate']
      }
    },
    {
      id: 3,
      icon: MapPin,
      value: 127,
      suffix: '',
      label: 'Districts Covered',
      description: 'Agricultural districts across India served by our platform',
      color: 'purple',
      story: {
        title: 'Nationwide Agricultural Impact',
        content: 'Our coverage spans from the wheat fields of Haryana to the rice paddies of West Bengal. Each district adds unique agricultural patterns to our AI knowledge base.',
        metrics: ['127 districts active', '50,000+ hectares monitored', '24/7 satellite coverage']
      }
    },
    {
      id: 4,
      icon: Award,
      value: 12,
      suffix: '',
      label: 'Research Labs',
      description: 'Leading agricultural research institutions using our data',
      color: 'orange',
      story: {
        title: 'Academic & Research Partnerships',
        content: 'IIT Delhi, ICRISAT, and 10 other premier institutions use anonymized FieldSense data for agricultural research, contributing to India\'s food security.',
        metrics: ['12 research partnerships', '25+ published papers', '3 ongoing collaborations']
      }
    },
    {
      id: 5,
      icon: Leaf,
      value: 92,
      suffix: '%',
      label: 'Pest Detection Accuracy',
      description: 'AI accuracy in identifying crop diseases and pests',
      color: 'red',
      story: {
        title: 'Early Pest Detection Success',
        content: 'Our AI detected brown planthopper in rice fields 2 weeks before visible symptoms, saving crops across 500+ hectares in Andhra Pradesh during the 2024 season.',
        metrics: ['92% detection accuracy', '2 weeks early warning', '500+ hectares saved']
      }
    },
    {
      id: 6,
      icon: Droplets,
      value: 28,
      suffix: '%',
      label: 'Water Usage Optimized',
      description: 'Average water savings through precision irrigation recommendations',
      color: 'cyan',
      story: {
        title: 'Water Conservation Impact',
        content: 'Smart irrigation recommendations based on soil moisture AI analysis helped farmers save 28% water while maintaining crop yields during the challenging 2024 monsoon season.',
        metrics: ['28% water savings', '1,200+ farmers benefited', '₹8,500 average savings']
      }
    }
  ];

  // Counter animation hook
  const useCountUp = (end: number, isVisible: boolean, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      let startTime: number;
      let animationId: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - percentage, 3);
        setCount(Math.floor(end * easeOutCubic));

        if (percentage < 1) {
          animationId = requestAnimationFrame(animate);
        }
      };

      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }, [end, isVisible, duration]);

    return count;
  };

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
    <section className={styles.impactSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Our Impact on Indian Agriculture</h2>
          <p className={styles.subtitle}>
            Real results from farmers across India using AI-powered insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className={`${styles.statsGrid} ${isVisible ? styles.visible : ''}`}>
          {stats.map((stat, index) => {
            const animatedValue = useCountUp(stat.value, isVisible, 2000 + index * 200);
            
            return (
              <div
                key={stat.id}
                className={`${styles.statCard} ${styles[stat.color]}`}
                style={{ '--delay': `${index * 0.1}s` } as any}
                onClick={() => setShowModal(stat.id)}
              >
                <div className={styles.statIcon}>
                  <stat.icon className={styles.icon} />
                </div>
                
                <div className={styles.statValue}>
                  <span className={styles.number}>{animatedValue}</span>
                  <span className={styles.suffix}>{stat.suffix}</span>
                </div>
                
                <div className={styles.statLabel}>{stat.label}</div>
                <div className={styles.statDescription}>{stat.description}</div>
                
                <div className={styles.statAction}>
                  <span className={styles.actionText}>Click for story</span>
                  <div className={styles.actionArrow}>→</div>
                </div>

                <div className={styles.statBackground}>
                  <stat.icon className={styles.backgroundIcon} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className={`${styles.cta} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Be Part of the Agricultural Revolution</h3>
            <p className={styles.ctaDescription}>
              Join thousands of farmers who are already transforming their yields with AI
            </p>
          </div>
          <div className={styles.ctaActions}>
            <button className={styles.primaryBtn}>
              Start Your Journey
            </button>
            <button className={styles.secondaryBtn}>
              View Case Studies
            </button>
          </div>
        </div>
      </div>

      {/* Story Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            {(() => {
              const story = stats.find(s => s.id === showModal)?.story;
              if (!story) return null;
              
              return (
                <>
                  <div className={styles.modalHeader}>
                    <h3 className={styles.modalTitle}>{story.title}</h3>
                    <button 
                      className={styles.closeBtn}
                      onClick={() => setShowModal(null)}
                    >
                      ×
                    </button>
                  </div>
                  
                  <div className={styles.modalContent}>
                    <p className={styles.modalText}>{story.content}</p>
                    
                    <div className={styles.modalMetrics}>
                      <h4 className={styles.metricsTitle}>Key Metrics</h4>
                      <div className={styles.metricsList}>
                        {story.metrics.map((metric, i) => (
                          <div key={i} className={styles.metric}>
                            <div className={styles.metricIcon}>✓</div>
                            <span className={styles.metricText}>{metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.modalFooter}>
                    <button 
                      className={styles.modalBtn}
                      onClick={() => setShowModal(null)}
                    >
                      Close Story
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </section>
  );
};

export default ImpactStats;
