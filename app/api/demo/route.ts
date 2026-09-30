import { NextResponse } from 'next/server';

// Book a demo submissions are emailed to DEMO_EMAIL (set in Vercel project settings).
// Uses Resend when RESEND_API_KEY is set, otherwise FormSubmit (no account needed, one-time activation email).

const clean = (v: unknown, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  // Honeypot: real people never fill this hidden field.
  if (clean(body.company_site)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const business = clean(body.business, 160);
  const industry = clean(body.industry, 80);
  const phone = clean(body.phone, 40);
  const email = clean(body.email, 160);
  if (!name || !business || !phone || !/^[+\d][\d\s()-]{6,}$/.test(phone) || (email && !/^\S+@\S+\.\S+$/.test(email))) {
    return NextResponse.json({ ok: false, error: 'Please check your details and try again.' }, { status: 400 });
  }

  const to = process.env.DEMO_EMAIL;
  if (!to) {
    console.error('DEMO_EMAIL is not set');
    return NextResponse.json({ ok: false, error: 'We could not send your request. Please try again later.' }, { status: 500 });
  }

  const subject = `Demo request: ${business} (${industry || 'industry not given'})`;
  const lines = [`Name: ${name}`, `Business: ${business}`, `Industry: ${industry}`, `Mobile: ${phone}`, email ? `Email: ${email}` : '', `Sent: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`].filter(Boolean);

  try {
    let res: Response;
    if (process.env.RESEND_API_KEY) {
      res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: process.env.DEMO_FROM || '24x7 Automation <onboarding@resend.dev>', to: [to], subject, text: lines.join('\n'), ...(email ? { reply_to: email } : {}) }),
      });
    } else {
      const site = new URL(req.url).origin;
      res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json', Origin: site, Referer: `${site}/` },
        body: JSON.stringify({ _subject: subject, _template: 'table', _captcha: 'false', Name: name, Business: business, Industry: industry, Mobile: phone, ...(email ? { Email: email, _replyto: email } : {}) }),
      });
    }
    const text = await res.text();
    if (!res.ok || /"success"\s*:\s*"?false/.test(text)) {
      console.error('Demo email failed', res.status, text.slice(0, 300));
      return NextResponse.json({ ok: false, error: 'We could not send your request. Please try again.' }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Demo email error', err);
    return NextResponse.json({ ok: false, error: 'We could not send your request. Please try again.' }, { status: 502 });
  }
}
