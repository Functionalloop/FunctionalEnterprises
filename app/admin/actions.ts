"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/requireAdmin";
import { logAudit } from "@/lib/db/audit";

// ── Validation helpers ────────────────────────────────────────────────────────
function requireString(value: FormDataEntryValue | null, fieldName: string, maxLen = 500): string {
  const str = (value as string | null)?.trim() ?? "";
  if (!str) throw new Error(`${fieldName} is required`);
  if (str.length > maxLen) throw new Error(`${fieldName} is too long (max ${maxLen} chars)`);
  return str;
}

function optionalString(value: FormDataEntryValue | null, maxLen = 500): string | null {
  const str = (value as string | null)?.trim() ?? "";
  if (!str) return null;
  if (str.length > maxLen) return null;
  return str;
}

function requireInt(value: FormDataEntryValue | null, fieldName: string, fallback = 0): number {
  const parsed = parseInt((value as string | null) ?? "", 10);
  if (isNaN(parsed)) return fallback;
  return parsed;
}

// ── Projects ─────────────────────────────────────────────────────────────────
export async function saveProject(formData: FormData): Promise<void> {
  // H-2: Auth guard — every action verifies session server-side
  await requireAdmin();

  const id = optionalString(formData.get("id"));
  const tags = ((formData.get("tags") as string) ?? "")
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 20); // max 20 tags

  const data = {
    slug:       requireString(formData.get("slug"), "Slug", 200),
    title:      requireString(formData.get("title"), "Title", 200),
    client:     requireString(formData.get("client"), "Client", 200),
    problem:    requireString(formData.get("problem"), "Problem", 5000),
    solution:   requireString(formData.get("solution"), "Solution", 5000),
    result:     requireString(formData.get("result"), "Result", 1000),
    coverImage: requireString(formData.get("coverImage"), "Cover image", 500),
    year:       requireInt(formData.get("year"), "Year", new Date().getFullYear()),
    order:      requireInt(formData.get("order"), "Order", 0),
    published:  formData.get("published") === "true",
    tags,
  };

  if (id) {
    await prisma.project.update({ where: { id }, data });
    await logAudit("update", "Project", id, data.title);
  } else {
    const created = await prisma.project.create({ data });
    await logAudit("create", "Project", created.id, data.title);
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath(`/work/${data.slug}`);
  revalidatePath("/admin/projects");
}

export async function deleteProject(id: string): Promise<void> {
  await requireAdmin();
  const project = await prisma.project.findUnique({ where: { id }, select: { title: true } });
  await prisma.project.delete({ where: { id } });
  await logAudit("delete", "Project", id, project?.title);
  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin/projects");
}

