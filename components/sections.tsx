import Link from 'next/link';
import { CH, CH_ORDER, CHANNEL_INFO, CUSTOM_INDUSTRIES } from './data';
import { CountUp } from './Effects';
import { DemoForm } from './Interactive';
import { Icon } from './motion';
import { Arrow, JsonLd, SectionHead, Split } from './ui';
import { SITE } from '@/lib/site';
import { abs } from '@/lib/seo';

export const STEPS = [
  { n: '01', bar: '#17150F', t: 'Connect all your channels in one place', d: 'Link every WhatsApp number, email inbox, SMS number, Facebook, Instagram and LinkedIn account to a single dashboard. Import your existing contacts from a CSV file.' },
  { n: '02', bar: '#0B7282', t: 'Provide your business information', d: 'Upload your terms, prices, FAQs and documents. Pick your industry and the stages fill in for you. Rename any of them in Settings.' },
  { n: '03', bar: '#3B6E2A', t: 'Control your conversations', d: 'Choose how you want to talk to your customers across every channel, then step in only when something needs you. Each item takes one tap: Done, Delegate, Follow up or Remind me.' },
];

export const STORIES = [
  { where: 'Construction · Leeds', t: 'A builder who stopped losing evening enquiries', d: 'Most quote requests came in on WhatsApp after 7pm, when the team was off site. Replies are now drafted straight away and the site visit is booked from the chat.', stat: 2, pre: '', suf: ' min', statL: 'typical first reply, day or night', q: 'I open Needs you with my coffee and there are four things to decide. That is it.' },
  { where: 'Dental clinic · Bristol', t: 'A front desk that rebooks by text', d: 'Patients moving appointments used to mean phone tag. Now they text, open slots are offered, and the edited reply is saved as a template for next time.', stat: 3, pre: '', suf: ' of 4', statL: 'rebookings handled without staff', q: 'Reception answers the phone for people who need us, not for diary changes.' },
  { where: 'Plumbing and heating · Manchester', t: 'Calm complaint replies, backed by the terms', d: 'Disputes over callout fees took hours of back and forth. Each complaint now gets a draft built from the company terms, with the clause shown, ready to approve.', stat: 1, pre: '', suf: ' tap', statL: 'to check the clause behind a reply', q: 'I can see exactly which part of our terms it quoted before anything goes out.' },
];

export const SECURITY = [
  { t: 'Shadow mode', d: 'The AI drafts and you approve. Switch to full replies when you are ready.' },
  { t: 'Answers from your sources', d: 'Replies are drawn from the terms and documents you upload, with the clause shown.' },
  { t: 'Full audit log', d: 'Every message, edit and action is recorded by day, with who did it.' },
  { t: 'Pause at any time', d: 'One switch stops the AI across all channels. Messages keep arriving in the dashboard.' },
];

export function HowSteps() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24 }}>
      {STEPS.map((s, i) => (
        <div key={s.n} data-reveal={String(i * 140)} className="card spot lift" style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: 28 }}>
          <span style={{ fontSize: 64, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums' }}>{s.n}</span>
          <div data-draw="1" style={{ height: 3, borderRadius: 2, background: s.bar }} />
          <h3 style={{ margin: 0, fontSize: 24, lineHeight: '30px', fontWeight: 700, letterSpacing: '-0.01em' }}>{s.t}</h3>
          <p style={{ margin: 0, fontSize: 17, lineHeight: '26px', color: '#4B463D', textWrap: 'pretty' }}>{s.d}</p>
        </div>
      ))}
    </div>
  );
}

