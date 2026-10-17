'use client';

import { useEffect, useRef, useState } from 'react';
import { Dots, Enter, Icon, Pill, reducedMotion } from './motion';

/** Shows how a reply is approved: draft appears with its source clause, one tap approves, then it is sent. */
export default function ApprovalDemo() {
  const [n, setN] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion()) { setN(3); return; }
    let alive = true, t: ReturnType<typeof setTimeout>, started = false;
    const delays = [600, 1300, 1400, 1100, 3600];
    const run = (i: number) => {
      if (!alive) return;
      setN(i);
      t = setTimeout(() => run(i >= 4 ? 0 : i + 1), delays[i]);
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { started = true; run(0); } }, { threshold: 0.3 });
    if (box.current) io.observe(box.current);
    return () => { alive = false; clearTimeout(t); io.disconnect(); };
  }, []);

  const btn = (label: string, primary: boolean, pressed: boolean) => (
    <span style={{ flex: 1, height: 44, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 600, border: primary ? '0' : '1px solid #C9C2B6', background: primary ? '#17150F' : '#FFFFFF', color: primary ? '#FFFFFF' : '#17150F', transform: pressed ? 'scale(.96)' : 'none', boxShadow: pressed ? '0 0 0 4px rgba(11,114,130,.25)' : 'none', transition: 'transform 150ms ease, box-shadow 150ms ease' }}>{label}</span>
  );

  return (
    <div ref={box} style={{ borderRadius: 16, background: '#F6F4EF', border: '1px solid #C9C2B6', boxShadow: '0 1px 2px rgba(23,21,15,.06),0 8px 24px rgba(23,21,15,.10)', overflow: 'hidden', minHeight: 400 }} role="img" aria-label="A drafted reply is shown with the clause it came from, then approved with one tap and sent">
      <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', background: '#FFFFFF', borderBottom: '1px solid #E0DBD1' }}>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Mark Patel</span>
        <Pill t="Shadow mode" fg="#0B7282" bg="#E2F2F4" icon="spark" />
      </div>
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 10 }} aria-live="polite">
        <div style={{ alignSelf: 'flex-start', maxWidth: '86%', padding: '12px 14px', borderRadius: '14px 14px 14px 4px', background: '#FFFFFF', border: '1px solid #E0DBD1', fontSize: 15, lineHeight: '22px' }}>I was charged a £65 callout fee. Nobody told me about this.</div>
        {n === 0 ? null : n === 1 ? (
          <Enter key="d" style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 13, fontWeight: 600, color: '#0B7282' }}><Dots />AI is drafting</Enter>
        ) : (
          <Enter key="draft" style={{ alignSelf: 'flex-end', maxWidth: '90%', display: 'flex', flexDirection: 'column', gap: 8, padding: '12px 14px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 15, lineHeight: '22px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#0B7282' }}><Icon k="spark" s={13} c="#0B7282" w={2} />Draft for your approval</span>
            <span>Hi Mark, sorry for the frustration. The callout fee covers the first hour on site and is set out in our terms, sent with your booking.</span>
            <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, height: 28, padding: '0 10px', borderRadius: 999, border: '1px solid #A6D6DD', background: '#FFFFFF', color: '#0B7282', fontSize: 12.5, fontWeight: 600 }}><Icon k="file" s={13} c="#0B7282" w={2} />Terms · Clause 4.2 Callout fees</span>
          </Enter>
        )}
      </div>
      <div style={{ padding: '4px 16px 16px', minHeight: 76 }}>
        {n >= 4 ? (
          <Enter key="sent" from="translateY(8px)" style={{ display: 'flex', alignItems: 'center', gap: 10, height: 52, padding: '0 14px', borderRadius: 10, background: '#EAF2E4', border: '1px solid #B9D5A8', color: '#3B6E2A', fontSize: 15, fontWeight: 600 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#3B6E2A', strokeWidth: 2.6, strokeLinecap: 'round', strokeLinejoin: 'round' }}><path className="draw-check" d="M20 6 9 17l-5-5" /></svg>
            Approved and sent to Mark · 09:12
          </Enter>
        ) : n >= 2 ? (
          <div style={{ display: 'flex', gap: 8 }}>{btn('Approve and send', true, n === 3)}{btn('Edit', false, false)}</div>
        ) : null}
      </div>
    </div>
  );
}
