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
  Globe,
  X,
  Mail,
  Phone,
  MessageCircle,
  Send
} from 'lucide-react';
import styles from '@/styles/components/landing/FeaturesGrid.module.scss';

const FeaturesGrid = () => {
  const [activeTab, setActiveTab] = useState('farmers');
  const [isVisible, setIsVisible] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Contact form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    companySize: '',
    useCase: '',
    budget: '',
    message: ''
  });

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
        features: ['NDVI Analysis', 'Nutrient Mapping', 'Growth Tracking']
      },
      {
        icon: Bug,
        title: 'Pest Detection',
        description: 'Early pest and disease identification with AI-powered image recognition and prevention strategies',
        features: ['Image Recognition', 'Disease Alerts', 'Treatment Plans']
      },
      {
        icon: TrendingUp,
        title: 'Yield Optimization',
        description: 'Personalized recommendations to maximize crop yield based on historical data and current conditions',
        features: ['Yield Prediction', 'Optimization Tips', 'Market Insights']
      },
      {
        icon: Smartphone,
        title: 'Mobile App',
        description: 'Easy-to-use mobile application with offline capabilities and voice commands in local languages',
        features: ['Offline Mode', 'Voice Commands', 'Multi-language']
      }
    ],
    researchers: [
      {
        icon: Database,
        title: 'Open Datasets',
        description: 'Access anonymized agricultural data from thousands of farms across India for research purposes',
        features: ['Satellite Data', 'Weather Records', 'Crop Analytics']
      },
      {
        icon: Code,
        title: 'API Integration',
        description: 'Comprehensive APIs for integrating FieldSense capabilities into your research applications',
        features: ['REST APIs', 'Real-time Data', 'Custom Models']
      },
      {
        icon: Shield,
        title: 'Secure Access',
        description: 'Institutional verification and secure data access with proper attribution and citation support',
        features: ['Verified Access', 'Data Attribution', 'Usage Analytics']
      },
      {
        icon: Globe,
        title: 'Collaboration Hub',
        description: 'Connect with other researchers, share findings, and collaborate on agricultural innovation projects',
        features: ['Research Network', 'Data Sharing', 'Publication Support']
      }
    ],
    government: [
      {
        icon: MapPin,
        title: 'Regional Insights',
        description: 'District-level agricultural monitoring and policy impact assessment with real-time dashboards',
        features: ['District Analytics', 'Policy Tracking', 'Impact Assessment']
      },
      {
        icon: TrendingUp,
        title: 'Crop Monitoring',
        description: 'Large-scale crop health monitoring and early warning systems for agricultural planning',
        features: ['Satellite Monitoring', 'Early Warnings', 'Seasonal Reports']
      },
      {
        icon: Users,
        title: 'Farmer Support',
        description: 'Tools to identify farmers in need of support and track the effectiveness of agricultural schemes',
        features: ['Farmer Identification', 'Scheme Tracking', 'Support Analytics']
      },
      {
        icon: Shield,
        title: 'Data Export',
        description: 'Secure data export capabilities with audit trails and compliance reporting for government use',
        features: ['Secure Export', 'Audit Trails', 'Compliance Reports']
      }
    ],
    startups: [
      {
        icon: Code,
        title: 'Developer APIs',
        description: 'Build innovative agtech solutions using our comprehensive suite of agricultural AI APIs',
        features: ['ML Models', 'Satellite APIs', 'Weather Integration']
      },
      {
        icon: Zap,
        title: 'Rapid Prototyping',
        description: 'Quickly prototype and test agricultural solutions with our sandbox environment and test data',
        features: ['Sandbox Environment', 'Test Data', 'Quick Deploy']
      },
      {
        icon: Database,
        title: 'Market Data',
        description: 'Access real-time agricultural market data, pricing trends, and demand forecasting',
        features: ['Price Data', 'Market Trends', 'Demand Forecasting']
      },
      {
        icon: Users,
        title: 'Partner Network',
        description: 'Join our partner ecosystem and reach thousands of farmers through our distribution network',
        features: ['Partner Program', 'Farmer Network', 'Revenue Sharing']
      }
    ]
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    alert('Thank you for your interest! Our sales team will contact you soon.');
    setShowContactModal(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      companySize: '',
      useCase: '',
      budget: '',
      message: ''
    });
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

  // Handle ESC key and body scroll
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowContactModal(false);
      }
    };

    if (showContactModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showContactModal]);

  return (
    <>
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
                
                {/* ✅ REMOVED: Feature Footer with action buttons */}
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
              <button 
                onClick={() => setShowContactModal(true)} 
                className={styles.secondaryBtn}
              >
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Sales Modal */}
      {showContactModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '1rem'
          }}
          onClick={() => setShowContactModal(false)}
        >
          <div 
            style={{
              background: 'white',
              borderRadius: '16px',
              width: '90vw',
              maxWidth: '700px',
              maxHeight: '85vh',
              overflow: 'auto',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)',
              position: 'relative'
            }}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{
              padding: '1.5rem 1.5rem 1rem 1.5rem',
              borderBottom: '1px solid #e5e7eb',
              position: 'sticky',
              top: 0,
              background: 'white',
              borderRadius: '16px 16px 0 0',
              zIndex: 1
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>Contact Sales</h2>
                  <p style={{
                    fontSize: '0.9rem',
                    color: '#6b7280'
                  }}>
                    Let's discuss your agricultural technology needs
                  </p>
                </div>
                <button 
                  style={{
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#6b7280'
                  }}
                  onClick={() => setShowContactModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Contact Options */}
            <div style={{ padding: '1.5rem' }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <Phone size={28} style={{ color: '#16a34a', marginBottom: '0.5rem' }} />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#16a34a',
                    marginBottom: '0.5rem'
                  }}>Call Sales</h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#15803d',
                    marginBottom: '0.75rem'
                  }}>Speak directly with our team</p>
                  <a 
                    href="tel:+917058602811"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#16a34a',
                      color: 'white',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    <Phone size={14} />
                    +91 7058602811
                  </a>
                </div>

                <div style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  textAlign: 'center'
                }}>
                  <Mail size={28} style={{ color: '#3b82f6', marginBottom: '0.5rem' }} />
                  <h3 style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#3b82f6',
                    marginBottom: '0.5rem'
                  }}>Email Sales</h3>
                  <p style={{
                    fontSize: '0.85rem',
                    color: '#1e40af',
                    marginBottom: '0.75rem'
                  }}>Get detailed information</p>
                  <a 
                    href="mailto:sales@fieldsense.com"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      background: '#3b82f6',
                      color: 'white',
                      padding: '0.65rem 0.85rem',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontSize: '0.85rem',
                      fontWeight: '500'
                    }}
                  >
                    <Mail size={14} />
                    sales@fieldsense.com
                  </a>
                </div>
              </div>

              {/* Contact Form */}
              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '1rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <MessageCircle size={20} />
                  Send us a message
                </h3>

                <form onSubmit={handleSubmit}>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}
                        placeholder="Your full name"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Phone</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}
                        placeholder="+91 12345 67890"
                      />
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Company</label>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem'
                        }}
                        placeholder="Your company name"
                      />
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '0.75rem',
                    marginBottom: '0.75rem'
                  }}>
                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Company Size</label>
                      <select
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          background: 'white'
                        }}
                      >
                        <option value="">Select size</option>
                        <option value="1-10">1-10 employees</option>
                        <option value="11-50">11-50 employees</option>
                        <option value="51-200">51-200 employees</option>
                        <option value="201-1000">201-1000 employees</option>
                        <option value="1000+">1000+ employees</option>
                      </select>
                    </div>

                    <div>
                      <label style={{
                        display: 'block',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#374151',
                        marginBottom: '0.4rem'
                      }}>Use Case</label>
                      <select
                        name="useCase"
                        value={formData.useCase}
                        onChange={handleInputChange}
                        style={{
                          width: '100%',
                          padding: '0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          background: 'white'
                        }}
                      >
                        <option value="">Select use case</option>
                        <option value="farming">Smart Farming</option>
                        <option value="research">Agricultural Research</option>
                        <option value="government">Government/Policy</option>
                        <option value="agtech">AgTech Development</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ marginBottom: '0.75rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.4rem'
                    }}>Budget Range</label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        background: 'white'
                      }}
                    >
                      <option value="">Select budget range</option>
                      <option value="under-1L">Under ₹1 Lakh</option>
                      <option value="1L-5L">₹1-5 Lakhs</option>
                      <option value="5L-10L">₹5-10 Lakhs</option>
                      <option value="10L-50L">₹10-50 Lakhs</option>
                      <option value="50L+">₹50 Lakhs+</option>
                      <option value="custom">Custom Enterprise</option>
                    </select>
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.4rem'
                    }}>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '0.65rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        resize: 'vertical'
                      }}
                      placeholder="Tell us about your specific requirements..."
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #16a34a, #15803d)',
                      color: 'white',
                      border: 'none',
                      padding: '0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 163, 74, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              </div>

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                marginTop: '1rem',
                padding: '0.75rem',
                background: '#f1f5f9',
                borderRadius: '8px'
              }}>
                <p style={{
                  fontSize: '0.8rem',
                  color: '#64748b',
                  margin: 0
                }}>
                  📞 Call us: <strong>+91 7058602811</strong> | 
                  📧 Email: <strong>sales@fieldsense.com</strong> | 
                  ⏰ Available Mon-Fri, 9 AM - 6 PM IST
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturesGrid;