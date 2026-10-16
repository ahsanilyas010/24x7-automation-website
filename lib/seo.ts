import type { Metadata } from 'next';
import { SITE } from './site';

/** Per-page metadata: unique title and description, canonical URL, Open Graph and Twitter cards. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const url = path === '/' ? SITE.url : `${SITE.url}${path}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${SITE.name}`, description, url, siteName: SITE.name, type: 'website', locale: 'en_GB' },
    twitter: { card: 'summary_large_image', title: `${title} | ${SITE.name}`, description },
  };
}

export const abs = (path: string) => `${SITE.url}${path}`;

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ name: 'Home', path: '/' }, ...trail].map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: abs(t.path) })),
  };
}

export function faqLd(items: [string, string][]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}
