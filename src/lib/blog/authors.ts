import type { Author } from "./types";

export const authors: Record<string, Author> = {
  "mustakim-nagori": {
    id: "mustakim-nagori",
    name: "Mustakim Nagori",
    title: "AI Engineer | Remote Worker | Building Hover",
    bio: "Mustakim is an AI engineer from India who works remotely with international teams and is building Hover.",
    linkedin: "https://www.linkedin.com/in/mustakimnagori/",
    x: "https://x.com/mustakim_ai",
  },
};

export function getAuthor(id: string): Author {
  const author = authors[id];
  if (!author) throw new Error(`Unknown blog author: ${id}`);
  return author;
}
