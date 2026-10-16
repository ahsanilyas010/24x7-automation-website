# 24x7 Automation website

Marketing site for 24x7 Automation, the AI front desk for every business. Built from the Claude Design handoff (`Website.dc.html`, Ledger brand direction), then revised after the 16 Oct website review meeting.

Next.js (App Router), React, no UI framework. Fonts: Instrument Sans via `next/font`.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

## Pages (each has its own URL, title, description, canonical and Open Graph tags)

`/`, `/how-it-works`, `/channels`, `/industries`, `/industries/[slug]` (one per industry), `/use-cases`, `/custom-automation`, `/pricing`, `/case-studies`, `/security`, `/faq`, `/book-a-demo`. `sitemap.xml`, `robots.txt` and a generated social image are built in. Structured data: Organization, WebSite, SoftwareApplication, Service, FAQPage and BreadcrumbList.

## Environment variables

| Name | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Live domain, e.g. `https://yourdomain.com`. Used for canonical URLs, sitemap and Open Graph. **Set before launch.** |
| `NEXT_PUBLIC_CALENDLY_URL` | Calendly link. After a demo form submit the visitor is sent here. |
| `NEXT_PUBLIC_DEMO_VIDEO_URL` | Optional. URL of the one minute demo video. The video section only appears when this is set. |
| `DEMO_EMAIL`, `RESEND_API_KEY`, `DEMO_FROM` | Where demo requests are emailed (see `app/api/demo/route.ts`). |

## Structure

- `app/`: one folder per route, plus `layout.tsx` (header, footer, global SEO), `sitemap.ts`, `robots.ts`
- `lib/site.ts`: site constants, navigation. `lib/seo.ts`: metadata and JSON-LD helpers
- `components/data.ts`: all copy (channels, industries, use cases, FAQ)
- `components/sections.tsx`: sections shared by the home page and the dedicated pages
- `components/HeroStream.tsx`, `DashboardPreview.tsx`, `ApprovalDemo.tsx`, `OnTheJob.tsx`, `LiveClock.tsx`: animations

All motion respects `prefers-reduced-motion`.

## Before launch

- Case studies are sample stories and are labelled as such.
- Pricing is intentionally tailored per customer (no fixed plans). Terms: two week trial, then one annual payment.
- Facebook, Instagram and LinkedIn are shown as supported channels. Confirm the Meta API integration is live before launch.
