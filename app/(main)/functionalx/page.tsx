import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getHackathonProjects } from "@/lib/db/hackathon-projects";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "FunctionalX — Hackathon Team",
  description:
    "FunctionalX is the hackathon division of Functional Enterprises — a tight-knit team building fast, creative projects at hackathons across India.",
};

export const dynamic = "force-dynamic";

// ── Stat chips data ───────────────────────────────────────────────────────────
const TEAM_STATS = [
  { value: "6+", label: "Hackathons" },
  { value: "5+", label: "Projects Built" },
  { value: "FX", label: "Team Name" },
];

// ── Social links ──────────────────────────────────────────────────────────────
const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export default async function FunctionalXPage() {
  const projects = await getHackathonProjects(true);

  const placedCount = projects.filter((p) => p.placement !== null).length;

  return (
    <main className="bg-foreground-dark min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-40 pb-24 md:pt-52 md:pb-32 overflow-hidden border-b border-border-dark">
        {/* Lime atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,255,51,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col items-center text-center gap-8">

            {/* FX logo emblem */}
            <div
              className="relative w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
              style={{
                filter: "drop-shadow(0 0 32px rgba(212,255,51,0.25))",
              }}
            >
              <Image
                src="/fx-logo.png"
                alt="FunctionalX logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 160px"
                priority
              />
            </div>

            {/* Eyebrow */}
            <p className="font-body text-accent text-xs tracking-[0.28em] uppercase">
              Hackathon Division · Functional Enterprises
            </p>

            {/* Headline */}
            <h1
              className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
              style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
            >
              Functional
              <span className="text-accent">X</span>
            </h1>

            {/* Tagline */}
            <p className="font-body text-muted-dark text-sm md:text-base max-w-lg leading-relaxed">
              Building at the speed of ideas — a tight-knit team shipping
              ambitious projects at hackathons across India.
            </p>

            {/* Stat chips */}
            <div className="flex flex-wrap items-center justify-center gap-px bg-border-dark border border-border-dark mt-2">
              {[
                { value: `${projects.length}`, label: "Projects Built" },
                { value: "6+", label: "Hackathons" },
                { value: `${placedCount}`, label: "Placements Won" },
              ].map(({ value, label }) => (
                <div
                  key={label}
                  className="bg-foreground-dark px-8 py-5 text-center"
                >
                  <p
                    className="font-display font-extrabold text-accent leading-none mb-1"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                  >
                    {value}
                  </p>
                  <p className="font-body text-[10px] text-muted-darker tracking-widest uppercase">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What is a Hackathon? ──────────────────────────────────────────── */}
      <section className="border-t border-border-dark">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-14 md:py-16">
          <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-16 items-start">

            {/* Left label */}
            <div>
              <span className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase mb-3">
                For context
              </span>
              <h2 className="font-display font-bold text-white text-xl md:text-2xl tracking-tight leading-snug">
                What is a<br />Hackathon?
              </h2>
            </div>

            {/* Right explanation */}
            <div className="flex flex-col gap-5">
              <p className="font-body text-muted-dark text-sm md:text-base leading-relaxed">
                A <span className="text-white font-semibold">hackathon</span> is an intensive, time-boxed
                competition — typically 24 to 48 hours — where teams of developers, designers, and
                problem-solvers build a working product from scratch and pitch it to a panel of judges.
              </p>
              <p className="font-body text-muted-darker text-sm leading-relaxed">
                The format rewards speed, creativity, and execution under pressure. Teams scope an idea,
                prototype it, and present a live demo — all within the sprint window. The best submissions
                solve a real problem in a way that&#39;s both technically sound and clearly explained.
              </p>
              <p className="font-body text-muted-darker text-sm leading-relaxed">
                For us, hackathons are a proving ground — a place where we sharpen our instincts for
                building fast, deciding quickly, and shipping something that actually works. The projects
                below are the results of those sprints.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── Projects grid ────────────────────────────────────────────────── */}

      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">

          {/* Section label */}
          <div className="mb-12 md:mb-16 flex flex-col items-start gap-3">
            <span className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase bg-surface-dark px-3 py-1.5">
              What we built
            </span>
            <h2
              className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
              style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
            >
              Hackathon Projects
            </h2>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 border border-border-dark">
              <p className="font-body text-muted-darker text-sm">
                Projects coming soon — add them from the admin panel.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  variant="hackathon"
                  name={project.name}
                  description={project.description}
                  tags={project.tags}
                  award={project.award}
                  event={project.event}
                  year={project.year}
                  teamMembers={project.teamMembers}
                  githubUrl={project.githubUrl}
                  demoUrl={project.demoUrl}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Social / footer strip ────────────────────────────────────────── */}
      <section className="border-t border-border-dark py-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">

            {/* Left: FX identity */}
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image src="/fx-logo.png" alt="" fill className="object-contain" aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-bold text-white text-sm tracking-wide">
                  FunctionalX
                </p>
                <p className="font-body text-muted-darker text-[10px] tracking-widest uppercase">
                  Hackathon Division
                </p>
              </div>
            </div>

            {/* Center: social links */}
            <div className="flex items-center gap-6">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-xs text-muted-darker hover:text-accent transition-colors duration-200 tracking-wide"
                >
                  {icon}
                  {label}
                </a>
              ))}
            </div>

            {/* Right: back to agency */}
            <Link
              href="/"
              className="font-body text-xs text-muted-darker hover:text-accent transition-colors duration-200 tracking-wide"
            >
              ← Back to Functional Enterprises
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
