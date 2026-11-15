import type { BlogPost } from "@/lib/blog";

export const postPaymentMistakes: BlogPost = {
  slug: "mistakes-that-delay-international-client-payments",
  title:
    "9 mistakes that delay payments from international clients (and how freelancers can fix each one)",
  description:
    "Late payments from clients abroad are often caused by small, fixable mistakes. Here are nine of the most common, and what to do instead.",
  datePublished: "2026-11-15",
  category: "Getting paid",
  keywords: [
    "international client payment delayed",
    "why is my payment from abroad late",
    "freelancer payment mistakes",
  ],
  cover: {
    src: "/blog/payment-chain.svg",
    alt: "A payment passing from the payer, through banks and an intermediary, to the freelancer, with possible fees and delays at each step.",
  },
  body: [
    {
      t: "p",
      md: "The work is done, the client says the money is on its way, and then nothing arrives for a week. Sometimes the client really is slow. But often the delay comes from something small on the freelancer's side: a missing detail, the wrong account number for the route, or a form nobody asked for until the last minute. Here are nine of the most common mistakes, and how to fix each one before it costs you a week.",
    },
    { t: "h2", text: "1. Writing \"$\" instead of a currency code" },
    {
      t: "p",
      md: "A dollar sign can mean US, Canadian, Australian and several other dollars. If the client's finance team has to ask which one you mean, your invoice goes to the back of the queue. **Fix:** write the three-letter code next to every amount: USD 1,200, EUR 900, GBP 750.",
    },
    { t: "h2", text: "2. Sharing account details for the wrong payment route" },
    {
      t: "p",
      md: "US clients can pay by ACH or by wire, and these are [different payment methods](https://www.federalreserve.gov/paymentsystems/fedach_about.htm). Euro payments usually travel by SEPA, UK payments by Faster Payments. Details that work for one route may not work for another. **Fix:** ask the client how they plan to pay, then send the details your provider lists for exactly that route.",
    },
    { t: "h2", text: "3. An account name that doesn't match" },
    {
      t: "p",
      md: "If the name the client types doesn't match the name on the receiving account, the payment can be held for checks or sent back. Nicknames, missing middle names and business names are common causes. **Fix:** copy the account holder name exactly as your provider shows it, and ask the client to use it word for word.",
    },
    { t: "h2", text: "4. Addressing the invoice to your contact, not the company" },
    {
      t: "p",
      md: "The person you work with is often not the person who pays you. Accounts teams may reject an invoice that isn't made out to the company's legal name and billing address. **Fix:** before you invoice, ask: \"Who should the invoice be addressed to, and where should I send it?\"",
    },
    { t: "h2", text: "5. Skipping the client's supplier paperwork" },
    {
      t: "p",
      md: "Many companies must set you up as a supplier before they can pay you. US companies, for example, often ask foreign contractors for [IRS Form W-8BEN](https://www.irs.gov/forms-pubs/about-form-w-8-ben) before the first payment. Some need a purchase order number on every invoice. **Fix:** at the start of the project, ask: \"Is there any form or PO number you need from me to pay on time?\" For tax questions about these forms, speak to a local adviser.",
    },
    { t: "h2", text: "6. \"Net 30\" with no actual date" },
    {
      t: "p",
      md: "Thirty days from what: the invoice date, the delivery date, the day it was approved? Vague terms give everyone room to be late. **Fix:** write a real due date on the invoice, for example \"Due 15 December 2026\".",
    },
    { t: "h2", text: "7. No payment reference" },
    {
      t: "p",
      md: "When a client pays several invoices, or several clients pay you in the same week, a payment with no reference is hard to match. That leads to \"did you get it?\" emails and second payments sent by mistake. **Fix:** ask the client to use the invoice number as the payment reference.",
    },
    { t: "h2", text: "8. Forgetting weekends and bank holidays" },
    {
      t: "p",
      md: "Bank transfers move on banking days. A payment sent on a Friday evening, or before a public holiday in the client's country, may not move until the next working day. **Fix:** send invoices early in the week, and keep the client's public holidays in mind near the due date.",
    },
    { t: "h2", text: "9. Waiting too long to follow up" },
    {
      t: "p",
      md: "Many freelancers wait weeks before asking about a late payment, worried about seeming rude. But a short, friendly note on the due date is normal business practice, and it often turns up a simple problem, like an invoice stuck in someone's inbox. **Fix:** follow up on the due date, again a week later, and refer to the agreed terms after that. Our [invoicing checklist](/blog/how-to-invoice-an-international-client) includes a message you can copy.",
    },
    { t: "h2", text: "The 30-second check before you send an invoice" },
    {
      t: "ul",
      items: [
        "Currency code on every amount",
        "Account details for the route the client will use",
        "Account name exactly as your provider shows it",
        "Client's legal company name and billing address",
        "Supplier forms and PO number sorted",
        "A real due date",
        "Invoice number as the payment reference",
      ],
    },
    {
      t: "p",
      md: "Hover gives freelancers their own USD, EUR and GBP account details, so clients abroad can pay with the bank transfer they already use. To compare your options first, see our guide to [comparing the cost of receiving international payments](/blog/cheapest-way-to-receive-international-payments).",
    },
    { t: "h2", text: "Sources and further reading" },
    {
      t: "ul",
      items: [
        "[Federal Reserve: ACH explained](https://www.federalreserve.gov/paymentsystems/fedach_about.htm)",
        "[IRS: About Form W-8BEN](https://www.irs.gov/forms-pubs/about-form-w-8-ben)",
        "[European Central Bank: SEPA](https://www.ecb.europa.eu/paym/integration/retail/sepa/html/index.en.html)",
        "[Pay.UK: Faster Payment System](https://www.wearepay.uk/what-we-do/payment-systems/faster-payment-system/)",
      ],
    },
  ],
};
