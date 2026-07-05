import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const dbPath = path.join(__dirname, "dev.db");

async function main() {
  console.log("Starting migration from SQLite to Postgres (Supabase)...");
  const sqliteDb = new DatabaseSync(dbPath);

  // 1. Migrate Projects
  const projects = sqliteDb.prepare("SELECT * FROM Project").all() as any[];
  console.log(`Found ${projects.length} projects in SQLite.`);
  for (const p of projects) {
    await prisma.project.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        slug: p.slug,
        title: p.title,
        client: p.client,
        problem: p.problem,
        solution: p.solution,
        result: p.result,
        tags: p.tags,
        coverImage: p.coverImage,
        year: Number(p.year),
        order: Number(p.order),
        published: p.published === 1,
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
      },
    });
  }
  console.log("Projects migrated.");

  // 2. Migrate Services
  const services = sqliteDb.prepare("SELECT * FROM Service").all() as any[];
  console.log(`Found ${services.length} services in SQLite.`);
  for (const s of services) {
    await prisma.service.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        order: Number(s.order),
      },
    });
  }
  console.log("Services migrated.");

  // 3. Migrate Testimonials
  const testimonials = sqliteDb.prepare("SELECT * FROM Testimonial").all() as any[];
  console.log(`Found ${testimonials.length} testimonials in SQLite.`);
  for (const t of testimonials) {
    await prisma.testimonial.upsert({
      where: { id: t.id },
      update: {},
      create: {
        id: t.id,
        quote: t.quote,
        author: t.author,
        role: t.role,
        company: t.company,
        projectSlug: t.projectSlug || null,
        published: t.published === 1,
        order: Number(t.order),
      },
    });
  }
  console.log("Testimonials migrated.");

  // 4. Migrate Stats
  const stats = sqliteDb.prepare("SELECT * FROM Stat").all() as any[];
  console.log(`Found ${stats.length} stats in SQLite.`);
  for (const s of stats) {
    await prisma.stat.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        value: s.value,
        label: s.label,
        order: Number(s.order),
      },
    });
  }
  console.log("Stats migrated.");

  // 5. Migrate ProcessSteps
  const steps = sqliteDb.prepare("SELECT * FROM ProcessStep").all() as any[];
  console.log(`Found ${steps.length} process steps in SQLite.`);
  for (const s of steps) {
    await prisma.processStep.upsert({
      where: { id: s.id },
      update: {},
      create: {
        id: s.id,
        num: s.num,
        title: s.title,
        description: s.description,
        order: Number(s.order),
      },
    });
  }
  console.log("Process steps migrated.");

  // 6. Migrate BlogPosts
  const blogPosts = sqliteDb.prepare("SELECT * FROM BlogPost").all() as any[];
  console.log(`Found ${blogPosts.length} blog posts in SQLite.`);
  for (const b of blogPosts) {
    await prisma.blogPost.upsert({
      where: { id: b.id },
      update: {},
      create: {
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        category: b.category,
        readTime: Number(b.readTime),
        published: b.published === 1,
        publishedAt: b.publishedAt ? new Date(b.publishedAt) : null,
        coverImage: b.coverImage || null,
        createdAt: new Date(b.createdAt),
        updatedAt: new Date(b.updatedAt),
      },
    });
  }
  console.log("Blog posts migrated.");

  // 7. Migrate ContactSubmissions
  const submissions = sqliteDb.prepare("SELECT * FROM ContactSubmission").all() as any[];
  console.log(`Found ${submissions.length} contact submissions in SQLite.`);
  for (const c of submissions) {
    await prisma.contactSubmission.upsert({
      where: { id: c.id },
      update: {},
      create: {
        id: c.id,
        name: c.name,
        email: c.email,
        projectType: c.projectType || null,
        budget: c.budget || null,
        message: c.message,
        read: c.read === 1,
        createdAt: new Date(c.createdAt),
      },
    });
  }
  console.log("Contact submissions migrated.");

  // 8. Migrate AuditLogs
  const auditLogs = sqliteDb.prepare("SELECT * FROM AuditLog").all() as any[];
  console.log(`Found ${auditLogs.length} audit logs in SQLite.`);
  for (const a of auditLogs) {
    await prisma.auditLog.upsert({
      where: { id: a.id },
      update: {},
      create: {
        id: a.id,
        action: a.action,
        entity: a.entity,
        entityId: a.entityId,
        detail: a.detail || null,
        createdAt: new Date(a.createdAt),
      },
    });
  }
  console.log("Audit logs migrated.");

  console.log("Data migration completed successfully!");
}

main()
  .catch((e) => {
    console.error("Migration failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
