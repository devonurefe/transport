import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CookieBanner from '@/components/ui/CookieBanner';
import WhatsAppWidget from '@/components/ui/WhatsAppWidget';
import { LanguageProvider } from '@/components/LanguageContext';

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  display: 'swap',
});

const outfit = Outfit({
  variable: '--font-heading',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'HoogwerkerHub — Hoogwerker & Platform Verhuur Nederland',
  description:
    'Vind en huur direct online de perfecte hoogwerker voor uw klus in Nederland. AI-gestuurd advies voor schaarliften, telescoopliften, spinhoogwerkers en meer.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${outfit.variable}`}>
      <body>
        <LanguageProvider>
          <Navbar />
          <main style={{ flex: 1, paddingTop: '75px' }}>
            {children}
          </main>
          <Footer />
          <CookieBanner />
          <WhatsAppWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
