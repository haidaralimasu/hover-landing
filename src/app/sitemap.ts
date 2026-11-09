import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { categories } from "@/lib/blog/categories";
import { getAllPosts, getPostsByCategory, postPath } from "@/lib/blog/posts";

// Only canonical, indexable URLs. /account-deletion and /unsubscribe are
// noindex (app-store / email-compliance pages), so they stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: getAllPosts()[0] ? new Date(getAllPosts()[0].updatedAt ?? getAllPosts()[0].publishedAt) : lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...getAllPosts().map((p) => ({
      url: `${siteConfig.url}${postPath(p.slug)}`,
      lastModified: new Date(p.updatedAt ?? p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    // Only categories that have articles (empty ones are noindex).
    ...categories
      .filter((c) => getPostsByCategory(c.slug).length > 0)
      .map((c) => ({
        url: `${siteConfig.url}/blog/category/${c.slug}`,
        lastModified: new Date(getPostsByCategory(c.slug)[0].updatedAt ?? getPostsByCategory(c.slug)[0].publishedAt),
        changeFrequency: "weekly" as const,
        priority: 0.5,
      })),
    { url: `${siteConfig.url}/newsletter`, lastModified, changeFrequency: "monthly", priority: 0.4 },
    { url: `${siteConfig.url}/company`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/help`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
