import { getPost } from "@/lib/blog/posts";
import { renderPostOg } from "@/lib/blog/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateImageMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  return [{ id: "card", size, contentType, alt: post?.featuredImageAlt ?? "Beyond Borders by Hover" }];
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return renderPostOg(slug);
}
