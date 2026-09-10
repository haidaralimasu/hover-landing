"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { navItems, siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Scroll state via one IntersectionObserver on a 1px sentinel — no scroll
  // listener, no framer-motion runtime on the critical path.
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { rootMargin: "-8px 0px 0px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" className="absolute top-0 h-px w-px" />
      <header className="fixed inset-x-0 top-0 z-[var(--z-header)]">
        <div className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "glass absolute inset-0 border-b border-line bg-bg/70 transition-[opacity,backdrop-filter] duration-300",
              scrolled ? "opacity-100 backdrop-blur-xl" : "opacity-0 backdrop-blur-none"
            )}
          />
          <Container className="relative">
            <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-4">
              <Link
                href="/"
                aria-label="Hover home"
                className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-silver-1)]"
              >
                <Wordmark />
              </Link>

              <ul className="hidden items-center md:flex">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative inline-flex items-center rounded-full px-3.5 py-2 text-sm text-ink-2 transition-colors duration-150 hover:bg-black/5 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2">
                <Link
                  href={siteConfig.appUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-white sm:inline-flex",
                    "transition-[transform,opacity] duration-150",
                    "[transition-timing-function:var(--ease-out-quart)] hover:opacity-90 active:scale-[0.97] active:opacity-85"
                  )}
                >
                  Open App
                </Link>

                <button
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink md:hidden active:scale-95"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </div>
            </nav>
          </Container>
        </div>

        {open && (
          <div className="glass animate-[slide-up-in_0.2s_var(--ease-out-expo)_both] border-b border-line bg-bg/95 backdrop-blur-xl md:hidden">
            <Container>
              <ul className="flex flex-col py-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base text-ink-2 hover:bg-black/5 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="px-1 pt-2">
                  <Link
                    href={siteConfig.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-ink px-4 py-3 text-sm font-medium text-white transition-opacity duration-150 hover:opacity-90 active:opacity-85"
                  >
                    Open App
                  </Link>
                </li>
              </ul>
            </Container>
          </div>
        )}
      </header>
    </>
  );
}
