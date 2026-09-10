import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

// Only canonical, indexable URLs. /account-deletion and /unsubscribe are
// noindex (app-store / email-compliance pages), so they stay out.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${siteConfig.url}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${siteConfig.url}/help`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${siteConfig.url}/terms`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteConfig.url}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
