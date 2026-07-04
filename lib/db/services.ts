import { prisma } from "./prisma";
import type { Service, Prisma } from "@prisma/client";

export type { Service };

export async function getServices(): Promise<Service[]> {
  return prisma.service.findMany({ orderBy: { order: "asc" } });
}

export async function createService(data: Prisma.ServiceCreateInput): Promise<Service> {
  return prisma.service.create({ data });
}

export async function updateService(id: string, data: Prisma.ServiceUpdateInput): Promise<Service> {
  return prisma.service.update({ where: { id }, data });
}

export async function deleteService(id: string): Promise<void> {
  await prisma.service.delete({ where: { id } });
}
