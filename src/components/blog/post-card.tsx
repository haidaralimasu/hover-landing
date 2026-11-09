import Image from "next/image";
import Link from "next/link";
import { categoryName } from "@/lib/blog/categories";
import { getAuthor } from "@/lib/blog/authors";
import { formatDate, getReadingTime, postPath } from "@/lib/blog/posts";
import type { Post } from "@/lib/blog/types";

export function PostCard({ post }: { post: Post }) {
  const author = getAuthor(post.authorId);
  return (
    <article className="group flex flex-col">
      <Link
        href={postPath(post.slug)}
        className="block overflow-hidden rounded-[var(--radius-card)] bg-bg-2"
        tabIndex={-1}
        aria-hidden="true"
      >
        <Image
          src={post.featuredImage}
          alt=""
          width={post.featuredImageWidth}
          height={post.featuredImageHeight}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
          className="aspect-[3/2] w-full object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-quart)] group-hover:scale-[1.03]"
        />
      </Link>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-ink-2">
        {categoryName(post.category)}
      </p>
      <h3 className="mt-2 text-xl font-semibold leading-snug tracking-[-0.015em] text-ink">
        <Link
          href={postPath(post.slug)}
          className="after:absolute after:inset-0 hover:underline hover:decoration-1 hover:underline-offset-4"
        >
          {post.title}
        </Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{post.description}</p>
      <p className="mt-4 text-sm text-ink-3">
        {author.name} · <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time> ·{" "}
        {getReadingTime(post)} min read
      </p>
    </article>
  );
}
