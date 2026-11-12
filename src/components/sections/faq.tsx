import Link from "next/link";
import { Container } from "@/components/ui/container";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { faqs } from "@/lib/faq";

// FAQPage structured data — lets search engines and AI answer engines
// (Google rich results, ChatGPT/Perplexity browsing) surface these Q&As
// directly instead of only crawling the rendered accordion text.
const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export function Faq() {
  return (
    <section className="py-24 md:py-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqLd).replace(/</g, "\\u003c"),
        }}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 id="faq" className="scroll-mt-24 text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-4xl">Questions, answered.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-2">Accounts, payments and getting started.</p>
          </div>
          <div>
            <FaqAccordion items={faqs} />
            <p className="mt-6 text-sm text-ink-3">
              Who runs Hover, fees and partners:{" "}
              <Link href="/company" className="font-medium text-ink underline underline-offset-2">
                About Hover
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
