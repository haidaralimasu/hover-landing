import Link from "next/link";
import type { Author } from "@/lib/blog/types";

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);
}

export function AuthorLinks({ author }: { author: Author }) {
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {author.linkedin && (
        <li>
          <a href={author.linkedin} target="_blank" rel="noopener noreferrer me" className="text-ink underline underline-offset-4 decoration-line-2 hover:decoration-ink">
            LinkedIn
          </a>
        </li>
      )}
      {author.x && (
        <li>
          <a href={author.x} target="_blank" rel="noopener noreferrer me" className="text-ink underline underline-offset-4 decoration-line-2 hover:decoration-ink">
            X
          </a>
        </li>
      )}
    </ul>
  );
}

export function AuthorBox({ author }: { author: Author }) {
  return (
    <aside
      aria-label="About the author"
      className="flex flex-col gap-5 rounded-[var(--radius-card)] border border-line bg-bg-2 p-6 sm:flex-row sm:p-8"
    >
      <div
        aria-hidden="true"
        className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-ink text-base font-semibold text-white"
      >
        {initials(author.name)}
      </div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-3">Written by</p>
        <p className="mt-1 text-lg font-semibold text-ink">
          {author.url ? <Link href={author.url}>{author.name}</Link> : author.name}
        </p>
        <p className="mt-1 text-sm text-ink-2">{author.title}</p>
        <p className="mt-3 text-[15px] leading-relaxed text-ink-2">{author.bio}</p>
        <div className="mt-4">
          <AuthorLinks author={author} />
        </div>
      </div>
    </aside>
  );
}
