"use client";

import { useEffect, useId, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Check, Copy, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_OPTIONS = [
  { value: "freelancer", label: "Freelancer / contractor" },
  { value: "founder", label: "Founder / builder paid in crypto" },
  { value: "other", label: "Other" },
] as const;

const AMOUNT_OPTIONS = [
  { value: "", label: "Monthly amount from abroad" },
  { value: "<500", label: "Under $500" },
  { value: "500-2000", label: "$500 – $2,000" },
  { value: "2000-5000", label: "$2,000 – $5,000" },
  { value: ">5000", label: "$5,000+" },
] as const;

const selectBase =
  "h-12 w-full rounded-[var(--radius-input)] border border-line-2 bg-surface px-4 text-[15px] text-ink " +
  "outline-none transition-colors duration-150 focus:border-black/35";
const inputBase =
  "h-12 w-full rounded-[var(--radius-input)] border border-line-2 bg-surface px-4 text-[15px] text-ink " +
  "placeholder:text-ink-3 outline-none transition-colors duration-150 focus:border-black/35";

export function WaitlistForm({ className }: { className?: string }) {
  const searchParams = useSearchParams();
  const idPrefix = useId();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<(typeof ROLE_OPTIONS)[number]["value"]>("freelancer");
  const [monthlyAmount, setMonthlyAmount] = useState("");
  const [provider, setProvider] = useState("");
  const [device, setDevice] = useState<"ios" | "android" | "other">("other");
  const [wantsBetaNow, setWantsBetaNow] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [referralLink, setReferralLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Best-effort device guess so the beta-device select starts on a sane
  // default; the visitor can always override it. Can't move this into a
  // useState lazy initializer — navigator is undefined during SSR, and this
  // component hydrates server-side first.
  useEffect(() => {
    const ua = navigator.userAgent;
    // one-shot sync from navigator (an external system), not a derived-state loop
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (/android/i.test(ua)) setDevice("android");
    else if (/iphone|ipad|ipod/i.test(ua)) setDevice("ios");
  }, []);

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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          role,
          monthlyAmount,
          provider,
          device,
          wantsBetaNow,
          ref: searchParams.get("ref") ?? "",
          utmSource: searchParams.get("utm_source") ?? "",
          utmMedium: searchParams.get("utm_medium") ?? "",
          utmCampaign: searchParams.get("utm_campaign") ?? "",
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
        referralLink?: string;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      setReferralLink(data.referralLink ?? null);
      setStatus("success");
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
          "animate-[fade-in_0.4s_var(--ease-out-expo)_both] rounded-[var(--radius-card)] border border-line-2 bg-surface p-6",
          className
        )}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-white">
            <Check className="h-4 w-4" strokeWidth={3} />
          </span>
          <p className="text-base font-medium text-ink">You&apos;re on the waitlist.</p>
        </div>
        <p className="mt-3 pl-10 text-sm text-ink-3">
          Check {email} for your beta link
          {wantsBetaNow ? "" : " when a spot opens up"}. INR cash-out is still
          coming — the beta covers receiving and sending USDC for now.
        </p>
        {referralLink ? (
          <div className="mt-4 pl-10">
            <p className="text-[13px] text-ink-3">
              Move up the list — share your link:
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <code className="flex-1 truncate rounded-[var(--radius-input)] border border-line-2 bg-bg-2 px-3 py-2 text-[13px] text-ink">
                {referralLink}
              </code>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(referralLink).catch(() => {});
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-2 bg-surface text-ink-2 hover:text-ink"
                aria-label="Copy referral link"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("flex w-full flex-col gap-4", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="sr-only">
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputBase}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="sr-only">
            Email address
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            placeholder="you@email.com"
            value={email}
            aria-invalid={status === "error"}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            className={cn(
              inputBase,
              status === "error" && "border-[var(--color-danger)] focus:border-[var(--color-danger)]"
            )}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-role`} className="sr-only">
            Role
          </label>
          <select
            id={`${idPrefix}-role`}
            value={role}
            onChange={(e) => setRole(e.target.value as typeof role)}
            className={selectBase}
          >
            {ROLE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${idPrefix}-amount`} className="sr-only">
            Monthly amount from abroad
          </label>
          <select
            id={`${idPrefix}-amount`}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(e.target.value)}
            className={selectBase}
          >
            {AMOUNT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-provider`} className="sr-only">
          How do you get paid today?
        </label>
        <input
          id={`${idPrefix}-provider`}
          type="text"
          placeholder="How do you get paid today? (PayPal, Payoneer, Wise, bank wire…)"
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className={inputBase}
        />
      </div>

      <label className="flex items-start gap-3 rounded-[var(--radius-input)] border border-line-2 bg-surface px-4 py-3.5">
        <input
          type="checkbox"
          checked={wantsBetaNow}
          onChange={(e) => setWantsBetaNow(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 accent-black"
        />
        <span className="text-sm text-ink">
          Send me the beta app link right away
          <span className="block text-[13px] text-ink-3">
            (early access — INR cash-out isn&apos;t live yet, but sending/receiving
            USDC is)
          </span>
        </span>
      </label>

      {wantsBetaNow ? (
        <div>
          <label htmlFor={`${idPrefix}-device`} className="sr-only">
            Device
          </label>
          <select
            id={`${idPrefix}-device`}
            value={device}
            onChange={(e) => setDevice(e.target.value as typeof device)}
            className={selectBase}
          >
            <option value="ios">iPhone (TestFlight)</option>
            <option value="android">Android (Google Play)</option>
            <option value="other">Not sure yet</option>
          </select>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className={cn(
          "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink px-6",
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
            Join the waitlist
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {status === "error" ? (
        <p role="alert" className="text-sm text-[var(--color-danger)]">
          {message}
        </p>
      ) : (
        <p className="text-[13px] leading-relaxed text-ink-3">
          We only use this to email you about Hover beta access. No spam, unsubscribe anytime.
        </p>
      )}
    </form>
  );
}
