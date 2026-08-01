import Link from "next/link";
import { Container } from "@/components/ui/container";
import { Wordmark } from "@/components/ui/logo";
import { CookiePrefsLink } from "@/components/cookie-prefs-link";

function XGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z" />
    </svg>
  );
}

const columns: { title: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Features", href: "#features" },
      { label: "Security", href: "#security" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Help center", href: "#help" },
      { label: "Join the beta", href: "#notify" },
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
            <div className="mt-1 flex items-center gap-2">
              <a
                href="https://x.com/hover_money"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hover on X"
                className="grid h-9 w-9 place-items-center rounded-full border border-line-2 text-ink-2 transition-colors hover:border-black/25 hover:text-ink"
              >
                <XGlyph />
              </a>
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
          <p>&copy; {new Date().getFullYear()} Hover. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <CookiePrefsLink className="transition-colors hover:text-ink-2" />
            <p>Money across borders, in seconds.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
