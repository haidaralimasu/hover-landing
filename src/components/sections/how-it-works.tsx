import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    n: "01",
    title: "Sign in",
    body: "Use the Google or Apple account you already have. No new password, no forms to fill out.",
  },
  {
    n: "02",
    title: "Choose amount and recipient",
    body: "Enter how much to send and who receives it, then confirm with a single tap. You see the fee up front.",
  },
  {
    n: "03",
    title: "Money is on its way",
    body: "Your payment is delivered in seconds and you can follow it the whole way, day or night.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="how-it-works"
          eyebrow="How it works"
          title="Three steps. That's the whole thing."
          intro="Sending money should feel as easy as sending a message. With Hover, it does."
        />

        <div className="relative mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line md:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal
              key={step.n}
              delay={i * 0.08}
              className="relative flex flex-col gap-4 bg-bg-2 p-8"
            >
              <span className="font-mono text-sm text-ink-4">{step.n}</span>
              <h3 className="text-xl font-medium tracking-tight text-ink">
                {step.title}
              </h3>
              <p className="text-pretty text-[15px] leading-relaxed text-ink-2">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
