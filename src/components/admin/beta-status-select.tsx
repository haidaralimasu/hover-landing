"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const OPTIONS = ["waitlisted", "invited", "installed", "activated"] as const;

export function BetaStatusSelect({ email, value }: { email: string; value: string }) {
  const router = useRouter();
  const [current, setCurrent] = useState(value);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={current}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        setCurrent(next);
        startTransition(async () => {
          try {
            const res = await fetch(`/api/admin/contacts/${encodeURIComponent(email)}`, {
              method: "PATCH",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ betaStatus: next }),
            });
            if (!res.ok) throw new Error();
            router.refresh();
          } catch {
            setCurrent(value);
          }
        });
      }}
      className={cn(
        "h-8 rounded-full border border-line-2 bg-surface px-2.5 text-[13px] text-ink outline-none",
        pending && "opacity-60"
      )}
    >
      {OPTIONS.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}
