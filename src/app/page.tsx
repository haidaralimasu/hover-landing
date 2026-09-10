import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { siteConfig } from "@/lib/site";

// Below-the-fold client sections — code-split so their JS (and the
// framer-motion runtime several of them pull) loads as a lazy chunk after
// the initial bundle, instead of blocking Time-to-Interactive / the
// simulated LCP estimate. SSR stays on (default) so the content is still
// in the crawlable HTML.
const ProductTour = dynamic(() =>
  import("@/components/sections/product-tour").then((m) => m.ProductTour)
);
const Stats = dynamic(() =>
  import("@/components/sections/stats").then((m) => m.Stats)
);
const GlobalCoverage = dynamic(() =>
  import("@/components/sections/global-coverage").then((m) => m.GlobalCoverage)
);
const Security = dynamic(() =>
  import("@/components/sections/security").then((m) => m.Security)
);
const Faq = dynamic(() => import("@/components/sections/faq").then((m) => m.Faq));
const Cta = dynamic(() => import("@/components/sections/cta").then((m) => m.Cta));

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: siteConfig.name,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android, Web",
  description: siteConfig.description,
  url: siteConfig.url,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

// FAQPage JSON-LD lives with the FAQ section (single source). WebSite adds a
// stable entity for search + AI answer engines to anchor to.
const webSiteLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <ProductTour />
      <HowItWorks />
      <Stats />
      <GlobalCoverage />
      <Features />
      <Security />
      <Faq />
      <Cta />
    </main>
  );
}
