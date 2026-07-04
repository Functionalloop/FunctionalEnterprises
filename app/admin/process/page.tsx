import { prisma } from "@/lib/db/prisma";
import { AdminPage, AdminHeader } from "@/app/admin/components";
import ProcessEditor from "./ProcessEditor";

export default async function ProcessAdminPage() {
  const steps = await prisma.processStep.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminPage>
      <AdminHeader title="Process Steps" description='The 4 "How we work" steps shown on the home page.' />
      <ProcessEditor steps={steps} />
    </AdminPage>
  );
}

