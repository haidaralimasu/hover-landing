import Link from "next/link";
import { cn } from "@/lib/utils";

function AppleGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 384 512"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zM262.1 104.5c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M47 27.3C39.6 31.9 35 40.2 35 51.4v409.2c0 11.2 4.6 19.5 12 24.1L279 256 47 27.3zm293.2 165.6-58.6-33.9L104.6 335.9l176-77.1-58.6-33.9-.2-.2 118.4-31.6zm77.9 45-53.4-30.9-64.7 63.9 64.7 63.9 53.4-30.9c17-10 17-38 0-48zm-136.5 79.9-176.9-102.2 176.6 172.9 59-34.1-58.7-36.6z" />
    </svg>
  );
}

/**
 * "Coming soon" store badge. Not an outbound link yet (app is pre-launch),
 * so it anchors to the notify form instead of a dead store URL.
 */
export function StoreBadge({
  platform,
}: {
  platform: "ios" | "android";
}) {
  const label = platform === "ios" ? "App Store" : "Google Play";
  const Glyph = platform === "ios" ? AppleGlyph : PlayGlyph;

  return (
    <Link
      href="#notify"
      aria-label={`${label}: coming soon. Get notified at launch.`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-[14px] border border-line-2 bg-surface px-4 py-2.5",
        "transition-[transform,border-color,background-color] duration-150 [transition-timing-function:var(--ease-out-quart)]",
        "hover:border-white/25 hover:bg-surface-2 active:scale-[0.98]"
      )}
    >
      <Glyph className="h-6 w-6 text-ink-2 transition-colors group-hover:text-ink" />
      <span className="flex flex-col leading-tight text-left">
        <span className="text-[11px] font-medium tracking-wide text-ink-3">
          Coming soon on
        </span>
        <span className="text-[15px] font-semibold text-ink">{label}</span>
      </span>
    </Link>
  );
}
