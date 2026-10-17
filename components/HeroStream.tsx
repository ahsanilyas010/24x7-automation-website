'use client';

import { useEffect, useRef, useState } from 'react';
import { CH, CH_ORDER, ChannelKey, HERO, HeroItem } from './data';
import { Dots, Icon, Pill, reducedMotion } from './motion';

const W = 560;
const H = 480;
const LANE_Y = (i: number) => 92 + i * 64;
const SRC_W = 150;
const PANEL_X = 262;
const HUB_X = 206;
const BASE: Record<ChannelKey, number> = { wa: 2, email: 3, sms: 1, fb: 1, ig: 1, li: 0 };

type Last = { m: HeroItem; pending: boolean };

/**
 * Messages from six channels travel into the app, and the AI files each one into its own folder on the dashboard.
 * Nothing piles up in a single inbox: each channel keeps a count, and a quiet "no pings" footer says why.
 */
export default function HeroStream() {
  const wrap = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const dotG = useRef<SVGGElement>(null);
  const dotA = useRef<SVGCircleElement>(null);
  const dotB = useRef<SVGCircleElement>(null);
  const [sc, setSc] = useState(1);
  const [compact, setCompact] = useState(false);
  const isCompact = useRef(false);
  const [counts, setCounts] = useState<Record<ChannelKey, number>>(BASE);
  const [last, setLast] = useState<Partial<Record<ChannelKey, Last>>>({});
  const [flash, setFlash] = useState<ChannelKey | null>(null);
  const [hub, setHub] = useState<ChannelKey | null>(null);
  const [handled, setHandled] = useState(0);
  const [needs, setNeeds] = useState(0);
  const [clock, setClock] = useState('23:40');

  useEffect(() => {
    const first = wrap.current;
    if (!first) return;
    const host = first.parentElement;
    // Read the wrapper fresh each time: it is a different element in the compact (phone) layout.
    const f = () => {
      const el = wrap.current;
      const w = (el && el.clientWidth) || (host && host.clientWidth) || 0;
      setSc(w ? Math.min(1, w / W) : 1);
      isCompact.current = w > 0 && w < 480;
      setCompact(isCompact.current);
    };
    f();
    const ro = new ResizeObserver(f);
    if (host) ro.observe(host);
    window.addEventListener('resize', f);
    const t = setTimeout(f, 300);
    return () => { ro.disconnect(); window.removeEventListener('resize', f); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const RM = reducedMotion();
    let alive = true, i = 0, raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const land = (m: HeroItem, id: number) => {
      if (id > 0 && id % HERO.length === 0) { setCounts(BASE); setLast({}); setHandled(0); setNeeds(0); }
      setCounts((c) => ({ ...c, [m.ch]: c[m.ch] + 1 }));
      setLast((l) => ({ ...l, [m.ch]: { m, pending: true } }));
      setFlash(m.ch);
      setClock(m.t);
      const r = panel.current?.getBoundingClientRect();
      if (r) {
        const idx = CH_ORDER.indexOf(m.ch);
        const y = isCompact.current ? r.top + 66 + idx * 62 : r.top + LANE_Y(idx) * (r.height / H);
        window.dispatchEvent(new CustomEvent('hero-land', { detail: { x: r.left + 8, y, c: CH[m.ch].c } }));
      }
      later(() => setFlash(null), 900);
      later(() => {
        if (!alive) return;
        setLast((l) => (l[m.ch]?.m === m ? { ...l, [m.ch]: { m, pending: false } } : l));
        setHandled((n) => n + 1);
        if (m.o === 'needs') setNeeds((n) => n + 1);
      }, RM ? 0 : 1000);
    };
    const step = () => {
      if (!alive) return;
      const m = HERO[i % HERO.length], id = i;
      i++;
      if (RM) { land(m, id); later(step, 2600); return; }
      const lane = CH_ORDER.indexOf(m.ch), y = LANE_Y(lane), st = performance.now(), dur = 900, col = CH[m.ch].c;
      dotA.current?.setAttribute('fill', col);
      dotB.current?.setAttribute('fill', col);
      if (dotG.current) dotG.current.style.opacity = '1';
      let hubbed = false;
      const fr = (now: number) => {
        if (!alive) return;
        const p = Math.min(1, (now - st) / dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const x = SRC_W + (PANEL_X - SRC_W) * e;
        for (const d of [dotA.current, dotB.current]) { d?.setAttribute('cx', String(x)); d?.setAttribute('cy', String(y)); }
        if (!hubbed && x >= HUB_X) { hubbed = true; setHub(m.ch); later(() => setHub(null), 350); }
        if (p < 1) raf = requestAnimationFrame(fr);
        else { if (dotG.current) dotG.current.style.opacity = '0'; land(m, id); later(step, 1500); }
      };
      raf = requestAnimationFrame(fr);
    };
    later(step, 500);
    return () => { alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  if (compact) {
    return (
      <div ref={wrap} style={{ width: '100%', color: '#17150F' }} aria-label="Messages from WhatsApp, email, SMS, Facebook, Instagram and LinkedIn are filed into separate folders on one dashboard" role="img">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6D675C' }}>Arriving from six channels</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: 8 }}>
            {CH_ORDER.map((k) => {
              const c = CH[k], on = flash === k;
              return (
                <span key={k} title={c.l} style={{ height: 52, borderRadius: 12, background: '#FFFFFF', border: '1px solid ' + (on ? c.c : '#E0DBD1'), boxShadow: on ? '0 0 0 4px ' + c.t : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'border-color 150ms ease, box-shadow 150ms ease' }}><Icon k={k} s={22} c={c.c} /></span>
              );
            })}
          </div>
          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#0B7282' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#0B7282', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }} aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7" /></svg>
            Sorted by AI into one dashboard
          </span>
          <div ref={panel} style={{ borderRadius: 16, background: '#F6F4EF', border: '1px solid #C9C2B6', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)', overflow: 'hidden' }}>
            <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid #E0DBD1', background: '#FFFFFF' }}>
              <span style={{ fontSize: 16, fontWeight: 700 }}>Dashboard</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Pill t="AI on" fg="#0B7282" bg="#E2F2F4" icon="spark" />
                <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
              </span>
            </div>
            <div style={{ padding: '10px 10px 6px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {CH_ORDER.map((k) => {
                const c = CH[k], l = last[k], on = flash === k;
                return (
                  <div key={k} style={{ minHeight: 54, boxSizing: 'border-box', borderRadius: 10, background: on ? c.t : '#FFFFFF', border: '1px solid ' + (on ? c.c : '#E0DBD1'), padding: '8px 10px', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 200ms ease, border-color 200ms ease' }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon k={k} s={16} c={c.c} /></span>
                    <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                      <span style={{ fontSize: 15, fontWeight: 700, color: c.c, lineHeight: '18px' }}>{c.l}</span>
                      <span style={{ fontSize: 13, color: '#4B463D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '17px' }}>
                        {l ? (l.pending ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0B7282', fontWeight: 600 }}><Dots />Drafting</span> : `${l.m.ol} · ${l.m.who}`) : 'All caught up'}
                      </span>
                    </span>
                    <span key={counts[k]} className="count-pop" style={{ minWidth: 30, height: 30, padding: '0 8px', borderRadius: 999, background: c.c, color: '#FFFFFF', fontSize: 15, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontVariantNumeric: 'tabular-nums' }}>{counts[k]}</span>
                  </div>
                );
              })}
            </div>
            <div style={{ height: 42, borderTop: '1px solid #E0DBD1', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 13, fontWeight: 600, color: '#4B463D' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: 999, background: '#3B6E2A' }} />No phone pings</span>
              <span style={{ fontVariantNumeric: 'tabular-nums' }}>{handled} handled · <span style={{ color: '#9A5B00' }}>{needs} need you</span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrap} style={{ width: '100%', height: H * sc, minHeight: 200 }} aria-label="Messages from WhatsApp, email, SMS, Facebook, Instagram and LinkedIn are filed into separate folders on one dashboard" role="img">
      <div style={{ width: W, height: H, transform: `scale(${sc})`, transformOrigin: 'top left', position: 'relative', color: '#17150F' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6D675C' }}>Arriving</div>
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {CH_ORDER.map((k, i) => {
            const y = LANE_Y(i), on = hub === k;
            return (
              <g key={k}>
                <line x1={SRC_W} y1={y} x2={PANEL_X} y2={y} stroke={CH[k].c} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 6" />
                <circle cx={HUB_X} cy={y} r={on ? 12 : 9} fill="#FFFFFF" stroke={on ? CH[k].c : '#C9C2B6'} strokeWidth={2} style={{ transition: 'all 150ms ease' }} />
                <circle cx={HUB_X} cy={y} r={3} fill={on ? CH[k].c : '#0B7282'} />
              </g>
            );
          })}
          <text x={HUB_X} y={44} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', fill: '#0B7282' }}>SORTED BY AI</text>
          <g ref={dotG} style={{ opacity: 0 }}>
            <circle ref={dotA} cx={SRC_W} cy={LANE_Y(0)} r={12} fill="#0F7A45" opacity={0.18} />
            <circle ref={dotB} cx={SRC_W} cy={LANE_Y(0)} r={6} fill="#0F7A45" />
          </g>
        </svg>
        {CH_ORDER.map((k, i) => {
          const c = CH[k], on = flash === k;
          return (
            <div key={k} style={{ position: 'absolute', left: 0, top: LANE_Y(i) - 24, width: SRC_W, height: 48, boxSizing: 'border-box', borderRadius: 12, background: '#FFFFFF', border: '1px solid ' + (on ? c.c : '#E0DBD1'), display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px', transition: 'border-color 150ms ease, box-shadow 150ms ease', boxShadow: on ? '0 0 0 4px ' + c.t : 'none' }}>
              <span style={{ width: 30, height: 30, borderRadius: 8, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon k={k} s={16} c={c.c} /></span>
              <span style={{ fontSize: 15, fontWeight: 700, color: c.c }}>{c.l}</span>
            </div>
          );
        })}
        <div ref={panel} style={{ position: 'absolute', left: PANEL_X, top: 0, right: 0, bottom: 0, borderRadius: 16, background: '#F6F4EF', border: '1px solid #C9C2B6', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)', overflow: 'hidden' }}>
          <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid #E0DBD1', background: '#FFFFFF' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>Dashboard</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pill t="AI on" fg="#0B7282" bg="#E2F2F4" icon="spark" />
              <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
            </span>
          </div>
          {CH_ORDER.map((k, i) => {
            const c = CH[k], l = last[k], on = flash === k;
            return (
              <div key={k} style={{ position: 'absolute', left: 10, right: 10, top: LANE_Y(i) - 26, height: 52, boxSizing: 'border-box', borderRadius: 10, background: on ? c.t : '#FFFFFF', border: '1px solid ' + (on ? c.c : '#E0DBD1'), padding: '0 10px', display: 'flex', alignItems: 'center', gap: 10, transition: 'background 200ms ease, border-color 200ms ease' }}>
                <span style={{ width: 28, height: 28, borderRadius: 8, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon k={k} s={15} c={c.c} /></span>
                <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: c.c, lineHeight: '17px' }}>{c.l}</span>
                  <span style={{ fontSize: 12, color: '#4B463D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '16px' }}>
                    {l ? (l.pending ? <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0B7282', fontWeight: 600 }}><Dots />Drafting</span> : `${l.m.ol} · ${l.m.who}`) : 'All caught up'}
                  </span>
                </span>
                <span key={counts[k]} className="count-pop" style={{ minWidth: 28, height: 28, padding: '0 8px', borderRadius: 999, background: c.c, color: '#FFFFFF', fontSize: 14, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontVariantNumeric: 'tabular-nums' }}>{counts[k]}</span>
              </div>
            );
          })}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 38, borderTop: '1px solid #E0DBD1', background: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 12.5, fontWeight: 600, color: '#4B463D' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 7, height: 7, borderRadius: 999, background: '#3B6E2A' }} />No phone pings</span>
            <span style={{ fontVariantNumeric: 'tabular-nums' }}>{handled} handled · <span style={{ color: '#9A5B00' }}>{needs} need you</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
