import { NextResponse } from "next/server";
import { hasAdminSession } from "@/lib/admin-auth";
import { getResend } from "@/lib/waitlist";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BETA_STATUSES = new Set(["waitlisted", "invited", "installed", "activated"]);

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ email: string }> }
) {
  if (!(await hasAdminSession())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { email } = await params;
  let body: { betaStatus?: unknown };
  try {
    body = (await request.json()) as { betaStatus?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const betaStatus = typeof body.betaStatus === "string" ? body.betaStatus : "";
  if (!BETA_STATUSES.has(betaStatus)) {
    return NextResponse.json({ error: "Invalid betaStatus." }, { status: 422 });
  }

  try {
    const resend = getResend();
    await resend.contacts.update({
      email: decodeURIComponent(email),
      properties: { betaStatus },
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/contacts] update failed", err);
    return NextResponse.json({ error: "Update failed." }, { status: 502 });
  }
}
