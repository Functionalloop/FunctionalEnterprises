import { prisma } from "./prisma";
import type { Testimonial, Prisma } from "@prisma/client";

export type { Testimonial };

export async function getTestimonials(onlyPublished = true): Promise<Testimonial[]> {
  return prisma.testimonial.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: { order: "asc" },
  });
}

export async function createTestimonial(data: Prisma.TestimonialCreateInput): Promise<Testimonial> {
  return prisma.testimonial.create({ data });
}

export async function updateTestimonial(id: string, data: Prisma.TestimonialUpdateInput): Promise<Testimonial> {
  return prisma.testimonial.update({ where: { id }, data });
}

export async function deleteTestimonial(id: string): Promise<void> {
  await prisma.testimonial.delete({ where: { id } });
}
