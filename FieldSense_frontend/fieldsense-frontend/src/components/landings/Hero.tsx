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
  ChevronDown,
  Bell,
  X,
  Calendar,
  ChevronRight,
  ExternalLink,
  Loader
} from 'lucide-react';
import dynamic from 'next/dynamic';
import styles from '@/styles/components/landing/Hero.module.scss';

// Dynamic import for Lottie to avoid SSR issues
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

// TypeScript interface for schemes
interface GovernmentScheme {
  id: number;
  title: string;
  description: string;
  date: string;
  type: string;
  urgent: boolean;
  amount: string;
  eligibility: string;
}

interface HeroProps {
  onTryDemo: () => void;
}

const Hero = ({ onTryDemo }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isLottieLoading, setIsLottieLoading] = useState(true);
  
  // Government schemes notice board state
  const [isNoticeOpen, setIsNoticeOpen] = useState(false);
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([]);
  
  // 🔥 ENHANCED - Video Demo Modal State
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Government schemes data
  const governmentSchemes: GovernmentScheme[] = [
    {
      id: 1,
      title: "PM-KISAN 16th Installment Released",
      description: "Direct income support of ₹2000 to eligible farmers",
      date: "2025-01-15",
      type: "Income Support",
      urgent: true,
      amount: "₹2,000",
      eligibility: "All landholding farmers"
    },
    {
      id: 2, 
      title: "Digital Agriculture Mission 2025",
      description: "₹14,000 crore allocated for agritech digitization",
      date: "2025-01-10",
      type: "Technology",
      urgent: false,
      amount: "₹14,000 Crore",
      eligibility: "Farmers, FPOs, Agtech companies"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme Extended",
      description: "Free soil testing services expanded nationwide",
      date: "2025-01-08", 
      type: "Soil Health",
      urgent: false,
      amount: "Free Service",
      eligibility: "All farmers"
    },
    {
      id: 4,
      title: "Agriculture Infrastructure Fund (AIF)",
      description: "₹1 lakh crore fund for post-harvest infrastructure",
      date: "2024-12-28",
      type: "Infrastructure", 
      urgent: false,
      amount: "Up to ₹2 Crore",
      eligibility: "Farmers, FPOs, Cooperatives"
    },
    {
      id: 5,
      title: "Krishi Vigyan Kendra Expansion",
      description: "Strengthening agricultural extension services",
      date: "2024-12-25",
      type: "Education",
      urgent: false,
      amount: "Various Grants",
      eligibility: "Agricultural institutions"
    }
  ];

  // 🔥 ENHANCED - Video Functions
  const handleTryDemo = () => {
    setVideoLoading(true);
    setShowVideoModal(true);
    onTryDemo();
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    setVideoLoading(false);
    setVideoProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleVideoEnded = () => {
    // 🔥 ENHANCED - Smooth fade out before closing
    const videoContainer = document.getElementById('video-container');
    if (videoContainer) {
      videoContainer.style.transition = 'all 0.5s ease';
      videoContainer.style.opacity = '0';
      videoContainer.style.transform = 'scale(0.95)';
      setTimeout(handleCloseVideo, 500);
    } else {
      handleCloseVideo();
    }
  };

  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setVideoProgress(progress);
    }
  };

  const handleVideoLoadedData = () => {
    setVideoLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Initialize schemes data
  useEffect(() => {
    setSchemes(governmentSchemes);
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

    if (typeof window !== 'undefined') {
      loadAnimation();
    }
  }, []);

  // Handle ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (showVideoModal) {
          handleCloseVideo();
        } else {
          setIsNoticeOpen(false);
        }
      }
    };

    if (isNoticeOpen || showVideoModal) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isNoticeOpen, showVideoModal]);

  // Auto-play when modal opens
  useEffect(() => {
    if (showVideoModal && videoRef.current && !videoLoading) {
      setTimeout(() => {
        videoRef.current?.play();
      }, 800); // Delay for smooth animation
    }
  }, [showVideoModal, videoLoading]);

  // Scroll to next section function
  const scrollToNextSection = () => {
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
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className={styles.hero} ref={heroRef}>
        {/* Background Elements */}
        <div className={styles.background}>
          <div className={styles.backgroundOverlay}></div>
          
          {/* Floating Animation Elements */}
          <div className={styles.floatingElements}>
            <div className={styles.floatingElement} style={{ '--delay': '0s' } as React.CSSProperties}>
              <Satellite className={styles.icon} />
            </div>
            <div className={styles.floatingElement} style={{ '--delay': '2s' } as React.CSSProperties}>
              <TrendingUp className={styles.icon} />
            </div>
            <div className={styles.floatingElement} style={{ '--delay': '4s' } as React.CSSProperties}>
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
                onClick={handleTryDemo}
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

      {/* Bell Button */}
      {!isNoticeOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '30px',
            right: '30px',
            zIndex: 10000
          }}
        >
          <button
            onClick={() => setIsNoticeOpen(true)}
            style={{
              background: 'white',
              color: '#16a34a',
              border: '2px solid #e5e7eb',
              borderRadius: '50%',
              width: '60px',
              height: '60px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
              e.currentTarget.style.borderColor = '#16a34a';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}
          >
            <Bell size={24} />
          </button>
        </div>
      )}

      {/* 🔥 STUNNING PROFESSIONAL VIDEO MODAL */}
      {showVideoModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(135deg, rgba(0,0,0,0.9), rgba(22,163,74,0.1))',
            backdropFilter: 'blur(20px)',
            zIndex: 10001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            animation: 'fadeIn 0.4s ease'
          }}
          onClick={handleCloseVideo}
        >
          {/* 🔥 PROFESSIONAL VIDEO CONTAINER */}
          <div
            id="video-container"
            style={{
              position: 'relative',
              width: '95%',
              maxWidth: '1200px',
              background: 'rgba(0,0,0,0.95)',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 50px 100px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.1)',
              animation: 'slideInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: 'translateY(0)',
              opacity: 1,
              transition: 'all 0.5s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 🔥 PREMIUM HEADER BAR */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '80px',
                background: 'linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 30px'
              }}
            >
              {/* FieldSense Branding */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px'
                }}>
                  🌱
                </div>
                <div>
                  <div style={{
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '700',
                    letterSpacing: '-0.5px'
                  }}>
                    FieldSense Demo
                  </div>
                  <div style={{
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px',
                    marginTop: '2px'
                  }}>
                    AI-Powered Agriculture Platform
                  </div>
                </div>
              </div>

              {/* Premium Close Button */}
              <button
                onClick={handleCloseVideo}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: '12px',
                  width: '48px',
                  height: '48px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* 🔥 LOADING OVERLAY */}
            {videoLoading && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(0,0,0,0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 15,
                  color: 'white'
                }}
              >
                <div
                  style={{
                    width: '60px',
                    height: '60px',
                    border: '4px solid rgba(22,163,74,0.3)',
                    borderTop: '4px solid #16a34a',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    marginBottom: '20px'
                  }}
                />
                <div style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  marginBottom: '8px'
                }}>
                  Loading Demo Video...
                </div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255,255,255,0.7)'
                }}>
                  Preparing your FieldSense experience
                </div>
              </div>
            )}

            {/* 🔥 PREMIUM VIDEO ELEMENT */}
            <video
              ref={videoRef}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '75vh',
                display: 'block',
                borderRadius: '24px'
              }}
              controls={false}
              autoPlay={false}
              muted={true}
              onLoadedData={handleVideoLoadedData}
              onTimeUpdate={handleVideoTimeUpdate}
              onEnded={handleVideoEnded}
              onClick={(e) => {
                e.stopPropagation();
                if (videoRef.current?.paused) {
                  videoRef.current.play();
                } else {
                  videoRef.current?.pause();
                }
              }}
            >
              <source src="/videos/fieldsense-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* 🔥 ELEGANT PROGRESS BAR */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: '6px',
                background: 'rgba(255,255,255,0.1)',
                zIndex: 10
              }}
            >
              <div
                style={{
                  width: `${videoProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #16a34a, #4ade80)',
                  transition: 'width 0.1s ease',
                  boxShadow: '0 0 10px rgba(22,163,74,0.5)'
                }}
              />
            </div>

            {/* 🔥 PREMIUM WATERMARK */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '30px',
                background: 'rgba(0,0,0,0.8)',
                backdropFilter: 'blur(10px)',
                padding: '8px 16px',
                borderRadius: '20px',
                border: '1px solid rgba(255,255,255,0.1)',
                zIndex: 10
              }}
            >
              <div style={{
                color: 'white',
                fontSize: '12px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  background: 'linear-gradient(135deg, #16a34a, #15803d)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '10px'
                }}>
                  🌱
                </div>
                FieldSense Platform
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notice Board Panel - (existing code remains the same) */}
      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: isNoticeOpen ? '20px' : '-350px',
          width: '320px',
          height: 'calc(100vh - 40px)',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          zIndex: 9998,
          transition: 'all 0.3s ease',
          overflow: 'hidden',
          border: '1px solid #e5e7eb'
        }}
      >
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #16a34a, #15803d)',
          color: 'white',
          padding: '16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '16px',
              fontWeight: '700'
            }}>
              🇮🇳 <span>Govt Schemes</span>
            </div>
            <div style={{
              fontSize: '12px',
              opacity: 0.9,
              marginTop: '2px'
            }}>
              Latest agricultural benefits
            </div>
          </div>
          <button
            onClick={() => setIsNoticeOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              borderRadius: '6px',
              padding: '4px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{
          height: 'calc(100% - 140px)',
          overflow: 'auto',
          padding: '16px'
        }}>
          {schemes.map((scheme) => (
            <div key={scheme.id} style={{
              background: '#f9fafb',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '12px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f0fdf4';
              e.currentTarget.style.borderColor = '#bbf7d0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#f9fafb';
              e.currentTarget.style.borderColor = '#e5e7eb';
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '8px'
              }}>
                <span style={{
                  background: scheme.urgent ? '#fef2f2' : '#eff6ff',
                  color: scheme.urgent ? '#dc2626' : '#3b82f6',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: '500'
                }}>
                  {scheme.urgent ? 'URGENT' : scheme.type}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '10px',
                  color: '#6b7280'
                }}>
                  <Calendar size={10} />
                  {new Date(scheme.date).toLocaleDateString()}
                </div>
              </div>

              <h4 style={{
                fontSize: '14px',
                fontWeight: '600',
                color: '#1f2937',
                margin: '0 0 6px 0',
                lineHeight: '1.3'
              }}>{scheme.title}</h4>

              <p style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: '0 0 8px 0',
                lineHeight: '1.4'
              }}>{scheme.description}</p>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '10px',
                  cursor: 'pointer'
                }}>
                  Save for later
                </button>
                <button style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: '#16a34a',
                  color: 'white',
                  border: 'none',
                  padding: '4px 8px',
                  borderRadius: '6px',
                  fontSize: '10px',
                  fontWeight: '500',
                  cursor: 'pointer'
                }}>
                  Learn More <ChevronRight size={10} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          background: '#f8fafc',
          padding: '12px 16px',
          borderTop: '1px solid #e5e7eb',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '10px',
            color: '#6b7280'
          }}>
            📅 Updated daily
          </div>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: '1px solid #d1d5db',
            padding: '4px 8px',
            borderRadius: '6px',
            fontSize: '10px',
            color: '#374151',
            cursor: 'pointer'
          }}>
            <ExternalLink size={10} />
            View All
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isNoticeOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.1)',
            zIndex: 9997
          }}
          onClick={() => setIsNoticeOpen(false)}
        />
      )}

      {/* 🔥 CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0;
            transform: translateY(60px) scale(0.95);
          }
          to { 
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default Hero;