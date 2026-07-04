/**
 * prisma/seed.ts
 *
 * Seeds the database with the existing static site data.
 * Run with: npx prisma db seed
 *
 * This is safe to re-run — it upserts rather than inserts,
 * so you won't get duplicates.
 */

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { prisma } from "../lib/db/prisma";

async function main() {
  console.log("🌱 Seeding database…");

  // ── Projects ───────────────────────────────────────────────────────────────
  const projects = [
    {
      slug: "meridian-rebrand",
      title: "Meridian Digital Rebrand",
      client: "Meridian Financial",
      problem:
        "Meridian's legacy brand and website projected instability — inconsistent visual language, slow performance, and a UX that undermined trust with high-net-worth clients.",
      solution:
        "We rebuilt the brand from scratch: new identity system, a performance-first Next.js marketing site with Framer Motion animations, and a structured content architecture that made internal updates effortless.",
      result: "43% increase in qualified lead volume within 90 days of launch",
      tags: ["Brand Identity", "Next.js", "Framer Motion"],
      coverImage: "/images/projects/meridian-cover.jpg",
      year: 2024,
      order: 0,
      published: true,
    },
    {
      slug: "nova-saas-launch",
      title: "Nova SaaS Launch",
      client: "Nova Labs",
      problem:
        "Nova had strong product-market fit but no marketing presence. Their first launch window was 6 weeks away with zero brand, zero website.",
      solution:
        "6-week sprint: brand identity, full marketing site, pricing pages, and an onboarding sequence. We ran in parallel across design and engineering to hit the launch date without compromise.",
      result: "£180k in first-month ARR; featured on Product Hunt #2 of the day",
      tags: ["Web Design", "Next.js", "SaaS", "Brand Identity"],
      coverImage: "/images/projects/nova-cover.jpg",
      year: 2024,
      order: 1,
      published: true,
    },
    {
      slug: "bloom-ecommerce",
      title: "Bloom E-Commerce Replatform",
      client: "Bloom Botanicals",
      problem:
        "Bloom's Shopify store was converting at 0.9% — below industry average — and felt disconnected from their premium positioning in the luxury skincare space.",
      solution:
        "Full e-commerce replatform to a custom Next.js + Shopify Storefront API stack. We rebuilt the product pages, cart experience, and checkout flow around conversion data, with photography direction and full brand refresh.",
      result: "Conversion rate lifted from 0.9% to 3.4% — a 278% improvement",
      tags: ["E-Commerce", "Shopify", "Next.js", "CRO"],
      coverImage: "/images/projects/bloom-cover.jpg",
      year: 2023,
      order: 2,
      published: true,
    },
    {
      slug: "atlas-platform",
      title: "Atlas Analytics Platform",
      client: "Atlas Analytics",
      problem:
        "Atlas had a functional product and enterprise clients but no consistent design system, leading to a fragmented UX across 12 dashboard modules.",
      solution:
        "12-week design system project: full component library in Figma and React, dark/light theme tokens, accessibility audit, and a migration guide for the internal engineering team.",
      result:
        "UI build time reduced by 60%; design-to-code handoff time dropped from 3 days to 4 hours",
      tags: ["Design System", "React", "TypeScript", "Accessibility"],
      coverImage: "/images/projects/atlas-cover.jpg",
      year: 2023,
      order: 3,
      published: true,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }
  console.log(`  ✓ ${projects.length} projects`);

  // ── Services ───────────────────────────────────────────────────────────────
  const services = [
    {
      title: "Web Design & Development",
      description:
        "From brand-led landing pages to complex web applications — we design and build performant, accessible digital products using Next.js, React, and modern CSS.",
      icon: "monitor",
      order: 0,
    },
    {
      title: "Brand Identity & Strategy",
      description:
        "We craft visual identities that hold up at every touchpoint. Strategy, naming, logo systems, typography, colour, and full brand guidelines delivered.",
      icon: "layers",
      order: 1,
    },
    {
      title: "Digital Growth & Conversion",
      description:
        "Performance-focused work: CRO audits, A/B testing frameworks, SEO architecture, and analytics instrumentation to turn traffic into pipeline.",
      icon: "trending-up",
      order: 2,
    },
  ];

  await prisma.service.deleteMany();
  await prisma.service.createMany({ data: services });
  console.log(`  ✓ ${services.length} services`);

  // ── Testimonials ───────────────────────────────────────────────────────────
  const testimonials = [
    {
      quote:
        "Functional didn't just build us a website — they rebuilt how we present to the world. The results spoke for themselves within the first month.",
      author: "James Holt",
      role: "CEO",
      company: "Meridian Financial",
      projectSlug: "meridian-rebrand",
      published: true,
      order: 0,
    },
    {
      quote:
        "Six weeks from blank canvas to live product. I've never worked with a team that moves this fast without sacrificing quality.",
      author: "Sarah Chen",
      role: "Founder",
      company: "Nova Labs",
      projectSlug: "nova-saas-launch",
      published: true,
      order: 1,
    },
    {
      quote:
        "The conversion rate jump was almost embarrassing — we should have done this two years ago. Worth every penny.",
      author: "Priya Okafor",
      role: "Head of Growth",
      company: "Bloom Botanicals",
      projectSlug: "bloom-ecommerce",
      published: true,
      order: 2,
    },
  ];

  await prisma.testimonial.deleteMany();
  await prisma.testimonial.createMany({ data: testimonials });
  console.log(`  ✓ ${testimonials.length} testimonials`);

  // ── Stats ──────────────────────────────────────────────────────────────────
  const stats = [
    { value: "42+", label: "Projects Delivered", order: 0 },
    { value: "£4M+", label: "Revenue Driven for Clients", order: 1 },
    { value: "98%", label: "Client Retention Rate", order: 2 },
    { value: "6 Wks", label: "Average Launch Timeline", order: 3 },
  ];

  await prisma.stat.deleteMany();
  await prisma.stat.createMany({ data: stats });
  console.log(`  ✓ ${stats.length} stats`);

  // ── Process steps ──────────────────────────────────────────────────────────
  const processSteps = [
    { num: "01", title: "Discover", description: "We learn your business, goals, and users.", order: 0 },
    { num: "02", title: "Design", description: "We map structure, flow, and visual direction.", order: 1 },
    { num: "03", title: "Build", description: "We ship clean, fast, production-ready code.", order: 2 },
    { num: "04", title: "Launch", description: "We deploy, test, and stay on for support.", order: 3 },
  ];

  await prisma.processStep.deleteMany();
  await prisma.processStep.createMany({ data: processSteps });
  console.log(`  ✓ ${processSteps.length} process steps`);

  console.log("✅ Seed complete.");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
