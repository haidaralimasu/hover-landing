import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";
import { Resend } from "resend";
import { unsubscribeUrl } from "@/lib/unsubscribe";

// Runs on the Node.js runtime so the local-file log below works in dev.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sender must be a verified domain in Resend. Overridable via env.
const FROM = process.env.NOTIFY_FROM ?? "Hover <noreply@hover.money>";
const REPLY_TO = process.env.NOTIFY_REPLY_TO ?? "tech@hover.money";
const NOTIFY_TO = process.env.NOTIFY_TEAM_TO ?? "tech@hover.money";
// CAN-SPAM / CASL require a physical postal address in every commercial email.
const COMPANY_ADDRESS =
  process.env.COMPANY_ADDRESS ?? "Hover, 1 Market Street, San Francisco, CA 94105";

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

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[mobile-access] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "We couldn't save that right now. Please try again." },
      { status: 500 }
    );
  }

  const unsub = unsubscribeUrl(email);

  // Send the confirmation email — this is the action the user is waiting on.
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "You're on the list for the Hover mobile app",
      html: confirmationHtml(unsub),
      text: confirmationText(unsub),
      headers: {
        // One-click unsubscribe (RFC 8058) — shows the native "Unsubscribe"
        // control in Gmail/Apple Mail and improves deliverability.
        "List-Unsubscribe": `<${unsub}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });

    if (error) {
      console.error("[mobile-access] Resend send failed", error);
      return NextResponse.json(
        { error: "We couldn't sign you up right now. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[mobile-access] Resend request threw", err);
    return NextResponse.json(
      { error: "We couldn't sign you up right now. Please try again." },
      { status: 502 }
    );
  }

  // Best-effort local log of who signed up (never blocks the response).
  logSignup({ email, ts: new Date().toISOString(), source: "landing" }).catch(
    (err) => console.error("[mobile-access] failed to log signup", err)
  );

  // Best-effort internal notification — never blocks the response the
  // visitor is already waiting on.
  new Resend(apiKey).emails
    .send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `New mobile access signup: ${email}`,
      html: `<p>New mobile access signup: <strong>${email}</strong></p>`,
      text: `New mobile access signup: ${email}`,
    })
    .catch((err) => console.error("[mobile-access] team notification failed", err));

  return NextResponse.json({ ok: true }, { status: 201 });
}

const PREHEADER =
  "You're on the list — we'll email you the moment the Hover app is ready on your phone.";

function confirmationHtml(unsub: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>You're on the Hover mobile access list</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f2f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
    <!-- Preheader: shown as the inbox preview, hidden in the body -->
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;height:0;width:0;">
      ${PREHEADER}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
    </div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
            <!-- Brand -->
            <tr>
              <td style="padding:0 4px 20px;">
                <span style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">Hover</span>
              </td>
            </tr>
            <!-- Card -->
            <tr>
              <td style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:20px;padding:40px;">
                <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">
                  You're on the list.
                </h1>
                <p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5c5c5c;">
                  We'll email you the moment the native iOS and Android apps
                  are ready to install. In the meantime, Hover works right now
                  in your browser at app.hover.money.
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding:24px 8px 0;">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#8a8a8a;">
                  You received this because you asked for mobile app access at hover.money.
                  If this wasn't you, you can safely
                  <a href="${unsub}" style="color:#5c5c5c;text-decoration:underline;">unsubscribe</a>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:#b0b0b0;">
                  &copy; ${new Date().getFullYear()} Hover. All rights reserved.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function confirmationText(unsub: string) {
  return [
    "You're on the list.",
    "",
    "We'll email you the moment the native iOS and Android apps are ready to install. In the meantime, Hover works right now in your browser at app.hover.money.",
    "",
    "—",
    "You received this because you asked for mobile app access at hover.money.",
    `Unsubscribe: ${unsub}`,
    COMPANY_ADDRESS,
  ].join("\n");
}

/**
 * Best-effort local record of signups (dev / persistent server only).
 * Serverless read-only filesystems will throw here — that's fine, it's caught
 * by the caller and never affects the user-facing response.
 */
async function logSignup(record: { email: string; ts: string; source: string }) {
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(
    path.join(dir, "mobile-access.jsonl"),
    JSON.stringify(record) + "\n",
    "utf8"
  );
}
