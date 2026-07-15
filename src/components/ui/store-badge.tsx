import Link from "next/link";
import { Apple, Play } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const Glyph = platform === "ios" ? Apple : Play;

  return (
    <Link
      href="#notify"
      aria-label={`${label}: coming soon. Get notified at launch.`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-[var(--radius-chip)] border border-line-2 bg-surface px-4 py-2.5",
        "transition-[transform,border-color,background-color] duration-150 [transition-timing-function:var(--ease-out-quart)]",
        "hover:border-black/25 hover:bg-surface-2 active:scale-[0.98]"
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
