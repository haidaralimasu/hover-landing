import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/store-badges";

/**
 * Hero. The one job: get the email. Plain server markup above the fold — the
 * form is the only client island.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial-faded"
      />

      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 pb-16 pt-28 text-center md:pt-24">
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl sm:tracking-[-0.028em] lg:text-6xl lg:tracking-[-0.032em]">
            Fastest way to get paid abroad.
          </h1>

          <div className="mt-2 flex w-full max-w-md flex-col items-center gap-3">
            <p className="text-sm text-ink-3">Download the app</p>
            <StoreBadges className="mt-1" />
          </div>
        </div>
      </Container>
    </section>
  );
}
