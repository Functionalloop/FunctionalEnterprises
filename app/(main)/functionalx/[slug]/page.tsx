import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getHackathonProject, getHackathonProjects } from "@/lib/db/hackathon-projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  try {
    const projects = await getHackathonProjects(true);
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getHackathonProject(slug);
  if (!project) return {};
  return {
    title: `${project.name} — FunctionalX`,
    description: project.description.slice(0, 150),
  };
}

// ── External link icon ────────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
  );
}

// ── GitHub icon ───────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
  );
}

export default async function HackathonProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getHackathonProject(slug);

  if (!project || !project.published) notFound();

  const members = project.teamMembers
    ? project.teamMembers.split(",").map((m) => m.trim()).filter(Boolean)
    : [];

  return (
    <main className="bg-foreground-dark min-h-screen pb-20">
      <section className="relative pt-36 pb-16 md:pt-44 border-b border-border-dark overflow-hidden">
        {/* Lime atmospheric glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(212,255,51,0.06) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[900px] mx-auto px-5 sm:px-6 md:px-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 font-body text-xs text-muted-darker tracking-wide">
            <Link href="/functionalx" className="hover:text-accent transition-colors">
              FunctionalX
            </Link>
            <span aria-hidden="true">→</span>
            <span className="text-white">{project.name}</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            {project.award && (
              <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/20 font-body text-xs tracking-[0.18em] uppercase px-3 py-1.5">
                <span aria-hidden="true">★</span>
                {project.award}
              </span>
            )}
            {(project.event || project.year) && (
              <span className="font-body text-[10px] text-muted-darker tracking-widest uppercase">
                {project.event ? `${project.event} · ` : ""}{project.year}
              </span>
            )}
          </div>

          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            {project.name}
          </h1>

          <div className="flex flex-wrap gap-2 mb-10">
            {project.tags.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="font-body text-[10px] tracking-widest uppercase text-muted-darker border border-border-dark px-3 py-1.5 bg-surface-dark"
              >
                {tag.trim()}
              </span>
            ))}
          </div>

          {(project.githubUrl || project.demoUrl) && (
            <div className="flex items-center gap-6 pb-6 border-b border-border-dark">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-white hover:text-accent transition-colors duration-200"
                >
                  <GitHubIcon />
                  View Source Code
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-white hover:text-accent transition-colors duration-200"
                >
                  <ExternalLinkIcon />
                  Live Demo
                </a>
              )}
            </div>
          )}
        </div>

        {project.coverImage && (
          <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden mt-16 max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 border-t border-border-dark">
            <Image
              src={project.coverImage}
              alt={project.name}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}
      </section>

      <section className="py-16 md:py-20">
        <div className="max-w-[900px] mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12 md:gap-16 items-start">
            
            {/* Main content */}
            <div className="flex flex-col gap-10">
              <div>
                <p className="inline-block font-body text-accent text-[10px] tracking-[0.28em] uppercase mb-5 bg-surface-dark px-3 py-1.5 border border-border-dark">
                  About Project
                </p>
                <div className="font-body text-muted-darker text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              </div>
            </div>

            {/* Sidebar / Team members */}
            {members.length > 0 && (
              <aside className="border border-border-dark p-6 bg-surface-dark">
                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-dark mb-5">
                  Team Members
                </p>
                <ul className="flex flex-col gap-3">
                  {members.map((m) => (
                    <li key={m} className="flex items-center gap-3 font-body text-sm text-muted-darker">
                      <span className="w-1.5 h-1.5 bg-border-dark rounded-full shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </aside>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
