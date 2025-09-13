"use client";

import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import styles from '@/styles/components/landing/Testimonials.module.scss';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  const testimonials = [
    {
      id: 1,
      name: 'Ravi Kumar',
      role: 'Wheat Farmer',
      location: 'Nashik, Maharashtra',
      image: '/images/testimonials/ravi-kumar.jpg',
      rating: 5,
      quote: 'FieldSense helped me reduce fertilizer costs by ₹15,000 per season while increasing my wheat yield by 25%. The soil analysis is incredibly accurate.',
      impact: '25% yield increase',
      category: 'farmer',
      verification: 'Verified Farmer'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      role: 'Agricultural Researcher',
      location: 'IIT Delhi',
      image: '/images/testimonials/priya-sharma.jpg',
      rating: 5,
      quote: 'The anonymized data from FieldSense has been invaluable for our research on sustainable farming practices. The API integration was seamless.',
      impact: '3 published papers',
      category: 'researcher',
      verification: 'Verified Researcher'
    },
    {
      id: 3,
      name: 'Suresh Patel',
      role: 'Cotton Farmer',
      location: 'Ahmedabad, Gujarat',
      image: '/images/testimonials/suresh-patel.jpg',
      rating: 5,
      quote: 'Early pest detection saved my entire cotton crop. The AI spotted bollworm infestation 2 weeks before I could see any damage.',
      impact: '500 hectares saved',
      category: 'farmer',
      verification: 'Verified Farmer'
    },
    {
      id: 4,
      name: 'Rajesh Singh',
      role: 'Additional Secretary',
      location: 'Ministry of Agriculture, New Delhi',
      image: '/images/testimonials/rajesh-singh.jpg',
      rating: 5,
      quote: 'FieldSense provides crucial insights for policy making. The district-level agricultural data helps us allocate resources more effectively.',
      impact: 'Policy optimization',
      category: 'government',
      verification: 'Government Official'
    },
    {
      id: 5,
      name: 'Meera Devi',
      role: 'Rice Farmer',
      location: 'Thanjavur, Tamil Nadu',
      image: '/images/testimonials/meera-devi.jpg',
      rating: 5,
      quote: 'மண் பரிசோதனை மிகவும் உபயோகமாக இருக்கிறது. என் நெல் விளைச்சல் 30% அதிகரித்துள்ளது. (Soil testing is very useful. My rice yield increased by 30%.)',
      impact: '30% yield increase',
      category: 'farmer',
      verification: 'Verified Farmer'
    },
    {
      id: 6,
      name: 'Dr. Amit Verma',
      role: 'Startup Founder',
      location: 'AgriTech Solutions, Bangalore',
      image: '/images/testimonials/amit-verma.jpg',
      rating: 5,
      quote: 'Building our crop insurance platform on FieldSense APIs was straightforward. The accuracy and reliability have impressed our clients.',
      impact: '10,000+ policies',
      category: 'startup',
      verification: 'Verified Partner'
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

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || !isVisible) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isVisible, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      farmer: 'green',
      researcher: 'blue',
      government: 'purple',
      startup: 'orange'
    };
    return colors[category as keyof typeof colors] || 'gray';
  };

  return (
    <section className={styles.testimonialsSection} ref={sectionRef}>
      <div className={styles.container}>
        {/* Header */}
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>Trusted by Agricultural Community</h2>
          <p className={styles.subtitle}>
            Real feedback from farmers, researchers, and partners across India
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className={`${styles.testimonialDisplay} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.testimonialContainer}>
            <div className={styles.testimonialCard}>
              {/* Quote Icon */}
              <div className={styles.quoteIcon}>
                <Quote className={styles.icon} />
              </div>

              {/* Testimonial Content */}
              <div className={styles.testimonialContent}>
                <div className={styles.testimonialText}>
                  "{testimonials[currentTestimonial].quote}"
                </div>

                <div className={styles.rating}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`${styles.star} ${i < testimonials[currentTestimonial].rating ? styles.filled : ''}`} 
                    />
                  ))}
                </div>

                <div className={styles.impact}>
                  <span className={styles.impactLabel}>Impact:</span>
                  <span className={styles.impactValue}>{testimonials[currentTestimonial].impact}</span>
                </div>
              </div>

              {/* Author Info */}
              <div className={styles.authorInfo}>
                <div className={styles.authorImage}>
                  <img 
                    src={testimonials[currentTestimonial].image} 
                    alt={testimonials[currentTestimonial].name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/placeholder-avatar.jpg';
                    }}
                  />
                </div>
                
                <div className={styles.authorDetails}>
                  <div className={styles.authorName}>
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className={styles.authorRole}>
                    {testimonials[currentTestimonial].role}
                  </div>
                  <div className={styles.authorLocation}>
                    📍 {testimonials[currentTestimonial].location}
                  </div>
                </div>

                <div className={`${styles.categoryBadge} ${styles[getCategoryColor(testimonials[currentTestimonial].category)]}`}>
                  {testimonials[currentTestimonial].verification}
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className={styles.controls}>
              <button 
                className={styles.controlBtn}
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className={styles.controlIcon} />
              </button>
              
              <button 
                className={styles.controlBtn}
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ChevronRight className={styles.controlIcon} />
              </button>
            </div>
          </div>
        </div>

        {/* Testimonial Indicators */}
        <div className={`${styles.indicators} ${isVisible ? styles.visible : ''}`}>
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentTestimonial ? styles.active : ''}`}
              onClick={() => goToTestimonial(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Category Filter Tabs */}
        <div className={`${styles.categoryTabs} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.tabsContainer}>
            {['All', 'Farmers', 'Researchers', 'Government', 'Startups'].map((category) => (
              <button
                key={category}
                className={`${styles.categoryTab} ${category === 'All' ? styles.active : ''}`}
                onClick={() => {
                  // Filter testimonials by category
                  const categoryMap: { [key: string]: string } = {
                    'Farmers': 'farmer',
                    'Researchers': 'researcher', 
                    'Government': 'government',
                    'Startups': 'startup'
                  };
                  
                  if (category === 'All') {
                    setCurrentTestimonial(0);
                  } else {
                    const firstOfCategory = testimonials.findIndex(t => 
                      t.category === categoryMap[category]
                    );
                    if (firstOfCategory >= 0) {
                      setCurrentTestimonial(firstOfCategory);
                    }
                  }
                  setIsAutoPlaying(false);
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className={`${styles.statsummary} ${isVisible ? styles.visible : ''}`}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>2,500+</span>
            <span className={styles.statLabel}>Happy Farmers</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4.9/5</span>
            <span className={styles.statLabel}>Average Rating</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>95%</span>
            <span className={styles.statLabel}>Would Recommend</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>12+</span>
            <span className={styles.statLabel}>Research Partners</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
