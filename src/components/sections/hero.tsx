import { Container } from "@/components/ui/container";
import { MobileAccessForm } from "@/components/mobile-access-form";
import { StoreBadges } from "@/components/store-badges";
import { siteConfig } from "@/lib/site";

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
            The fastest and cheapest way to get paid from abroad.
          </h1>

          <div className="mt-2 flex w-full max-w-md flex-col items-center gap-3">
            <MobileAccessForm
              cta="Get early access"
              note="Be first when the app launches. One email, no spam."
            />
            <p className="text-sm text-ink-3">
              Already can&apos;t wait?{" "}
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
              >
                Send money now in your browser
              </a>
            </p>
            <StoreBadges className="mt-1" />
          </div>
        </div>
      </Container>
    </section>
  );
}
