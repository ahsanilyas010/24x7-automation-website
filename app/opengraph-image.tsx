import { ImageResponse } from 'next/og';

export const alt = '24x7 Automation: AI front desk for every business';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72, background: '#F6F4EF', color: '#17150F' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 36 }}>
          <svg width="64" height="64" viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" fill="none" stroke="#17150F" strokeWidth="5" strokeDasharray="89 18" transform="rotate(-50 24 24)" strokeLinecap="round" /><circle cx="35.2" cy="11.3" r="3.6" fill="#0B7282" /><path d="M24 24V14M24 24l6 4" stroke="#17150F" strokeWidth="4" strokeLinecap="round" fill="none" /></svg>
          <span style={{ fontWeight: 700 }}>24x7 automation</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -2, lineHeight: 1.02, maxWidth: 980 }}>Every conversation managed. Every reply on time.</div>
          <div style={{ fontSize: 32, color: '#4B463D' }}>WhatsApp, email, SMS, Facebook, Instagram and LinkedIn in one dashboard.</div>
        </div>
      </div>
    ),
    size,
  );
}
