"use client";

import { openConsent } from "@/lib/consent";

/** Re-opens the cookie consent banner. Lives in the footer. */
export function CookiePrefsLink({ className }: { className?: string }) {
  return (
    <button type="button" onClick={() => openConsent()} className={className}>
      Cookie preferences
    </button>
  );
}
