import { prisma } from "./prisma";
import type { Project, Prisma } from "@prisma/client";

export type { Project };

export async function getProjects(onlyPublished = true): Promise<Project[]> {
  return prisma.project.findMany({
    where: onlyPublished ? { published: true } : undefined,
    orderBy: [{ order: "asc" }, { year: "desc" }],
  });
}

export async function getProject(slug: string): Promise<Project | null> {
  return prisma.project.findUnique({ where: { slug } });
}

export async function createProject(
  data: Prisma.ProjectCreateInput
): Promise<Project> {
  return prisma.project.create({ data });
}

export async function updateProject(
  id: string,
  data: Prisma.ProjectUpdateInput
): Promise<Project> {
  return prisma.project.update({ where: { id }, data });
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
}
