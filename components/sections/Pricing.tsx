"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

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

// ── Icons ────────────────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const tiers = [
  {
    name: "Basic",
    price: "8,000",
    tag: "Starter",
    features: ["A static page", "A single page website"],
    highlight: false,
    featured: false,
  },
  {
    name: "Essential",
    price: "20,000",
    tag: "Popular",
    features: ["A dynamic website", "Multipages"],
    highlight: false,
    featured: true,
  },
  {
    name: "Premium",
    price: "35,000",
    tag: "Advanced",
    features: [
      "Dynamic, multipage, eCommerce-ready website",
      "Online Booking, reservations, orders",
      "More pages / more complex",
    ],
    highlight: false,
    featured: false,
  },
  {
    name: "Bespoke eCommerce",
    price: "75,000+",
    tag: "Enterprise",
    prefix: "Starting from",
    features: [
      "A fully bespoke eCommerce website",
      "Multiple categories, product variants, more products",
      "Fully Customised solution",
    ],
    highlight: true,
    featured: false,
  },
];

// ── Pricing Card ──────────────────────────────────────────────────────────────
function PricingCard({ tier, index }: { tier: (typeof tiers)[number]; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(
        "group relative flex flex-col",
        "border-t-2 transition-colors duration-300",
        tier.highlight
          ? "bg-foreground-dark border-t-accent"
          : tier.featured
          ? "bg-surface-light border-t-accent"
          : "bg-background border-t-border-light hover:border-t-accent"
      )}
    >
      {/* Tag badge */}
      <div
        className={cn(
          "absolute top-0 right-0 font-display text-[9px] tracking-[0.2em] uppercase px-3 py-1",
          tier.highlight
            ? "bg-accent text-foreground-dark"
            : tier.featured
            ? "bg-foreground-dark text-accent"
            : "bg-border-light text-muted-light"
        )}
      >
        {tier.tag}
      </div>

      <div className="flex flex-col flex-1 p-8 lg:p-10 gap-8">
        {/* Title */}
        <h3
          className={cn(
            "font-display font-semibold text-xl tracking-tight",
            tier.highlight ? "text-white" : "text-foreground-dark"
          )}
        >
          {tier.name}
        </h3>

        {/* Price */}
        <div>
          {tier.prefix && (
            <p
              className={cn(
                "font-body text-[10px] tracking-[0.2em] uppercase mb-2",
                tier.highlight ? "text-muted-dark" : "text-muted-light"
              )}
            >
              {tier.prefix}
            </p>
          )}
          <div
            className={cn(
              "flex items-start gap-1",
              tier.highlight ? "text-white" : "text-foreground-dark"
            )}
          >
            <span className="font-display text-xl font-medium leading-none mt-1">₹</span>
            <span
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {tier.price}
            </span>
          </div>
        </div>

        {/* CTA */}
        <Button
          href="/contact"
          variant={tier.highlight ? "primary" : "secondary"}
          size="default"
          className={cn(
            "w-full",
            !tier.highlight &&
              tier.featured &&
              "bg-foreground-dark text-white border-foreground-dark hover:bg-transparent hover:text-foreground-dark"
          )}
          id={`pricing-cta-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          Get started →
        </Button>

        {/* Divider */}
        <div
          className={cn(
            "h-px w-full",
            tier.highlight ? "bg-border-dark" : "bg-border-light"
          )}
        />

        {/* Features */}
        <ul className="flex flex-col gap-3">
          {tier.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 shrink-0",
                  tier.highlight ? "text-accent" : "text-accent"
                )}
              >
                <CheckIcon />
              </span>
              <span
                className={cn(
                  "font-body text-sm leading-snug",
                  tier.highlight ? "text-muted-dark" : "text-muted-light"
                )}
              >
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Pricing() {
  return (
    <SectionWrapper theme="dark" id="pricing" aria-label="Pricing plans">
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
            Pricing
          </p>
          <Heading level="h2" size="h2" className="text-white">
            Clear, upfront <span className="text-accent">pricing.</span>
          </Heading>
        </div>
        <p className="font-body text-sm text-muted-dark leading-relaxed max-w-sm md:text-right">
          Transparent packages with no hidden fees. Pick the plan that fits your
          vision — we&apos;ll build something remarkable.
        </p>
      </motion.div>

      {/* ── Grid ────────────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border-dark border border-border-dark">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} />
        ))}
      </div>

      {/* ── Footer note ─────────────────────────────────────────────────── */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-8 text-center font-body text-xs text-muted-darker"
      >
        All prices are in Indian Rupees (₹). Maintenance & hosting plans available separately.
      </motion.p>
    </SectionWrapper>
  );
}
