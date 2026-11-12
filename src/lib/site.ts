export const siteConfig = {
  name: "Hover",
  domain: "hover.money",
  // Canonical origin. The deployment serves from www (apex 308-redirects to
  // www), so every canonical / OG url / sitemap loc / robots Host must be www
  // too — a canonical pointing at a URL that redirects is a self-inflicted
  // indexation bug.
  url: "https://www.hover.money",
  tagline: "Get paid by clients abroad",
  // 150-160 chars, keyword-forward, for <meta name="description">
  description:
    "Get paid by clients abroad in USD, EUR or GBP. Receive bank payments with virtual accounts, manage your balance and see transfer fees upfront in Hover.",
  keywords: [
    "get paid in USD",
    "get paid in EUR",
    "get paid in GBP",
    "freelancer payments app",
    "receive money from clients abroad",
    "payments app for remote workers",
    "international payments for freelancers",
    "cheap cross-border payments",
    "Payoneer alternative",
    "cash out USD to local currency",
    "instant money transfer",
    "send money abroad",
  ],
  twitter: "@hover_money",
  // App download links. Set to null to hide. iOS = App Store listing (live as
  // of 2026-11-12; country code omitted so Apple redirects each visitor to
  // their regional store), android = Google Play listing.
  appLinks: {
    ios: "https://apps.apple.com/app/hover-money/id6796756260" as string | null,
    android: "https://play.google.com/store/apps/details?id=money.hover.app" as string | null,
  },
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Accounts", href: "/#accounts" },
  { label: "Security", href: "/#security" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];
