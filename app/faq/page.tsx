import Link from 'next/link';
import { CtaBand, PageHero, JsonLd } from '@/components/ui';
import { Faq } from '@/components/Interactive';
import { FAQ } from '@/components/data';
import { faqLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Questions about 24x7 Automation',
  description: 'Answers about channels, multiple accounts, notifications, complaints, the two week trial, tailored pricing and custom automation.',
  path: '/faq',
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQ)} />
      <PageHero trail={[{ name: 'Questions', path: '/faq' }]} eyebrow="Questions" title="Everything you need to know." lead="How 24x7 Automation manages multiple channels in one place, what it connects to, how it is priced and how you stay in control." />
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--sec-sm) 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <Faq items={FAQ} />
          <p style={{ margin: 0, fontSize: 17, color: '#4B463D' }}>Still have a question? <Link href="/book-a-demo" style={{ color: '#0B7282', fontWeight: 600 }}>Book a demo</Link> and ask us directly.</p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
