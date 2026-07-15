"use client";

import { useEffect } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowDownLeft,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpRight,
  Bell,
  Eye,
  House,
  Plus,
  QrCode,
  User,
} from "lucide-react";
import { FLAG_XMLS, flagDataUri } from "@/lib/flags";
import { useReducedMotionSafe } from "@/lib/use-reduced-motion-safe";

/**
 * The mobile app, rebuilt for web:
 *  - `HeroFlagBackdrop` — real country flags (from the app's flagData) flowing
 *    vertically across "borders", used as the hero section background.
 *  - `AppHomeScreen` — the app's real Home screen (BalanceCard + transaction
 *    rows) in a phone frame, with one orchestrated entrance.
 * Flags are the one sanctioned pop of real-world colour, same as the app.
 */

const EASE_EXPO = [0.16, 1, 0.3, 1] as const;

function FlagLane({
  flags,
  seconds,
  up,
  delayFactor,
}: {
  flags: string[];
  seconds: number;
  up: boolean;
  delayFactor: number;
}) {
  // Two stacked copies so the -50% translate loops seamlessly.
  const train = [...flags, ...flags];
  return (
    <div className="relative h-full flex-1 overflow-hidden">
      <div
        className="flag-lane absolute inset-x-0 flex flex-col items-center gap-7"
        style={{
          animationDuration: `${seconds}s`,
          animationDirection: up ? "normal" : "reverse",
          animationDelay: `-${seconds * delayFactor}s`,
        }}
      >
        {train.map((xml, i) => (
          <span
            key={i}
            className="grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.12)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagDataUri(xml)}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/** Full-bleed flowing-flag texture for the hero background. Faint and
 *  edge-masked so it never fights the headline. Decorative only. */
export function HeroFlagBackdrop() {
  const laneCount = 9;
  const lanes = Array.from({ length: laneCount }, (_, i) => [
    FLAG_XMLS[(i * 3) % FLAG_XMLS.length],
    FLAG_XMLS[(i * 3 + 1) % FLAG_XMLS.length],
    FLAG_XMLS[(i * 3 + 2) % FLAG_XMLS.length],
    FLAG_XMLS[(i * 3 + 4) % FLAG_XMLS.length],
  ]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex gap-6 px-6 opacity-[0.13] [mask-image:radial-gradient(120%_80%_at_70%_40%,transparent_0%,transparent_28%,black_80%)]"
    >
      {lanes.map((flags, i) => (
        <FlagLane
          key={i}
          flags={flags}
          seconds={26 + (i % 4) * 4}
          up={i % 2 === 0}
          delayFactor={0.11 * i}
        />
      ))}
    </div>
  );
}

// Stagger choreography for the phone's inner content.
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_EXPO } },
};

function ActionCircle({
  icon: Icon,
  label,
}: {
  icon: typeof Plus;
  label: string;
}) {
  return (
    <motion.span variants={item} className="flex flex-col items-center gap-2">
      <motion.span
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ duration: 0.15, ease: EASE_EXPO }}
        className="grid h-[52px] w-[52px] place-items-center rounded-full bg-ink text-white"
      >
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
      </motion.span>
      <span className="text-[11px] font-medium text-ink">{label}</span>
    </motion.span>
  );
}

function TxnRow({
  photo,
  name,
  when,
  amount,
  category,
  outgoing,
}: {
  photo: string;
  name: string;
  when: string;
  amount: string;
  category: string;
  outgoing: boolean;
}) {
  return (
    <motion.div
      variants={item}
      className="flex items-center gap-3 rounded-[20px] border border-line bg-white px-3 py-[11px]"
    >
      <span className="relative h-11 w-11 shrink-0">
        <Image
          src={photo}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
        <span className="absolute -bottom-0.5 -right-0.5 grid h-5 w-5 place-items-center rounded-full border-2 border-white bg-ink text-white">
          {outgoing ? (
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          ) : (
            <ArrowDownLeft className="h-3 w-3" aria-hidden="true" />
          )}
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold text-ink">
          {name}
        </span>
        <span className="block text-[11.5px] text-ink-2">{when}</span>
      </span>
      <span className="text-right">
        <span className="block text-[14.5px] font-semibold text-ink">
          {amount}
        </span>
        <span className="block text-[11.5px] text-ink-2">{category}</span>
      </span>
    </motion.div>
  );
}

