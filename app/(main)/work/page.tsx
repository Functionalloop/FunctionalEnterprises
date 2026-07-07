import type { Metadata } from "next";
import { getProjects } from "@/lib/db/projects";
import ProjectCard from "@/components/ui/ProjectCard";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Browse all case studies from Functional Enterprises — web design, brand identity, e-commerce, and SaaS product launches.",
};

export const dynamic = "force-dynamic";

export default async function WorkPage() {
  const projects = await getProjects(true);

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border-dark">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            Case Studies
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            Our Work
          </h1>
        </div>
      </section>

      {/* ── Project grid ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {projects.length === 0 ? (
            <p className="font-body text-muted-light text-sm text-center py-20">
              No case studies published yet — check back soon.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.slug}
                  variant="case-study"
                  title={project.title}
                  client={project.client}
                  result={project.result}
                  tags={project.tags}
                  coverImage={project.coverImage}
                  year={project.year}
                  href={`/work/${project.slug}`}
                  index={index}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
