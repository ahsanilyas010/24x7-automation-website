import Link from 'next/link';
import HeroStream from '@/components/HeroStream';
import { Faq, Industries, UseCases } from '@/components/Interactive';
import { FAQ_HOME, IND } from '@/components/data';
import { HeroField } from '@/components/Effects';
import OnTheJob from '@/components/OnTheJob';
import LiveClock from '@/components/LiveClock';
import DashboardPreview from '@/components/DashboardPreview';
import ApprovalDemo from '@/components/ApprovalDemo';
import { Arrow, JsonLd, SectionHead, Split } from '@/components/ui';
import { ChannelCards, DemoVideo, HowSteps, LeadSection, SecurityGrid, StoriesGrid, TailoredPricing } from '@/components/sections';
import { faqLd, pageMetadata } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata = {
  ...pageMetadata({ title: `${SITE.name}: ${SITE.tagline}`, description: SITE.description, path: '/' }),
  title: { absolute: `${SITE.name}: AI front desk for WhatsApp, email, SMS and social messages` },
};

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE.name,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: SITE.description,
  url: SITE.url,
};

const more = { fontSize: 16, fontWeight: 600, color: '#0B7282', display: 'inline-flex', alignItems: 'center', gap: 6 } as const;

export default function Home() {
  const marquee = [...IND, ...IND].map((x) => x.name);
  return (
    <>
      <JsonLd data={[appLd, faqLd(FAQ_HOME)]} />

      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroField />
        <section id="top" className="wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 56, paddingBottom: 80, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 48, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <span data-reveal="0" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, height: 30, padding: '0 12px', borderRadius: 999, background: '#E2F2F4', color: '#0B7282', fontSize: 14, fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#0B7282', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }} aria-hidden="true"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
              AI front desk for every business
            </span>
            <h1 className="hero-h1" style={{ margin: 0, fontSize: 'clamp(42px,5.6vw,72px)', lineHeight: 1.03, letterSpacing: '-0.035em', fontWeight: 700, textWrap: 'balance' }}><Split text="Every conversation managed. Every reply on time." delay={2} /></h1>
            <p data-reveal="160" style={{ margin: 0, fontSize: 20, lineHeight: '30px', color: '#4B463D', maxWidth: 540, textWrap: 'pretty' }}>24x7 Automation brings all your emails, WhatsApps, SMS and social media conversations into one unified platform, where everything is sorted and taken care of. We help you manage, reply to, sequence and prioritise every message, so you only step in when a decision needs you.</p>
            <div data-reveal="240" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/book-a-demo" data-magnetic className="btn btn-primary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>Book a demo <Arrow /></Link>
              <Link href="/how-it-works" className="btn btn-secondary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>See how it works</Link>
            </div>
            <LiveClock />
          </div>
          <div data-reveal="200" style={{ minWidth: 0 }}><HeroStream /></div>
        </section>
      </div>

      <div style={{ borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1', background: '#FFFFFF', overflow: 'hidden', padding: '18px 0' }} className="marquee-wrap" aria-hidden="true">
        <div className="marquee" style={{ display: 'flex', gap: 48, width: 'max-content', fontSize: 20, fontWeight: 600, color: '#4B463D', whiteSpace: 'nowrap' }}>
          {marquee.map((m, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>{m}<span style={{ width: 6, height: 6, borderRadius: 999, background: '#0B7282' }} /></span>
          ))}
        </div>
      </div>

      <section className="wrap" style={{ paddingTop: 96 }} aria-label="On the job">
        <OnTheJob />
      </section>

      <DemoVideo />

      <section id="how" className="wrap" style={{ paddingTop: 112, paddingBottom: 96, display: 'flex', flexDirection: 'column', gap: 48 }}>
        <SectionHead eyebrow="How it works" title="Set up in minutes. Leave your conversations to us." />
        <HowSteps />
        <Link href="/how-it-works" style={more}>See the full walkthrough <Arrow /></Link>
      </section>

      <section id="channels" className="wrap" style={{ paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">Channels</span>
            <h2 className="h2"><Split text="Multiple channels. One dashboard." /></h2>
            <p className="lead" style={{ maxWidth: 460 }}>Each channel keeps its own colour and its own folder. Messages go straight to the right place, so you always know where a customer wrote from and where the reply will go.</p>
          </div>
          <div data-reveal="120" style={{ marginTop: 12 }}>
            <DashboardPreview caption="Messages are filed by channel. Your phone stays quiet." />
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <ChannelCards />
          <Link href="/channels" style={more}>Explore every channel <Arrow /></Link>
        </div>
      </section>

      <section id="industries" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <SectionHead eyebrow="Industries" title="Built around how your trade actually works." lead="Choose your industry and the stages, wording and follow ups match it. Pick one below to see it run, or watch it change by itself." />
          <Industries />
          <Link href="/industries" style={more}>Browse all industries <Arrow /></Link>
        </div>
      </section>

      <section id="usecases" style={{ background: '#12110E', color: '#EEEAE2' }}>
        <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <SectionHead dark eyebrow="Use cases" title="What it handles while you are on the job." />
          <UseCases />
          <Link href="/use-cases" style={{ ...more, color: '#62C6D3' }}>See every use case <Arrow /></Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 48, alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <SectionHead eyebrow="Beyond the front desk" title="Automation built around your business." lead="Whatever your industry, tell us where operations slow you down. We look at the problem, design a solution, show you the price and build it once you approve." />
          <div data-reveal="160"><Link href="/custom-automation" className="btn btn-secondary" style={{ height: 48, padding: '0 20px', fontSize: 16 }}>Explore custom automation <Arrow /></Link></div>
        </div>
        <ul data-reveal="120" className="checks" style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 18, lineHeight: '26px', gap: 16, color: '#17150F' }}>
          {['Distributors, importers and wholesalers', 'Retailers and agencies', 'Small and auto part manufacturers', 'Any process that is slowed down by manual work'].map((x) => <li key={x} style={{ display: 'flex', gap: 10 }}><span style={{ color: '#3B6E2A', fontWeight: 700 }}>&#10003;</span>{x}</li>)}
        </ul>
      </section>

      <section id="stories" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
              <span className="eyebrow">Case studies</span>
              <h2 className="h2"><Split text="Teams answered faster." /></h2>
            </div>
            <span className="sample-tag">Sample stories for layout. Real customers to follow.</span>
          </div>
          <StoriesGrid />
        </div>
      </section>

      <section id="security" className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">Security and control</span>
            <h2 className="h2"><Split text="Nothing goes out without your say." /></h2>
            <p className="lead">The AI prepares every reply and you decide what is sent. Each draft shows the clause it came from, and one tap approves it.</p>
          </div>
          <div data-reveal="120" style={{ marginTop: 12 }}><ApprovalDemo /></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <SecurityGrid />
          <Link href="/security" style={more}>How control and audit work <Arrow /></Link>
        </div>
      </section>

      <section id="pricing" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
        <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <SectionHead eyebrow="Pricing" title="Tailored to your business. One fixed price." />
          <TailoredPricing />
        </div>
      </section>

      <section id="faq">
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '112px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
          <h2 data-reveal="0" className="h2"><Split text="Questions" /></h2>
          <Faq items={FAQ_HOME} />
          <Link href="/faq" style={more}>Read all questions <Arrow /></Link>
        </div>
      </section>

      <div style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1' }}><LeadSection /></div>
    </>
  );
}
