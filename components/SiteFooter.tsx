import Link from 'next/link';
import Logo from './Logo';
import { FOOTER_LINKS } from '@/lib/site';
import { IND } from './data';

export default function SiteFooter() {
  return (
    <footer style={{ background: '#12110E', color: '#A29B8F' }}>
      <div className="wrap" style={{ paddingTop: 56, paddingBottom: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 40 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10 }} aria-label="24x7 Automation home">
            <Logo size={30} ink="#EEEAE2" accent="#62C6D3" />
            <span style={{ fontSize: 17, color: '#EEEAE2' }}><span style={{ fontWeight: 700 }}>24x7</span><span style={{ fontWeight: 500, color: '#CBC5BA' }}> automation</span></span>
          </Link>
          <span style={{ fontSize: 14, lineHeight: '21px' }}>The AI front desk for every business. All your conversations, one dashboard.</span>
        </div>
        {FOOTER_LINKS.map((g) => (
          <nav key={g.title} aria-label={g.title} style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
            <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6E675E' }}>{g.title}</span>
            {g.links.map((l) => <Link key={l.href} href={l.href} style={{ color: '#CBC5BA' }}>{l.label}</Link>)}
          </nav>
        ))}
        <nav aria-label="Industries" style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15 }}>
          <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: '#6E675E' }}>Industries</span>
          {IND.slice(0, 6).map((i) => <Link key={i.slug} href={`/industries/${i.slug}`} style={{ color: '#CBC5BA' }}>{i.name}</Link>)}
          <Link href="/industries" style={{ color: '#62C6D3' }}>All industries</Link>
        </nav>
      </div>
      <div className="wrap" style={{ paddingBottom: 32, fontSize: 13 }}>&copy; {new Date().getFullYear()} 24x7 Automation. All rights reserved.</div>
    </footer>
  );
}
