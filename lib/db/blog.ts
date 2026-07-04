import { prisma } from "./prisma";
import type { BlogPost, Prisma } from "@prisma/client";

export type { BlogPost };

export async function getBlogPosts(onlyPublished = true): Promise<BlogPost[]> {
  return prisma.blogPost.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { publishedAt: "desc" },
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return prisma.blogPost.findUnique({ where: { slug } });
}

export async function createBlogPost(data: Prisma.BlogPostCreateInput): Promise<BlogPost> {
  return prisma.blogPost.create({ data });
}

export async function updateBlogPost(id: string, data: Prisma.BlogPostUpdateInput): Promise<BlogPost> {
  return prisma.blogPost.update({ where: { id }, data });
}

export async function deleteBlogPost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
}
