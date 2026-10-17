import { Fragment } from 'react';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { breadcrumbLd } from '@/lib/seo';

/** Splits a heading into words that rise into view when their section is revealed. */
export function Split({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="split" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}><span className="w" aria-hidden="true"><span style={{ ['--i' as string]: i + delay }}>{w}</span></span>{' '}</Fragment>
      ))}
    </span>
  );
}

export const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export function Breadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <>
      <JsonLd data={breadcrumbLd(trail)} />
      <nav aria-label="Breadcrumb" style={{ fontSize: 14, color: '#6D675C' }}>
        <ol style={{ display: 'flex', flexWrap: 'wrap', gap: 8, listStyle: 'none', margin: 0, padding: 0 }}>
          <li><Link href="/">Home</Link></li>
          {trail.map((t, i) => (
            <li key={t.path} style={{ display: 'flex', gap: 8 }}>
              <span aria-hidden="true">/</span>
              {i === trail.length - 1 ? <span aria-current="page" style={{ color: '#17150F', fontWeight: 600 }}>{t.name}</span> : <Link href={t.path}>{t.name}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

/** Opening block of every inner page: breadcrumb, one h1, lead paragraph and calls to action. */
export function PageHero({ trail, eyebrow, title, lead, children }: { trail: { name: string; path: string }[]; eyebrow: string; title: string; lead: string; children?: ReactNode }) {
  return (
    <section className="wrap" style={{ paddingTop: 40, paddingBottom: 64, display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Breadcrumbs trail={trail} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 820, paddingTop: 16 }}>
        <span className="eyebrow" data-reveal="0">{eyebrow}</span>
        <h1 className="hero-h1" style={{ margin: 0, fontSize: 'clamp(38px,5vw,64px)', lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 700, textWrap: 'balance' }}><Split text={title} delay={1} /></h1>
        <p data-reveal="140" className="lead" style={{ fontSize: 20, lineHeight: '30px', maxWidth: 680 }}>{lead}</p>
        {children ? <div data-reveal="220" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>{children}</div> : null}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, dark }: { eyebrow?: string; title: string; lead?: string; dark?: boolean }) {
  return (
    <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
      {eyebrow ? <span className="eyebrow" style={dark ? { color: '#62C6D3' } : undefined}>{eyebrow}</span> : null}
      <h2 className="h2" style={dark ? { color: '#EEEAE2' } : undefined}><Split text={title} /></h2>
      {lead ? <p className="lead" style={dark ? { color: '#CBC5BA' } : undefined}>{lead}</p> : null}
    </div>
  );
}

export function BookDemoButton({ label = 'Book a demo', large }: { label?: string; large?: boolean }) {
  return <Link href="/book-a-demo" data-magnetic className="btn btn-primary" style={large ? { height: 52, padding: '0 22px', fontSize: 17 } : { height: 40, padding: '0 16px' }}>{label} <Arrow /></Link>;
}

/** Closing call to action shared by every page. */
export function CtaBand({ title = 'Talk to us now to get everything connected and boost your sales and service.', text = 'A 20 minute call. We set it up with your industry stages and a few of your real questions, so you see replies in your own words.' }: { title?: string; text?: string }) {
  return (
    <section style={{ background: '#12110E', color: '#EEEAE2' }}>
      <div className="wrap" style={{ paddingTop: 88, paddingBottom: 88, display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start' }}>
        <h2 data-reveal="0" className="h2" style={{ color: '#FFFFFF', maxWidth: 780 }}><Split text={title} /></h2>
        <p data-reveal="120" style={{ margin: 0, fontSize: 19, lineHeight: '29px', color: '#CBC5BA', maxWidth: 620 }}>{text}</p>
        <div data-reveal="200" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/book-a-demo" data-magnetic className="btn btn-light" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>Book a demo <Arrow /></Link>
          <Link href="/faq" className="btn" style={{ height: 52, padding: '0 22px', fontSize: 17, border: '1px solid #4B463D', color: '#EEEAE2' }}>Read the questions</Link>
        </div>
      </div>
    </section>
  );
}
