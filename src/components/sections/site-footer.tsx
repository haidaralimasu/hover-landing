import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/logo";
import { CookiePrefsLink } from "@/components/cookie-prefs-link";

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

function TelegramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.72 8.16-1.9 8.96c-.14.64-.52.8-1.05.5l-2.9-2.14-1.4 1.35c-.15.15-.28.28-.58.28l.21-2.96 5.4-4.88c.23-.21-.05-.33-.36-.12l-6.67 4.2-2.87-.9c-.62-.19-.63-.62.13-.92l11.22-4.32c.52-.19.97.12.8.9z" />
    </svg>
  );
}

function DiscordGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M20.317 4.37a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.056 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.099.246.197.373.291a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.076.076 0 0 0-.041.106c.36.698.772 1.363 1.225 1.994a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.055c.5-5.177-.838-9.673-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="currentColor">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

const socials = [
  { label: "Hover on X", href: "https://x.com/hover_money", Glyph: XGlyph },
  { label: "Hover on LinkedIn", href: "https://www.linkedin.com/company/hover_money", Glyph: LinkedInGlyph },
  { label: "Hover on Instagram", href: "https://www.instagram.com/tryhovermoney", Glyph: InstagramGlyph },
  { label: "Hover on Telegram", href: "https://t.me/hovermoney", Glyph: TelegramGlyph },
  { label: "Hover on Discord", href: "https://discord.gg/GA8fpTDsak", Glyph: DiscordGlyph },
];

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how-it-works" },
      { label: "Features", href: "/#features" },
      { label: "Security", href: "/#security" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Hover", href: "/company" },
      { label: "Help center", href: "/help" },
      { label: "Newsletter", href: "/newsletter" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container>
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Wordmark />
            <p className="max-w-xs text-sm leading-relaxed text-ink-3">
              The simplest way to send money across borders. Sign in, send, done.
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {socials.map(({ label, href, Glyph }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-12 w-12 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-black/25 hover:text-ink"
                >
                  <Glyph />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-4">
                {col.title}
              </p>
              {col.links.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-sm text-ink-2 transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>
          ))}
        </div>

        <div className="flex flex-col items-start justify-between gap-3 border-t border-line py-6 text-sm text-ink-4 sm:flex-row sm:items-center">
          <p>&copy; {new Date().getFullYear()} Hover Technologies LLC. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <CookiePrefsLink className="transition-colors hover:text-ink-2" />
            <p>Get paid from abroad, simply.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
