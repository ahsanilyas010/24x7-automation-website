'use client';

import { useEffect, useRef, useState } from 'react';
import { CH, ChannelKey, HERO, HeroItem, OUT } from './data';
import { ChannelPill, Dots, Enter, Icon, Pill, reducedMotion } from './motion';

const W = 560;
const H = 480;
const LANES: Record<ChannelKey, number> = { wa: 96, email: 226, sms: 356 };
const IN = { x: 262, y: 118 };

type Item = { id: number; m: HeroItem; st: 0 | 1 };

/** Messages travel from WhatsApp, email and SMS into one inbox, where the AI drafts and resolves each one. */
export default function HeroStream() {
  const wrap = useRef<HTMLDivElement>(null);
  const [sc, setSc] = useState(1);
  const [items, setItems] = useState<Item[]>([]);
  const [act, setAct] = useState<ChannelKey | null>(null);
  const [count, setCount] = useState(0);
  const [clock, setClock] = useState('23:40');
  const dotG = useRef<SVGGElement>(null);
  const dotA = useRef<SVGCircleElement>(null);
  const dotB = useRef<SVGCircleElement>(null);
  const inbox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const f = () => {
      const w = el.clientWidth || (el.parentElement && el.parentElement.clientWidth) || 0;
      setSc(w ? Math.min(1, w / W) : 1);
    };
    f();
    const ro = new ResizeObserver(f);
    ro.observe(el);
    if (el.parentElement) ro.observe(el.parentElement);
    window.addEventListener('resize', f);
    const t = setTimeout(f, 300);
    return () => { ro.disconnect(); window.removeEventListener('resize', f); clearTimeout(t); };
  }, []);

  useEffect(() => {
    const RM = reducedMotion();
    let alive = true, i = 0, raf = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms));
    const bez = (p: number, a: number, b: number, c: number, d: number) => { const u = 1 - p; return u * u * u * a + 3 * u * u * p * b + 3 * u * p * p * c + p * p * p * d; };
    const land = (m: HeroItem, id: number) => {
      setItems((prev) => [{ id, m, st: 0 as const }, ...prev].slice(0, 4));
      setClock(m.t);
      const r = inbox.current?.getBoundingClientRect();
      if (r) window.dispatchEvent(new CustomEvent('hero-land', { detail: { x: r.left + 8, y: r.top + 106 * (r.height / H), c: CH[m.ch].c } }));
      later(() => {
        if (!alive) return;
        setItems((prev) => prev.map((x) => (x.id === id ? { ...x, st: 1 as const } : x)));
        setCount((c) => c + 1);
      }, RM ? 0 : 1000);
    };
    const step = () => {
      if (!alive) return;
      const m = HERO[i % HERO.length], id = i;
      i++;
      if (RM) { land(m, id); later(step, 2600); return; }
      const y0 = LANES[m.ch], st = performance.now(), dur = 820, col = CH[m.ch].c;
      setAct(m.ch);
      later(() => alive && setAct(null), 300);
      dotA.current?.setAttribute('fill', col);
      dotB.current?.setAttribute('fill', col);
      if (dotG.current) dotG.current.style.opacity = '1';
      const fr = (now: number) => {
        if (!alive) return;
        const p = Math.min(1, (now - st) / dur), e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
        const x = bez(e, 170, 220, 220, IN.x), y = bez(e, y0, y0, IN.y, IN.y);
        for (const d of [dotA.current, dotB.current]) { d?.setAttribute('cx', String(x)); d?.setAttribute('cy', String(y)); }
        if (p < 1) raf = requestAnimationFrame(fr);
        else { if (dotG.current) dotG.current.style.opacity = '0'; land(m, id); later(step, 1900); }
      };
      raf = requestAnimationFrame(fr);
    };
    later(step, 500);
    return () => { alive = false; cancelAnimationFrame(raf); timers.forEach(clearTimeout); };
  }, []);

  const RM = typeof window !== 'undefined' && reducedMotion();

  return (
    <div ref={wrap} style={{ width: '100%', height: H * sc, minHeight: 200 }} aria-label="Messages from WhatsApp, email and SMS arriving in one inbox" role="img">
      <div style={{ width: W, height: H, transform: `scale(${sc})`, transformOrigin: 'top left', position: 'relative', color: '#17150F' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6D675C' }}>Incoming</div>
        <svg width={W} height={H} style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
          {(Object.keys(LANES) as ChannelKey[]).map((k) => {
            const y = LANES[k];
            return <path key={k} d={`M170 ${y} C220 ${y} 220 ${IN.y} ${IN.x} ${IN.y}`} fill="none" stroke={CH[k].c} strokeOpacity={0.35} strokeWidth={2} strokeDasharray="4 6" />;
          })}
          <g ref={dotG} style={{ opacity: 0 }}>
            <circle ref={dotA} cx={170} cy={96} r={12} fill="#0F7A45" opacity={0.18} />
            <circle ref={dotB} cx={170} cy={96} r={6} fill="#0F7A45" />
          </g>
        </svg>
        {(Object.keys(LANES) as ChannelKey[]).map((k) => {
          const on = act === k, c = CH[k];
          return (
            <div key={k} style={{ position: 'absolute', left: 0, top: LANES[k] - 30, width: 170, height: 60, boxSizing: 'border-box', borderRadius: 12, background: '#FFFFFF', border: '1px solid ' + (on ? c.c : '#E0DBD1'), display: 'flex', alignItems: 'center', gap: 12, padding: '0 14px', transition: 'border-color 150ms ease, transform 150ms ease, box-shadow 150ms ease', transform: on ? 'scale(1.04)' : 'none', boxShadow: on ? '0 0 0 4px ' + c.t : 'none' }}>
              <span style={{ width: 34, height: 34, borderRadius: 8, background: c.t, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><Icon k={k} s={18} c={c.c} /></span>
              <span style={{ fontSize: 16, fontWeight: 700, color: c.c }}>{c.l}</span>
            </div>
          );
        })}
        <div style={{ position: 'absolute', left: 0, top: 414, width: 170, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontSize: 13, color: '#6D675C', fontWeight: 500 }}>Handled at</span>
          <span style={{ fontSize: 40, lineHeight: '44px', fontWeight: 700, letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
        </div>
        <div ref={inbox} style={{ position: 'absolute', left: IN.x, top: 0, right: 0, bottom: 0, borderRadius: 16, background: '#F6F4EF', border: '1px solid #C9C2B6', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)', overflow: 'hidden' }}>
          <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', borderBottom: '1px solid #E0DBD1', background: '#FFFFFF' }}>
            <span style={{ fontSize: 17, fontWeight: 700 }}>Inbox</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Pill t="AI on" fg="#0B7282" bg="#E2F2F4" icon="spark" />
              <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{count} handled</span>
            </span>
          </div>
          {items.map((x, idx) => {
            const o = OUT[x.m.o];
            return (
              <div key={x.id} style={{ position: 'absolute', left: 14, right: 14, top: 66 + idx * 92, transition: RM ? 'none' : 'top 250ms cubic-bezier(.2,.8,.2,1), opacity 250ms ease', opacity: idx === 3 ? 0.45 : 1 }}>
                <Enter from="translateX(-24px) scale(.96)" style={{ height: 80, boxSizing: 'border-box', borderRadius: 10, background: '#FFFFFF', border: '1px solid #E0DBD1', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <ChannelPill ch={x.m.ch} />
                    <span style={{ fontSize: 15, fontWeight: 700, flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{x.m.who}</span>
                    <span style={{ fontSize: 13, color: '#6D675C', fontVariantNumeric: 'tabular-nums' }}>{x.m.t}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 14, color: '#4B463D', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', minWidth: 0 }}>{x.m.txt}</span>
                    {x.st === 0 ? (
                      <span key="r" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#0B7282', flex: 'none' }}><Dots />Drafting</span>
                    ) : (
                      <Enter key="d" from="scale(.8)" d={250}><Pill t={x.m.ol} fg={o[0]} bg={o[1]} icon={x.m.o === 'ai' ? 'spark' : null} /></Enter>
                    )}
                  </div>
                </Enter>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
