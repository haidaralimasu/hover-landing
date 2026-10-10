import { NextResponse } from "next/server";
import {
  generateReferralCode,
  getContact,
  getResend,
  upsertContact,
  type WaitlistProperties,
} from "@/lib/waitlist";
import { unsubscribeUrl } from "@/lib/unsubscribe";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FROM = process.env.NOTIFY_FROM ?? "Hover <noreply@hover.money>";
const REPLY_TO = process.env.NOTIFY_REPLY_TO ?? "tech@hover.money";
const NOTIFY_TO = process.env.NOTIFY_TEAM_TO ?? "tech@hover.money";
const COMPANY_ADDRESS =
  process.env.COMPANY_ADDRESS ?? "Hover, 1 Market Street, San Francisco, CA 94105";

const ROLES = new Set(["founder", "freelancer", "other"]);
const DEVICES = new Set(["ios", "android", "other"]);

type Body = {
  email?: unknown;
  name?: unknown;
  role?: unknown;
  paidToday?: unknown;
  monthlyAmount?: unknown;
  provider?: unknown;
  device?: unknown;
  wantsBetaNow?: unknown;
  ref?: unknown;
  utmSource?: unknown;
  utmMedium?: unknown;
  utmCampaign?: unknown;
};

function str(v: unknown, max = 200): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = str(body.email, 254).toLowerCase();
  const name = str(body.name, 120);
  const role = ROLES.has(str(body.role)) ? (str(body.role) as WaitlistProperties["role"]) : "other";
  const device = DEVICES.has(str(body.device)) ? (str(body.device) as WaitlistProperties["device"]) : "other";
  const paidToday = str(body.paidToday, 300);
  const monthlyAmount = str(body.monthlyAmount, 100);
  const provider = str(body.provider, 100);
  const wantsBetaNow = body.wantsBetaNow === true ? "yes" : "no";
  const referredBy = str(body.ref, 32);
  const utmSource = str(body.utmSource, 100);
  const utmMedium = str(body.utmMedium, 100);
  const utmCampaign = str(body.utmCampaign, 100);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 422 }
    );
  }

  let resend: ReturnType<typeof getResend>;
  try {
    resend = getResend();
  } catch {
    console.error("[waitlist] RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "We couldn't save that right now. Please try again." },
      { status: 500 }
    );
  }

  let referralCode: string;
  let betaStatus: WaitlistProperties["betaStatus"];
  let created: boolean;

  try {
    const existing = await getContact(resend, email);
    referralCode = (existing?.properties.referralCode as string) || generateReferralCode();
    betaStatus =
      (existing?.properties.betaStatus as WaitlistProperties["betaStatus"]) ??
      (wantsBetaNow === "yes" ? "invited" : "waitlisted");

    const result = await upsertContact(resend, {
      email,
      firstName: name || undefined,
      properties: {
        kind: "waitlist",
        role,
        paidToday,
        monthlyAmount,
        provider,
        device,
        wantsBetaNow,
        betaStatus,
        referralCode,
        referredBy: existing?.properties.referredBy ? String(existing.properties.referredBy) : referredBy,
        referralCount: Number(existing?.properties.referralCount ?? 0),
        utmSource: existing?.properties.utmSource ? String(existing.properties.utmSource) : utmSource,
        utmMedium: existing?.properties.utmMedium ? String(existing.properties.utmMedium) : utmMedium,
        utmCampaign: existing?.properties.utmCampaign ? String(existing.properties.utmCampaign) : utmCampaign,
      },
    });
    created = result.created;

    // First-time referral credit only — don't re-credit on every re-submit.
    if (created && referredBy) {
      await bumpReferralCount(resend, referredBy);
    }
  } catch (err) {
    console.error("[waitlist] Resend contact upsert failed", err);
    return NextResponse.json(
      { error: "We couldn't save that right now. Please try again." },
      { status: 502 }
    );
  }

  const unsub = unsubscribeUrl(email);
  const referralLink = `${siteConfig.url}/waitlist?ref=${referralCode}`;

  resend.emails
    .send({
      from: FROM,
      to: email,
      replyTo: REPLY_TO,
      subject: "You're on the Hover waitlist",
      html: confirmationHtml({ name, wantsBetaNow, device, referralLink, unsub }),
      text: confirmationText({ name, wantsBetaNow, device, referralLink, unsub }),
      headers: {
        "List-Unsubscribe": `<${unsub}>, <mailto:${REPLY_TO}?subject=unsubscribe>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    })
    .catch((err) => console.error("[waitlist] confirmation email failed", err));

  resend.emails
    .send({
      from: FROM,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `New waitlist signup: ${email}${wantsBetaNow === "yes" ? " (wants beta)" : ""}`,
      html: `<p>${email} — role: ${role}, device: ${device}, pays via: ${provider || "?"}, wants beta now: ${wantsBetaNow}</p>`,
      text: `${email} — role: ${role}, device: ${device}, pays via: ${provider || "?"}, wants beta now: ${wantsBetaNow}`,
    })
    .catch((err) => console.error("[waitlist] team notification failed", err));

  return NextResponse.json(
    { ok: true, referralCode, referralLink },
    { status: 201 }
  );
}

/** Best-effort — a referral increment failing must never fail the referred person's signup. */
async function bumpReferralCount(resend: ReturnType<typeof getResend>, referralCode: string) {
  try {
    const contacts = await resend.contacts.list({ limit: 100 });
    if (contacts.error || !contacts.data) return;
    // Referral codes are opaque and not searchable via the list API, so we
    // scan. Fine at waitlist scale — see listContactsByKind's own note.
    for (const c of contacts.data.data) {
      const full = await getContact(resend, c.email);
      if (full?.properties.referralCode === referralCode) {
        await resend.contacts.update({
          email: full.email,
          properties: {
            referralCount: Number(full.properties.referralCount ?? 0) + 1,
          },
        });
        return;
      }
    }
  } catch (err) {
    console.error("[waitlist] referral bump failed", err);
  }
}

function confirmationHtml(params: {
  name: string;
  wantsBetaNow: string;
  device: string;
  referralLink: string;
  unsub: string;
}) {
  const { name, wantsBetaNow, device, referralLink, unsub } = params;
  const betaBlock =
    wantsBetaNow === "yes"
      ? `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5c5c5c;">
          Hover is ready to download. Here's your link:
        </p>
        ${
          device === "android"
            ? `<p style="margin:0 0 10px;"><a href="${siteConfig.betaLinks.android}" style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:999px;">Get it on Google Play</a></p>`
            : `<p style="margin:0 0 10px;"><a href="${siteConfig.betaLinks.ios}" style="display:inline-block;background:#0a0a0a;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:12px 20px;border-radius:999px;">iPhone (TestFlight beta)</a></p>`
        }
        <p style="margin:0 0 20px;font-size:13px;line-height:1.6;color:#8a8a8a;">
          Heads up: cash-out to your bank account is coming soon. For now you
          can send and receive money with other Hover users.
        </p>`
      : `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#5c5c5c;">
          You're on the list — we'll email you as soon as beta spots open up.
        </p>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <title>You're on the Hover waitlist</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f2f2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0a0a0a;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f2f2f2;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;">
            <tr><td style="padding:0 4px 20px;"><span style="font-size:20px;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">Hover</span></td></tr>
            <tr>
              <td style="background:#ffffff;border:1px solid rgba(0,0,0,0.08);border-radius:20px;padding:40px;">
                <h1 style="margin:0 0 12px;font-size:24px;line-height:1.25;font-weight:700;letter-spacing:-0.02em;color:#0a0a0a;">
                  ${name ? `Thanks, ${name}.` : "You're in."}
                </h1>
                ${betaBlock}
                <p style="margin:0 0 8px;font-size:13px;line-height:1.6;color:#8a8a8a;">
                  Move up the list by inviting people who also get paid from abroad:
                </p>
                <p style="margin:0;font-size:14px;word-break:break-all;">
                  <a href="${referralLink}" style="color:#0a0a0a;text-decoration:underline;">${referralLink}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 8px 0;">
                <p style="margin:0 0 8px;font-size:12px;line-height:1.6;color:#8a8a8a;">
                  You received this because you joined the Hover waitlist. If this
                  wasn't you, you can safely <a href="${unsub}" style="color:#5c5c5c;text-decoration:underline;">unsubscribe</a>.
                </p>
                <p style="margin:0;font-size:12px;line-height:1.6;color:#b0b0b0;">${COMPANY_ADDRESS}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function confirmationText(params: {
  name: string;
  wantsBetaNow: string;
  device: string;
  referralLink: string;
  unsub: string;
}) {
  const { name, wantsBetaNow, device, referralLink, unsub } = params;
  const lines = [name ? `Thanks, ${name}.` : "You're in.", ""];

  if (wantsBetaNow === "yes") {
    lines.push("Hover is ready to download. Here's your link:");
    lines.push(
      device === "android"
        ? `Android (Google Play): ${siteConfig.betaLinks.android}`
        : `iPhone (TestFlight beta): ${siteConfig.betaLinks.ios}`
    );
    lines.push(
      "",
      "Heads up: cash-out to your bank account is coming soon. For now you can send and receive money with other Hover users."
    );
  } else {
    lines.push("You're on the list — we'll email you as soon as beta spots open up.");
  }

  lines.push(
    "",
    "Move up the list by inviting people who also get paid from abroad:",
    referralLink,
    "",
    "-----",
    "You received this because you joined the Hover waitlist.",
    `Unsubscribe: ${unsub}`,
    COMPANY_ADDRESS
  );
  return lines.join("\n");
}
