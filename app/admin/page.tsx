import { prisma } from "@/lib/db/prisma";
import { getUnreadCount } from "@/lib/db/submissions";
import {
  AdminPage,
  AdminHeader,
  StatCard,
  AdminTable,
  AdminTr,
  AdminTd,
  Badge,
} from "./components";

export default async function AdminDashboard() {
  // Fetch all counts in parallel
  const [
    projectCount,
    serviceCount,
    testimonialCount,
    blogPostCount,
    unreadCount,
    recentSubmissions,
    publishedPosts,
  ] = await Promise.all([
    prisma.project.count(),
    prisma.service.count(),
    prisma.testimonial.count(),
    prisma.blogPost.count(),
    getUnreadCount(),
    prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
    prisma.blogPost.count({ where: { published: true } }),
  ]);

  return (
    <AdminPage>
      <AdminHeader
        title="Dashboard"
        description="Overview of your site content."
      />

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <StatCard label="Projects" value={projectCount} />
        <StatCard label="Services" value={serviceCount} />
        <StatCard label="Blog Posts" value={`${publishedPosts}/${blogPostCount}`} />
        <StatCard label="Unread Messages" value={unreadCount} accent={unreadCount > 0} />
      </div>

      {/* Recent submissions */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display font-bold text-white text-lg tracking-tight">
          Recent Submissions
        </h2>
        <a
          href="/admin/submissions"
          className="font-body text-xs text-accent hover:underline"
        >
          View all →
        </a>
      </div>

      {recentSubmissions.length === 0 ? (
        <div className="border border-border-dark p-10 text-center">
          <p className="font-body text-sm text-muted-dark">
            No submissions yet. They&apos;ll appear here when the contact form is submitted.
          </p>
        </div>
      ) : (
        <AdminTable headers={["Name", "Email", "Project Type", "Date", "Status"]}>
          {recentSubmissions.map((s) => (
            <AdminTr key={s.id}>
              <AdminTd>{s.name}</AdminTd>
              <AdminTd muted>{s.email}</AdminTd>
              <AdminTd muted>{s.projectType ?? "—"}</AdminTd>
              <AdminTd muted>
                {new Date(s.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })}
              </AdminTd>
              <AdminTd>
                <Badge color={s.read ? "default" : "yellow"}>
                  {s.read ? "Read" : "New"}
                </Badge>
              </AdminTd>
            </AdminTr>
          ))}
        </AdminTable>
      )}
    </AdminPage>
  );
}

