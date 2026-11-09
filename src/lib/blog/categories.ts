import type { Category, CategorySlug } from "./types";

export const categories: Category[] = [
  {
    slug: "real-stories",
    name: "Real Stories",
    description: "First-hand experiences of earning and moving money across borders.",
  },
  {
    slug: "money-transfers",
    name: "Money Transfers",
    description: "How international transfers work, what they cost and how to compare them.",
  },
  {
    slug: "working-globally",
    name: "Working Globally",
    description: "Practical notes for remote workers, freelancers and contractors with international clients.",
  },
  {
    slug: "personal-finance",
    name: "Personal Finance",
    description: "Managing income, savings and spending when your money lives in more than one currency.",
  },
  {
    slug: "currencies-and-exchange-rates",
    name: "Currencies & Exchange Rates",
    description: "Exchange rates, margins and what they mean for the amount you actually receive.",
  },
  {
    slug: "building-hover",
    name: "Building Hover",
    description: "What we are building at Hover, why, and what we learn along the way.",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function categoryName(slug: CategorySlug): string {
  return getCategory(slug)?.name ?? slug;
}
