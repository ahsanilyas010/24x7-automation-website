/** Site-wide constants. Set NEXT_PUBLIC_SITE_URL and NEXT_PUBLIC_CALENDLY_URL in the hosting project settings. */
export const SITE = {
  name: '24x7 Automation',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://24x7automation.com').replace(/\/$/, ''),
  tagline: 'AI front desk for every business',
  description: 'All your WhatsApp, email, Facebook, Instagram and LinkedIn conversations in one dashboard. Sorted, drafted, prioritised and replied to on time, so you only step in when a decision needs you.',
  calendly: process.env.NEXT_PUBLIC_CALENDLY_URL || '',
  demoVideo: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL || '',
};

export const NAV: { href: string; label: string }[] = [
  { href: '/how-it-works', label: 'How it works' },
  { href: '/channels', label: 'Channels' },
  { href: '/industries', label: 'Industries' },
  { href: '/use-cases', label: 'Use cases' },
  { href: '/custom-automation', label: 'Custom automation' },
  { href: '/pricing', label: 'Pricing' },
];

export const FOOTER_LINKS: { title: string; links: { href: string; label: string }[] }[] = [
  { title: 'Product', links: [
    { href: '/how-it-works', label: 'How it works' },
    { href: '/channels', label: 'Channels' },
    { href: '/use-cases', label: 'Use cases' },
    { href: '/security', label: 'Security and control' },
    { href: '/pricing', label: 'Pricing' },
  ] },
  { title: 'Solutions', links: [
    { href: '/industries', label: 'Industries' },
    { href: '/custom-automation', label: 'Custom automation' },
    { href: '/case-studies', label: 'Case studies' },
  ] },
  { title: 'Company', links: [
    { href: '/faq', label: 'Questions' },
    { href: '/book-a-demo', label: 'Book a demo' },
  ] },
];
