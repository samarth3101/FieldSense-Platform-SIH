"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X, Download } from 'lucide-react';
import AuthModal from '@/components/forms/AuthModal';
import styles from './Navbar.module.scss';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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
  }, [pathname]);

  const navigation = [
    { name: 'Home', section: 'home' },
    { name: 'About', section: 'about' },
    { name: 'Features', section: 'features' },
    { name: 'AI', section: 'ai' },
    { name: 'FPI', section: 'fpi' },
    { name: 'Contact', section: 'contact' },
  ];

  const handleGetStartedClick = () => {
    setShowAuthModal(true);
  };

  // Handle Download App Click
  const handleDownloadAppClick = () => {
    const element = document.getElementById('mobile-app');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert('FieldSense mobile app coming soon! Download will be available shortly.');
    }
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
            {/* Get Started Button */}
            <button 
              className={styles.getStartedBtn}
              onClick={handleGetStartedClick}
              type="button"
            >
              Get Started
            </button>

            {/* Download App Button - White Background, Green Text & Border, Capsule Shape */}
            <button 
              className={styles.downloadAppBtn}
              onClick={handleDownloadAppClick}
              type="button"
            >
              <Download size={16} />
              <span>Download App</span>
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

              {/* Mobile Download App Button */}
              <button 
                className={styles.mobileDownloadApp}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleDownloadAppClick();
                }}
                type="button"
              >
                <Download size={16} />
                <span>Download App</span>
              </button>
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
