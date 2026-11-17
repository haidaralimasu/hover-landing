import type { BlogPost } from "@/lib/blog";

export const postCameroonWeekOne: BlogPost = {
  slug: "how-freelancers-in-cameroon-get-paid-week-one",
  title:
    "How freelancers in Cameroon get paid by clients abroad: notes from our first week of calls",
  description:
    "We emailed 73 freelancers in Cameroon to ask how their clients abroad pay them. Here's what we did, what we heard, and how to check your own real cost.",
  datePublished: "2026-11-17",
  category: "Building Hover",
  keywords: [
    "how freelancers in Cameroon get paid",
    "receive international payments Cameroon",
    "freelancer payment fees Africa",
  ],
  cover: {
    src: "/blog/payment-chain.svg",
    alt: "A payment passing from the payer, through intermediaries, to the freelancer, with possible fees and delays at each step.",
  },
  body: [
    {
      t: "p",
      md: "We're building Hover for freelancers who get paid by clients in other countries. Before building more, we wanted to hear directly from those freelancers how it works for them today. So this week we stopped guessing and asked.",
    },
    { t: "h2", text: "What we did" },
    {
      t: "ul",
      items: [
        "We emailed **73 freelancers in Cameroon** listed in public professional directories.",
        "The email asked one question: how do your clients abroad pay you today? And would you do a 15-minute call?",
        "People who didn't reply got **one** short follow-up a few days later. That's 23 follow-ups so far.",
        "**2 freelancers said yes, and both calls have now happened.** One email bounced.",
      ],
    },
    {
      t: "p",
      md: "Two calls is a small number, and we won't pretend it represents every freelancer in Cameroon. But it was enough to show us something worth writing down.",
    },
    { t: "h2", text: "What the first freelancer told us" },
    {
      t: "p",
      md: "His clients abroad pay him through **PayPal or Payoneer**, depending on the client. Either way, the money takes **days** to reach him. And by his own estimate, he loses **around 10% of every payment** to fees and exchange rates.",
    },
    {
      t: "p",
      md: "That's his estimate, not a measured figure, and costs depend on the provider, the currencies and the amount. But it matches what many freelancers describe: the cost isn't one fee you can point to. It's spread across several steps.",
    },
    { t: "h2", text: "Why around 10% matters more than it sounds" },
    {
      t: "p",
      md: "On a single USD 1,000 invoice, losing about 10% means receiving roughly USD 900. Spread over a year, it adds up. For example, a freelancer who invoices USD 2,000 a month would lose about USD 2,400 a year at that rate. That's more than a full month of income, spent just on getting paid.",
    },
    {
      t: "p",
      md: "As one reader put it after our LinkedIn post, the headline fee is rarely the full cost. The exchange rate you get, and the days of waiting, matter too.",
    },
    { t: "h2", text: "How to check your own number in 3 steps" },
    {
      t: "ol",
      items: [
        "Take one recent invoice. Note the amount **the client sent**, in their currency (for example USD 1,000).",
        "Note the amount that **actually arrived** in your account, in your currency.",
        "Convert the invoice amount at the **mid-market exchange rate** for that day (the rate you see on a currency converter, with no margin added). The difference between that figure and what arrived is your real cost. Divide it by the converted figure to get a percentage.",
      ],
    },
    {
      t: "p",
      md: "Do this for two or three payments, through each method you use. It's the most honest way to compare options, because it includes every fee and every exchange-rate margin along the way. Our guide to [comparing the cost of receiving international payments](/blog/cheapest-way-to-receive-international-payments) goes into more detail.",
    },
    { t: "h2", text: "What we're doing next" },
    {
      t: "p",
      md: "We're continuing the outreach and the calls, and we've asked on X and LinkedIn how other freelancers' clients pay them. We'll update these notes as we learn more.",
    },
    {
      t: "p",
      md: "If you're a freelancer paid by clients abroad and you're happy to share how it works for you, we'd love to hear from you at **tech@hovermoney.com**.",
    },
    {
      t: "p",
      md: "Hover gives freelancers their own US, UK and euro account details, so clients abroad can pay by a normal bank transfer. It's available on the App Store and Google Play.",
    },
  ],
};
