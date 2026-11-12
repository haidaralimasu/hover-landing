import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";
import { BlogCta } from "@/components/blog/blog-cta";
import { JsonLd } from "@/components/blog/json-ld";
import { categoryName } from "@/lib/blog/categories";
import { getAllPosts, getFeaturedPost, getPopularPosts, postPath } from "@/lib/blog/posts";
import { siteConfig } from "@/lib/site";

const BLOG_DESCRIPTION =
  "Stories, insights and practical guides for people who work, earn and move money across borders.";

export const metadata: Metadata = {
  title: "Beyond Borders: stories and guides on getting paid across borders",
  description: BLOG_DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    title: "Beyond Borders by Hover",
    description: BLOG_DESCRIPTION,
    url: `${siteConfig.url}/blog`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Hover" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Beyond Borders by Hover",
    description: BLOG_DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function BlogHomePage() {
  const featured = getFeaturedPost();
  const posts = getAllPosts();
  const latest = posts.filter((p) => p.slug !== featured?.slug);
  const popular = getPopularPosts();

  return (
    <main className="pb-24 pt-28 md:pt-36">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${siteConfig.url}/blog#blog`,
              name: "Beyond Borders",
              description: BLOG_DESCRIPTION,
              url: `${siteConfig.url}/blog`,
              publisher: { "@type": "Organization", name: "Hover Technologies LLC", url: siteConfig.url },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Hover", item: siteConfig.url },
                { "@type": "ListItem", position: 2, name: "Beyond Borders", item: `${siteConfig.url}/blog` },
              ],
            },
          ],
        }}
      />
      <Container>
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl md:text-6xl">
            Beyond Borders
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{BLOG_DESCRIPTION}</p>
        </header>

        {featured && (
          <section aria-labelledby="featured-title" className="mt-12 grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">
                {categoryName(featured.category)}
              </p>
              <h2
                id="featured-title"
                className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.025em] text-ink sm:text-4xl md:text-[2.75rem]"
              >
                <Link href={postPath(featured.slug)}>{featured.title}</Link>
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-2">{featured.description}</p>
              <div className="mt-8">
                <ButtonLink href={postPath(featured.slug)} size="lg">
                  Learn more
                </ButtonLink>
              </div>
            </div>
            <Link
              href={postPath(featured.slug)}
              tabIndex={-1}
              aria-hidden="true"
              className="order-1 block overflow-hidden rounded-[28px] bg-ink lg:order-2"
            >
              <Image
                src={featured.featuredImage}
                alt=""
                width={featured.featuredImageWidth}
                height={featured.featuredImageHeight}
                priority
                sizes="(min-width: 1024px) 560px, 100vw"
                className="aspect-[3/2] w-full object-cover"
              />
            </Link>
          </section>
        )}

        <section aria-labelledby="latest-title" className="mt-24">
          <h2 id="latest-title" className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
            Latest articles
          </h2>
          {latest.length > 0 ? (
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&>article]:relative">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-ink-2">
              More stories are on the way.
            </p>
          )}
        </section>

        {popular.length > 0 && (
          <section aria-labelledby="popular-title" className="mt-24">
            <h2 id="popular-title" className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Popular articles
            </h2>
            <ol className="mt-6 divide-y divide-line border-y border-line">
              {popular.map((post, i) => (
                <li key={post.slug}>
                  <Link href={postPath(post.slug)} className="flex gap-5 py-5 text-ink hover:underline hover:underline-offset-4">
                    <span className="w-6 text-ink-4">{i + 1}</span>
                    <span className="font-medium">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </section>
        )}

        <div className="mt-24">
          <BlogCta />
        </div>
      </Container>
    </main>
  );
}
