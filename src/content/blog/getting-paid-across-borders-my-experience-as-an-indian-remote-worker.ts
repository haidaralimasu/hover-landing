import type { Post } from "@/lib/blog/types";
import { fees } from "@/lib/company";

// Facts about Hover come from src/lib/company.ts and docs/claims.md. Facts
// about third parties are tied to the sources listed at the bottom of this
// file, as read on 2026-11-09. Personal experience is stated in general terms
// only: no invented clients, amounts, dates or incidents. The cost table is
// labelled hypothetical.

export const post: Post = {
  slug: "getting-paid-across-borders-my-experience-as-an-indian-remote-worker",
  title:
    "Getting Paid Across Borders: My Experience as a Remote Worker and Why International Payments Need to Be Better",
  description:
    "I'm an AI engineer who works remotely. Earning from abroad was the easy part. Here is what fees, exchange rates and delays taught me.",
  intro:
    "I'm an AI engineer, and I work remotely. For a long time I assumed the hard part of working with people abroad was finding the work and doing it well. Getting paid turned out to be a skill of its own.",
  category: "real-stories",
  authorId: "mustakim-nagori",
  publishedAt: "2026-11-09",
  featuredImage: "/blog/getting-paid-across-borders-hero.svg",
  featuredImageAlt:
    "Bar chart of a hypothetical $1,000 payment: $1,000 paid, then fees of $15, exchange rate of $25 and bank charges of $20 taken off, leaving $940 received. Example figures only.",
  featuredImageWidth: 1200,
  featuredImageHeight: 800,
  seoTitle: "Getting Paid from Abroad: A Remote Worker's Story",
  seoDescription:
    "A remote worker on the real cost of getting paid from abroad: transfer fees, exchange-rate margins, delays and setup, plus how to compare your options.",
  keywords: [
    "getting paid from abroad",
    "international payments for remote workers",
    "receiving international payments",
    "international transfer fees",
    "exchange rate margin",
    "getting paid internationally as a freelancer",
  ],
  featured: true,
  blocks: [
    { type: "h2", id: "remote-work-is-global", text: "Remote work is global. Payments mostly aren't." },
    {
      type: "p",
      text: "Working remotely as an AI engineer means my work can be used by people anywhere, and the people paying for it can be anywhere too. That is the best part of the job. I get to work on problems I find interesting, with teams I would never have met otherwise, without moving.",
    },
    {
      type: "p",
      text: "But a payment has to travel in a way a person's work doesn't. My work crosses borders as a message or a pull request. The money crosses as a chain of banks, currencies, rules and cut-off times, and every link in that chain can change what ends up in my account.",
    },
    {
      type: "p",
      text: "This post is about that chain. I'm not going to name clients or put numbers on my own invoices, because the details of my work aren't the point. The pattern is, and I suspect it is familiar to anyone who earns in one currency and lives in another.",
    },

    { type: "h2", id: "four-problems", text: "Four problems I keep running into" },
    {
      type: "p",
      text: "These are the four problems I have dealt with myself. None of them is dramatic on its own. Together they decide how much of your work you actually get to keep.",
    },
    { type: "h3", id: "high-fees", text: "1. Fees you only notice afterwards" },
    {
      type: "p",
      text: "Some fees are printed clearly. Others never appear on the invoice at all, or show up as a smaller number in your account than you expected. I have learned to stop asking \"what is the fee?\" and start asking \"how much will actually arrive?\" They are different questions, and the second one is the one that pays the rent.",
    },
    { type: "h3", id: "exchange-rates", text: "2. Exchange rates that quietly take a cut" },
    {
      type: "p",
      text: "The rate you see when you search for a currency pair is not always the rate you are given. The gap between the two is a cost, even when the provider says the transfer itself is free. \"No fee\" and \"a good rate\" are two separate claims, and it is easy to be shown one while paying for the other.",
    },
    { type: "h3", id: "delays", text: "3. Delays, and not knowing where the money is" },
    {
      type: "p",
      text: "A payment can be marked as sent on one day and be usable on another. What bothers me is less the waiting than the not knowing. When you can't see where a payment is, you can't plan around it, and plans are what monthly expenses are made of.",
    },
    { type: "h3", id: "receiving", text: "4. Just getting set up to receive" },
    {
      type: "p",
      text: "Before you are paid, you need a way to be paid: account details the sender can use, the right currency, a name that matches your documents, and sometimes extra paperwork at your own bank. The sender often has a platform they prefer, and it is not always the one that suits you. Everything has to line up before a single payment moves.",
    },
    {
      type: "callout",
      title: "Why do I receive less than the invoice amount?",
      text: "Because several things can be taken out between sender and receiver: the sender's provider fee, an exchange-rate margin, charges from intermediary or receiving banks, and sometimes a fee for receiving itself. Which of these apply depends on the route the payment takes.",
    },

    { type: "h2", id: "where-the-money-goes", text: "Where the money actually goes" },
    {
      type: "figure",
      src: "/blog/payment-chain.svg",
      alt: "Diagram of a payment passing left to right from the payer, to the payer's bank, an intermediary, your bank and finally you, with fees, exchange rates, deductions and waiting marked between the steps.",
      caption: "A cross-border payment can pass through several hands. Which steps exist depends on the route.",
      width: 1200,
      height: 420,
    },
    {
      type: "p",
      text: "It helps to give each cost a name, because providers rarely do it for you. Here is the vocabulary I now use:",
    },
    {
      type: "ul",
      items: [
        "**Transfer fee:** a charge for sending or receiving the payment. It may be a flat amount, a percentage, or both.",
        "**Mid-market rate:** the midpoint between the buy and sell prices of a currency in the market. It is the rate you see on a search engine or currency site, and a useful yardstick.",
        "**Exchange-rate margin (spread):** the difference between the mid-market rate and the rate you are actually given. It is a real cost even when no fee is shown.",
        "**Intermediary and receiving-bank charges:** on bank transfers, banks in the middle can deduct charges, and your own bank may charge to receive. Whether and how much depends on the banks involved and how the payment was set up.",
        "**Processing time:** the gap between a payment being sent and the money being usable. Bank cut-off times, compliance checks, weekends and holidays all play a part.",
      ],
    },
    {
      type: "p",
      text: "How much does all of this add up to? The World Bank tracks it for remittances. In the first quarter of 2025, the global average total cost of sending $200 was [6.49%](https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf). Remittances are not the same thing as a freelancer's invoice, and your route may be cheaper or dearer, but the figure shows the scale of the problem. The UN's [sustainable development goal 10.c](https://worldbank.github.io/sdg-metadata/metadata/en/10-c-1) aims to bring remittance costs below 3%.",
    },
    {
      type: "p",
      text: "The G20 has been working on cross-border payments too. The Financial Stability Board's 2025 progress report was blunt: [\"efforts have not yet translated into tangible improvements for end-users at the global level.\"](https://www.fsb.org/2025/10/g20-roadmap-for-cross-border-payments-consolidated-progress-report-for-2025/) That matches what it feels like from the receiving end.",
    },
    { type: "h3", id: "hypothetical-example", text: "A hypothetical example of how costs stack" },
    {
      type: "p",
      text: "To make the layers concrete, here is a made-up $1,000 payment. **These numbers are invented for illustration. They are not my transactions and not any provider's prices.**",
    },
    {
      type: "figure",
      src: "/blog/hypothetical-1000-dollar-payment.svg",
      alt: "A horizontal bar representing a hypothetical $1,000 payment. Most of the bar, $940, is the amount received. Four small segments at the end show a $15 sender fee, a $25 exchange-rate margin, a $12 intermediary bank deduction and an $8 receiving bank fee.",
      caption: "Illustrative only: a hypothetical $1,000 payment and four places money can leave it.",
      width: 1200,
      height: 560,
    },
    {
      type: "table",
      caption: "Hypothetical cost layers on a $1,000 payment",
      head: ["Cost layer", "Assumption in this example", "Amount"],
      rows: [
        ["Sender's provider fee", "Flat fee", "$15"],
        ["Exchange-rate margin", "2.5% worse than mid-market", "$25"],
        ["Intermediary bank deduction", "Taken out in transit", "$12"],
        ["Receiving bank fee", "Charged on arrival", "$8"],
        ["**Total cost**", "6% of the payment", "**$60**"],
        ["**Equivalent amount received**", "", "**$940**"],
      ],
      note: "No single layer looks alarming. The total is what matters.",
    },
    { type: "h3", id: "mid-market-test", text: "A quick test I use before choosing a route" },
    {
      type: "ol",
      items: [
        "Look up the current mid-market rate for the currency pair.",
        "Ask the provider for the exact amount the recipient will receive in local currency, after every fee.",
        "Multiply the amount you send by the mid-market rate, and compare it with that figure. The difference is your real cost.",
        "Ask when the money will be usable, not just when it will be sent.",
      ],
    },

    { type: "h2", id: "usual-routes", text: "The usual routes, and how they say they charge" },
    {
      type: "p",
      text: "I looked at the options people commonly use to get paid from abroad. I'm not ranking them. Fees differ by country, currency, account type and how the sender pays, and providers change their prices. What follows is what each provider says on its own public pages, as I read them on 9 November 2026. Check the page for your own country before deciding.",
    },
    {
      type: "table",
      caption: "Five common ways to receive money from abroad",
      head: ["Route", "How it says it charges", "Worth checking"],
      rows: [
        [
          "Bank wire (SWIFT)",
          "Set by each bank involved. Intermediary and receiving banks can add charges.",
          "What your bank charges to receive, and which exchange rate it uses.",
        ],
        [
          "[PayPal](https://www.paypal.com/us/webapps/mpp/paypal-fees)",
          "Its US fees page (updated May 2026) lists a currency conversion spread of 3.00% or 4.00% above the base rate, depending on the transaction. Its [business fees page](https://www.paypal.com/us/business/paypal-business-fees) adds a percentage fee for international commercial transactions (1.50% at the time of writing) plus a fixed fee.",
          "Which tier applies to your account type and country. Fee pages differ by region, so check the one for yours.",
        ],
        [
          "[Payoneer](https://www.payoneer.com/pricing/)",
          "Pricing page (updated January 2026): receiving into an account in your local currency is listed as free; a non-local-currency account is 1% (minimum 1 USD); a payer using a credit card is up to 3.99% + 0.49 USD.",
          "Which receiving account and payment method the sender uses.",
        ],
        [
          "[Wise](https://wise.com/us/pricing/)",
          "Says it uses the mid-market rate plus a visible fee, from 0.23% for converting (varies by currency). Its [US receiving page](https://wise.com/us/pricing/receive) lists a fixed fee of 6.11 USD to receive USD wire and SWIFT payments.",
          "The fee for your currency pair, and whether the payer can pay you locally instead of by wire.",
        ],
        [
          "[Western Union](https://www.westernunion.com/in/en/home.html)",
          "States on its site that it \"also makes money from currency exchange\" and advises comparing both transfer fees and exchange rates.",
          "It is mainly a person-to-person transfer service. Compare the final amount received.",
        ],
      ],
      note: "Prices were read from each provider's public page on 9 November 2026 and can change. They are not a recommendation or a guarantee of what you will pay.",
    },
    {
      type: "p",
      text: "What stands out is that cost tends to live in two places, a visible fee and the exchange rate, and different providers put the emphasis on different ones. That is why a single headline number rarely answers the question that matters.",
    },

    { type: "h2", id: "why-i-thought-differently", text: "Why this made me think differently about payments" },
    {
      type: "p",
      text: "Looking across all of those routes, what bothered me wasn't any single provider. It was that the same four things kept being hard: knowing the cost up front, knowing when the money lands, getting set up to receive, and understanding what I was looking at. Four ideas have stuck with me:",
    },
    {
      type: "ul",
      items: [
        "**Transparency.** I should see the full cost, including the exchange rate, before I agree to anything.",
        "**Speed.** The money should arrive when I'm told it will, and I should be able to see where it is.",
        "**Predictable costs.** The number I'm quoted should be the number I get.",
        "**Simplicity.** Receiving a payment should not feel like filling out a tax form.",
      ],
    },
    {
      type: "p",
      text: "None of that is exotic. It is roughly what we expect when we send a message. I don't think it is fair to claim any one company has solved these problems, and I'm not going to pick on others. I just think the bar should be higher than it is.",
    },

    { type: "h2", id: "why-i-am-building-hover", text: "Why I chose to build Hover" },
    {
      type: "p",
      text: "I'm one of the people building [Hover](/), and my own experience with these problems is part of the reason. Hover is a payments app for sending and receiving money across borders. What we are trying to solve is simple to say and hard to do: faster international payments, lower payment costs, competitive exchange rates, and an experience that is easier to understand.",
    },
    {
      type: "p",
      text: "Because this post is about honesty on cost, I want to be just as clear about Hover. Here is what is true today, and what is not.",
    },
    { type: "h3", id: "what-hover-offers-today", text: "What Hover offers today" },
    {
      type: "ul",
      items: [
        `Sending between Hover users has a ${fees.sendToHoverUser}% transfer fee, and those payments are designed to arrive in seconds.`,
        `Adding money from a bank has a ${fees.addFromBank}% fee and withdrawing to a bank has a ${fees.withdrawToBank}% fee. The current schedule is on the [company page](/company).`,
        "The fee is shown in the app before you confirm a payment.",
      ],
    },
    { type: "h2", id: "what-i-hope-changes", text: "What I hope changes" },
    {
      type: "p",
      text: "When people ask what I do, I say I'm an AI engineer. I don't usually mention that I've spent real time working out how to get paid for it. It is an odd thing to have to be good at.",
    },
    {
      type: "p",
      text: "I'd like the next engineer, designer or freelancer who lands their first international client to find that part boring: a number they can see, a date they can trust, a setup that takes minutes. If it is boring, they can spend their attention on the work.",
    },
    {
      type: "p",
      text: "That is the idea behind Hover, and we have a long way to go. If you work across borders and want to see what we are building, you can [explore Hover](/). And if you have been through any of this yourself, I'd like to hear about it through the [help center](/help).",
    },
  ],
  faqs: [
    {
      question: "Why do I receive less money than the invoice amount?",
      answer:
        "Several costs can be taken out between the sender and you: the sender's provider fee, an exchange-rate margin, charges from intermediary or receiving banks, and sometimes a fee for receiving. Which ones apply depends on the route the payment takes. Ask for the exact amount you will receive, after all fees, before you choose.",
    },
    {
      question: "What is the mid-market rate?",
      answer:
        "The mid-market rate is the midpoint between the buy and sell prices of a currency in the market. It is the rate you see on a currency site or search engine. Comparing the rate you are offered with it shows how much margin is built in.",
    },
    {
      question: "How can I compare ways to get paid from abroad?",
      answer:
        "Compare the amount that arrives, not the headline fee. Look up the mid-market rate, ask each provider for the exact amount received in local currency after all fees, and ask when the money will be usable. Fees vary by country, currency and payment method, so check each provider's page for your own situation.",
    },
    {
      question: "Why do international payments take time?",
      answer:
        "A cross-border payment can pass through several banks and systems, each with its own cut-off times and compliance checks, and weekends and holidays can add delay. How long it takes varies by route, so ask your provider when the funds will be usable, not just when they are sent.",
    },
    {
      question: "What does Hover cost?",
      answer: `Sending between Hover users has a ${fees.sendToHoverUser}% transfer fee. Adding money from a bank is ${fees.addFromBank}% and withdrawing to a bank is ${fees.withdrawToBank}%. The fee is shown before you confirm a payment, and the current schedule is on the company page at hover.money/company.`,
    },
  ],
  sources: [
    {
      title: "Remittance Prices Worldwide, Q1 2025 report",
      publisher: "World Bank",
      url: "https://remittanceprices.worldbank.org/sites/default/files/rpw_main_report_and_annex_q125_1_0.pdf",
    },
    {
      title: "Indicator 10.c.1: remittance costs as a proportion of the amount remitted",
      publisher: "World Bank / UN SDG metadata",
      url: "https://worldbank.github.io/sdg-metadata/metadata/en/10-c-1",
    },
    {
      title: "G20 Roadmap for Cross-border Payments: Consolidated progress report for 2025",
      publisher: "Financial Stability Board",
      url: "https://www.fsb.org/2025/10/g20-roadmap-for-cross-border-payments-consolidated-progress-report-for-2025/",
    },
    {
      title: "PayPal fees (US consumer)",
      publisher: "PayPal",
      url: "https://www.paypal.com/us/webapps/mpp/paypal-fees",
    },
    {
      title: "PayPal business fees",
      publisher: "PayPal",
      url: "https://www.paypal.com/us/business/paypal-business-fees",
    },
    { title: "Payoneer pricing", publisher: "Payoneer", url: "https://www.payoneer.com/pricing/" },
    { title: "Wise pricing", publisher: "Wise", url: "https://wise.com/us/pricing/" },
    { title: "Wise: receive money", publisher: "Wise", url: "https://wise.com/us/pricing/receive" },
    {
      title: "Western Union",
      publisher: "Western Union",
      url: "https://www.westernunion.com/in/en/home.html",
    },
  ],
};
