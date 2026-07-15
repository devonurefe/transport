'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './CoffeeCorner.module.css';
import {
  CoffeeCornerContent,
  DEFAULT_COFFEE_CORNER,
  COFFEE_CORNER_EVENT,
  COFFEE_CORNER_STORAGE_KEY,
  loadCoffeeCorner,
} from '@/data/coffeeCorner';

export default function CoffeeCorner() {
  // Render defaults on the server / first paint, then hydrate from localStorage
  // in an effect — mirrors LanguageContext's mounted-guard to avoid hydration mismatch.
  const [content, setContent] = useState<CoffeeCornerContent>(DEFAULT_COFFEE_CORNER);

  useEffect(() => {
    const refresh = () => setContent(loadCoffeeCorner());
    refresh();

    // Same-tab updates (admin saves in this tab) + cross-tab updates (native storage event).
    const onStorage = (e: StorageEvent) => {
      if (e.key === COFFEE_CORNER_STORAGE_KEY) refresh();
    };
    window.addEventListener(COFFEE_CORNER_EVENT, refresh);
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener(COFFEE_CORNER_EVENT, refresh);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <section className={styles.coffeeCorner}>
      <div className="container">
        <div className={`${styles.card} glass-card`}>
          {/* Image / company photo */}
          <div className={styles.imageCol}>
            {content.image ? (
              // eslint-disable-next-line @next/next/no-img-element -- data URLs from admin upload
              <img src={content.image} alt={content.title} className={styles.image} />
            ) : (
              <div className={styles.placeholder}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={styles.placeholderIcon}
                >
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4Z" />
                  <line x1="6" y1="1" x2="6" y2="4" />
                  <line x1="10" y1="1" x2="10" y2="4" />
                  <line x1="14" y1="1" x2="14" y2="4" />
                </svg>
                <span>Coffee Corner</span>
              </div>
            )}
          </div>

          {/* Text / invitation */}
          <div className={styles.textCol}>
            <span className={styles.preTitle}>☕ Coffee Corner</span>
            <h2 className={styles.title}>{content.title}</h2>
            <p className={styles.description}>{content.description}</p>
            {content.ctaLabel && content.ctaHref && (
              <Link href={content.ctaHref} className="btn btn-primary btn-lg">
                {content.ctaLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
