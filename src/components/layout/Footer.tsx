'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';
import { useLanguage } from '@/components/LanguageContext';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} container`}>
        <div className={styles.grid}>
          {/* Column 1: Info */}
          <div className={styles.infoCol}>
            <Link href="/" className={styles.logo}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '24px', height: '24px', color: 'var(--color-accent-500)', marginRight: '6px' }}>
                <path d="M3 21h18" />
                <path d="M19 21v-7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7" />
                <path d="M12 12V3" />
                <path d="M9 3h6" />
              </svg>
              <span className={styles.logoText}>
                Hoogwerker<span className="gradient-text">Hub</span>
              </span>
            </Link>
            <p className={styles.description}>
              {t('footer.description')}
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink}>LinkedIn</a>
              <a href="#" className={styles.socialLink}>Instagram</a>
              <a href="#" className={styles.socialLink}>Facebook</a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>{t('footer.quickLinks')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/machines">{t('nav.machines')}</Link></li>
              <li><Link href="/adviseur">{t('nav.advisor')}</Link></li>
              <li><Link href="/#over-ons">{t('nav.about')}</Link></li>
              <li><Link href="/#contact">{t('nav.contact')}</Link></li>
              <li><Link href="/faq">{language === 'NL' ? 'Veelgestelde Vragen' : 'Frequently Asked Questions'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>{t('footer.categories')}</h4>
            <ul className={styles.linkList}>
              <li><Link href="/machines?category=scissor">{language === 'NL' ? 'Schaarhoogwerkers' : 'Scissor Lifts'}</Link></li>
              <li><Link href="/machines?category=articulating">{language === 'NL' ? 'Knikarmhoogwerkers' : 'Articulating Boom Lifts'}</Link></li>
              <li><Link href="/machines?category=telescopic">{language === 'NL' ? 'Telescoophoogwerkers' : 'Telescopic Boom Lifts'}</Link></li>
              <li><Link href="/machines?category=spider">{language === 'NL' ? 'Spinhoogwerkers' : 'Spider Lifts'}</Link></li>
              <li><Link href="/machines?category=truck">{language === 'NL' ? 'Vrachtwagenhoogwerkers' : 'Truck-Mounted Platforms'}</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>{t('footer.contactInfo')}</h4>
            <p className={styles.contactItem}>{t('footer.address')}</p>
            <p className={styles.contactItem}>{t('footer.phone')}</p>
            <p className={styles.contactItem}>{t('footer.email')}</p>
            <hr className={styles.divider} />
            <p className={styles.legalItem}>KvK: 12345678</p>
            <p className={styles.legalItem}>BTW: NL123456789B01</p>
          </div>
        </div>

        <hr className={styles.bottomDivider} />

        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            &copy; {new Date().getFullYear()} HoogwerkerHub. {t('footer.rights')}
          </p>
          <div className={styles.legalLinks}>
            <a href="#">{t('footer.terms')}</a>
            <a href="#">{t('footer.privacy')}</a>
            <a href="#">{t('footer.cookies')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
