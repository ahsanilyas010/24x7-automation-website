'use client';

import { FormEvent, useEffect, useState } from 'react';
import { CH, FAQ, IND, UC } from './data';
import Image from 'next/image';
import UseCaseDemo from './UseCaseDemo';
import builderImg from '@/public/images/builder-site.webp';
import plumberImg from '@/public/images/plumber.webp';
import salonImg from '@/public/images/salon.webp';
import dentalImg from '@/public/images/dental.webp';
import realEstateImg from '@/public/images/real-estate.webp';
import legalImg from '@/public/images/legal.webp';
import restaurantImg from '@/public/images/restaurant.webp';
import garageImg from '@/public/images/garage.webp';
import tutorImg from '@/public/images/tutor.webp';
import fitnessImg from '@/public/images/fitness.webp';

const PHOTOS = {
  builder: { src: builderImg, alt: 'Site manager checking an enquiry on his phone on a building site', pos: '50% 30%' },
  plumber: { src: plumberImg, alt: 'Plumber in a customer kitchen showing a confirmed appointment on his phone', pos: '50% 30%' },
  salon: { src: salonImg, alt: 'Salon counter with a phone showing a new booking message beside styling tools', pos: '50% 60%' },
  dental: { src: dentalImg, alt: 'Dental receptionist at the front desk reading a patient text on her phone', pos: '40% 40%' },
  realEstate: { src: realEstateImg, alt: 'Estate agent with keys outside a red-brick terraced house checking a viewing request', pos: '50% 35%' },
  legal: { src: legalImg, alt: 'Accountant at her desk with a laptop and client folder reading an enquiry on her phone', pos: '60% 40%' },
  restaurant: { src: restaurantImg, alt: 'Restaurant manager at the pass checking a group booking message beside the bookings diary', pos: '50% 45%' },
  garage: { src: garageImg, alt: 'Mechanic in a garage bay reading a text with a car raised on the ramp behind him', pos: '50% 40%' },
  tutor: { src: tutorImg, alt: 'Tutor at a kitchen table with workbooks and a laptop replying to a parent', pos: '40% 45%' },
  fitness: { src: fitnessImg, alt: 'Studio owner checking a class enquiry at the front desk of a reformer studio', pos: '40% 45%' },
};
import { Dots, Enter, Icon, reducedMotion } from './motion';

/** Fades sections up as they scroll into view and draws step lines. Everything shows within 1.5s regardless. */
export function RevealController() {
  useEffect(() => {
    const root = document.documentElement;
    if (reducedMotion() || !('IntersectionObserver' in window)) { root.classList.remove('reveal-ready'); return; }
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    els.forEach((el) => el.style.setProperty('--reveal-delay', `${el.dataset.reveal || 0}ms`));
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && show(e.target as HTMLElement)), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    function show(el: HTMLElement) { if (el.dataset.shown) return; el.dataset.shown = '1'; io.unobserve(el); }
    const all = () => els.forEach(show);
    const check = () => { const vh = window.innerHeight || 800; els.forEach((el) => { if (!el.dataset.shown && el.getBoundingClientRect().top < vh - 20) show(el); }); };
    els.forEach((el) => io.observe(el));
    requestAnimationFrame(check);
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('beforeprint', all);
    const safety = setTimeout(all, 1500);
    return () => { io.disconnect(); clearTimeout(safety); window.removeEventListener('scroll', check); window.removeEventListener('beforeprint', all); };
  }, []);
  return null;
}

