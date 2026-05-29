'use client';

import React, { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';
import { useLanguage } from '@/components/LanguageContext';

export default function CookieBanner() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000); // Trigger slightly after load
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem('cookie_consent', 'necessary');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`${styles.banner} glass-dark animate-slide-up`}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h4 className={styles.title}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', marginRight: '8px', color: 'var(--color-accent-500)', display: 'inline-block', verticalAlign: 'middle' }}>
              <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5Z" />
              <circle cx="8.5" cy="8.5" r="0.8" fill="currentColor" />
              <circle cx="16" cy="15.5" r="0.8" fill="currentColor" />
              <circle cx="12" cy="12" r="0.8" fill="currentColor" />
              <circle cx="11" cy="16" r="0.8" fill="currentColor" />
              <circle cx="7" cy="13" r="0.8" fill="currentColor" />
            </svg>
            {t('cookieBanner.title')}
          </h4>
          <p className={styles.text}>
            {t('cookieBanner.text')}
          </p>
        </div>
        <div className={styles.actions}>
          <button onClick={handleAcceptNecessary} className="btn btn-secondary">
            {t('cookieBanner.necessary')}
          </button>
          <button onClick={handleAcceptAll} className="btn btn-primary">
            {t('cookieBanner.accept')}
          </button>
        </div>
      </div>
    </div>
  );
}
