import Link from "next/link";
import { Fragment } from "react";

const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|\*\*[^*]+\*\*)/g;

/** Minimal inline renderer: `[label](href)` and `**bold**`. No raw HTML. */
export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN);
  return (
    <>
      {parts.map((part, i) => {
        const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
        if (link) {
          const [, label, href] = link;
          const external = /^https?:\/\//.test(href);
          return external ? (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          ) : (
            <Link key={i} href={href}>
              {label}
            </Link>
          );
        }
        const bold = /^\*\*([^*]+)\*\*$/.exec(part);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

/** Plain-text version (for word counts / JSON-LD). */
export function stripInline(text: string): string {
  return text.replace(/\[([^\]]+)\]\([^)\s]+\)/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1");
}
