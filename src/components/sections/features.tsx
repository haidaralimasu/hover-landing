import {
  Fingerprint,
  Globe,
  Lock,
  Send,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { HoverMark } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

const lead: Feature = {
  icon: Send,
  title: "As simple as sending a message",
  body: "Enter an amount, pick who gets it, and tap send. That is the whole experience, start to finish.",
};

const rest: Feature[] = [
  {
    icon: Fingerprint,
    title: "Sign in, no password",
    body: "Use the Google or Apple account you already have. Nothing new to remember, nothing to reset.",
  },
  {
    icon: Globe,
    title: "Across borders in seconds",
    body: "Send to someone in another country as easily as someone next door, at any hour of any day.",
  },
  {
    icon: Wallet,
    title: "Clear, upfront fees",
    body: "See exactly what a transfer costs before you send. No hidden charges, no surprises later.",
  },
  {
    icon: Lock,
    title: "Your money, your control",
    body: "Only you can approve a payment. No one else can move your money, at any time, for any reason.",
  },
];

function FeatureIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-chip)] border border-line-2 bg-surface text-ink">
      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
    </span>
  );
}

export function Features() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="features"
          title="Everything you need to send money. Nothing you don't."
          intro="No jargon, no setup, no learning curve. Open the app, send money, done."
        />

        <div className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Lead cell — wide, with brand motif */}
          <Reveal
            className={cn(
              "relative flex flex-col justify-between overflow-hidden rounded-[var(--radius-card)]",
              "border border-line bg-gradient-to-br from-black/[0.04] to-transparent p-8",
              "md:col-span-4 md:min-h-[260px]"
            )}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -top-10 opacity-[0.06]"
            >
              <HoverMark className="h-56 w-56" />
            </div>
            <FeatureIcon icon={lead.icon} />
            <div className="relative mt-8 max-w-md">
              <h3 className="text-2xl font-medium tracking-tight text-ink">
                {lead.title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2">
                {lead.body}
              </p>
            </div>
          </Reveal>

          {/* First right cell */}
          <Reveal
            delay={0.06}
            className="flex flex-col justify-between rounded-[var(--radius-card)] border border-line bg-bg-2 p-8 md:col-span-2 md:min-h-[260px]"
          >
            <FeatureIcon icon={rest[0].icon} />
            <div className="mt-8">
              <h3 className="text-xl font-medium tracking-tight text-ink">
                {rest[0].title}
              </h3>
              <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2">
                {rest[0].body}
              </p>
            </div>
          </Reveal>

          {/* Bottom row — three equal-width cells */}
          {rest.slice(1).map((f, i) => (
            <Reveal
              key={f.title}
              delay={0.06 * (i + 1)}
              className="flex flex-col gap-6 rounded-[var(--radius-card)] border border-line bg-bg-2 p-8 md:col-span-2"
            >
              <FeatureIcon icon={f.icon} />
              <div>
                <h3 className="text-xl font-medium tracking-tight text-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-pretty text-[15px] leading-relaxed text-ink-2">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
