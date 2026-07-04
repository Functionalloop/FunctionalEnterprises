import { prisma } from "@/lib/db/prisma";
import { AdminPage, AdminHeader, AdminTable, AdminTr, AdminTd, Badge } from "@/app/admin/components";
import ContentClient from "./ContentClient";

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  return (
    <AdminPage>
      <AdminHeader title="Testimonials" description={`${testimonials.length} client quotes`} />
      <ContentClient type="testimonials" items={testimonials} />
    </AdminPage>
  );
}

