"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import type { Project } from "@/lib/db/projects";

interface Props {
  projects: Project[];
}

export default function FeaturedWork({ projects }: Props) {
  const featuredProjects = projects.slice(0, 4);

  if (featuredProjects.length === 0) return null;

  return (
    <SectionWrapper theme="light" id="work">
      {/* Header */}
      <div className="mb-12 md:mb-16 flex flex-col items-start gap-3">
        <span className="font-body text-accent text-xs tracking-[0.28em] uppercase">
          Our Portfolio
        </span>
        <Heading level="h2" size="h2">
          Selected Work
        </Heading>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {featuredProjects.map((project, index) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
            className="h-full"
          >
            <Link
              href={`/work/${project.slug}`}
              className="group relative block h-full flex flex-col bg-background border border-border-light shadow-sm transition-all duration-300 hover:-translate-y-[3px] hover:shadow-lg hover:border-border-light"
            >
              {/* Lime left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

              {/* Cover image — 16:9 */}
              <div className="relative aspect-video w-full overflow-hidden bg-surface-light">
                <Image
                  src={project.coverImage}
                  alt={`${project.title} — ${project.client}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Year badge */}
                <span className="absolute top-4 right-4 bg-foreground-dark/80 backdrop-blur-sm text-muted-dark font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
                  {project.year}
                </span>
              </div>

              {/* Card body */}
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <div className="mb-5">
                  <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground-dark mb-1 group-hover:text-accent transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="font-body text-sm text-muted-light">
                    {project.client}
                  </p>
                </div>

                {/* Result stat */}
                <p className="font-body text-sm text-muted-light leading-relaxed border-l-2 border-accent/40 pl-3 mb-5 group-hover:border-accent transition-colors duration-300">
                  {project.result}
                </p>

                {/* Tags */}
                <div className="mt-auto">
                  <p className="font-body text-[11px] text-muted-lighter uppercase tracking-widest">
                    {project.tags.split(",").map(t => t.trim()).join(" · ")}
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View all CTA */}
      <div className="mt-16 flex justify-center">
        <Button variant="ghost" href="/work">
          View all work →
        </Button>
      </div>
    </SectionWrapper>
  );
}
