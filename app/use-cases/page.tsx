import { CtaBand, PageHero, SectionHead, BookDemoButton } from '@/components/ui';
import { UseCases } from '@/components/Interactive';
import { UC, CH } from '@/components/data';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Use cases: after-hours replies, complaints, follow ups and more',
  description: 'See what 24x7 Automation handles while you are on the job: after-hours enquiries, complaint replies from your terms, follow ups, delegation and one-tap actions.',
  path: '/use-cases',
});

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'Use cases', path: '/use-cases' }]} eyebrow="Use cases" title="What it handles while you are on the job." lead="Real conversations from every channel, handled in one place the way you would handle them. Choose a use case to watch it play out, or read through them all below.">
        <BookDemoButton large />
      </PageHero>
      <section style={{ background: '#12110E', color: '#EEEAE2' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)' }}><UseCases /></div>
      </section>
      <section className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <SectionHead eyebrow="All use cases" title="Every conversation, taken care of." />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 20 }}>
          {UC.map((u, i) => (
            <article key={u.title} data-reveal={String(i * 60)} className="card lift spot" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: CH[u.ch].c }}>{CH[u.ch].l}</span>
              <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{u.title}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{u.desc}</p>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
