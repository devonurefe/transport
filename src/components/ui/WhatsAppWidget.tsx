'use client';

import React, { useState, useEffect } from 'react';
import styles from './WhatsAppWidget.module.css';
import { useLanguage } from '@/components/LanguageContext';

export default function WhatsAppWidget() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show a pulsing notification badge after 6 seconds to grab user attention
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setShowNotification(false);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className={styles.widgetContainer}>
      {/* Interactive Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar}>Hub</div>
              <div className={styles.headerText}>
                <h5>{t('whatsapp.title')}</h5>
                <div className={styles.statusIndicator}>
                  <span className={styles.onlineDot}></span>
                  <span>{t('whatsapp.status')}</span>
                </div>
              </div>
            </div>
            <button onClick={handleClose} className={styles.closeButton} aria-label={t('whatsapp.ariaClose')}>
              ✕
            </button>
          </div>

          <div className={styles.chatBody}>
            <div className={styles.welcomeBubble}>
              <p>
                {t('whatsapp.welcome')}
              </p>
              <span className={styles.chatTime}>
                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>

          <div className={styles.chatFooter}>
            <a
              href={`https://wa.me/31201234567?text=${encodeURIComponent(t('whatsapp.msgText'))}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.chatFooterBtn}
              onClick={() => setIsOpen(false)}
            >
              <svg viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.008 14.133.99 11.516.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.475 3.393 1.378 4.881L1.936 21.07l5.6-1.466z"/>
              </svg>
              {t('whatsapp.btnText')}
            </a>
          </div>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <button onClick={handleToggle} className={styles.floatingButton} aria-label={t('whatsapp.ariaOpen')}>
        <svg viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.008 14.133.99 11.516.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.475 3.393 1.378 4.881L1.936 21.07l5.6-1.466z"/>
        </svg>
        {showNotification && <span className={styles.notificationBadge}>1</span>}
      </button>
    </div>
  );
}
