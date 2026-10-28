import { Fingerprint, ShieldCheck, UserCheck, type LucideIcon } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SecurityDiagram } from "@/components/sections/security-diagram";

const points: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: UserCheck,
    title: "Only you can approve a payment",
    body: "Every transfer needs your confirmation on your own device. No one at Hover can move your money for you. Keep your phone locked, since anyone with access to your unlocked device could approve a payment.",
  },
  {
    icon: Fingerprint,
    title: "Sign in with an account you already trust",
    body: "Use Google or Apple to sign in. There is no extra password to create, leak, or forget.",
  },
  {
    icon: ShieldCheck,
    title: "Every payment is signed by you",
    body: "Each transfer is signed on your device for one specific amount and recipient. Transfers can't be reversed, so always check the recipient before you confirm.",
  },
];

export function Security() {
  return (
    <section className="border-t border-line bg-bg-2/40 py-24 md:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col">
            <SectionHeading
              id="security"
              title="Serious about keeping your money safe."
              intro="You never have to think about how it works. Every payment needs your approval, on your own device."
            />

            <ul className="mt-10 flex flex-col gap-8">
              {points.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.07} as="li" className="flex gap-4">
                  <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-chip)] border border-line-2 bg-surface text-ink">
                    <p.icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-lg font-medium tracking-[-0.006em] text-ink">
                      {p.title}
                    </h3>
                    <p className="mt-2 max-w-lg text-pretty text-[15px] leading-relaxed text-ink-2">
                      {p.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>

          <Reveal delay={0.1} className="lg:pt-4">
            <SecurityDiagram />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
