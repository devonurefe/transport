'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';
import { CATEGORIES, MACHINES, KLUS_KITS, formatCurrency } from '@/data/machines';
import { useLanguage } from '@/components/LanguageContext';
import CoffeeCorner from '@/components/CoffeeCorner';

export default function Home() {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [requiredHeight, setRequiredHeight] = useState('');
  const [stats, setStats] = useState({ machines: 0, customers: 0, experience: 0, satisfaction: 0 });

  // Simulate stats counting up on load
  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        machines: Math.floor((500 / steps) * step),
        customers: Math.floor((2500 / steps) * step),
        experience: Math.floor((15 / steps) * step),
        satisfaction: Math.floor((98 / steps) * step),
      });

      if (step >= steps) {
        setStats({ machines: 500, customers: 2500, experience: 15, satisfaction: 98 });
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  const featuredMachines = MACHINES.filter((m) => m.rating >= 4.8).slice(0, 3);

  return (
    <div className={styles.home}>
      {/* 1. Hero Section */}
      <section className={`${styles.hero} gradient-bg-dark`}>
        <div className={`${styles.heroContainer} container`}>
          <div className={styles.heroContent}>
            <span className={styles.preTitle}>{t('home.hero.preTitle')}</span>
            <h1 className={styles.heroTitle}>
              <span className={styles.titleHighlight}>{t('home.hero.title')}</span>
              <br />
              <span className="gradient-text">{t('home.hero.subtitle')}</span>
            </h1>
            <p className={styles.heroText}>
              {t('home.hero.text')}
            </p>

            {/* Quick search wizard */}
            <div className={`${styles.quickWizard} glass`}>
              <div className={styles.wizardInputs}>
                <div className={styles.wizardGroup}>
                  <label>{t('home.hero.wizardType')}</label>
                  <select
                     value={selectedCategory}
                     onChange={(e) => setSelectedCategory(e.target.value)}
                     className="select"
                  >
                    <option value="">{t('home.hero.wizardChoose')}</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {language === 'NL' ? cat.nameNl : cat.nameEn}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.wizardGroup}>
                  <label>{t('home.hero.wizardHeight')}</label>
                  <input
                    type="number"
                    placeholder="Bv. 12"
                    value={requiredHeight}
                    onChange={(e) => setRequiredHeight(e.target.value)}
                    className="input"
                  />
                </div>
                <div className={styles.wizardGroupBtn}>
                  <Link
                    href={`/machines?category=${selectedCategory}&height=${requiredHeight}`}
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                  >
                    {t('home.hero.wizardSearch')}
                  </Link>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className={styles.trustBadges}>
              <span>• {t('home.hero.trust1')}</span>
              <span>• {t('home.hero.trust2')}</span>
              <span>• {t('home.hero.trust3')}</span>
            </div>
          </div>

          <div className={styles.heroGraphic}>
            <div className={`${styles.graphicCard} glass float-animation`}>
              <div className={styles.graphicHeader}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px', color: 'var(--color-accent-500)', marginRight: '4px' }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <div>
                  <h4>{t('home.hero.graphicTitle')}</h4>
                  <p>{t('home.hero.graphicText')}</p>
                </div>
              </div>
              <hr className={styles.cardDivider} />
              <div className={styles.graphicBody}>
                <p><strong>{language === 'NL' ? 'Type:' : 'Type:'}</strong> {language === 'NL' ? 'Schaarhoogwerker' : 'Scissor Lift'}</p>
                <p><strong>{language === 'NL' ? 'Model:' : 'Model:'}</strong> JLG 1930ES ({language === 'NL' ? 'Elektrisch' : 'Electric'})</p>
                <p><strong>{language === 'NL' ? 'Voordeel:' : 'Advantage:'}</strong> {language === 'NL' ? 'Past door binnendeuren' : 'Fits through standard doors'}</p>
              </div>
              <Link href="/adviseur" className="btn btn-primary btn-sm" style={{ width: '100%', marginTop: '10px' }}>
                {t('home.hero.graphicTry')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Categories Section */}
      <section className={styles.categories}>
        <div className="container">
          <h2 className="section-title">{t('home.categories.title')}</h2>
          <p className="section-subtitle">
            {t('home.categories.subtitle')}
          </p>

          <div className="grid grid-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/machines?category=${cat.slug}`}
                className={`${styles.categoryCard} glass-card`}
              >
                <div className={styles.categoryIcon}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '28px', height: '28px', color: 'var(--color-accent-500)', marginBottom: '8px' }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M21 12H3" />
                    <path d="M12 3v18" />
                  </svg>
                </div>
                <h3 className={styles.categoryName}>
                  {language === 'NL' ? cat.nameNl : cat.nameEn}
                </h3>
                <p className={styles.categoryDesc}>
                  {language === 'NL' ? cat.descriptionNl : cat.descriptionEn}
                </p>
                <span className={styles.categoryCount}>
                  {cat.machineCount} {t('home.categories.count')}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. AI Banner Section */}
      <section className={styles.aiBanner}>
        <div className={`${styles.aiContainer} container glass-dark`}>
          <div className={styles.aiContent}>
            <span className={styles.aiBadge}>{t('home.aiBanner.badge')}</span>
            <h2>{t('home.aiBanner.title')}</h2>
            <p>
              {t('home.aiBanner.desc')}
            </p>
            <div className={styles.aiSteps}>
              <div className={styles.aiStep}>
                <span className={styles.stepNum}>1</span>
                <span>{t('home.aiBanner.step1')}</span>
              </div>
              <div className={styles.aiStep}>
                <span className={styles.stepNum}>2</span>
                <span>{t('home.aiBanner.step2')}</span>
              </div>
              <div className={styles.aiStep}>
                <span className={styles.stepNum}>3</span>
                <span>{t('home.aiBanner.step3')}</span>
              </div>
            </div>
            <Link href="/adviseur" className="btn btn-primary btn-lg" style={{ marginTop: '20px' }}>
              {t('home.aiBanner.button')}
            </Link>
          </div>
        </div>
      </section>

      {/* 3.5. Premium Klus-Pakketten & Accessoires Section */}
      <section className={styles.kitsSection}>
        <div className="container">
          <h2 className="section-title">{t('home.kits.title')}</h2>
          <p className="section-subtitle">
            {t('home.kits.subtitle')}
          </p>

          <div className="grid grid-3">
            {KLUS_KITS.map((kit) => (
              <div key={kit.id} className={`${styles.kitCard} glass-card`}>
                <div className={styles.kitHeader}>
                  <div className={styles.kitIcon}>{kit.icon}</div>
                  <div>
                    <span className={styles.kitTag}>
                      {language === 'NL' ? kit.tagNl : kit.tagEn}
                    </span>
                    <h3 className={styles.kitName}>
                      {language === 'NL' ? kit.nameNl : kit.nameEn}
                    </h3>
                  </div>
                </div>
                <p className={styles.kitDesc}>
                  {language === 'NL' ? kit.descriptionNl : kit.descriptionEn}
                </p>
                <div className={styles.kitIncluded}>
                  <strong>{t('home.kits.included')}</strong>
                  <ul>
                    {(language === 'NL' ? kit.itemsNl : kit.itemsEn).map((item, idx) => (
                      <li key={idx}>✓ {item}</li>
                    ))}
                  </ul>
                </div>
                <hr className={styles.kitDivider} />
                <div className={styles.kitFooter}>
                  <div className={styles.kitPrice}>
                    <span className={styles.priceValue}>{formatCurrency(kit.price)}</span>
                    <span className={styles.priceUnit} style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)' }}>
                      {t('home.kits.tagB2b')}
                    </span>
                  </div>
                  <Link href={`/boeken?kit=${kit.id}`} className="btn btn-outline btn-sm">
                    {t('home.kits.addBtn')}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Machines */}
      <section className={styles.featured}>
        <div className="container">
          <h2 className="section-title">{t('home.featured.title')}</h2>
          <p className="section-subtitle">
            {t('home.featured.subtitle')}
          </p>

          <div className="grid grid-3">
            {featuredMachines.map((m) => (
              <div key={m.id} className={`${styles.machineCard} glass-card`}>
                <div className={styles.machineImagePlaceholder}>
                  <span>{m.brand} {m.model}</span>
                  <span className={`${styles.powerBadge} badge badge-${m.powerType}`}>
                    {t('home.featured.' + m.powerType)}
                  </span>
                </div>
                <div className={styles.machineInfo}>
                  <h3 className={styles.machineName}>{m.name}</h3>
                  <div className={styles.machineSpecs}>
                    <span>{language === 'NL' ? 'Hoogte:' : 'Height:'} <strong>{m.workingHeightM}m</strong></span>
                    <span>{language === 'NL' ? 'Capaciteit:' : 'Capacity:'} <strong>{m.platformCapacityKg}kg</strong></span>
                  </div>
                  <hr className={styles.divider} />
                  <div className={styles.machinePrice}>
                    <div>
                      <span className={styles.priceLabel}>{t('home.featured.from')}</span>
                      <span className={styles.priceValue}>{formatCurrency(m.dailyRate)}</span>
                      <span className={styles.priceUnit}>{t('home.featured.unit')}</span>
                    </div>
                    <Link href={`/machines/${m.slug}`} className="btn btn-outline btn-sm">
                      {t('home.featured.details')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Stats Tracker */}
      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <h3>{stats.machines}+</h3>
              <p>{t('home.stats.fleet')}</p>
            </div>
            <div className={styles.statItem}>
              <h3>{stats.customers}+</h3>
              <p>{t('home.stats.customers')}</p>
            </div>
            <div className={styles.statItem}>
              <h3>{stats.experience}+ {language === 'NL' ? 'Jaar' : 'Years'}</h3>
              <p>{t('home.stats.experience')}</p>
            </div>
            <div className={styles.statItem}>
              <h3>{stats.satisfaction}%</h3>
              <p>{t('home.stats.rating')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className={styles.testimonials}>
        <div className="container">
          <h2 className="section-title">{t('home.testimonials.title')}</h2>
          <p className="section-subtitle">
            {t('home.testimonials.subtitle')}
          </p>

          <div className="grid grid-3">
            <div className="glass-card">
              <div className={styles.stars} style={{ display: 'flex', gap: '4px', marginBottom: 'var(--spacing-sm)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', color: '#ffb400' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                &quot;{language === 'NL' ? 'De AI-adviseur gaf exact aan dat ik een knikarmhoogwerker nodig had voor het schilderen over mijn uitbouw heen. Binnen 2 minuten geboekt en de volgende dag geleverd!' : 'The AI Advisor indicated exactly that I needed an articulating boom lift for painting over my extension. Booked within 2 minutes and delivered the next day!'}&quot;
              </p>
              <h4 className={styles.author}>Pieter de Graaf</h4>
              <span className={styles.company}>
                {language === 'NL' ? 'De Graaf Schilderwerken, Utrecht' : 'De Graaf Painting, Utrecht'}
              </span>
            </div>
            <div className="glass-card">
              <div className={styles.stars} style={{ display: 'flex', gap: '4px', marginBottom: 'var(--spacing-sm)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', color: '#ffb400' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                &quot;{language === 'NL' ? 'Uitstekende service. Ik had per ongeluk een diesel machine besteld voor binnen, maar de klantenservice belde me meteen op om dit kosteloos om te ruilen voor een elektrische schaarhoogwerker. Top!' : 'Excellent service. I had accidentally ordered a diesel machine for indoor use, but customer service called me immediately to swap it for an electric scissor lift free of charge. Great!'}&quot;
              </p>
              <h4 className={styles.author}>Annelies Bakker</h4>
              <span className={styles.company}>
                {language === 'NL' ? 'Bakker Retail Installaties, Amsterdam' : 'Bakker Retail Installations, Amsterdam'}
              </span>
            </div>
            <div className="glass-card">
              <div className={styles.stars} style={{ display: 'flex', gap: '4px', marginBottom: 'var(--spacing-sm)' }}>
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" fill="currentColor" style={{ width: '16px', height: '16px', color: '#ffb400' }}>
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className={styles.quote}>
                &quot;{language === 'NL' ? 'Zelf ophalen met aanhanger was super geregeld. De machine was blinkend schoon, opgeladen en ik kreeg een duidelijke instructie van de medewerker. Zeker aanbevolen!' : 'Self-pickup with trailer was super well arranged. The machine was sparkling clean, charged, and I received clear instructions from the employee. Definitely recommended!'}&quot;
              </p>
              <h4 className={styles.author}>Mark van Dijk</h4>
              <span className={styles.company}>
                {language === 'NL' ? 'Particuliere Huisbezitter, Rotterdam' : 'Private Homeowner, Rotterdam'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6.5. About Us (Over Ons) */}
      <section id="over-ons" className={styles.about}>
        <div className="container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <span className={styles.preTitle}>{t('home.about.preTitle')}</span>
              <h2>{t('home.about.title')}</h2>
              <p>
                {t('home.about.desc1')}
              </p>
              <p>
                {t('home.about.desc2')}
              </p>
            </div>
            <div className={styles.aboutStats}>
              <div className={`${styles.aboutStatCard} glass`}>
                <h4>{t('home.about.card1Title')}</h4>
                <p>{t('home.about.card1Desc')}</p>
              </div>
              <div className={`${styles.aboutStatCard} glass`}>
                <h4>{t('home.about.card2Title')}</h4>
                <p>{t('home.about.card2Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6.6. Contact Section */}
      <section id="contact" className={styles.contact}>
        <div className="container">
          <h2 className="section-title">{t('home.contact.title')}</h2>
          <p className="section-subtitle">{t('home.contact.subtitle')}</p>

          <div className={styles.contactGrid}>
            <form onSubmit={(e) => { e.preventDefault(); alert(t('home.contact.success')); }} className={`${styles.contactForm} glass-card`}>
              <div className="grid grid-2">
                <div className="input-group">
                  <label className="input-label">{t('home.contact.name')}</label>
                  <input type="text" placeholder={t('home.contact.namePlaceholder')} className="input" required />
                </div>
                <div className="input-group">
                  <label className="input-label">{t('home.contact.email')}</label>
                  <input type="email" placeholder={t('home.contact.emailPlaceholder')} className="input" required />
                </div>
              </div>
              <div className="input-group">
                <label className="input-label">{t('home.contact.subject')}</label>
                <input type="text" placeholder={t('home.contact.subjectPlaceholder')} className="input" required />
              </div>
              <div className="input-group">
                <label className="input-label">{t('home.contact.message')}</label>
                <textarea placeholder={t('home.contact.messagePlaceholder')} className="textarea" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                {t('home.contact.submit')}
              </button>
            </form>

            <div className={styles.contactInfo}>
              <div className={`${styles.infoCard} glass`}>
                <h4>{t('home.contact.callTitle')}</h4>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-accent-500)', fontWeight: 700 }}>+31 (0)20 123 4567</p>
                <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>{t('home.contact.workdays')}</span>
              </div>
              <div className={`${styles.infoCard} glass`}>
                <h4>{t('home.contact.depotTitle')}</h4>
                <p>Keizersgracht 123</p>
                <p>1016 CJ Amsterdam</p>
              </div>
              <div className={`${styles.infoCard} glass`}>
                <h4>{t('home.contact.emailTitle')}</h4>
                <p>info@hoogwerkerhub.nl</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Contact Banner CTA */}
      <section className={styles.cta}>
        <div className={`${styles.ctaContainer} container`}>
          <div className={`${styles.ctaCard} gradient-accent`}>
            <h2>{t('home.cta.title')}</h2>
            <p>{t('home.cta.desc')}</p>
            <div className={styles.ctaButtons}>
              <Link href="/machines" className="btn btn-secondary">
                {t('home.cta.assortment')}
              </Link>
              <a href="tel:+31201234567" className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                {t('home.cta.call')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Coffee Corner (admin-editable, above the footer) */}
      <CoffeeCorner />
    </div>
  );
}
