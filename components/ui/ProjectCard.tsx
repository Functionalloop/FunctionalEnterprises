"use client";

/**
 * ProjectCard — shared card component with two variants.
 *
 * variant="case-study"
 *   Replaces the duplicated inline card in FeaturedWork + work/page.tsx.
 *   Shows: cover image (16:9), year badge, title, client, result quote, tags.
 *   Wraps in a <Link href={href}>.
 *
 * variant="hackathon"
 *   Used in the /functionalx page grid.
 *   Shows: award pill, event+year badge, name, description, team members,
 *          tags, GitHub + Demo icon links.
 *   No cover image — cards are purely content-driven.
 */

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ── Shared animation ──────────────────────────────────────────────────────────
export const CARD_MOTION = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

// ── Shared hover shell ────────────────────────────────────────────────────────
// Same lime-bar, lift, border behaviour for both variants.
function CardShell({
  href,
  children,
  className,
  darkMode = false,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  darkMode?: boolean;
}) {
  const base = cn(
    "group relative h-full flex flex-col transition-all duration-300",
    "hover:-translate-y-[3px]",
    darkMode
      ? "bg-surface-dark border border-border-dark hover:border-accent/40 hover:shadow-[0_8px_32px_rgba(212,255,51,0.08)]"
      : "bg-background border border-border-light shadow-sm hover:shadow-lg hover:border-border-light",
    className
  );

  const accentBar = (
    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
  );

  if (href) {
    return (
      <Link href={href} className={cn("block", base)}>
        {accentBar}
        {children}
      </Link>
    );
  }

  return (
    <div className={base}>
      {accentBar}
      {children}
    </div>
  );
}

// ── External link icon ────────────────────────────────────────────────────────
function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

// ── GitHub icon ───────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

// ── Case Study variant ────────────────────────────────────────────────────────
export interface CaseStudyCardProps {
  variant: "case-study";
  title: string;
  client: string;
  result: string;
  tags: string;
  coverImage: string;
  year: number;
  href: string;
  index?: number;
  sizes?: string;
}

function CaseStudyCard({
  title,
  client,
  result,
  tags,
  coverImage,
  year,
  href,
  index = 0,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: Omit<CaseStudyCardProps, "variant">) {
  return (
    <motion.div
      {...CARD_MOTION}
      transition={{ duration: 0.55, delay: index * 0.1, ease: "easeOut" }}
      className="h-full"
    >
      <CardShell href={href}>
        {/* Cover image — 16:9 */}
        <div className="relative aspect-video w-full overflow-hidden bg-surface-light">
          <Image
            src={coverImage}
            alt={`${title} — ${client}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes={sizes}
          />
          {/* Year badge */}
          <span className="absolute top-4 right-4 bg-foreground-dark/80 backdrop-blur-sm text-muted-dark font-body text-[10px] tracking-widest uppercase px-2.5 py-1">
            {year}
          </span>
        </div>

        {/* Card body */}
        <div className="p-6 md:p-8 flex flex-col flex-grow">
          <div className="mb-5">
            <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground-dark mb-1 group-hover:text-accent transition-colors duration-200">
              {title}
            </h3>
            <p className="font-body text-sm text-muted-light">{client}</p>
          </div>

          {/* Result stat */}
          <p className="font-body text-sm text-muted-light leading-relaxed border-l-2 border-accent/40 pl-3 mb-5 group-hover:border-accent transition-colors duration-300">
            {result}
          </p>

          {/* Tags */}
          <div className="mt-auto">
            <p className="font-body text-[11px] text-muted-lighter uppercase tracking-widest">
              {tags
                .split(",")
                .map((t) => t.trim())
                .join(" · ")}
            </p>
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

// ── Hackathon variant ─────────────────────────────────────────────────────────
export interface HackathonCardProps {
  variant: "hackathon";
  name: string;
  description: string;
  tags: string;
  award?: string | null;
  event?: string | null;
  year: number;
  teamMembers?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  index?: number;
}

function HackathonCard({
  name,
  description,
  tags,
  award,
  event,
  year,
  teamMembers,
  githubUrl,
  demoUrl,
  index = 0,
}: Omit<HackathonCardProps, "variant">) {
  const tagList = tags.split(",").map((t) => t.trim());
  const members = teamMembers
    ? teamMembers.split(",").map((m) => m.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      {...CARD_MOTION}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
      className="h-full"
    >
      <CardShell darkMode>
        <div className="p-6 flex flex-col flex-grow gap-4">
          {/* Top row — award pill + event/year badge */}
          <div className="flex items-start justify-between gap-2 flex-wrap">
            {award ? (
              <span className="inline-flex items-center gap-1.5 bg-accent/10 text-accent border border-accent/20 font-body text-[10px] tracking-[0.18em] uppercase px-2.5 py-1">
                <span aria-hidden="true">★</span>
                {award}
              </span>
            ) : (
              <span />
            )}
            {(event || year) && (
              <span className="font-body text-[10px] text-muted-darker tracking-widest uppercase">
                {event ? `${event} · ` : ""}{year}
              </span>
            )}
          </div>

          {/* Name */}
          <h3 className="font-display font-bold text-lg md:text-xl tracking-tight text-white group-hover:text-accent transition-colors duration-200 leading-snug">
            {name}
          </h3>

          {/* Description */}
          <p className="font-body text-sm text-muted-darker leading-relaxed border-l-2 border-accent/30 pl-3 group-hover:border-accent transition-colors duration-300">
            {description}
          </p>

          {/* Team members */}
          {members.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {members.map((m) => (
                <span
                  key={m}
                  className="font-body text-[10px] text-muted-darker bg-border-dark/60 px-2 py-0.5 tracking-wide"
                >
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* Tags + links row */}
          <div className="mt-auto flex items-end justify-between gap-3 flex-wrap">
            <p className="font-body text-[10px] text-muted-darker uppercase tracking-widest">
              {tagList.join(" · ")}
            </p>

            {(githubUrl || demoUrl) && (
              <div className="flex items-center gap-3">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-[11px] text-muted-darker hover:text-accent transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GitHubIcon />
                    Code
                  </a>
                )}
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-body text-[11px] text-muted-darker hover:text-accent transition-colors duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLinkIcon />
                    Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </CardShell>
    </motion.div>
  );
}

// ── Unified export ────────────────────────────────────────────────────────────
export type ProjectCardProps = CaseStudyCardProps | HackathonCardProps;

export default function ProjectCard(props: ProjectCardProps) {
  if (props.variant === "hackathon") {
    const { variant: _v, ...rest } = props;
    return <HackathonCard {...rest} />;
  }
  const { variant: _v, ...rest } = props;
  return <CaseStudyCard {...rest} />;
}
