import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/unsubscribe";
import { getResend, setNewsletterSubscribed } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Records an unsubscribe. Reached two ways:
 *  - POST with `List-Unsubscribe=One-Click` body (RFC 8058) — mail clients
 *    (Gmail/Apple Mail) call this directly from the "Unsubscribe" chip.
 *  - POST from our own /unsubscribe page (fetch).
 * Either way the email must carry a valid HMAC token.
 */
export async function POST(request: Request) {
  let email = "";
  let token = "";

  const url = new URL(request.url);
  email = (url.searchParams.get("e") ?? "").trim().toLowerCase();
  token = url.searchParams.get("t") ?? "";

  // RFC 8058 one-click sends `List-Unsubscribe=One-Click` as form data; some
  // clients keep the token in the query string (above). Fall back to the body.
  if (!email || !token) {
    try {
      const form = await request.formData();
      email = email || String(form.get("e") ?? "").trim().toLowerCase();
      token = token || String(form.get("t") ?? "");
    } catch {
      /* no form body — rely on query params */
    }
  }

  if (!verifyToken(email, token)) {
    return NextResponse.json({ error: "Invalid or expired link." }, { status: 400 });
  }

  try {
    await setNewsletterSubscribed(getResend(), email, false);
  } catch (err) {
    console.error("[unsubscribe] failed to record", err);
    return NextResponse.json({ error: "Could not process." }, { status: 500 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
