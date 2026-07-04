"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { testimonials } from "@/lib/data/testimonials";

const LOGO_NAMES = [
  "Meridian Financial",
  "Nova Labs",
  "Bloom Botanicals",
  "Atlas Analytics",
  "Vanguard Capital",
  "Quantum Systems",
  "Apex Dynamics",
  "Horizon Group",
];

const AUTO_ROTATE_MS = 5000;

export default function SocialProof() {
  const [active, setActive] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, []);

  const t = testimonials[active];

  return (
    <SectionWrapper
      theme="dark"
      id="social-proof"
      className="overflow-hidden !py-0"
      noContainer
    >
      {/* ── Pull-quote block ───────────────────────────────────────────────── */}
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-24 md:py-32 xl:py-40">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Decorative lime quotation mark */}
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 0.4, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display font-extrabold text-accent select-none leading-none mb-6"
            style={{ fontSize: "clamp(5rem, 12vw, 10rem)" }}
            aria-hidden="true"
          >
            &ldquo;
          </motion.span>

          {/* Animated testimonial — swaps on dot click / auto-rotate */}
          <div className="relative min-h-[200px] md:min-h-[160px] flex items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.97, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: -12 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="text-center"
              >
                <blockquote>
                  <p className="font-display font-bold leading-[1.12] tracking-tight text-white mb-10"
                    style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)" }}
                  >
                    {t.quote}
                  </p>
                  <cite className="not-italic flex flex-col items-center gap-1.5">
                    <span className="font-display font-semibold text-white text-base md:text-lg tracking-wide">
                      {t.author}
                    </span>
                    <span className="font-body text-sm text-muted-dark">
                      {t.role}, {t.company}
                    </span>
                  </cite>
                </blockquote>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot navigation */}
          <div className="flex items-center gap-3 mt-10" role="tablist" aria-label="Testimonials">
            {testimonials.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === active}
                aria-label={`Testimonial ${i + 1}`}
                onClick={() => setActive(i)}
                className="relative w-2 h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-dark"
              >
                <span className={`block w-full h-full rounded-full transition-all duration-300 ${i === active ? "bg-accent scale-125" : "bg-muted-darker hover:bg-muted-dark"}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Logo marquee strip ─────────────────────────────────────────────── */}
      <div className="border-t border-border-dark pt-12 md:pt-16 pb-14 md:pb-20 relative overflow-hidden">
        {/* Edge fade masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0A0A, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0A0A, transparent)" }} />

        <div className="flex group">
          {/* Set 1 */}
          <div className="flex shrink-0 animate-marquee group-hover:animate-marquee-paused">
            {LOGO_NAMES.map((name, i) => (
              <div
                key={`a-${i}`}
                className="flex items-center justify-center w-[180px] md:w-[220px] h-[72px] md:h-[88px] border border-border-dark mx-3 text-muted-darker font-body text-xs tracking-widest uppercase shrink-0 hover:text-muted-dark hover:border-muted-darker transition-colors duration-300"
              >
                {name}
              </div>
            ))}
          </div>
          {/* Set 2 — duplicate for seamless loop */}
          <div className="flex shrink-0 animate-marquee group-hover:animate-marquee-paused" aria-hidden="true">
            {LOGO_NAMES.map((name, i) => (
              <div
                key={`b-${i}`}
                className="flex items-center justify-center w-[180px] md:w-[220px] h-[72px] md:h-[88px] border border-border-dark mx-3 text-muted-darker font-body text-xs tracking-widest uppercase shrink-0"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
