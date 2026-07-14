export type ClassValue = string | number | false | null | undefined;

/** Minimal class joiner — no extra deps (kept per the "framer-motion + lucide only" constraint). */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
