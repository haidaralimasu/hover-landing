import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { WaitlistForm } from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "Join the waitlist",
  description:
    "Get early access to Hover: receive USDC from abroad and send it, with INR cash-out coming soon. No crypto jargon, just get paid.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  return (
    <main className="pb-24 pt-32 md:pt-40">
      <Container>
        <SectionHeading
          align="center"
          title="Get paid from abroad. INR cash-out is coming."
          intro="Join the waitlist for early access. Right now the beta lets you receive and send USDC without touching a crypto exchange."
        />

        <Reveal
          delay={0.1}
          className="mx-auto mt-12 max-w-xl rounded-[var(--radius-card)] border border-line bg-bg-2 p-7 sm:p-10"
        >
          <Suspense fallback={null}>
            <WaitlistForm />
          </Suspense>
        </Reveal>

      </Container>
    </main>
  );
}
