import { Hero } from "@/components/sections/hero";
import { ProductTour } from "@/components/sections/product-tour";
import { Stats } from "@/components/sections/stats";
import { Foundations } from "@/components/sections/foundations";
import { HowItWorks } from "@/components/sections/how-it-works";
import { GlobalCoverage } from "@/components/sections/global-coverage";
import { Features } from "@/components/sections/features";
import { BeforeAfter } from "@/components/sections/before-after";
import { Security } from "@/components/sections/security";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";
import { siteConfig } from "@/lib/site";
import { faqs } from "@/lib/faq";

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

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <ProductTour />
      <Stats />
      <Foundations />
      <HowItWorks />
      <GlobalCoverage />
      <Features />
      <BeforeAfter />
      <Security />
      <Faq />
      <Cta />
    </main>
  );
}
