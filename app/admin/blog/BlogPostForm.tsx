"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { BlogPost } from "@/lib/db/blog";
import { saveBlogPost } from "@/app/admin/actions";
import { AdminBtn, AdminInput, AdminTextarea, AdminSelect, FieldLabel } from "@/app/admin/components";

export default function BlogPostForm({ post }: { post?: BlogPost }) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    await saveBlogPost(formData);
    setIsPending(false);
    router.push("/admin/blog");
  }

  return (
    <form action={handleSubmit} className="flex flex-col gap-6 max-w-3xl">
      {post && <input type="hidden" name="id" value={post.id} />}

      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <FieldLabel htmlFor="title">Title *</FieldLabel>
          <AdminInput id="title" name="title" defaultValue={post?.title} required placeholder="How we built a £1M revenue landing page" />
        </div>
        <div>
          <FieldLabel htmlFor="slug">Slug *</FieldLabel>
          <AdminInput id="slug" name="slug" defaultValue={post?.slug} required placeholder="how-we-built-a-1m-landing-page" />
        </div>
        <div>
          <FieldLabel htmlFor="category">Category *</FieldLabel>
          <AdminInput id="category" name="category" defaultValue={post?.category} required placeholder="Design, Development, Strategy…" />
        </div>
        <div>
          <FieldLabel htmlFor="readTime">Read Time (minutes)</FieldLabel>
          <AdminInput id="readTime" name="readTime" type="number" defaultValue={post?.readTime ?? 5} min={1} />
        </div>
        <div>
          <FieldLabel htmlFor="published">Status</FieldLabel>
          <AdminSelect id="published" name="published" defaultValue={String(post?.published ?? false)}>
            <option value="false">Draft</option>
            <option value="true">Published</option>
          </AdminSelect>
        </div>
        <div className="col-span-2">
          <FieldLabel htmlFor="coverImage">Cover Image URL</FieldLabel>
          <AdminInput id="coverImage" name="coverImage" defaultValue={post?.coverImage ?? ""} placeholder="/images/blog/my-post-cover.jpg" />
        </div>
        <div className="col-span-2">
          <FieldLabel htmlFor="excerpt">Excerpt *</FieldLabel>
          <AdminTextarea id="excerpt" name="excerpt" defaultValue={post?.excerpt} required rows={2} placeholder="Short description shown in blog listing…" />
        </div>
        <div className="col-span-2">
          <FieldLabel htmlFor="content">Content * (Markdown supported)</FieldLabel>
          <AdminTextarea id="content" name="content" defaultValue={post?.content} required rows={20} placeholder="# My Post&#10;&#10;Write your post content here in Markdown…" className="font-mono text-xs leading-relaxed" />
        </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-border-dark">
        <AdminBtn type="submit" disabled={isPending}>
          {isPending ? "Saving…" : "Save Post"}
        </AdminBtn>
        <AdminBtn type="button" variant="ghost" onClick={() => router.push("/admin/blog")}>
          Cancel
        </AdminBtn>
      </div>
    </form>
  );
}

