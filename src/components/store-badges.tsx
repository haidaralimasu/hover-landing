import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * Official-style App Store / Google Play badges for the beta builds. iOS
 * points at the public TestFlight link, Android at the direct .apk.
 * Rendered only for the links that are set in siteConfig.betaLinks - both
 * badges share one fixed size so neither reads as more "official" than the
 * other.
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
          className="inline-flex h-[52px] w-[168px] items-center gap-2.5 rounded-xl bg-black px-3.5 text-white transition-opacity duration-150 hover:opacity-90 active:opacity-85"
        >
          <svg viewBox="0 0 384 512" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden="true">
            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
          </svg>
          <span className="flex flex-col justify-center leading-none">
            <span className="text-[10px] font-normal leading-tight text-white">Download on the</span>
            <span className="mt-0.5 text-[19px] font-semibold leading-tight tracking-[-0.01em]">App Store</span>
          </span>
        </a>
      )}
      {android && (
        <a
          href={android}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-[52px] w-[168px] items-center gap-2.5 rounded-xl bg-black px-3.5 text-white transition-opacity duration-150 hover:opacity-90 active:opacity-85"
        >
          {/* Google Play triangle mark, tri-color per the official badge. */}
          <svg viewBox="0 0 512 512" className="h-7 w-7 shrink-0" aria-hidden="true">
            <path fill="#00d2ff" d="M99 27C91 32 86 41 86 52v408c0 11 5 20 13 25L343 256z" />
            <path fill="#00f076" d="M99 27c4-2 9-3 14-3 5 0 10 1 14 4l171 98-95 95z" />
            <path fill="#ffd200" d="M298 221l95 95-95 95-95-95z" />
            <path fill="#ff3a44" d="M127 452c-4 3-9 4-14 4-5 0-10-1-14-3l171-99 95 95z" />
          </svg>
          <span className="flex flex-col justify-center leading-none">
            <span className="text-[10px] font-normal uppercase leading-tight tracking-wide text-white">GET IT ON</span>
            <span className="mt-0.5 text-[17px] font-semibold leading-tight tracking-[-0.01em]">Google Play</span>
          </span>
        </a>
      )}
    </div>
  );
}
