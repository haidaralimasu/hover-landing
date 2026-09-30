import { redirect } from "next/navigation";
import Link from "next/link";
import { hasAdminSession } from "@/lib/admin-auth";
import { getResend, listContactsByKind, type ContactRecord } from "@/lib/waitlist";
import { Container } from "@/components/ui/container";
import { LogoutButton } from "@/components/admin/logout-button";
import { BetaStatusSelect } from "@/components/admin/beta-status-select";

export const dynamic = "force-dynamic";

const WAITLIST_GOAL = 100;
const ACTIVATED_GOAL = 50;

function dayKey(iso: string): string {
  return iso.slice(0, 10); // yyyy-mm-dd
}

function buildDailyChannelBreakdown(contacts: ContactRecord[]) {
  const byDay = new Map<string, Map<string, number>>();
  for (const c of contacts) {
    const day = dayKey(c.createdAt);
    const source = String(c.properties.utmSource || "direct");
    if (!byDay.has(day)) byDay.set(day, new Map());
    const channels = byDay.get(day)!;
    channels.set(source, (channels.get(source) ?? 0) + 1);
  }
  return [...byDay.entries()]
    .sort((a, b) => (a[0] < b[0] ? 1 : -1))
    .slice(0, 30)
    .map(([day, channels]) => ({ day, channels: [...channels.entries()] }));
}

export default async function AdminDashboardPage() {
  if (!(await hasAdminSession())) redirect("/admin/login");

  let waitlist: ContactRecord[] = [];
  let error: string | null = null;
  try {
    const resend = getResend();
    waitlist = await listContactsByKind(resend, "waitlist");
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load contacts.";
  }

  const total = waitlist.length;
  const invited = waitlist.filter((c) => c.properties.betaStatus === "invited").length;
  const installed = waitlist.filter((c) => c.properties.betaStatus === "installed").length;
  const activated = waitlist.filter((c) => c.properties.betaStatus === "activated").length;
  const activationRate = invited + installed + activated > 0
    ? Math.round((activated / (invited + installed + activated)) * 100)
    : 0;
  const daily = buildDailyChannelBreakdown(waitlist);

  return (
    <main className="pb-24 pt-16">
      <Container>
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-ink">Waitlist dashboard</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/outreach" className="text-sm text-ink-2 underline underline-offset-2 hover:text-ink">
              Outreach tracker
            </Link>
            <LogoutButton />
          </div>
        </div>

        {error ? (
          <p className="rounded-[var(--radius-card)] border border-[var(--color-danger)] p-4 text-sm text-[var(--color-danger)]">
            {error}
          </p>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <Stat label={`Waitlist signups (goal ${WAITLIST_GOAL})`} value={total} goal={WAITLIST_GOAL} />
              <Stat label="Beta invited" value={invited + installed + activated} />
              <Stat label={`Activated (goal ${ACTIVATED_GOAL})`} value={activated} goal={ACTIVATED_GOAL} />
              <Stat label="Activation rate" value={`${activationRate}%`} />
            </div>

            <section className="mt-10">
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-ink-3">
                Signups per day, by channel (last 30 days with activity)
              </h2>
              <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-bg-2 text-ink-3">
                      <th className="px-4 py-2 font-medium">Date</th>
                      <th className="px-4 py-2 font-medium">Channel breakdown</th>
                      <th className="px-4 py-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {daily.map(({ day, channels }) => (
                      <tr key={day} className="border-b border-line last:border-0">
                        <td className="px-4 py-2 text-ink">{day}</td>
                        <td className="px-4 py-2 text-ink-2">
                          {channels.map(([source, n]) => `${source}: ${n}`).join(" · ")}
                        </td>
                        <td className="px-4 py-2 text-ink">
                          {channels.reduce((sum, [, n]) => sum + n, 0)}
                        </td>
                      </tr>
                    ))}
                    {daily.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-4 py-6 text-center text-ink-3">
                          No signups yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-10">
              <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-ink-3">
                All signups ({total})
              </h2>
              <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-line bg-bg-2 text-ink-3">
                      <th className="px-4 py-2 font-medium">Email</th>
                      <th className="px-4 py-2 font-medium">Role</th>
                      <th className="px-4 py-2 font-medium">Device</th>
                      <th className="px-4 py-2 font-medium">Provider</th>
                      <th className="px-4 py-2 font-medium">Beta status</th>
                      <th className="px-4 py-2 font-medium">Referrals</th>
                      <th className="px-4 py-2 font-medium">Source</th>
                      <th className="px-4 py-2 font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {waitlist
                      .slice()
                      .reverse()
                      .map((c) => (
                        <tr key={c.email} className="border-b border-line last:border-0">
                          <td className="px-4 py-2 text-ink">{c.email}</td>
                          <td className="px-4 py-2 text-ink-2">{c.properties.role}</td>
                          <td className="px-4 py-2 text-ink-2">{c.properties.device}</td>
                          <td className="px-4 py-2 text-ink-2">{c.properties.provider || "—"}</td>
                          <td className="px-4 py-2">
                            <BetaStatusSelect email={c.email} value={String(c.properties.betaStatus ?? "waitlisted")} />
                          </td>
                          <td className="px-4 py-2 text-ink-2">{c.properties.referralCount ?? 0}</td>
                          <td className="px-4 py-2 text-ink-2">{c.properties.utmSource || "direct"}</td>
                          <td className="px-4 py-2 text-ink-2">{dayKey(c.createdAt)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-2 text-[13px] text-ink-3">
                Beta status is set by hand for now (waitlisted → invited →
                installed → activated) — there&apos;s no in-app telemetry
                pipeline yet to auto-detect install/first-transfer events.
              </p>
            </section>
          </>
        )}
      </Container>
    </main>
  );
}

function Stat({ label, value, goal }: { label: string; value: number | string; goal?: number }) {
  const pct =
    goal && typeof value === "number" ? Math.min(100, Math.round((value / goal) * 100)) : null;
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-bg-2 p-5">
      <p className="text-[13px] text-ink-3">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-ink">{value}</p>
      {pct !== null ? (
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-black/10">
          <div className="h-full rounded-full bg-ink" style={{ width: `${pct}%` }} />
        </div>
      ) : null}
    </div>
  );
}
