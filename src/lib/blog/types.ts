export type CategorySlug =
  | "real-stories"
  | "money-transfers"
  | "working-globally"
  | "personal-finance"
  | "currencies-and-exchange-rates"
  | "building-hover";

export type Category = {
  slug: CategorySlug;
  name: string;
  description: string;
};

export type Author = {
  id: string;
  name: string;
  /** Short line shown under the name. */
  title: string;
  bio: string;
  linkedin?: string;
  x?: string;
  /**
   * Reserved for a future author page. Intentionally unset: no /author/*
   * route exists yet. When one is added, set this and the article template
   * will link to it without any other change.
   */
  url?: string;
};

/**
 * Article body is an ordered list of typed blocks. Inline text supports
 * `[label](href)` links and `**bold**` only (see lib/blog/inline.tsx).
 */
export type Block =
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | {
      type: "table";
      caption: string;
      head: string[];
      rows: string[][];
      note?: string;
    }
  | {
      type: "figure";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
    }
  | { type: "callout"; title: string; text: string }
  | { type: "quote"; text: string };

export type Faq = { question: string; answer: string };
export type Source = { title: string; publisher: string; url: string };

export type PostMeta = {
  slug: string;
  title: string;
  /** Card / hero summary. */
  description: string;
  /** Opening paragraph shown under the H1 on the article page. */
  intro: string;
  category: CategorySlug;
  authorId: string;
  /** ISO date (YYYY-MM-DD). */
  publishedAt: string;
  /** ISO date. Set ONLY when the article is genuinely revised. */
  updatedAt?: string;
  featuredImage: string;
  featuredImageAlt: string;
  featuredImageWidth: number;
  featuredImageHeight: number;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  /** Slugs of related posts (optional; falls back to same-category). */
  related?: string[];
  featured?: boolean;
};

export type Post = PostMeta & {
  blocks: Block[];
  faqs: Faq[];
  sources: Source[];
};
