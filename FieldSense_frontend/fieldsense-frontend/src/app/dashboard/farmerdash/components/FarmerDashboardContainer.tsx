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
import { analyzeLocation, analyzeWithImage } from '../services/reportService';
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
  const [reportData, setReportData] = useState<any | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [pendingMode, setPendingMode] = useState<"camera"|"gallery"|null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isIntentionalLogout, setIsIntentionalLogout] = useState(false);
  
  const { language, isLanguageChanging, handleLanguageChange, t } = useLanguage();
  const { notifications, showNotifications, setShowNotifications } = useNotifications(language);
  const { locationData, isLoading: locationLoading, requestLocation } = useLocation();
  const { weatherData } = useWeather();
  const lottieRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Authentication check
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

  // Browser back button prevention
  useEffect(() => {
    let isLogoutInProgress = false;

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

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isLogoutInProgress || isIntentionalLogout) {
        console.log('🔓 Logout in progress, allowing page unload');
        return undefined;
      }

      const message = language === 'hi' 
        ? "क्या आप वाकई पेज छोड़ना चाहते हैं? आपका डेटा खो सकता है।"
        : "Are you sure you want to leave? Your data might be lost.";
      
      event.preventDefault();
      event.returnValue = message;
      return message;
    };

    (window as any).handleDashboardLogout = () => {
      console.log('🎯 Setting logout flags immediately');
      isLogoutInProgress = true;
      setIsIntentionalLogout(true);
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

  // Load farmer data
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
    console.log('🎯 Capture request:', mode);
    setPendingMode(mode === "gallery" ? "gallery" : "camera");
    setShowLocationModal(true);
    await requestLocation(language);
  };

  // ✅ ENHANCED CONFIRM LOCATION WITH SLOWER PROCESSING AND BETTER TIMING
  const confirmLocation = async () => {
    console.log('📍 Confirming location with mode:', pendingMode);
    setShowLocationModal(false);

    if (pendingMode === "gallery") {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;
        
        console.log('📁 File selected:', file.name);
        
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

        const steps = language === 'hi' ? PROCESSING_STEPS_HI : PROCESSING_STEPS_EN;
        let stepInterval: NodeJS.Timeout | null = null;
        
        try {
          // ✅ SLOW DOWN PROCESSING: 1.2 seconds per step instead of 800ms
          stepInterval = setInterval(() => {
            setProcessingStep(prev => {
              if (prev < steps.length - 1) {
                return prev + 1;
              }
              return prev;
            });
          }, 1200); // Slower: 1.2 seconds per step

          const req = {
            lat: typeof locationData?.lat === 'string' ? parseFloat(locationData.lat) : (locationData?.lat ?? 18.5204),
            lon: typeof locationData?.long === 'string' ? parseFloat(locationData.long) : (locationData?.long ?? 73.8567),
            aoi_radius_m: 200,
            include_forecast_days: 7,
            notes: "upload",
          };
          
          console.log('🚀 Calling analyzeWithImage with req:', req);
          const data = await analyzeWithImage(req, file, file.name);
          console.log('✅ Analysis complete:', data);
          
          if (stepInterval) clearInterval(stepInterval);
          setProcessingStep(steps.length - 1);
          
          // ✅ ADDITIONAL DELAY: Wait 2 more seconds before showing report
          setTimeout(() => {
            setReportData({ ...data, request: req });
            setShowProcessingModal(false);
            setShowReportModal(true);
          }, 2000); // 2 second delay
          
        } catch (e) {
          console.error('❌ Analysis failed:', e);
          if (stepInterval) clearInterval(stepInterval);
          setShowProcessingModal(false);
          alert(language === "hi" ? "विश्लेषण विफल" : "Analysis failed");
        } finally {
          setPendingMode(null);
        }
      };
      input.click();
      return;
    }

    // ✅ FIXED CAMERA FLOW WITH PROPER LOTTIE LOADING
    try {
      console.log('📸 Starting camera flow');
      await navigator.mediaDevices.getUserMedia({ video: true });
      
      setShowProcessingModal(true);
      setProcessingStep(0);
      
      // ✅ FIXED LOTTIE LOADING FOR CAMERA MODE
      if (typeof window !== 'undefined') {
        import('lottie-web').then((lottie) => {
          const container = lottieRef.current;
          if (container) {
            console.log('🎬 Loading camera mode lottie animation...');
            container.innerHTML = ''; // Clear container first
            
            try {
              const animation = lottie.default.loadAnimation({
                container: container,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                path: '/animation/fusion.json'
              });
              
              animation.addEventListener('DOMLoaded', () => {
                console.log('✅ Camera mode lottie loaded successfully');
              });
              
              animation.addEventListener('data_failed', () => {
                console.log('❌ Camera mode lottie failed, using fallback');
                if (container) {
                  container.innerHTML = '<div class="fallback-spinner">🌱</div>';
                }
              });
              
              return () => animation.destroy();
            } catch (error) {
              console.log('❌ Camera mode lottie error:', error);
              container.innerHTML = '<div class="fallback-spinner">🌱</div>';
            }
          } else {
            console.log('❌ No lottie container found for camera mode');
          }
        }).catch((error) => {
          console.log('❌ Camera mode lottie import failed:', error);
          const container = lottieRef.current;
          if (container) {
            container.innerHTML = '<div class="fallback-spinner">🌱</div>';
          }
        });
      }

      const steps = language === 'hi' ? PROCESSING_STEPS_HI : PROCESSING_STEPS_EN;
      let stepInterval: NodeJS.Timeout | null = null;
      
      try {
        // ✅ SLOW DOWN PROCESSING: 1.2 seconds per step for camera too
        stepInterval = setInterval(() => {
          setProcessingStep(prev => {
            if (prev < steps.length - 1) {
              return prev + 1;
            }
            return prev;
          });
        }, 1200); // Slower: 1.2 seconds per step

        const req = {
          lat: typeof locationData?.lat === 'string' ? parseFloat(locationData.lat) : (locationData?.lat ?? 18.5204),
          lon: typeof locationData?.long === 'string' ? parseFloat(locationData.long) : (locationData?.long ?? 73.8567),
          aoi_radius_m: 200,
          include_forecast_days: 7,
          notes: "capture",
        };
        
        console.log('🚀 Calling analyzeLocation with req:', req);
        const data = await analyzeLocation(req);
        console.log('✅ Analysis complete:', data);
        
        if (stepInterval) clearInterval(stepInterval);
        setProcessingStep(steps.length - 1);
        
        // ✅ ADDITIONAL DELAY: Wait 2 more seconds before showing report
        setTimeout(() => {
          setReportData({ ...data, request: req });
          setShowProcessingModal(false);
          setShowReportModal(true);
        }, 2000); // 2 second delay
        
      } catch (e) {
        console.error('❌ Analysis failed:', e);
        if (stepInterval) clearInterval(stepInterval);
        setShowProcessingModal(false);
        alert(language === "hi" ? "विश्लेषण विफल" : "Analysis failed");
      }
      
    } catch (e) {
      console.error('❌ Camera/analysis failed:', e);
      setShowProcessingModal(false);
      alert(language === "hi" ? "कैमरा/विश्लेषण विफल" : "Camera/analysis failed");
    } finally {
      setPendingMode(null);
    }
  };

  // Show loading screen
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

      {/* ✅ ENHANCED LOCATION MODAL WITH LANGUAGE PROP */}
      <LocationModal
        show={showLocationModal}
        locationData={locationData}
        isLoading={locationLoading}
        onClose={() => setShowLocationModal(false)}
        onConfirm={confirmLocation}
        farmerName={farmerData?.name || ''}
        t={t}
        language={language}
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
        data={reportData}
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
