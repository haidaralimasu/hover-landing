// File-based blog: each post is a typed data object (src/content/blog/*).
// No MDX/markdown dependency — bodies are a small set of semantic blocks that
// render to real HTML (good for SEO + Article JSON-LD). Inline **bold** and
// [text](/href) are supported via `inline()` below.

export type Block =
  | { t: "p"; md: string }
  | { t: "h2"; text: string } // slug-anchored automatically
  | { t: "h3"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "ol"; items: string[] }
  | { t: "quote"; md: string }
  | { t: "table"; columns: string[]; rows: string[][] };

export type BlogPost = {
  slug: string;
  title: string;
  /** <=160 chars, keyword-forward — meta description + listing excerpt. */
  description: string;
  /** ISO date (YYYY-MM-DD). */
  datePublished: string;
  dateModified?: string;
  /** Short topical label shown on the card. */
  category: string;
  keywords: string[];
  cover: { src: string; alt: string };
  body: Block[];
};

/** kebab-case a heading so H2s get stable #anchors (TOC / deep links). */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Words in a post's body, for the reading-time estimate. */
function wordCount(post: BlogPost): number {
  let text = post.title + " " + post.description;
  for (const b of post.body) {
    if (b.t === "table")
      text += " " + b.columns.join(" ") + " " + b.rows.flat().join(" ");
    else if (b.t === "ul" || b.t === "ol") text += " " + b.items.join(" ");
    else if (b.t === "p" || b.t === "quote") text += " " + b.md;
    else text += " " + b.text;
  }
  return text.trim().split(/\s+/).length;
}

export function readingTimeMinutes(post: BlogPost): number {
  return Math.max(1, Math.round(wordCount(post) / 200));
}

/**
 * Parse ONE line of restricted inline markdown into segments.
 * Supports `**bold**` and `[label](href)` only — anything else is literal.
 * Returned as plain data so the renderer (a server component) builds the
 * React nodes; keeps this module free of JSX/React imports.
 */
export type InlineSeg =
  | { k: "text"; v: string }
  | { k: "bold"; v: string }
  | { k: "link"; v: string; href: string };

export function inline(md: string): InlineSeg[] {
  const segs: InlineSeg[] = [];
  // Alternation: bold first (greedy-safe with non-greedy inner), then link.
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\(([^)]+)\)/g;
  let last = 0;
  for (let m = re.exec(md); m; m = re.exec(md)) {
    if (m.index > last) segs.push({ k: "text", v: md.slice(last, m.index) });
    if (m[1] !== undefined) segs.push({ k: "bold", v: m[1] });
    else segs.push({ k: "link", v: m[2], href: m[3] });
    last = m.index + m[0].length;
  }
  if (last < md.length) segs.push({ k: "text", v: md.slice(last) });
  return segs;
}

// --- Registry ---------------------------------------------------------------
// Import order here is irrelevant; getAllPosts sorts by date (newest first).
import { postGetPaidAfrica } from "@/content/blog/get-paid-in-usd-as-a-freelancer-in-africa";
import { postUsdEurGbp } from "@/content/blog/usd-vs-eur-vs-gbp-getting-paid-by-overseas-clients";
import { postCheapestWay } from "@/content/blog/cheapest-way-to-receive-international-payments";
import { postVsPayoneer } from "@/content/blog/hover-vs-paypal-payoneer-for-freelancers";
import { postInvoiceInternational } from "@/content/blog/how-to-invoice-an-international-client";
import { postPaymentMistakes } from "@/content/blog/mistakes-that-delay-international-client-payments";

const posts: BlogPost[] = [
  postGetPaidAfrica,
  postUsdEurGbp,
  postCheapestWay,
  postVsPayoneer,
  postInvoiceInternational,
  postPaymentMistakes,
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => +new Date(b.datePublished) - +new Date(a.datePublished),
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}
