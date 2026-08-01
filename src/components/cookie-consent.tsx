"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  getConsent,
  setConsent,
  CONSENT_OPEN_EVENT,
  type Consent,
} from "@/lib/consent";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * Cookie consent banner. Shows on first visit (no stored decision) and can be
 * re-opened from the footer's "Cookie preferences" link. Nothing is tracked
 * until the visitor clicks "Accept" — see @/components/analytics.
 */
export function CookieConsent() {
  const reduce = useReducedMotionSafe();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (getConsent() === null) setOpen(true);
    const onOpen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, onOpen);
  }, []);

  function choose(value: Consent) {
    setConsent(value);
    setOpen(false);
  }

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-label="Cookie consent"
          aria-live="polite"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-[var(--z-overlay)] px-4 pb-4 sm:px-6 sm:pb-6"
        >
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-[var(--radius-card)] border border-line-2 bg-bg/90 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <p className="text-[13.5px] leading-relaxed text-ink-2">
              We use cookies to understand how the site is used. Analytics only
              runs if you accept — reject and nothing is stored. See our{" "}
              <Link
                href="/privacy"
                className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="inline-flex h-10 items-center justify-center rounded-full border border-line-2 bg-surface px-4 text-sm font-medium text-ink transition-colors duration-150 hover:bg-surface-2"
              >
                Reject
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="inline-flex h-10 items-center justify-center rounded-full bg-ink px-5 text-sm font-medium text-white transition-[transform,opacity] duration-150 [transition-timing-function:var(--ease-out-quart)] hover:opacity-90 active:scale-[0.97] active:opacity-85"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
