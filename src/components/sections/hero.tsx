import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/store-badges";

/**
 * Hero: headline plus the app download links. Plain server markup.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.25] mask-radial-faded"
      />
      {/* Two slow-drifting soft glows at the edges, kept off the centred text
          (smaller on mobile) - monochrome, decorative only */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-blob absolute -left-32 top-[8%] h-[16rem] w-[16rem] rounded-full bg-black/[0.12] blur-[80px] sm:h-[28rem] sm:w-[28rem]" />
        <div className="hero-blob hero-blob-2 absolute -right-32 bottom-[6%] h-[14rem] w-[14rem] rounded-full bg-black/[0.10] blur-[80px] sm:h-[24rem] sm:w-[24rem]" />
      </div>

      <Container className="relative">
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-8 pb-16 pt-28 text-center md:pt-24">
          <div className="flex flex-col items-center gap-5">
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.03] tracking-[-0.025em] text-ink sm:text-5xl sm:tracking-[-0.028em] lg:text-6xl lg:tracking-[-0.032em]">
              Fastest way to get paid abroad.
            </h1>
            <p className="max-w-xl text-pretty text-lg leading-relaxed text-ink-2 sm:text-xl">
              Send and receive money instantly with no hidden charges. Supports
              150+ currencies.
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
