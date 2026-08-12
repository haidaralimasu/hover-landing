import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/reveal";

/**
 * Section heading. `eyebrow` is intentionally optional and used sparingly
 * (max ~1 per 3 sections) to avoid the templated "kicker on every section" tell.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <Reveal className="font-mono text-xs uppercase tracking-[0.2em] text-ink-3">
          {eyebrow}
        </Reveal>
      ) : null}
      <Reveal
        as="h2"
        delay={eyebrow ? 0.06 : 0}
        className="max-w-2xl text-balance text-3xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-4xl sm:tracking-[-0.022em] md:text-[2.75rem] md:tracking-[-0.025em]"
      >
        <span id={id} className="scroll-mt-28">
          {title}
        </span>
      </Reveal>
      {intro ? (
        <Reveal
          as="p"
          delay={0.1}
          className={cn(
            "max-w-[60ch] text-pretty text-base leading-relaxed text-ink-2 sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
