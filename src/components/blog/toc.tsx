import { cn } from "@/lib/utils";

type Item = { id: string; text: string; level: 2 | 3 };

function List({ items }: { items: Item[] }) {
  return (
    <ol className="space-y-2.5 text-sm leading-snug">
      {items.map((item) => (
        <li key={item.id} className={cn(item.level === 3 && "pl-4")}>
          <a
            href={`#${item.id}`}
            className={cn(
              "block text-ink-2 transition-colors hover:text-ink",
              item.level === 2 && "font-medium"
            )}
          >
            {item.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Collapsible on mobile, sticky sidebar on large screens. Pure HTML, no JS. */
export function Toc({ items }: { items: Item[] }) {
  return (
    <>
      <details className="rounded-[var(--radius-card)] border border-line bg-bg-2 p-5 lg:hidden">
        <summary className="text-sm font-semibold text-ink">In this article</summary>
        <nav aria-label="Table of contents" className="mt-4">
          <List items={items} />
        </nav>
      </details>
      <nav aria-label="Table of contents" className="sticky top-24 hidden max-h-[calc(100vh-8rem)] overflow-y-auto lg:block">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">
          In this article
        </p>
        <List items={items} />
      </nav>
    </>
  );
}
