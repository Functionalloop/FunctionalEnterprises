"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import type { ProcessStep } from "@/lib/db/content";

interface Props {
  steps: ProcessStep[];
}

export default function Process({ steps }: Props) {
  if (steps.length === 0) return null;

  return (
    <SectionWrapper theme="light" id="process">
      {/* Header */}
      <div className="mb-16 md:mb-24">
        <p className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase mb-4 bg-foreground-dark px-3 py-1.5 rounded-sm">
          Our Approach
        </p>
        <Heading level="h2" size="h2" className="text-left">
          How we work
        </Heading>
      </div>

      {/* Steps — relative wrapper so we can absolutely position the connector line */}
      <div className="relative grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 lg:gap-12">
        {/* Desktop connecting line — runs the full width behind all dots */}
        <div
          className="hidden md:block absolute top-[calc(theme(spacing.16)+theme(spacing.6)+6px)] left-0 right-0 h-px bg-accent/20"
          aria-hidden="true"
        />

        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            className="relative flex flex-col items-start"
          >
            {/* Large muted step number */}
            <div className="font-display font-extrabold text-7xl md:text-8xl text-foreground-dark/[0.18] leading-none select-none mb-4 md:mb-6 [-webkit-text-stroke:1px_rgba(10,10,10,0.15)]">
              {step.num}
            </div>

            {/* Lime dot — sits on top of the connecting line */}
            <div className="relative flex items-center mb-6 h-3">
              <div className="w-3 h-3 bg-accent rounded-full relative z-10 shadow-[0_0_12px_rgba(200,255,0,0.6)]" />
            </div>

            <h3 className="font-display font-bold text-2xl tracking-tight text-foreground-dark mb-3">
              {step.title}
            </h3>

            <p className="font-body text-sm text-muted-light leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Closing CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
        className="mt-16 md:mt-20 flex justify-center"
      >
        <Button
          variant="secondary"
          size="lg"
          href="/contact"
          className="text-foreground-dark border-foreground-dark hover:border-accent hover:text-accent"
        >
          Start your project →
        </Button>
      </motion.div>
    </SectionWrapper>
  );
}
