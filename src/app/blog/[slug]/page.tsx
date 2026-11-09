import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { ArticleBody } from "@/components/blog/article-body";
import { AuthorBox, AuthorLinks } from "@/components/blog/author-box";
import { BlogCta } from "@/components/blog/blog-cta";
import { JsonLd } from "@/components/blog/json-ld";
import { PostCard } from "@/components/blog/post-card";
import { Toc } from "@/components/blog/toc";
import { getAuthor } from "@/lib/blog/authors";
import { categoryName } from "@/lib/blog/categories";
import {
  formatDate,
  getAllPosts,
  getPost,
  getReadingTime,
  getRelatedPosts,
  getToc,
  postPath,
} from "@/lib/blog/posts";
import { company } from "@/lib/company";
import { siteConfig } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const author = getAuthor(post.authorId);
  const url = `${siteConfig.url}${postPath(post.slug)}`;
  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: author.name, url: author.linkedin }],
    alternates: { canonical: postPath(post.slug) },
    openGraph: {
      type: "article",
      siteName: siteConfig.name,
      title: post.seoTitle,
      description: post.seoDescription,
      url,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [author.name],
      section: categoryName(post.category),
      tags: post.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle,
      description: post.seoDescription,
      creator: author.x ? `@${author.x.split("/").pop()}` : siteConfig.twitter,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorId);
  const url = `${siteConfig.url}${postPath(post.slug)}`;
  const readingTime = getReadingTime(post);
  const toc = getToc(post);
  const related = getRelatedPosts(post);
  const catName = categoryName(post.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: post.title,
        description: post.seoDescription,
        image: [`${url}/opengraph-image/card`],
        datePublished: post.publishedAt,
        ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
        author: { "@id": `${siteConfig.url}/blog#${author.id}` },
        publisher: { "@id": `${siteConfig.url}/blog#publisher` },
        articleSection: catName,
        keywords: post.keywords.join(", "),
        inLanguage: "en",
        timeRequired: `PT${readingTime}M`,
      },
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/blog#${author.id}`,
        name: author.name,
        jobTitle: "AI Engineer",
        description: author.title,
        sameAs: [author.linkedin, author.x].filter(Boolean),
        worksFor: { "@id": `${siteConfig.url}/blog#publisher` },
      },
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/blog#publisher`,
        name: siteConfig.name,
        legalName: company.legalName,
        url: siteConfig.url,
        logo: { "@type": "ImageObject", url: `${siteConfig.url}/hover-logo.png` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Hover", item: siteConfig.url },
          { "@type": "ListItem", position: 2, name: "Beyond Borders", item: `${siteConfig.url}/blog` },
          {
            "@type": "ListItem",
            position: 3,
            name: catName,
            item: `${siteConfig.url}/blog/category/${post.category}`,
          },
          { "@type": "ListItem", position: 4, name: post.title, item: url },
        ],
      },
      ...(post.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="pb-24 pt-28 md:pt-36">
      <JsonLd data={jsonLd} />
      <Container>
        <nav aria-label="Breadcrumb" className="text-sm text-ink-3">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/" className="hover:text-ink">Hover</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="hover:text-ink">Beyond Borders</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href={`/blog/category/${post.category}`} className="hover:text-ink">{catName}</Link>
            </li>
          </ol>
        </nav>

        <header className="mt-8 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-2">{catName}</p>
          <h1 className="mt-4 text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-ink sm:text-5xl sm:leading-[1.06]">
            {post.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-2 sm:text-xl">{post.intro}</p>

          <div className="mt-8 flex flex-col gap-4 border-y border-line py-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-ink">{author.name}</p>
              <p className="text-sm text-ink-2">{author.title}</p>
              <div className="mt-2">
                <AuthorLinks author={author} />
              </div>
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm text-ink-2">
              <dt className="text-ink-3">Published</dt>
              <dd>
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </dd>
              {post.updatedAt && (
                <>
                  <dt className="text-ink-3">Last updated</dt>
                  <dd>
                    <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time>
                  </dd>
                </>
              )}
              <dt className="text-ink-3">Reading time</dt>
              <dd>{readingTime} min read</dd>
            </dl>
          </div>
        </header>

        <figure className="mt-10">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt}
            width={post.featuredImageWidth}
            height={post.featuredImageHeight}
            priority
            sizes="(min-width: 1152px) 1088px, 100vw"
            className="aspect-[16/9] w-full rounded-[28px] bg-ink object-cover"
          />
        </figure>

        <div className="mt-12 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[14rem_minmax(0,42rem)] lg:justify-center lg:gap-16">
          <div className="lg:row-span-1">
            <Toc items={toc} />
          </div>

          <article className="min-w-0">
            <ArticleBody blocks={post.blocks} />

            {post.faqs.length > 0 && (
              <section aria-labelledby="faq" className="mt-14">
                <h2 id="faq" className="scroll-mt-24 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                  Frequently asked questions
                </h2>
                <div className="mt-6 divide-y divide-line border-y border-line">
                  {post.faqs.map((f) => (
                    <details key={f.question} className="group py-5">
                      <summary className="flex list-none items-start justify-between gap-4 text-[17px] font-medium leading-snug text-ink [&::-webkit-details-marker]:hidden">
                        {f.question}
                        <span aria-hidden="true" className="mt-0.5 text-ink-3 transition-transform group-open:rotate-45">+</span>
                      </summary>
                      <p className="mt-3 text-[17px] leading-[1.75] text-ink-2">{f.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {post.sources.length > 0 && (
              <section aria-labelledby="sources" className="mt-14">
                <h2 id="sources" className="scroll-mt-24 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ink sm:text-[1.75rem]">
                  Sources
                </h2>
                <ul className="mt-5 space-y-2 text-[15px] leading-snug text-ink-2">
                  {post.sources.map((s) => (
                    <li key={s.url}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink"
                      >
                        {s.title}
                      </a>{" "}
                      <span className="text-ink-3">({s.publisher})</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="mt-14">
              <AuthorBox author={author} />
            </div>
          </article>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="mt-24">
            <h2 id="related" className="text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
              Related articles
            </h2>
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&>article]:relative">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        <div className="mx-auto mt-24 max-w-5xl">
          <BlogCta />
        </div>
      </Container>
    </main>
  );
}
