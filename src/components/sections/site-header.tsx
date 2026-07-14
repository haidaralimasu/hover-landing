"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Menu, X } from "lucide-react";
import { Wordmark } from "@/components/ui/logo";
import { Container } from "@/components/ui/container";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export function SiteHeader() {
  const reduce = useReducedMotionSafe();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 8;
    if (next !== scrolled) setScrolled(next);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-[var(--z-header)]">
      <div
        className={cn(
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled
            ? "border-b border-line bg-bg/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <Container>
          <nav
            aria-label="Primary"
            className="flex h-16 items-center justify-between gap-4"
          >
            <Link
              href="/"
              aria-label="Hover home"
              className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-silver-1)]"
            >
              <Wordmark />
            </Link>

            {/* Desktop nav with sliding hover indicator */}
            <ul
              className="hidden items-center md:flex"
              onMouseLeave={() => setHovered(null)}
            >
              {navItems.map((item) => (
                <li key={item.href} className="relative">
                  <Link
                    href={item.href}
                    onMouseEnter={() => setHovered(item.href)}
                    className="relative z-10 inline-flex items-center px-3.5 py-2 text-sm text-ink-2 transition-colors duration-150 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                  {hovered === item.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 -z-0 rounded-full bg-white/8"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 32 }
                      }
                    />
                  )}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Link
                href="#notify"
                className={cn(
                  "hidden rounded-full bg-silver px-4 py-2 text-sm font-medium text-[#0a0a0a] sm:inline-flex",
                  "shadow-[0_1px_0_rgba(255,255,255,0.4)_inset] transition-[transform,filter] duration-150",
                  "[transition-timing-function:var(--ease-out-quart)] hover:brightness-108 active:scale-[0.97]"
                )}
              >
                Get notified
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

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <Container>
              <ul className="flex flex-col py-3">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-lg px-3 py-3 text-base text-ink-2 hover:bg-white/5 hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="px-1 pt-2">
                  <Link
                    href="#notify"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-silver px-4 py-3 text-sm font-medium text-[#0a0a0a]"
                  >
                    Get notified
                  </Link>
                </li>
              </ul>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
