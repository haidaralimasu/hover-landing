import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { HelpCenterForm } from "@/components/help-center-form";

export function HelpCenter() {
  return (
    <section id="help" className="scroll-mt-28 py-24 md:py-32">
      <Container>
        <SectionHeading
          align="center"
          title="Still have a question?"
          intro="Send us a message and a real person on the team will get back to you at the email you provide."
        />

        <Reveal
          delay={0.1}
          className="mx-auto mt-12 max-w-3xl rounded-[var(--radius-card)] border border-line bg-bg-2 p-7 sm:p-10"
        >
          <HelpCenterForm />
        </Reveal>
      </Container>
    </section>
  );
}
