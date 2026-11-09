import Image from "next/image";
import type { Block } from "@/lib/blog/types";
import { Inline } from "@/lib/blog/inline";

const linkCls =
  "[&_a]:text-ink [&_a]:underline [&_a]:decoration-line-2 [&_a]:underline-offset-4 [&_a]:transition-colors hover:[&_a]:decoration-ink";

export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className={`text-[17px] leading-[1.75] text-ink-2 ${linkCls}`}>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} id={b.id} className="mt-14 scroll-mt-24 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} id={b.id} className="mt-10 scroll-mt-24 text-xl font-semibold leading-snug tracking-[-0.015em] text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="mt-5">
                <Inline text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="mt-5 list-disc space-y-3 pl-6 marker:text-ink-4">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="mt-5 list-decimal space-y-3 pl-6 marker:font-medium marker:text-ink-3">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <Inline text={it} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote key={i} className="mt-8 border-l-2 border-ink pl-5 text-xl font-medium leading-snug text-ink">
                <Inline text={b.text} />
              </blockquote>
            );
          case "callout":
            return (
              <aside key={i} className="mt-8 rounded-[var(--radius-card)] border border-line bg-bg-2 p-6">
                <p className="text-base font-semibold text-ink">{b.title}</p>
                <p className="mt-2 text-[16px] leading-relaxed">
                  <Inline text={b.text} />
                </p>
              </aside>
            );
          case "figure":
            return (
              <figure key={i} className="mt-8">
                <Image
                  src={b.src}
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  sizes="(min-width: 1024px) 672px, 100vw"
                  className="h-auto w-full rounded-[var(--radius-card)]"
                />
                <figcaption className="mt-3 text-sm leading-snug text-ink-3">{b.caption}</figcaption>
              </figure>
            );
          case "table":
            return (
              <figure key={i} className="mt-8">
                <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-[15px] leading-snug">
                    <caption className="sr-only">{b.caption}</caption>
                    <thead className="bg-bg-2 text-ink">
                      <tr>
                        {b.head.map((h) => (
                          <th key={h} scope="col" className="px-4 py-3 font-semibold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {b.rows.map((row, r) => (
                        <tr key={r} className="border-t border-line align-top">
                          {row.map((cell, c) => (
                            <td key={c} className={c === 0 ? "px-4 py-3 font-medium text-ink" : "px-4 py-3"}>
                              <Inline text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-3 text-sm leading-snug text-ink-3">
                  {b.caption}
                  {b.note ? `. ${b.note}` : "."}
                </figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
