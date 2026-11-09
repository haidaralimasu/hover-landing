import { ImageResponse } from "next/og";
import { getAuthor } from "./authors";
import { categoryName } from "./categories";
import { getPost } from "./posts";

export const ogSize = { width: 1200, height: 630 };

/** 1200x630 PNG share card for an article (SVG is not accepted by most scrapers). */
export function renderPostOg(slug: string) {
  const post = getPost(slug);
  const title = post?.seoTitle ?? "Beyond Borders by Hover";
  const label = post ? categoryName(post.category).toUpperCase() : "BEYOND BORDERS";
  const author = post ? getAuthor(post.authorId).name : "Hover";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#ffffff",
          color: "#0a0a0a",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 4, color: "#5c5c5c" }}>
          BEYOND BORDERS · {label}
        </div>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700, lineHeight: 1.08, letterSpacing: -2 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, color: "#5c5c5c" }}>
          <span>{author}</span>
          <span style={{ color: "#0a0a0a", fontWeight: 700 }}>Hover</span>
        </div>
      </div>
    ),
    ogSize
  );
}
