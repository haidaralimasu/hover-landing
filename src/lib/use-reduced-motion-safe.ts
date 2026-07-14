"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Server (and the hydration render) always sees "no preference", so the first
// client render matches the SSR HTML; the real value applies right after.
function getServerSnapshot() {
  return false;
}

/**
 * Hydration-safe reduced-motion preference.
 *
 * `useReducedMotion()` can return `true` on a reduced-motion client's first
 * render while the server rendered `false`, which mismatches the HTML whenever
 * the value branches rendered DOM or inline styles. `useSyncExternalStore`
 * uses the server snapshot for hydration, so there is no mismatch.
 */
export function useReducedMotionSafe(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
