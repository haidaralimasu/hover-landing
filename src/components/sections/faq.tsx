import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { faqs } from "@/lib/faq";

export function Faq() {
  return (
    <section className="py-24 md:py-32">
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
