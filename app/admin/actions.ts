"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { setSession, clearSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/auth/rateLimit";
import { headers } from "next/headers";

export async function requireAuth() {
  await requireAdmin();
}

export async function login(password: string) {
  // IP-based rate limiting (max 5 attempts per 15 minutes)
  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    h.get("x-real-ip") ??
    "unknown";
  const { allowed, retryAfterMs } = checkRateLimit(`login:${ip}`, 5, 15 * 60 * 1000);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 1000 / 60);
    return { success: false, error: `Too many attempts. Try again in ${minutes} minutes.` };
  }

  if (password === process.env.ADMIN_PASSWORD) {
    await setSession();
    return { success: true };
  }
  return { success: false, error: "Invalid password" };
}

export async function logout() {
  await clearSession();
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

export async function saveHackathonProject(data: {
  id?: string;
  slug: string;
  name: string;
  description: string;
  tags: string;
  award?: string | null;
  placement?: number | null;
  event?: string | null;
  year: number;
  teamMembers?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  published: boolean;
}) {
  await requireAuth();
  const { id, ...rest } = data;
  if (id) {
    await prisma.hackathonProject.update({ where: { id }, data: rest });
  } else {
    await prisma.hackathonProject.create({ data: rest });
  }
}

export async function deleteHackathonProject(id: string) {
  await requireAuth();
  await prisma.hackathonProject.delete({ where: { id } });
}

