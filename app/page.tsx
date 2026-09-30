import { Fragment } from 'react';
import type React from 'react';
import HeroStream from '@/components/HeroStream';
import { DemoForm, Faq, Industries, RevealController, UseCases } from '@/components/Interactive';
import { IND } from '@/components/data';
import { CountUp, HeroField, PageEffects } from '@/components/Effects';
import OnTheJob from '@/components/OnTheJob';
import Image from 'next/image';
import flatlayImg from '@/public/images/inbox-flatlay.webp';
import approveImg from '@/public/images/approve.webp';

/** Splits a heading into words that rise into view when their section is revealed. */
function Split({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className="split" aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}><span className="w" aria-hidden="true"><span style={{ ['--i' as string]: i + delay }}>{w}</span></span>{' '}</Fragment>
      ))}
    </span>
  );
}

function Logo({ size, ink, accent, spin }: { size: number; ink: string; accent: string; spin?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" className={spin ? 'logo-spin' : undefined} style={{ display: 'block', flex: 'none' }} aria-hidden="true">
      <circle cx="24" cy="24" r="17" fill="none" stroke={ink} strokeWidth="5" strokeDasharray="89 18" transform="rotate(-50 24 24)" strokeLinecap="round" />
      <circle cx="35.2" cy="11.3" r="3.6" fill={accent} />
      <path d="M24 24V14M24 24l6 4" stroke={ink} strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M5 12h14M12 5l7 7-7 7" /></svg>
);

const channelIcon = (d: string | React.ReactNode, stroke: string) => (
  <svg width="24" height="24" viewBox="0 0 24 24" style={{ fill: 'none', stroke, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}>{typeof d === 'string' ? <path d={d} /> : d}</svg>
);

const STEPS = [
  { n: '01', bar: '#17150F', t: 'Connect your channels', d: 'Link WhatsApp Business, your email inboxes and an SMS number. Import your existing contacts from a CSV file.' },
  { n: '02', bar: '#0B7282', t: 'Teach it your business', d: 'Upload your terms, prices and FAQs. Pick your industry and the stages fill in for you. Rename any of them in Settings.' },
  { n: '03', bar: '#3B6E2A', t: 'Step in when it needs you', d: 'Needs you shows one day at a time. Each item takes one tap: Done, Delegate, Follow up or Remind me.' },
];

const CHANNELS = [
  { name: 'WhatsApp', c: '#0F7A45', bg: '#E3F4EA', icon: channelIcon('M7.9 20A9 9 0 1 0 4 16.1L2 22Z', '#0F7A45'), d: 'Where most customers already are. Photos and documents land in the same thread as the reply.' },
  { name: 'Email', c: '#2457C5', bg: '#E7EEFB', icon: channelIcon(<><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-10 6L2 7" /></>, '#2457C5'), d: 'Connect more than one inbox. Complaints and quote requests are picked out and handled first.' },
  { name: 'SMS', c: '#7A4A9A', bg: '#F2EAF7', icon: channelIcon('M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z', '#7A4A9A'), d: 'For customers who text. Reminders and confirmations go out from the same number every time.' },
];

const STORIES = [
  { where: 'Construction · Leeds', t: 'A builder who stopped losing evening enquiries', d: 'Most quote requests came in on WhatsApp after 7pm, when the team was off site. The AI now replies straight away and books the site visit from the chat.', stat: 2, pre: '', suf: ' min', statL: 'typical first reply, day or night', q: 'I open Needs you with my coffee and there are four things to decide. That is it.' },
  { where: 'Dental clinic · Bristol', t: 'A front desk that rebooks by text', d: 'Patients moving appointments used to mean phone tag. Now they text, the AI offers open slots, and the edited reply is saved as a template for next time.', stat: 3, pre: '', suf: ' of 4', statL: 'rebookings handled without staff', q: 'Reception answers the phone for people who need us, not for diary changes.' },
  { where: 'Plumbing and heating · Manchester', t: 'Calm complaint replies, backed by the terms', d: 'Disputes over callout fees took hours of back and forth. The AI drafts a reply from the company terms and shows the clause it used, ready to approve.', stat: 1, pre: '', suf: ' tap', statL: 'to check the clause behind a reply', q: 'I can see exactly which part of our terms it quoted before anything goes out.' },
];

const SECURITY = [
  { t: 'Shadow mode', d: 'The AI drafts and you approve. Switch to full replies when you are ready.' },
  { t: 'Answers from your sources', d: 'Replies are drawn from the terms and documents you upload, with the clause shown.' },
  { t: 'Full audit log', d: 'Every message, edit and action is recorded by day, with who did it.' },
  { t: 'Pause at any time', d: 'One switch stops the AI across all channels. Messages keep arriving in the inbox.' },
];

const PLANS = [
  { name: 'Solo', price: 49, feats: ['1 user', 'WhatsApp and email', 'AI replies and Shadow mode', 'Needs you and Inbox'] },
  { name: 'Team', price: 129, feats: ['Up to 5 users', 'WhatsApp, email and SMS', 'Delegate and follow ups', 'Saved templates and CSV import'], featured: true },
  { name: 'Business', price: 299, feats: ['Up to 15 users', 'Several accounts per channel', 'Custom stages and audit export', 'Priority support'] },
];

export default function Home() {
  const marquee = [...IND, ...IND].map((x) => x.name);
  return (
    <div className="page">
      <RevealController />
      <PageEffects />

      <header className="site-header">
        <div className="wrap" style={{ minHeight: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }} aria-label="24x7 Automation home">
            <Logo size={34} ink="#17150F" accent="#0B7282" spin />
            <span style={{ fontSize: 18, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}><span style={{ fontWeight: 700 }}>24x7</span><span style={{ fontWeight: 500, color: '#4B463D' }}> automation</span></span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: 24, fontSize: 15, fontWeight: 500, flexWrap: 'wrap', justifyContent: 'flex-end', padding: '8px 0' }}>
            <a href="#how" className="nav-link">How it works</a>
            <a href="#industries" className="nav-link">Industries</a>
            <a href="#usecases" className="nav-link">Use cases</a>
            <a href="#stories" className="nav-link">Case studies</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#demo" data-magnetic className="btn btn-primary" style={{ height: 40, padding: '0 16px' }}>Book a demo</a>
          </nav>
        </div>
      </header>

      <main>
        <div style={{ position: 'relative', overflow: 'hidden' }}>
        <HeroField />
        <section id="top" className="wrap" style={{ position: 'relative', zIndex: 1, paddingTop: 72, paddingBottom: 88, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,460px),1fr))', gap: 56, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <span data-reveal="0" style={{ display: 'inline-flex', alignSelf: 'flex-start', alignItems: 'center', gap: 8, height: 30, padding: '0 12px', borderRadius: 999, background: '#E2F2F4', color: '#0B7282', fontSize: 14, fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#0B7282', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z" /></svg>
              AI front desk for UK small businesses
            </span>
            <h1 className="hero-h1" style={{ margin: 0, fontSize: 'clamp(44px,6vw,76px)', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 700, textWrap: 'balance' }}><Split text="Every enquiry answered, day and night." delay={2} /></h1>
            <p data-reveal="160" style={{ margin: 0, fontSize: 20, lineHeight: '30px', color: '#4B463D', maxWidth: 520, textWrap: 'pretty' }}>24x7 Automation brings WhatsApp, email and SMS into one inbox, replies in your voice, and drafts answers from your own business terms. You only step in when a decision needs you.</p>
            <div data-reveal="240" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#demo" data-magnetic className="btn btn-primary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>Book a demo <Arrow /></a>
              <a href="#how" className="btn btn-secondary" style={{ height: 52, padding: '0 22px', fontSize: 17 }}>See how it works</a>
            </div>
            <div data-reveal="320" style={{ display: 'flex', gap: 20, flexWrap: 'wrap', fontSize: 15, color: '#6D675C' }}>
              {[['WhatsApp', '#0F7A45'], ['Email', '#2457C5'], ['SMS', '#7A4A9A']].map(([l, c]) => (
                <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: c }} />{l}</span>
              ))}
            </div>
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

        <section id="how" className="wrap" style={{ paddingTop: 112, paddingBottom: 96, display: 'flex', flexDirection: 'column', gap: 56 }}>
          <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
            <span className="eyebrow">How it works</span>
            <h2 className="h2"><Split text="Set up in an afternoon. Runs every hour after that." /></h2>
          </div>
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
        </section>

        <section id="channels" className="wrap" style={{ paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48, alignItems: 'start' }}>
          <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <span className="eyebrow">Channels</span>
            <h2 className="h2"><Split text="Three channels. One list." /></h2>
            <p className="lead" style={{ maxWidth: 440 }}>Each channel keeps its own colour everywhere in the app, so you always know where a customer wrote from and where the reply will go.</p>
            <div className="photo img-reveal" data-reveal="120" style={{ aspectRatio: '4 / 3', marginTop: 12 }}>
              <div data-parallax="0.06" className="photo-inner">
                <Image src={flatlayImg} alt="Phone showing a unified inbox on a wooden desk beside a coffee and a notebook" fill placeholder="blur" sizes="(max-width: 800px) 100vw, 560px" style={{ objectFit: 'cover', objectPosition: '45% 45%' }} />
              </div>
              <span className="photo-chip"><span style={{ width: 8, height: 8, borderRadius: 999, background: '#0B7282' }} />Morning check: 4 things need you</span>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {CHANNELS.map((c, i) => (
              <div key={c.name} data-reveal={String(i * 100)} className="card lift spot" style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: 22 }}>
                <span style={{ width: 48, height: 48, borderRadius: 10, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>{c.icon}</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: c.c }}>{c.name}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{c.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="industries" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
          <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
              <span className="eyebrow">Industries</span>
              <h2 className="h2"><Split text="Built around how your trade actually works." /></h2>
              <p className="lead">Choose your industry and the stages, wording and follow ups match it. Pick one below to see it run.</p>
            </div>
            <Industries />
          </div>
        </section>

        <section id="usecases" style={{ background: '#12110E', color: '#EEEAE2' }}>
          <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
            <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 760 }}>
              <span className="eyebrow" style={{ color: '#62C6D3' }}>Use cases</span>
              <h2 className="h2" style={{ color: '#EEEAE2' }}><Split text="What it handles while you are on the job." /></h2>
            </div>
            <UseCases />
          </div>
        </section>

        <section id="stories" className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
              <span className="eyebrow">Case studies</span>
              <h2 className="h2"><Split text="Small teams, answered faster." /></h2>
            </div>
            <span className="sample-tag">Sample stories for layout. Real customers to follow.</span>
          </div>
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
        </section>

        <section id="security" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
          <div className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,340px),1fr))', gap: 48 }}>
            <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <span className="eyebrow">Security and data</span>
              <h2 className="h2"><Split text="You stay in control of every reply." /></h2>
              <div className="photo img-reveal" data-reveal="120" style={{ aspectRatio: '16 / 10', marginTop: 12 }}>
                <div data-parallax="0.06" className="photo-inner">
                  <Image src={approveImg} alt="Hands holding a phone and tapping Approve on a request" fill placeholder="blur" sizes="(max-width: 800px) 100vw, 560px" style={{ objectFit: 'cover', objectPosition: '55% 50%' }} />
                </div>
                <span className="photo-chip"><svg width="14" height="14" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#0B7282', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path d="M20 6 9 17l-5-5" /></svg>Shadow mode: nothing sends until you approve</span>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '28px 32px' }}>
              {SECURITY.map((s, i) => (
                <div key={s.t} data-reveal={String(i * 80)} style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 18, borderTop: '2px solid #17150F' }}>
                  <h3 style={{ margin: 0, fontSize: 19, fontWeight: 700 }}>{s.t}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: '24px', color: '#4B463D' }}>{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'flex', flexDirection: 'column', gap: 48 }}>
          <div data-reveal="0" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 720 }}>
              <span className="eyebrow">Pricing</span>
              <h2 className="h2"><Split text="Monthly, by Direct Debit." /></h2>
            </div>
            <span className="sample-tag">Indicative prices, to be confirmed</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,300px),1fr))', gap: 24, alignItems: 'stretch' }}>
            {PLANS.map((p, i) => {
              const f = p.featured;
              return (
                <div key={p.name} data-reveal={String(i * 120)} className={`spot tilt${f ? ' spot-dark' : ''}`} data-tilt style={{ display: 'flex', flexDirection: 'column', gap: 22, padding: 30, borderRadius: 14, background: f ? '#17150F' : '#FFFFFF', color: f ? '#EEEAE2' : undefined, border: `1px solid ${f ? '#17150F' : '#E0DBD1'}` }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                    <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: f ? '#FFFFFF' : undefined }}>{p.name}</h3>
                    {f ? <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 999, background: '#12303A', color: '#62C6D3', fontSize: 13, fontWeight: 600 }}>Most chosen</span> : null}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ fontSize: 52, lineHeight: 1, fontWeight: 700, letterSpacing: '-0.03em', color: f ? '#FFFFFF' : undefined, fontVariantNumeric: 'tabular-nums' }}><CountUp to={p.price} prefix="£" /></span>
                    <span style={{ fontSize: 16, color: f ? '#A29B8F' : '#6D675C' }}>per month + VAT</span>
                  </div>
                  <div className="checks" style={{ color: f ? '#CBC5BA' : '#4B463D', ['--tick' as string]: f ? '#93C47F' : '#3B6E2A' }}>
                    {p.feats.map((x) => <span key={x}>{x}</span>)}
                  </div>
                  <a href="#demo" className={`btn ${f ? 'btn-light' : 'btn-secondary'}`} style={{ height: 48, fontSize: 16 }}>Book a demo</a>
                </div>
              );
            })}
          </div>
          <p data-reveal="0" style={{ margin: 0, fontSize: 15, lineHeight: '22px', color: '#6D675C', maxWidth: 720 }}>If a payment fails we tell you straight away and try again. You see the full timeline before any change to your account.</p>
        </section>

        <section id="faq" style={{ background: '#FFFFFF', borderTop: '1px solid #E0DBD1', borderBottom: '1px solid #E0DBD1' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', padding: '112px 24px', display: 'flex', flexDirection: 'column', gap: 40 }}>
            <h2 data-reveal="0" className="h2"><Split text="Questions" /></h2>
            <Faq />
          </div>
        </section>

        <section id="demo" className="wrap" style={{ paddingTop: 112, paddingBottom: 112, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 56, alignItems: 'start' }}>
          <div data-reveal="0" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.02, letterSpacing: '-0.035em', fontWeight: 700, textWrap: 'balance' }}><Split text="See it answer your own enquiries." /></h2>
            <p style={{ margin: 0, fontSize: 19, lineHeight: '29px', color: '#4B463D', maxWidth: 460, textWrap: 'pretty' }}>A 20 minute call. We set it up with your industry stages and a few of your real questions, so you see replies in your own words.</p>
          </div>
          <div data-reveal="120" style={{ padding: 32, borderRadius: 14, background: '#FFFFFF', border: '1px solid #E0DBD1', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)' }}>
            <DemoForm />
          </div>
        </section>
      </main>

      <footer style={{ background: '#12110E', color: '#A29B8F' }}>
        <div className="wrap" style={{ paddingTop: 56, paddingBottom: 56, display: 'flex', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Logo size={30} ink="#EEEAE2" accent="#62C6D3" />
              <span style={{ fontSize: 17, color: '#EEEAE2' }}><span style={{ fontWeight: 700 }}>24x7</span><span style={{ fontWeight: 500, color: '#CBC5BA' }}> automation</span></span>
            </div>
            <span style={{ fontSize: 14 }}>Made for UK small businesses.</span>
          </div>
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', fontSize: 15 }}>
            {[['#how', 'How it works'], ['#industries', 'Industries'], ['#pricing', 'Pricing'], ['#faq', 'Questions'], ['#demo', 'Book a demo']].map(([h, l]) => (
              <a key={h} href={h} style={{ color: '#CBC5BA' }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
