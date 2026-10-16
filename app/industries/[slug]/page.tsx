import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CtaBand, PageHero, SectionHead, BookDemoButton, JsonLd, Arrow } from '@/components/ui';
import { CH, IND, industryBySlug } from '@/components/data';
import { PHOTOS } from '@/components/photos';
import { Pill } from '@/components/motion';
import { abs, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => IND.map((x) => ({ slug: x.slug }));

export async function generateMetadata({ params }: Props) {
  const x = industryBySlug((await params).slug);
  if (!x) return {};
  return pageMetadata({ title: x.h1, description: x.desc, path: `/industries/${x.slug}` });
}

export default async function Page({ params }: Props) {
  const x = industryBySlug((await params).slug);
  if (!x) notFound();
  const c = CH[x.ch], ph = PHOTOS[x.photo];
  const others = IND.filter((o) => o.slug !== x.slug).slice(0, 4);
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: x.h1, description: x.desc, serviceType: 'AI front desk and conversation management', provider: { '@type': 'Organization', name: SITE.name, url: SITE.url }, url: abs(`/industries/${x.slug}`), audience: { '@type': 'BusinessAudience', name: x.name } }} />
      <PageHero trail={[{ name: 'Industries', path: '/industries' }, { name: x.name, path: `/industries/${x.slug}` }]} eyebrow={x.name} title={x.h1} lead={x.intro}>
        <BookDemoButton large />
        <Link href="/industries" className="btn btn-secondary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>All industries</Link>
      </PageHero>

      <section className="wrap" style={{ paddingBottom: 96, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 32, alignItems: 'stretch' }}>
        <div className="photo img-reveal" data-reveal="0" style={{ minHeight: 360 }}>
          <div data-parallax="0.06" className="photo-inner">
            <Image src={ph.src} alt={ph.alt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 600px" style={{ objectFit: 'cover', objectPosition: ph.pos }} />
          </div>
        </div>
        <div data-reveal="120" style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 28, borderRadius: 14, background: '#FFFFFF', border: '1px solid #E0DBD1' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#4B463D' }}>A sample conversation</span>
            <Pill t={c.l} fg={c.c} bg={c.t} icon={x.ch} />
          </div>
          <div style={{ alignSelf: 'flex-start', maxWidth: '88%', padding: '14px 16px', borderRadius: '14px 14px 14px 4px', background: '#F6F4EF', border: '1px solid #E0DBD1', fontSize: 17, lineHeight: '25px' }}>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#6D675C', marginBottom: 4 }}>{x.who}</span>{x.ask}
          </div>
          <div style={{ alignSelf: 'flex-end', maxWidth: '88%', display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 16px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 17, lineHeight: '25px' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#0B7282' }}>Reply drafted for you</span>
            <span>{x.reply}</span>
          </div>
        </div>
      </section>

      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 96, paddingBottom: 96, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionHead title="The problem" />
            <ul className="checks" style={{ margin: 0, padding: 0, listStyle: 'none', ['--tick' as string]: '#9A5B00' }}>{x.pains.map((p) => <li key={p} style={{ display: 'flex', gap: 10, fontSize: 17, lineHeight: '26px' }}><span style={{ color: '#9A5B00', fontWeight: 700 }}>!</span>{p}</li>)}</ul>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SectionHead title="How 24x7 Automation helps" />
            <ul className="checks" style={{ margin: 0, padding: 0, listStyle: 'none' }}>{x.helps.map((p) => <li key={p} style={{ display: 'flex', gap: 10, fontSize: 17, lineHeight: '26px' }}><span style={{ color: '#3B6E2A', fontWeight: 700 }}>&#10003;</span>{p}</li>)}</ul>
          </div>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 96, paddingBottom: 96, display: 'flex', flexDirection: 'column', gap: 32 }}>
        <SectionHead eyebrow="Stages" title={`The stages for ${x.name.toLowerCase()}`} lead="These come ready set up for your industry. Rename, reorder or remove any of them in Settings." />
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {x.stages.map((s, i) => <li key={s} data-reveal={String(i * 60)} style={{ display: 'flex', alignItems: 'center', gap: 10, height: 48, padding: '0 18px', borderRadius: 999, background: '#FFFFFF', border: '1px solid #C9C2B6', fontSize: 16, fontWeight: 600 }}><span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>{s}</li>)}
        </ol>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', paddingTop: 16 }}>
          <span style={{ fontSize: 16, color: '#4B463D' }}>See also:</span>
          {others.map((o) => <Link key={o.slug} href={`/industries/${o.slug}`} style={{ fontSize: 16, fontWeight: 600, color: '#0B7282', display: 'inline-flex', gap: 6, alignItems: 'center' }}>{o.name} <Arrow /></Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
