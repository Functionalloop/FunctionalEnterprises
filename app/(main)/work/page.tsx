import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/db/projects";

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
              {projects.map((project) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  className="group relative block flex flex-col bg-background border border-border-light shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  <div className="relative aspect-video w-full overflow-hidden bg-surface-light">
                    <Image
                      src={project.coverImage}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <span className="absolute top-4 right-4 bg-foreground-dark/80 backdrop-blur-sm text-muted-dark font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
                      {project.year}
                    </span>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col flex-grow">
                    <h2 className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground-dark mb-1 group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h2>
                    <p className="font-body text-sm text-muted-light mb-5">
                      {project.client}
                    </p>
                    <p className="font-body text-sm text-muted-light leading-relaxed border-l-2 border-accent/40 pl-3 mb-5 group-hover:border-accent transition-colors duration-300">
                      {project.result}
                    </p>
                    <div className="mt-auto">
                      <p className="font-body text-[11px] text-muted-lighter uppercase tracking-widest">
                        {project.tags.split(",").map(t => t.trim()).join(" · ")}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