export function Industries() {
  const [ind, setInd] = useState(0);
  const [step, setStep] = useState(0);
  const [replied, setReplied] = useState(true);
  useEffect(() => {
    const iv = setInterval(() => setStep((s) => s + 1), 1400);
    return () => clearInterval(iv);
  }, []);
  const pick = (i: number) => {
    if (i === ind) return;
    setInd(i); setStep(0);
    if (reducedMotion()) return;
    setReplied(false);
    setTimeout(() => setReplied(true), 1100);
  };
  const cur = IND[ind], c = CH[cur.ch], last = cur.stages.length - 1, act = step % last;

  return (
    <>
      <div data-reveal="80" style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }} role="tablist" aria-label="Industries">
        {IND.map((x, i) => {
          const a = i === ind;
          return (
            <button key={x.name} role="tab" aria-selected={a} onClick={() => pick(i)} className="chip"
              style={{ border: `1px solid ${a ? '#17150F' : '#C9C2B6'}`, background: a ? '#17150F' : '#FFFFFF', color: a ? '#FFFFFF' : '#17150F' }}>
              {x.name}
            </button>
          );
        })}
      </div>
      <div data-reveal="160" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 24 }}>
        <Enter key={ind} from="translateY(12px) scale(.985)" d={350} style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 28, borderRadius: 14, background: '#F6F4EF', border: '1px solid #E0DBD1', minHeight: 300 }}>
          {cur.photo ? (
            <div className="ind-photo">
              <Image src={PHOTOS[cur.photo].src} alt={PHOTOS[cur.photo].alt} fill placeholder="blur" sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover', objectPosition: PHOTOS[cur.photo].pos }} />
            </div>
          ) : null}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#4B463D' }}>{cur.who}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 999, fontSize: 13, fontWeight: 600, background: c.t, color: c.c }}>{c.l}</span>
          </div>
          <div style={{ alignSelf: 'flex-start', maxWidth: '88%', padding: '14px 16px', borderRadius: '14px 14px 14px 4px', background: '#FFFFFF', border: '1px solid #E0DBD1', fontSize: 17, lineHeight: '25px' }}>{cur.ask}</div>
          {replied ? (
            <Enter key="reply" style={{ alignSelf: 'flex-end', maxWidth: '88%', display: 'flex', flexDirection: 'column', gap: 8, padding: '14px 16px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 17, lineHeight: '25px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#0B7282' }}><Icon k="spark" s={14} c="#0B7282" w={2} />AI reply</span>
              <span>{cur.reply}</span>
            </Enter>
          ) : (
            <Enter key="typing" style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 14, fontWeight: 600, color: '#0B7282' }}>
              <Dots />AI is drafting
            </Enter>
          )}
        </Enter>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 28, borderRadius: 14, background: '#17150F', color: '#EEEAE2' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 15, fontWeight: 600, color: '#A29B8F' }}>Stages for {cur.name}</span>
            <span style={{ fontSize: 15, color: '#62C6D3', fontWeight: 600 }}>Now: {cur.stages[act]}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {cur.stages.map((n, i) => {
              const lost = i === last, done = !lost && i < act, isCur = !lost && i === act;
              return (
                <div key={n + i} className={isCur ? 'stage-cur' : undefined} style={{ display: 'flex', alignItems: 'center', gap: 14, height: 48, padding: '0 16px', borderRadius: 10, border: `1px solid ${isCur ? '#62C6D3' : '#34302A'}`, background: isCur ? '#12303A' : done ? '#26231E' : 'transparent', color: isCur ? '#62C6D3' : done ? '#EEEAE2' : lost ? '#6E675E' : '#A29B8F', transition: 'background 250ms ease,border-color 250ms ease,color 250ms ease' }}>
                  <span style={{ width: 24, fontSize: 14, fontWeight: 600, fontVariantNumeric: 'tabular-nums', opacity: 0.7 }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ flex: 1, fontSize: 17, fontWeight: 600 }}>{n}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{isCur ? 'Current' : done ? 'Passed' : lost ? 'Closed' : ''}</span>
                </div>
              );
            })}
          </div>
          <span style={{ fontSize: 14, lineHeight: '20px', color: '#A29B8F' }}>Every stage can be renamed, reordered or removed in Settings.</span>
        </div>
      </div>
    </>
  );
}

