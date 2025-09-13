"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import AuthModal from '@/components/forms/AuthModal';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'features', 'ai', 'fpi', 'contact'];
      const scrollPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPos >= offsetTop && scrollPos < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowLangDropdown(false);
  }, [pathname]);

  const navigation = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Features', section: 'features' },
    { name: 'AI', section: 'ai' },
    { name: 'FPI', section: 'fpi' },
    { name: 'Contact', section: 'contact' },
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'HI', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'MR', name: 'मराठी', flag: '🇮🇳' },
    { code: 'TE', name: 'తెలుగు', flag: '🇮🇳' },
  ];

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    setShowLangDropdown(false);
  };

  const handleGetStartedClick = () => {
    setShowAuthModal(true);
  };

  const handleCloseAuthModal = () => {
    setShowAuthModal(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    scrollToSection(section);
  };

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          {/* Logo */}
          <button 
            onClick={(e) => handleNavClick(e, 'home')}
            className={styles.logo}
            type="button"
          >
            <div className={styles.logoIcon}>
              <span className={styles.icon}>🌱</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>FieldSense</span>
              <span className={styles.logoTagline}>Powered by KrishiMitra AI</span>
            </div>
          </button>

          {/* Navigation */}
          <nav className={styles.nav}>
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={(e) => handleNavClick(e, item.section)}
                className={`${styles.navLink} ${activeSection === item.section ? styles.active : ''}`}
                type="button"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className={styles.actions}>
            {/* Language Selector */}
            <div className={styles.langSelector}>
              <button 
                className={styles.langButton}
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                type="button"
              >
                <Globe size={16} />
                <span>{currentLang}</span>
                <ChevronDown size={14} className={showLangDropdown ? styles.rotated : ''} />
              </button>
              
              {showLangDropdown && (
                <div className={styles.langDropdown}>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`${styles.langOption} ${currentLang === lang.code ? styles.active : ''}`}
                      onClick={() => handleLanguageChange(lang.code)}
                      type="button"
                    >
                      <span className={styles.flag}>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Get Started Button */}
            <button 
              className={styles.getStartedBtn}
              onClick={handleGetStartedClick}
              type="button"
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
              type="button"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
          <div className={styles.mobileMenuContent}>
            <div className={styles.mobileNav}>
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={(e) => handleNavClick(e, item.section)}
                  className={`${styles.mobileNavLink} ${activeSection === item.section ? styles.active : ''}`}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
              
              <Link 
                href="/dashboard" 
                className={styles.mobileDashboardLink}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            </div>

            <div className={styles.mobileActions}>
              <button 
                className={styles.mobileGetStarted}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleGetStartedClick();
                }}
                type="button"
              >
                Get Started
              </button>
            </div>

            <div className={styles.mobileLangSelector}>
              <div className={styles.mobileLangTitle}>Language</div>
              <div className={styles.mobileLangOptions}>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    className={`${styles.mobileLangBtn} ${currentLang === lang.code ? styles.active : ''}`}
                    onClick={() => handleLanguageChange(lang.code)}
                    type="button"
                  >
                    <span className={styles.flag}>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div 
            className={styles.mobileMenuOverlay}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </header>

      {showAuthModal && (
        <AuthModal onClose={handleCloseAuthModal} />
      )}
    </>
  );
};

export default Navbar;
