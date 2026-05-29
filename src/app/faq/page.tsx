import React from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function FaqPage() {
  const faqs = [
    {
      q: 'Welk type hoogwerker heb ik nodig?',
      a: 'Dit hangt af van uw werkhoogte, reikwijdte, ondergrond (verhard/onverhard) en of u binnen of buiten werkt. Onze slimme AI-adviseur helpt u in 2 minuten de perfecte machine te selecteren! Probeer de adviseur direct via het menu.',
    },
    {
      q: 'Heb ik een certificaat nodig om een hoogwerker te bedienen?',
      a: 'In Nederland is een hoogwerker-certificaat (zoals IPAF of PAL-card) wettelijk niet altijd verplicht voor particulieren, maar werkgevers en bouwlocaties eisen dit vrijwel altijd in het kader van de Arbowet. Voor zware machines adviseren wij altijd een getrainde operator bij ons te huren.',
    },
    {
      q: 'Wat zijn de transportkosten voor bezorging en ophalen?',
      a: 'Wij hanteren een transparant basistarief van €150 (heen & terug samen) binnen onze standaardleverzone. Voor langere afstanden buiten Zone A berekenen we een toeslag per kilometer. U ziet de exacte logistieke kosten direct in uw winkelmandje.',
    },
    {
      q: 'Kan ik een machine zelf ophalen?',
      a: 'Ja! Kleinere schaarhoogwerkers en aanhangerhoogwerkers kunt u zelf ophalen bij ons depot. Let er wel op dat u een voertuig met voldoende trekgewicht en het juiste rijbewijs (meestal BE) heeft.',
    },
    {
      q: 'Wat is gedekt onder de machineverzekering?',
      a: 'Onze optionele machineverzekering (8% van de huursom) deekt plotselinge schade, diefstal en brand met een minimaal eigen risico van €250. Zonder verzekering bent u zelf volledig aansprakelijk voor de nieuwwaarde van de machine.',
    },
    {
      q: 'Kan ik een reservering kosteloos annuleren?',
      a: 'Zeker! U kunt uw reservering tot 24 uur voor de geplande leverdatum of ophaaltijd volledig kosteloos annuleren. U ontvangt dan het volledige bedrag inclusief borg binnen 3 werkdagen terug op uw rekening.',
    },
  ];

  return (
    <div className={styles.faqPage}>
      <div className={`${styles.header} gradient-bg-dark`}>
        <div className="container">
          <div className={styles.breadcrumbs}>
            <Link href="/">Home</Link> &gt; <span>FAQ</span>
          </div>
          <h1>Veelgestelde Vragen (FAQ)</h1>
          <p>Alles wat u moet weten over het huren, leveren en bedienen van onze hoogwerkers.</p>
        </div>
      </div>

      <div className={`${styles.mainContent} container`}>
        <div className={styles.faqList}>
          {faqs.map((faq, idx) => (
            <details key={idx} className={`${styles.faqItem} glass-card`}>
              <summary className={styles.faqQuestion}>
                <span>{faq.q}</span>
                <span className={styles.arrow}>v</span>
              </summary>
              <div className={styles.faqAnswer}>
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>

        <div className={`${styles.ctaSection} glass-card`}>
          <h3>Staat uw vraag er niet tussen?</h3>
          <p>Onze deskundige klantenservice staat elke werkdag van 08:00 tot 17:00 voor u klaar.</p>
          <div className={styles.ctaButtons}>
            <a href="tel:+31201234567" className="btn btn-primary">
              Bel ons direct
            </a>
            <Link href="/#contact" className="btn btn-outline">
              Stuur een bericht
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
