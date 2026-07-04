"use client";

import { markRead, deleteSubmission } from "@/app/admin/actions";
import { AdminBtn } from "@/app/admin/components";

export default function SubmissionActions({
  id,
  read,
}: {
  id: string;
  read: boolean;
}) {
  return (
    <div className="flex gap-2">
      {!read && (
        <form action={async () => { await markRead(id); }}>
          <AdminBtn size="sm" variant="ghost" type="submit">
            Mark read
          </AdminBtn>
        </form>
      )}
      <form action={async () => { if (confirm("Delete submission?")) await deleteSubmission(id); }}>
        <AdminBtn size="sm" variant="danger" type="submit">
          Delete
        </AdminBtn>
      </form>
    </div>
  );
}

