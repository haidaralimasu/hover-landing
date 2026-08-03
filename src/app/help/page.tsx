import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { HelpCenterForm } from "@/components/help-center-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Help Center",
  description: `Get in touch with the ${siteConfig.name} team.`,
  alternates: { canonical: "/help" },
};

export default function HelpPage() {
  return (
    <main className="pb-24 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          align="center"
          title="Get in touch"
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
            href="mailto:support@hover.money"
            className="text-ink-2 underline underline-offset-2 transition-colors hover:text-ink"
          >
            support@hover.money
          </a>
          .
        </p>
      </Container>
    </main>
  );
}
