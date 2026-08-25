import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Account Deletion",
  description: `How to request deletion of your ${siteConfig.name} account and data.`,
  alternates: { canonical: "/account-deletion" },
};

export default function AccountDeletionPage() {
  return (
    <LegalPage title="Account Deletion" updated="August 16, 2026">
      <section>
        <p>
          You can request deletion of your {siteConfig.name} account and all
          associated data at any time.
        </p>
      </section>

      <section>
        <h2>How to request deletion</h2>
        <p>
          Email{" "}
          <a href="mailto:tech@hover.money?subject=Account%20deletion%20request">
            tech@hover.money
          </a>{" "}
          from the email address on your account and ask us to delete your
          account. Include your username so we can find your account
          quickly. We&rsquo;ll confirm your identity and process the request.
        </p>
      </section>

      <section>
        <h2>What gets deleted</h2>
        <p>
          Your name, email, phone number, profile picture, contact-matching
          data, and passkey/biometric credential registration are deleted
          from our systems. Your username is released and may be reassigned
          to another user in the future.
        </p>
      </section>

      <section>
        <h2>What we keep, and why</h2>
        <p>
          Transaction records are retained after account deletion where we
          are legally required to keep them for tax, accounting, or
          fraud-prevention purposes. Transfers you sent or received also
          exist permanently on the underlying public blockchain and cannot
          be deleted by us or by you &mdash; this is a property of how
          blockchain transfers work, not a choice {siteConfig.name} makes.
        </p>
      </section>

      <section>
        <h2>Before you request deletion</h2>
        <p>
          Withdraw or transfer out any remaining balance first &mdash;
          account deletion does not recover or forward funds left in your
          account.
        </p>
      </section>
    </LegalPage>
  );
}
