import { LeadSection } from '@/components/sections';
import { Breadcrumbs } from '@/components/ui';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Book a demo',
  description: 'Book a 20 minute demo. We set up 24x7 Automation with your industry stages and a few of your real questions, so you see replies in your own words.',
  path: '/book-a-demo',
});

export default function Page() {
  return (
    <>
      <div className="wrap" style={{ paddingTop: 40 }}><Breadcrumbs trail={[{ name: 'Book a demo', path: '/book-a-demo' }]} /></div>
      <LeadSection h1 />
    </>
  );
}
