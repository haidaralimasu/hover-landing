"use client";

import { useId, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export default function AdminLoginPage() {
  const router = useRouter();
  const id = useId();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="pb-24 pt-32 md:pt-40">
      <Container>
        <div className="mx-auto max-w-sm rounded-[var(--radius-card)] border border-line bg-bg-2 p-8">
          <div className="mb-5 flex items-center gap-2 text-ink">
            <Lock className="h-4 w-4" />
            <h1 className="text-lg font-semibold">Admin</h1>
          </div>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <label htmlFor={id} className="sr-only">
              Password
            </label>
            <input
              id={id}
              type="password"
              autoFocus
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              className={cn(
                "h-12 w-full rounded-[var(--radius-input)] border bg-surface px-4 text-[15px] text-ink outline-none",
                status === "error" ? "border-[var(--color-danger)]" : "border-line-2 focus:border-black/35"
              )}
            />
            <button
              type="submit"
              disabled={status === "loading" || !password}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink text-[15px] font-medium text-white hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enter"}
            </button>
            {status === "error" ? (
              <p role="alert" className="text-sm text-[var(--color-danger)]">
                Incorrect password.
              </p>
            ) : null}
          </form>
        </div>
      </Container>
    </main>
  );
}
