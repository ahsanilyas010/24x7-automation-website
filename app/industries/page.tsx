import Link from 'next/link';
import Image from 'next/image';
import { CtaBand, PageHero, SectionHead, BookDemoButton, Arrow } from '@/components/ui';
import { Industries } from '@/components/Interactive';
import { IND } from '@/components/data';
import { PHOTOS } from '@/components/photos';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Industries: an AI front desk built around your trade',
  description: 'Construction, home services, clinics, salons, real estate, legal, hospitality, garages, education and fitness. Pick your industry and the stages, wording and follow ups match it.',
  path: '/industries',
});

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'Industries', path: '/industries' }]} eyebrow="Industries" title="Built around how your trade actually works." lead="Choose your industry and the stages, wording and follow ups match it, with every channel your customers use managed in one place. Anything can be renamed, reordered or removed in Settings.">
        <BookDemoButton large />
      </PageHero>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-sm)', paddingBottom: 'var(--sec-sm)' }}><Industries /></div>
      </section>
      <section className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <SectionHead eyebrow="Explore by industry" title="Find your industry." lead="Not on the list? 24x7 Automation works for any business that answers customers by message, and our custom automation service covers the rest." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20 }}>
          {IND.map((x, i) => (
            <Link key={x.slug} href={`/industries/${x.slug}`} data-reveal={String(i * 50)} className="card lift spot" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: 150 }}>
                <Image src={PHOTOS[x.photo].src} alt={PHOTOS[x.photo].alt} fill placeholder="blur" sizes="(max-width: 700px) 100vw, 360px" style={{ objectFit: 'cover', objectPosition: PHOTOS[x.photo].pos }} />
              </div>
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{x.name}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: '23px', color: '#4B463D' }}>{x.desc}</p>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#0B7282', display: 'inline-flex', gap: 6, alignItems: 'center' }}>Learn more <Arrow /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
