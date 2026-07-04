import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { AdminPage, AdminHeader } from "../../components";
import BlogPostForm from "../BlogPostForm";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });
  if (!post) notFound();

  return (
    <AdminPage>
      <AdminHeader title="Edit Post" description={post.title} />
      <BlogPostForm post={post} />
    </AdminPage>
  );
}
