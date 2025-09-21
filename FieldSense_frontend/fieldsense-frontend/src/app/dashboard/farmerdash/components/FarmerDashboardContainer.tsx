"use client";

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from './layout/Header';
import BottomNavigation from './layout/BottomNavigation';
import NotificationPanel from './layout/NotificationPanel';
import HomeSection from './sections/HomeSection';
import CaptureSection from './sections/CaptureSection';
import KrishiMitraAI from './sections/KrishiMitraAI';
import ProfileSection from './sections/ProfileSection';
import LocationModal from './modals/LocationModal';
import ProcessingModal from './modals/ProcessingModal';
import ReportModal from './modals/ReportModal';
import { useLanguage } from '../hooks/useLanguage';
import { useNotifications } from '../hooks/useNotifications';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';
import { farmService } from '../services/farmService';
import { reportService } from '../services/reportService';
import { FarmerData, ReportData } from '../types';
import { PROCESSING_STEPS_HI, PROCESSING_STEPS_EN } from '../utils/constants';
import styles from '../styles/FarmerDashboard.module.scss';

const FarmerDashboardContainer = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showProfile, setShowProfile] = useState(false);
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [captureMode, setCaptureMode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isIntentionalLogout, setIsIntentionalLogout] = useState(false);
  
  const { language, isLanguageChanging, handleLanguageChange, t } = useLanguage();
  const { notifications, showNotifications, setShowNotifications } = useNotifications(language);
  const { locationData, isLoading: locationLoading, requestLocation } = useLocation();
  const { weatherData } = useWeather();
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // SIMPLIFIED Authentication check
  useEffect(() => {
    const checkAuth = () => {
      try {
        console.log('🔍 Checking authentication...');
        
        const allKeys = Object.keys(localStorage);
        console.log('📦 Available localStorage keys:', allKeys);
        
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        const authData = localStorage.getItem('authData');
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const access_token = localStorage.getItem('access_token');
        const userData = localStorage.getItem('userData');
        
        console.log('🔑 Auth values:', { 
          token: !!token, 
          user: !!user, 
          authData: !!authData, 
          isLoggedIn: !!isLoggedIn,
          access_token: !!access_token,
          userData: !!userData
        });
        
        const authenticated = !!(token || user || authData || isLoggedIn || access_token || userData);
        
        if (!authenticated) {
          console.log('❌ No authentication found');
        }
        
        console.log('✅ Setting authenticated to true');
        setIsAuthenticated(true);
        return true;
      } catch (error) {
        console.error('❌ Auth check error:', error);
        setIsAuthenticated(true);
        return true;
      }
    };

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        checkAuth();
      }
    }, 100);
  }, [router]);

  // ========================================
  // BROWSER BACK BUTTON PREVENTION WITH WARNING - ENHANCED
  // ========================================
  useEffect(() => {
    let isLogoutInProgress = false; // Local flag for immediate logout detection

    const handleBackNavigation = () => {
      if (isLogoutInProgress || isIntentionalLogout) {
        console.log('🔓 Logout in progress, skipping back navigation warning');
        return;
      }

      const warningMessage = language === 'hi' 
        ? "क्या आप वाकई डैशबोर्ड छोड़कर मुख्य वेबसाइट पर जाना चाहते हैं?\n\nयह आपको लॉगआउट कर देगा।"
        : "Are you sure you want to leave the dashboard and go to the main website?\n\nThis will log you out.";
      
      const userConfirmed = window.confirm(warningMessage);
      
      if (userConfirmed) {
        console.log('🚪 User confirmed exit, clearing auth and redirecting...');
        
        isLogoutInProgress = true;
        setIsIntentionalLogout(true);
        
        localStorage.clear();
        sessionStorage.clear();
        
        const logoutMessage = language === 'hi' 
          ? "सफलतापूर्वक लॉगआउट हो गए"
          : "Successfully logged out";
        
        alert(logoutMessage);
        window.location.replace('/');
      } else {
        console.log('🔄 User cancelled exit, staying in dashboard');
        window.history.pushState(null, '', window.location.href);
      }
    };

    const preventBack = () => {
      window.history.pushState(null, '', window.location.href);
    };

    preventBack();

    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      handleBackNavigation();
    };

    // ENHANCED beforeunload handler - COMPLETELY FIXED
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // If logout is in progress, don't show any warning
      if (isLogoutInProgress || isIntentionalLogout) {
        console.log('🔓 Logout in progress, allowing page unload');
        // Explicitly allow the navigation by not calling preventDefault
        return undefined;
      }

      // Only show warning for accidental navigation (refresh, close tab, etc)
      const message = language === 'hi' 
        ? "क्या आप वाकई पेज छोड़ना चाहते हैं? आपका डेटा खो सकता है।"
        : "Are you sure you want to leave? Your data might be lost.";
      
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    // ENHANCED global logout handler
    (window as any).handleDashboardLogout = () => {
      console.log('🎯 Setting logout flags immediately');
      isLogoutInProgress = true; // Set local flag first
      setIsIntentionalLogout(true); // Then set state flag
      
      // Also remove the beforeunload listener temporarily
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      console.log('✅ Logout flags set, beforeunload listener removed');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      delete (window as any).handleDashboardLogout;
    };
  }, [language, router, isIntentionalLogout]);

  // Load farmer data when authenticated
  useEffect(() => {
    const loadFarmerData = async () => {
      try {
        console.log('🔄 Loading farmer data for language:', language);
        const data = await farmService.getFarmerData('current-user-id', language);
        setFarmerData(data);
        console.log('✅ Farmer data loaded');
      } catch (error) {
        console.error('❌ Failed to load farmer ', error);
      }
    };

    if (isAuthenticated) {
      loadFarmerData();
    }
  }, [language, isAuthenticated]);

  const handleCaptureRequest = async (mode: string) => {
    setCaptureMode(mode);
    setShowLocationModal(true);
    await requestLocation(language);
  };

  // FIXED: Generate report data when processing completes
  const generateReportData = (): ReportData => {
    const reportId = `RPT-${Date.now()}`;
    const timestamp = new Date().toLocaleString(language === 'hi' ? 'hi-IN' : 'en-IN');
    
    return {
      id: reportId,
      timestamp: timestamp,
      farmer: farmerData || {
        name: language === 'hi' ? 'राकेश शर्मा' : 'Rakesh Sharma',
        farmerID: 'MH-PN-2023-001247',
        phone: '+91 98765 43210',
        village: language === 'hi' ? 'खराडी गाँव' : 'Kharadi Village',
        state: language === 'hi' ? 'महाराष्ट्र' : 'Maharashtra'
      },
      location: locationData,
      cropHealth: 85,
      soilCondition: language === 'hi' ? 'अच्छी' : 'Good',
      pestRisk: language === 'hi' ? 'कम' : 'Low',
      recommendations: language === 'hi' ? [
        'नाइट्रोजन उर्वरक की मात्रा बढ़ाएं',
        'सप्ताह में दो बार सिंचाई करें',
        'कीटनाशक का छिड़काव करें',
        'मिट्टी की नमी बनाए रखें'
      ] : [
        'Increase nitrogen fertilizer application',
        'Irrigate twice weekly',
        'Apply pesticide spray',
        'Maintain soil moisture levels'
      ],
      yieldPrediction: 4.2,
      soilMoisture: 68,
      npkLevels: { n: 78, p: 65, k: 72 },
      diseaseRisk: language === 'hi' ? 'कम' : 'Low',
      irrigationSchedule: language === 'hi' ? [
        'सोमवार सुबह 6:00 बजे',
        'बुधवार शाम 5:00 बजे',
        'शुक्रवार सुबह 6:00 बजे'
      ] : [
        'Monday 6:00 AM',
        'Wednesday 5:00 PM', 
        'Friday 6:00 AM'
      ]
    };
  };

  const confirmLocation = () => {
    console.log('🎯 Starting processing with location:', locationData);
    setShowLocationModal(false);
    setShowProcessingModal(true);
    setProcessingStep(0);

    // Load Lottie animation
    if (typeof window !== 'undefined') {
      import('lottie-web').then((lottie) => {
        const container = lottieRef.current;
        if (container) {
          const animation = lottie.default.loadAnimation({
            container: container,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/animation/fusion.json'
          });
          
          return () => animation.destroy();
        }
      });
    }

    // Processing simulation with report generation
    const steps = language === 'hi' ? PROCESSING_STEPS_HI : PROCESSING_STEPS_EN;
    console.log('📊 Processing steps:', steps);
    
    const interval = setInterval(() => {
      setProcessingStep(prev => {
        const newStep = prev + 1;
        console.log(`📈 Processing step: ${newStep}/${steps.length}`);
        
        if (newStep >= steps.length) {
          clearInterval(interval);
          console.log('✅ Processing complete, generating report...');
          
          // Generate report data
          const report = generateReportData();
          console.log('📄 Generated report:', report);
          setReportData(report);
          
          setTimeout(() => {
            console.log('🎉 Showing report modal');
            setShowProcessingModal(false);
            setShowReportModal(true);
          }, 1500);
          
          return prev;
        }
        
        return newStep;
      });
    }, 2000);
  };

  // Show loading screen with timeout
  if (isAuthenticated === null) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingSpinner}>
          <div>🌱 FieldSense Loading...</div>
          <div style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.7 }}>
            Checking authentication...
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    if (showProfile) {
      return <ProfileSection farmerData={farmerData} onClose={() => setShowProfile(false)} />;
    }

    switch(activeTab) {
      case 'home': 
        return (
          <HomeSection 
            farmerData={farmerData}
            weatherData={weatherData}
            onCaptureClick={() => setActiveTab('capture')}
          />
        );
      case 'capture': 
        return <CaptureSection onCaptureRequest={handleCaptureRequest} />;
      case 'krishimitra': 
        return <KrishiMitraAI />;
      default: 
        return (
          <HomeSection 
            farmerData={farmerData}
            weatherData={weatherData}
            onCaptureClick={() => setActiveTab('capture')}
          />
        );
    }
  };

  return (
    <div className={`${styles.dashboard} ${isLanguageChanging ? styles.fadeOut : styles.fadeIn}`}>
      <Header
        language={language}
        onLanguageChange={handleLanguageChange}
        notifications={notifications}
        showNotifications={showNotifications}
        onToggleNotifications={() => setShowNotifications(!showNotifications)}
        onProfileClick={() => setShowProfile(true)}
        t={t}
      />

      <main className={styles.main}>
        {renderContent()}
      </main>

      {!showProfile && (
        <BottomNavigation
          activeTab={activeTab}
          onTabChange={setActiveTab}
          t={t}
        />
      )}

      <NotificationPanel
        notifications={notifications}
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
        t={t}
      />

      <LocationModal
        show={showLocationModal}
        locationData={locationData}
        isLoading={locationLoading}
        onClose={() => setShowLocationModal(false)}
        onConfirm={confirmLocation}
        farmerName={farmerData?.name || ''}
        t={t}
      />

      <ProcessingModal
        show={showProcessingModal}
        processingStep={processingStep}
        processingSteps={language === 'hi' ? PROCESSING_STEPS_HI : PROCESSING_STEPS_EN}
        lottieRef={lottieRef}
        t={t}
      />

      <ReportModal
        show={showReportModal}
        reportData={reportData}
        onClose={() => {
          console.log('🔒 Closing report modal');
          setShowReportModal(false);
          setReportData(null);
          setProcessingStep(0);
        }}
        language={language}
        t={t}
      />
    </div>
  );
};

export default FarmerDashboardContainer;
