"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";

import { CONSENT_CHANGE_EVENT, getConsent, type Consent } from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

function subscribe(onChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
}

/**
 * Google Analytics 4 — loaded ONLY after the visitor clicks "Accept" on the
 * cookie banner (opt-in, as the privacy policy states). Withdrawing consent
 * later flips GA's consent state to denied for the rest of the visit.
 */
export function Analytics() {
  const consent = useSyncExternalStore(subscribe, getConsent, () => null);
  useEffect(() => {
    const onChange = (e: Event) => {
      const w = window as unknown as { gtag?: (...args: unknown[]) => void };
      w.gtag?.("consent", "update", { analytics_storage: (e as CustomEvent<Consent>).detail });
    };
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      {/* lazyOnload: the GA script is ~170 KB of third-party JS and this is
          a marketing page — it must not compete with hydration or the LCP
          paint. It loads once the page is idle. */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="lazyOnload"
      />
      <Script id="ga-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', { analytics_storage: 'granted' });
          gtag('config', '${GA_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
