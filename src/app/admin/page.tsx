'use client';

import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';
import { MACHINES, formatCurrency } from '@/data/machines';

export default function AdminDashboard() {
  const kpis = [
    { title: '💰 Omzet Vandaag', value: '€4.250,00', trend: '+12% vs gisteren', color: 'var(--color-success)' },
    { title: '📅 Actieve Huur', value: '23 machines', trend: '4 lopende leveringen', color: 'var(--color-info)' },
    { title: '⏳ Bekomende Reserveringen', value: '8 vandaag', trend: 'Actie vereist!', color: 'var(--color-warning)' },
    { title: '🏗️ Beschikbaarheid', value: '47 / 70', trend: '67% vloot online', color: 'var(--color-success)' },
  ];

  const recentBookings = [
    { id: '1023', machine: 'JLG 1930ES Schaarhoogwerker', client: 'De Graaf Schilderwerken', start: '28-05-2026', status: 'Bevestigd', amount: 330 },
    { id: '1022', machine: 'Nissan Cabstar 16T Vrachtwagen', client: 'Jansen Gevelreiniging', start: '29-05-2026', status: 'In behandeling', amount: 190 },
    { id: '1021', machine: 'Genie GS-3246 Schaarhoogwerker', client: 'Bakker Retail Installaties', start: '30-05-2026', status: 'Voltooid', amount: 980 },
    { id: '1020', machine: 'Hinowa Goldlift 14.70 Spin', client: 'Huisbezitter Rotterdam', start: '01-06-2026', status: 'Geannuleerd', amount: 480 },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.titleRow}>
        <h2>Overzicht Dashboard</h2>
        <div className={styles.actions}>
          <button className="btn btn-outline btn-sm">📅 Laatste 30 dagen</button>
          <button className="btn btn-primary btn-sm">➕ Handmatige Reservering</button>
        </div>
      </div>

      {/* KPIs Grid */}
      <div className="grid grid-4" style={{ marginTop: '20px' }}>
        {kpis.map((k, idx) => (
          <div key={idx} className={`${styles.kpiCard} glass-card`}>
            <span className={styles.kpiTitle}>{k.title}</span>
            <span className={styles.kpiValue}>{k.value}</span>
            <span className={styles.kpiTrend} style={{ color: k.color }}>{k.trend}</span>
          </div>
        ))}
      </div>

      {/* Charts & Graphs Row (Pure CSS Bar Chart) */}
      <div className={styles.chartSection} style={{ marginTop: '30px' }}>
        <div className={`${styles.chartCard} glass-card`}>
          <h3>Omzet Overzicht (Afgelopen 6 Maanden)</h3>
          <div className={styles.chartContainer}>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '40%' }}><span className={styles.barTip}>€8K</span></div>
              <span className={styles.barLabel}>Dec</span>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '65%' }}><span className={styles.barTip}>€13K</span></div>
              <span className={styles.barLabel}>Jan</span>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '55%' }}><span className={styles.barTip}>€11K</span></div>
              <span className={styles.barLabel}>Feb</span>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '85%' }}><span className={styles.barTip}>€17K</span></div>
              <span className={styles.barLabel}>Mrt</span>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '95%' }}><span className={styles.barTip}>€19K</span></div>
              <span className={styles.barLabel}>Apr</span>
            </div>
            <div className={styles.barWrapper}>
              <div className={styles.bar} style={{ height: '75%' }}><span className={styles.barTip}>€15K</span></div>
              <span className={styles.barLabel}>Mei</span>
            </div>
          </div>
        </div>
      </div>

      {/* Two Column table list */}
      <div className={styles.tableSection} style={{ marginTop: '30px' }}>
        <div className={`${styles.tableCard} glass-card`}>
          <h3>Recente Reserveringen</h3>
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Machine</th>
                  <th>Klant</th>
                  <th>Startdatum</th>
                  <th>Status</th>
                  <th>Bedrag</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>#{b.id}</td>
                    <td><strong>{b.machine}</strong></td>
                    <td>{b.client}</td>
                    <td>{b.start}</td>
                    <td>
                      <span className={`${styles.statusLabel} ${
                        b.status === 'Bevestigd' ? styles.statusConfirmed :
                        b.status === 'In behandeling' ? styles.statusPending :
                        b.status === 'Voltooid' ? styles.statusCompleted :
                        styles.statusCancelled
                      }`}>
                        {b.status}
                      </span>
                    </td>
                    <td><strong>{formatCurrency(b.amount)}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
