import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

/**
 * App-store-style download badges for the beta builds. iOS points at the
 * public TestFlight link, Android at the direct .apk. Rendered only for the
 * links that are set in siteConfig.betaLinks — monochrome to match the brand.
 */
export function StoreBadges({ className }: { className?: string }) {
  const { ios, android } = siteConfig.betaLinks;
  if (!ios && !android) return null;

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-3", className)}>
      {ios && (
        <Badge
          href={ios}
          top="Test on"
          bottom="TestFlight"
          icon={
            <svg viewBox="0 0 384 512" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
          }
        />
      )}
      {android && (
        <Badge
          href={android}
          top="Download the"
          bottom="Android APK"
          icon={
            <svg viewBox="0 0 576 512" className="h-6 w-6" fill="currentColor" aria-hidden="true">
              <path d="M420.6 301.9a24 24 0 1 1 24-24 24 24 0 0 1-24 24m-265.1 0a24 24 0 1 1 24-24 24 24 0 0 1-24 24m273.7-144.5 47.9-83a10 10 0 1 0-17.3-10l-48.5 84.1a301.3 301.3 0 0 0-246.6 0l-48.5-84.1a10 10 0 1 0-17.3 10l47.9 83C34.3 202.8 5.3 254.7 0 312h576c-5.3-57.3-34.3-109.2-146.8-154.6" />
            </svg>
          }
        />
      )}
    </div>
  );
}

function Badge({
  href,
  top,
  bottom,
  icon,
}: {
  href: string;
  top: string;
  bottom: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-xl bg-ink px-4 py-2.5 text-white",
        "transition-opacity duration-150 hover:opacity-90 active:opacity-85"
      )}
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex flex-col leading-none">
        <span className="text-[10px] font-normal uppercase tracking-wide text-white/70">
          {top}
        </span>
        <span className="mt-0.5 text-[15px] font-semibold tracking-[-0.01em]">
          {bottom}
        </span>
      </span>
    </a>
  );
}
