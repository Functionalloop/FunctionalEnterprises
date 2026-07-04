"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";

// ── Projects ─────────────────────────────────────────────────────────────────
export async function saveProject(formData: FormData): Promise<void> {
  const id = formData.get("id") as string | null;
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const data = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    client: formData.get("client") as string,
    problem: formData.get("problem") as string,
    solution: formData.get("solution") as string,
    result: formData.get("result") as string,
    coverImage: formData.get("coverImage") as string,
    year: parseInt(formData.get("year") as string, 10),
    order: parseInt((formData.get("order") as string) || "0", 10),
    published: formData.get("published") === "true",
    tags,
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
  } else {
    await prisma.project.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${data.slug}`);
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await prisma.project.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}

// ── Services ─────────────────────────────────────────────────────────────────
export async function saveService(formData: FormData): Promise<void> {
  const id = formData.get("id") as string | null;
  const data = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
    order: parseInt((formData.get("order") as string) || "0", 10),
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
  } else {
    await prisma.service.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  await prisma.service.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export async function saveTestimonial(formData: FormData): Promise<void> {
  const id = formData.get("id") as string | null;
  const data = {
    quote: formData.get("quote") as string,
    author: formData.get("author") as string,
    role: formData.get("role") as string,
    company: formData.get("company") as string,
    projectSlug: (formData.get("projectSlug") as string) || null,
    published: formData.get("published") === "true",
    order: parseInt((formData.get("order") as string) || "0", 10),
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
  } else {
    await prisma.testimonial.create({ data });
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

// ── Stats ─────────────────────────────────────────────────────────────────────
export async function saveStats(formData: FormData): Promise<void> {
  const entries = JSON.parse(formData.get("stats") as string) as Array<{
    id: string;
    value: string;
    label: string;
  }>;

  await Promise.all(
    entries.map(({ id, value, label }) =>
      prisma.stat.update({ where: { id }, data: { value, label } })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/stats");
}

// ── Process steps ─────────────────────────────────────────────────────────────
export async function saveProcessSteps(formData: FormData): Promise<void> {
  const entries = JSON.parse(formData.get("steps") as string) as Array<{
    id: string;
    title: string;
    description: string;
  }>;

  await Promise.all(
    entries.map(({ id, title, description }) =>
      prisma.processStep.update({ where: { id }, data: { title, description } })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/process");
}

// ── Blog ──────────────────────────────────────────────────────────────────────
export async function saveBlogPost(formData: FormData): Promise<void> {
  const id = formData.get("id") as string | null;
  const published = formData.get("published") === "true";

  const data = {
    slug: formData.get("slug") as string,
    title: formData.get("title") as string,
    excerpt: formData.get("excerpt") as string,
    content: formData.get("content") as string,
    category: formData.get("category") as string,
    readTime: parseInt((formData.get("readTime") as string) || "5", 10),
    coverImage: (formData.get("coverImage") as string) || null,
    published,
    publishedAt: published ? new Date() : null,
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
  } else {
    await prisma.blogPost.create({ data });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<void> {
  await prisma.blogPost.delete({ where: { id } });
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

// ── Submissions ──────────────────────────────────────────────────────────────
export async function markRead(id: string): Promise<void> {
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export async function deleteSubmission(id: string): Promise<void> {
  await prisma.contactSubmission.delete({ where: { id } });
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
