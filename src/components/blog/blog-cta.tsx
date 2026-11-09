import { ButtonLink } from "@/components/ui/button";

export function BlogCta({
  title = "Send and receive money across borders with Hover.",
  body = "Hover is a payments app for sending and receiving money across borders. Fees are shown before you confirm.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section
      aria-label="About Hover"
      className="flex flex-col items-start gap-6 rounded-[var(--radius-card)] border border-line bg-bg-2 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10"
    >
      <div className="max-w-xl">
        <h2 className="text-xl font-semibold leading-snug tracking-[-0.015em] text-ink sm:text-2xl">{title}</h2>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-2">{body}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/" size="lg">
          Explore Hover
        </ButtonLink>
        <ButtonLink href="/company" size="lg" variant="secondary">
          How fees work
        </ButtonLink>
      </div>
    </section>
  );
}
