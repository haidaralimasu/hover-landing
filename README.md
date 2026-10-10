# Hover — Landing page

Marketing site for **Hover**, the simplest way to send
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
    newsletter/          # newsletter signup page (/waitlist redirects here)
    api/mobile-access/   # newsletter signup: saves Resend contact + welcome email
    api/unsubscribe/     # unsubscribe (page link + RFC 8058 one-click)
  components/
    sections/            # site-header, hero, foundations, how-it-works,
                         # features, security(+diagram), faq(+accordion),
                         # cta, site-footer
    ui/                  # button, container, logo, reveal, section-heading, store-badge
    mobile-access-form.tsx  # newsletter signup form (client)
    store-badges.tsx     # App Store / Google Play links (src/lib/site.ts appLinks)
  lib/                   # site config, faq data, utils
brand/                   # source logo (svg + png)
```

## Customizing

- **Brand assets:** replace `public/hover-logo.*` and `brand/hover-logo.*`. The
  inline mark lives in `src/components/ui/logo.tsx`; the OG mark in
  `src/app/opengraph-image.tsx`.
- **Copy / metadata:** `src/lib/site.ts` (name, tagline, description, keywords,
  social handles) and `src/lib/faq.ts`.
- **Subscribers:** stored as Resend contacts (`kind: "newsletter"`); unsubscribe
  sets the contact's `unsubscribed` flag. See `src/lib/waitlist.ts`.
- **App links:** `appLinks` in `src/lib/site.ts`.
