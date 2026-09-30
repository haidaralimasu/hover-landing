"use client";

import { useId, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ContactRecord } from "@/lib/waitlist";

const CHANNELS = ["x_dm", "linkedin", "telegram", "discord", "whatsapp", "in_person", "referral", "other"];
const DIRECTIONS = ["receiving", "sending", "unknown"];
const TRISTATE = ["pending", "yes", "no"];
const YESNO = ["no", "yes"];

type Row = {
  email: string;
  name: string;
  channel: string;
  direction: string;
  dateContacted: string;
  replied: string;
  signedUp: string;
  activated: string;
  notes: string;
};

function toRow(c: ContactRecord): Row {
  return {
    email: c.email,
    name: c.firstName ?? "",
    channel: String(c.properties.channel ?? "other"),
    direction: String(c.properties.direction ?? "unknown"),
    dateContacted: String(c.properties.dateContacted ?? ""),
    replied: String(c.properties.replied ?? "pending"),
    signedUp: String(c.properties.signedUp ?? "no"),
    activated: String(c.properties.activated ?? "no"),
    notes: String(c.properties.notes ?? ""),
  };
}

const cellSelect = "h-8 rounded-full border border-line-2 bg-surface px-2 text-[13px] text-ink outline-none";
const cellInput = "h-8 w-full rounded-[var(--radius-input)] border border-line-2 bg-surface px-2 text-[13px] text-ink outline-none";

export function OutreachTracker({ initialRows }: { initialRows: ContactRecord[] }) {
  const [rows, setRows] = useState<Row[]>(initialRows.map(toRow).reverse());
  const [saving, setSaving] = useState<string | null>(null);
  const [newRow, setNewRow] = useState<Row>({
    email: "",
    name: "",
    channel: "x_dm",
    direction: "receiving",
    dateContacted: new Date().toISOString().slice(0, 10),
    replied: "pending",
    signedUp: "no",
    activated: "no",
    notes: "",
  });
  const emailId = useId();

  async function save(row: Row) {
    setSaving(row.email);
    try {
      await fetch("/api/admin/outreach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(row),
      });
    } finally {
      setSaving(null);
    }
  }

  function updateRow(email: string, patch: Partial<Row>) {
    setRows((prev) => {
      const next = prev.map((r) => (r.email === email ? { ...r, ...patch } : r));
      const updated = next.find((r) => r.email === email);
      if (updated) void save(updated);
      return next;
    });
  }

  async function addRow() {
    if (!newRow.email.trim()) return;
    const row = { ...newRow, email: newRow.email.trim().toLowerCase() };
    setRows((prev) => [row, ...prev.filter((r) => r.email !== row.email)]);
    setNewRow({
      email: "",
      name: "",
      channel: "x_dm",
      direction: "receiving",
      dateContacted: new Date().toISOString().slice(0, 10),
      replied: "pending",
      signedUp: "no",
      activated: "no",
      notes: "",
    });
    await save(row);
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-end gap-2 rounded-[var(--radius-card)] border border-line bg-bg-2 p-4">
        <div>
          <label htmlFor={emailId} className="mb-1 block text-[11px] text-ink-3">
            Email
          </label>
          <input
            id={emailId}
            type="email"
            value={newRow.email}
            onChange={(e) => setNewRow((r) => ({ ...r, email: e.target.value }))}
            className={cn(cellInput, "w-56")}
            placeholder="person@example.com"
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-ink-3">Name</label>
          <input
            value={newRow.name}
            onChange={(e) => setNewRow((r) => ({ ...r, name: e.target.value }))}
            className={cn(cellInput, "w-36")}
          />
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-ink-3">Channel</label>
          <select
            value={newRow.channel}
            onChange={(e) => setNewRow((r) => ({ ...r, channel: e.target.value }))}
            className={cellSelect}
          >
            {CHANNELS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-[11px] text-ink-3">Direction</label>
          <select
            value={newRow.direction}
            onChange={(e) => setNewRow((r) => ({ ...r, direction: e.target.value }))}
            className={cellSelect}
          >
            {DIRECTIONS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={addRow}
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line bg-bg-2 text-ink-3">
              {["Email", "Name", "Channel", "Direction", "Contacted", "Replied", "Signed up", "Activated", "Notes", ""].map(
                (h) => (
                  <th key={h} className="whitespace-nowrap px-3 py-2 font-medium">
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.email} className="border-b border-line last:border-0 align-top">
                <td className="px-3 py-2 text-ink">{r.email}</td>
                <td className="px-3 py-2">
                  <input
                    value={r.name}
                    onChange={(e) => updateRow(r.email, { name: e.target.value })}
                    className={cn(cellInput, "w-28")}
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={r.channel}
                    onChange={(e) => updateRow(r.email, { channel: e.target.value })}
                    className={cellSelect}
                  >
                    {CHANNELS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={r.direction}
                    onChange={(e) => updateRow(r.email, { direction: e.target.value })}
                    className={cellSelect}
                  >
                    {DIRECTIONS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    type="date"
                    value={r.dateContacted}
                    onChange={(e) => updateRow(r.email, { dateContacted: e.target.value })}
                    className={cn(cellInput, "w-36")}
                  />
                </td>
                <td className="px-3 py-2">
                  <select
                    value={r.replied}
                    onChange={(e) => updateRow(r.email, { replied: e.target.value })}
                    className={cellSelect}
                  >
                    {TRISTATE.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={r.signedUp}
                    onChange={(e) => updateRow(r.email, { signedUp: e.target.value })}
                    className={cellSelect}
                  >
                    {YESNO.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <select
                    value={r.activated}
                    onChange={(e) => updateRow(r.email, { activated: e.target.value })}
                    className={cellSelect}
                  >
                    {YESNO.map((v) => (
                      <option key={v} value={v}>
                        {v}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-3 py-2">
                  <input
                    value={r.notes}
                    onChange={(e) => updateRow(r.email, { notes: e.target.value })}
                    className={cn(cellInput, "w-48")}
                  />
                </td>
                <td className="px-3 py-2">{saving === r.email ? <Loader2 className="h-4 w-4 animate-spin text-ink-3" /> : null}</td>
              </tr>
            ))}
            {rows.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-4 py-6 text-center text-ink-3">
                  No outreach logged yet — add the first person above.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
