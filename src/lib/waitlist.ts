import { Resend } from "resend";

/**
 * Everything waitlist/outreach-related is stored as a Resend Contact with
 * custom properties — no separate database. Two "kinds" share the same
 * contact pool, distinguished by the `kind` property: `waitlist` (people who
 * signed up on /waitlist) and `outreach` (people the founders are manually
 * tracking after a 1:1 DM/email/call). Email is always the lookup key —
 * Resend's contacts.get/update/remove all accept `{ email }` directly, so we
 * never need to store Resend's own contact ids anywhere else.
 */

export type WaitlistProperties = {
  kind: "waitlist";
  role: "founder" | "freelancer" | "other";
  paidToday: string;
  monthlyAmount: string;
  provider: string;
  device: "ios" | "android" | "other";
  wantsBetaNow: "yes" | "no";
  betaStatus: "waitlisted" | "invited" | "installed" | "activated";
  referralCode: string;
  referredBy: string;
  referralCount: number;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
};

export type OutreachProperties = {
  kind: "outreach";
  channel:
    | "x_dm"
    | "linkedin"
    | "telegram"
    | "discord"
    | "whatsapp"
    | "in_person"
    | "referral"
    | "other";
  direction: "receiving" | "sending" | "unknown";
  dateContacted: string; // ISO date, yyyy-mm-dd
  replied: "yes" | "no" | "pending";
  signedUp: "yes" | "no";
  activated: "yes" | "no";
  notes: string;
};

type AnyProperties = WaitlistProperties | OutreachProperties;

/**
 * All custom property keys we ever write, with the type Resend needs
 * declared workspace-side. Called once per cold start (best-effort — if the
 * account already has these declared, or declaring ad-hoc keys without
 * pre-registration is fine on your plan, the create calls just no-op/fail
 * silently and writes proceed normally either way).
 */
const PROPERTY_SCHEMA: Record<string, "string" | "number"> = {
  kind: "string",
  role: "string",
  paidToday: "string",
  monthlyAmount: "string",
  provider: "string",
  device: "string",
  wantsBetaNow: "string",
  betaStatus: "string",
  referralCode: "string",
  referredBy: "string",
  referralCount: "number",
  utmSource: "string",
  utmMedium: "string",
  utmCampaign: "string",
  channel: "string",
  direction: "string",
  dateContacted: "string",
  replied: "string",
  signedUp: "string",
  activated: "string",
  notes: "string",
  lastFeedbackConfused: "string",
  lastFeedbackBroke: "string",
  lastFeedbackWouldUseReal: "string",
};

let propertiesEnsured = false;

export function getResend(): Resend {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }
  return new Resend(apiKey);
}

/** Best-effort, idempotent. Never throws — a failure here must not block a signup. */
export async function ensureContactProperties(resend: Resend): Promise<void> {
  if (propertiesEnsured) return;
  propertiesEnsured = true;
  await Promise.all(
    Object.entries(PROPERTY_SCHEMA).map(([key, type]) =>
      resend.contactProperties.create({ key, type }).catch(() => {
        // Already exists, or the plan doesn't require pre-declaring
        // properties — either way, writes below proceed unaffected.
      })
    )
  );
}

type ContactRecord = {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  createdAt: string;
  properties: Record<string, string | number>;
};

function unwrapProperties(
  raw: Record<string, { type: "string" | "number"; value: string | number }>
): Record<string, string | number> {
  const out: Record<string, string | number> = {};
  for (const [key, prop] of Object.entries(raw ?? {})) {
    out[key] = prop.value;
  }
  return out;
}

export async function getContact(
  resend: Resend,
  email: string
): Promise<ContactRecord | null> {
  const res = await resend.contacts.get({ email });
  if (res.error || !res.data) return null;
  return {
    id: res.data.id,
    email: res.data.email,
    firstName: res.data.first_name,
    lastName: res.data.last_name,
    createdAt: res.data.created_at,
    properties: unwrapProperties(
      res.data.properties as unknown as Record<
        string,
        { type: "string" | "number"; value: string | number }
      >
    ),
  };
}

/**
 * Newsletter subscription lives on the Resend contact's `unsubscribed` flag
 * (Resend broadcasts honour it). New addresses get `kind: "newsletter"`;
 * existing contacts (waitlist/outreach) keep their kind.
 */
export async function setNewsletterSubscribed(resend: Resend, email: string, subscribed: boolean): Promise<void> {
  await ensureContactProperties(resend);
  const existing = await getContact(resend, email);
  const { error } = existing
    ? await resend.contacts.update({ email, unsubscribed: !subscribed })
    : await resend.contacts.create({ email, unsubscribed: !subscribed, properties: { kind: "newsletter" } });
  if (error) throw new Error(error.message);
}

/** Create the contact if the email is new, otherwise merge properties onto it. */
export async function upsertContact(
  resend: Resend,
  params: {
    email: string;
    firstName?: string | null;
    properties: Partial<AnyProperties> & Record<string, string | number | null>;
  }
): Promise<{ created: boolean }> {
  await ensureContactProperties(resend);
  const existing = await getContact(resend, params.email);

  if (existing) {
    await resend.contacts.update({
      email: params.email,
      firstName: params.firstName ?? undefined,
      properties: params.properties,
    });
    return { created: false };
  }

  await resend.contacts.create({
    email: params.email,
    firstName: params.firstName ?? undefined,
    properties: params.properties,
  });
  return { created: true };
}

/**
 * Paginates through every contact of a given `kind`. Fine at waitlist scale
 * (hundreds to low thousands); revisit with a real query layer if this ever
 * needs to scan tens of thousands of contacts on every request.
 */
export async function listContactsByKind(
  resend: Resend,
  kind: "waitlist" | "outreach",
  maxPages = 20
): Promise<ContactRecord[]> {
  const all: ContactRecord[] = [];
  let after: string | undefined;

  for (let page = 0; page < maxPages; page++) {
    const res = await resend.contacts.list({ limit: 100, after });
    if (res.error || !res.data) break;

    for (const c of res.data.data) {
      // The list endpoint doesn't return custom properties inline, so we
      // fetch each contact individually to filter/sort by them. This is the
      // real cost of not having a real database — acceptable up to a few
      // hundred contacts, worth caching (short TTL) if it gets slow.
      const full = await getContact(resend, c.email);
      if (full && full.properties.kind === kind) all.push(full);
    }

    if (!res.data.has_more || res.data.data.length === 0) break;
    after = res.data.data[res.data.data.length - 1]?.id;
  }

  return all.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
}

/**
 * Simple, tunable referral boost: each referral moves you up 3 spots,
 * floor of 1. Recompute from scratch each time rather than storing a
 * cached rank, so it's always consistent with the current list.
 */
export type { ContactRecord };
