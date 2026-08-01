import { Check, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

const before: string[] = [
  "3–5 business days to arrive",
  "Fees hidden until after you send",
  "Paperwork and bank branch visits",
  "Cut off outside banking hours",
  "Recovery phrases you can lose forever",
  "Gas fees that spike without warning",
];

const after: string[] = [
  "Arrives in seconds",
  "Fee shown upfront, before you send",
  "Sign in with Google or Apple, done",
  "Works any time, any day",
  "No seed phrase — just Google or Apple sign-in",
  "Gas is sponsored, you never pay it",
];

function Row({ label, included }: { label: string; included: boolean }) {
  return (
    <li className="group flex items-start gap-3.5">
      <span
        className={
          included
            ? "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)] transition-all duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-110 group-hover:bg-[var(--color-success)] group-hover:text-white group-hover:shadow-[0_0_0_4px_var(--color-success-bg)]"
            : "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-[1.5px] border-[var(--color-danger)] bg-[var(--color-danger-bg)] text-[var(--color-danger)] transition-all duration-200 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-110 group-hover:bg-[var(--color-danger)] group-hover:text-white group-hover:shadow-[0_0_0_4px_var(--color-danger-bg)]"
        }
      >
        {included ? (
          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        ) : (
          <X className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
        )}
      </span>
      <span className={included ? "text-base text-ink" : "text-base text-ink-3"}>
        {label}
      </span>
    </li>
  );
}

export function BeforeAfter() {
  return (
    <section className="border-t border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          align="center"
          title="What changes when you switch to Hover."
          intro="The same transfer, without the wait, the fees, or the paperwork."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 sm:grid-cols-2">
          <Reveal className="rounded-[var(--radius-card)] border border-line bg-bg-2 p-9 sm:p-10">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-4">
              Before
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {before.map((label) => (
                <Row key={label} label={label} included={false} />
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={0.08}
            className="rounded-[var(--radius-card)] border border-line-2 bg-white p-9 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-ink-4">
              With Hover
            </p>
            <ul className="mt-6 flex flex-col gap-5">
              {after.map((label) => (
                <Row key={label} label={label} included />
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
