import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { StatNumber } from "@/components/ui/stat-number";
import { coverageStats } from "@/lib/coverage";

export function Stats() {
  return (
    <section className="border-y border-line bg-bg-2 py-16 md:py-20">
      <Container>
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {coverageStats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={0.05 * i}
              className="flex flex-col items-center gap-1.5 text-center"
            >
              <p className="text-4xl font-semibold tracking-tight text-ink tabular-nums sm:text-5xl">
                <StatNumber value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-ink-2">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
