import { prisma } from "./prisma";
import type { HackathonProject, Prisma } from "@prisma/client";

export type { HackathonProject };

/**
 * Get all hackathon projects.
 * Sort: placement ASC (nulls last — unranked projects sink to bottom),
 *       then year DESC (newest first within same placement tier).
 */
export async function getHackathonProjects(
  onlyPublished = true
): Promise<HackathonProject[]> {
  return prisma.hackathonProject.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: [
      { placement: { sort: "asc", nulls: "last" } },
      { year: "desc" },
    ],
  });
}

export async function getHackathonProject(
  slug: string
): Promise<HackathonProject | null> {
  return prisma.hackathonProject.findUnique({ where: { slug } });
}

export async function createHackathonProject(
  data: Prisma.HackathonProjectCreateInput
): Promise<HackathonProject> {
  return prisma.hackathonProject.create({ data });
}

export async function updateHackathonProject(
  id: string,
  data: Prisma.HackathonProjectUpdateInput
): Promise<HackathonProject> {
  return prisma.hackathonProject.update({ where: { id }, data });
}

export async function deleteHackathonProject(id: string): Promise<void> {
  await prisma.hackathonProject.delete({ where: { id } });
}
