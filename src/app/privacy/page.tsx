import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses, and protects your personal information.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="August 1, 2026">
      <section>
        <p>
          This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) collects, uses, and protects your information when you
          visit {siteConfig.domain}, request an invite to our private beta, or use
          the {siteConfig.name} app while it is in private beta. We collect as
          little as possible and never sell your data.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Email address</strong> — only when you choose to request an
            invite to the private beta, so we can send you a TestFlight invite
            and beta-related updates.
          </li>
          <li>
            <strong>Beta app data</strong> — while testing the app via Apple
            TestFlight, we may collect crash logs, diagnostics, and feedback you
            submit to help us fix bugs before general availability.
          </li>
          <li>
            <strong>Usage analytics</strong> — anonymised, aggregated data about
            how the site is used (pages viewed, approximate region). This is
            collected <strong>only if you accept analytics cookies</strong>.
          </li>
        </ul>
      </section>

      <section>
        <h2>Cookies and analytics</h2>
        <p>
          We use a strictly-necessary record of your cookie choice and, if you
          consent, Google Analytics to understand site usage. No analytics
          cookies are set until you click &ldquo;Accept&rdquo; on our cookie
          banner. You can change your choice at any time using the
          &ldquo;Cookie preferences&rdquo; link in the footer; choosing
          &ldquo;Reject&rdquo; removes any analytics cookies already stored.
        </p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To send you your TestFlight invite and beta-related emails.</li>
          <li>To diagnose crashes and improve the app during the beta.</li>
          <li>To measure and improve the website (with your consent).</li>
          <li>To comply with legal obligations.</li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information, and we do not
          use your email for unrelated marketing.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access, correct,
          export, or delete your personal data, and to withdraw consent. You can
          unsubscribe from private beta emails at any time via the link in any
          email we send, or by contacting us. To exercise any other right, email
          us at the address below.
        </p>
      </section>

      <section>
        <h2>Data retention &amp; security</h2>
        <p>
          We keep your email only for the duration of the private beta or until
          you unsubscribe, whichever comes first. Data is transmitted over
          encrypted connections and access is limited to those who need it.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about this policy or your data? Email{" "}
          <a href="mailto:support@hover.money">support@hover.money</a>.
        </p>
      </section>

      <section>
        <p className="text-sm text-ink-3">
          This document is a general template and does not constitute legal
          advice. Have it reviewed by qualified counsel before you rely on it in
          production, and update the company details to match your registered
          entity.
        </p>
      </section>
    </LegalPage>
  );
}
