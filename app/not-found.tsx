import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <section className="wrap" style={{ paddingTop: 96, paddingBottom: 128, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
      <span className="eyebrow">404</span>
      <h1 className="h2">We could not find that page.</h1>
      <p className="lead">It may have moved. Try the home page, or book a demo and we will help directly.</p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn-primary" style={{ height: 48, padding: '0 20px' }}>Go to the home page</Link>
        <Link href="/book-a-demo" className="btn btn-secondary" style={{ height: 48, padding: '0 20px' }}>Book a demo</Link>
      </div>
    </section>
  );
}