export function ChannelCards({ long }: { long?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: long ? 'repeat(auto-fit,minmax(min(100%,340px),1fr))' : '1fr', gap: 14 }}>
      {CH_ORDER.map((k, i) => {
        const c = CH[k];
        return (
          <div key={k} data-reveal={String(i * 80)} className="card lift spot" style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: long ? 26 : 20 }}>
            <span style={{ width: 48, height: 48, borderRadius: 10, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon k={k} s={24} c={c.c} /></span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: c.c }}>{c.l}</h3>
              <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{long ? CHANNEL_INFO[k].long : CHANNEL_INFO[k].d}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function StoriesGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,320px),1fr))', gap: 24 }}>
      {STORIES.map((s, i) => (
        <article key={s.t} data-reveal={String(i * 120)} className="card lift lift-4 spot" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 28, borderRadius: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#6D675C' }}>{s.where}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: '#9A5B00' }}>Sample</span>
          </div>
          <h3 style={{ margin: 0, fontSize: 24, lineHeight: '30px', fontWeight: 700, letterSpacing: '-0.01em' }}>{s.t}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D', textWrap: 'pretty' }}>{s.d}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingTop: 18, borderTop: '1px solid #E0DBD1' }}>
            <span style={{ fontSize: 44, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}><CountUp to={s.stat} prefix={s.pre} suffix={s.suf} ms={900} /></span>
            <span style={{ fontSize: 15, color: '#6D675C' }}>{s.statL}</span>
          </div>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', fontStyle: 'italic', color: '#17150F' }}>&ldquo;{s.q}&rdquo;</p>
        </article>
      ))}
    </div>
  );
}

export function SecurityGrid() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '28px 32px' }}>
      {SECURITY.map((s, i) => (
        <div key={s.t} data-reveal={String(i * 80)} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 18, borderTop: '2px solid #17150F' }}>
          <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>{s.t}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{s.d}</p>
        </div>
      ))}
    </div>
  );
}

const FACTORS = [
  { t: 'The channels you use', d: 'WhatsApp, email, SMS, Facebook, Instagram and LinkedIn, including how many accounts and numbers you connect.' },
  { t: 'Your conversation volume', d: 'A quiet studio and a busy contractor need different capacity. We size the plan to your real traffic.' },
  { t: 'Your team and industry', d: 'How many people step in, and which stages, templates and documents your industry needs from day one.' },
];

const TRIAL = [
  { n: '1', t: 'Book a demo', d: 'We set it up with your industry stages and a few of your real questions.' },
  { n: '2', t: 'Two week trial', d: 'Try it on your own conversations before you pay anything.' },
  { n: '3', t: 'One annual payment', d: 'If it works for you, you pay once for the year. No monthly payments to track.' },
];

/** Replaces the fixed monthly plans: every business gets one fixed, tailored price. */
export function TailoredPricing() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20 }}>
        {FACTORS.map((f, i) => (
          <div key={f.t} data-reveal={String(i * 100)} className="card lift spot" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{f.t}</h3>
            <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{f.d}</p>
          </div>
        ))}
      </div>
      <div data-reveal="0" style={{ borderRadius: 14, background: '#17150F', color: '#EEEAE2', padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h3 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>Contact us for a plan tailored to your business</h3>
          <p style={{ margin: 0, fontSize: 17, lineHeight: '26px', color: '#CBC5BA', maxWidth: 680 }}>You get one fixed price, agreed up front, so you always know what you will pay. There is no bill that goes up and down with usage.</p>
        </div>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,220px),1fr))', gap: 20 }}>
          {TRIAL.map((t) => (
            <li key={t.n} style={{ display: 'flex', gap: 14 }}>
              <span style={{ width: 32, height: 32, borderRadius: 999, background: '#12303A', color: '#62C6D3', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flex: 'none' }}>{t.n}</span>
              <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><strong style={{ color: '#FFFFFF', fontSize: 17 }}>{t.t}</strong><span style={{ fontSize: 15, lineHeight: '22px', color: '#CBC5BA' }}>{t.d}</span></span>
            </li>
          ))}
        </ol>
        <div><Link href="/book-a-demo" data-magnetic className="btn btn-light" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>Get a tailored quote <Arrow /></Link></div>
      </div>
    </div>
  );
}

