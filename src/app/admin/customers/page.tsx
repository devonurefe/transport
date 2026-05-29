'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { formatCurrency } from '@/data/machines';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  kvk: string;
  btw: string;
  license: string;
  totalSpend: number;
}

export default function AdminCustomers() {
  const [search, setSearch] = useState('');
  const [customers, setCustomers] = useState<Customer[]>([
    { id: 'c-1', name: 'Pieter de Graaf', email: 'pieter@degraaf.nl', phone: '+31 6 12345678', company: 'De Graaf Schilderwerken', kvk: '12345678', btw: 'NL123456789B01', license: 'BE', totalSpend: 1540 },
    { id: 'c-2', name: 'Annelies Bakker', email: 'info@jansengevel.nl', phone: '+31 6 87654321', company: 'Bakker Retail Installaties', kvk: '87654321', btw: 'NL987654321B02', license: 'B', totalSpend: 2890 },
    { id: 'c-3', name: 'Mark van Dijk', email: 'mark@dijk.nl', phone: '+31 6 11223344', company: 'Particulier', kvk: '-', btw: '-', license: 'BE', totalSpend: 480 },
  ]);

  const filtered = customers.filter((c) => {
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.company.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.custPage}>
      <div className={styles.header}>
        <div>
          <h2>Klanten Beheer</h2>
          <p>Overzicht van geregistreerde B2B en particuliere klanten.</p>
        </div>
      </div>

      {/* Search filter */}
      <div className={`${styles.filterBar} glass-card`}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Zoek op klantnaam of bedrijf..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {/* Table grid */}
      <div className={`${styles.tableCard} glass-card`} style={{ marginTop: '20px' }}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Klant ID</th>
                <th>Naam & Bedrijf</th>
                <th>Contact</th>
                <th>Rijbewijs</th>
                <th>Totaal Uitgegeven</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td><strong>#{c.id}</strong></td>
                  <td>
                    <div>
                      <strong>{c.name}</strong>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>
                        🏢 {c.company} {c.kvk !== '-' && `(KvK: ${c.kvk})`}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div>
                      <span>✉️ {c.email}</span>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-neutral-400)' }}>📞 {c.phone}</p>
                    </div>
                  </td>
                  <td><span className="badge badge-hybrid">{c.license}</span></td>
                  <td><strong>{formatCurrency(c.totalSpend)}</strong></td>
                  <td>
                    <button onClick={() => alert(`Details geopend voor ${c.name}`)} className="btn btn-outline btn-sm">🔍 Details</button>
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
