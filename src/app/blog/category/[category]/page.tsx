import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { BlogCta } from "@/components/blog/blog-cta";
import { categories, getCategory } from "@/lib/blog/categories";
import { getPostsByCategory } from "@/lib/blog/posts";

export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  const hasPosts = getPostsByCategory(cat.slug).length > 0;
  return {
    title: `${cat.name} | Beyond Borders`,
    description: cat.description,
    alternates: { canonical: `/blog/category/${cat.slug}` },
    // Empty category pages are thin content: keep them out of the index
    // until they have articles.
    robots: hasPosts ? { index: true, follow: true } : { index: false, follow: true },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const posts = getPostsByCategory(cat.slug);

  return (
    <main className="pb-24 pt-28 md:pt-36">
      <Container>
        <p className="text-sm text-ink-3">
          <Link href="/blog" className="hover:text-ink">
            Beyond Borders
          </Link>
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-5xl">
          {cat.name}
        </h1>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-2">{cat.description}</p>
        {posts.length > 0 ? (
          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 [&>article]:relative">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="mt-14 max-w-xl text-[17px] leading-relaxed text-ink-2">
            Nothing here yet. We are working on stories for this category.
          </p>
        )}
        <div className="mt-24">
          <BlogCta />
        </div>
      </Container>
    </main>
  );
}
