'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import { Msg, UseCase } from './data';
import { ChannelPill, Dots, Enter, Icon, reducedMotion } from './motion';

/** Plays one sample conversation a message at a time, then loops. */
export default function UseCaseDemo({ uc, onProgress, onDone }: { uc: UseCase; onProgress?: (p: number) => void; onDone?: () => boolean }) {
  const [n, setN] = useState(0);
  const [typing, setTyping] = useState(false);
  const cb = useRef({ onProgress, onDone });
  cb.current = { onProgress, onDone };
  useEffect(() => { cb.current.onProgress?.(n / uc.msgs.length); }, [n, uc]);

  useEffect(() => {
    if (reducedMotion()) { setN(uc.msgs.length); return; }
    let alive = true, t: ReturnType<typeof setTimeout>, i = 0;
    const M = uc.msgs;
    const next = () => {
      if (!alive) return;
      if (i >= M.length) {
        t = setTimeout(() => { if (!alive || cb.current.onDone?.()) return; i = 0; setN(0); t = setTimeout(next, 500); }, 3200);
        return;
      }
      const m = M[i];
      if (m.f === 'ai') {
        setTyping(true);
        t = setTimeout(() => { if (!alive) return; setTyping(false); i++; setN(i); t = setTimeout(next, 1300); }, 1000);
      } else {
        i++; setN(i); t = setTimeout(next, m.f === 's' ? 900 : 1300);
      }
    };
    t = setTimeout(next, 350);
    return () => { alive = false; clearTimeout(t); };
  }, [uc]);

  const bubble = (m: Msg, i: number) => {
    if (m.f === 's') return <Enter key={i} style={{ alignSelf: 'center', fontSize: 13, fontWeight: 600, color: '#4B463D', background: '#ECE8E0', borderRadius: 999, padding: '6px 12px', textAlign: 'center' }}>{m.t}</Enter>;
    const me = m.f !== 'c';
    const st: CSSProperties = { alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '82%', padding: '12px 14px', fontSize: 16, lineHeight: '23px', borderRadius: me ? '14px 14px 4px 14px' : '14px 14px 14px 4px', display: 'flex', flexDirection: 'column', gap: 8 };
    if (m.f === 'c') Object.assign(st, { background: '#FFFFFF', border: '1px solid #E0DBD1', color: '#17150F' });
    if (m.f === 'ai') Object.assign(st, { background: '#E2F2F4', border: '1px solid #A6D6DD', color: '#17150F' });
    if (m.f === 'y') Object.assign(st, { background: '#4B463D', color: '#FFFFFF' });
    return (
      <Enter key={i} style={st}>
        {m.f === 'ai' ? <span style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 700, color: '#0B7282' }}><Icon k="spark" s={13} c="#0B7282" w={2} />AI</span>
          : m.f === 'y' ? <span style={{ fontSize: 12, fontWeight: 700, color: '#CBC5BA' }}>You</span> : null}
        <span>{m.t}</span>
        {m.clause ? (
          <span style={{ alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 6, height: 30, padding: '0 10px', borderRadius: 999, border: '1px solid #A6D6DD', background: '#FFFFFF', color: '#0B7282', fontSize: 13, fontWeight: 600 }}>
            <Icon k="file" s={14} c="#0B7282" w={2} />{m.clause}
          </span>
        ) : null}
      </Enter>
    );
  };

  return (
    <div style={{ borderRadius: 18, background: '#F6F4EF', border: '1px solid #34302A', overflow: 'hidden', color: '#17150F' }}>
      <div style={{ height: 64, display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', background: '#FFFFFF', borderBottom: '1px solid #E0DBD1' }}>
        <span style={{ width: 40, height: 40, borderRadius: 999, background: '#ECE8E0', border: '1px solid #E0DBD1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#4B463D', flex: 'none' }}>
          {uc.who.split(' ').map((s) => s[0]).join('')}
        </span>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 17, fontWeight: 700 }}>{uc.who}</span>
          <span style={{ fontSize: 13, color: '#6D675C', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{uc.title}</span>
        </div>
        <ChannelPill ch={uc.ch} />
      </div>
      <div style={{ minHeight: 420, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }} aria-live="polite">
        {uc.msgs.slice(0, n).map(bubble)}
        {typing ? (
          <Enter key="typing" style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderRadius: '14px 14px 4px 14px', background: '#E2F2F4', border: '1px solid #A6D6DD', fontSize: 13, fontWeight: 600, color: '#0B7282' }}>
            <Dots />AI is drafting
          </Enter>
        ) : null}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6, padding: '10px 14px 14px', borderTop: '1px solid #E0DBD1', background: '#FFFFFF' }}>
        {['Done', 'Delegate', 'Follow up', 'Remind me'].map((l) => (
          <span key={l} style={{ height: 40, borderRadius: 8, border: '1px solid #E0DBD1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 600, color: '#4B463D', whiteSpace: 'nowrap' }}>{l}</span>
        ))}
      </div>
    </div>
  );
}
