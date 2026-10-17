import { CtaBand, PageHero, SectionHead, BookDemoButton, JsonLd } from '@/components/ui';
import { TailoredPricing } from '@/components/sections';
import { Faq } from '@/components/Interactive';
import { FAQ_PRICING } from '@/components/data';
import { faqLd, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Pricing: tailored plans with a two week trial',
  description: 'Every business gets one fixed price tailored to its channels, volume and team. Start with a two week trial, then pay once for the year.',
  path: '/pricing',
});

export default function Page() {
  return (
    <>
      <JsonLd data={faqLd(FAQ_PRICING)} />
      <PageHero trail={[{ name: 'Pricing', path: '/pricing' }]} eyebrow="Pricing" title="Tailored to your business. One fixed price." lead="Every business connects a different mix of channels and handles a different volume of conversations, so we agree one plan around yours. You always know what you will pay.">
        <BookDemoButton large label="Get a tailored quote" />
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)' }}><TailoredPricing /></section>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 'var(--sec-md) 24px', display: 'flex', flexDirection: 'column', gap: 32 }}>
          <SectionHead title="Pricing questions" />
          <Faq items={FAQ_PRICING} />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
