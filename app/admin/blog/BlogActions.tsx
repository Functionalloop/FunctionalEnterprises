"use client";

import { deleteBlogPost } from "@/app/admin/actions";
import { AdminBtn } from "@/app/admin/components";

export default function BlogActions({ id }: { id: string }) {
  return (
    <form
      action={async () => {
        if (confirm("Delete this post?")) await deleteBlogPost(id);
      }}
    >
      <AdminBtn size="sm" variant="danger" type="submit">
        Delete
      </AdminBtn>
    </form>
  );
}

