import { CtaBand, PageHero, SectionHead, BookDemoButton, JsonLd } from '@/components/ui';
import { CustomIndustries, CustomSteps } from '@/components/sections';
import { abs, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = pageMetadata({
  title: 'Custom automation: solutions built around your business',
  description: 'Tell us where your operations slow down. We design a tailored automation solution, show you the price and build it once you approve. For distributors, importers, wholesalers, retailers, agencies and manufacturers.',
  path: '/custom-automation',
});

export default function Page() {
  return (
    <>
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: 'Custom business automation', serviceType: 'Business process automation', description: 'Tailored automation and software solutions designed around a business\'s own operational bottlenecks.', provider: { '@type': 'Organization', name: SITE.name, url: SITE.url }, url: abs('/custom-automation') }} />
      <PageHero trail={[{ name: 'Custom automation', path: '/custom-automation' }]} eyebrow="Custom automation" title="Automation built around your business." lead="The AI front desk brings every conversation channel into one place. If the bottleneck in your business is somewhere else, we look at the problem, design a solution with you and build it once you approve.">
        <BookDemoButton large label="Tell us your bottleneck" />
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 40 }}>
        <SectionHead eyebrow="How it works" title="You see the solution before you commit." lead="We do not start with a product and fit your business around it. We start with your operations." />
        <CustomSteps />
      </section>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <SectionHead eyebrow="Who it is for" title="Whatever your industry, your process can be automated." lead="Tell us how your operations run and where the manual work is. These are some of the businesses we design for." />
          <CustomIndustries />
        </div>
      </section>
      <CtaBand title="Tell us where your business is slowed down." text="Describe your operations and your biggest bottleneck on a short call. We come back with a proposed solution and a price." />
    </>
  );
}
