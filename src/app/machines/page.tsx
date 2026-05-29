'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './page.module.css';
import { MACHINES, CATEGORIES, formatCurrency, MachineCategory } from '@/data/machines';

function MachinesCatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Query states
  const categoryParam = searchParams.get('category') || '';
  const heightParam = searchParams.get('height') || '';

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxHeight, setMaxHeight] = useState(50);
  const [powerElectric, setPowerElectric] = useState(false);
  const [powerDiesel, setPowerDiesel] = useState(false);
  const [indoorOnly, setIndoorOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');

  // Update states if query params change
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Handle heights if redirected from homepage quick wizard
  useEffect(() => {
    if (heightParam) {
      setMaxHeight(parseFloat(heightParam));
    }
  }, [heightParam]);

  // Reset filters
  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setMaxHeight(50);
    setPowerElectric(false);
    setPowerDiesel(false);
    setIndoorOnly(false);
    router.push('/machines');
  };

  // Filter & Sort Logic
  const filteredMachines = useMemo(() => {
    return MACHINES.filter((m) => {
      // 1. Search Query
      if (searchQuery && !m.name.toLowerCase().includes(searchQuery.toLowerCase()) && !m.brand.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      // 2. Category
      if (selectedCategory && m.category !== selectedCategory) {
        return false;
      }
      // 3. Height
      if (m.workingHeightM > maxHeight) {
        return false;
      }
      // 4. Power Type
      if (powerElectric && m.powerType !== 'electric') {
        return false;
      }
      if (powerDiesel && m.powerType !== 'diesel') {
        return false;
      }
      // 5. Indoor/Outdoor
      if (indoorOnly && m.indoorOutdoor !== 'indoor' && m.indoorOutdoor !== 'both') {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        return a.dailyRate - b.dailyRate;
      }
      if (sortBy === 'price-high') {
        return b.dailyRate - a.dailyRate;
      }
      if (sortBy === 'height') {
        return b.workingHeightM - a.workingHeightM;
      }
      return b.rating - a.rating; // Default popular
    });
  }, [selectedCategory, searchQuery, maxHeight, powerElectric, powerDiesel, indoorOnly, sortBy]);

  return (
    <div className={styles.catalogPage}>
      <div className={`${styles.header} gradient-bg-dark`}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <span>Machines</span>
          </div>
          <h1>Ons Machineaanbod</h1>
          <p>Kies uit ons ruime assortiment hoogwaardige en gecertificeerde machines.</p>
        </div>
      </div>

      <div className={`${styles.mainContent} container`}>
        <div className={styles.layoutGrid}>
          {/* 1. Sidebar Filters */}
          <aside className={`${styles.sidebar} glass-card`}>
            <div className={styles.sidebarHeader}>
              <h3>Filters</h3>
              <button onClick={handleClearFilters} className={styles.clearBtn}>
                Filters wissen
              </button>
            </div>

            <hr className={styles.divider} />

            {/* Filter: Search */}
            <div className={styles.filterGroup}>
              <label className="input-label">Zoek op naam of merk</label>
              <input
                type="text"
                placeholder="Bv. JLG, Genie..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input"
              />
            </div>

            {/* Filter: Category */}
            <div className={styles.filterGroup}>
              <label className="input-label">Categorie</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="select"
              >
                <option value="">Alle categorieën</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.nameNl}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter: Working Height */}
            <div className={styles.filterGroup}>
              <div className={styles.sliderLabel}>
                <label className="input-label">Maximale Werkhoogte</label>
                <span className={styles.sliderValue}>{maxHeight}m</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                step="1"
                value={maxHeight}
                onChange={(e) => setMaxHeight(parseInt(e.target.value))}
                className={styles.rangeInput}
              />
            </div>

            {/* Filter: Power Type */}
            <div className={styles.filterGroup}>
              <label className="input-label">Aandrijving</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={powerElectric}
                    onChange={(e) => setPowerElectric(e.target.checked)}
                  />
                  Elektrisch (Emissievrij)
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={powerDiesel}
                    onChange={(e) => setPowerDiesel(e.target.checked)}
                  />
                  Diesel (Ruw Terrein)
                </label>
              </div>
            </div>

            {/* Filter: Indoor/Outdoor */}
            <div className={styles.filterGroup}>
              <label className="input-label">Werkomgeving</label>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={indoorOnly}
                    onChange={(e) => setIndoorOnly(e.target.checked)}
                  />
                  Geschikt voor binnen
                </label>
              </div>
            </div>
          </aside>

          {/* 2. Right Catalog content */}
          <div className={styles.contentArea}>
            <div className={styles.toolbar}>
              <div className={styles.resultsCount}>
                <strong>{filteredMachines.length}</strong> {filteredMachines.length === 1 ? 'machine' : 'machines'} gevonden
              </div>
              <div className={styles.toolbarActions}>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="select"
                  style={{ width: '180px' }}
                >
                  <option value="popular">Meest populair</option>
                  <option value="price-low">Prijs: laag - hoog</option>
                  <option value="price-high">Prijs: hoog - laag</option>
                  <option value="height">Hoogte: hoog - laag</option>
                </select>

                <div className={styles.viewToggle}>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`${styles.toggleBtn} ${viewMode === 'grid' ? styles.toggleActive : ''}`}
                    style={{ fontSize: '0.8rem', fontWeight: 600, padding: '4px 8px' }}
                    title="Grid weergave"
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`${styles.toggleBtn} ${viewMode === 'list' ? styles.toggleActive : ''}`}
                    style={{ fontSize: '0.8rem', fontWeight: 600, padding: '4px 8px' }}
                    title="Lijst weergave"
                  >
                    Lijst
                  </button>
                </div>
              </div>
            </div>

            {/* Empty state */}
            {filteredMachines.length === 0 && (
              <div className={`${styles.emptyState} glass-card`}>
                <h3>Geen machines gevonden</h3>
                <p>Pas uw filters aan om andere resultaten te zien.</p>
                <button onClick={handleClearFilters} className="btn btn-primary" style={{ marginTop: '15px' }}>
                  Herstel Filters
                </button>
              </div>
            )}

            {/* Catalog list/grid */}
            <div className={viewMode === 'grid' ? styles.gridContainer : styles.listContainer}>
              {filteredMachines.map((m) => (
                <div
                  key={m.id}
                  className={`${viewMode === 'grid' ? styles.gridCard : styles.listCard} glass-card`}
                >
                  {/* Card visual representation */}
                  <div className={styles.cardImage}>
                    <span>{m.brand}</span>
                    <span className={`${styles.powerBadge} badge badge-${m.powerType}`}>
                      {m.powerType}
                    </span>
                    <span className={m.isAvailable ? styles.statusAvailable : styles.statusRented}>
                      {m.isAvailable ? 'Beschikbaar' : 'Verhuurd'}
                    </span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardHeader}>
                      <span className={styles.cardBrand}>{m.brand}</span>
                      <h3 className={styles.cardTitle}>{m.name}</h3>
                    </div>

                    <div className={styles.cardSpecs}>
                      <div className={styles.specItem}>
                        <span>Ladder</span>
                        <span>Hoogte: <strong>{m.workingHeightM}m</strong></span>
                      </div>
                      <div className={styles.specItem}>
                        <span>Reach</span>
                        <span>Bereik: <strong>{m.horizontalReachM}m</strong></span>
                      </div>
                      <div className={styles.specItem}>
                        <span>Weight</span>
                        <span>Capaciteit: <strong>{m.platformCapacityKg}kg</strong></span>
                      </div>
                    </div>

                    <p className={styles.cardDesc}>{m.descriptionNl.substring(0, 100)}...</p>

                    <hr className={styles.cardDivider} />

                    <div className={styles.cardFooter}>
                      <div className={styles.cardPricing}>
                        <span className={styles.priceLabel}>Vanaf</span>
                        <span className={styles.priceValue}>{formatCurrency(m.dailyRate)}</span>
                        <span className={styles.priceUnit}>/dag</span>
                      </div>
                      <div className={styles.cardActions}>
                        <Link href={`/machines/${m.slug}`} className="btn btn-outline btn-sm">
                          Details
                        </Link>
                        <Link
                          href={`/boeken?machine=${m.slug}`}
                          className={`btn btn-primary btn-sm ${!m.isAvailable ? 'disabled' : ''}`}
                          style={!m.isAvailable ? { pointerEvents: 'none', opacity: 0.5 } : {}}
                        >
                          Huur Nu
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MachinesCatalog() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '40px 0' }}>Assortiment laden...</div>}>
      <MachinesCatalogContent />
    </Suspense>
  );
}
