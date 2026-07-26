"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

type Status = "idle" | "loading" | "success";

type FieldErrors = {
  name?: string;
  email?: string;
  message?: string;
  form?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: string, email: string, message: string): FieldErrors {
  const errors: FieldErrors = {};
  if (!name.trim()) errors.name = "Please enter your name.";
  if (!email.trim()) errors.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!message.trim()) errors.message = "Please enter a message.";
  return errors;
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();
  return (
    <AnimatePresence mode="wait">
      {children ? (
        <motion.p
          key="err"
          id={id}
          role="alert"
          initial={reduce ? { opacity: 0 } : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.18 }}
          className="mt-1.5 text-[13px] text-[var(--color-danger)]"
        >
          {children}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function HelpCenterForm({ className }: { className?: string }) {
  const reduce = useReducedMotionSafe();
  const nameId = useId();
  const emailId = useId();
  const messageId = useId();
  const nameErrId = useId();
  const emailErrId = useId();
  const messageErrId = useId();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading" || status === "success") return;

    const fieldErrors = validate(name, email, message);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const res = await fetch("/api/help", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus("idle");
        setErrors({ form: data.error ?? "Something went wrong. Please try again." });
        return;
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setErrors({ form: "Network error. Please try again." });
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
          "flex items-center gap-3 rounded-[var(--radius-input)] border border-line-2 bg-surface px-5 py-4",
          className
        )}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-silver text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
        <p className="text-sm text-ink">
          Message sent. We&apos;ll reply to {email} shortly.
        </p>
      </motion.div>
    );
  }

  const inputBase =
    "h-12 w-full rounded-[var(--radius-input)] border bg-surface px-4 text-[15px] text-ink placeholder:text-ink-3 outline-none transition-colors duration-150";

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex w-full flex-col gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={nameId} className="sr-only">
            Name
          </label>
          <input
            id={nameId}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? nameErrId : undefined}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name || errors.form) setErrors((p) => ({ ...p, name: undefined, form: undefined }));
            }}
            className={cn(
              inputBase,
              errors.name
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                : "border-line-2 focus:border-black/35"
            )}
          />
          <FieldError id={nameErrId}>{errors.name}</FieldError>
        </div>
        <div>
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? emailErrId : undefined}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email || errors.form) setErrors((p) => ({ ...p, email: undefined, form: undefined }));
            }}
            className={cn(
              inputBase,
              errors.email
                ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
                : "border-line-2 focus:border-black/35"
            )}
          />
          <FieldError id={emailErrId}>{errors.email}</FieldError>
        </div>
      </div>

      <div>
        <label htmlFor={messageId} className="sr-only">
          Message
        </label>
        <textarea
          id={messageId}
          rows={4}
          placeholder="How can we help?"
          value={message}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? messageErrId : undefined}
          onChange={(e) => {
            setMessage(e.target.value);
            if (errors.message || errors.form) setErrors((p) => ({ ...p, message: undefined, form: undefined }));
          }}
          className={cn(
            "w-full resize-none rounded-[var(--radius-input)] border bg-surface px-4 py-3 text-[15px] text-ink",
            "placeholder:text-ink-3 outline-none transition-colors duration-150",
            errors.message
              ? "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
              : "border-line-2 focus:border-black/35"
          )}
        />
        <FieldError id={messageErrId}>{errors.message}</FieldError>
      </div>

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 self-start rounded-full bg-silver px-6 sm:w-auto",
          "text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.12)_inset]",
          "transition-[transform,filter] duration-150 [transition-timing-function:var(--ease-out-quart)]",
          "hover:brightness-108 active:scale-[0.97] disabled:opacity-70"
        )}
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send message
            <Send className="h-4 w-4" />
          </>
        )}
      </button>

      <FieldError id="help-form-error">{errors.form}</FieldError>
    </form>
  );
}
