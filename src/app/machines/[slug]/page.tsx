'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { MACHINES, formatCurrency } from '@/data/machines';

export default function MachineDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const [days, setDays] = useState(1);

  // Find current machine
  const machine = useMemo(() => {
    return MACHINES.find((m) => m.slug === slug) || MACHINES[0];
  }, [slug]);

  // Calculate pricing estimates
  const calculatedCost = useMemo(() => {
    let rate = machine.dailyRate;
    if (days >= 30) {
      rate = machine.monthlyRate / 30;
    } else if (days >= 7) {
      rate = machine.weeklyRate / 7;
    }
    const rent = Math.round(rate * days);
    const insurance = Math.round(rent * 0.08); // 8% standard machine insurance
    const transport = 150; // standard delivery flat rate in NL
    const vat = Math.round((rent + insurance + transport) * 0.21); // 21% Dutch BTW
    return {
      rent,
      insurance,
      transport,
      vat,
      total: rent + insurance + transport + vat,
    };
  }, [machine, days]);

  const similarMachines = MACHINES.filter(
    (m) => m.category === machine.category && m.id !== machine.id
  ).slice(0, 3);

  return (
    <div className={styles.detailPage}>
      <div className={`${styles.header} gradient-bg-dark`}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <Link href="/machines">Machines</Link> &gt; <span>{machine.name}</span>
          </div>
          <span className={styles.brand}>{machine.brand}</span>
          <h1>{machine.name}</h1>
          <div className={styles.quickSpecs}>
            <span className={`badge badge-${machine.powerType}`}>{machine.powerType}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '14px', height: '14px', color: '#ffb400', display: 'inline-block', verticalAlign: 'middle' }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {machine.rating} ({machine.reviewCount} beoordelingen)
            </span>
          </div>
        </div>
      </div>

      <div className={`${styles.mainContent} container`}>
        <div className={styles.layoutGrid}>
          {/* Left Column: Image & Details */}
          <div className={styles.leftCol}>
            {/* Gallery placeholder */}
            <div className={`${styles.gallery} glass-card`}>
              <div className={styles.mainImage}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '22px', height: '22px', color: 'var(--color-accent-500)' }}>
                    <path d="M3 21h18" />
                    <path d="M19 21v-7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v7" />
                    <path d="M12 12V3" />
                    <path d="M9 3h6" />
                  </svg>
                  {machine.brand} {machine.model} Visualisatie
                </span>
                <span className={machine.isAvailable ? styles.statusAvailable : styles.statusRented}>
                  {machine.isAvailable ? 'Beschikbaar' : 'Verhuurd'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className={styles.descriptionSection}>
              <h2>Beschrijving</h2>
              <p>{machine.descriptionNl}</p>
            </div>

            {/* Features Checklist */}
            <div className={styles.featuresSection}>
              <h2>Kenmerken & Voordelen</h2>
              <ul className={styles.featuresList}>
                {machine.features.map((feat, idx) => (
                  <li key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '15px', height: '15px', color: 'var(--color-success)', flexShrink: 0 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs Table */}
            <div className={styles.specsSection}>
              <h2>Technische Specificaties</h2>
              <div className={styles.specsGrid}>
                <div className={styles.specRow}>
                  <span>Merk & Model</span>
                  <span>{machine.brand} {machine.model}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Werkhoogte (max)</span>
                  <span>{machine.workingHeightM} meter</span>
                </div>
                <div className={styles.specRow}>
                  <span>Horizontaal Bereik</span>
                  <span>{machine.horizontalReachM} meter</span>
                </div>
                <div className={styles.specRow}>
                  <span>Platform Capaciteit</span>
                  <span>{machine.platformCapacityKg} kg</span>
                </div>
                <div className={styles.specRow}>
                  <span>Aandrijving</span>
                  <span style={{ textTransform: 'capitalize' }}>{machine.powerType}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Binnen / Buiten</span>
                  <span style={{ textTransform: 'capitalize' }}>{machine.indoorOutdoor}</span>
                </div>
                <div className={styles.specRow}>
                  <span>Gewicht machine</span>
                  <span>{machine.weightKg} kg</span>
                </div>
                <div className={styles.specRow}>
                  <span>Afmetingen (L x B x H)</span>
                  <span>{machine.dimensions.length}m x {machine.dimensions.width}m x {machine.dimensions.height}m</span>
                </div>
                <div className={styles.specRow}>
                  <span>Benodigd rijbewijs</span>
                  <span>{machine.licenseRequired === 'none' ? 'Geen (Rijklaar geleverd)' : `Rijbewijs ${machine.licenseRequired}`}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Wizard */}
          <div className={styles.rightCol}>
            <div className={`${styles.pricingCard} glass-card`}>
              <h3>Huurprijs berekenen</h3>
              <hr className={styles.divider} />

              <div className={styles.ratesGrid}>
                <div className={styles.rateItem}>
                  <span>Dagtarief</span>
                  <strong>{formatCurrency(machine.dailyRate)}</strong>
                </div>
                <div className={styles.rateItem}>
                  <span>Weektarief</span>
                  <strong>{formatCurrency(machine.weeklyRate)}</strong>
                </div>
                <div className={styles.rateItem}>
                  <span>Maandtarief</span>
                  <strong>{formatCurrency(machine.monthlyRate)}</strong>
                </div>
              </div>

              <hr className={styles.divider} />

              {/* Calculator input */}
              <div className="input-group">
                <label className="input-label">Aantal huurdagen</label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                  className="input"
                />
              </div>

              {/* Price breakups */}
              <div className={styles.breakdown}>
                <div className={styles.breakdownRow}>
                  <span>Huur ({days} {days === 1 ? 'dag' : 'dagen'}):</span>
                  <span>{formatCurrency(calculatedCost.rent)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Machineverzekering (8%):</span>
                  <span>{formatCurrency(calculatedCost.insurance)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>Transport (heen & terug):</span>
                  <span>{formatCurrency(calculatedCost.transport)}</span>
                </div>
                <div className={styles.breakdownRow}>
                  <span>BTW (21%):</span>
                  <span>{formatCurrency(calculatedCost.vat)}</span>
                </div>
                <hr className={styles.divider} />
                <div className={`${styles.breakdownRow} ${styles.totalRow}`}>
                  <span>Totaal (incl. BTW):</span>
                  <strong>{formatCurrency(calculatedCost.total)}</strong>
                </div>
              </div>

              <Link
                href={`/boeken?machine=${machine.slug}&days=${days}`}
                className={`btn btn-primary btn-lg ${!machine.isAvailable ? 'disabled' : ''}`}
                style={{ width: '100%', marginTop: '15px', ...( !machine.isAvailable ? { pointerEvents: 'none', opacity: 0.5 } : {} ) }}
              >
                {machine.isAvailable ? 'Direct Huren' : 'Momenteel verhuurd'}
              </Link>
              <p className={styles.guaranteeText} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '13px', height: '13px', color: 'var(--color-success)' }}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Gratis annuleren tot 24 uur voor aanvang</span>
              </p>
            </div>

            {/* Certifications panel */}
            <div className={`${styles.safetyPanel} glass-card`}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--color-error)' }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                Veiligheidsvoorschriften
              </h4>
              <p>Voor deze machine gelden de volgende eisen:</p>
              <ul className={styles.safetyList}>
                <li>Certificaat: <strong>IPAF / PAL-card</strong> aanbevolen</li>
                <li>PBM: <strong>Veiligheidshelm & harnas</strong> verplicht</li>
                <li>Zorg voor een vlakke, stabiele ondergrond bij opstellen</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Similar items */}
        {similarMachines.length > 0 && (
          <div className={styles.similarSection}>
            <h2>Vergelijkbare Machines</h2>
            <div className="grid grid-3">
              {similarMachines.map((m) => (
                <Link key={m.id} href={`/machines/${m.slug}`} className="glass-card">
                  <h4>{m.name}</h4>
                  <p>Hoogte: {m.workingHeightM}m | Vanaf {formatCurrency(m.dailyRate)}/dag</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
