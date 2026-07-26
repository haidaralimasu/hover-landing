import { NextResponse } from "next/server";
import { Resend } from "resend";

// Runs on the Node.js runtime, matching the other mail-sending route (notify).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.NOTIFY_FROM ?? "Hover <noreply@hover.money>";
const HELP_TO = process.env.HELP_CENTER_TO ?? "tech@hover.money";
const MAX_LEN = 4000;

type Body = { name?: unknown; email?: unknown; message?: unknown };

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length > 120) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 422 });
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }
  if (!message || message.length > MAX_LEN) {
    return NextResponse.json(
      { error: `Please enter a message (up to ${MAX_LEN} characters).` },
      { status: 422 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[help] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "We couldn't send that right now. Please try again." },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);

  // Internal notification to the team — the action the user is waiting on.
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: HELP_TO,
      replyTo: email,
      subject: `Help center: ${name}`,
      html: `<p><strong>${escapeHtml(name)}</strong> &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(
        message
      ).replace(/\n/g, "<br/>")}</p>`,
      text: `${name} <${email}>\n\n${message}`,
    });
    if (error) {
      console.error("[help] Resend send to team failed", error);
      return NextResponse.json(
        { error: "We couldn't send that right now. Please try again." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[help] Resend request to team threw", err);
    return NextResponse.json(
      { error: "We couldn't send that right now. Please try again." },
      { status: 502 }
    );
  }

  // Confirmation to the user — best-effort, never fails the request the team
  // already received.
  resend.emails
    .send({
      from: FROM,
      to: email,
      replyTo: HELP_TO,
      subject: "We got your message",
      html: confirmationHtml(name),
      text: confirmationText(name),
    })
    .catch((err) => console.error("[help] confirmation email failed", err));

  return NextResponse.json({ ok: true }, { status: 201 });
}

function confirmationHtml(name: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>We got your message</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f2f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
            <tr>
              <td style="padding:0 4px 20px;">
                <span style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">Hover</span>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:20px;padding:40px;">
                <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">
                  Thanks, ${escapeHtml(name)}.
                </h1>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#5c5c5c;">
                  We got your message and someone from our team will reply to
                  this email address shortly.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 8px 0;">
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

function confirmationText(name: string) {
  return [
    `Thanks, ${name}.`,
    "",
    "We got your message and someone from our team will reply to this email address shortly.",
  ].join("\n");
}
