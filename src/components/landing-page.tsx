import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Fingerprint,
  Link2,
  LockKeyhole,
  Send,
  ShieldCheck,
  Wallet,
} from "lucide-react";
import { StoreBadges } from "@/components/store-badges";
import { MobileAccessForm } from "@/components/mobile-access-form";
import { Faq } from "@/components/sections/faq";

const accounts = [
  {
    symbol: "$",
    currency: "USD",
    country: "United States",
    detail: "US account & routing number",
  },
  {
    symbol: "€",
    currency: "EUR",
    country: "Europe",
    detail: "European account & IBAN",
  },
  {
    symbol: "£",
    currency: "GBP",
    country: "United Kingdom",
    detail: "UK account & sort code",
  },
];

function AppPreview() {
  return (
    <div className="landing-product">
      <Image
        src="/screenshots/hover-home-front.png"
        alt="Hover on iPhone showing the balance, US, Europe and UK virtual accounts, and recent payments."
        width={1419}
        height={2796}
        sizes="(max-width: 767px) 320px, 440px"
        loading="eager"
        className="landing-app-screenshot"
      />
    </div>
  );
}

export function LandingPage() {
  return (
    <>
      <section className="landing-hero landing-wrap">
        <div className="landing-hero-copy">
          <p className="landing-kicker">FOR WORK THAT GOES GLOBAL</p>
          <h1>
            Get paid by
            <br />
            clients abroad.
          </h1>
          <p className="landing-hero-description">
            Receive USD, EUR or GBP instantly and withdraw to your local bank
            account.
          </p>
          <StoreBadges className="landing-store-row" />
          <a href="#accounts" className="landing-text-link">
            See how it works <span aria-hidden="true">↓</span>
          </a>
        </div>
        <AppPreview />
      </section>

      <section id="accounts" className="landing-accounts-section">
        <div className="landing-wrap">
          <div className="landing-section-top">
            <h2>
              Three currencies.
              <br />
              One place to get paid.
            </h2>
            <p>
              Give clients your account details.
              <br />
              They pay from their bank. You receive it in Hover.
            </p>
          </div>
          <div className="landing-currency-grid">
            {accounts.map((a) => (
              <article key={a.currency} className="landing-currency-card">
                <span className="landing-currency-symbol">{a.symbol}</span>
                <div>
                  <p>{a.country}</p>
                  <h3>{a.currency} account</h3>
                </div>
                <div className="landing-account-detail">
                  <span>{a.detail}</span>
                  <Check size={17} />
                </div>
              </article>
            ))}
          </div>
          <p className="landing-fine-print">
            Virtual accounts require verification. Availability and bank
            transfer times depend on your account and payment method.
          </p>
        </div>
      </section>

      <section id="how-it-works" className="landing-wrap landing-section">
        <div className="landing-section-top">
          <h2>
            From client payment
            <br />
            to your local bank.
          </h2>
          <p>
            A few steps in the app.
            <br />
            Then back to the work you love.
          </p>
        </div>
        <div className="landing-steps">
          {[
            [
              "01",
              "Create your account",
              "Download Hover, sign in and complete verification.",
            ],
            [
              "02",
              "Share your bank details",
              "Choose your USD, EUR or GBP account and send the details to your client.",
            ],
            [
              "03",
              "Move your money",
              "Receive your payment, then withdraw to your local bank where supported.",
            ],
          ].map(([number, title, body]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section
        id="features"
        className="landing-wrap landing-section landing-payment-section"
      >
        <div className="landing-payment-panel">
          <div className="landing-payment-copy">
            <span className="landing-feature-icon">
              <Link2 size={23} />
            </span>
            <h2>
              Send a link.
              <br />
              Get paid.
            </h2>
            <p>
              Create a payment request and share the link with your client. Keep
              your requests and payments together in Hover.
            </p>
            <Link href="#download" className="landing-action">
              Get Hover <ArrowUpRight size={18} />
            </Link>
          </div>
          <div
            className="landing-request-preview"
            aria-label="Example payment request"
          >
            <span className="landing-request-logo">H</span>
            <p>Payment request</p>
            <strong>$850.00</strong>
            <span>Project payment</span>
            <div>
              <span>Amount</span>
              <b>850.00 USD</b>
            </div>
            <div>
              <span>Payment method</span>
              <b>Bank transfer</b>
            </div>
            <span className="landing-request-button">
              View payment details <ArrowUpRight size={17} />
            </span>
            <small>Example payment request</small>
          </div>
        </div>
        <div className="landing-benefits">
          <article>
            <Send size={23} />
            <h3>Send to another Hover user</h3>
            <p>Move money between Hover users for free.</p>
          </article>
          <article>
            <Wallet size={23} />
            <h3>Know what you’re paying</h3>
            <p>See the transfer fee before you confirm.</p>
          </article>
          <article>
            <ArrowUpRight size={23} />
            <h3>Withdraw to your bank</h3>
            <p>Choose an available bank withdrawal option in the app.</p>
          </article>
        </div>
      </section>

      <section id="security" className="landing-security-section">
        <div className="landing-wrap landing-security">
          <div>
            <span className="landing-feature-icon">
              <ShieldCheck size={24} />
            </span>
            <h2>
              Your money.
              <br />
              Your approval.
            </h2>
            <p>
              Every payment needs confirmation on your device. Hover staff can’t
              move your money for you.
            </p>
            <Link href="/company" className="landing-text-link">
              How Hover works <ArrowUpRight size={16} />
            </Link>
          </div>
          <ul>
            {[
              {
                Icon: Fingerprint,
                title: "Sign in without a password",
                body: "Use Google, Apple or a one-time email code.",
              },
              {
                Icon: LockKeyhole,
                title: "Approve each payment",
                body: "Check the recipient and amount before you send.",
              },
              {
                Icon: ShieldCheck,
                title: "Stay in control",
                body: "Keep your device locked and your sign-in details private.",
              },
            ].map(({ Icon, title, body }) => (
              <li key={title}>
                <span>
                  <Icon size={23} />
                </span>
                <div>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Faq />

      <section id="download" className="landing-wrap landing-download-section">
        <div className="landing-download">
          <p className="landing-kicker">YOUR NEXT CLIENT COULD BE ANYWHERE</p>
          <h2>Be ready to get paid.</h2>
          <p>Get Hover for iPhone or Android.</p>
          <StoreBadges />
          {/* Newsletter signup, anchored so footer/#newsletter links land here. */}
          <div id="newsletter" className="landing-newsletter">
            <p>Get product updates by email.</p>
            <MobileAccessForm cta="Subscribe" />
          </div>
          <Link href="/help" className="landing-text-link">
            Have a question? Talk to us <ArrowUpRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
