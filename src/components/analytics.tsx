"use client";

import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 — loaded on every visit, independent of the cookie
 * banner choice (accept/reject only affects the banner's own UI state).
 */
export function Analytics() {
  if (!GA_ID) return null;

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
