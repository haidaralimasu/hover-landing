import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";

// Native <details>: every answer is in the server HTML, works without JS,
// is keyboard/screen-reader accessible, and browser find opens it. The
// shared `name` makes it an exclusive accordion (one open at a time).
export function FaqAccordion({ items }: { items: Faq[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => (
        <details key={item.q} name="faq" open={i === 0} className="group">
          <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-6 py-6 text-left [&::-webkit-details-marker]:hidden">
            <h3 className="text-[17px] font-medium tracking-[-0.005em] text-ink">{item.q}</h3>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-2 text-ink-2 transition-[transform,color] duration-200 [transition-timing-function:var(--ease-out-quart)] group-open:rotate-45 group-open:text-ink">
              <Plus className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 pr-12 text-pretty text-[15px] leading-relaxed text-ink-2">
            {item.a}
          </p>
        </details>
      ))}
    </div>
  );
}
