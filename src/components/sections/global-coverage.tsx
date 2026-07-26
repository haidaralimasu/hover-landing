import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { GlobeNetwork } from "@/components/ui/globe-network";
import { SUPPORTED_COUNTRIES_COUNT, FLAG_NAMES } from "@/lib/coverage";
import { FLAG_XMLS, flagDataUri } from "@/lib/flags";

function FlagChip({ xml, name }: { xml: string; name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-black/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagDataUri(xml)}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-ink-2">{name}</span>
    </span>
  );
}

function FlagRow({ seconds }: { seconds: number }) {
  const train = [...FLAG_XMLS, ...FLAG_XMLS];
  const names = [...FLAG_NAMES, ...FLAG_NAMES];
  return (
    <div className="relative overflow-hidden">
      <div
        className="flag-lane-x flex w-max items-center gap-3"
        style={{ animationDuration: `${seconds}s` }}
      >
        {train.map((xml, i) => (
          <FlagChip key={i} xml={xml} name={names[i]} />
        ))}
      </div>
    </div>
  );
}

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
        <FlagRow seconds={38} />
      </Reveal>
    </section>
  );
}
