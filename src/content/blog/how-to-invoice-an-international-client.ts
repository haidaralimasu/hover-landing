import type { BlogPost } from "@/lib/blog";

export const postInvoiceInternational: BlogPost = {
  slug: "how-to-invoice-an-international-client",
  title: "How to invoice an international client: a freelancer checklist",
  description:
    "What to put on an invoice for a client abroad, how to share payment details, and a message template you can send with it.",
  datePublished: "2026-11-14",
  category: "Getting paid",
  keywords: [
    "how to invoice international clients",
    "freelance invoice template",
    "invoice a client abroad",
  ],
  cover: {
    src: "/blog/receiving-payments.svg",
    alt: "A client invoice for $1,000 marked ready to pay, next to USD, EUR and GBP account details.",
  },
  body: [
    {
      t: "p",
      md: "Most late international payments are not caused by bad clients. They are caused by an invoice that leaves a question open: which currency, which account, by when, or who pays the transfer charge. Every open question can add another email and another delay. This checklist closes them before you hit send.",
    },
    {
      t: "h2",
      text: "Agree the basics before you start the work",
    },
    {
      t: "p",
      md: "Three things are easier to settle in the proposal than on the invoice: the **currency**, the **payment terms** (for example, 14 days after the invoice date) and **who covers transfer fees**. Write all three into the proposal or contract so the invoice simply repeats what the client already agreed.",
    },
    {
      t: "h2",
      text: "What to put on the invoice",
    },
    {
      t: "ul",
      items: [
        "**Your details:** your full name or business name, your address and an email the client can reply to.",
        "**The client's details:** their legal company name and address, not just the name of the person you work with. Their finance team may need it to approve the payment.",
        "**An invoice number:** a unique, sequential number (for example 2026-014) so both sides can refer to it.",
        "**Dates:** the invoice date and a clear due date. \"Due 28 November 2026\" leaves less room for doubt than \"Net 14\".",
        "**What you delivered:** a short line for each piece of work, with quantity, rate and total.",
        "**The currency code:** write USD, EUR or GBP next to every amount. A \"$\" sign alone can mean several currencies.",
        "**Payment details:** the account details for that currency (see below).",
        "**A payment reference:** ask the client to quote the invoice number so you can match the payment.",
      ],
    },
    {
      t: "p",
      md: "Tax rules, such as whether you need to show a tax number or a VAT note, depend on where you and the client are based. Check with a local accountant or your tax authority; this guide does not cover tax.",
    },
    {
      t: "h2",
      text: "Share payment details that match the currency",
    },
    {
      t: "p",
      md: "Clients pay fastest when they can use the bank transfer they already use for local suppliers. Give them the details for the route that matches the invoice currency:",
    },
    {
      t: "table",
      columns: ["Invoice currency", "Usual route", "Details the client needs"],
      rows: [
        ["USD", "ACH or wire (US)", "Account holder name, routing number, account number, account type"],
        ["EUR", "SEPA transfer", "Account holder name, IBAN, and BIC if asked"],
        ["GBP", "Faster Payments (UK)", "Account holder name, sort code, account number"],
      ],
    },
    {
      t: "p",
      md: "Copy the details exactly as your provider shows them, and check whether your account accepts the route the client plans to use. ACH and international wires, for example, are different payment methods. Our guide to [choosing between USD, EUR and GBP](/blog/usd-vs-eur-vs-gbp-getting-paid-by-overseas-clients) explains each route in more detail.",
    },
    {
      t: "h2",
      text: "A message to send with the invoice",
    },
    {
      t: "p",
      md: "Keep the email short and put the key facts in the body, so the client does not have to open the attachment to find them:",
    },
    {
      t: "quote",
      md: "Hi Anna, please find invoice 2026-014 attached for the October design work: USD 1,200, due 28 November. You can pay by ACH or wire to the US account details on the invoice. Please use 2026-014 as the payment reference. Thanks again, it was a great project.",
    },
    {
      t: "h2",
      text: "If the payment is late",
    },
    {
      t: "ol",
      items: [
        "**On the due date:** send a friendly note with the invoice attached again. Many late payments are simply invoices that got lost in an inbox.",
        "**A week later:** ask whether anything is blocking the payment, such as a missing purchase order number or a detail their finance team needs.",
        "**After that:** refer to the payment terms you agreed in the contract, and ask for a date they can commit to.",
      ],
    },
    {
      t: "p",
      md: "Stay polite at every step. Most clients pay, and you probably want to work with them again.",
    },
    {
      t: "h2",
      text: "Make the next invoice easier",
    },
    {
      t: "p",
      md: "Save the invoice as a template with your details and payment instructions filled in, so each new invoice only needs the client, the work and the dates. If you invoice in more than one currency, keep one template per currency so the right account details are always attached.",
    },
    {
      t: "p",
      md: "Hover gives freelancers their own USD, EUR and GBP account details, so overseas clients can pay by a normal bank transfer. To compare your options first, read our guide to the [cheapest way to receive international payments](/blog/cheapest-way-to-receive-international-payments).",
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
      ],
    },
  ],
};
