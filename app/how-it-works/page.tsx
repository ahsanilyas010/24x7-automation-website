import Link from 'next/link';
import { CtaBand, PageHero, SectionHead, Arrow, BookDemoButton } from '@/components/ui';
import { HowSteps } from '@/components/sections';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'How it works: set up in minutes',
  description: 'Connect your channels, provide your business information and control your conversations. 24x7 Automation sorts, drafts and prioritises every message so you only step in when needed.',
  path: '/how-it-works',
});

const DAY = [
  { t: 'Overnight', d: 'Messages arrive on WhatsApp, email, SMS, Facebook, Instagram and LinkedIn. Each one is filed into its own folder, and a reply is drafted from your own terms and documents. Nothing buzzes your phone.' },
  { t: 'When you are ready', d: 'Open the dashboard and see one day at a time. Needs you shows only the decisions that are really yours, with the drafted answer beside each one.' },
  { t: 'One tap each', d: 'Every conversation has four actions: Done, Delegate, Follow up and Remind me. Each is recorded on the day you took it, so you always know what is left.' },
  { t: 'Follow ups that happen', d: 'Quotes and enquiries that go quiet are chased on schedule, in your wording, and moved through your industry stages automatically.' },
];

export default function Page() {
  return (
    <>
      <PageHero trail={[{ name: 'How it works', path: '/how-it-works' }]} eyebrow="How it works" title="Set up in minutes. Leave your conversations to us." lead="24x7 Automation connects every channel you already use into one place, learns from your own business information and takes care of the conversations, so you can get on with the work.">
        <BookDemoButton large />
        <Link href="/channels" className="btn btn-secondary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>See supported channels</Link>
      </PageHero>
      <section className="wrap" style={{ paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 48 }}>
        <SectionHead eyebrow="Three steps" title="From connected to in control" />
        <HowSteps />
      </section>
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 'var(--sec-md)', paddingBottom: 'var(--sec-md)', display: 'flex', flexDirection: 'column', gap: 48 }}>
          <SectionHead eyebrow="A day with 24x7" title="Quiet notifications. Clear decisions." lead="The goal is fewer interruptions, not more alerts. Instead of seven pings from seven apps, you get one calm place to check." />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 24 }}>
            {DAY.map((x, i) => (
              <div key={x.t} data-reveal={String(i * 100)} style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 18, borderTop: '2px solid #17150F' }}>
                <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{x.t}</h3>
                <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{x.d}</p>
              </div>
            ))}
          </div>
          <Link href="/security" style={{ fontSize: 16, fontWeight: 600, color: '#0B7282', display: 'inline-flex', gap: 6, alignItems: 'center', minHeight: 44 }}>You stay in control of every reply <Arrow /></Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
