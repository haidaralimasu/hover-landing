import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

/** Shared shell + typography for long-form legal pages (privacy, terms). */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <main className="pb-24 pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-sm text-ink-3">Last updated: {updated}</p>
          <div
            className={[
              "mt-12 flex flex-col gap-8",
              "[&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-ink",
              "[&_h2]:mb-3",
              "[&_p]:text-pretty [&_p]:leading-relaxed [&_p]:text-ink-2",
              "[&_a]:font-medium [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-ink-2",
              "[&_ul]:mt-3 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-5",
              "[&_li]:list-disc [&_li]:text-pretty [&_li]:leading-relaxed [&_li]:text-ink-2 [&_li]:marker:text-ink-4",
              "[&_section>p+p]:mt-3",
            ].join(" ")}
          >
            {children}
          </div>
        </div>
      </Container>
    </main>
  );
}
