import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthenticated = session === process.env.ADMIN_SESSION_SECRET;

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  // Fetch data for the dashboard
  const [projects, blogs, services, testimonials, stats, processSteps, submissions] = await Promise.all([
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.stat.findMany({ orderBy: { order: "asc" } }),
    prisma.processStep.findMany({ orderBy: { order: "asc" } }),
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <AdminDashboard
        projects={projects}
        blogs={blogs}
        services={services}
        testimonials={testimonials}
        stats={stats}
        processSteps={processSteps}
        submissions={submissions}
      />
    </div>
  );
}
