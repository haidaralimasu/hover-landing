"use client";

import { useEffect, useRef } from "react";

export type RevealTag =
  | "div"
  | "section"
  | "ul"
  | "li"
  | "p"
  | "span"
  | "h1"
  | "h2"
  | "h3";

/**
 * Scroll reveal, built as progressive enhancement.
 *
 * The element is FULLY VISIBLE by default (in SSR HTML and with JS disabled).
 * Only when the `.js` class is present AND motion is allowed does CSS hide it,
 * and an IntersectionObserver adds `.is-visible` to animate it in.
 * This guarantees the section never ships blank (headless renderers, crawlers,
 * slow hydration), per the taste-skill reveal rule.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (el.classList.contains("is-visible")) return;

    const io = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay
    ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties)
    : undefined;

  return (
    <Tag
      // @ts-expect-error — ref type varies per intrinsic tag; runtime is correct.
      ref={ref}
      data-reveal=""
      style={style}
      className={className}
    >
      {children}
    </Tag>
  );
}
