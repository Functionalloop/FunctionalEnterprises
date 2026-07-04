import { prisma } from "@/lib/db/prisma";
import { AdminPage, AdminHeader } from "@/app/admin/components";
import StatsEditor from "./StatsEditor";

export default async function StatsAdminPage() {
  const stats = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminPage>
      <AdminHeader title="Homepage Stats" description="The 4 metrics shown in the dark stats band on the home page." />
      <StatsEditor stats={stats} />
    </AdminPage>
  );
}

