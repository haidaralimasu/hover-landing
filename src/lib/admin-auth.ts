import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * A single shared password gates /admin — there's no per-founder account
 * system, and building one would be overkill for a two-person team. The
 * session cookie is a signed, self-expiring token (no server-side session
 * store needed): `${expiresAt}.${hmac(expiresAt)}`.
 *
 * Fails loud if the secret is missing (see unsubscribe.ts's own comment for
 * why a silent fallback here is a real security bug, not a convenience) —
 * but lazily, inside the functions that need it, not at module load. Next.js
 * evaluates this module at build time to collect route data for every API
 * route that imports it; a module-scope throw here crashes the whole build
 * even when no admin route is actually invoked (found in prod, 2026-09-30).
 */
function secret(): string {
  const value = process.env.ADMIN_SESSION_SECRET;
  if (!value) {
    throw new Error(
      "ADMIN_SESSION_SECRET must be set - no fallback, a missing secret would let a forged/empty-signature cookie pass verification."
    );
  }
  return value;
}

const COOKIE_NAME = "hover_admin_session";
const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function sign(payload: string): string {
  return createHmac("sha256", secret()).update(payload).digest("base64url");
}

export function checkAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_DASHBOARD_PASSWORD;
  if (!expected) {
    console.error("[admin-auth] ADMIN_DASHBOARD_PASSWORD is not set");
    return false;
  }
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function createAdminSessionToken(): string {
  const expiresAt = String(Date.now() + SESSION_LIFETIME_MS);
  return `${expiresAt}.${sign(expiresAt)}`;
}

export function verifyAdminSessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [expiresAt, sig] = token.split(".");
  if (!expiresAt || !sig) return false;
  if (Date.now() > Number(expiresAt)) return false;

  const expected = sign(expiresAt);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
export const ADMIN_COOKIE_MAX_AGE_SECONDS = SESSION_LIFETIME_MS / 1000;

/** Server Component helper. Returns true only for a currently-valid session. */
export async function hasAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifyAdminSessionToken(store.get(COOKIE_NAME)?.value);
}
