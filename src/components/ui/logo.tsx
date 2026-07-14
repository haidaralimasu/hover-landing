import { cn } from "@/lib/utils";

/**
 * The Hover "H" mark — Hagalaz-rune glyph with the brand silver gradient
 * (#E3E3E3 -> #A3A3A3). Transparent background so it sits on any surface.
 * Sourced from brand/hover-logo.svg.
 */
export function HoverMark({
  className,
  title = "Hover",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 320 320"
      role="img"
      aria-label={title}
      className={cn("block", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="hoverMarkGradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="40"
          x2="0"
          y2="280"
        >
          <stop offset="0%" stopColor="var(--color-silver-1)" />
          <stop offset="100%" stopColor="var(--color-silver-2)" />
        </linearGradient>
      </defs>
      <g fill="url(#hoverMarkGradient)">
        <path d="M 60 40 L 116 40 L 116 280 L 60 280 Z" />
        <path d="M 204 40 L 260 40 L 260 280 L 204 280 Z" />
        <path d="M 60 128 L 260 192 L 260 234 L 60 170 Z" />
      </g>
    </svg>
  );
}

/** Mark + "Hover" wordmark lockup used in the header and footer. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <HoverMark className="h-7 w-7" />
      <span className="text-lg font-semibold tracking-tight text-ink">
        Hover
      </span>
    </span>
  );
}
