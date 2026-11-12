import type { BlogPost } from "@/lib/blog";

export const postCheapestWay: BlogPost = {
  slug: "cheapest-way-to-receive-international-payments",
  title: "How to compare the cost of receiving international payments",
  description:
    "A worked example and a repeatable checklist for comparing receiving fees, exchange rates and bank withdrawals on the same invoice.",
  datePublished: "2026-11-04",
  category: "Fees",
  keywords: [
    "cheapest way to receive international payments",
    "cross-border payment fees",
    "exchange rate markup",
  ],
  cover: {
    src: "/blog/payment-costs.svg",
    alt: "An illustrative USD 1,000 payment with separate receiving, conversion and withdrawal costs.",
  },
  body: [
    {
      t: "p",
      md: "The cheapest payment method is the one that leaves you with the most usable money for your particular invoice. That can change with the amount, payment method, currencies and destination bank. There is no reliable universal winner.",
    },
    {
      t: "h2",
      text: "Count the whole route",
    },
    {
      t: "p",
      md: "The [World Bank’s remittance-price methodology](https://remittanceprices.worldbank.org/methodology) separates the transaction charge from the exchange-rate margin. Its database concerns remittances, not freelance invoices, but that distinction is useful when checking a business-payment quote too. A transfer advertised without a sending fee can still carry a conversion cost.",
    },
    {
      t: "ul",
      items: [
        "**Receiving fee:** the charge for collecting the client’s payment.",
        "**Conversion cost:** any explicit conversion charge and the difference between the quoted rate and your comparison rate.",
        "**Withdrawal fee:** the cost of moving the funds to your bank.",
        "**Other charges:** check for intermediary-bank deductions, minimum fees or account fees that apply to your use.",
      ],
    },
    {
      t: "h2",
      text: "A worked USD 1,000 example",
    },
    {
      t: "p",
      md: "The figures below are hypothetical. They illustrate the calculation, not the current pricing of Hover or any competitor. Both routes start with the same invoice and finish in the same local currency.",
    },
    {
      t: "table",
      columns: ["Step", "Route A", "Route B"],
      rows: [
        ["Client sends", "USD 1,000", "USD 1,000"],
        ["Receiving charge", "USD 0", "USD 10"],
        ["Balance before conversion", "USD 1,000", "USD 990"],
        ["Quoted local units per USD", "1,470", "1,500"],
        ["Converted amount", "1,470,000", "1,485,000"],
        ["Local withdrawal charge", "0", "5,000"],
        ["Final amount at your bank", "1,470,000", "1,480,000"],
      ],
    },
    {
      t: "p",
      md: "Route B leaves you with 10,000 more local-currency units, despite showing a receiving charge. This is why the last row matters more than the first fee you see. The result would change if either quote or withdrawal charge changed.",
    },
    {
      t: "h2",
      text: "Compare quotes at the same time",
    },
    {
      t: "ol",
      items: [
        "Use the same invoice amount, sender country, receiving currency and payout method.",
        "Record the quote time and whether the rate is guaranteed or estimated.",
        "Include fees charged to the client as well as deductions from your balance.",
        "Write down the final bank payout and the expected availability date.",
        "Repeat the comparison for a typical month if you receive several small invoices.",
      ],
    },
    {
      t: "p",
      md: "Minimum charges affect small invoices more heavily. A hypothetical USD 5 fixed fee is 2% of USD 250 but 0.5% of USD 1,000. Grouping invoices may reduce some fixed charges, but only when your contract and cash-flow needs allow it.",
    },
    {
      t: "h2",
      text: "Read the provider’s own fee schedule",
    },
    {
      t: "p",
      md: "[Payoneer publishes different charges for different payment and withdrawal routes](https://www.payoneer.com/pricing/). [PayPal’s US merchant schedule](https://www.paypal.com/us/business/paypal-business-fees) also separates commercial payments, international transactions and conversion. The US schedule is not a quote for an African account; use the terms for your own registered market.",
    },
    {
      t: "h2",
      text: "Apply the same test to Hover",
    },
    {
      t: "p",
      md: "Hover-to-Hover transfers are free. Receiving a bank payment and withdrawing to a bank are separate steps, so that free transfer rate is not a promise that the entire bank route is free. Check the fee and payout option in the app, and compare the final amount with another usable provider.",
    },
    {
      t: "p",
      md: "You can find [Hover’s published fee information](/company) on the company page. Keep a copy of the quote for the payment you actually make, because that transaction’s terms are more useful than a general marketing headline.",
    },
    {
      t: "h2",
      text: "Sources and further reading",
    },
    {
      t: "ul",
      items: [
        "[World Bank: how remittance costs are measured](https://remittanceprices.worldbank.org/methodology)",
        "[Payoneer: current pricing by route](https://www.payoneer.com/pricing/)",
        "[PayPal: US merchant fees and scope](https://www.paypal.com/us/business/paypal-business-fees)",
      ],
    },
  ],
  dateModified: "2026-11-12",
};
