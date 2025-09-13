"use client";

import Link from 'next/link';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github, 
  Youtube,
  ExternalLink,
  Heart
} from 'lucide-react';
import styles from '@/styles/components/layout/Footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'FPI API', href: '/fpi' },
        { name: 'KrishiMitra AI', href: '/ai' },
        { name: 'Mobile App', href: '#mobile-app' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'For Farmers', href: '/dashboard/farmer' },
        { name: 'For Researchers', href: '/dashboard/researcher' },
        { name: 'For Government', href: '/dashboard/gov' },
        { name: 'For Startups', href: '/fpi' },
        { name: 'Enterprise', href: '/contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/fpi', external: true },
        { name: 'API Reference', href: '/fpi/docs', external: true },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'Blog', href: '/blog' },
        { name: 'Research Papers', href: '/research' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press Kit', href: '/press' },
        { name: 'Contact', href: '/contact' },
        { name: 'Partners', href: '/partners' }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'Twitter', 
      href: 'https://twitter.com/fieldsense', 
      icon: Twitter 
    },
    { 
      name: 'LinkedIn', 
      href: 'https://linkedin.com/company/fieldsense', 
      icon: Linkedin 
    },
    { 
      name: 'GitHub', 
      href: 'https://github.com/fieldsense', 
      icon: Github 
    },
    { 
      name: 'YouTube', 
      href: 'https://youtube.com/fieldsense', 
      icon: Youtube 
    }
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerMain}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>🌱</div>
              <div className={styles.logoText}>
                <span className={styles.logoName}>FieldSense</span>
                <span className={styles.logoTagline}>Powered by KrishiMitra AI</span>
              </div>
            </Link>
            
            <p className={styles.companyDescription}>
              Transforming Indian agriculture through AI-powered insights. 
              From soil analysis to yield optimization, we help farmers make 
              data-driven decisions for sustainable farming.
            </p>

            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <Mail className={styles.contactIcon} />
                <a href="mailto:contact@fieldsense.ai" className={styles.contactLink}>
                  contact@fieldsense.ai
                </a>
              </div>
              
              <div className={styles.contactItem}>
                <Phone className={styles.contactIcon} />
                <a href="tel:+911800123456" className={styles.contactLink}>
                  1800-123-456 (Toll Free)
                </a>
              </div>
              
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span className={styles.contactText}>
                  Bangalore, Karnataka, India
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className={styles.socialIcon} />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          <div className={styles.linksSection}>
            {footerSections.map((section) => (
              <div key={section.title} className={styles.linkColumn}>
                <h3 className={styles.columnTitle}>{section.title}</h3>
                <ul className={styles.linkList}>
                  {section.links.map((link) => (
                    <li key={link.name} className={styles.linkItem}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.link}
                        >
                          {link.name}
                          <ExternalLink className={styles.externalIcon} />
                        </a>
                      ) : (
                        <Link href={link.href} className={styles.link}>
                          {link.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className={styles.newsletter}>
          <div className={styles.newsletterContent}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterDescription}>
              Get the latest agricultural insights and product updates delivered to your inbox.
            </p>
          </div>
          
          <form className={styles.newsletterForm}>
            <div className={styles.emailInput}>
              <Mail className={styles.inputIcon} />
              <input
                type="email"
                placeholder="Enter your email address"
                className={styles.input}
                required
              />
            </div>
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomLeft}>
            <div className={styles.copyright}>
              © {currentYear} FieldSense. All rights reserved.
            </div>
            
            <div className={styles.legalLinks}>
              <Link href="/policies/privacy" className={styles.legalLink}>
                Privacy Policy
              </Link>
              <Link href="/policies/terms" className={styles.legalLink}>
                Terms of Service
              </Link>
              <Link href="/policies/cookies" className={styles.legalLink}>
                Cookie Policy
              </Link>
              <Link href="/security" className={styles.legalLink}>
                Security
              </Link>
            </div>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.madeInIndia}>
              Made in India <span className={styles.flag}>🇮🇳</span> for Farmers of India
              <Heart className={styles.heartIcon} />
            </div>
          </div>
        </div>

        {/* Compliance Badges */}
        <div className={styles.compliance}>
          <div className={styles.complianceItem}>
            <span className={styles.badge}>ISO 27001</span>
            <span className={styles.badgeText}>Security Certified</span>
          </div>
          <div className={styles.complianceItem}>
            <span className={styles.badge}>SOC 2</span>
            <span className={styles.badgeText}>Type II Compliant</span>
          </div>
          <div className={styles.complianceItem}>
            <span className={styles.badge}>GDPR</span>
            <span className={styles.badgeText}>Privacy Ready</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
