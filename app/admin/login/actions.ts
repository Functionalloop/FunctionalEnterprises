"use server";

import { redirect } from "next/navigation";
import { setSession, clearSession } from "@/lib/auth/session";

type State = { error: string } | undefined;

export async function login(state: State, formData: FormData): Promise<State | never> {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD is not configured in .env.local" };
  }

  if (!password || password !== adminPassword) {
    // Small delay to prevent timing attacks / brute force
    await new Promise((r) => setTimeout(r, 500));
    return { error: "Incorrect password. Try again." };
  }

  await setSession();
  redirect("/admin");
}

export async function logout(): Promise<never> {
  await clearSession();
  redirect("/admin/login");
}
