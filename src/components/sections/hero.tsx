import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { MobileAccessForm } from "@/components/mobile-access-form";
import { siteConfig } from "@/lib/site";

/**
 * Hero. Everything above the fold is plain server-rendered markup — no
 * scroll-reveal wrappers (they hydrate as client components for zero visual
 * payoff here and inflate Time-to-Interactive). Only the email form, which
 * genuinely needs interactivity, is a client island.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial-faded"
      />

      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-12 pb-16 pt-28 text-center md:pt-24">
          {/* Sole H1 — primary keyword, and the LCP element. */}
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl sm:tracking-[-0.028em] lg:text-6xl lg:tracking-[-0.032em]">
            Send money across borders in seconds.
          </h1>

          <p className="max-w-md text-pretty text-lg leading-relaxed text-ink-2">
            Sign in, choose an amount, and your money is on its way. Fast,
            secure, and refreshingly simple.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink
              href={siteConfig.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="px-8"
            >
              Open App
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="ghost" size="lg">
              See how it works
            </ButtonLink>
          </div>

          <div className="flex w-full max-w-sm flex-col items-center gap-3">
            <p className="text-sm text-ink-3">
              Prefer a native app? Get notified when iOS and Android are ready.
            </p>
            <MobileAccessForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
