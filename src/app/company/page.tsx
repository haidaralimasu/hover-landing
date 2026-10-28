import type { Metadata } from "next";
import Link from "next/link";
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
            Adding money from, or withdrawing to, a US bank account is
            provided by Bridge and takes as long as the bank transfer,
            typically one to a few business days.
          </li>
          <li>
            Every payment is recorded on a public ledger. Your wallet address
            and amounts are visible there; your name and email are not. See
            our <Link href="/privacy">Privacy Policy</Link>.
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
        <h2>Who can use Hover</h2>
        <ul>
          <li>You must be of legal age to use financial services where you live.</li>
          <li>
            Hover isn&rsquo;t available where prohibited by law or sanctions.
            Bank transfers in and out are supported for US bank accounts.
          </li>
          <li>
            Hover doesn&rsquo;t set its own limits on payments between Hover
            users. Bridge may apply limits and ask you to verify your identity
            before bank transfers.
          </li>
        </ul>
      </section>

      <section>
        <h2>Who provides what</h2>
        <ul>
          <li>
            <strong>Bridge</strong> is our partner for bank transfers in and
            out of Hover.
          </li>
          <li>
            <strong>Privy</strong> is the technology provider for sign-in and
            the account your payments are approved from.
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
            <Link href="/terms">Terms of Service</Link>.
          </li>
        </ul>
      </section>
    </LegalPage>
  );
}
