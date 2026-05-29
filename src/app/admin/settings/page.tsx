'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

export default function AdminSettings() {
  const [compName, setCompName] = useState('HoogwerkerHub B.V.');
  const [compKvk, setCompKvk] = useState('12345678');
  const [compBtw, setCompBtw] = useState('NL123456789B01');
  const [mollieKey, setMollieKey] = useState('live_xxxxxxxxxxxxxxxxxxxxxxxx');
  const [testMode, setTestMode] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Instellingen succesvol opgeslagen! 💾');
  };

  return (
    <div className={styles.settingsPage}>
      <div className={styles.header}>
        <h2>Systeem Instellingen</h2>
        <p>Pas de configuratie, API-koppelingen en bedrijfsinformatie aan.</p>
      </div>

      <form onSubmit={handleSave} className={styles.formGrid}>
        {/* Company Settings */}
        <div className={`${styles.card} glass-card`}>
          <h3>🏢 Bedrijfsinformatie</h3>
          <hr className={styles.divider} />
          
          <div className="grid grid-2">
            <div className="input-group">
              <label className="input-label">Bedrijfsnaam</label>
              <input
                type="text"
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                className="input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">KvK-nummer</label>
              <input
                type="text"
                value={compKvk}
                onChange={(e) => setCompKvk(e.target.value)}
                className="input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">BTW-nummer</label>
              <input
                type="text"
                value={compBtw}
                onChange={(e) => setCompBtw(e.target.value)}
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Mollie Payments settings */}
        <div className={`${styles.card} glass-card`} style={{ marginTop: '20px' }}>
          <h3>🏦 Mollie Payment Gateway (iDEAL Entegrasyonu)</h3>
          <hr className={styles.divider} />

          <div className="input-group">
            <label className="input-label">Mollie API Key (Live / Test)</label>
            <input
              type="password"
              value={mollieKey}
              onChange={(e) => setMollieKey(e.target.value)}
              className="input"
            />
          </div>

          <div className={styles.toggleGroup} style={{ marginTop: '15px' }}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                className={styles.checkbox}
              />
              Mollie Testmodus inschakelen (iDEAL sandbox)
            </label>
          </div>
        </div>

        {/* Delivery zone margins */}
        <div className={`${styles.card} glass-card`} style={{ marginTop: '20px' }}>
          <h3>🚛 Bezorgtarieven per regio</h3>
          <hr className={styles.divider} />

          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Regio / Afstand</th>
                  <th>Basistarief (Heen & Terug)</th>
                  <th>Extra per km</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Zone A (binnen 25km)</td>
                  <td><strong>€150,00</strong></td>
                  <td>€0,00</td>
                </tr>
                <tr>
                  <td>Zone B (25km - 75km)</td>
                  <td><strong>€250,00</strong></td>
                  <td>€1,50 / km</td>
                </tr>
                <tr>
                  <td>Zone C (meer dan 75km)</td>
                  <td><strong>€350,00</strong></td>
                  <td>€2,00 / km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', alignSelf: 'flex-start' }}>
          💾 Instellingen Opslaan
        </button>
      </form>
    </div>
  );
}
