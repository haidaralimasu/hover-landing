import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern your use of the ${siteConfig.name} website and app.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="August 16, 2026">
      <section>
        <p>
          These Terms govern your use of the {siteConfig.name} website at{" "}
          {siteConfig.domain} and the {siteConfig.name} mobile app. By using
          the site or the app, you agree to these Terms.
        </p>
      </section>

      <section>
        <h2>The service</h2>
        <p>
          {siteConfig.name} lets you send and receive money using a wallet
          secured by your device&rsquo;s own biometric authentication — there
          is no password or seed phrase to remember. You sign in with your
          existing Google or Apple account, and every transfer is confirmed
          with Face ID, Touch ID, or your device&rsquo;s equivalent. Features
          are subject to change, and nothing in the app or on this site
          constitutes financial, investment, or tax advice.
        </p>
      </section>

      <section>
        <h2>Eligibility &amp; your account</h2>
        <ul>
          <li>
            You must be legally able to enter into these Terms and, where
            applicable, be of legal age in your jurisdiction to use financial
            services.
          </li>
          <li>
            You are responsible for maintaining access to the Google or Apple
            account you sign in with, and for keeping your device secure —
            transfers are authorized by your device&rsquo;s biometric, so
            anyone with access to an unlocked, enrolled device could
            potentially authorize a transfer.
          </li>
          <li>
            You are responsible for the accuracy of any recipient you send
            money to. Blockchain transfers cannot be reversed once
            confirmed.
          </li>
          <li>
            The app may be changed, limited, or discontinued at any time
            without notice.
          </li>
        </ul>
      </section>

      <section>
        <h2>Fees &amp; transfers</h2>
        <p>
          {siteConfig.name} sponsors the underlying network fee for transfers
          you make through the app, so you never need to separately acquire
          another currency just to pay for network costs. We reserve the
          right to introduce service fees in the future; any such change
          will be disclosed in the app before you confirm an affected
          transfer.
        </p>
      </section>

      <section>
        <h2>Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the app for any unlawful purpose, including money laundering or financing illegal activity.</li>
          <li>Submit false account information or impersonate someone else.</li>
          <li>
            Attempt to disrupt, probe, or gain unauthorised access to the app,
            site, or the systems behind them.
          </li>
          <li>Use the app to circumvent sanctions or other legal restrictions applicable to you.</li>
        </ul>
      </section>

      <section>
        <h2>Intellectual property</h2>
        <p>
          The {siteConfig.name} name, logo, content, and design are owned by
          us and protected by intellectual-property laws. You may not copy,
          reproduce, or reuse them without our written permission.
        </p>
      </section>

      <section>
        <h2>Disclaimers &amp; limitation of liability</h2>
        <p>
          The app and site are provided &ldquo;as is&rdquo; without
          warranties of any kind. Blockchain transactions are irreversible
          and subject to the availability and performance of third-party
          networks we do not control. To the maximum extent permitted by
          law, we are not liable for any indirect or consequential damages
          arising from your use of the app or site, including losses from
          transfers sent to an incorrect recipient.
        </p>
      </section>

      <section>
        <h2>Changes</h2>
        <p>
          We may update these Terms from time to time. Material changes will
          be reflected by the &ldquo;Last updated&rdquo; date above.
          Continued use of the app or site after changes means you accept
          the revised Terms.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions about these Terms? Email{" "}
          <a href="mailto:tech@hover.money">tech@hover.money</a>.
        </p>
      </section>

      <section>
        <p className="text-sm text-ink-3">
          This document describes {siteConfig.name}&rsquo;s actual service as
          of the date above, but is a general template and does not
          constitute legal advice. Money transfer and payment services are
          regulated differently across jurisdictions (including potential
          money-transmitter licensing requirements) — have this document,
          and your regulatory obligations in every jurisdiction you operate
          in, reviewed by qualified counsel before you rely on it in
          production.
        </p>
      </section>
    </LegalPage>
  );
}
