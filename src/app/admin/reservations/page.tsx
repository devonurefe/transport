'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { formatCurrency } from '@/data/machines';

interface Booking {
  id: string;
  machine: string;
  client: string;
  phone: string;
  email: string;
  start: string;
  end: string;
  status: 'Bevestigd' | 'In behandeling' | 'Voltooid' | 'Geannuleerd';
  amount: number;
}

export default function AdminReservations() {
  const [bookings, setBookings] = useState<Booking[]>([
    { id: '1023', machine: 'JLG 1930ES Schaarhoogwerker', client: 'De Graaf Schilderwerken', phone: '+31 6 12345678', email: 'pieter@degraaf.nl', start: '28-05-2026', end: '30-05-2026', status: 'Bevestigd', amount: 330 },
    { id: '1022', machine: 'Nissan Cabstar 16T Vrachtwagen', client: 'Jansen Gevelreiniging', phone: '+31 6 87654321', email: 'info@jansengevel.nl', start: '29-05-2026', end: '29-05-2026', status: 'In behandeling', amount: 190 },
    { id: '1021', machine: 'Genie GS-3246 Schaarhoogwerker', client: 'Bakker Retail Installaties', phone: '+31 6 11223344', email: 'a.bakker@retail.nl', start: '30-05-2026', end: '05-06-2026', status: 'Voltooid', amount: 980 },
    { id: '1020', machine: 'Hinowa Goldlift 14.70 Spin', client: 'Huisbezitter Rotterdam', phone: '+31 6 44332211', email: 'mark@dijk.nl', start: '01-06-2026', end: '02-06-2026', status: 'Geannuleerd', amount: 480 },
  ]);

  const [statusFilter, setStatusFilter] = useState('');

  // Handle status trigger update
  const handleUpdateStatus = (id: string, nextStatus: Booking['status']) => {
    setBookings(
      bookings.map((b) => {
        if (b.id === id) {
          return { ...b, status: nextStatus };
        }
        return b;
      })
    );
  };

  const filtered = bookings.filter((b) => {
    if (statusFilter && b.status !== statusFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.resPage}>
      <div className={styles.header}>
        <div>
          <h2>Reserveringen Beheer</h2>
          <p>Overzicht en beheer van alle klantreserveringen en betalingen.</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className={`${styles.filterBar} glass-card`}>
        <div className="input-group">
          <label className="input-label">Filter op status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="select"
          >
            <option value="">Alle statussen</option>
            <option value="Bevestigd">Bevestigd</option>
            <option value="In behandeling">In behandeling</option>
            <option value="Voltooid">Voltooid</option>
            <option value="Geannuleerd">Geannuleerd</option>
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className={`${styles.tableCard} glass-card`} style={{ marginTop: '20px' }}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Boeking ID</th>
                <th>Machine & Klant</th>
                <th>Datums</th>
                <th>Bedrag</th>
                <th>Status</th>
                <th>Snelle Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((b) => (
                <tr key={b.id}>
                  <td><strong>#{b.id}</strong></td>
                  <td>
                    <div>
                      <strong>{b.machine}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>
                        👤 {b.client} | 📞 {b.phone}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>Van: {b.start}</span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>Tot: {b.end}</p>
                    </div>
                  </td>
                  <td><strong>{formatCurrency(b.amount)}</strong></td>
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
                  <td>
                    <div className={styles.actionSelect}>
                      <select
                        value={b.status}
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value as Booking['status'])}
                        className="select"
                        style={{ padding: '2px 10px', fontSize: '0.8rem', width: '130px' }}
                      >
                        <option value="Bevestigd">Bevestig</option>
                        <option value="In behandeling">In behandeling</option>
                        <option value="Voltooid">Voltooi</option>
                        <option value="Geannuleerd">Annuleer</option>
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
