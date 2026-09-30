'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import builder from '@/public/images/builder-site.webp';
import { Dots, Enter, Icon, Pill, reducedMotion } from './motion';

const STEPS = [
  { k: 'in', t: '21:47' },
  { k: 'draft', t: '21:47' },
  { k: 'sent', t: '21:48' },
  { k: 'booked', t: '21:52' },
] as const;

/** Full-width site photo with the evening's enquiry playing out over it, one card at a time. */
export default function OnTheJob() {
  const [n, setN] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (reducedMotion()) { setN(STEPS.length); return; }
    let t: ReturnType<typeof setTimeout>, alive = true;
    const run = (i: number) => {
      if (!alive) return;
      setN(i);
      t = setTimeout(() => run(i >= STEPS.length ? 0 : i + 1), i >= STEPS.length ? 3800 : i === 0 ? 500 : 1500);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) { started.current = true; run(0); }
    }, { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    return () => { alive = false; clearTimeout(t); io.disconnect(); };
  }, []);

  const card = { borderRadius: 12, background: 'rgba(255,255,255,.96)', border: '1px solid #E0DBD1', boxShadow: '0 1px 2px rgba(23,21,15,.08), 0 12px 32px rgba(23,21,15,.18)', padding: '12px 14px', color: '#17150F', backdropFilter: 'blur(6px)' } as const;

  return (
    <div ref={box} className="otj">
      <div className="otj-media img-reveal" data-reveal="0">
        <div data-parallax="0.08" className="otj-img">
          <Image src={builder} alt="A site manager in hi-vis reading a customer message on his phone on a UK housing development" fill placeholder="blur" sizes="(max-width: 1248px) 100vw, 1200px" style={{ objectFit: 'cover', objectPosition: '50% 35%' }} priority={false} />
        </div>
        <div className="otj-shade" />
        <div className="otj-copy">
          <span className="eyebrow" style={{ color: '#62C6D3' }}>On the job</span>
          <h2 className="h2" style={{ color: '#FFFFFF', maxWidth: 520 }}>Your hands are full. Your customers still get an answer.</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: '28px', color: '#EEEAE2', maxWidth: 460 }}>While you finish the job, the AI replies, books the visit and keeps the lead warm. You check it when you are ready.</p>
        </div>
      </div>
      <div className="otj-cards" aria-live="polite">
        {n >= 1 && (
          <Enter from="translateY(14px) scale(.97)" d={350} style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Pill t="WhatsApp" fg="#0F7A45" bg="#E3F4EA" icon="wa" />
              <span style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>Emma Walsh</span>
              <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{STEPS[0].t}</span>
            </div>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>Hi, could you quote for a loft conversion in Didsbury?</span>
          </Enter>
        )}
        {n >= 2 && (
          <Enter from="translateY(14px) scale(.97)" d={350} style={{ ...card, background: 'rgba(226,242,244,.97)', borderColor: '#A6D6DD' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#0B7282', marginBottom: 6 }}>
              <Icon k="spark" s={13} c="#0B7282" w={2} />AI reply{n === 2 ? <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dots />Drafting</span> : <span style={{ marginLeft: 'auto', color: '#4B463D', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{STEPS[2].t}</span>}
            </span>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>Thanks Emma. We start with a free survey. Would Thursday at 10:00 suit you?</span>
          </Enter>
        )}
        {n >= 4 && (
          <Enter from="translateY(14px) scale(.97)" d={350} style={{ ...card, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, background: '#EAF2E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#3B6E2A', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path className="draw-check" d="M20 6 9 17l-5-5" /></svg>
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Survey booked, Thu 10:00</span>
            <Pill t="Site visit" fg="#0B7282" bg="#E2F2F4" />
          </Enter>
        )}
      </div>
    </div>
  );
}
