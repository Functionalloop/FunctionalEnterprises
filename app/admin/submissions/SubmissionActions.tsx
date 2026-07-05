"use client";

import { useState } from "react";
import { markRead, deleteSubmission } from "@/app/admin/actions";
import { AdminBtn } from "@/app/admin/components";

export default function SubmissionActions({
  id,
  read,
}: {
  id: string;
  read: boolean;
}) {
  // L-2: Replace window.confirm() with inline confirmation state
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex gap-2 items-center">
      {/* Mark-read action */}
      {!read && (
        <form action={async () => { await markRead(id); }}>
          <AdminBtn size="sm" variant="ghost" type="submit">
            Mark read
          </AdminBtn>
        </form>
      )}

      {/* Delete with inline confirmation */}
      {confirming ? (
        <div className="flex items-center gap-2">
          <span className="font-body text-[9px] text-red-400 uppercase tracking-widest">
            Sure?
          </span>
          <form action={async () => { await deleteSubmission(id); setConfirming(false); }}>
            <AdminBtn size="sm" variant="danger" type="submit">
              Yes, delete
            </AdminBtn>
          </form>
          <AdminBtn
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </AdminBtn>
        </div>
      ) : (
        <AdminBtn
          size="sm"
          variant="danger"
          type="button"
          onClick={() => setConfirming(true)}
        >
          Delete
        </AdminBtn>
      )}
    </div>
  );
}
