export const TRANSLATIONS: {
  [lang in 'NL' | 'EN']: {
    [key: string]: any;
  };
} = {
  NL: {
    nav: {
      machines: 'Machines',
      advisor: 'AI Adviseur',
      about: 'Over Ons',
      contact: 'Contact',
      rentDirect: 'Huur Direct',
      langBtn: 'NL'
    },
    footer: {
      description: 'HoogwerkerHub is uw betrouwbare partner in Nederland voor hoogwerkers, schaarliften en telescopische platformen. AI-gestuurd advies voor de perfecte klus.',
      quickLinks: 'Snelkoppelingen',
      categories: 'Categorieën',
      contactInfo: 'Contact & Info',
      address: 'Adres: Keizersgracht 123, 1016 CJ Amsterdam',
      phone: 'Telefoon: +31 (0)20 123 4567',
      email: 'E-mail: info@hoogwerkerhub.nl',
      rights: 'Alle rechten voorbehouden.',
      terms: 'Algemene Voorwaarden',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Instellingen'
    },
    home: {
      hero: {
        preTitle: '🏆 De Nummer 1 in Hoogwerker Verhuur',
        title: 'Vind Direct de Perfecte',
        subtitle: 'Hoogwerker',
        text: 'Huur snel, veilig en voordelig hoogwerkers door heel Nederland. Laat onze slimme AI-adviseur gratis de juiste machine voor uw project berekenen.',
        wizardType: 'Type Werkzaamheid',
        wizardHeight: 'Werkhoogte (meters)',
        wizardChoose: 'Kies type machine...',
        wizardSearch: 'Zoeken',
        trust1: '500+ Machines',
        trust2: 'Direct Boeken',
        trust3: '24/7 Support',
        graphicTitle: 'AI Advies Aanbevolen',
        graphicText: 'Ideale machine gevonden!',
        graphicTry: 'Probeer Nu'
      },
      categories: {
        title: 'Onze Machine Categorieën',
        subtitle: 'Kies het juiste platform voor uw specifieke klus. Van compacte schaarliften voor binnen tot zware rupsen voor buiten.',
        count: 'machines'
      },
      aiBanner: {
        badge: 'PREMIUM AI ENGINE',
        title: 'Niet zeker welke machine u nodig heeft?',
        desc: 'Laat onze slimme AI-wizard het rekenwerk doen! Vertel ons eenvoudig wat voor werk u gaat doen (bv. schilderen, gevelreiniging, boomverzorging) en de omgevingsdetails. U ontvangt direct een op maat gemaakt voorstel.',
        step1: 'Kies uw klustype',
        step2: 'Geef de hoogte op',
        step3: 'Ontvang direct de perfecte match!',
        button: 'Start AI Adviseur'
      },
      featured: {
        title: 'Populaire Machines',
        subtitle: 'De meest gehuurde machines door onze klanten voor installatie, bouw en onderhoud.',
        from: 'Vanaf',
        unit: '/dag',
        details: 'Details',
        electric: 'elektrisch',
        diesel: 'diesel',
        hybrid: 'hybride',
        biEnergy: 'bi-energy'
      },
      stats: {
        fleet: 'Machines in Vloot',
        customers: 'Tevreden Klanten',
        experience: 'Ervaring in Logistiek',
        rating: 'Aanbevelingsscore'
      },
      testimonials: {
        title: 'Wat Onze Klanten Zeggen',
        subtitle: 'Duizenden zzp-ers, bouwbedrijven en particulieren huren met succes bij HoogwerkerHub.'
      },
      about: {
        preTitle: 'Over Ons',
        title: 'Wie is HoogwerkerHub?',
        desc1: 'HoogwerkerHub is opgericht met een duidelijke missie: het huren van hoogwerkers in Nederland zo eenvoudig, veilig en transparant mogelijk maken. We merkten dat verhuurbedrijven vaak onduidelijke tarieven hanteren en dat het kiezen van de juiste machine lastig is.',
        desc2: 'Met onze geavanceerde AI Adviseur en directe online boekingstechnologie hebben we dit proces volledig getransformeerd. Of u nu een zzp-er bent die een gevel moet schilderen, of een groot installatiebedrijf; wij staan voor u klaar met 500+ machines door heel Nederland.',
        card1Title: '100% Gecertificeerd',
        card1Desc: 'Al ons materieel wordt jaarlijks grondig gekeurd volgens de strengste TUV/VCA veiligheidsnormen.',
        card2Title: 'Landelijke Dekking',
        card2Desc: 'Snelle levering op elke locatie in Nederland dankzij onze eigen logistieke transportvloot.'
      },
      contact: {
        title: 'Neem Contact Op',
        subtitle: 'Heeft u specifieke wensen of persoonlijk advies nodig? Vul het formulier in en ons team reageert binnen 2 uur.',
        name: 'Naam',
        email: 'E-mailadres',
        subject: 'Onderwerp',
        message: 'Bericht',
        namePlaceholder: 'Uw naam',
        emailPlaceholder: 'Uw e-mailadres',
        subjectPlaceholder: 'Waar gaat uw vraag over?',
        messagePlaceholder: 'Typ hier uw bericht...',
        submit: 'Bericht Verzenden',
        success: 'Bericht verzonden! We nemen zo snel mogelijk contact op.',
        callTitle: 'Bel direct',
        workdays: 'Werkdagen: 08:00 - 17:00',
        depotTitle: 'Depot Amsterdam',
        emailTitle: 'E-mail ons'
      },
      cta: {
        title: 'Klaar om veilig op hoogte te werken?',
        desc: 'Huur vandaag nog uw hoogwerker en start uw project zonder vertraging.',
        assortment: 'Bekijk Assortiment',
        call: 'Bel: +31 (0)20 123 4567'
      },
      kits: {
        title: 'Premium Klus-Pakketten & Accessoires',
        subtitle: 'Voeg specifieke verbruiksartikelen toe aan uw bestelling. Direct geleverd bij uw machine in een handige tas.',
        included: 'Inhoud kit:',
        addBtn: 'Voeg toe aan boeking',
        tagB2b: 'Optioneel voor B2B/B2C'
      }
    },
    boeken: {
      breadcrumbs: {
        home: 'Home',
        booking: 'Reserveren'
      },
      title: 'Machine Reserveren',
      subtitle: 'U reserveert momenteel de:',
      stepper: {
        step1: 'Configuratie',
        step2: 'Gegevens',
        step3: 'Betaling'
      },
      error: {
        banner: 'Controleer de gemarkeerde velden en vul ze correct in.',
        startDate: 'Selecteer a.u.b. de startdatum.',
        endDate: 'Selecteer a.u.b. de einddatum.',
        endAfterStart: 'De einddatum moet na de startdatum van de huur liggen.',
        postcode: 'Ongeldige postcode. (bv. 1234 AB)',
        houseNumber: 'Huisnummer is verplicht.',
        city: 'Plaats is verplicht.',
        custName: 'Vul a.u.b. uw volledige naam in.',
        custEmail: 'Vul a.u.b. een geldig e-mailadres in.',
        custPhone: 'Vul a.u.b. uw telefoonnummer in.',
        companyName: 'Vul a.u.b. uw bedrijfsnaam in.',
        kvk: 'Vul a.u.b. uw KvK-nummer in.',
        idealBank: 'Selecteer a.u.b. uw bank voor de iDEAL betaling.'
      },
      step1: {
        title: '1. Huurperiode & Bezorging',
        intro: 'Pas de huurperiode en bezorgopties aan voor uw project.',
        startLabel: 'Startdatum huur',
        endLabel: 'Einddatum huur',
        durationLabel: 'Huurduur',
        day: 'dag',
        days: 'dagen',
        deliveryLabel: 'Levering',
        deliveryOption: 'Bezorging op locatie',
        pickupOption: 'Zelf ophalen (Depot)',
        postcode: 'Postcode',
        houseNumber: 'Huisnummer + Toev.',
        city: 'Plaats (Stad)',
        verifiedAddress: 'Geverifieerd adres:',
        addonsTitle: 'Optionele Add-ons',
        driverTitle: 'Gecertificeerde Machinist Huren',
        driverDesc: 'Heeft u geen IPAF certificaat? Huur een van onze professionele machinisten. (€350/dag)',
        trailerTitle: 'Aanhangwagen / Vagon Huren',
        trailerDesc: 'Geschikt voor transport van deze aanhangerhoogwerker. (€45/dag)',
        insuranceTitle: 'Schade & Brandverzekering (Aanbevolen)',
        insuranceDesc: 'Verlaagt uw eigen risico naar €250 bij schade. (8% van huursom)',
        kitsTitle: 'Klus-Pakketten & Accessoires',
        kitsDesc: 'Voeg direct verbruiksartikelen en gereedschapssets toe voor uw klus:',
        nextStep: 'Volgende stap'
      },
      step2: {
        title: '2. Uw Gegevens',
        intro: 'Vul uw persoonsgegevens in om de huurovereenkomst op te stellen.',
        private: 'Particulier',
        business: 'Zakelijk (B2B)',
        name: 'Volledige Naam',
        email: 'E-mailadres',
        phone: 'Telefoonnummer',
        company: 'Bedrijfsnaam',
        kvk: 'KvK Nummer',
        btw: 'BTW-nummer',
        safetyTitle: 'Veiligheid & Certificaten check',
        ipafLabel: 'Ik ben in het bezit van een geldig IPAF / PAL-card certificaat',
        licBLabel: 'Ik bezit het vereiste BE rijbewijs om de aanhanger te trekken',
        back: 'Terug',
        nextStep: 'Volgende stap'
      },
      step3: {
        title: '3. Veilige Afrekening',
        intro: 'Reken veilig af via Mollie. Onze iDEAL-betalingen zijn direct.',
        bankLabel: 'Selecteer uw Bank',
        chooseBank: 'Kies uw bank...',
        safetyNotice: 'Beveiligde transactie door Mollie Payment Services.',
        payBtn: 'Betaal',
        back: 'Terug'
      },
      step4: {
        title: 'Reservering Bevestigd!',
        ref: 'Reserveringsnummer:',
        body: 'Beste {name}, uw betaling via {method} is succesvol verwerkt.',
        emailSent: 'Er is een automatische bevestiging met de PDF-factuur verzonden naar: {email}.',
        nextTitle: 'Wat gebeurt er nu?',
        todoDelivery: 'Onze logistieke afdeling levert de machine op uw adres op de startdatum.',
        todoPickup: 'De machine staat klaar voor afhalen bij ons depot in Amsterdam op de startdatum.',
        todoCert: 'Zorg dat u uw ID-bewijs en eventuele IPAF-sertificaten bij de hand heeft voor overdracht.',
        backHome: 'Terug naar Home',
        download: 'Download Factuur (PDF)'
      },
      sidebar: {
        title: 'Reserveringsoverzicht',
        duration: 'Huurduur:',
        day: 'dag',
        days: 'dagen',
        rent: 'Huursom:',
        insurance: 'Verzekering (8%):',
        transport: 'Transport (heen/terug):',
        driver: 'Machinist toeslag:',
        wagon: 'Aanhangwagen toeslag:',
        kits: 'Klus-Pakketten:',
        vat: 'BTW (21%):',
        deposit: 'Borg (retourneerbaar):',
        total: 'Totaal te betalen:'
      }
    },
    cookieBanner: {
      title: 'Cookie Voorkeuren',
      text: 'HoogwerkerHub gebruikt cookies om uw surfervaring te verbeteren, gepersonaliseerde advertenties of inhoud te leveren en ons verkeer te analyseren. Door op "Alles accepteren" te klikken, stemt u in met ons gebruik van cookies conform de GDPR-richtlijnen.',
      necessary: 'Alleen noodzakelijk',
      accept: 'Alles accepteren'
    },
    whatsapp: {
      title: 'HoogwerkerHub Support',
      status: 'Online (Binnen 5 min reactie)',
      ariaClose: 'Sluit chat',
      ariaOpen: 'Open WhatsApp Chat',
      welcome: 'Beste bezoeker 👋 Heb je een vraag over het kiezen of huren van de juiste hoogwerker? Stuur ons direct een bericht! We helpen je graag op weg.',
      btnText: 'Chat starten op WhatsApp',
      msgText: 'Hallo HoogwerkerHub! Ik heb een vraag over het huren van een hoogwerker...'
    }
  },
  EN: {
    nav: {
      machines: 'Machines',
      advisor: 'AI Advisor',
      about: 'About Us',
      contact: 'Contact',
      rentDirect: 'Rent Direct',
      langBtn: 'EN'
    },
    footer: {
      description: 'HoogwerkerHub is your reliable partner in the Netherlands for aerial work platforms, scissor lifts, and telescopic boom lifts. AI-guided advice for the perfect job.',
      quickLinks: 'Quick Links',
      categories: 'Categories',
      contactInfo: 'Contact & Info',
      address: 'Address: Keizersgracht 123, 1016 CJ Amsterdam',
      phone: 'Phone: +31 (0)20 123 4567',
      email: 'Email: info@hoogwerkerhub.nl',
      rights: 'All rights reserved.',
      terms: 'Terms & Conditions',
      privacy: 'Privacy Policy',
      cookies: 'Cookie Settings'
    },
    home: {
      hero: {
        preTitle: '🏆 The Number 1 in Aerial Platform Rental',
        title: 'Find the Perfect',
        subtitle: 'Boom Lift Instantly',
        text: 'Rent aerial lifts quickly, safely, and affordably across the Netherlands. Let our smart AI Advisor calculate the exact right machine for your project for free.',
        wizardType: 'Activity Type',
        wizardHeight: 'Working Height (meters)',
        wizardChoose: 'Choose machine type...',
        wizardSearch: 'Search',
        trust1: '500+ Machines',
        trust2: 'Book Instantly',
        trust3: '24/7 Support',
        graphicTitle: 'AI Advice Recommended',
        graphicText: 'Ideal machine found!',
        graphicTry: 'Try Now'
      },
      categories: {
        title: 'Our Machine Categories',
        subtitle: 'Choose the right platform for your specific task. From compact indoor scissor lifts to heavy-duty outdoor crawlers.',
        count: 'platforms'
      },
      aiBanner: {
        badge: 'PREMIUM AI ENGINE',
        title: 'Not sure which machine you need?',
        desc: 'Let our smart AI wizard do the math! Simply tell us what kind of work you will do (e.g. painting, facade cleaning, tree care) and the site conditions. You will receive an immediate tailor-made proposal.',
        step1: 'Choose your job type',
        step2: 'Specify the height',
        step3: 'Receive the perfect match instantly!',
        button: 'Start AI Advisor'
      },
      featured: {
        title: 'Popular Machinery',
        subtitle: 'The most rented machines by our clients for installation, construction, and maintenance.',
        from: 'From',
        unit: '/day',
        details: 'Details',
        electric: 'electric',
        diesel: 'diesel',
        hybrid: 'hybrid',
        biEnergy: 'bi-energy'
      },
      stats: {
        fleet: 'Machines in Fleet',
        customers: 'Satisfied Customers',
        experience: 'Years in Logistics',
        rating: 'Recommendation Rate'
      },
      testimonials: {
        title: 'What Our Customers Say',
        subtitle: 'Thousands of freelancers, construction companies, and homeowners rent successfully with HoogwerkerHub.'
      },
      about: {
        preTitle: 'About Us',
        title: 'Who is HoogwerkerHub?',
        desc1: 'HoogwerkerHub was founded with a clear mission: to make renting aerial platforms in the Netherlands as simple, safe, and transparent as possible. We noticed that rental companies often use unclear rates and that choosing the right machine is difficult.',
        desc2: 'With our advanced AI Advisor and instant online booking technology, we have fully transformed this process. Whether you are a painter needing to paint a facade or a large installation company, we are ready for you with 500+ machines throughout the Netherlands.',
        card1Title: '100% Certified',
        card1Desc: 'All of our equipment is thoroughly inspected annually according to the strictest TUV/VCA safety standards.',
        card2Title: 'National Coverage',
        card2Desc: 'Fast delivery to any location in the Netherlands thanks to our own logistics transport fleet.'
      },
      contact: {
        title: 'Get in Touch',
        subtitle: 'Do you have specific wishes or need personal advice? Fill out the form and our team will respond within 2 hours.',
        name: 'Name',
        email: 'Email Address',
        subject: 'Subject',
        message: 'Message',
        namePlaceholder: 'Your name',
        emailPlaceholder: 'Your email address',
        subjectPlaceholder: 'What is your question about?',
        messagePlaceholder: 'Type your message here...',
        submit: 'Send Message',
        success: 'Message sent! We will contact you as soon as possible.',
        callTitle: 'Call us directly',
        workdays: 'Workdays: 08:00 - 17:00',
        depotTitle: 'Depot Amsterdam',
        emailTitle: 'Email us'
      },
      cta: {
        title: 'Ready to work safely at heights?',
        desc: 'Rent your boom lift today and start your project without delay.',
        assortment: 'View Assortment',
        call: 'Call: +31 (0)20 123 4567'
      },
      kits: {
        title: 'Premium Job Packages & Accessories',
        subtitle: 'Add specific consumables to your order. Delivered directly with your machine in a handy utility bag.',
        included: 'Kit contents:',
        addBtn: 'Add to booking',
        tagB2b: 'Optional for B2B/B2C'
      }
    },
    boeken: {
      breadcrumbs: {
        home: 'Home',
        booking: 'Booking'
      },
      title: 'Reserve Machine',
      subtitle: 'You are currently reserving the:',
      stepper: {
        step1: 'Configuration',
        step2: 'Details',
        step3: 'Payment'
      },
      error: {
        banner: 'Please check the highlighted fields and fill them out correctly.',
        startDate: 'Please select the start date.',
        endDate: 'Please select the end date.',
        endAfterStart: 'The end date must be after the rental start date.',
        postcode: 'Invalid postcode. (e.g. 1234 AB)',
        houseNumber: 'House number is required.',
        city: 'City is required.',
        custName: 'Please fill in your full name.',
        custEmail: 'Please fill in a valid email address.',
        custPhone: 'Please fill in your phone number.',
        companyName: 'Please fill in your company name.',
        kvk: 'Please fill in your KvK number.',
        idealBank: 'Please select your bank for the iDEAL payment.'
      },
      step1: {
        title: '1. Rental Period & Delivery',
        intro: 'Customize the rental period and delivery options for your project.',
        startLabel: 'Rental Start Date',
        endLabel: 'Rental End Date',
        durationLabel: 'Rental Duration',
        day: 'day',
        days: 'days',
        deliveryLabel: 'Delivery',
        deliveryOption: 'Delivery on location',
        pickupOption: 'Self Pick-up (Depot)',
        postcode: 'Postcode',
        houseNumber: 'House Number + Ext.',
        city: 'City / Town',
        verifiedAddress: 'Verified Address:',
        addonsTitle: 'Optional Add-ons',
        driverTitle: 'Rent Certified Operator',
        driverDesc: 'No IPAF license? Hire one of our professional, certified operators. (€350/day)',
        trailerTitle: 'Rent Towing Trailer',
        trailerDesc: 'Suitable for transporting this trailer-mounted lift. (€45/day)',
        insuranceTitle: 'Damage & Fire Insurance (Recommended)',
        insuranceDesc: 'Lowers your deductible to €250 in case of damage. (8% of rental total)',
        kitsTitle: 'Job Packages & Accessories',
        kitsDesc: 'Add practical consumables and toolkits directly for your chore:',
        nextStep: 'Next Step'
      },
      step2: {
        title: '2. Your Details',
        intro: 'Fill in your personal details to draw up the rental agreement.',
        private: 'Consumer',
        business: 'Business (B2B)',
        name: 'Full Name',
        email: 'Email Address',
        phone: 'Phone Number',
        company: 'Company Name',
        kvk: 'KvK Number (Chamber)',
        btw: 'VAT Number',
        safetyTitle: 'Safety & Certificate check',
        ipafLabel: 'I hold a valid IPAF / PAL-card operator license',
        licBLabel: 'I hold the required BE driving license to tow the trailer',
        back: 'Back',
        nextStep: 'Next Step'
      },
      step3: {
        title: '3. Secure Checkout',
        intro: 'Check out securely via Mollie. Our iDEAL payments are instant.',
        bankLabel: 'Select your Bank',
        chooseBank: 'Choose your bank...',
        safetyNotice: 'Secure transaction processed by Mollie Payment Services.',
        payBtn: 'Pay',
        back: 'Back'
      },
      step4: {
        title: 'Reservation Confirmed!',
        ref: 'Reservation Reference:',
        body: 'Dear {name}, your payment via {method} has been processed successfully.',
        emailSent: 'An automatic confirmation with the PDF invoice has been sent to: {email}.',
        nextTitle: 'What happens next?',
        todoDelivery: 'Our logistics department will deliver the machine to your address on the start date.',
        todoPickup: 'The machine is ready for pick-up at our Amsterdam depot on the start date.',
        todoCert: 'Please ensure you have your ID card and any IPAF certificates handy for the handover.',
        backHome: 'Back to Home',
        download: 'Download Invoice (PDF)'
      },
      sidebar: {
        title: 'Reservation Summary',
        duration: 'Rental Duration:',
        day: 'day',
        days: 'days',
        rent: 'Rental Fee:',
        insurance: 'Insurance (8%):',
        transport: 'Transport (round trip):',
        driver: 'Certified operator fee:',
        wagon: 'Trailer fee:',
        kits: 'Job Packages:',
        vat: 'VAT (21%):',
        deposit: 'Deposit (refundable):',
        total: 'Total to pay:'
      }
    },
    cookieBanner: {
      title: 'Cookie Preferences',
      text: 'HoogwerkerHub uses cookies to improve your browsing experience, deliver personalized advertisements or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies in accordance with GDPR guidelines.',
      necessary: 'Only necessary',
      accept: 'Accept all'
    },
    whatsapp: {
      title: 'HoogwerkerHub Support',
      status: 'Online (Replies within 5 min)',
      ariaClose: 'Close chat',
      ariaOpen: 'Open WhatsApp Chat',
      welcome: 'Dear visitor 👋 Do you have a question about choosing or renting the right aerial platform? Send us a message directly! We\'d love to help you get started.',
      btnText: 'Start chat on WhatsApp',
      msgText: 'Hello HoogwerkerHub! I have a question about renting an aerial platform...'
    }
  }
};
