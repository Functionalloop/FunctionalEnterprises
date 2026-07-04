import { prisma } from "./prisma";
import type { ContactSubmission } from "@prisma/client";

export type { ContactSubmission };

export async function saveSubmission(data: {
  name: string;
  email: string;
  projectType?: string;
  budget?: string;
  message: string;
}): Promise<ContactSubmission> {
  return prisma.contactSubmission.create({ data });
}

export async function getSubmissions(): Promise<ContactSubmission[]> {
  return prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function markSubmissionRead(id: string): Promise<void> {
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
}

export async function getUnreadCount(): Promise<number> {
  return prisma.contactSubmission.count({ where: { read: false } });
}
