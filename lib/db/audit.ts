/**
 * lib/db/audit.ts
 *
 * Lightweight audit log writer.
 * Wraps every write in a try/catch so a logging failure never breaks the
 * primary operation that triggered it.
 */

import { prisma } from "./prisma";

/**
 * Record an admin action in the AuditLog table.
 *
 * @param action   - Verb: "create" | "update" | "delete"
 * @param entity   - Model name: "Project" | "Service" | "Testimonial" | ...
 * @param entityId - The record's id or slug
 * @param detail   - Optional human-readable summary (e.g. the record title)
 */
export async function logAudit(
  action: string,
  entity: string,
  entityId: string,
  detail?: string
): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: { action, entity, entityId, detail: detail ?? null },
    });
  } catch (err) {
    // Never let audit logging block the main operation
    console.error("[AuditLog] Failed to write entry:", err);
  }
}
