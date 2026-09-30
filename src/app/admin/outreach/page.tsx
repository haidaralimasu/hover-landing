import { redirect } from "next/navigation";
import Link from "next/link";
import { hasAdminSession } from "@/lib/admin-auth";
import { getResend, listContactsByKind, type ContactRecord } from "@/lib/waitlist";
import { Container } from "@/components/ui/container";
import { OutreachTracker } from "@/components/admin/outreach-tracker";
import { LogoutButton } from "@/components/admin/logout-button";

export const dynamic = "force-dynamic";

export default async function AdminOutreachPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  let rows: ContactRecord[] = [];
  let error: string | null = null;
  try {
    const resend = getResend();
    rows = await listContactsByKind(resend, "outreach");
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load.";
  }

  return (
    <main className="pb-24 pt-16">
      <Container>
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-ink">Outreach tracker</h1>
            <p className="mt-1 text-sm text-ink-3">
              People contacted manually — add sourcing targets here one at a
              time (Clay/Apollo/Superteam/Discord/wherever), then log every
              real send. This is a tracker, not a sender — nothing here emails
              anyone automatically.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm text-ink-2 underline underline-offset-2 hover:text-ink">
              Dashboard
            </Link>
            <LogoutButton />
          </div>
        </div>

        {error ? (
          <p className="rounded-[var(--radius-card)] border border-[var(--color-danger)] p-4 text-sm text-[var(--color-danger)]">
            {error}
          </p>
        ) : (
          <OutreachTracker initialRows={rows} />
        )}
      </Container>
    </main>
  );
}
