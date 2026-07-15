import { createHmac, timingSafeEqual } from "node:crypto";
import { siteConfig } from "@/lib/site";

/**
 * One-click unsubscribe tokens (RFC 8058). We sign the subscriber's email with
 * a server-only secret so an unsubscribe link is valid ONLY for that address —
 * no one can unsubscribe someone else by guessing a URL.
 */
const SECRET = process.env.UNSUBSCRIBE_SECRET ?? "";

export function signEmail(email: string): string {
  return createHmac("sha256", SECRET)
    .update(email.trim().toLowerCase())
    .digest("base64url");
}

export function verifyToken(email: string, token: string): boolean {
  if (!SECRET || !email || !token) return false;
  const expected = signEmail(email);
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Public unsubscribe URL for a given email (used in the body + headers). */
export function unsubscribeUrl(email: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? siteConfig.url;
  const params = new URLSearchParams({ e: email, t: signEmail(email) });
  return `${base.replace(/\/$/, "")}/unsubscribe?${params.toString()}`;
}
