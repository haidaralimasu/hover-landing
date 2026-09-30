import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getResend, listContactsByKind, upsertContact, type OutreachProperties } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CHANNELS = new Set([
  "x_dm",
  "linkedin",
  "telegram",
  "discord",
  "whatsapp",
  "in_person",
  "referral",
  "other",
]);
const DIRECTIONS = new Set(["receiving", "sending", "unknown"]);
const TRISTATE = new Set(["yes", "no", "pending"]);
const YESNO = new Set(["yes", "no"]);

export async function GET() {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  try {
    const resend = getResend();
    const rows = await listContactsByKind(resend, "outreach");
    return NextResponse.json({ rows });
  } catch (err) {
    console.error("[admin/outreach] list failed", err);
    return NextResponse.json({ error: "Failed to load." }, { status: 500 });
  }
}

type Body = {
  email?: unknown;
  name?: unknown;
  channel?: unknown;
  direction?: unknown;
  dateContacted?: unknown;
  replied?: unknown;
  signedUp?: unknown;
  activated?: unknown;
  notes?: unknown;
};

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = str(body.email, 254).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 422 });
  }

  const channel = CHANNELS.has(str(body.channel)) ? str(body.channel) : "other";
  const direction = DIRECTIONS.has(str(body.direction)) ? str(body.direction) : "unknown";
  const replied = TRISTATE.has(str(body.replied)) ? str(body.replied) : "pending";
  const signedUp = YESNO.has(str(body.signedUp)) ? str(body.signedUp) : "no";
  const activated = YESNO.has(str(body.activated)) ? str(body.activated) : "no";
  const dateContacted = str(body.dateContacted, 10) || new Date().toISOString().slice(0, 10);
  const notes = str(body.notes, 2000);
  const name = str(body.name, 120);

  try {
    const resend = getResend();
    await upsertContact(resend, {
      email,
      firstName: name || undefined,
      // Runtime-validated above against CHANNELS/DIRECTIONS/TRISTATE/YESNO;
      // cast past the literal-union type TS can't narrow a .has()-checked
      // string back to.
      properties: {
        kind: "outreach",
        channel,
        direction,
        dateContacted,
        replied,
        signedUp,
        activated,
        notes,
      } as unknown as OutreachProperties,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/outreach] upsert failed", err);
    return NextResponse.json({ error: "Save failed." }, { status: 502 });
  }
}
