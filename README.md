# 24x7 Automation website

Marketing site for 24x7 Automation, the AI front desk for UK small businesses. Built from the Claude Design handoff (`Website.dc.html`, Ledger brand direction).

Next.js (App Router), React, no UI framework. Fonts: Instrument Sans via `next/font`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Structure

- `app/page.tsx`: page layout and static sections
- `components/HeroStream.tsx`: hero motion (WhatsApp, email and SMS converging into one inbox)
- `components/UseCaseDemo.tsx`: animated sample conversations
- `components/Interactive.tsx`: industries picker, use cases, FAQ, demo form, scroll reveal
- `components/data.ts`: all sample copy (industries, use cases, FAQ)

All motion respects `prefers-reduced-motion`.

## Before launch

- Case studies are sample stories and are labelled as such.
- Prices (£49 / £129 / £299) are indicative placeholders.
- The Book a demo form shows a confirmation only. It does not send anywhere yet.
