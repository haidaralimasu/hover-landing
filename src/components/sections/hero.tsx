import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { NotifyForm } from "@/components/notify-form";
import { HeroFlagBackdrop } from "@/components/ui/app-hero-visual";

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
            className="max-w-3xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl"
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

          <Reveal delay={0.18} className="w-full max-w-md">
            <NotifyForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
