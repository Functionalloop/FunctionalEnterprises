"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db/prisma";

const SECRET = process.env.ADMIN_SESSION_SECRET;

export async function requireAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (session !== SECRET) {
    throw new Error("Unauthorized");
  }
}

export async function login(password: string) {
  if (password === process.env.ADMIN_PASSWORD) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", SECRET!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24, // 24 hours
    });
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}

export async function saveProject(data: { id?: string; title: string; slug: string; client: string; problem: string; solution: string; result: string; tags: string; coverImage: string; year: number; order: number; published: boolean }) {
  await requireAuth();
  if (data.id) {
    await prisma.project.update({ where: { id: data.id }, data });
  } else {
    await prisma.project.create({ data });
  }
}

export async function deleteProject(id: string) {
  await requireAuth();
  await prisma.project.delete({ where: { id } });
}

export async function saveBlogPost(data: { id?: string; title: string; slug: string; excerpt: string; content: string; category: string; coverImage: string; readTime: number; published: boolean }) {
  await requireAuth();
  
  if (data.id) {
    await prisma.blogPost.update({ where: { id: data.id }, data });
  } else {
    await prisma.blogPost.create({ 
      data: {
        ...data,
        publishedAt: data.published ? new Date() : null,
      } 
    });
  }
}

export async function deleteBlogPost(id: string) {
  await requireAuth();
  await prisma.blogPost.delete({ where: { id } });
}
