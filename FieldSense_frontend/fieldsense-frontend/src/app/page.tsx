"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/landings/Hero';
import AboutSection from '@/components/landings/AboutSection';
import FeaturesGrid from '@/components/landings/FeaturesGrid';
import KrishiMitraSection from '@/components/landings/KrishiMitraSection';
import FPISpotlight from '@/components/landings/FPISpotlight';


import CTABanner from '@/components/landings/CTABanner';
import LoaderScreen from '@/components/ui/LoaderScreen';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showDemo, setShowDemo] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTryDemo = () => {
    setShowDemo(true);
  };

  const handleCloseDemo = () => {
    setShowDemo(false);
  };

  if (isLoading) {
    return <LoaderScreen><></></LoaderScreen>;
  }

  return (
    <div className="pt-20">
      <section id="home">
        <Hero onTryDemo={handleTryDemo} />
      </section>
      
      <section id="about">
        <AboutSection />
      </section>
      
      <section id="features">
        <FeaturesGrid />
      </section>
      
      <section id="ai">
        <KrishiMitraSection onTryDemo={handleTryDemo} />
      </section>
      
      <section id="fpi">
        <FPISpotlight />
      </section>

      
      <section id="contact">
        <CTABanner />
      </section>
      
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
                ✕
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
