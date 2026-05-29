# 🪜 HoogwerkerHub — Hoogwerker & Platform Verhuur Nederland

**HoogwerkerHub** is een modern, premium en AI-gestuurd platform voor het online huren van hoogwerkers, schaarliften en telescopische platformen in heel Nederland. De applicatie combineert een state-of-the-art ontwerp met een slimme AI-keuzeassistent om het huren van zwaar materieel zo eenvoudig, veilig en transparant mogelijk te maken.

---

## 🚀 Kernfunctionaliteiten

### 1. 🤖 AI-Gestuurde Machine Adviseur (`/adviseur`)
Een interactieve 6-staps wizard die gebruikers helpt bij het berekenen en selecteren van de perfecte machine voor hun project:
* **Klustype detectie:** Stemt de armconfiguratie af op de specifieke klus (bijv. schilderwerk, boomverzorging, gevelreiniging).
* **Omgevingsanalyse:** Adviseert emissievrije elektrische motoren voor binnen of robuuste 4x4 diesels voor ruw buitenterrein.
* **Hoogte & Obstakel berekening:** Houdt rekening met werkhoogte, darre doorgangen en zijdelings bereik over obstakels heen.
* **Automatische matchmaker:** Berekent op basis van een algoritme een matchingspercentage (`% fit`) en stelt een **Beste Match** en **Budget Optie** voor.
* **Directe WhatsApp koppeling:** Genereert een contextbewust chatbericht met alle ingevulde parameters voor direct persoonlijk contact.

### 2. 🌐 Volledige Meertaligheid (NL / EN)
Dankzij een dynamische `LanguageContext` en de gecentraliseerde vertaalmodule `translations.ts` wisselt het hele platform naadloos tussen Felemenkçe (NL) en Engels (EN) zonder pagina-herlaad.

### 3. 🛍️ Premium Klus-Pakketten (Klus-Kits)
Unieke add-on functionaliteit waarbij klanten direct verbruiksartikelen en professionele gereedschapssets kunnen toevoegen aan hun boeking:
* 🎨 *Schilders Premium Pakket*
* 🧼 *Gevelreiniging & Glasbewassing Pro-Kit*
* 🌳 *Snoei & Boomverzorging Hulpset*
* ⚡ *Elektra & Installatietechniek Kit*

### 4. 📅 Geavanceerd 3-Staps Reserveringsproces (`/boeken`)
Een vloeiende checkout-flow die de volledige logistieke afhandeling structureert:
* **Stap 1: Configuratie:** Selectie van datums, bezorging vs. ophalen, transportadres en optionele add-ons (zoals schadeverzekering of gecertificeerde machinist).
* **Stap 2: Gegevensverificatie:** Invoer voor particulieren of B2B-klanten (incl. KVK/BTW-validatie en IPAF certificaten-check).
* **Stap 3: Mollie Checkout:** Simulatie van een beveiligde iDEAL-betaling via Mollie Payment Services.
* **Real-time Kostenberekening:** De sidebar berekent direct de huursom, 21% BTW, transportkosten en retourneerbare borg.

---

## 🛠️ Technology Stack

* **Framework:** [Next.js 16 (Canary)](https://nextjs.org/) (App Router & Static Site Generation)
* **Library:** [React 19](https://react.dev/) (Hooks, State Management, Context API, Memoization)
* **Styling:** Pure Vanilla CSS & CSS Variables met Glassmorphism-effecten, vloeiende micro-animaties en responsieve grids.
* **Fonts:** Google Fonts (Outfit voor koppen en Inter voor bodytekst)
* **Icons:** Hoge resolutie inline SVGs en moderne emoji-badges.

---

## 💻 Lokaal Uitvoeren

Volg deze stappen om het project lokaal op te starten:

1. **Clone de repository:**
   ```bash
   git clone https://github.com/devonurefe/transport.git
   cd transport
   ```

2. **Installeer de afhankelijkheden:**
   ```bash
   npm install
   ```

3. **Start de ontwikkelserver:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in uw browser.

4. **Productie build genereren:**
   ```bash
   npm run build
   npm run start
   ```

---

## 📂 Project Structuur

```text
├── src/
│   ├── app/                 # Next.js App Router (Roteringen & Pagina's)
│   │   ├── admin/           # Admin controlepaneel
│   │   ├── adviseur/        # AI Machine Adviseur Wizard
│   │   ├── boeken/          # Dynamisch checkout formulier
│   │   ├── machines/        # Machineoverzicht en individuele detailpagina's
│   │   ├── globals.css      # Globaal CSS-ontwerp (Kleuren, Grids, Klassen)
│   │   ├── layout.tsx       # Root layout (Navbar, Footer, Widgets)
│   │   └── page.tsx         # Premium Homepagina
│   ├── components/          # Herbruikbare React UI Componenten
│   │   ├── layout/          # Navbar & Footer
│   │   ├── ui/              # CookieBanner, WhatsAppWidget, Badges
│   │   └── LanguageContext.tsx
│   └── data/                # Statische data en vertalingen
│       ├── machines.ts      # 16 complete platformen & Klus-Kits data
│       └── translations.ts  # Vertalingswoordenboek (NL & EN)
```

---

## 🔒 Licentie & Beveiliging

Alle machines en platforms die via HoogwerkerHub worden verhuurd, zijn 100% gekeurd volgens de strengste **TÜV/VCA** veiligheidsnormen. De broncode is gelicentieerd onder de **MIT-licentie**.
