'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import {
  CoffeeCornerContent,
  DEFAULT_COFFEE_CORNER,
  loadCoffeeCorner,
  saveCoffeeCorner,
} from '@/data/coffeeCorner';

export default function AdminCoffeeCorner() {
  const [content, setContent] = useState<CoffeeCornerContent>(DEFAULT_COFFEE_CORNER);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load persisted content on mount (client only).
  useEffect(() => {
    setContent(loadCoffeeCorner());
  }, []);

  const update = (patch: Partial<CoffeeCornerContent>) => {
    setContent((prev) => ({ ...prev, ...patch }));
    setSaved(false);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        update({ image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    update({ image: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveCoffeeCorner(content);
    setSaved(true);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h2>☕ Coffee Corner</h2>
        <p>Beheer de afbeelding en tekst van het Coffee Corner-blok onderaan de homepage.</p>
      </div>

      <form onSubmit={handleSave} className={styles.formGrid}>
        {/* Editor */}
        <div className={`${styles.card} glass-card`}>
          <h3>✏️ Inhoud bewerken</h3>
          <hr className={styles.divider} />

          {/* Image upload */}
          <div className="input-group">
            <label className="input-label">Afbeelding (bedrijfsfoto)</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="input"
            />
            {content.image && (
              <div className={styles.thumbWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element -- local preview of uploaded data URL */}
                <img src={content.image} alt="Voorbeeld" className={styles.thumb} />
                <button type="button" onClick={clearImage} className="btn btn-outline btn-sm">
                  🗑️ Afbeelding verwijderen
                </button>
              </div>
            )}
          </div>

          <div className="input-group" style={{ marginTop: '15px' }}>
            <label className="input-label">Titel</label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => update({ title: e.target.value })}
              className="input"
            />
          </div>

          <div className="input-group" style={{ marginTop: '15px' }}>
            <label className="input-label">Beschrijving</label>
            <textarea
              value={content.description}
              onChange={(e) => update({ description: e.target.value })}
              className="textarea"
              rows={6}
            />
          </div>

          <div className="grid grid-2" style={{ marginTop: '15px' }}>
            <div className="input-group">
              <label className="input-label">Knoptekst</label>
              <input
                type="text"
                value={content.ctaLabel}
                onChange={(e) => update({ ctaLabel: e.target.value })}
                className="input"
              />
            </div>
            <div className="input-group">
              <label className="input-label">Knop-link</label>
              <input
                type="text"
                value={content.ctaHref}
                onChange={(e) => update({ ctaHref: e.target.value })}
                className="input"
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button type="submit" className="btn btn-primary">
              💾 Opslaan
            </button>
            {saved && <span className={styles.savedMsg}>✅ Opgeslagen! Zichtbaar op de homepage.</span>}
          </div>

          <p className={styles.note}>
            ℹ️ De afbeelding en tekst worden in deze browser opgeslagen (prototype).
          </p>
        </div>

        {/* Live preview */}
        <div className={`${styles.card} glass-card`}>
          <h3>👁️ Voorbeeld</h3>
          <hr className={styles.divider} />

          <div className={styles.preview}>
            <div className={styles.previewImage}>
              {content.image ? (
                // eslint-disable-next-line @next/next/no-img-element -- local preview of uploaded data URL
                <img src={content.image} alt={content.title} className={styles.previewImg} />
              ) : (
                <div className={styles.previewPlaceholder}>☕ Coffee Corner</div>
              )}
            </div>
            <div className={styles.previewText}>
              <span className={styles.previewPreTitle}>☕ Coffee Corner</span>
              <h4>{content.title}</h4>
              <p>{content.description}</p>
              {content.ctaLabel && (
                <span className="btn btn-primary btn-sm" style={{ pointerEvents: 'none' }}>
                  {content.ctaLabel}
                </span>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
