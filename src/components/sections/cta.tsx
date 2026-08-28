import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { HoverMark } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

export function Cta() {
  return (
    <section id="open-app" className="scroll-mt-24 py-24 md:py-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-[24px] border border-line bg-bg-2 px-6 py-16 text-center sm:px-12 md:py-24">
          {/* backdrop */}
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
              Ready to send with Hover?
            </h2>
            <p className="mt-4 max-w-md text-pretty text-lg leading-relaxed text-ink-2">
              No download, no waitlist. Sign in with Google and your money is
              on its way in seconds.
            </p>

            <div className="mt-8">
              <ButtonLink href={siteConfig.appUrl} size="lg" className="px-8">
                Open App
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