const CUSTOM_STEPS = [
  { t: 'Tell us the bottleneck', d: 'Whatever your industry, tell us where operations slow down or where work gets repeated by hand.' },
  { t: 'We design the solution', d: 'We map your process and come back with a clear proposal and a working demo of how it would run.' },
  { t: 'You approve, with a price', d: 'You see the cost before anything is built. Approve it only when you are happy.' },
  { t: 'We build and run it', d: 'Once approved, we build the automation around your workflow and support it as it grows.' },
];

export function CustomSteps() {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))', gap: 20 }}>
      {CUSTOM_STEPS.map((s, i) => (
        <li key={s.t} data-reveal={String(i * 100)} className="card lift spot" style={{ padding: 26, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={{ fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', color: '#0B7282', fontVariantNumeric: 'tabular-nums' }}>{String(i + 1).padStart(2, '0')}</span>
          <h3 style={{ margin: 0, fontSize: 21, fontWeight: 700 }}>{s.t}</h3>
          <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{s.d}</p>
        </li>
      ))}
    </ol>
  );
}

export function CustomIndustries() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,260px),1fr))', gap: 16 }}>
      {CUSTOM_INDUSTRIES.map((x, i) => (
        <div key={x.name} data-reveal={String(i * 60)} className="card lift spot" style={{ padding: 22, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{x.name}</h3>
          <p style={{ margin: 0, fontSize: 15, lineHeight: '23px', color: '#4B463D' }}>{x.d}</p>
        </div>
      ))}
    </div>
  );
}

/** Optional one minute demo video. Renders only when NEXT_PUBLIC_DEMO_VIDEO_URL is set. */
export function DemoVideo() {
  if (!SITE.demoVideo) return null;
  return (
    <section className="wrap" style={{ paddingTop: 'var(--sec-md)' }} aria-label="Product demo video">
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'VideoObject', name: '24x7 Automation in one minute', description: 'How emails, WhatsApp and social messages arrive, are sorted into folders and replied to.', contentUrl: SITE.demoVideo, uploadDate: '2026-10-16', thumbnailUrl: abs('/opengraph-image') }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <SectionHead eyebrow="See it in action" title="One minute. Every conversation, handled." lead="Watch how emails and WhatsApp messages arrive, are filed into the right folder and answered, before you speak to us." />
        <video controls preload="metadata" playsInline src={SITE.demoVideo} style={{ width: '100%', borderRadius: 16, border: '1px solid #E0DBD1', background: '#17150F' }} />
      </div>
    </section>
  );
}

/** Heading plus lead form, used on the home page and the Book a demo page. */
export function LeadSection({ h1 }: { h1?: boolean }) {
  const title = 'Call us now to get everything connected and boost your sales and service.';
  const Tag = h1 ? 'h1' : 'h2';
  return (
    <section id="demo" className="wrap" style={{ paddingTop: h1 ? 'var(--sec-sm)' : 'var(--sec-lg)', paddingBottom: 'var(--sec-lg)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 56, alignItems: 'start' }}>
      <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Tag style={{ margin: 0, fontSize: 'clamp(38px,5vw,60px)', lineHeight: 1.04, letterSpacing: '-0.035em', fontWeight: 700, textWrap: 'balance' }}><Split text={title} /></Tag>
        <p style={{ margin: 0, fontSize: 19, lineHeight: '29px', color: '#4B463D', maxWidth: 460, textWrap: 'pretty' }}>A 20 minute call. We set it up with your industry stages and a few of your real questions, so you see replies in your own words.</p>
        <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10, fontSize: 17, color: '#4B463D' }}>
          {['Two week trial before you pay anything', 'One fixed price tailored to your business', 'Bespoke automation if your bottleneck is elsewhere'].map((x) => <li key={x} style={{ display: 'flex', gap: 10 }}><span style={{ color: '#3B6E2A', fontWeight: 700 }}>&#10003;</span>{x}</li>)}
        </ul>
      </div>
      <div data-reveal="120" style={{ padding: 'var(--card-pad)', borderRadius: 14, background: '#FFFFFF', border: '1px solid #E0DBD1', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)' }}>
        <DemoForm />
      </div>
    </section>
  );
}
