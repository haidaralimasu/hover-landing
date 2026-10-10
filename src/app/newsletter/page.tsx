import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { MobileAccessForm } from "@/components/mobile-access-form";

export const metadata: Metadata = {
  title: "Join the newsletter",
  description:
    "Get Hover product updates, new features and product news in your inbox.",
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <main className="pb-24 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          align="center"
          title="Join the Hover newsletter."
          intro="Product updates, new features and product news. No spam, unsubscribe anytime."
        />

        <Reveal
          delay={0.1}
          className="mx-auto mt-12 max-w-xl rounded-[var(--radius-card)] border border-line bg-bg-2 p-7 sm:p-10"
        >
          <MobileAccessForm />
        </Reveal>

      </Container>
    </main>
  );
}
