'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import { useLanguage } from '@/components/LanguageContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const pathname = usePathname();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Admin route check
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) return null; // Admin has its own navbar

  const navLinks = [
    { name: t('nav.machines'), href: '/machines' },
    { name: t('nav.advisor'), href: '/adviseur' },
    { name: t('nav.about'), href: '/#over-ons' },
    { name: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} glass`}>
      <div className={`${styles.container} container`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '26px', height: '26px', color: 'var(--color-accent-500)', marginRight: '6px' }}>
            <path d="M3 21h18" />
            <path d="M19 21v-7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7" />
            <path d="M12 12V3" />
            <path d="M9 3h6" />
          </svg>
          <span className={styles.logoText}>
            Hoogwerker<span className="gradient-text">Hub</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={styles.navLinks}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.activeLink : ''}`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA & Language */}
        <div className={styles.navActions}>
          <button
            onClick={() => setLanguage(language === 'NL' ? 'EN' : 'NL')}
            className={styles.langBtn}
            title="Switch Language"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px' }}>
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {language}
          </button>

          <Link href="/machines" className="btn btn-primary btn-sm">
            {t('nav.rentDirect')}
          </Link>

          {/* Hamburger button */}
          <button
            className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''} glass-dark`}>
        <div className={styles.mobileLinks}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
          <hr className={styles.divider} />
          <div className={styles.mobileActions}>
            <button
              onClick={() => {
                setLanguage(language === 'NL' ? 'EN' : 'NL');
                setIsOpen(false);
              }}
              className={styles.langBtnMobile}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              Taal: {language === 'NL' ? 'Nederlands' : 'English'}
            </button>
            <Link
              href="/machines"
              className="btn btn-primary"
              onClick={() => setIsOpen(false)}
              style={{ width: '100%' }}
            >
              {t('nav.rentDirect')}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
