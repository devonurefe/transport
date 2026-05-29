'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { MACHINES, CATEGORIES, formatCurrency, Machine } from '@/data/machines';

export default function AiAdvisor() {
  const [step, setStep] = useState(1);

  // Wizard state answers
  const [jobType, setJobType] = useState('');
  const [environment, setEnvironment] = useState(''); // indoor, outdoor, both
  const [height, setHeight] = useState(10);
  const [obstacles, setObstacles] = useState(false);
  const [narrowPassage, setNarrowPassage] = useState(false);
  const [postcode, setPostcode] = useState('');
  const [duration, setDuration] = useState(1);

  const jobTypes = [
    { id: 'paint', label: 'Schilderwerk & Gevelrenovatie' },
    { id: 'build', label: 'Ruwbouw & Constructie' },
    { id: 'tree', label: 'Boomverzorging & Groen' },
    { id: 'clean', label: 'Ramen & Gevelreiniging' },
    { id: 'install', label: 'Elektra & Luchtkanalen' },
    { id: 'other', label: 'Overige montage' },
  ];

  const handleClearFilters = () => {
    setStep(1);
    setJobType('');
    setEnvironment('');
    setHeight(10);
    setObstacles(false);
    setNarrowPassage(false);
    setPostcode('');
    setDuration(1);
  };

  const recommendations = useMemo(() => {
    if (step < 6) {
      return {
        bestMatch: null as any,
        budgetOption: null as any,
        alternative: null as any,
      };
    }

    // Filter machines by basic parameters
    let matches = MACHINES.map((m) => {
      let score = 100;

      // 1. Height rule
      if (m.workingHeightM < height) {
        score -= 40; // Too low
      } else if (m.workingHeightM > height + 10) {
        score -= 10; // Overspecified but usable
      }

      // 2. Indoor/Outdoor rule
      if (environment === 'indoor' && m.indoorOutdoor === 'outdoor') {
        score -= 50; // Unusable
      }
      if (environment === 'outdoor' && m.indoorOutdoor === 'indoor') {
        score -= 20; // Electric can be used outdoors if flat, but not optimal
      }

      // 3. Narrow passages
      if (narrowPassage && m.dimensions.width > 1.0) {
        score -= 40;
      }

      // 4. Obstacles (articulating knuckle booms preferred)
      if (obstacles) {
        if (m.category === 'articulating' || m.category === 'spider') {
          score += 10;
        } else if (m.category === 'scissor') {
          score -= 30; // Scissor can only go vertical
        }
      }

      return {
        machine: m,
        score: Math.max(0, Math.min(100, score)),
      };
    }).sort((a, b) => b.score - a.score);

    return {
      bestMatch: matches[0],
      budgetOption: matches.filter((m) => m.machine.dailyRate < 150)[0] || matches[1],
      alternative: matches[2] || matches[1],
    };
  }, [step, jobType, environment, height, obstacles, narrowPassage]);

  return (
    <div className={styles.advisorPage}>
      <div className={`${styles.header} gradient-bg-dark`}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <span>AI Adviseur</span>
          </div>
          <h1>AI Machine Adviseur</h1>
          <p>Laat onze geavanceerde assistent de optimale hoogwerker selecteren voor uw project.</p>
        </div>
      </div>

      <div className={`${styles.mainContent} container`}>
        <div className={`${styles.wizardCard} glass-card`}>
          {/* Progress stepper */}
          <div className={styles.stepper}>
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className={`${styles.stepIndicator} ${step >= num ? styles.stepActive : ''}`}
              >
                <span>{num}</span>
                <span className={styles.stepLabel}>
                  {num === 1 && 'Klus'}
                  {num === 2 && 'Omgeving'}
                  {num === 3 && 'Hoogte'}
                  {num === 4 && 'Details'}
                  {num === 5 && 'Logistiek'}
                  {num === 6 && 'Aanbeveling'}
                </span>
              </div>
            ))}
          </div>

          <hr className={styles.divider} />

          {/* STEP 1: Job Type */}
          {step === 1 && (
            <div className={styles.stepContent}>
              <h2>Wat voor werkzaamheden gaat u uitvoeren?</h2>
              <p className={styles.stepIntro}>Selecteer het type werk om de machine-arm en reikwijdte te bepalen.</p>
              <div className="grid grid-2" style={{ marginTop: '20px' }}>
                {jobTypes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setJobType(t.id);
                      setStep(2);
                    }}
                    className={`${styles.optionCard} ${jobType === t.id ? styles.optionSelected : ''} glass`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Environment */}
          {step === 2 && (
            <div className={styles.stepContent}>
              <h2>Waar gaat u werken?</h2>
              <p className={styles.stepIntro}>Dit bepaalt of u een emissievrije elektrische motor of een ruw terrein diesel nodig heeft.</p>
              <div className="grid grid-3" style={{ marginTop: '20px' }}>
                <button
                  onClick={() => {
                    setEnvironment('indoor');
                    setStep(3);
                  }}
                  className={`${styles.optionCard} glass`}
                >
                  Binnengebruik
                  <span className={styles.subText}>Magazijn, hal, winkel (elektrisch, non-marking)</span>
                </button>
                <button
                  onClick={() => {
                    setEnvironment('outdoor');
                    setStep(3);
                  }}
                  className={`${styles.optionCard} glass`}
                >
                  Buitengebruik
                  <span className={styles.subText}>Gevel, dak, tuin, ruw bouwterrein (diesel, 4x4, rups)</span>
                </button>
                <button
                  onClick={() => {
                    setEnvironment('both');
                    setStep(3);
                  }}
                  className={`${styles.optionCard} glass`}
                >
                  Flexibel / Hybride
                  <span className={styles.subText}>Flexibel inzetbaar (bi-energy)</span>
                </button>
              </div>
              <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ marginTop: '20px' }}>
                Terug
              </button>
            </div>
          )}

          {/* STEP 3: Height */}
          {step === 3 && (
            <div className={styles.stepContent}>
              <h2>Welke werkhoogte heeft u nodig?</h2>
              <p className={styles.stepIntro}>
                Geef de maximale hoogte aan waarop uw handen moeten reiken. (Let op: stahoogte platform is ca. 2 meter lager).
              </p>

              <div className={styles.heightContainer}>
                <div className={styles.heightVisual}>
                  <div className={styles.houseGraphic}>
                    <div className={styles.houseFloor}>Dakgoot (ca. 6m)</div>
                    <div className={styles.houseFloor}>1e Verdieping (ca. 3.5m)</div>
                  </div>
                  <div className={styles.heightDisplay}>
                    <span>Geselecteerde Werkhoogte</span>
                    <strong>{height} meter</strong>
                  </div>
                </div>

                <input
                  type="range"
                  min="4"
                  max="50"
                  value={height}
                  onChange={(e) => setHeight(parseInt(e.target.value))}
                  className={styles.rangeLarge}
                />
              </div>

              <div className={styles.stepActions}>
                <button onClick={() => setStep(2)} className="btn btn-ghost">
                  Terug
                </button>
                <button onClick={() => setStep(4)} className="btn btn-primary">
                  Volgende stap
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Specific details */}
          {step === 4 && (
            <div className={styles.stepContent}>
              <h2>Zijn er specifieke obstakels of doorgangen?</h2>
              <p className={styles.stepIntro}>Dit helpt ons bepalen of u een knikarm, telescoop arm of compact chassis nodig heeft.</p>

              <div className={styles.toggleGroup} style={{ marginTop: '20px' }}>
                <div className={`${styles.toggleCard} glass`}>
                  <div>
                    <h4>Moet u over obstakels heen reiken?</h4>
                    <p>Bv. over een uitbouw, dakgoot, stelling of tuinhek heen.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={obstacles}
                    onChange={(e) => setObstacles(e.target.checked)}
                    className={styles.largeCheckbox}
                  />
                </div>

                <div className={`${styles.toggleCard} glass`}>
                  <div>
                    <h4>Is er sprake van een smalle doorgang?</h4>
                    <p>Moet de machine door een poort of binnendeur van minder dan 1 meter breed?</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={narrowPassage}
                    onChange={(e) => setNarrowPassage(e.target.checked)}
                    className={styles.largeCheckbox}
                  />
                </div>
              </div>

              <div className={styles.stepActions} style={{ marginTop: '20px' }}>
                <button onClick={() => setStep(3)} className="btn btn-ghost">
                  Terug
                </button>
                <button onClick={() => setStep(5)} className="btn btn-primary">
                  Volgende stap
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Logistics */}
          {step === 5 && (
            <div className={styles.stepContent}>
              <h2>Logistiek & Planningsvoorkeuren</h2>
              <p className={styles.stepIntro}>Dit stelt ons in staat om de transportkosten en machinebeschikbaarheid te controleren.</p>

              <div className="grid grid-2" style={{ marginTop: '20px' }}>
                <div className="input-group">
                  <label className="input-label">Postcode Kluslocatie (bv. 1016 CJ)</label>
                  <input
                    type="text"
                    placeholder="1234 AB"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="input"
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Aantal dagen huren</label>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(Math.max(1, parseInt(e.target.value) || 1))}
                    className="input"
                  />
                </div>
              </div>

              <div className={styles.stepActions} style={{ marginTop: '30px' }}>
                <button onClick={() => setStep(4)} className="btn btn-ghost">
                  Terug
                </button>
                <button
                  onClick={() => setStep(6)}
                  className="btn btn-primary"
                  disabled={!postcode}
                >
                  Bereken Optimale Machine
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Recommendations (The Wow Outcome) */}
          {step === 6 && recommendations && (
            <div className={styles.stepContent}>
              <div className={styles.aiRevealHeader}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '42px', height: '42px', color: 'var(--color-accent-500)', marginRight: '6px' }}>
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                  <circle cx="12" cy="12" r="4" />
                </svg>
                <div>
                  <h2>Aanbevolen door HoogwerkerHub AI Engine</h2>
                  <p>Op basis van {height}m hoogte, {environment === 'indoor' ? 'binnen' : 'buiten'}omgeving, en uw logistieke input.</p>
                </div>
              </div>

              <div className={styles.recommendationGrid}>
                {/* 1. Best Match */}
                {recommendations.bestMatch && (
                  <div className={`${styles.recommendationCard} ${styles.bestMatchCard} glass-card`}>
                    <div className={styles.badgeBest}>BESTE MATCH ({recommendations.bestMatch.score}% Fit)</div>
                    <h3>{recommendations.bestMatch.machine.name}</h3>
                    <p className={styles.recoDesc}>{recommendations.bestMatch.machine.descriptionNl.substring(0, 150)}...</p>

                    <div className={styles.recoSpecs}>
                      <span>Werkhoogte: {recommendations.bestMatch.machine.workingHeightM}m</span>
                      <span>Capaciteit: {recommendations.bestMatch.machine.platformCapacityKg}kg</span>
                      <span>Aandrijving: {recommendations.bestMatch.machine.powerType}</span>
                    </div>

                    <div className={styles.whyRecommended}>
                      <h5>Waarom deze keuze?</h5>
                      <ul>
                        <li>Voldoet ruim aan uw hoogtebehoefte van {height} meter.</li>
                        {obstacles && <li>Knikarm/telescoop structuur biedt uitstekende zijdelingse reikwijdte.</li>}
                        {narrowPassage && <li>Compacte wielbasis past door smalle doorgangen.</li>}
                        <li>Volledig passend bij een {environment}-omgeving.</li>
                      </ul>
                    </div>

                    <div className={styles.recoFooter}>
                      <div className={styles.recoPriceRow}>
                        <span className={styles.recoPrice}>{formatCurrency(recommendations.bestMatch.machine.dailyRate * duration)}</span>
                        <span className={styles.recoDuration}>/ {duration} {duration === 1 ? 'dag' : 'dagen'}</span>
                      </div>
                      <Link
                        href={`/boeken?machine=${recommendations.bestMatch.machine.slug}&days=${duration}&postcode=${encodeURIComponent(postcode)}`}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: '8px' }}
                      >
                        Huur Deze Machine
                      </Link>
                    </div>
                  </div>
                )}

                {/* 2. Budget Option */}
                {recommendations.budgetOption && (
                  <div className={`${styles.recommendationCard} glass-card`}>
                    <div className={styles.badgeBudget}>BUDGET OPTIE ({recommendations.budgetOption.score}% Fit)</div>
                    <h3>{recommendations.budgetOption.machine.name}</h3>
                    <p className={styles.recoDesc}>{recommendations.budgetOption.machine.descriptionNl.substring(0, 100)}...</p>

                    <div className={styles.recoSpecs}>
                      <span>Werkhoogte: {recommendations.budgetOption.machine.workingHeightM}m</span>
                      <span>Aandrijving: {recommendations.budgetOption.machine.powerType}</span>
                    </div>

                    <div className={styles.recoFooter}>
                      <div className={styles.recoPriceRow}>
                        <span className={styles.recoPrice}>{formatCurrency(recommendations.budgetOption.machine.dailyRate * duration)}</span>
                        <span className={styles.recoDuration}>/ {duration} {duration === 1 ? 'dag' : 'dagen'}</span>
                      </div>
                      <Link
                        href={`/boeken?machine=${recommendations.budgetOption.machine.slug}&days=${duration}&postcode=${encodeURIComponent(postcode)}`}
                        className="btn btn-outline"
                        style={{ width: '100%', marginTop: '8px' }}
                      >
                        Huur Budget
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Advice Widget Section */}
              <div className={styles.whatsappAdviceCard}>
                <div className={styles.waBadge}>
                  <span className={styles.pulsingDot}></span>
                  <span>WhatsApp Advies (Gratis)</span>
                </div>
                <h4>Niet helemaal zeker van uw keuze?</h4>
                <p>
                  Twijfelt u of de aanbevolen machine de beste match is voor uw situatie? Geen zorgen! 
                  Onze hoogwerkspecialisten kijken graag gratis en vrijblijvend met u mee. Stuur ons direct een bericht via WhatsApp.
                </p>
                <a
                  href={`https://wa.me/31201234567?text=Hallo%20HoogwerkerHub!%20Ik%20heb%20de%20AI%20Machine%20Adviseur%20gebruikt%20voor%20een%20klus%20met%20werkhoogte%20${height}m%20(${environment === 'indoor' ? 'binnen' : 'buiten'})%20voor%20${duration}%20dagen.%20Ik%20wil%20graag%20persoonlijk%20advies%20ontvangen.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btnWhatsapp} btn`}
                >
                  <svg viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.248 8.477 3.514 2.266 2.265 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.739-1.456L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.965C16.588 2.008 14.133.99 11.516.99c-5.442 0-9.866 4.372-9.87 9.802 0 1.714.475 3.393 1.378 4.881L1.936 21.07l5.6-1.466z"/>
                  </svg>
                  Persoonlijk advies via WhatsApp
                </a>
              </div>

              <div className={styles.recoActions}>
                <button onClick={handleClearFilters} className="btn btn-secondary">
                  Opnieuw Berekenen
                </button>
                <Link href="/machines" className="btn btn-ghost">
                  Bekijk alle machines
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
