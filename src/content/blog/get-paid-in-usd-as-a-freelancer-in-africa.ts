import type { BlogPost } from "@/lib/blog";

export const postGetPaidAfrica: BlogPost = {
  slug: "get-paid-in-usd-as-a-freelancer-in-africa",
  title: "How freelancers in Africa can receive payments from overseas clients",
  description:
    "Choose a payment route for overseas invoices, check country eligibility, compare the amount you receive and prepare the details clients need.",
  datePublished: "2026-11-10",
  category: "Getting paid",
  keywords: [
    "get paid in USD Africa",
    "freelancer payments Nigeria",
    "receive USD from clients abroad",
  ],
  cover: {
    src: "/blog/receiving-payments.svg",
    alt: "A client invoice connecting USD, EUR and GBP receiving accounts to a local bank withdrawal.",
  },
  body: [
    {
      t: "p",
      md: "Before you send an overseas client your bank details, check how the payment will reach you and how you will withdraw it. A service can accept a client’s payment method yet lack the payout option you need at home. Those are two separate checks.",
    },
    {
      t: "p",
      md: "This guide is for freelancers receiving business income from clients in the United States, Europe and the UK. It does not rank one service as the best choice across Africa. Your country of residence, client’s bank and invoice currency determine which routes are usable.",
    },
    {
      t: "h2",
      text: "Start with country and account eligibility",
    },
    {
      t: "p",
      md: "Check whether the provider accepts residents of your country and allows the type of business payment you expect. Availability is specific to a feature. For example, [Wise’s USD account eligibility page](https://wise.com/help/articles/2810318/can-i-get-usd-account-details) lists Nigeria among the places where USD receiving details are unavailable. A general claim that a service operates internationally does not settle that question.",
    },
    {
      t: "ul",
      items: [
        "Confirm you can receive commercial payments, not just send money.",
        "Check which identity and address documents are required.",
        "Look for your local bank or withdrawal currency before directing a client to the service.",
        "Read account limits and the rules for payments from marketplaces or third parties.",
      ],
    },
    {
      t: "h2",
      text: "Choose a payment route your client can use",
    },
    {
      t: "table",
      columns: ["Route", "What to confirm before invoicing"],
      rows: [
        [
          "International bank transfer",
          "Ask both banks about transfer charges, receiving charges, conversion and expected arrival.",
        ],
        [
          "Local receiving account",
          "Check the currency, supported payment rail and beneficiary name shown in your account.",
        ],
        [
          "Payment platform",
          "Confirm the client’s payment method and your own withdrawal options.",
        ],
        [
          "Marketplace payout",
          "Check the marketplace’s payout settings, fees and any release period.",
        ],
      ],
    },
    {
      t: "p",
      md: "A receiving account can give your client familiar local details. [Payoneer’s pricing page](https://www.payoneer.com/pricing/) distinguishes receiving-account payments from card and other payment methods. The client’s chosen route therefore matters when comparing costs.",
    },
    {
      t: "h2",
      text: "Compare one complete invoice",
    },
    {
      t: "p",
      md: "For a USD 1,000 invoice, record the amount sent, any receiving fee, the conversion quote, the withdrawal charge and the final local-currency amount. Get quotes for the same amount at roughly the same time. A low receiving fee alone tells you little about the cost of withdrawing.",
    },
    {
      t: "p",
      md: "Keep the payment deadline separate from the invoice due date. A client pressing send on Friday is not the same as funds becoming available for withdrawal that day. Ask for the provider’s estimate for that specific payment method.",
    },
    {
      t: "h2",
      text: "Send clear payment instructions",
    },
    {
      t: "ol",
      items: [
        "Agree on the invoice currency and who pays bank charges before the work starts.",
        "Copy the beneficiary name, bank details and supported transfer method directly from the account screen.",
        "Include the invoice number in the payment message where the provider supports it.",
        "Check receipt in your app or bank statement rather than relying on a payment screenshot.",
        "Keep the invoice, payment receipt and withdrawal record together for your bookkeeping.",
      ],
    },
    {
      t: "h2",
      text: "Where Hover fits",
    },
    {
      t: "p",
      md: "Hover offers USD, EUR and GBP virtual-account details after verification, subject to account eligibility. These are receiving routes. They should not be confused with three separate fiat balances: the app’s underlying balance is USDC. Check the available withdrawal method and the fee shown in the app before giving clients payment instructions.",
    },
    {
      t: "p",
      md: "Payments between Hover users are free. Bank payments use different systems and timings. See [Hover’s company and fee information](/company), then use the [payment-cost checklist](/blog/cheapest-way-to-receive-international-payments) to compare your own route.",
    },
    {
      t: "h2",
      text: "Sources and further reading",
    },
    {
      t: "ul",
      items: [
        "[Wise: USD receiving-account eligibility](https://wise.com/help/articles/2810318/can-i-get-usd-account-details)",
        "[Payoneer: receiving and withdrawal pricing](https://www.payoneer.com/pricing/)",
        "[Hover: company, fees and product information](/company)",
      ],
    },
  ],
  dateModified: "2026-11-12",
};