export function UseCases() {
  const [uc, setUc] = useState(0);
  const [auto, setAuto] = useState(true);
  const [prog, setProg] = useState(0);
  const choose = (i: number) => { setAuto(false); setUc(i); };
  const advance = () => { if (!auto) return false; setUc((u) => (u + 1) % UC.length); return true; };
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 32, alignItems: 'start' }}>
      <div data-reveal="80" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {UC.map((u, i) => {
          const a = i === uc;
          return (
            <button key={u.title} onClick={() => choose(i)} aria-pressed={a} className="uc-btn" style={{ border: `1px solid ${a ? '#62C6D3' : '#34302A'}`, background: a ? '#1C1A16' : 'transparent' }}>
              {a ? <span className="uc-prog" aria-hidden="true" style={{ transform: `scaleX(${prog})` }} /> : null}
              <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 19, fontWeight: 700 }}>
                <span style={{ fontSize: 14, fontVariantNumeric: 'tabular-nums', color: a ? '#62C6D3' : '#6E675E' }}>{String(i + 1).padStart(2, '0')}</span>{u.title}
              </span>
              <span style={{ fontSize: 16, lineHeight: '24px', color: '#CBC5BA', paddingLeft: 34 }}>{u.desc}</span>
            </button>
          );
        })}
      </div>
      <div data-reveal="160" style={{ minWidth: 0, position: 'sticky', top: 96 }}>
        <UseCaseDemo key={uc} uc={UC[uc]} onProgress={setProg} onDone={advance} />
      </div>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div data-reveal="80" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid #E0DBD1' }}>
      {FAQ.map(([q, a], i) => (
        <div key={q} style={{ borderBottom: '1px solid #E0DBD1' }}>
          <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="faq-btn">
            <span>{q}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ flex: 'none', fill: 'none', stroke: '#4B463D', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', transition: 'transform 250ms ease', transform: open === i ? 'rotate(45deg)' : 'none' }}><path d="M12 5v14M5 12h14" /></svg>
          </button>
          <div className={`faq-a${open === i ? ' open' : ''}`} aria-hidden={open !== i}>
            <div><p style={{ margin: 0, padding: '0 40px 24px 0', fontSize: 17, lineHeight: '26px', color: '#4B463D', textWrap: 'pretty' }}>{a}</p></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DemoForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const submit = (e: FormEvent) => { e.preventDefault(); setSending(true); setTimeout(() => setSent(true), reducedMotion() ? 0 : 900); };
  if (sent) {
    return (
      <Enter from="translateY(8px)" d={350} style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start', padding: '24px 0' }}>
        <span style={{ width: 56, height: 56, borderRadius: 999, background: '#EAF2E4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#3B6E2A', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path className="draw-check" d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3 style={{ margin: 0, fontSize: 26, fontWeight: 700 }}>Thanks, request received.</h3>
        <p style={{ margin: 0, fontSize: 17, lineHeight: '26px', color: '#4B463D' }} role="status">We will be in touch within one working day to find a time.</p>
      </Enter>
    );
  }
  return (
    <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <label className="field">Your name<input required name="name" autoComplete="name" /></label>
      <label className="field">Business name<input required name="business" autoComplete="organization" /></label>
      <label className="field">Industry
        <select name="industry">{IND.map((x) => <option key={x.name}>{x.name}</option>)}</select>
      </label>
      <label className="field">Mobile number<input required name="phone" type="tel" placeholder="07" autoComplete="tel" /></label>
      <button type="submit" disabled={sending} className="btn btn-primary" style={{ height: 52, fontSize: 17, border: 0, cursor: sending ? 'progress' : 'pointer' }}>
        {sending ? <><span className="dots-light"><Dots /></span>Sending</> : 'Book a demo'}
      </button>
      <span style={{ fontSize: 14, lineHeight: '20px', color: '#6D675C' }}>We reply on WhatsApp or by email within one working day.</span>
    </form>
  );
}
