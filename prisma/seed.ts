import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const { prisma } = require("../lib/db/prisma");
import { projects } from "../lib/data/projects";
import { services } from "../lib/data/services";
import { testimonials } from "../lib/data/testimonials";

const stats = [
  { value: "42+", label: "Projects Delivered" },
  { value: "£4M+", label: "Revenue Driven for Clients" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "6 Wks", label: "Average Launch Timeline" },
];

const blogs = [
  {
    slug: "why-nextjs-for-agencies",
    title: "Why Next.js is the Ultimate Framework for Modern Agencies",
    excerpt: "Discover how Next.js empowers digital agencies to build lightning-fast, SEO-optimized web experiences.",
    content: "Next.js has become the de-facto standard for React applications. Its hybrid static and server rendering capabilities combined with Edge computing means we can ship performant sites without sacrificing dynamic functionality. In this post, we explore the architectural advantages of adopting Next.js for agency projects.",
    category: "Engineering",
    readTime: 5,
    published: true,
    publishedAt: new Date("2026-06-10T10:00:00Z"),
  },
  {
    slug: "design-systems-that-scale",
    title: "Building Design Systems That Actually Scale",
    excerpt: "A practical guide to creating component libraries and design tokens that bridge the gap between design and engineering.",
    content: "A design system is more than a UI kit. It's a living ecosystem of guidelines, tokens, and components that evolve alongside your brand. By using tools like Tailwind CSS and Framer Motion, we create robust systems that allow for rapid iteration while maintaining strict visual consistency.",
    category: "Design",
    readTime: 8,
    published: true,
    publishedAt: new Date("2026-06-25T14:30:00Z"),
  },
  {
    slug: "seo-in-2026",
    title: "SEO in 2026: Beyond Core Web Vitals",
    excerpt: "What matters for technical SEO in 2026? We break down the latest algorithm updates and performance metrics.",
    content: "While Core Web Vitals remain crucial, semantic HTML and AI-driven intent matching are dominating the SEO landscape today. Search engines are getting better at understanding context and user experience, meaning that technically sound, accessible websites naturally rank higher.",
    category: "Strategy",
    readTime: 6,
    published: true,
    publishedAt: new Date("2026-07-01T09:15:00Z"),
  }
];

const steps = [
  { num: "01", title: "Discover", description: "We learn your business, goals, and users." },
  { num: "02", title: "Design", description: "We map structure, flow, and visual direction." },
  { num: "03", title: "Build", description: "We ship clean, fast, production-ready code." },
  { num: "04", title: "Launch", description: "We deploy, test, and stay on for support." },
];

async function main() {
  console.log("Seeding database...");

  // Seed Projects
  for (let i = 0; i < projects.length; i++) {
    const p = projects[i];
    await prisma.project.upsert({
      where: { slug: p.slug },
      update: {},
      create: {
        slug: p.slug,
        title: p.title,
        client: p.client,
        problem: p.problem,
        solution: p.solution,
        result: p.result,
        tags: p.tags.join(", "),
        coverImage: p.coverImage,
        year: p.year,
        order: i,
        published: true,
      },
    });
  }
  console.log("Projects seeded.");

  // Seed Services
  for (let i = 0; i < services.length; i++) {
    const s = services[i];
    // Since service doesn't have a slug, we use a simple check
    const existing = await prisma.service.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.service.create({
        data: {
          title: s.title,
          description: s.description,
          icon: s.icon,
          order: i,
        },
      });
    }
  }
  console.log("Services seeded.");

  // Seed Testimonials
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    const existing = await prisma.testimonial.findFirst({ where: { author: t.author } });
    if (!existing) {
      await prisma.testimonial.create({
        data: {
          quote: t.quote,
          author: t.author,
          role: t.role,
          company: t.company,
          projectSlug: t.projectSlug || null,
          order: i,
          published: true,
        },
      });
    }
  }
  console.log("Testimonials seeded.");

  // Seed Stats
  for (let i = 0; i < stats.length; i++) {
    const s = stats[i];
    const existing = await prisma.stat.findFirst({ where: { label: s.label } });
    if (!existing) {
      await prisma.stat.create({
        data: { value: s.value, label: s.label, order: i },
      });
    }
  }
  console.log("Stats seeded.");

  // Seed Process Steps
  for (let i = 0; i < steps.length; i++) {
    const s = steps[i];
    const existing = await prisma.processStep.findFirst({ where: { title: s.title } });
    if (!existing) {
      await prisma.processStep.create({
        data: { num: s.num, title: s.title, description: s.description, order: i },
      });
    }
  }
  console.log("Process Steps seeded.");

  // Seed Blog Posts
  for (let i = 0; i < blogs.length; i++) {
    const b = blogs[i];
    await prisma.blogPost.upsert({
      where: { slug: b.slug },
      update: {},
      create: b,
    });
  }
  console.log("Blog posts seeded.");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
