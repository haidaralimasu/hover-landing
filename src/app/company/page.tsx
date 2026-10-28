import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/lib/site";
import { company, fees } from "@/lib/company";

export const metadata: Metadata = {
  title: "Company",
  description: `Who operates ${siteConfig.name}, how money moves, what it costs, and the partners involved.`,
  alternates: { canonical: "/company" },
};

const { address } = company;

export default function CompanyPage() {
  return (
    <LegalPage title={`About ${siteConfig.name}`} updated="October 28, 2026">
      <section>
        <h2>What Hover is</h2>
        <p>
          {siteConfig.name} is a payments app for sending and receiving money
          across borders. You sign in with Google, Apple or an email code,
          choose a recipient and an amount, and approve the payment on your
          own device.
        </p>
      </section>

      <section>
        <h2>Who operates Hover</h2>
        <p>
          {siteConfig.name} is operated by {company.legalName}, a limited
          liability company registered in Montana, USA.
        </p>
        <p>
          {address.street}, {address.city}, {address.region}{" "}
          {address.postalCode}, United States ·{" "}
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </p>
      </section>

      <section>
        <h2>How money moves</h2>
        <ul>
          <li>
            Your Hover balance is held as USDC, a digital US dollar, in an
            account only you can approve payments from.
          </li>
          <li>
            Payments to another Hover user settle in seconds, any day of the
            week. Hover pays the network cost.
          </li>
          <li>
            Adding money from, or withdrawing to, a US bank account is handled
            by our banking partner and takes as long as the bank transfer,
            typically one to a few business days.
          </li>
          <li>
            Every payment is recorded on a public ledger. Your wallet address
            and amounts are visible there; your name and email are not. See
            our <a href="/privacy">Privacy Policy</a>.
          </li>
        </ul>
      </section>

      <section>
        <h2>Fees</h2>
        <ul>
          <li>Send to another Hover user: {fees.sendToHoverUser}% (free)</li>
          <li>Add money from a US bank account: {fees.addFromBank}%</li>
          <li>Withdraw to a US bank account: {fees.withdrawToBank}%</li>
        </ul>
        <p>
          Example: adding $100 from your bank costs ${fees.addFromBank.toFixed(2)},
          so ${(100 - fees.addFromBank).toFixed(2)} arrives in Hover. Withdrawing $100 costs $
          {fees.withdrawToBank.toFixed(2)}. You always see the exact fee in the
          app before you confirm.
        </p>
      </section>

      <section>
        <h2>Partners</h2>
        <ul>
          <li>
            <strong>Privy</strong> provides sign-in and the secure account
            technology your payments are approved with.
          </li>
          <li>
            <strong>Bridge</strong> provides bank transfers in and out of
            Hover and may ask you to verify your identity.
          </li>
        </ul>
      </section>

      <section>
        <h2>Important to know</h2>
        <ul>
          <li>
            {siteConfig.name} is not a bank. Balances are not bank deposits
            and are not FDIC-insured.
          </li>
          <li>
            Payments can&rsquo;t be reversed once sent. Always check the
            recipient before you confirm.
          </li>
          <li>
            Availability depends on where you live and may change. See our{" "}
            <a href="/terms">Terms of Service</a>.
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
