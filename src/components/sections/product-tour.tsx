"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";

type Step = {
  title: string;
  body: string;
};

const steps: Step[] = [
  {
    title: "Open the app",
    body: "Land straight on your Hover home screen, balance and recent activity, all in view.",
  },
  {
    title: "Tap Send",
    body: "Start an international money transfer in one tap, no menus to hunt through.",
  },
  {
    title: "Choose who gets paid",
    body: "Pick a saved recipient or add someone new in a few taps.",
  },
  {
    title: "Enter the amount",
    body: "Type how much to send and see the live exchange rate and fee before you confirm anything.",
  },
  {
    title: "Authenticate",
    body: "Confirm with Face ID or your passcode. Every transfer is verified before it moves.",
  },
  {
    title: "Sent",
    body: "Your transfer is trackable from the moment you send it to the moment it lands.",
  },
];

/** Product walkthrough: a looping GIF of the real app on the right,
 * SEO-readable step copy on the left. Steps are static — the GIF isn't
 * scrubbable the way the old synced video was (ponytail: static steps,
 * upgrade to a synced video again if the walkthrough gets re-recorded). */
export function ProductTour() {
  const frameRef = useRef<HTMLDivElement>(null);
  // The GIF is ~1 MB. Don't put it on the initial-load critical path (it
  // saturates a slow connection during LCP) — only mount it once the
  // section is near the viewport.
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setNearViewport(true);
      },
      { rootMargin: "800px 0px" }
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="how-it-works"
          eyebrow="See it in action"
          title="Select payee, enter amount, pay"
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: fully-readable step copy */}
          <ol className="flex flex-col gap-1">
            {steps.map((step, i) => (
              <li key={step.title}>
                <div className="w-full rounded-[var(--radius-card)] border border-transparent p-5">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-ink-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-medium tracking-[-0.006em] text-ink">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink-2">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          {/* Right: the actual product, in the same phone frame as the hero */}
          <Reveal
            delay={0.1}
            className="mx-auto w-full max-w-[280px] sm:max-w-[310px]"
          >
            <div
              ref={frameRef}
              aria-hidden="true"
              className="relative rounded-[54px] bg-gradient-to-b from-[#2a2a2a] to-[#0a0a0a] p-[11px] shadow-[0_50px_90px_-34px_rgba(0,0,0,0.45),0_8px_24px_-12px_rgba(0,0,0,0.3)]"
            >
              <div className="relative aspect-[300/620] overflow-hidden rounded-[44px] bg-black">
                {nearViewport && (
                  // eslint-disable-next-line @next/next/no-img-element -- animated GIF, next/image can't loop it
                  <img
                    src="/hover-flow.gif"
                    alt="Hover app demo: selecting a payee, entering an amount, and sending a payment"
                    className="h-full w-full object-cover"
                  />
                )}
                {/* Dynamic Island */}
                <div className="pointer-events-none absolute left-1/2 top-[9px] z-20 h-[26px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
                {/* Home indicator */}
                <div className="pointer-events-none absolute bottom-[7px] left-1/2 z-20 h-[4px] w-[104px] -translate-x-1/2 rounded-full bg-white/40" />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
