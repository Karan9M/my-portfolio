import fs from "fs";
import matter from "gray-matter";
import path from "path";

export type BlogMetadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
};

export type BlogPostSummary = {
  metadata: BlogMetadata;
  slug: string;
};

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

/** Frontmatter only — avoids pulling rehype/shiki into routes that only need titles (sitemap, blog index). */
function getPostSummary(slug: string): BlogPostSummary {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data: metadata } = matter(raw);
  return {
    metadata: metadata as BlogMetadata,
    slug,
  };
}

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  const dir = path.join(process.cwd(), "content");
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const slug = path.basename(file, path.extname(file));
    return getPostSummary(slug);
  });
}
