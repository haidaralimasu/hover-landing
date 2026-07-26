"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

/** Great-circle-style arcs between a few fixed points, evoking a global
 *  transfer network without claiming to be an actual accurate map. Purely
 *  decorative, sits behind the flag marquee. Draws in once on scroll. */
const arcs = [
  "M 60 140 Q 260 20 460 120",
  "M 120 60 Q 340 160 620 70",
  "M 40 40 Q 300 220 780 60",
  "M 220 180 Q 480 40 760 160",
];

const nodes = [
  { x: 60, y: 140 },
  { x: 460, y: 120 },
  { x: 120, y: 60 },
  { x: 620, y: 70 },
  { x: 780, y: 60 },
  { x: 760, y: 160 },
];

export function GlobeNetwork({ className }: { className?: string }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<SVGSVGElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  return (
    <svg
      ref={ref}
      viewBox="0 0 840 220"
      aria-hidden="true"
      className={className}
      preserveAspectRatio="xMidYMid slice"
    >
      {arcs.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          fill="none"
          stroke="var(--color-line-2)"
          strokeWidth={1}
          strokeLinecap="round"
          initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
          animate={
            inView
              ? { pathLength: 1, opacity: 0.5 }
              : reduce
                ? { pathLength: 1, opacity: 0.5 }
                : undefined
          }
          transition={{ duration: 1.6, delay: i * 0.15, ease: EASE_EXPO }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={3}
          fill="var(--color-ink-3)"
          initial={reduce ? { opacity: 0.6 } : { opacity: 0, scale: 0 }}
          animate={
            inView
              ? { opacity: 0.6, scale: 1 }
              : reduce
                ? { opacity: 0.6, scale: 1 }
                : undefined
          }
          transition={{ duration: 0.5, delay: 0.6 + i * 0.08, ease: EASE_EXPO }}
        />
      ))}
    </svg>
  );
}
