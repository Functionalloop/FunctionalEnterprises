import { prisma } from "./prisma";
import type { Stat, ProcessStep, Prisma } from "@prisma/client";

export type { Stat, ProcessStep };

// ── Stats ────────────────────────────────────────────────────────────────────
export async function getStats(): Promise<Stat[]> {
  return prisma.stat.findMany({ orderBy: { order: "asc" } });
}

export async function updateStat(id: string, data: Prisma.StatUpdateInput): Promise<Stat> {
  return prisma.stat.update({ where: { id }, data });
}

// ── Process steps ────────────────────────────────────────────────────────────
export async function getProcessSteps(): Promise<ProcessStep[]> {
  return prisma.processStep.findMany({ orderBy: { order: "asc" } });
}

export async function updateProcessStep(id: string, data: Prisma.ProcessStepUpdateInput): Promise<ProcessStep> {
  return prisma.processStep.update({ where: { id }, data });
}
