import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { NotifyForm } from "@/components/notify-form";
import {
  AppHomeScreen,
  HeroFlagBackdrop,
} from "@/components/ui/app-hero-visual";

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
        <div className="grid min-h-[100dvh] items-center gap-12 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pt-24">
          {/* Left: copy + conversion */}
          <div className="flex flex-col items-start">
            {/* Sole H1 on the page, carrying the primary keyword */}
            <Reveal
              as="h1"
              delay={0.06}
              className="max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Send money across borders in seconds.
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-2"
            >
              Sign in, choose an amount, and your money is on its way. Fast,
              secure, and refreshingly simple.
            </Reveal>

            <Reveal delay={0.18} className="mt-8 w-full max-w-md">
              <NotifyForm />
            </Reveal>
          </div>

          {/* Right: the app's real Home screen (self-orchestrated entrance) */}
          <div className="relative hidden md:block">
            <AppHomeScreen />
          </div>
        </div>
      </Container>
    </section>
  );
}
