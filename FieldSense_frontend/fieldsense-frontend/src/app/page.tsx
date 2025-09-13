"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/landings/Hero';
import AboutSection from '@/components/landings/AboutSection';
import FeaturesGrid from '@/components/landings/FeaturesGrid';
import KrishiMitraSection from '@/components/landings/KrishiMitraSection';
import FPISpotlight from '@/components/landings/FPISpotlight';
import HowItWorks from '@/components/landings/HowItWorks';
import ImpactStats from '@/components/landings/ImpactStats';
import Testimonials from '@/components/landings/Testimonials';
import CTABanner from '@/components/landings/CTABanner';
import LoaderScreen from '@/components/ui/LoaderScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    // Simulate loading completion - adjust timing as needed
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTryDemo = () => {
    setShowDemo(true);
  };

  const handleCloseDemo = () => {
    setShowDemo(false);
  };

  if (isLoading) {
    return (
      <LoaderScreen>
        {/* You can put a loading message or spinner here if needed */}
        {/* Empty fragment to satisfy required children prop */}
        <></>
      </LoaderScreen>
    );
  }

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <Hero onTryDemo={handleTryDemo} />
      
      {/* About Section - 4-step flow */}
      <AboutSection />
      
      {/* Features Grid - Persona tabs */}
      <FeaturesGrid />
      
      {/* KrishiMitra Section - The AI brain */}
      <KrishiMitraSection onTryDemo={handleTryDemo} />
      
      {/* FPI Spotlight */}
      <FPISpotlight />
      
      {/* How It Works - Vertical stepper */}
      <HowItWorks />
      
      {/* Impact Stats */}
      <ImpactStats />
      
      {/* Testimonials */}
      <Testimonials />
      
      {/* Final CTA Banner */}
      <CTABanner />
      
      {/* Demo Modal */}
      {showDemo && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleCloseDemo}
        >
          <div 
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                KrishiMitra Demo
              </h2>
              <button
                onClick={handleCloseDemo}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interactive Demo Coming Soon!</h3>
              <p className="text-gray-600 mb-6">
                Experience KrishiMitra AI with real crop analysis, soil insights, and personalized recommendations.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleCloseDemo}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Get Notified
                </button>
                <button 
                  onClick={handleCloseDemo}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
