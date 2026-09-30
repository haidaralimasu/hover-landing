import { NextResponse } from "next/server";
import { computeWaitlistPosition, getContact, getResend, listContactsByKind } from "@/lib/waitlist";
import { siteConfig } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function GET(request: Request) {
  const email = new URL(request.url).searchParams.get("email")?.trim().toLowerCase() ?? "";
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Missing or invalid email." }, { status: 422 });
  }

  let resend;
  try {
    resend = getResend();
  } catch {
    return NextResponse.json({ error: "Not available right now." }, { status: 500 });
  }

  const contact = await getContact(resend, email);
  if (!contact || contact.properties.kind !== "waitlist") {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const list = await listContactsByKind(resend, "waitlist");
  const result = computeWaitlistPosition(list, email);
  if (!result) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  return NextResponse.json({
    position: result.position,
    total: result.total,
    referralCount: result.referralCount,
    referralCode: contact.properties.referralCode,
    referralLink: `${siteConfig.url}/waitlist?ref=${contact.properties.referralCode}`,
  });
}
