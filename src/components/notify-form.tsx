"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ className }: { className?: string }) {
  const reduce = useReducedMotionSafe();
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
      const res = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("You're in. Check your email, or download it right now below.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <motion.div
        role="status"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "flex flex-col gap-3 rounded-[var(--radius-input)] border border-line-2 bg-surface px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <p className="text-sm text-ink">{message}</p>
        </div>
        <a
          href={siteConfig.testflightUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-white transition-[transform,opacity] duration-150 hover:opacity-90 active:scale-[0.97] active:opacity-85"
        >
          Join the iOS beta
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </motion.div>
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
              Joining
            </>
          ) : (
            <>
              Join the beta
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {status === "error" && (
          <motion.p
            key="err"
            id={errorId}
            role="alert"
            initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 text-sm text-[var(--color-danger)]"
          >
            {message}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
