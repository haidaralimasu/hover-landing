"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container } from "@/components/ui/container";
import { HoverMark } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { NotifyForm } from "@/components/notify-form";
import { StoreBadge } from "@/components/ui/store-badge";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotionSafe();

  return (
    <section className="relative overflow-hidden">
      {/* Backdrop: faint grid + radial glow, faded at the edges */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-grid opacity-[0.35] mask-radial-faded"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[120px]"
      />

      <Container className="relative">
        <div className="grid min-h-[100dvh] items-center gap-12 pb-16 pt-28 md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:pt-24">
          {/* Left: copy + conversion */}
          <div className="flex flex-col items-start">
            <Reveal
              as="span"
              className="inline-flex items-center rounded-full border border-line-2 bg-surface px-3.5 py-1.5 text-xs font-medium text-ink-2"
            >
              Launching soon on iOS &amp; Android
            </Reveal>

            {/* Sole H1 on the page, carrying the primary keyword */}
            <Reveal
              as="h1"
              delay={0.06}
              className="mt-6 max-w-xl text-balance text-4xl font-semibold leading-[1.02] tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              Send money across borders in seconds.
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-ink-2"
            >
              Sign in, choose an amount, and your money is on its way. Fast,
              secure, and refreshingly simple.
            </Reveal>

            <Reveal delay={0.18} className="mt-8 w-full max-w-md">
              <NotifyForm />
            </Reveal>

            <Reveal delay={0.24} className="mt-6 flex flex-wrap items-center gap-3">
              <StoreBadge platform="ios" />
              <StoreBadge platform="android" />
            </Reveal>
          </div>

          {/* Right: floating 3D brand mark */}
          <Reveal delay={0.15} className="relative hidden md:block">
            <HeroMark reduce={!!reduce} />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HeroMark({ reduce }: { reduce: boolean }) {
  // Pointer-driven 3D tilt via motion values (never React state — see 3.B).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 14,
  });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), {
    stiffness: 120,
    damping: 14,
  });
  const transform = useMotionTemplate`perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-md [transform-style:preserve-3d]"
      style={{ transform: reduce ? undefined : transform }}
    >
      {/* Glow behind the card */}
      <div
        aria-hidden="true"
        className="absolute inset-6 rounded-[32px] bg-white/[0.05] blur-3xl"
      />
      {/* Glass card */}
      <div className="relative flex h-full w-full items-center justify-center rounded-[32px] border border-line-2 bg-gradient-to-b from-white/[0.06] to-transparent shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[32px] bg-grid opacity-20 mask-radial-faded"
        />
        <motion.div
          style={{ transform: "translateZ(60px)" }}
          animate={reduce ? undefined : { y: [0, -10, 0] }}
          transition={
            reduce
              ? undefined
              : { duration: 6, repeat: Infinity, ease: easeOutExpo }
          }
        >
          <HoverMark className="h-40 w-40 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]" />
        </motion.div>
      </div>
    </motion.div>
  );
}
