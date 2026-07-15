"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

type Status = "idle" | "loading" | "done" | "error";

export function UnsubscribeClient({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const [status, setStatus] = useState<Status>("idle");

  async function confirm() {
    if (status === "loading" || status === "done") return;
    setStatus("loading");
    try {
      const params = new URLSearchParams({ e: email, t: token });
      const res = await fetch(`/api/unsubscribe?${params.toString()}`, {
        method: "POST",
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (!email || !token) {
    return (
      <>
        <h1 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
          Invalid link
        </h1>
        <p className="mt-3 text-pretty text-ink-2">
          This unsubscribe link is missing information. Please use the link from
          the bottom of the email you received.
        </p>
      </>
    );
  }

  if (status === "done") {
    return (
      <>
        <span className="mt-8 grid h-12 w-12 place-items-center rounded-full bg-silver text-white">
          <Check className="h-5 w-5" strokeWidth={3} />
        </span>
        <h1 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
          You&apos;re unsubscribed
        </h1>
        <p className="mt-3 text-pretty text-ink-2">
          We&apos;ve removed <span className="font-medium text-ink">{email}</span>{" "}
          from the Hover waitlist. You won&apos;t hear from us again.
        </p>
      </>
    );
  }

  return (
    <>
      <h1 className="mt-8 text-2xl font-semibold tracking-tight text-ink">
        Unsubscribe from Hover
      </h1>
      <p className="mt-3 text-pretty text-ink-2">
        Stop launch emails to{" "}
        <span className="font-medium text-ink">{email}</span>? You can rejoin the
        waitlist any time.
      </p>
      <button
        type="button"
        onClick={confirm}
        disabled={status === "loading"}
        className="mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-silver px-6 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset] transition-[transform,filter] duration-150 [transition-timing-function:var(--ease-out-quart)] hover:brightness-110 active:scale-[0.97] disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Unsubscribing
          </>
        ) : (
          "Confirm unsubscribe"
        )}
      </button>
      {status === "error" && (
        <p className="mt-4 text-sm text-ink-2" role="alert">
          Something went wrong, or this link has expired. Please try again.
        </p>
      )}
    </>
  );
}