// ── Services ─────────────────────────────────────────────────────────────────
export async function saveService(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = optionalString(formData.get("id"));
  const data = {
    title:       requireString(formData.get("title"), "Title", 200),
    description: requireString(formData.get("description"), "Description", 2000),
    icon:        requireString(formData.get("icon"), "Icon", 50),
    order:       requireInt(formData.get("order"), "Order", 0),
  };

  if (id) {
    await prisma.service.update({ where: { id }, data });
    await logAudit("update", "Service", id, data.title);
  } else {
    const created = await prisma.service.create({ data });
    await logAudit("create", "Service", created.id, data.title);
  }

  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

export async function deleteService(id: string): Promise<void> {
  await requireAdmin();
  const service = await prisma.service.findUnique({ where: { id }, select: { title: true } });
  await prisma.service.delete({ where: { id } });
  await logAudit("delete", "Service", id, service?.title);
  revalidatePath("/");
  revalidatePath("/services");
  revalidatePath("/admin/services");
}

// ── Testimonials ─────────────────────────────────────────────────────────────
export async function saveTestimonial(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = optionalString(formData.get("id"));
  const data = {
    quote:       requireString(formData.get("quote"), "Quote", 2000),
    author:      requireString(formData.get("author"), "Author", 200),
    role:        requireString(formData.get("role"), "Role", 200),
    company:     requireString(formData.get("company"), "Company", 200),
    projectSlug: optionalString(formData.get("projectSlug"), 200),
    published:   formData.get("published") === "true",
    order:       requireInt(formData.get("order"), "Order", 0),
  };

  if (id) {
    await prisma.testimonial.update({ where: { id }, data });
    await logAudit("update", "Testimonial", id, data.author);
  } else {
    const created = await prisma.testimonial.create({ data });
    await logAudit("create", "Testimonial", created.id, data.author);
  }

  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

export async function deleteTestimonial(id: string): Promise<void> {
  await requireAdmin();
  const t = await prisma.testimonial.findUnique({ where: { id }, select: { author: true } });
  await prisma.testimonial.delete({ where: { id } });
  await logAudit("delete", "Testimonial", id, t?.author);
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
}

// ── Stats ─────────────────────────────────────────────────────────────────────
export async function saveStats(formData: FormData): Promise<void> {
  await requireAdmin();

  // M-6: Wrap JSON.parse in try/catch to handle malformed input gracefully
  let entries: Array<{ id: string; value: string; label: string }>;
  try {
    entries = JSON.parse(formData.get("stats") as string);
    if (!Array.isArray(entries)) throw new Error("stats must be an array");
  } catch {
    throw new Error("Invalid stats payload");
  }

  // Validate each entry
  const safeEntries = entries
    .filter((e) => typeof e.id === "string" && e.id.length > 0)
    .map((e) => ({
      id:    String(e.id).slice(0, 100),
      value: String(e.value ?? "").slice(0, 100),
      label: String(e.label ?? "").slice(0, 200),
    }));

  await Promise.all(
    safeEntries.map(({ id, value, label }) =>
      prisma.stat.update({ where: { id }, data: { value, label } })
    )
  );

  await logAudit("update", "Stats", "bulk", `${safeEntries.length} entries`);
  revalidatePath("/");
  revalidatePath("/admin/stats");
}

// ── Process steps ─────────────────────────────────────────────────────────────
export async function saveProcessSteps(formData: FormData): Promise<void> {
  await requireAdmin();

  // M-6: Wrap JSON.parse in try/catch
  let entries: Array<{ id: string; title: string; description: string }>;
  try {
    entries = JSON.parse(formData.get("steps") as string);
    if (!Array.isArray(entries)) throw new Error("steps must be an array");
  } catch {
    throw new Error("Invalid steps payload");
  }

  const safeEntries = entries
    .filter((e) => typeof e.id === "string" && e.id.length > 0)
    .map((e) => ({
      id:          String(e.id).slice(0, 100),
      title:       String(e.title ?? "").slice(0, 200),
      description: String(e.description ?? "").slice(0, 1000),
    }));

  await Promise.all(
    safeEntries.map(({ id, title, description }) =>
      prisma.processStep.update({ where: { id }, data: { title, description } })
    )
  );

  await logAudit("update", "ProcessSteps", "bulk", `${safeEntries.length} entries`);
  revalidatePath("/");
  revalidatePath("/admin/process");
}

// ── Blog ──────────────────────────────────────────────────────────────────────
export async function saveBlogPost(formData: FormData): Promise<void> {
  await requireAdmin();

  const id = optionalString(formData.get("id"));
  const published = formData.get("published") === "true";

  const data = {
    slug:        requireString(formData.get("slug"), "Slug", 200),
    title:       requireString(formData.get("title"), "Title", 300),
    excerpt:     requireString(formData.get("excerpt"), "Excerpt", 500),
    content:     requireString(formData.get("content"), "Content", 100_000),
    category:    requireString(formData.get("category"), "Category", 100),
    readTime:    requireInt(formData.get("readTime"), "Read time", 5),
    coverImage:  optionalString(formData.get("coverImage"), 500),
    published,
    publishedAt: published ? new Date() : null,
  };

  if (id) {
    await prisma.blogPost.update({ where: { id }, data });
    await logAudit("update", "BlogPost", id, data.title);
  } else {
    const created = await prisma.blogPost.create({ data });
    await logAudit("create", "BlogPost", created.id, data.title);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${data.slug}`);
  revalidatePath("/admin/blog");
}

export async function deleteBlogPost(id: string): Promise<void> {
  await requireAdmin();
  const post = await prisma.blogPost.findUnique({ where: { id }, select: { title: true } });
  await prisma.blogPost.delete({ where: { id } });
  await logAudit("delete", "BlogPost", id, post?.title);
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
}

// ── Submissions ──────────────────────────────────────────────────────────────
export async function markRead(id: string): Promise<void> {
  await requireAdmin();
  await prisma.contactSubmission.update({ where: { id }, data: { read: true } });
  await logAudit("update", "ContactSubmission", id, "marked read");
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}

export async function deleteSubmission(id: string): Promise<void> {
  await requireAdmin();
  await prisma.contactSubmission.delete({ where: { id } });
  await logAudit("delete", "ContactSubmission", id);
  revalidatePath("/admin/submissions");
  revalidatePath("/admin");
}
