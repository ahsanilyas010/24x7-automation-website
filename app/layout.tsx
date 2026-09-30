import type { Metadata, Viewport } from 'next';
import { Instrument_Sans } from 'next/font/google';
import './globals.css';

const sans = Instrument_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-sans', display: 'swap' });

export const metadata: Metadata = {
  title: '24x7 Automation: AI front desk for UK small businesses',
  description: 'WhatsApp, email and SMS in one inbox. Replies in your voice, drafted from your own business terms. You only step in when a decision needs you.',
  icons: { icon: '/icon.svg' },
};

export const viewport: Viewport = { themeColor: '#F6F4EF' };

// Hides reveal targets before first paint so they can fade in, unless the visitor prefers reduced motion.
const revealBoot = `try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal-ready')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={sans.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: revealBoot }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
