import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/store-badges";

/**
 * Hero: freelancer-first headline plus the app download links. Plain server
 * markup. The headline is the LCP element, so it carries no opacity/entrance
 * animation (see globals.css reveal notes); the lime `accent-marker` is a
 * static background, not an animation.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 pb-16 pt-28 text-center md:pt-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl sm:tracking-[-0.028em] lg:text-6xl lg:tracking-[-0.032em]">
              Get paid by{" "}
              <span>clients abroad</span>.
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-2 sm:text-xl">
              Receive USD, EUR or GBP instantly and withdraw to your local bank account.
            </p>


          </div>

          <div className="mt-2 flex w-full max-w-md flex-col items-center gap-3">
            <p className="text-sm text-ink-3">Download the app</p>
            <StoreBadges className="mt-1" />
          </div>
        </div>
      </Container>
    </section>
  );
}
