'use client';

import { useEffect, useState } from 'react';
import { reducedMotion } from './motion';

/** A working analogue and digital clock: "always on" shown as the real time ticking. */
export default function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const iv = setInterval(() => setNow(new Date()), reducedMotion() ? 60000 : 1000);
    return () => clearInterval(iv);
  }, []);
  const h = now ? now.getHours() : 0, m = now ? now.getMinutes() : 0, s = now ? now.getSeconds() : 0;
  const pad = (n: number) => String(n).padStart(2, '0');
  const hourDeg = ((h % 12) + m / 60) * 30, minDeg = (m + s / 60) * 6, secDeg = s * 6;
  return (
    <div data-reveal="320" className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 18px' }}>
      <svg width="76" height="76" viewBox="0 0 76 76" role="img" aria-label={now ? `Current time ${pad(h)}:${pad(m)}` : 'Clock'} style={{ flex: 'none' }}>
        <circle cx="38" cy="38" r="34" fill="#F6F4EF" stroke="#17150F" strokeWidth="3" />
        {Array.from({ length: 12 }, (_, i) => (
          <line key={i} x1="38" y1="8" x2="38" y2={i % 3 === 0 ? 14 : 11} stroke="#6D675C" strokeWidth={i % 3 === 0 ? 2.2 : 1.2} transform={`rotate(${i * 30} 38 38)`} />
        ))}
        <line x1="38" y1="38" x2="38" y2="22" stroke="#17150F" strokeWidth="3.4" strokeLinecap="round" transform={`rotate(${hourDeg} 38 38)`} style={{ transition: 'transform 300ms ease' }} />
        <line x1="38" y1="38" x2="38" y2="13" stroke="#17150F" strokeWidth="2.6" strokeLinecap="round" transform={`rotate(${minDeg} 38 38)`} style={{ transition: 'transform 300ms ease' }} />
        <line x1="38" y1="42" x2="38" y2="11" stroke="#0B7282" strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${secDeg} 38 38)`} style={{ transition: s === 0 ? 'none' : 'transform 300ms cubic-bezier(.4,2.2,.5,1)' }} />
        <circle cx="38" cy="38" r="3" fill="#0B7282" />
      </svg>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: '#0B7282' }}>
          <span className="live-dot" aria-hidden="true" />Working right now
        </span>
        <span style={{ fontSize: 28, lineHeight: '32px', fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{now ? `${pad(h)}:${pad(m)}:${pad(s)}` : '--:--:--'}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#4B463D' }}>Every channel, one dashboard, 24 hours a day.</span>
      </div>
    </div>
  );
}
