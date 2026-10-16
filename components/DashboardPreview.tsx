'use client';

import { useEffect, useRef, useState } from 'react';
import { CH, CH_ORDER, ChannelKey } from './data';
import { Icon, Pill, reducedMotion } from './motion';

const BASE: Record<ChannelKey, number> = { wa: 3, email: 5, sms: 2, fb: 1, ig: 2, li: 1 };
const TICKS = 10;

/** A short looping preview of the dashboard: each channel has its own folder with a count, and only decisions surface. */
export default function DashboardPreview({ caption }: { caption?: string }) {
  const [step, setStep] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (reducedMotion() || !visible) return;
    const iv = setInterval(() => setStep((s) => (s + 1) % TICKS), 850);
    return () => clearInterval(iv);
  }, [visible]);

  const moving = step < 6 ? CH_ORDER[step] : null;
  const counts = CH_ORDER.reduce((a, k, i) => ({ ...a, [k]: BASE[k] + (step > i ? 1 : 0) }), {} as Record<ChannelKey, number>);
  const needsLit = step >= 6;

  return (
    <div ref={box} style={{ borderRadius: 16, background: '#F6F4EF', border: '1px solid #C9C2B6', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)', overflow: 'hidden', color: '#17150F' }} role="img" aria-label="The 24x7 dashboard: each channel has its own folder with a message count, and only decisions need you">
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#FFFFFF', borderBottom: '1px solid #E0DBD1' }}>
        <span style={{ fontSize: 17, fontWeight: 700 }}>Today</span>
        <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}><Pill t="AI on" fg="#0B7282" bg="#E2F2F4" icon="spark" /><span style={{ fontSize: 13, color: '#6D675C' }}>No phone pings</span></span>
      </div>
      <div style={{ padding: 16, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
        {CH_ORDER.map((k) => {
          const c = CH[k], on = moving === k;
          return (
            <div key={k} style={{ borderRadius: 12, background: on ? c.t : '#FFFFFF', border: `1px solid ${on ? c.c : '#E0DBD1'}`, padding: '12px 12px 10px', display: 'flex', flexDirection: 'column', gap: 8, transition: 'background 250ms ease, border-color 250ms ease' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 26, height: 26, borderRadius: 7, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon k={k} s={14} c={c.c} /></span>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.c }}>{c.l}</span>
              </span>
              <span key={counts[k]} className="count-pop" style={{ fontSize: 30, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{counts[k]}</span>
              <span style={{ fontSize: 12, color: '#6D675C' }}>{on ? 'Drafting replies' : 'Sorted and drafted'}</span>
            </div>
          );
        })}
      </div>
      <div style={{ padding: '0 16px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#9A5B00' }}>Needs you now</span>
        {[['Tom Reid', 'Can you match a lower quote?', 'email'], ['Anita Rao', 'Interested in a partnership call', 'li']].map(([who, txt, ch], i) => (
          <div key={who} style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44, borderRadius: 10, background: '#FFFFFF', border: `1px solid ${needsLit && i === 0 ? '#9A5B00' : '#E0DBD1'}`, padding: '0 12px', transition: 'border-color 250ms ease' }}>
            <Icon k={ch} s={15} c={CH[ch as ChannelKey].c} />
            <span style={{ fontSize: 14, fontWeight: 700 }}>{who}</span>
            <span style={{ fontSize: 14, color: '#4B463D', flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{txt}</span>
          </div>
        ))}
      </div>
      {caption ? <div style={{ padding: '10px 16px', borderTop: '1px solid #E0DBD1', background: '#FFFFFF', fontSize: 13, fontWeight: 600, color: '#4B463D' }}>{caption}</div> : null}
    </div>
  );
}
