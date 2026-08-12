"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

type Step = {
  time: number;
  title: string;
  body: string;
};

// Timestamps (seconds) into /hover-flow.mp4, a ~15s screen recording of a
// single international transfer, start to finish.
const steps: Step[] = [
  {
    time: 0,
    title: "Open the app",
    body: "Land straight on your Hover home screen — balance and recent activity, all in view.",
  },
  {
    time: 1,
    title: "Tap Send",
    body: "Start an international money transfer in one tap, no menus to hunt through.",
  },
  {
    time: 3,
    title: "Choose who gets paid",
    body: "Pick a saved recipient or add someone new in a few taps.",
  },
  {
    time: 5,
    title: "Enter the amount",
    body: "Type how much to send and see the live exchange rate and fee before you confirm anything.",
  },
  {
    time: 8,
    title: "Authenticate",
    body: "Confirm with Face ID or your passcode — every transfer is verified before it moves.",
  },
  {
    time: 12,
    title: "Transaction done",
    body: "Your transfer is on its way, trackable from the moment you send it to the moment it lands.",
  },
];

/** Product walkthrough: live-recorded app footage on the right, synced,
 * SEO-readable step copy on the left. Loops with the video, indefinitely. */
export function ProductTour() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTimeUpdate = () => setTime(video.currentTime);
    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, []);

  // Only run the loop while it's actually on screen.
  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.35 }
    );
    io.observe(frame);
    return () => io.disconnect();
  }, []);

  const activeIndex = steps.reduce(
    (acc, step, i) => (time >= step.time ? i : acc),
    0
  );

  return (
    <section className="py-24 md:py-32">
      <Container>
        <SectionHeading
          id="how-it-works"
          eyebrow="See it in action"
          title="From open app to money sent, in seconds"
          intro="A real walk-through of sending an international money transfer with Hover — choose a recipient, enter an amount, confirm, done."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 grid items-center gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: synced, fully-readable step copy */}
          <ol className="flex flex-col gap-1">
            {steps.map((step, i) => {
              const active = i === activeIndex;
              return (
                <li key={step.title}>
                  <button
                    type="button"
                    onClick={() => {
                      const video = videoRef.current;
                      if (video) video.currentTime = step.time;
                    }}
                    className={cn(
                      "w-full rounded-[var(--radius-card)] border p-5 text-left transition-colors duration-500 motion-reduce:transition-none",
                      active
                        ? "border-line-2 bg-bg-2"
                        : "border-transparent hover:bg-bg-2/60"
                    )}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className={cn(
                          "font-mono text-xs transition-colors duration-500 motion-reduce:transition-none",
                          active ? "text-ink" : "text-ink-4"
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3
                        className={cn(
                          "text-lg font-medium tracking-[-0.006em] transition-colors duration-500 motion-reduce:transition-none",
                          active ? "text-ink" : "text-ink-3"
                        )}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 motion-reduce:transition-none",
                        active ? "mt-2 grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <p className="overflow-hidden text-pretty text-[15px] leading-relaxed text-ink-2">
                        {step.body}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
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
                <video
                  ref={videoRef}
                  src="/hover-flow.mp4"
                  className="h-full w-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
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
