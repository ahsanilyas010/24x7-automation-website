import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/site';
import { IND } from '@/components/data';

const PAGES: { path: string; priority: number }[] = [
  { path: '/', priority: 1 },
  { path: '/how-it-works', priority: 0.9 },
  { path: '/channels', priority: 0.8 },
  { path: '/industries', priority: 0.9 },
  { path: '/use-cases', priority: 0.8 },
  { path: '/custom-automation', priority: 0.9 },
  { path: '/pricing', priority: 0.8 },
  { path: '/case-studies', priority: 0.6 },
  { path: '/security', priority: 0.6 },
  { path: '/faq', priority: 0.7 },
  { path: '/book-a-demo', priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...PAGES.map((p) => ({ url: `${SITE.url}${p.path === '/' ? '' : p.path}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p.priority })),
    ...IND.map((i) => ({ url: `${SITE.url}/industries/${i.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 })),
  ];
}
