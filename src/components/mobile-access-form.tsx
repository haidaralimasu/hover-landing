"use client";

import { useId, useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * The site's single conversion action: capture an email for the launch list.
 * `cta` sets the button label ("Get early access" in the hero, "Join the
 * list" lower down); `note` is the one-line value/assurance under the field.
 */
export function MobileAccessForm({
  className,
  cta = "Get early access",
  note = "One email when the app lands. No spam, unsubscribe anytime.",
}: {
  className?: string;
  cta?: string;
  note?: string;
}) {
  const inputId = useId();
  const errorId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/mobile-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're on the list.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className={cn(
          "animate-[fade-in_0.4s_var(--ease-out-expo)_both] rounded-[var(--radius-input)] border border-line-2 bg-surface px-4 py-3.5",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <p className="text-sm font-medium text-ink">{message}</p>
        </div>
        <p className="mt-2 pl-9 text-sm text-ink-3">
          We&apos;ll email you the moment the app is ready. In the meantime you can
          send money now at{" "}
          <a
            href="https://app.hover.money"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-ink underline underline-offset-2 hover:text-ink-2"
          >
            app.hover.money
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id={inputId}
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className={cn(
            "h-12 w-full rounded-[var(--radius-input)] border bg-surface px-4 text-[15px] text-ink",
            "placeholder:text-ink-3 outline-none transition-colors duration-150",
            "focus:border-black/35",
            status === "error"
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
              : "border-line-2"
          )}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={cn(
            "inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6",
            "text-[15px] font-medium text-white",
            "transition-[transform,opacity] duration-150 [transition-timing-function:var(--ease-out-quart)]",
            "hover:opacity-90 active:scale-[0.97] active:opacity-85 disabled:opacity-70"
          )}
        >
          {status === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            <>
              {cta}
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      {status === "error" ? (
        <p
          id={errorId}
          role="alert"
          className="mt-2.5 animate-[fade-in_0.2s_ease-out_both] text-sm text-[var(--color-danger)]"
        >
          {message}
        </p>
      ) : note ? (
        <p className="mt-2.5 text-[13px] leading-relaxed text-ink-3">{note}</p>
      ) : null}
    </form>
  );
}
