import { Container } from "@/components/ui/container";
import { HoverMark } from "@/components/ui/logo";
import { MobileAccessForm } from "@/components/mobile-access-form";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section id="early-access" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <div className="relative overflow-hidden rounded-[24px] border border-line bg-bg-2 px-6 py-16 text-center sm:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-grid opacity-20 mask-radial-faded"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full bg-black/[0.05] blur-[110px]"
          />

          <div className="relative mx-auto flex max-w-xl flex-col items-center">
            <HoverMark className="h-12 w-12" />
            <h2 className="mt-8 text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl sm:tracking-[-0.022em] md:text-[2.75rem] md:tracking-[-0.025em]">
              Get Hover on your phone first.
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-ink-2">
              Leave your email and we&apos;ll send you the app the day it lands
              on iOS and Android.
            </p>

            <div className="mt-8 w-full max-w-md">
              <MobileAccessForm cta="Join the list" />
            </div>

            <p className="mt-6 text-sm text-ink-3">
              You don&apos;t have to wait to try it.{" "}
              <a
                href={siteConfig.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
              >
                Send money now in your browser
              </a>
            </p>

            {(siteConfig.betaLinks.ios || siteConfig.betaLinks.android) && (
              <p className="mt-2 text-sm text-ink-3">
                Or grab the beta build:{" "}
                {siteConfig.betaLinks.ios && (
                  <a
                    href={siteConfig.betaLinks.ios}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
                  >
                    iOS (TestFlight)
                  </a>
                )}
                {siteConfig.betaLinks.ios && siteConfig.betaLinks.android && " · "}
                {siteConfig.betaLinks.android && (
                  <a
                    href={siteConfig.betaLinks.android}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
                  >
                    Android (APK)
                  </a>
                )}
              </p>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
