import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlobeNetwork } from "@/components/ui/globe-network";
import { SUPPORTED_COUNTRIES_COUNT } from "@/lib/coverage";
import { FlagMarquee } from "@/components/sections/flag-marquee";

export function GlobalCoverage() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <GlobeNetwork className="pointer-events-none absolute inset-x-0 top-8 h-[220px] w-full opacity-[0.5] mask-radial-faded md:top-2" />

      <Container className="relative">
        <SectionHeading
          id="coverage"
          align="center"
          title={`Send to ${SUPPORTED_COUNTRIES_COUNT}+ countries, not just a few corridors.`}
          intro="Wherever they bank, wherever they live — if they can receive money, Hover can get it there."
        />
      </Container>

      <Reveal delay={0.1} className="relative mt-14 mask-x-faded">
        <FlagMarquee seconds={38} />
      </Reveal>
    </section>
  );
}
