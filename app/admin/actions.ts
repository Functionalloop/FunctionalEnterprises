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

export async function saveService(data: { id?: string; title: string; description: string; icon: string; order: number }) {
  await requireAuth();
  if (data.id) {
    await prisma.service.update({ where: { id: data.id }, data });
  } else {
    await prisma.service.create({ data });
  }
}

export async function deleteService(id: string) {
  await requireAuth();
  await prisma.service.delete({ where: { id } });
}

export async function saveTestimonial(data: { id?: string; quote: string; author: string; role: string; company: string; projectSlug?: string | null; published: boolean; order: number }) {
  await requireAuth();
  if (data.id) {
    await prisma.testimonial.update({ where: { id: data.id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }
}

export async function deleteTestimonial(id: string) {
  await requireAuth();
  await prisma.testimonial.delete({ where: { id } });
}

export async function saveStat(data: { id?: string; value: string; label: string; order: number }) {
  await requireAuth();
  if (data.id) {
    await prisma.stat.update({ where: { id: data.id }, data });
  } else {
    await prisma.stat.create({ data });
  }
}

export async function deleteStat(id: string) {
  await requireAuth();
  await prisma.stat.delete({ where: { id } });
}

export async function saveProcessStep(data: { id?: string; num: string; title: string; description: string; order: number }) {
  await requireAuth();
  if (data.id) {
    await prisma.processStep.update({ where: { id: data.id }, data });
  } else {
    await prisma.processStep.create({ data });
  }
}

export async function deleteProcessStep(id: string) {
  await requireAuth();
  await prisma.processStep.delete({ where: { id } });
}

export async function markSubmissionAsRead(id: string) {
  await requireAuth();
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
}

export async function deleteSubmission(id: string) {
  await requireAuth();
  await prisma.contactSubmission.delete({ where: { id } });
}
