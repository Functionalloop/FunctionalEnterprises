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
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const blogs = await prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <AdminDashboard projects={projects} blogs={blogs} />
    </div>
  );
}
