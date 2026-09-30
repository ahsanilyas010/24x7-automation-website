'use client';

import { CSSProperties, ReactNode, useEffect, useRef } from 'react';
import { CH, ChannelKey } from './data';

export const reducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ICON: Record<string, string> = {
  wa: 'M7.9 20A9 9 0 1 0 4 16.1L2 22Z',
  email: 'M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zM22 7l-10 6L2 7',
  sms: 'M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z',
  spark: 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z',
  file: 'M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2zM14 2v6h6',
};

export function Icon({ k, s, c, w = 1.8 }: { k: string; s: number; c: string; w?: number }) {
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" style={{ flex: 'none', display: 'block', fill: 'none', stroke: c, strokeWidth: w, strokeLinecap: 'round', strokeLinejoin: 'round' }}>
      <path d={ICON[k]} />
    </svg>
  );
}

export function Pill({ t, fg, bg, icon, style }: { t: string; fg: string; bg: string; icon?: string | null; style?: CSSProperties }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, height: 24, padding: '0 9px', borderRadius: 999, background: bg, color: fg, fontSize: 13, fontWeight: 600, whiteSpace: 'nowrap', flex: 'none', ...style }}>
      {icon ? <Icon k={icon} s={13} c={fg} w={2} /> : null}
      {t}
    </span>
  );
}

export const ChannelPill = ({ ch }: { ch: ChannelKey }) => <Pill t={CH[ch].l} fg={CH[ch].c} bg={CH[ch].t} icon={ch} />;

/** Plays a short entrance animation once, on mount. */
export function Enter({ from = 'translateY(10px)', d = 250, style, children }: { from?: string; d?: number; style?: CSSProperties; children?: ReactNode }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (reducedMotion() || !r.current || !r.current.animate) return;
    r.current.animate([{ opacity: 0, transform: from }, { opacity: 1, transform: 'none' }], { duration: d, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }, []);
  return <div ref={r} style={style}>{children}</div>;
}

export function Dots() {
  const r = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (reducedMotion() || !r.current) return;
    const a = Array.from(r.current.children).map((d, i) =>
      (d as HTMLElement).animate([{ opacity: 0.25 }, { opacity: 1 }, { opacity: 0.25 }], { duration: 900, iterations: Infinity, delay: i * 150 }),
    );
    return () => a.forEach((x) => x.cancel());
  }, []);
  return (
    <span ref={r} style={{ display: 'inline-flex', gap: 3 }}>
      {[0, 1, 2].map((i) => <span key={i} style={{ width: 5, height: 5, borderRadius: 999, background: '#0B7282' }} />)}
    </span>
  );
}
