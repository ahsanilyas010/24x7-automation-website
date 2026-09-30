'use client';

import { useEffect, useRef, useState } from 'react';
import { reducedMotion } from './motion';

const finePointer = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/**
 * Page-wide pointer and scroll effects:
 * - thin progress bar along the top
 * - header gains a shadow once the page scrolls
 * - nav link for the section in view is marked current
 * - `.spot` cards get a glow that follows the pointer, `[data-tilt]` cards lean towards it
 * - `[data-magnetic]` buttons drift a little towards the pointer
 */
export function PageEffects() {
  useEffect(() => {
    const RM = reducedMotion();
    const bar = document.getElementById('scroll-progress');
    const header = document.querySelector('.site-header');
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        header?.classList.toggle('scrolled', window.scrollY > 8);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    // Scroll spy
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.nav-link'));
    const ids = links.map((a) => a.getAttribute('href')!.slice(1));
    const spy = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (!e.isIntersecting) return;
        links.forEach((a) => (a.getAttribute('href') === '#' + e.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')));
      }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) spy.observe(el); });

    const cleanups: (() => void)[] = [];
    if (!RM && finePointer()) {
      document.querySelectorAll<HTMLElement>('.spot').forEach((el) => {
        const tilt = el.hasAttribute('data-tilt');
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const x = e.clientX - r.left, y = e.clientY - r.top;
          el.style.setProperty('--mx', `${x}px`);
          el.style.setProperty('--my', `${y}px`);
          if (tilt) el.style.transform = `perspective(900px) rotateX(${((y / r.height) - 0.5) * -5}deg) rotateY(${((x / r.width) - 0.5) * 5}deg) translateY(-4px)`;
        };
        const leave = () => { if (tilt) el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
      document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
        const move = (e: PointerEvent) => {
          const r = el.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.28}px)`;
        };
        const leave = () => { el.style.transform = ''; };
        el.addEventListener('pointermove', move);
        el.addEventListener('pointerleave', leave);
        cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); });
      });
    }
    return () => { window.removeEventListener('scroll', onScroll); spy.disconnect(); cleanups.forEach((f) => f()); cancelAnimationFrame(raf); };
  }, []);
  return <div id="scroll-progress" aria-hidden="true" />;
}

/**
 * Dot grid behind the hero. Dots brighten near the pointer, and a ring ripples out
 * from the inbox each time the hero animation lands a message (`hero-land` event).
 */
export function HeroField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    if (!ctx) return;
    const RM = reducedMotion();
    const GAP = 26;
    let w = 0, h = 0, dpr = 1, raf = 0, visible = true;
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const rings: { x: number; y: number; t0: number; c: string }[] = [];
    const resize = () => {
      const r = cv.parentElement!.getBoundingClientRect();
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = r.width; h = r.height;
      cv.width = w * dpr; cv.height = h * dpr;
      cv.style.width = w + 'px'; cv.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (RM) draw(performance.now());
    };
    const hex = (c: string, a: number) => {
      const n = parseInt(c.slice(1), 16);
      return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
    };
    const draw = (now: number) => {
      ptr.x += (ptr.tx - ptr.x) * 0.12; ptr.y += (ptr.ty - ptr.y) * 0.12;
      ctx.clearRect(0, 0, w, h);
      for (let i = rings.length - 1; i >= 0; i--) if (now - rings[i].t0 > 1800) rings.splice(i, 1);
      for (let y = GAP / 2; y < h; y += GAP) {
        for (let x = GAP / 2; x < w; x += GAP) {
          let a = 0.1, r = 1.1, col = '#17150F';
          const d = Math.hypot(x - ptr.x, y - ptr.y);
          if (d < 160) { const k = 1 - d / 160; a += k * 0.35; r += k * 1.2; col = '#0B7282'; }
          for (const g of rings) {
            const p = (now - g.t0) / 1800, rad = p * 520, dd = Math.abs(Math.hypot(x - g.x, y - g.y) - rad);
            if (dd < 22) { const k = (1 - dd / 22) * (1 - p); a += k * 0.55; r += k * 1.4; col = g.c; }
          }
          ctx.fillStyle = hex(col, Math.min(0.7, a));
          ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
        }
      }
      // Fade the field out towards the bottom and left so text stays crisp.
      const fade = ctx.createLinearGradient(0, h * 0.55, 0, h);
      fade.addColorStop(0, 'rgba(246,244,239,0)'); fade.addColorStop(1, 'rgba(246,244,239,1)');
      ctx.fillStyle = fade; ctx.fillRect(0, 0, w, h);
      const side = ctx.createLinearGradient(0, 0, w * 0.55, 0);
      side.addColorStop(0, 'rgba(246,244,239,.85)'); side.addColorStop(1, 'rgba(246,244,239,0)');
      ctx.fillStyle = side; ctx.fillRect(0, 0, w, h);
    };
    const loop = (now: number) => { if (visible) draw(now); raf = requestAnimationFrame(loop); };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(cv.parentElement!);
    if (RM) return () => ro.disconnect();
    const sec = cv.parentElement!;
    const move = (e: PointerEvent) => { const r = cv.getBoundingClientRect(); ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top; if (ptr.x < -999) { ptr.x = ptr.tx; ptr.y = ptr.ty; } };
    const leave = () => { ptr.tx = -9999; ptr.ty = -9999; ptr.x = -9999; ptr.y = -9999; };
    const land = (e: Event) => {
      const d = (e as CustomEvent).detail as { x: number; y: number; c: string };
      const r = cv.getBoundingClientRect();
      rings.push({ x: d.x - r.left, y: d.y - r.top, t0: performance.now(), c: d.c });
    };
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(sec);
    sec.addEventListener('pointermove', move);
    sec.addEventListener('pointerleave', leave);
    window.addEventListener('hero-land', land);
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); sec.removeEventListener('pointermove', move); sec.removeEventListener('pointerleave', leave); window.removeEventListener('hero-land', land); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }} />;
}

/** Counts up to a number when it first scrolls into view. */
export function CountUp({ to, prefix = '', suffix = '', ms = 1200 }: { to: number; prefix?: string; suffix?: string; ms?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [v, setV] = useState(to);
  useEffect(() => {
    if (reducedMotion() || !ref.current) return;
    setV(0);
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - t0) / ms), k = 1 - Math.pow(1 - p, 3);
        setV(Math.round(to * k));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to, ms]);
  return <span ref={ref}>{prefix}{v}{suffix}</span>;
}
