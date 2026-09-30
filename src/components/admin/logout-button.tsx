"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/login", { method: "DELETE" });
        router.push("/admin/login");
        router.refresh();
      }}
      className="text-sm text-ink-2 underline underline-offset-2 hover:text-ink"
    >
      Log out
    </button>
  );
}
