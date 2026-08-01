import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
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
          <SectionHeading
            id="faq"
            title="Questions, answered."
            intro="The short version of how Hover keeps your money yours."
          />
          <Reveal delay={0.08}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
