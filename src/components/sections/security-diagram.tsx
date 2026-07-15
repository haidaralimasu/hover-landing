"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Fingerprint, Send, type LucideIcon } from "lucide-react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const nodes: { icon: LucideIcon; title: string; sub: string }[] = [
  { icon: Fingerprint, title: "Sign in securely", sub: "With Google or Apple" },
  { icon: BadgeCheck, title: "Confirm your payment", sub: "You approve every send" },
  { icon: Send, title: "Recipient gets paid", sub: "Delivered in seconds" },
];

export function SecurityDiagram() {
  const reduce = useReducedMotionSafe();

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg-2 p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15] mask-radial-faded"
      />
      <ol className="relative flex flex-col gap-4">
        {nodes.map((node, i) => (
          <li key={node.title} className="relative">
            {/* connector to next node */}
            {i < nodes.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute left-[27px] top-[56px] h-[calc(100%_-_8px)] w-px bg-line-2"
              >
                {!reduce && (
                  <motion.span
                    className="absolute left-1/2 top-0 h-6 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-silver-1 to-transparent"
                    initial={{ y: -24, opacity: 0 }}
                    animate={{ y: 48, opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5 + 0.3,
                    }}
                  />
                )}
              </span>
            )}
            <div className="relative flex items-center gap-4">
              <motion.span
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--radius-chip)] border border-line-2 bg-surface text-ink"
                animate={
                  reduce
                    ? undefined
                    : { borderColor: ["rgba(0,0,0,0.12)", "rgba(0,0,0,0.38)", "rgba(0,0,0,0.12)"] }
                }
                transition={
                  reduce
                    ? undefined
                    : { duration: 2.6, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }
                }
              >
                <node.icon className="h-6 w-6" strokeWidth={1.6} aria-hidden="true" />
              </motion.span>
              <div>
                <p className="text-[15px] font-medium text-ink">{node.title}</p>
                <p className="text-sm text-ink-3">{node.sub}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
