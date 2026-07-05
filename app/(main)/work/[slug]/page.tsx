import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProject, getProjects } from "@/lib/db/projects";
import Button from "@/components/ui/Button";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  // Best-effort: pre-generate paths at build time.
  // If the DB is unreachable during build, return [] and let
  // dynamic rendering handle all paths at request time.
  try {
    const projects = await getProjects(true);
    return projects.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.problem,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;

  // Fetch the requested project + all others in parallel
  const [project, allProjects] = await Promise.all([
    getProject(slug),
    getProjects(true),
  ]);

  if (!project || !project.published) notFound();

  const otherProjects = allProjects
    .filter((p) => p.slug !== slug)
    .slice(0, 2);

  return (
    <main className="bg-background">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-36 pb-0 md:pt-44">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 md:pb-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-10 font-body text-xs text-muted-darker tracking-wide">
            <Link href="/work" className="hover:text-muted-dark transition-colors">
              Work
            </Link>
            <span aria-hidden="true">→</span>
            <span className="text-muted-dark">{project.title}</span>
          </div>

          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-5">
            {project.client} · {project.year}
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97] mb-8"
            style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
          >
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-12">
            {project.tags.split(",").map((tag) => (
              <span
                key={tag.trim()}
                className="font-body text-[10px] tracking-widest uppercase text-muted-dark border border-border-dark px-3 py-1.5"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>

        {/* Full-bleed cover image */}
        <div className="relative aspect-video md:aspect-[21/9] w-full overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── Case study body ────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">

            {/* Main content */}
            <div className="flex flex-col gap-14">
              {/* Problem */}
              <div>
                <p className="font-body text-accent text-[10px] tracking-[0.28em] uppercase mb-4">
                  The Challenge
                </p>
                <p className="font-body text-muted-light text-base md:text-lg leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Solution */}
              <div>
                <p className="font-body text-accent text-[10px] tracking-[0.28em] uppercase mb-4">
                  Our Solution
                </p>
                <p className="font-body text-muted-light text-base md:text-lg leading-relaxed">
                  {project.solution}
                </p>
              </div>
            </div>

            {/* Result stat sidebar */}
            <aside className="flex flex-col gap-8">
              <div className="border border-border-light p-8 md:p-10">
                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-lighter mb-6">
                  The Result
                </p>
                <p className="font-display font-bold text-foreground-dark text-xl md:text-2xl leading-snug tracking-tight border-l-4 border-accent pl-5">
                  {project.result}
                </p>
              </div>

              <div className="border border-border-light p-8">
                <p className="font-body text-[10px] tracking-[0.22em] uppercase text-muted-lighter mb-6">
                  Services Used
                </p>
                <ul className="flex flex-col gap-3">
                  {project.tags.split(",").map((tag) => (
                    <li key={tag.trim()} className="flex items-center gap-3 font-body text-sm text-muted-light">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full shrink-0" />
                      {tag.trim()}
                    </li>
                  ))}
                </ul>
              </div>

              <Button href="/contact" variant="primary" size="lg" className="w-full justify-center">
                Start a similar project →
              </Button>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More projects ──────────────────────────────────────────────────── */}
      {otherProjects.length > 0 && (
        <section className="bg-surface-light border-t border-border-light py-20 md:py-24">
          <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
            <p className="font-body text-[10px] tracking-[0.28em] uppercase text-muted-light mb-12">
              More Work
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group block border border-border-light hover:border-accent transition-colors duration-300 bg-background"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface-light">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-bold text-lg tracking-tight text-foreground-dark group-hover:text-accent transition-colors duration-200 mb-1">
                      {p.title}
                    </h3>
                    <p className="font-body text-sm text-muted-light">{p.client}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
