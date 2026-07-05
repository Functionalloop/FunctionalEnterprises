"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createHash, timingSafeEqual } from "crypto";
import { setSession, clearSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/auth/rateLimit";

type State = { error: string } | undefined;

/** Extract the caller's IP from standard proxy headers. */
async function getClientIP(): Promise<string> {
  const h = await headers();
  return (
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown"
  );
}

export async function login(
  state: State,
  formData: FormData
): Promise<State | never> {
  const ip = await getClientIP();

  // H-1: Rate limit — max 5 login attempts per IP per 15 minutes
  const { allowed, retryAfterMs } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    const mins = Math.ceil(retryAfterMs / 60_000);
    return {
      error: `Too many failed attempts. Try again in ${mins} minute${mins !== 1 ? "s" : ""}.`,
    };
  }

  const password = (formData.get("password") as string) ?? "";
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "Server misconfiguration: ADMIN_PASSWORD is not set." };
  }

  // C-2: Constant-time comparison — hash both to a fixed length first so
  // different-length inputs don't leak timing information via buffer size.
  const inputHash = createHash("sha256").update(Buffer.from(password)).digest();
  const adminHash = createHash("sha256").update(Buffer.from(adminPassword)).digest();
  const valid = timingSafeEqual(inputHash, adminHash);

  if (!valid) {
    // Small additional delay to further slow brute-force even with rate limiting
    await new Promise((r) => setTimeout(r, 500));
    return { error: "Incorrect password. Try again." };
  }

  await setSession();

  // M-5: Validate the post-login redirect — must be a relative /admin path
  const from = (formData.get("from") as string) ?? "";
  const safeTo =
    from.startsWith("/admin") && !from.includes("://") ? from : "/admin";

  redirect(safeTo);
}

export async function logout(): Promise<never> {
  await clearSession();
  redirect("/admin/login");
}
