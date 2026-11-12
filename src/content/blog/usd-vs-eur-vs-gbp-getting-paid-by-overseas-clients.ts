import type { BlogPost } from "@/lib/blog";

export const postUsdEurGbp: BlogPost = {
  slug: "usd-vs-eur-vs-gbp-getting-paid-by-overseas-clients",
  title: "USD, EUR or GBP: choosing a currency for client invoices",
  description:
    "Match invoice currency to the client’s payment route and your own expenses. Understand ACH, SEPA and UK bank payments before choosing.",
  datePublished: "2026-11-07",
  category: "Getting paid",
  keywords: [
    "which currency to invoice in",
    "USD EUR GBP freelance payments",
    "receive GBP from clients",
  ],
  cover: {
    src: "/blog/invoice-currencies.svg",
    alt: "Three currency cards showing USD with ACH or wire, EUR with SEPA, and GBP with UK bank transfers.",
  },
  body: [
    {
      t: "p",
      md: "A US client may want to pay in dollars, a German agency in euros and a UK studio in pounds. Accepting each currency can make invoicing easier, but it does not automatically make every payment cheaper. Your own expenses and the payment route matter too.",
    },
    {
      t: "h2",
      text: "Agree on the currency before you agree on the price",
    },
    {
      t: "p",
      md: "A fee of 1,000 means little without a currency. Put the currency code on the proposal and invoice, agree on who pays transfer charges, and explain how long any converted quote remains valid. This avoids an exchange-rate disagreement after the work is delivered.",
    },
    {
      t: "h2",
      text: "USD: confirm ACH or wire instructions",
    },
    {
      t: "p",
      md: "The [Federal Reserve describes ACH](https://www.federalreserve.gov/paymentsystems/fedach_about.htm) as a network for electronic credit and debit transfers between depository institutions. It is a different payment method from a wire. When a client asks for USD details, confirm which route your receiving account accepts rather than treating the two as interchangeable.",
    },
    {
      t: "p",
      md: "Copy the routing number and account number from the instructions for that route. Do not assume a bank account accepts international wires simply because it accepts a domestic USD transfer. Ask the provider if the client’s proposed method is unclear.",
    },
    {
      t: "h2",
      text: "EUR: check that the payment is a supported SEPA transfer",
    },
    {
      t: "p",
      md: "The [European Central Bank’s SEPA overview](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html) explains that SEPA supports cashless euro payments across participating countries, including some outside the EU. It is a payment area, not a synonym for every European country or currency.",
    },
    {
      t: "p",
      md: "For a EUR invoice, share the beneficiary name and IBAN shown in your account, plus any BIC or other details the provider requires. Confirm the supported scheme and arrival estimate. Having an IBAN alone does not guarantee that a payment will be instant.",
    },
    {
      t: "h2",
      text: "GBP: use the UK account instructions supplied",
    },
    {
      t: "p",
      md: "[Pay.UK operates the Faster Payment System](https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/). Ask whether your GBP receiving account accepts that route and use its account number and sort code. Other UK payment methods can have different requirements, so follow the instructions in the receiving account.",
    },
    {
      t: "h2",
      text: "A practical way to choose",
    },
    {
      t: "table",
      columns: ["Your situation", "What to compare"],
      rows: [
        [
          "Most clients and expenses are in USD",
          "USD invoicing may reduce repeated conversions.",
        ],
        [
          "Client pays in EUR; your costs are local",
          "Compare direct EUR receipt and local payout against a USD route.",
        ],
        [
          "UK client can only make domestic GBP payments",
          "Confirm GBP account eligibility and the accepted UK payment method.",
        ],
        [
          "You spend in several currencies",
          "Check whether the provider holds those currencies or converts on receipt.",
        ],
      ],
    },
    {
      t: "h2",
      text: "Receiving a currency is different from holding it",
    },
    {
      t: "p",
      md: "Read what happens after money reaches the receiving account. A provider may hold the original currency, convert it automatically, or credit a different asset. Do not promise yourself control over conversion timing until you have checked those terms.",
    },
    {
      t: "p",
      md: "In Hover, USD, EUR and GBP are virtual-account receiving options. The app’s underlying balance is USDC, so these details do not mean you are holding separate dollar, euro and pound bank deposits. Bank conversion and withdrawal options depend on the supported route.",
    },
    {
      t: "h2",
      text: "Use expenses to set a plan, not exchange-rate guesses",
    },
    {
      t: "p",
      md: "If you have a local-currency bill due soon, keeping all your income in another currency leaves that bill exposed to rate changes. Compare the current payout with the amount you need and the payment deadline. This guide is about choosing a payment route, not forecasting which currency will rise.",
    },
    {
      t: "p",
      md: "For the cost calculation, use our [international-payment comparison guide](/blog/cheapest-way-to-receive-international-payments).",
    },
    {
      t: "h2",
      text: "Sources and further reading",
    },
    {
      t: "ul",
      items: [
        "[Federal Reserve: ACH explained](https://www.federalreserve.gov/paymentsystems/fedach_about.htm)",
        "[European Central Bank: SEPA](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html)",
        "[Pay.UK: Faster Payment System](https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/)",
        "[Hover: product and company information](/company)",
      ],
    },
  ],
  dateModified: "2026-11-12",
};
