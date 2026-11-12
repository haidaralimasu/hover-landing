import { Container } from "@/components/ui/container";
import { HoverMark } from "@/components/ui/logo";
import { MobileAccessForm } from "@/components/mobile-access-form";
import { StoreBadges } from "@/components/store-badges";

export function Cta() {
  return (
    <section id="newsletter" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[20px] border border-line bg-bg-2 px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <HoverMark className="h-12 w-12" />
            <h2 className="mt-8 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl sm:tracking-[-0.022em] md:text-[2.75rem] md:tracking-[-0.025em]">
              Get Hover on your phone.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-ink-2">
              Get the app for iPhone or Android.
            </p>

            <StoreBadges className="mt-8" />

            <div className="mt-10 w-full max-w-md border-t border-line pt-8">
              <p className="mb-4 text-sm text-ink-2">Get product updates by email.</p>
              <MobileAccessForm cta="Subscribe" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
