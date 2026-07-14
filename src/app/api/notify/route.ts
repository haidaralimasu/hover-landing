import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

// Runs on the Node.js runtime so the local-file fallback below works in dev.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = { email?: unknown };

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  const record = {
    email,
    ts: new Date().toISOString(),
    source: "landing",
  };

  try {
    await persist(record);
  } catch (err) {
    console.error("[notify] failed to persist signup", err);
    // Don't leak internals; the signup intent is what matters to the user.
    return NextResponse.json(
      { error: "We couldn't save that right now. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}

/**
 * Waitlist persistence.
 *
 * Default: append to a local JSONL file (works in local dev / a persistent
 * server). Swap this for your provider of choice before launch, e.g.:
 *
 *   - Resend audiences / Mailchimp / ConvertKit (POST to their API)
 *   - Postgres / Supabase (insert row)
 *   - A Google Sheet via an Apps Script webhook
 *
 * Only this function needs to change; the route contract stays the same.
 */
async function persist(record: { email: string; ts: string; source: string }) {
  // Example provider wiring (uncomment + set env vars):
  // if (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID) {
  //   const res = await fetch(
  //     `https://api.resend.com/audiences/${process.env.RESEND_AUDIENCE_ID}/contacts`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email: record.email }),
  //     }
  //   );
  //   if (!res.ok) throw new Error(`Resend responded ${res.status}`);
  //   return;
  // }

  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    path.join(dir, "waitlist.jsonl"),
    JSON.stringify(record) + "\n",
    "utf8"
  );
}
