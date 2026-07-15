"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  getConsent,
  CONSENT_CHANGE_EVENT,
  type Consent,
} from "@/lib/consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 — loaded ONLY when the visitor has granted consent.
 * Until then no gtag script is fetched and no analytics cookies are set, so a
 * visitor who rejects (or hasn't chosen) is never tracked.
 */
export function Analytics() {
  const [consent, setConsent] = useState<Consent | null>(null);

  useEffect(() => {
    setConsent(getConsent());
    const onChange = (e: Event) =>
      setConsent((e as CustomEvent<Consent>).detail);
    window.addEventListener(CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!GA_ID || consent !== "granted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
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
