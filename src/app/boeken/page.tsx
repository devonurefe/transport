'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './page.module.css';
import { MACHINES, KLUS_KITS, formatCurrency } from '@/data/machines';
import { useLanguage } from '@/components/LanguageContext';

function BookingContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const machineParam = searchParams.get('machine') || '';
  const daysParam = parseInt(searchParams.get('days') || '1') || 1;
  const postcodeParam = searchParams.get('postcode') || '';
  const kitParam = searchParams.get('kit') || '';

  // Selected Machine
  const machine = useMemo(() => {
    return MACHINES.find((m) => m.slug === machineParam) || MACHINES[0];
  }, [machineParam]);

  // Stepper state
  const [step, setStep] = useState(1);

  // Form states
  const [days, setDays] = useState(daysParam);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [invalidFields, setInvalidFields] = useState<string[]>([]);

  const [pickupMode, setPickupMode] = useState<'delivery' | 'pickup'>('delivery');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Split Address States
  const [postcode, setPostcode] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [isAddressVerified, setIsAddressVerified] = useState(false);

  const [needDriver, setNeedDriver] = useState(false);
  const [needWagon, setNeedWagon] = useState(false);
  const [needInsurance, setNeedInsurance] = useState(true);
  const [selectedKits, setSelectedKits] = useState<string[]>([]);

  // Customer states
  const [isBusiness, setIsBusiness] = useState(false);
  const [custName, setCustName] = useState('');
  const [custEmail, setCustEmail] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [kvkNumber, setKvkNumber] = useState('');
  const [btwNumber, setBtwNumber] = useState('');
  const [ipafCert, setIpafCert] = useState(false);
  const [licB, setLicB] = useState(false);

  // Payment states
  const [payMethod, setPayMethod] = useState<'ideal' | 'card' | 'klarna'>('ideal');
  const [idealBank, setIdealBank] = useState('');

  // Min date for picker to prevent SSR/CSR mismatch
  const [minDate, setMinDate] = useState('');

  // Prefill dates, postcode and kits on client mount safely
  useEffect(() => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    setMinDate(todayStr);

    if (!startDate && !endDate) {
      const end = new Date();
      end.setDate(today.getDate() + days - 1);
      const endStr = end.toISOString().split('T')[0];
      
      setStartDate(todayStr);
      setEndDate(endStr);
    }

    if (postcodeParam) {
      setPostcode(decodeURIComponent(postcodeParam));
    }

    if (kitParam) {
      setSelectedKits([kitParam]);
    }
  }, [postcodeParam, kitParam]);

  // Address autofill and verification based on postcode & house number
  useEffect(() => {
    if (pickupMode !== 'delivery') return;

    const cleanPc = postcode.trim().toUpperCase();
    const pcRegex = /^[1-9][0-9]{3}\s*[A-Z]{2}$/;

    if (pcRegex.test(cleanPc)) {
      const digits = cleanPc.substring(0, 4);
      let resolvedStreet = 'Kerkstraat';
      let resolvedCity = 'Amsterdam';

      // Precise Mock Database mapping
      if (digits === '1016') {
        resolvedStreet = 'Keizersgracht';
        resolvedCity = 'Amsterdam';
      } else if (digits === '3011') {
        resolvedStreet = 'Coolsingel';
        resolvedCity = 'Rotterdam';
      } else if (digits === '3511') {
        resolvedStreet = 'Oudegracht';
        resolvedCity = 'Utrecht';
      } else if (digits === '5611') {
        resolvedStreet = 'Eindhovenseweg';
        resolvedCity = 'Eindhoven';
      } else if (digits === '9711') {
        resolvedStreet = 'Herestraat';
        resolvedCity = 'Groningen';
      } else if (digits === '2511') {
        resolvedStreet = 'Spui';
        resolvedCity = 'Den Haag';
      } else if (digits === '2461') {
        resolvedStreet = 'Aardamseweg';
        resolvedCity = 'Ter Aar';
      } else if (digits === '7511') {
        resolvedStreet = 'Klanderij';
        resolvedCity = 'Enschede';
      } else if (digits === '6811') {
        resolvedStreet = 'Janssingel';
        resolvedCity = 'Arnhem';
      } else if (digits === '6211') {
        resolvedStreet = 'Vrijthof';
        resolvedCity = 'Maastricht';
      } else if (digits === '2011') {
        resolvedStreet = 'Grote Houtstraat';
        resolvedCity = 'Haarlem';
      } else {
        // Dynamic fallback generator
        const firstDigit = digits[0];
        const secondDigit = digits[1];
        
        if (firstDigit === '1') {
          resolvedCity = 'Amsterdam';
          resolvedStreet = secondDigit === '2' ? 'Prins Hendrikkade' : 'Hoofdweg';
        } else if (firstDigit === '2') {
          if (secondDigit === '4') {
            resolvedCity = 'Ter Aar';
            resolvedStreet = 'Aardamseweg';
          } else {
            resolvedCity = 'Den Haag';
            resolvedStreet = secondDigit === '5' ? 'Lange Voorhout' : 'Leyweg';
          }
        } else if (firstDigit === '3') {
          resolvedCity = 'Rotterdam';
          resolvedStreet = secondDigit === '0' ? 'Lijnbaan' : 'Goudsesingel';
        } else if (firstDigit === '4') {
          resolvedCity = 'Breda';
          resolvedStreet = 'Grote Markt';
        } else if (firstDigit === '5') {
          resolvedCity = 'Eindhoven';
          resolvedStreet = 'Vestingstraat';
        } else if (firstDigit === '6') {
          resolvedCity = 'Nijmegen';
          resolvedStreet = 'St. Annastraat';
        } else if (firstDigit === '7') {
          resolvedCity = 'Apeldoorn';
          resolvedStreet = 'Deventerstraat';
        } else if (firstDigit === '8') {
          resolvedCity = 'Zwolle';
          resolvedStreet = 'Diezerstraat';
        } else if (firstDigit === '9') {
          resolvedCity = 'Groningen';
          resolvedStreet = 'Grote Markt';
        }
      }

      setStreet(resolvedStreet);
      
      // Auto-prefill city if not manually modified or empty
      const knownCities = ['Amsterdam', 'Rotterdam', 'Utrecht', 'Den Haag', 'Eindhoven', 'Groningen', 'Enschede', 'Arnhem', 'Maastricht', 'Haarlem', 'Ter Aar'];
      if (!city || knownCities.includes(city)) {
        setCity(resolvedCity);
      }

      if (houseNumber.trim()) {
        setIsAddressVerified(true);
        // Sync to single address string for backward compatibility
        setDeliveryAddress(`${resolvedStreet} ${houseNumber}, ${cleanPc} ${city || resolvedCity}`);
      } else {
        setIsAddressVerified(false);
        setDeliveryAddress('');
      }
    } else {
      setIsAddressVerified(false);
      setStreet('');
      setDeliveryAddress('');
    }
  }, [postcode, houseNumber, city, pickupMode]);

  // Automatically calculate days from dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive robust count
      
      if (diffDays > 0) {
        setDays(diffDays);
        setErrorMsg('');
      } else {
        setDays(1);
        setErrorMsg('Let op: De einddatum moet na de startdatum liggen.');
      }
    }
  }, [startDate, endDate]);

  // Calculations
  const pricing = useMemo(() => {
    let rate = machine.dailyRate;
    if (days >= 30) {
      rate = machine.monthlyRate / 30;
    } else if (days >= 7) {
      rate = machine.weeklyRate / 7;
    }
    const rent = Math.round(rate * days);
    const insurance = needInsurance ? Math.round(rent * 0.08) : 0;
    const transport = pickupMode === 'delivery' ? 150 : 0;
    const driverCost = needDriver ? 350 * days : 0; // €350 per day certified operator
    const wagonCost = needWagon ? 45 * days : 0; // €45 per day trailer

    // Calculate kits cost
    const kitsCost = selectedKits.reduce((acc, kitId) => {
      const kit = KLUS_KITS.find((k) => k.id === kitId);
      return acc + (kit ? kit.price : 0);
    }, 0);

    const subtotal = rent + insurance + transport + driverCost + wagonCost + kitsCost;
    const vat = Math.round(subtotal * 0.21);
    const deposit = isBusiness ? 0 : 250; // €250 deposit for B2C
    return {
      rent,
      insurance,
      transport,
      driverCost,
      wagonCost,
      kitsCost,
      subtotal,
      vat,
      deposit,
      total: subtotal + vat + deposit,
    };
  }, [machine, days, pickupMode, needDriver, needWagon, needInsurance, isBusiness, selectedKits]);

  const handleNextStep = () => {
    setErrorMsg('');
    const newInvalids: string[] = [];

    if (step === 1) {
      if (!startDate) newInvalids.push('startDate');
      if (!endDate) newInvalids.push('endDate');
      if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
        newInvalids.push('startDate', 'endDate');
        setErrorMsg(t('boeken.error.endAfterStart'));
      }
      if (pickupMode === 'delivery') {
        const cleanPc = postcode.trim().toUpperCase();
        const pcRegex = /^[1-9][0-9]{3}\s*[A-Z]{2}$/;
        if (!cleanPc || !pcRegex.test(cleanPc)) {
          newInvalids.push('postcode');
        }
        if (!houseNumber.trim()) {
          newInvalids.push('houseNumber');
        }
        if (!city.trim()) {
          newInvalids.push('city');
        }
      }

      if (newInvalids.length > 0) {
        setInvalidFields(newInvalids);
        if (!errorMsg) {
          setErrorMsg(t('boeken.error.banner'));
        }
        window.scrollTo({ top: 180, behavior: 'smooth' });
        return;
      }
      setInvalidFields([]);
      setStep(2);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } else if (step === 2) {
      if (!custName.trim()) newInvalids.push('custName');
      if (!custEmail.trim() || !custEmail.includes('@')) newInvalids.push('custEmail');
      if (!custPhone.trim()) newInvalids.push('custPhone');
      if (isBusiness) {
        if (!companyName.trim()) newInvalids.push('companyName');
        if (!kvkNumber.trim()) newInvalids.push('kvkNumber');
      }

      if (newInvalids.length > 0) {
        setInvalidFields(newInvalids);
        setErrorMsg(t('boeken.error.banner'));
        window.scrollTo({ top: 180, behavior: 'smooth' });
        return;
      }
      setInvalidFields([]);
      setStep(3);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    } else if (step === 3) {
      if (payMethod === 'ideal' && !idealBank) {
        newInvalids.push('idealBank');
      }

      if (newInvalids.length > 0) {
        setInvalidFields(newInvalids);
        setErrorMsg(t('boeken.error.idealBank'));
        window.scrollTo({ top: 180, behavior: 'smooth' });
        return;
      }
      setInvalidFields([]);
      setStep(4);
      window.scrollTo({ top: 180, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.bookingPage}>
      <div className={`${styles.header} gradient-bg-dark`}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">{t('boeken.breadcrumbs.home')}</Link> &gt; <span>{t('boeken.breadcrumbs.booking')}</span>
          </div>
          <h1>{t('boeken.title')}</h1>
          <p>{t('boeken.subtitle')} <strong>{machine.name}</strong></p>
        </div>
      </div>

      <div className={`${styles.mainContent} container`}>
        {step < 4 ? (
          <div className={styles.layoutGrid}>
            {/* Left side wizard steps */}
            <div className={styles.leftCol}>
              {/* Stepper bar */}
              <div className={styles.stepper}>
                <div className={`${styles.step} ${step >= 1 ? styles.stepActive : ''}`}>
                  <span>1</span>
                  <span>{t('boeken.stepper.step1')}</span>
                </div>
                <div className={`${styles.step} ${step >= 2 ? styles.stepActive : ''}`}>
                  <span>2</span>
                  <span>{t('boeken.stepper.step2')}</span>
                </div>
                <div className={`${styles.step} ${step >= 3 ? styles.stepActive : ''}`}>
                  <span>3</span>
                  <span>{t('boeken.stepper.step3')}</span>
                </div>
              </div>

              {/* Error message banner */}
              {errorMsg && (
                <div className={styles.errorBanner} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '18px', height: '18px', color: 'var(--color-error)', flexShrink: 0 }}>
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className={`${styles.stepCard} glass-card`}>
                {/* STEP 1: Rental Config */}
                {step === 1 && (
                  <div className={styles.stepContent}>
                    <h2>{t('boeken.step1.title')}</h2>
                    <p className={styles.stepIntro}>{t('boeken.step1.intro')}</p>

                    {/* Date Picker row */}
                    <div className="grid grid-2" style={{ marginTop: '10px' }}>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step1.startLabel')}</label>
                        <input
                          type="date"
                          value={startDate}
                          min={minDate}
                          onChange={(e) => {
                            setStartDate(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'startDate'));
                          }}
                          className={`input ${invalidFields.includes('startDate') ? 'input-error' : ''}`}
                        />
                        {invalidFields.includes('startDate') && (
                          <span className="error-text">{t('boeken.error.startDate')}</span>
                        )}
                      </div>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step1.endLabel')}</label>
                        <input
                          type="date"
                          value={endDate}
                          min={startDate || minDate}
                          onChange={(e) => {
                            setEndDate(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'endDate'));
                          }}
                          className={`input ${invalidFields.includes('endDate') ? 'input-error' : ''}`}
                        />
                        {invalidFields.includes('endDate') && (
                          <span className="error-text">{t('boeken.error.endDate')}</span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-2" style={{ marginTop: '15px' }}>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step1.durationLabel')}</label>
                        <input
                          type="text"
                          value={`${days} ${days === 1 ? t('boeken.step1.day') : t('boeken.step1.days')}`}
                          readOnly
                          className="input"
                          style={{ background: 'rgba(255,255,255,0.05)', borderStyle: 'dashed' }}
                        />
                      </div>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step1.deliveryLabel')}</label>
                        <div className={styles.radioGroup}>
                          <button
                            type="button"
                            onClick={() => setPickupMode('delivery')}
                            className={`${styles.radioCard} ${pickupMode === 'delivery' ? styles.radioSelected : ''}`}
                          >
                            {t('boeken.step1.deliveryOption')}
                          </button>
                          <button
                            type="button"
                            onClick={() => setPickupMode('pickup')}
                            className={`${styles.radioCard} ${pickupMode === 'pickup' ? styles.radioSelected : ''}`}
                          >
                            {t('boeken.step1.pickupOption')}
                          </button>
                        </div>
                      </div>
                    </div>

                    {pickupMode === 'delivery' && (
                      <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div className="grid grid-3" style={{ gap: '16px' }}>
                          <div className="input-group">
                            <label className="input-label">{t('boeken.step1.postcode')}</label>
                            <input
                              type="text"
                              placeholder="1234 AB"
                              value={postcode}
                              onChange={(e) => {
                                setPostcode(e.target.value);
                                setInvalidFields(prev => prev.filter(f => f !== 'postcode'));
                              }}
                              className={`input ${invalidFields.includes('postcode') ? 'input-error' : ''}`}
                            />
                            {invalidFields.includes('postcode') && (
                              <span className="error-text">{t('boeken.error.postcode')}</span>
                            )}
                          </div>
                          <div className="input-group">
                            <label className="input-label">{t('boeken.step1.houseNumber')}</label>
                            <input
                              type="text"
                              placeholder="24-B"
                              value={houseNumber}
                              onChange={(e) => {
                                setHouseNumber(e.target.value);
                                setInvalidFields(prev => prev.filter(f => f !== 'houseNumber'));
                              }}
                              className={`input ${invalidFields.includes('houseNumber') ? 'input-error' : ''}`}
                            />
                            {invalidFields.includes('houseNumber') && (
                              <span className="error-text">{t('boeken.error.houseNumber')}</span>
                            )}
                          </div>
                          <div className="input-group">
                            <label className="input-label">{t('boeken.step1.city')}</label>
                            <input
                              type="text"
                              placeholder="Amsterdam"
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                                setInvalidFields(prev => prev.filter(f => f !== 'city'));
                              }}
                              className={`input ${invalidFields.includes('city') ? 'input-error' : ''}`}
                            />
                            {invalidFields.includes('city') && (
                              <span className="error-text">{t('boeken.error.city')}</span>
                            )}
                          </div>
                        </div>

                        {/* Verified Address confirmation box */}
                        {isAddressVerified && street && (
                          <div className={styles.verifiedAddressBadge}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={styles.verifiedIcon}>
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>
                              <strong>{t('boeken.step1.verifiedAddress')}</strong> {street} {houseNumber}, {city}
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    <hr className={styles.divider} />

                    <h3>{t('boeken.step1.addonsTitle')}</h3>
                    <div className={styles.addonsList} style={{ marginTop: '10px' }}>
                      <label className={`${styles.addonCard} glass`} style={{ display: 'flex', cursor: 'pointer' }}>
                        <div style={{ flex: 1 }}>
                          <h4>{t('boeken.step1.driverTitle')}</h4>
                          <p>{t('boeken.step1.driverDesc')}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={needDriver}
                          onChange={(e) => setNeedDriver(e.target.checked)}
                          className={styles.checkbox}
                        />
                      </label>

                      {machine.transportRequirements === 'self_drive' && (
                        <label className={`${styles.addonCard} glass`} style={{ display: 'flex', cursor: 'pointer' }}>
                          <div style={{ flex: 1 }}>
                            <h4>{t('boeken.step1.trailerTitle')}</h4>
                            <p>{t('boeken.step1.trailerDesc')}</p>
                          </div>
                          <input
                            type="checkbox"
                            checked={needWagon}
                            onChange={(e) => setNeedWagon(e.target.checked)}
                            className={styles.checkbox}
                          />
                        </label>
                      )}

                      <label className={`${styles.addonCard} glass`} style={{ display: 'flex', cursor: 'pointer' }}>
                        <div style={{ flex: 1 }}>
                          <h4>{t('boeken.step1.insuranceTitle')}</h4>
                          <p>{t('boeken.step1.insuranceDesc')}</p>
                        </div>
                        <input
                          type="checkbox"
                          checked={needInsurance}
                          onChange={(e) => setNeedInsurance(e.target.checked)}
                          className={styles.checkbox}
                        />
                      </label>
                    </div>

                    <hr className={styles.divider} />

                    <h3>{t('boeken.step1.kitsTitle')}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                      {t('boeken.step1.kitsDesc')}
                    </p>
                    <div className={styles.addonsList}>
                      {KLUS_KITS.map((kit) => {
                        const isChecked = selectedKits.includes(kit.id);
                        return (
                          <label key={kit.id} className={`${styles.addonCard} glass`} style={{ display: 'flex', cursor: 'pointer' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ fontSize: '1.4rem' }}>{kit.icon}</span>
                                <h4 style={{ margin: 0 }}>
                                  {language === 'NL' ? kit.nameNl : kit.nameEn}
                                </h4>
                                <span className={styles.addonPrice} style={{ marginLeft: 'auto', fontWeight: 'bold', color: 'var(--color-accent-500)' }}>
                                  {formatCurrency(kit.price)}
                                </span>
                              </div>
                              <p style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                                {language === 'NL' ? kit.descriptionNl : kit.descriptionEn}
                              </p>
                              <div style={{ marginTop: '6px', fontSize: '0.8rem', opacity: 0.85 }}>
                                <strong>{t('home.kits.included')}</strong>{' '}
                                {(language === 'NL' ? kit.itemsNl : kit.itemsEn).join(', ')}
                              </div>
                            </div>
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedKits((prev) => [...prev, kit.id]);
                                } else {
                                  setSelectedKits((prev) => prev.filter((id) => id !== kit.id));
                                }
                              }}
                              className={styles.checkbox}
                              style={{ marginLeft: '16px', alignSelf: 'center' }}
                            />
                          </label>
                        );
                      })}
                    </div>

                    <div className={styles.stepActions}>
                      <div></div>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-primary"
                      >
                        {t('boeken.step1.nextStep')}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Customer Details */}
                {step === 2 && (
                  <div className={styles.stepContent}>
                    <h2>{t('boeken.step2.title')}</h2>
                    <p className={styles.stepIntro}>{t('boeken.step2.intro')}</p>

                    <div className={styles.businessToggle}>
                      <button
                        type="button"
                        onClick={() => setIsBusiness(false)}
                        className={`btn ${!isBusiness ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        {t('boeken.step2.private')}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsBusiness(true)}
                        className={`btn ${isBusiness ? 'btn-primary' : 'btn-ghost'}`}
                      >
                        {t('boeken.step2.business')}
                      </button>
                    </div>

                    <div className="grid grid-2" style={{ marginTop: '20px' }}>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step2.name')}</label>
                        <input
                          type="text"
                          placeholder="Jan de Vries"
                          value={custName}
                          onChange={(e) => {
                            setCustName(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'custName'));
                          }}
                          className={`input ${invalidFields.includes('custName') ? 'input-error' : ''}`}
                        />
                        {invalidFields.includes('custName') && (
                          <span className="error-text">{t('boeken.error.custName')}</span>
                        )}
                      </div>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step2.email')}</label>
                        <input
                          type="email"
                          placeholder="jan@devries.nl"
                          value={custEmail}
                          onChange={(e) => {
                            setCustEmail(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'custEmail'));
                          }}
                          className={`input ${invalidFields.includes('custEmail') ? 'input-error' : ''}`}
                        />
                        {invalidFields.includes('custEmail') && (
                          <span className="error-text">{t('boeken.error.custEmail')}</span>
                        )}
                      </div>
                      <div className="input-group">
                        <label className="input-label">{t('boeken.step2.phone')}</label>
                        <input
                          type="text"
                          placeholder="+31 6 12345678"
                          value={custPhone}
                          onChange={(e) => {
                            setCustPhone(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'custPhone'));
                          }}
                          className={`input ${invalidFields.includes('custPhone') ? 'input-error' : ''}`}
                        />
                        {invalidFields.includes('custPhone') && (
                          <span className="error-text">{t('boeken.error.custPhone')}</span>
                        )}
                      </div>
                    </div>

                    {isBusiness && (
                      <div className="grid grid-3" style={{ marginTop: '20px' }}>
                        <div className="input-group">
                          <label className="input-label">{t('boeken.step2.company')}</label>
                          <input
                            type="text"
                            placeholder="De Vries Bouw B.V."
                            value={companyName}
                            onChange={(e) => {
                              setCompanyName(e.target.value);
                              setInvalidFields(prev => prev.filter(f => f !== 'companyName'));
                            }}
                            className={`input ${invalidFields.includes('companyName') ? 'input-error' : ''}`}
                          />
                          {invalidFields.includes('companyName') && (
                            <span className="error-text">{t('boeken.error.companyName')}</span>
                          )}
                        </div>
                        <div className="input-group">
                          <label className="input-label">{t('boeken.step2.kvk')}</label>
                          <input
                            type="text"
                            placeholder="12345678"
                            value={kvkNumber}
                            onChange={(e) => {
                              setKvkNumber(e.target.value);
                              setInvalidFields(prev => prev.filter(f => f !== 'kvkNumber'));
                            }}
                            className={`input ${invalidFields.includes('kvkNumber') ? 'input-error' : ''}`}
                          />
                          {invalidFields.includes('kvkNumber') && (
                            <span className="error-text">{t('boeken.error.kvk')}</span>
                          )}
                        </div>
                        <div className="input-group">
                          <label className="input-label">{t('boeken.step2.btw')}</label>
                          <input
                            type="text"
                            placeholder="NL123456789B01"
                            value={btwNumber}
                            onChange={(e) => setBtwNumber(e.target.value)}
                            className="input"
                          />
                        </div>
                      </div>
                    )}

                    <hr className={styles.divider} />

                    <h3>{t('boeken.step2.safetyTitle')}</h3>
                    <div className={styles.checkboxGroup} style={{ marginTop: '10px' }}>
                      <label className={styles.checkboxLabel}>
                        <input
                          type="checkbox"
                          checked={ipafCert}
                          onChange={(e) => setIpafCert(e.target.checked)}
                        />
                        {language === 'NL' ? (
                          <>Ik ben in het bezit van een geldig <strong>IPAF / PAL-card</strong> certificaat</>
                        ) : (
                          <>I hold a valid <strong>IPAF / PAL-card</strong> operator license</>
                        )}
                      </label>

                      {pickupMode === 'pickup' && (
                        <label className={styles.checkboxLabel}>
                          <input
                            type="checkbox"
                            checked={licB}
                            onChange={(e) => setLicB(e.target.checked)}
                          />
                          {language === 'NL' ? (
                            <>Ik bezit het vereiste <strong>BE rijbewijs</strong> om de aanhanger te trekken</>
                          ) : (
                            <>I hold the required <strong>BE driving license</strong> to tow the trailer</>
                          )}
                        </label>
                      )}
                    </div>

                    <div className={styles.stepActions}>
                      <button type="button" onClick={() => setStep(1)} className="btn btn-ghost">
                        {t('boeken.step2.back')}
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-primary"
                      >
                        {t('boeken.step2.nextStep')}
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Payment */}
                {step === 3 && (
                  <div className={styles.stepContent}>
                    <h2>{t('boeken.step3.title')}</h2>
                    <p className={styles.stepIntro}>{t('boeken.step3.intro')}</p>

                    <div className={styles.paymentMethods}>
                      <button
                        type="button"
                        onClick={() => setPayMethod('ideal')}
                        className={`${styles.payCard} ${payMethod === 'ideal' ? styles.paySelected : ''} glass`}
                      >
                        iDEAL (Mollie)
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayMethod('card')}
                        className={`${styles.payCard} ${payMethod === 'card' ? styles.paySelected : ''} glass`}
                      >
                        Creditcard
                      </button>
                      <button
                        type="button"
                        onClick={() => setPayMethod('klarna')}
                        className={`${styles.payCard} ${payMethod === 'klarna' ? styles.paySelected : ''} glass`}
                      >
                        Klarna (Achteraf betalen)
                      </button>
                    </div>

                    {payMethod === 'ideal' && (
                      <div className="input-group" style={{ marginTop: '20px' }}>
                        <label className="input-label">{t('boeken.step3.bankLabel')}</label>
                        <select
                          value={idealBank}
                          onChange={(e) => {
                            setIdealBank(e.target.value);
                            setInvalidFields(prev => prev.filter(f => f !== 'idealBank'));
                          }}
                          className={`select ${invalidFields.includes('idealBank') ? 'input-error' : ''}`}
                        >
                          <option value="">{t('boeken.step3.chooseBank')}</option>
                          <option value="rabobank">Rabobank</option>
                          <option value="ing">ING Bank</option>
                          <option value="abnamro">ABN AMRO</option>
                          <option value="sns">SNS Bank</option>
                          <option value="asn">ASN Bank</option>
                          <option value="bunq">bunq</option>
                          <option value="regiobank">RegioBank</option>
                        </select>
                        {invalidFields.includes('idealBank') && (
                          <span className="error-text">{t('boeken.error.idealBank')}</span>
                        )}
                      </div>
                    )}

                    <div className={styles.safetyNotice}>
                      <span>{t('boeken.step3.safetyNotice')}</span>
                    </div>

                    <div className={styles.stepActions}>
                      <button type="button" onClick={() => setStep(2)} className="btn btn-ghost">
                        {t('boeken.step3.back')}
                      </button>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="btn btn-primary btn-lg"
                      >
                        {t('boeken.step3.payBtn')} {formatCurrency(pricing.total)}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side pricing summary (Dynamic sticky sidebar) */}
            <div className={styles.rightCol}>
              <div className={`${styles.summaryCard} glass-card`}>
                <h3>{t('boeken.sidebar.title')}</h3>
                <hr className={styles.divider} />
                <div className={styles.itemSummary}>
                  <h4>{machine.name}</h4>
                  <p>{t('boeken.sidebar.duration')} <strong>{days} {days === 1 ? t('boeken.sidebar.day') : t('boeken.sidebar.days')}</strong></p>
                </div>
                <hr className={styles.divider} />

                <div className={styles.costLines}>
                  <div className={styles.costRow}>
                    <span>{t('boeken.sidebar.rent')}</span>
                    <span>{formatCurrency(pricing.rent)}</span>
                  </div>
                  {needInsurance && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.insurance')}</span>
                      <span>{formatCurrency(pricing.insurance)}</span>
                    </div>
                  )}
                  {pickupMode === 'delivery' && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.transport')}</span>
                      <span>{formatCurrency(pricing.transport)}</span>
                    </div>
                  )}
                  {needDriver && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.driver')}</span>
                      <span>{formatCurrency(pricing.driverCost)}</span>
                    </div>
                  )}
                  {needWagon && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.wagon')}</span>
                      <span>{formatCurrency(pricing.wagonCost)}</span>
                    </div>
                  )}
                  {pricing.kitsCost > 0 && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.kits')}</span>
                      <span>{formatCurrency(pricing.kitsCost)}</span>
                    </div>
                  )}
                  <div className={styles.costRow}>
                    <span>{t('boeken.sidebar.vat')}</span>
                    <span>{formatCurrency(pricing.vat)}</span>
                  </div>
                  {!isBusiness && (
                    <div className={styles.costRow}>
                      <span>{t('boeken.sidebar.deposit')}</span>
                      <span>{formatCurrency(pricing.deposit)}</span>
                    </div>
                  )}
                  <hr className={styles.divider} />
                  <div className={`${styles.costRow} ${styles.totalCost}`}>
                    <span>{t('boeken.sidebar.total')}</span>
                    <strong>{formatCurrency(pricing.total)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* STEP 4: Success / Confetti Overlay */
          <div className={`${styles.successCard} glass-card animate-slide-up`}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: '64px', height: '64px', color: 'var(--color-success)' }}>
                <circle cx="12" cy="12" r="10" />
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>{t('boeken.step4.title')}</h2>
            <p className={styles.successRef}>{t('boeken.step4.ref')} <strong>HWH-2026-{Math.floor(1000 + Math.random() * 9000)}</strong></p>

            <div className={styles.successBody}>
              <p dangerouslySetInnerHTML={{
                __html: t('boeken.step4.body')
                  .replace('{name}', `<strong>${custName}</strong>`)
                  .replace('{method}', `<strong>${payMethod.toUpperCase()}</strong>`)
              }} />
              <p dangerouslySetInnerHTML={{
                __html: t('boeken.step4.emailSent').replace('{email}', `<strong>${custEmail}</strong>`)
              }} />
              <hr className={styles.divider} />
              <h4>{t('boeken.step4.nextTitle')}</h4>
              <ul className={styles.todoList}>
                {pickupMode === 'delivery' ? (
                  <li>{t('boeken.step4.todoDelivery')}</li>
                ) : (
                  <li>{t('boeken.step4.todoPickup')}</li>
                )}
                <li>{t('boeken.step4.todoCert')}</li>
              </ul>
            </div>

            <div className={styles.successActions}>
              <Link href="/" className="btn btn-primary">
                {t('boeken.step4.backHome')}
              </Link>
              <button onClick={() => alert('PDF Factuur gedownload')} className="btn btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '16px', height: '16px' }}>
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                {t('boeken.step4.download')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '40px 0' }}>Reserveringsgegevens laden...</div>}>
      <BookingContent />
    </Suspense>
  );
}
