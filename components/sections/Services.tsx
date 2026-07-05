"use client";

/**
 * Services — three-up card grid
 *
 * Receives `services` from the parent server component (app/page.tsx or
 * app/services/page.tsx) so data comes from the database, not static files.
 * Framer Motion animations remain client-side.
 */

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { Service } from "@/lib/db/services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface Props {
  services: Service[];
}

// ── Icon map — inline SVGs keyed by service.icon string ──────────────────────
const ICONS: Record<string, ReactNode> = {
  monitor: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  layers: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  "trending-up": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

// ── Framer Motion variants ────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: EASE },
  }),
};

const headerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// ── Service card ─────────────────────────────────────────────────────────────
function ServiceCard({ service, index }: { service: Service; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <motion.article
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "group relative bg-background flex flex-col gap-8 p-8 lg:p-12",
        "border-t-2 border-t-transparent",
        // Bottom accent sweep via pseudo-element — expands left to right on hover
        "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
        "after:bg-accent after:transition-[width] after:duration-500 after:ease-out",
        "hover:after:w-full",
        "transition-colors duration-300",
        "hover:border-t-accent"
      )}
      aria-label={service.title}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "font-display font-extrabold leading-none select-none",
            // Number transitions from muted to accent on hover
            "text-muted-lighter group-hover:text-accent",
            "transition-colors duration-400 ease-out"
          )}
          style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
          aria-hidden="true"
        >
          {num}
        </span>
        <span
          className={cn(
            "flex items-center justify-center w-11 h-11 mt-2",
            "text-muted-light group-hover:text-accent",
            // Icon scales up with a slight rotation hint on hover
            "transition-all duration-300",
            "group-hover:scale-110"
          )}
        >
          {ICONS[service.icon] ?? null}
        </span>
      </div>

      {/* Title */}
      <Heading
        level="h3"
        size="h3"
        className="text-foreground-dark group-hover:text-foreground-dark"
      >
        {service.title}
      </Heading>

      {/* Description */}
      <p className="font-body text-sm text-muted-light leading-relaxed flex-1">
        {service.description}
      </p>

      {/* Learn more ghost link */}
      <div>
        <Button
          variant="ghost"
          size="sm"
          href="/services"
          className="text-muted-light group-hover:text-accent focus-visible:ring-offset-background"
        >
          Learn more →
        </Button>
      </div>
    </motion.article>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Services({ services }: Props) {
  if (services.length === 0) return null;

  return (
    <SectionWrapper theme="light" id="services" aria-label="Our services">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
      >
        <div>
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-4">
            What we do
          </p>
          <Heading level="h2" size="h2" className="text-foreground-dark">
            Built for <span className="text-accent">results.</span>
          </Heading>
        </div>
        <p className="font-body text-sm text-muted-light leading-relaxed max-w-sm md:text-right">
          Three disciplines, one integrated team. We embed strategy into every
          deliverable so your investment compounds over time.
        </p>
      </motion.div>

      {/* ── Card grid ──────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-3 gap-px bg-border-light border border-border-light">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* ── Footer link ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-12 flex justify-center"
      >
        <Button
          href="/services"
          variant="secondary"
          size="default"
          className="text-foreground-dark border-foreground-dark hover:border-accent hover:text-accent focus-visible:ring-offset-background"
          id="services-view-all"
        >
          View all services
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
