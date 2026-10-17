'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { NAV } from '@/lib/site';

export default function SiteHeader() {
  const path = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const current = (href: string) => path === href || path.startsWith(href + '/');
  useEffect(() => { setOpen(false); }, [path]);
  return (
    <header className="site-header">
      <div className="wrap" style={{ minHeight: 68, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 44 }} aria-label="24x7 Automation home">
          <Logo size={34} ink="#17150F" accent="#0B7282" live />
          <span style={{ fontSize: 18, letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}><span style={{ fontWeight: 700 }}>24x7</span><span style={{ fontWeight: 500, color: '#4B463D' }}> automation</span></span>
        </Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="site-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((o) => !o)}>
          <svg width="22" height="22" viewBox="0 0 24 24" style={{ fill: 'none', stroke: '#17150F', strokeWidth: 2, strokeLinecap: 'round' }} aria-hidden="true">{open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}</svg>
        </button>
        <nav id="site-nav" aria-label="Main" className={`site-nav${open ? ' open' : ''}`}>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="nav-link" aria-current={current(n.href) ? 'page' : undefined}>{n.label}</Link>
          ))}
          <Link href="/book-a-demo" data-magnetic className="btn btn-primary" style={{ height: 40, padding: '0 16px' }}>Book a demo</Link>
        </nav>
      </div>
    </header>
  );
}
