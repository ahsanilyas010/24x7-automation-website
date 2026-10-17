import { CtaBand, PageHero, SectionHead, BookDemoButton } from '@/components/ui';
import { SecurityGrid } from '@/components/sections';
import ApprovalDemo from '@/components/ApprovalDemo';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Security and control: nothing goes out without your say',
  description: 'Shadow mode, replies drawn from your own documents, a full audit log and a pause switch. You decide what 24x7 Automation sends on your behalf.',
  path: '/security',
});

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'Security and control', path: '/security' }]} eyebrow="Security and control" title="Nothing goes out without your say." lead="The AI prepares every reply, on every channel. You decide what is sent from one place, and you can see exactly where each answer came from and who did what.">
        <BookDemoButton large />
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 48, alignItems: 'start' }}>
        <div data-reveal="0"><ApprovalDemo /></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <SecurityGrid />
        </div>
      </section>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 }}>
          <SectionHead eyebrow="Complaints" title="Specific answers, not generic ones." />
          <div className="prose" data-reveal="100">
            <p>Complaints are never sent automatically. They are flagged, and the AI drafts a reply from your own terms and conditions and supporting documents, so the answer addresses the real issue.</p>
            <p>Each draft shows the clause it used. You can approve it, edit it or take over entirely, and every edit can be saved as a template for next time.</p>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