/** Balance figure that counts up on entrance. */
function BalanceAmount({ reduce }: { reduce: boolean }) {
  const count = useMotionValue(reduce ? 12765 : 0);
  const text = useTransform(count, (v) =>
    v.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
  useEffect(() => {
    if (reduce) return;
    const controls = animate(count, 12765, {
      duration: 1.3,
      delay: 0.55,
      ease: EASE_EXPO,
    });
    return () => controls.stop();
  }, [count, reduce]);
  return (
    <motion.p className="mt-1 text-[34px] font-semibold leading-none tracking-tight text-ink tabular-nums">
      {text}
    </motion.p>
  );
}

/** The app's Home screen in a phone frame. */
export function AppHomeScreen() {
  const reduce = useReducedMotionSafe();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 26, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: EASE_EXPO }}
      className="relative mx-auto w-full max-w-[300px]"
    >
      {/* Gentle continuous float (separate layer so it composes with entrance) */}
      <motion.div
        animate={reduce ? undefined : { y: [0, -9, 0] }}
        transition={
          reduce
            ? undefined
            : { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
        }
        className="relative aspect-[300/620] overflow-hidden rounded-[44px] border border-line bg-bg shadow-[0_40px_80px_-32px_rgba(0,0,0,0.28)]"
      >
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex h-full flex-col px-5 pb-6 pt-5"
        >
          {/* Status bar */}
          <div className="flex items-center justify-between text-[11px] font-semibold text-ink">
            <span>9:41</span>
            <span className="tracking-[0.15em] text-ink-3">•••• 📶 🔋</span>
          </div>

          {/* Header: avatar + greeting + bell */}
          <motion.div
            variants={item}
            className="mt-4 flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-ink text-[15px] font-semibold text-white">
                J
              </span>
              <span>
                <span className="block text-[15px] font-semibold text-ink">
                  Hi, Jennifer
                </span>
                <span className="block text-[12px] text-ink-2">
                  Good morning!
                </span>
              </span>
            </div>
            <span className="grid h-10 w-10 place-items-center rounded-full border border-line-2 bg-white text-ink">
              <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
          </motion.div>

          {/* Balance card (flush, on white — like Home) */}
          <motion.div variants={item} className="mt-6">
            <div className="flex items-center gap-1.5">
              <span className="text-[13px] text-ink-2">Total Balance</span>
              <Eye className="h-3.5 w-3.5 text-ink-3" aria-hidden="true" />
            </div>
            <BalanceAmount reduce={!!reduce} />
          </motion.div>

          <motion.div
            variants={stagger}
            className="mt-5 flex items-start justify-between"
          >
            <ActionCircle icon={Plus} label="Top up" />
            <ActionCircle icon={ArrowDownToLine} label="Withdraw" />
            <ActionCircle icon={ArrowUpRight} label="Send" />
            <ActionCircle icon={ArrowDownLeft} label="Receive" />
          </motion.div>

          {/* Transactions */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center justify-between"
          >
            <span className="text-[17px] font-semibold text-ink">
              Transactions
            </span>
            <span className="text-[13px] font-medium text-ink-2">See All</span>
          </motion.div>
          <div className="mt-3 flex flex-col gap-2">
            <TxnRow
              photo="/avatars/sarah.jpg"
              name="Sarah"
              when="Received Today, 12:30 PM"
              amount="+$580.00"
              category="In"
              outgoing={false}
            />
            <TxnRow
              photo="/avatars/modric.jpg"
              name="David"
              when="Sent Yesterday, 4:15 PM"
              amount="-$890.00"
              category="Out"
              outgoing
            />
          </div>

          {/* Bottom tab bar */}
          <motion.div
            variants={item}
            className="mt-auto flex items-center justify-between border-t border-line px-3 pt-4"
          >
            {[
              { icon: House, active: true },
              { icon: ArrowLeftRight, active: false },
              { icon: QrCode, active: false },
              { icon: User, active: false },
            ].map(({ icon: Icon, active }, i) => (
              <span
                key={i}
                className={
                  active
                    ? "grid h-9 w-9 place-items-center rounded-full bg-ink text-white"
                    : "grid h-9 w-9 place-items-center text-ink-3"
                }
              >
                <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
