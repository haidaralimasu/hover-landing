import { NextResponse } from "next/server";
import { Resend } from "resend";
import { ensureContactProperties, getContact, getResend } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const FROM = process.env.NOTIFY_FROM ?? "Hover <noreply@hover.money>";
const NOTIFY_TO = process.env.NOTIFY_TEAM_TO ?? "tech@hover.money";
const MAX_LEN = 2000;

type Body = {
  email?: unknown;
  confused?: unknown;
  broke?: unknown;
  wouldUseReal?: unknown; // "yes" | "maybe" | "no"
  wouldUseReason?: unknown;
};

function str(v: unknown, max = MAX_LEN) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = str(body.email, 254).toLowerCase();
  const confused = str(body.confused);
  const broke = str(body.broke);
  const wouldUseReal = ["yes", "maybe", "no"].includes(str(body.wouldUseReal))
    ? str(body.wouldUseReal)
    : "";
  const wouldUseReason = str(body.wouldUseReason);

  if (email && !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }
  if (!confused && !broke && !wouldUseReal) {
    return NextResponse.json({ error: "Please fill in at least one field." }, { status: 422 });
  }

  let resend: Resend;
  try {
    resend = getResend();
  } catch {
    return NextResponse.json({ error: "Not available right now." }, { status: 500 });
  }

  try {
    await resend.emails.send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email || undefined,
      subject: `Beta feedback${email ? `: ${email}` : " (anonymous)"}`,
      html: `<p><strong>From:</strong> ${email ? escapeHtml(email) : "anonymous"}</p>
        <p><strong>What confused you:</strong> ${escapeHtml(confused) || "—"}</p>
        <p><strong>What broke:</strong> ${escapeHtml(broke) || "—"}</p>
        <p><strong>Would use with real money:</strong> ${escapeHtml(wouldUseReal) || "—"} — ${escapeHtml(wouldUseReason) || "—"}</p>`,
      text: [
        `From: ${email || "anonymous"}`,
        `What confused you: ${confused || "—"}`,
        `What broke: ${broke || "—"}`,
        `Would use with real money: ${wouldUseReal || "—"} — ${wouldUseReason || "—"}`,
      ].join("\n"),
    });
  } catch (err) {
    console.error("[feedback] send failed", err);
    return NextResponse.json({ error: "Couldn't send that. Please try again." }, { status: 502 });
  }

  // Best-effort: if this email is already a known waitlist/beta contact,
  // fold the feedback into their record too, so the admin dashboard shows
  // it alongside their signup — never blocks the response.
  if (email) {
    ensureContactProperties(resend)
      .then(() => getContact(resend, email))
      .then((contact) => {
        if (!contact) return;
        return resend.contacts.update({
          email,
          properties: {
            lastFeedbackConfused: confused,
            lastFeedbackBroke: broke,
            lastFeedbackWouldUseReal: wouldUseReal,
          },
        });
      })
      .catch((err) => console.error("[feedback] contact update failed", err));
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
