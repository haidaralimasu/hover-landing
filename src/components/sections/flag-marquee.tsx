"use client";

import { useEffect, useState } from "react";
import { FLAG_NAMES } from "@/lib/coverage";
import { FLAG_XMLS, flagDataUri } from "@/lib/flags";

function FlagChip({ xml, name }: { xml: string; name: string }) {
  return (
    <span className="flex shrink-0 items-center gap-2.5 rounded-full border border-line bg-white py-2 pl-2 pr-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
      <span className="grid h-7 w-7 shrink-0 place-items-center overflow-hidden rounded-full ring-1 ring-black/[0.06]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagDataUri(xml)}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          draggable={false}
        />
      </span>
      <span className="whitespace-nowrap text-sm font-medium text-ink-2">{name}</span>
    </span>
  );
}

/**
 * The country-coverage marquee.
 *
 * SSR / no-JS / crawlers get ONE static set of chips — the country NAMES are
 * real on-page content next to "Send to 100+ countries" and worth indexing,
 * but 34 inlined data-URI flag SVGs (a doubled train, only needed for the
 * seamless CSS loop) were the single largest chunk of the served HTML.
 * After mount the client swaps in the doubled, animated train.
 */
export function FlagMarquee({ seconds = 38 }: { seconds?: number }) {
  const [animated, setAnimated] = useState(false);
  useEffect(() => setAnimated(true), []);

  const xmls = animated ? [...FLAG_XMLS, ...FLAG_XMLS] : FLAG_XMLS;
  const names = animated ? [...FLAG_NAMES, ...FLAG_NAMES] : FLAG_NAMES;

  return (
    <div className="relative overflow-hidden">
      <div
        className={
          "flex w-max items-center gap-3" + (animated ? " flag-lane-x" : "")
        }
        style={animated ? { animationDuration: `${seconds}s` } : undefined}
      >
        {xmls.map((xml, i) => (
          <FlagChip key={i} xml={xml} name={names[i]} />
        ))}
      </div>
    </div>
  );
}
