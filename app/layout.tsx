import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';
import { SITE } from '@/lib/site';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { RevealController } from '@/components/Interactive';
import { PageEffects } from '@/components/Effects';
import { JsonLd } from '@/components/ui';

const sans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  icons: { icon: '/icon.svg' },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: { siteName: SITE.name, type: 'website', locale: 'en_GB', title: `${SITE.name}: ${SITE.tagline}`, description: SITE.description, url: SITE.url },
  twitter: { card: 'summary_large_image', title: `${SITE.name}: ${SITE.tagline}`, description: SITE.description },
};

export const viewport: Viewport = { themeColor: '#F6F4EF' };

// Hides reveal targets before first paint so they can fade in, unless the visitor prefers reduced motion.
const revealBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-ready')}catch(e){}`;

const siteLd = [
  { '@context': 'https://schema.org', '@type': 'Organization', name: SITE.name, url: SITE.url, logo: `${SITE.url}/icon.svg`, description: SITE.description },
  { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: SITE.url },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
        <JsonLd data={siteLd} />
      </head>
      <body>
        <div className="page">
          <RevealController />
          <PageEffects />
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
