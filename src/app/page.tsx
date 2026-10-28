import dynamic from "next/dynamic";
import Link from "next/link";
import { Hero } from "@/components/sections/hero";
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
  operatingSystem: "iOS, Android",
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
      <section aria-labelledby="what-is-hover" className="border-t border-line py-16 md:py-20">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <h2 id="what-is-hover" className="text-2xl font-semibold tracking-[-0.015em] text-ink">
            What is Hover?
          </h2>
          <p className="mt-4 text-pretty leading-relaxed text-ink-2">
            Hover is a payments app for sending and receiving money across
            borders, operated by Hover Technologies LLC in the United States.
            Payments between Hover users are free and arrive in seconds, and
            you can add money from or withdraw to a US bank account.{" "}
            <Link href="/company" className="font-medium text-ink underline underline-offset-2">
              About Hover, fees and partners
            </Link>
          </p>
        </div>
      </section>
      <ProductTour />
      <GlobalCoverage />
      <Features />
      <Security />
      <Faq />
      <Cta />
    </main>
  );
}
