"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/faq";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotionSafe();
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 py-6 text-left"
              >
                <span className="text-[17px] font-medium tracking-tight text-ink">
                  {item.q}
                </span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line-2 text-ink-2",
                    "transition-[transform,color,border-color] duration-200 [transition-timing-function:var(--ease-out-quart)]",
                    isOpen && "rotate-45 text-ink"
                  )}
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  key="content"
                  initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={
                    reduce ? { opacity: 1 } : { height: "auto", opacity: 1 }
                  }
                  exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[68ch] pb-6 pr-12 text-pretty text-[15px] leading-relaxed text-ink-2">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
