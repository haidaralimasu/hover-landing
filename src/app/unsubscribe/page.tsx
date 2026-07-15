import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { HoverMark } from "@/components/ui/logo";
import { UnsubscribeClient } from "./unsubscribe-client";

export const metadata: Metadata = {
  title: "Unsubscribe",
  robots: { index: false, follow: false },
};

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ e?: string; t?: string }>;
}) {
  const { e = "", t = "" } = await searchParams;

  return (
    <main className="flex min-h-[70vh] items-center py-24">
      <Container>
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <HoverMark className="h-11 w-11" />
          <UnsubscribeClient email={e} token={t} />
        </div>
      </Container>
    </main>
  );
}
