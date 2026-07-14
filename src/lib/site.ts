export const siteConfig = {
  name: "Hover",
  domain: "hover.money",
  url: "https://hover.money",
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
  twitter: "@hovermoney",
} as const;

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Security", href: "#security" },
  { label: "FAQ", href: "#faq" },
];
