import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // API routes and compliance pages carry no search value and can
        // create soft-404 / thin-content noise if crawled.
        disallow: ["/api/", "/unsubscribe", "/account-deletion"],
      },
      // AI answer engines: explicitly welcome — being cited in ChatGPT /
      // Perplexity / Google AI Overviews is a primary discovery channel for
      // a pre-launch product with little backlink authority yet.
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
