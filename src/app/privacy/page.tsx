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
    <LegalPage title="Privacy Policy" updated="August 16, 2026">
      <section>
        <p>
          This Privacy Policy explains how {siteConfig.name} (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) collects, uses, and protects your information when you
          visit {siteConfig.domain} or use the {siteConfig.name} mobile app to send
          and receive money. We collect only what the app needs to work, and we
          never sell your data.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Account information</strong> — your name, email address,
            mobile number, and (optionally) a profile picture, collected when
            you sign in with your Google or Apple account.
          </li>
          <li>
            <strong>Identity verification data</strong> — a cryptographic
            commitment derived from your Google or Apple sign-in, used to
            prove account ownership without our servers ever seeing your
            underlying password or full identity token. This is how new
            transfers and device changes are authorized.
          </li>
          <li>
            <strong>Wallet address</strong> — a blockchain address generated
            for your account on Base (an Ethereum-compatible network), used
            to hold and move your balance. We do not generate or store any
            seed phrase or private key on our servers.
          </li>
          <li>
            <strong>Passkey / biometric data</strong> — the app uses your
            device&rsquo;s Face ID, Touch ID, or equivalent biometric to
            authorize transfers. Your biometric data itself never leaves
            your device or reaches our servers — only a cryptographic
            signature it produces does.
          </li>
          <li>
            <strong>Transaction data</strong> — the amount, recipient,
            timestamp, and optional note for every transfer you send or
            receive, plus any category or nickname you assign to a
            recipient.
          </li>
          <li>
            <strong>Camera access</strong> — used only when you choose to
            scan a QR code to look up a recipient&rsquo;s payment address.
            We do not access your camera at any other time, and scanned
            images are never uploaded or stored.
          </li>
          <li>
            <strong>Contacts (optional)</strong> — if you grant permission,
            we match your phone contacts against existing {siteConfig.name}{" "}
            accounts on our servers to help you find people to pay. We only
            check your own contacts against our user directory — we never
            share your contacts with anyone else, and matching happens
            without a broader directory search.
          </li>
          <li>
            <strong>Diagnostic data</strong> — crash logs and basic
            performance diagnostics to help us find and fix bugs.
          </li>
          <li>
            <strong>Usage analytics on the website</strong> — anonymised,
            aggregated data about how {siteConfig.domain} is used (pages
            viewed, approximate region), collected only if you accept
            analytics cookies.
          </li>
        </ul>
      </section>

      <section>
        <h2>How transfers work</h2>
        <p>
          When you send money, the app builds the transaction and asks you to
          confirm it with your device&rsquo;s biometric. That confirmation
          produces a cryptographic signature, which our relay service submits
          to the blockchain on your behalf — we cover the network fee, so you
          never need to hold a separate currency just to pay gas. We do not
          have the ability to move your funds without your device producing
          that signature first.
        </p>
      </section>

      <section>
        <h2>Cookies and analytics (website only)</h2>
        <p>
          We use a strictly-necessary record of your cookie choice and, if
          you consent, Google Analytics to understand website usage. No
          analytics cookies are set until you click &ldquo;Accept&rdquo; on
          our cookie banner. You can change your choice at any time using
          the &ldquo;Cookie preferences&rdquo; link in the footer.
        </p>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To create and secure your account.</li>
          <li>To process the transfers you authorize.</li>
          <li>To help you find recipients (contact matching, username search).</li>
          <li>To diagnose crashes and improve the app.</li>
          <li>To detect and prevent fraud or abuse.</li>
          <li>To comply with legal obligations.</li>
          <li>To measure and improve the website (with your consent).</li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information, and we
          do not use it for unrelated marketing.
        </p>
      </section>

      <section>
        <h2>What is public on the blockchain</h2>
        <p>
          Transactions you send are recorded on a public blockchain. Your
          wallet address and the transfer amount are publicly visible on the
          blockchain to anyone who looks, the same way they would be for any
          on-chain transaction — but your name, email, and other account
          details are not published on-chain and stay on our servers, subject
          to this policy.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <p>
          Depending on where you live, you may have the right to access,
          correct, export, or delete your personal data, and to withdraw
          consent. You can revoke camera or contacts permission at any time
          in your device&rsquo;s settings. To exercise any other right, or to
          request account deletion, email us at the address below.
        </p>
      </section>

      <section>
        <h2>Data retention &amp; security</h2>
        <p>
          We keep your account and transaction data for as long as your
          account is active, and for a period after closure as required to
          meet legal, tax, or fraud-prevention obligations. Data is
          transmitted over encrypted connections, biometric signing keys are
          held in your device&rsquo;s secure hardware and never leave it, and
          server-side access is limited to those who need it.
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
          This document describes {siteConfig.name}&rsquo;s actual data
          practices as of the date above, but is a general template and does
          not constitute legal advice. Have it reviewed by qualified counsel
          — including for your specific regulatory obligations as a money
          transfer service in the jurisdictions you operate in — before you
          rely on it in production, and update the company/entity details to
          match your registered entity.
        </p>
      </section>
    </LegalPage>
  );
}
