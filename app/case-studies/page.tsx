import { CtaBand, PageHero, BookDemoButton } from '@/components/ui';
import { StoriesGrid } from '@/components/sections';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Case studies: teams answered faster',
  description: 'Sample stories showing how a builder, a dental clinic and a plumbing firm answer customers faster with 24x7 Automation. Real customer stories to follow.',
  path: '/case-studies',
});

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'Case studies', path: '/case-studies' }]} eyebrow="Case studies" title="Teams answered faster." lead="Three sample stories that show how teams in different trades manage every channel in one place with 24x7 Automation. Real customer stories will replace these as they are published.">
        <span className="sample-tag">Sample stories for layout. Real customers to follow.</span>
        <BookDemoButton large />
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)' }}><StoriesGrid /></section>
      <CtaBand />
    </>
  );
}
