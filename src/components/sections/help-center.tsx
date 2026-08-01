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

        <p className="mx-auto mt-6 max-w-3xl text-center text-sm text-ink-3">
          You can also reach us directly at{" "}
          <a
            href="mailto:haidaralimasu123@gmail.com"
            className="text-ink-2 underline underline-offset-2 transition-colors hover:text-ink"
          >
            haidaralimasu123@gmail.com
          </a>{" "}
          or{" "}
          <a
            href="mailto:mustakimkhan1111176@gmail.com"
            className="text-ink-2 underline underline-offset-2 transition-colors hover:text-ink"
          >
            mustakimkhan1111176@gmail.com
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
