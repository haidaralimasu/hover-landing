import type { Block, CategorySlug, Post } from "./types";
import { stripInline } from "./inline";
import { post as gettingPaid } from "@/content/blog/getting-paid-across-borders-my-experience-as-an-indian-remote-worker";

// To publish a new article: add a file in src/content/blog/ that exports
// `post`, then add it to this list. Everything else (index, categories,
// sitemap, JSON-LD, related posts) is derived.
const all: Post[] = [gettingPaid];

const POPULAR_MIN_POSTS = 4;

export function getAllPosts(): Post[] {
  return [...all].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getPost(slug: string): Post | undefined {
  return all.find((p) => p.slug === slug);
}

export function getFeaturedPost(): Post | undefined {
  const posts = getAllPosts();
  return posts.find((p) => p.featured) ?? posts[0];
}

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return getAllPosts().filter((p) => p.category === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const explicit = (post.related ?? [])
    .map((s) => getPost(s))
    .filter((p): p is Post => Boolean(p));
  const rest = getAllPosts().filter(
    (p) => p.slug !== post.slug && !explicit.some((e) => e.slug === p.slug)
  );
  rest.sort(
    (a, b) => Number(b.category === post.category) - Number(a.category === post.category)
  );
  return [...explicit, ...rest].slice(0, limit);
}

/** "Popular" only exists once there is enough content to rank. */
export function getPopularPosts(): Post[] {
  const posts = getAllPosts();
  return posts.length >= POPULAR_MIN_POSTS ? posts.slice(0, 3) : [];
}

function blockText(b: Block): string {
  switch (b.type) {
    case "h2":
    case "h3":
    case "p":
    case "quote":
      return stripInline(b.text);
    case "callout":
      return stripInline(`${b.title} ${b.text}`);
    case "ul":
    case "ol":
      return b.items.map(stripInline).join(" ");
    case "table":
      return [...b.head, ...b.rows.flat()].map(stripInline).join(" ");
    default:
      return "";
  }
}

/** Reading time in whole minutes at ~200 wpm, computed from the content. */
export function getReadingTime(post: Post): number {
  const words = [post.intro, ...post.blocks.map(blockText), ...post.faqs.map((f) => f.answer)]
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function getToc(post: Post): { id: string; text: string; level: 2 | 3 }[] {
  const toc: { id: string; text: string; level: 2 | 3 }[] = [];
  for (const b of post.blocks) {
    if (b.type === "h2") toc.push({ id: b.id, text: b.text, level: 2 });
    if (b.type === "h3") toc.push({ id: b.id, text: b.text, level: 3 });
  }
  if (post.faqs.length) toc.push({ id: "faq", text: "Frequently asked questions", level: 2 });
  if (post.sources.length) toc.push({ id: "sources", text: "Sources", level: 2 });
  return toc;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function postPath(slug: string): string {
  return `/blog/${slug}`;
}
