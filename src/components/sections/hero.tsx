import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { HeroFlagBackdrop } from "@/components/ui/app-hero-visual";
import { siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Backdrop: real flags flowing across borders (app motif), over a
          faint grid, faded toward the copy so it never fights the headline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial-faded"
      />
      <HeroFlagBackdrop />

      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-12 pb-16 pt-28 text-center md:pt-24">
          {/* Sole H1 on the page, carrying the primary keyword */}
          <Reveal
            as="h1"
            delay={0.06}
            className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-[-0.025em] text-ink sm:text-5xl sm:tracking-[-0.028em] lg:text-6xl lg:tracking-[-0.032em]"
          >
            Send money across borders in seconds.
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="max-w-md text-pretty text-lg leading-relaxed text-ink-2"
          >
            Sign in, choose an amount, and your money is on its way. Fast,
            secure, and refreshingly simple.
          </Reveal>

          <Reveal delay={0.18} className="flex flex-col items-center gap-4 sm:flex-row">
            <ButtonLink href={siteConfig.appUrl} target="_blank" rel="noopener noreferrer" size="lg" className="px-8">
              Open App
              <ArrowRight className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/#how-it-works" variant="ghost" size="lg">
              See how it works
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
