/**
 * lib/auth/requireAdmin.ts
 *
 * Defence-in-depth auth guard for admin Server Actions and Server Components.
 * Call `await requireAdmin()` at the top of every admin mutation to ensure the
 * caller is authenticated even if middleware is somehow bypassed.
 */

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "./session";

/**
 * Verify the admin session from the incoming cookies.
 * If the session is missing or invalid, redirect to /admin/login.
 * Safe to call from Server Actions, async layouts, and page components.
 */
export async function requireAdmin(): Promise<void> {
  const store = await cookies();
  const token = store.get("admin_session")?.value ?? "";
  const valid = await verifyToken(token);
  if (!valid) {
    redirect("/admin/login");
  }
}
