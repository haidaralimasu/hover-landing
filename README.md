# Hover — Landing page

Marketing / pre-launch landing page for **Hover**, the simplest way to send
money across borders.

> Positioning note: the public site deliberately avoids all crypto/blockchain
> language. Users just "sign in and send"; the underlying rails are never
> surfaced in copy, links, or metadata. Keep new copy consumer-plain.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Framer
  Motion · Lucide icons.
- **Design:** monochrome black-and-white system anchored on the silver "H"
  mark. Built following the vendored design skills in
  [`../.claude/skills`](../.claude/skills) (impeccable, taste-skill,
  emil-design-eng) and their anti-slop / motion rules.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Structure

```
src/
  app/
    layout.tsx           # metadata, JSON-LD (Organization), fonts, header/footer
    page.tsx             # composes sections + Product/FAQ JSON-LD
    globals.css          # design tokens, easings, reveal system
    opengraph-image.tsx  # OG/Twitter card, generated with next/og (ImageResponse)
    twitter-image.tsx    # re-exports the OG image
    icon.png / apple-icon.png / favicon.ico
    robots.ts / sitemap.ts
    api/notify/route.ts  # waitlist email capture endpoint
  components/
    sections/            # site-header, hero, foundations, how-it-works,
                         # features, security(+diagram), faq(+accordion),
                         # cta, site-footer
    ui/                  # button, container, logo, reveal, section-heading, store-badge
    notify-form.tsx      # email capture form (client)
  lib/                   # site config, faq data, utils
brand/                   # source logo (svg + png)
```

## Customizing

- **Brand assets:** replace `public/hover-logo.*` and `brand/hover-logo.*`. The
  inline mark lives in `src/components/ui/logo.tsx`; the OG mark in
  `src/app/opengraph-image.tsx`.
- **Copy / metadata:** `src/lib/site.ts` (name, tagline, description, keywords,
  social handles) and `src/lib/faq.ts`.
- **Waitlist storage:** `src/app/api/notify/route.ts` currently appends to a
  local `.data/waitlist.jsonl` (gitignored). Swap the `persist()` function for
  Resend / Mailchimp / a database — the route contract stays the same. A Resend
  example is commented in the file.

## Notes / TODO before launch

- **Imagery:** the page is intentionally typographic + brand-mark driven (no
  stock photos, per the B&W brief). Add real app screenshots / product shots
  once the mobile app screens exist.
- **Legal:** footer links to `/privacy` and `/terms` — create those routes.
- **Store links:** badges currently scroll to the notify form. Point them at the
  real App Store / Google Play URLs at launch (`src/components/ui/store-badge.tsx`).
