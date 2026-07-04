import { prisma } from "@/lib/db/prisma";
import Link from "next/link";
import { AdminPage, AdminHeader, AdminTable, AdminTr, AdminTd, Badge, AdminBtn } from "@/app/admin/components";
import BlogActions from "./BlogActions";

export default async function BlogAdminPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <AdminPage>
      <AdminHeader
        title="Blog Posts"
        description={`${posts.length} posts (${posts.filter((p) => p.published).length} published)`}
        action={
          <Link href="/admin/blog/new">
            <AdminBtn>+ New Post</AdminBtn>
          </Link>
        }
      />

      {posts.length === 0 ? (
        <div className="border border-border-dark p-12 text-center">
          <p className="font-body text-muted-dark text-sm mb-4">No blog posts yet.</p>
          <Link href="/admin/blog/new"><AdminBtn>Write your first post</AdminBtn></Link>
        </div>
      ) : (
        <AdminTable headers={["Title", "Category", "Read Time", "Status", "Date", "Actions"]}>
          {posts.map((post) => (
            <AdminTr key={post.id}>
              <AdminTd>
                <span className="font-semibold max-w-[200px] truncate inline-block">{post.title}</span>
              </AdminTd>
              <AdminTd muted>{post.category}</AdminTd>
              <AdminTd muted>{post.readTime} min</AdminTd>
              <AdminTd>
                <Badge color={post.published ? "green" : "yellow"}>
                  {post.published ? "Published" : "Draft"}
                </Badge>
              </AdminTd>
              <AdminTd muted>
                {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
              </AdminTd>
              <AdminTd>
                <div className="flex gap-2">
                  <Link href={`/admin/blog/${post.id}`}>
                    <AdminBtn size="sm" variant="ghost">Edit</AdminBtn>
                  </Link>
                  <BlogActions id={post.id} />
                </div>
              </AdminTd>
            </AdminTr>
          ))}
        </AdminTable>
      )}
    </AdminPage>
  );
}

