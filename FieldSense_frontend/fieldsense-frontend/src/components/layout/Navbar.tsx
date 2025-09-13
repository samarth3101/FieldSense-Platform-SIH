"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import styles from '@/styles/components/layout/Navbar.module.scss';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setShowLangDropdown(false);
  }, [pathname]);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Features', href: '/features' },
    { name: 'FPI', href: '/fpi' },
    { name: 'AI', href: '/ai' },
    { name: 'Contact', href: '/contact' },
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
    // TODO: Implement actual language switching logic
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <span className={styles.icon}>🌱</span>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoName}>FieldSense</span>
            <span className={styles.logoTagline}>Powered by KrishiMitra AI</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
          
          <Link href="/dashboard" className={styles.dashboardLink}>
            Dashboard
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.actions}>
          {/* Language Selector */}
          <div className={styles.langSelector}>
            <button 
              className={styles.langButton}
              onClick={() => setShowLangDropdown(!showLangDropdown)}
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
                  >
                    <span className={styles.flag}>{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <Link href="/auth?mode=register" className={styles.getStartedBtn}>
            Get Started
          </Link>
          
          <Link href="/auth?mode=login" className={styles.loginBtn}>
            Login
          </Link>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuBtn}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <div className={styles.mobileMenuContent}>
          {/* Mobile Navigation */}
          <div className={styles.mobileNav}>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`${styles.mobileNavLink} ${pathname === item.href ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            
            <Link 
              href="/dashboard" 
              className={styles.mobileDashboardLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile Actions */}
          <div className={styles.mobileActions}>
            <Link 
              href="/auth?mode=register" 
              className={styles.mobileGetStarted}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
            <Link 
              href="/auth?mode=login" 
              className={styles.mobileLogin}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
          </div>

          {/* Mobile Language Selector */}
          <div className={styles.mobileLangSelector}>
            <div className={styles.mobileLangTitle}>Language</div>
            <div className={styles.mobileLangOptions}>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className={`${styles.mobileLangBtn} ${currentLang === lang.code ? styles.active : ''}`}
                  onClick={() => handleLanguageChange(lang.code)}
                >
                  <span className={styles.flag}>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
