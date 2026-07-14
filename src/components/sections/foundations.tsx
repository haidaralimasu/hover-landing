import { Fingerprint, ShieldCheck, Wallet, Zap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

const pillars = [
  { icon: Zap, label: "Sent in seconds" },
  { icon: ShieldCheck, label: "Protected end to end" },
  { icon: Fingerprint, label: "No password to remember" },
  { icon: Wallet, label: "Clear, upfront fees" },
];

export function Foundations() {
  return (
    <section aria-label="Why people choose Hover" className="border-y border-line">
      <Container>
        <Reveal>
          <ul className="grid grid-cols-2 divide-line md:grid-cols-4 md:divide-x">
            {pillars.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 px-1 py-6 md:justify-center md:px-6"
              >
                <Icon
                  className="h-5 w-5 shrink-0 text-ink-3"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-ink-2">{label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
