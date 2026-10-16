'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { CH, IND } from './data';
import { PHOTOS } from './photos';
import { Dots, Enter, Icon, Pill, reducedMotion } from './motion';

const STEPS = 4;

/** Full-width photo slider. The scene changes industry by industry, each with its own enquiry playing out over it. */
export default function OnTheJob() {
  const [idx, setIdx] = useState(0);
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const RM = useRef(false);

  useEffect(() => {
    RM.current = reducedMotion();
    if (RM.current) setN(STEPS);
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); io.disconnect(); } }, { threshold: 0.35 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started || RM.current) return;
    let alive = true, t: ReturnType<typeof setTimeout>;
    const run = (i: number) => {
      if (!alive) return;
      setN(i);
      if (i >= STEPS) { t = setTimeout(() => { if (!alive) return; setIdx((x) => (x + 1) % IND.length); }, 3600); return; }
      t = setTimeout(() => run(i + 1), i === 0 ? 600 : 1500);
    };
    run(0);
    return () => { alive = false; clearTimeout(t); };
  }, [started, idx]);

  const cur = IND[idx], c = CH[cur.ch], first = cur.who.split(',')[0];
  const card = { borderRadius: 12, background: 'rgba(255,255,255,.96)', border: '1px solid #E0DBD1', boxShadow: '0 1px 2px rgba(23,21,15,.08), 0 12px 32px rgba(23,21,15,.18)', padding: '12px 14px', color: '#17150F', backdropFilter: 'blur(6px)' } as const;

  return (
    <div ref={box} className="otj">
      <div className="otj-media img-reveal" data-reveal="0">
        <div data-parallax="0.08" className="otj-img">
          {IND.map((x, i) => (
            <div key={x.slug} className="otj-slide" style={{ opacity: i === idx ? 1 : 0 }} aria-hidden={i !== idx}>
              <Image src={PHOTOS[x.photo].src} alt={PHOTOS[x.photo].alt} fill placeholder="blur" sizes="(max-width: 1248px) 100vw, 1200px" style={{ objectFit: 'cover', objectPosition: PHOTOS[x.photo].pos }} />
            </div>
          ))}
        </div>
        <div className="otj-shade" />
        <div className="otj-copy">
          <span className="eyebrow" style={{ color: '#62C6D3' }}>On the job</span>
          <h2 className="h2" style={{ color: '#FFFFFF', maxWidth: 560 }}>Your hands are full. Your customers still get an answer.</h2>
          <p style={{ margin: 0, fontSize: 18, lineHeight: '28px', color: '#EEEAE2', maxWidth: 500 }}>No more ting, ting, ting. Every conversation is collected quietly, then prepared and warmed up with drafts and replies, ready for you to send when you open your dashboard.</p>
          <div className="otj-dots" role="tablist" aria-label="Industry scenes">
            {IND.map((x, i) => (
              <button key={x.slug} role="tab" aria-selected={i === idx} aria-label={x.name} onClick={() => { setIdx(i); setN(RM.current ? STEPS : 0); }} className={i === idx ? 'on' : undefined} />
            ))}
            <span style={{ fontSize: 13, fontWeight: 600, color: '#EEEAE2', marginLeft: 6 }}>{cur.name}</span>
          </div>
        </div>
      </div>
      <div className="otj-cards" aria-live="polite">
        {n >= 1 && (
          <Enter key={`a${idx}`} from="translateY(14px) scale(.97)" d={350} style={card}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <Pill t={c.l} fg={c.c} bg={c.t} icon={cur.ch} />
              <span style={{ fontSize: 15, fontWeight: 700, flex: 1 }}>{first}</span>
              <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>21:47</span>
            </div>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>{cur.ask}</span>
          </Enter>
        )}
        {n >= 2 && (
          <Enter key={`b${idx}`} from="translateY(14px) scale(.97)" d={350} style={{ ...card, background: 'rgba(226,242,244,.97)', borderColor: '#A6D6DD' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, color: '#0B7282', marginBottom: 6 }}>
              <Icon k="spark" s={13} c="#0B7282" w={2} />Reply ready{n === 2 ? <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6 }}><Dots />Drafting</span> : <span style={{ marginLeft: 'auto', color: '#4B463D', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>21:48</span>}
            </span>
            <span style={{ fontSize: 15, lineHeight: '22px' }}>{cur.reply}</span>
          </Enter>
        )}
        {n >= 4 && (
          <Enter key={`c${idx}`} from="translateY(14px) scale(.97)" d={350} style={{ ...card, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 30, height: 30, borderRadius: 999, background: '#EAF2E4', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#3B6E2A', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path className="draw-check" d="M20 6 9 17l-5-5" /></svg>
            </span>
            <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>Filed under {cur.stages[2]}</span>
            <Pill t={cur.stages[2]} fg="#0B7282" bg="#E2F2F4" />
          </Enter>
        )}
      </div>
    </div>
  );
}
