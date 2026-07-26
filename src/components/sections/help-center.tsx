import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { HelpCenterForm } from "@/components/help-center-form";

export function HelpCenter() {
  return (
    <section id="help" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <SectionHeading
            title="Still have a question?"
            intro="Send us a message and a real person on the team will get back to you at the email you provide."
          />

          <Reveal delay={0.1} className="rounded-[var(--radius-card)] border border-line bg-bg-2 p-6 sm:p-8">
            <HelpCenterForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
