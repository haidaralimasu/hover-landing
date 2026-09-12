import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Real official App Store / Google Play badge assets (downloaded from
 * Apple's and Google's own badge asset URLs, not hand-drawn) - both
 * rendered at the same fixed box size so neither reads as more "official"
 * than the other. iOS points at the public TestFlight link, Android at the
 * direct .apk.
 */
export function StoreBadges({ className }: { className?: string }) {
  const { ios, android } = siteConfig.betaLinks;
  if (!ios && !android) return null;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {ios && (
        <a
          href={ios}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block h-[52px] w-[168px] transition-opacity duration-150 hover:opacity-90 active:opacity-85"
        >
          {/* Plain img, not next/image - the Next image optimizer refuses
              local SVGs by default (dangerouslyAllowSVG), not worth a
              config change for one small static badge. */}
          <img src="/badges/app-store.svg" alt="Download on the App Store" className="h-full w-full object-contain" />
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
