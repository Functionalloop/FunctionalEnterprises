import { getSubmissions } from "@/lib/db/submissions";
import { AdminPage, AdminHeader, AdminTable, AdminTr, AdminTd, Badge } from "@/app/admin/components";
import SubmissionActions from "./SubmissionActions";

export default async function SubmissionsPage() {
  const submissions = await getSubmissions();
  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <AdminPage>
      <AdminHeader
        title="Contact Submissions"
        description={`${submissions.length} total · ${unreadCount} unread`}
      />

      {submissions.length === 0 ? (
        <div className="border border-border-dark p-12 text-center">
          <p className="font-body text-muted-dark text-sm">
            No form submissions yet. They appear here when someone fills in the
            contact form.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {submissions.map((s) => (
            <div
              key={s.id}
              className={`border p-6 ${s.read ? "border-border-dark" : "border-accent/30 bg-accent/[0.02]"}`}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-display font-bold text-white">
                      {s.name}
                    </span>
                    {!s.read && <Badge color="yellow">New</Badge>}
                    {s.projectType && <Badge>{s.projectType}</Badge>}
                    {s.budget && <Badge>{s.budget}</Badge>}
                  </div>
                  <a
                    href={`mailto:${s.email}`}
                    className="font-body text-xs text-accent hover:underline"
                  >
                    {s.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-body text-[10px] text-muted-darker">
                    {new Date(s.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  <SubmissionActions id={s.id} read={s.read} />
                </div>
              </div>
              <p className="font-body text-sm text-muted-dark leading-relaxed whitespace-pre-wrap border-l-2 border-border-dark pl-4">
                {s.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </AdminPage>
  );
}

