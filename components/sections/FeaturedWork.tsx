"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
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
        <span className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase bg-foreground-dark px-3 py-1.5 rounded-sm">
          Our Portfolio
        </span>
        <Heading level="h2" size="h2">
          Selected Work
        </Heading>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {featuredProjects.map((project, index) => (
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
          />
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
