import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium " +
  "transition-[transform,background-color,border-color,color] duration-150 [transition-timing-function:var(--ease-out-quart)] " +
  "active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-silver-1)]";

const variants: Record<Variant, string> = {
  // Highest-contrast CTA: light fill, black label. AA-safe.
  primary:
    "bg-silver text-[#0a0a0a] hover:brightness-108 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset]",
  secondary:
    "border border-line-2 bg-surface text-ink hover:bg-surface-2 hover:border-white/25",
  ghost: "text-ink-2 hover:text-ink hover:bg-white/5",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  ...props
}: CommonProps &
  Omit<React.ComponentProps<typeof Link>, "className" | "children">) {
  return (
    <Link
      href={href}
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
