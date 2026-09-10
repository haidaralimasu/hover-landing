export const siteConfig = {
  name: "Hover",
  domain: "hover.money",
  // Canonical origin. The deployment serves from www (apex 308-redirects to
  // www), so every canonical / OG url / sitemap loc / robots Host must be www
  // too — a canonical pointing at a URL that redirects is a self-inflicted
  // indexation bug.
  url: "https://www.hover.money",
  tagline: "Send money across borders in seconds",
  // 150-160 chars, keyword-forward, for <meta name="description">
  description:
    "Hover is the simplest way to send money across borders. Sign in, choose an amount, and your money arrives in seconds. Fast, secure, and simple to use.",
  keywords: [
    "send money",
    "cross-border payments",
    "money transfer app",
    "international money transfer",
    "send money abroad",
    "instant money transfer",
    "secure payments",
    "sign in with Google",
  ],
  twitter: "@hover_money",
  // The live web app - no beta gate, no invite, no install. This is the
  // primary conversion action everywhere on the site now.
  appUrl: "https://app.hover.money",
  // Beta builds for people who want the native app before the public launch.
  // Set to null to hide the "get the beta" line. iOS = public TestFlight link,
  // android = direct .apk (Cloudflare) or Play internal-testing opt-in URL.
  betaLinks: {
    ios: "https://testflight.apple.com/join/yfPNFGFC" as string | null,
    android: null as string | null,
  },
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "How it works", href: "/#how-it-works" },
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
  { label: "FAQ", href: "/#faq" },
];
