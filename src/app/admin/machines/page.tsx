'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { MACHINES, CATEGORIES, formatCurrency, Machine } from '@/data/machines';

export default function AdminMachines() {
  const [machines, setMachines] = useState<Machine[]>(MACHINES);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('');

  // Toggle availability
  const handleToggleAvailable = (id: string) => {
    setMachines(
      machines.map((m) => {
        if (m.id === id) {
          return { ...m, isAvailable: !m.isAvailable };
        }
        return m;
      })
    );
  };

  // Add new machine stub
  const handleAddMachine = () => {
    const newMach: Machine = {
      id: `mach-${Date.now()}`,
      name: 'Genie S-85 Telescoophoogwerker',
      slug: 'genie-s85-telescoophoogwerker',
      category: 'telescopic',
      brand: 'Genie',
      model: 'S-85',
      workingHeightM: 27.9,
      horizontalReachM: 23.3,
      platformCapacityKg: 227,
      powerType: 'diesel',
      indoorOutdoor: 'outdoor',
      weightKg: 17200,
      dimensions: { length: 11.6, width: 2.5, height: 2.8 },
      transportRequirements: 'lowloader',
      licenseRequired: 'none',
      dailyRate: 310,
      weeklyRate: 930,
      monthlyRate: 2700,
      images: ['/images/genie-s85.jpg'],
      descriptionNl: 'Krachtige telescopische hoogwerker.',
      descriptionEn: 'High capacity telescopic platform.',
      features: ['28 meter werkhoogte', '4x4 aandrijving'],
      isAvailable: true,
      rating: 5.0,
      reviewCount: 1,
    };
    setMachines([newMach, ...machines]);
  };

  // Filtered List
  const filtered = machines.filter((m) => {
    if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.brand.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    if (catFilter && m.category !== catFilter) {
      return false;
    }
    return true;
  });

  return (
    <div className={styles.machinesPage}>
      <div className={styles.header}>
        <div>
          <h2>Machine Beheer</h2>
          <p>Beheer uw vloot en update tarieven en beschikbaarheid.</p>
        </div>
        <button onClick={handleAddMachine} className="btn btn-primary btn-sm">
          ➕ Machine Toevoegen
        </button>
      </div>

      {/* Filter toolbar */}
      <div className={`${styles.filterBar} glass-card`}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Zoek op naam of merk..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input"
          />
        </div>
        <div className="input-group">
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            className="select"
          >
            <option value="">Alle Categorieën</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>{c.nameNl}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table grid */}
      <div className={`${styles.tableCard} glass-card`} style={{ marginTop: '20px' }}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Machine</th>
                <th>Categorie</th>
                <th>Werkhoogte</th>
                <th>Dagtarief</th>
                <th>Müsaitlik</th>
                <th>Acties</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id}>
                  <td>
                    <div>
                      <strong>{m.name}</strong>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)' }}>{m.brand} | {m.model}</p>
                    </div>
                  </td>
                  <td><span style={{ textTransform: 'capitalize' }}>{m.category}</span></td>
                  <td><strong>{m.workingHeightM}m</strong></td>
                  <td><strong>{formatCurrency(m.dailyRate)}</strong></td>
                  <td>
                    <button
                      onClick={() => handleToggleAvailable(m.id)}
                      className={`${styles.statusToggle} ${m.isAvailable ? styles.statusAvail : styles.statusRent}`}
                    >
                      {m.isAvailable ? 'Beschikbaar' : 'Verhuurd'}
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <button onClick={() => alert(`Wijziging voor ${m.name} geopend`)} className={styles.editBtn}>✏️ Bewerk</button>
                      <button onClick={() => setMachines(machines.filter((x) => x.id !== m.id))} className={styles.deleteBtn}>🗑️</button>
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
