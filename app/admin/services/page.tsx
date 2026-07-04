import { prisma } from "@/lib/db/prisma";
import { AdminPage, AdminHeader } from "@/app/admin/components";
import ContentClient from "./ContentClient";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminPage>
      <AdminHeader title="Services" description={`${services.length} services`} />
      <ContentClient type="services" items={services} />
    </AdminPage>
  );
}

