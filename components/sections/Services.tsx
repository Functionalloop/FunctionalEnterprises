"use client";

/**
 * Services — three-up card grid
 *
 * Layout: light background (contrast after dark hero), section eyebrow,
 * large heading, then a 3-column card grid. Each card reveals on scroll
 * with a staggered fade+slide-up using whileInView (viewport-triggered,
 * not scrubbed — this section lives below the hero's scrub zone).
 *
 * Cards use the gap-px / bg-border-light technique to render crisp 1px
 * dividers between columns without pseudo-elements or box-shadows.
 */

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { services, type Service } from "@/lib/data/services";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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
function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
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
        "border-t-2 border-t-transparent", // placeholder — overridden by hover
        "transition-colors duration-300",
        // Lime top accent appears on hover
        "hover:border-t-accent"
      )}
      aria-label={service.title}
    >
      {/* Number + icon row */}
      <div className="flex items-start justify-between">
        {/* Decorative index number — agency editorial touch */}
        <span
          className="font-display font-extrabold text-muted-lighter leading-none select-none"
          style={{ fontSize: "clamp(3rem, 5vw, 5rem)" }}
          aria-hidden="true"
        >
          {num}
        </span>

        {/* Icon — lime-tinted on hover */}
        <span
          className={cn(
            "flex items-center justify-center w-11 h-11 mt-2",
            "text-muted-light group-hover:text-accent",
            "transition-colors duration-300"
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
export default function Services() {
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
          {/* Eyebrow */}
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-4">
            What we do
          </p>

          {/* Section headline */}
          <Heading level="h2" size="h2" className="text-foreground-dark">
            Built for{" "}
            <span className="text-accent">results.</span>
          </Heading>
        </div>

        {/* Deck copy — right-aligned on desktop */}
        <p className="font-body text-sm text-muted-light leading-relaxed max-w-sm md:text-right">
          Three disciplines, one integrated team. We embed strategy into every
          deliverable so your investment compounds over time.
        </p>
      </motion.div>

      {/* ── Card grid ──────────────────────────────────────────────────── */}
      {/*
        gap-px + bg-border-light: the container becomes the "gap colour."
        Each card has bg-background, so the 1px gaps between them render as
        the container's border-light colour. Clean dividers, zero box-shadow.
      */}
      <div className="grid md:grid-cols-3 gap-px bg-border-light border border-border-light">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
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
