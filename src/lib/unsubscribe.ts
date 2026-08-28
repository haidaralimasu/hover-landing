import { createHmac, timingSafeEqual } from "node:crypto";
import { siteConfig } from "@/lib/site";

/**
 * One-click unsubscribe tokens (RFC 8058). We sign the subscriber's email with
 * a server-only secret so an unsubscribe link is valid ONLY for that address —
 * no one can unsubscribe someone else by guessing a URL.
 *
 * No fallback on purpose: silently defaulting to an empty-string secret used
 * to let this module load fine and happily mint tokens signed with "" - every
 * unsubscribe link emailed out would look normal but be permanently
 * unverifiable (verifyToken's own `!SECRET` guard would reject it forever),
 * which is also a real CAN-SPAM/CASL compliance risk (notify's own comment
 * already notes those require a working unsubscribe path in every commercial
 * email). Fail loud at boot instead - found in review, 2026-08-03.
 */
const SECRET = (() => {
  const value = process.env.UNSUBSCRIBE_SECRET;
  if (!value) {
    throw new Error("UNSUBSCRIBE_SECRET must be set - no fallback, a missing secret would silently mint permanently-unverifiable unsubscribe links.");
  }
  return value;
})();

export function signEmail(email: string): string {
  return createHmac("sha256", SECRET)
    .update(email.trim().toLowerCase())
    .digest("base64url");
}

export function verifyToken(email: string, token: string): boolean {
  if (!email || !token) return false;
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
