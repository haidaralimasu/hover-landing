import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Android = official Google Play badge to the live listing. iPhone is only on
 * TestFlight for now, so it gets a plain same-size button rather than Apple's
 * App Store badge (which would misstate where it goes).
 */
export function StoreBadges({ className }: { className?: string }) {
  const { ios, android } = siteConfig.appLinks;
  if (!ios && !android) return null;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {ios && (
        <a
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] w-[168px] items-center justify-center rounded-[10px] bg-ink text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 active:opacity-85"
        >
          iPhone on TestFlight
        </a>
      )}
      {android && (
        <a
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block h-[52px] w-[168px] transition-opacity duration-150 hover:opacity-90 active:opacity-85"
        >
          <img src="/badges/google-play.png" alt="Get it on Google Play" className="h-full w-full object-contain" />
        </a>
      )}
    </div>
  );
}
