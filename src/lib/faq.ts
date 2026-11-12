import { company, fees } from "@/lib/company";

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What is Hover?",
    a: `Hover is a payments app for sending and receiving money across borders. It is operated by ${company.legalName}, a US company based in Montana.`,
  },
  {
    q: "Do I need a password?",
    a: "No. You sign in with your Google or Apple account, or with a one-time code sent to your email, so there is nothing to create, remember, or reset.",
  },
  {
    q: "How fast do transfers arrive?",
    a: "Payments to another Hover user usually arrive in seconds, any time of day, including weekends and holidays. Adding money from or withdrawing to a bank account takes as long as the bank transfer itself, typically one to a few business days.",
  },
  {
    q: "Where can I send money?",
    a: "You can send to other Hover users where supported. Virtual accounts let you receive USD, EUR or GBP after verification. Bank withdrawal options depend on your country and account eligibility.",
  },
  {
    q: "Is my money safe?",
    a: "Only you can approve a payment: every transfer needs your confirmation on your own device, and no one at Hover can move your money for you. Hover is not a bank and balances are not FDIC-insured. Transfers can't be reversed once sent, so always check the recipient first.",
  },
  {
    q: "What does it cost?",
    a: `Sending to another Hover user is free (${fees.sendToHoverUser}%). Adding money from a US bank costs ${fees.addFromBank}% and withdrawing to a US bank costs ${fees.withdrawToBank}%. You always see the exact fee before you confirm.`,
  },
  {
    q: "Is Hover available yet?",
    a: "Yes. Hover is live - download it on the App Store for iPhone or on Google Play for Android.",
  },
  {
    q: "What's in the newsletter?",
    a: "Occasional product updates and new features. Unsubscribe anytime, one click.",
  },
];
