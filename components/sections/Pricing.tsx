"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import { useBooking } from "@/lib/context/BookingContext";
import type { BookingPlan } from "@/lib/context/BookingContext";

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
const tiers: (BookingPlan & {
  features: string[];
  highlight: boolean;
  featured: boolean;
})[] = [
  {
    name: "Basic",
    price: "8,000",
    tag: "Starter",
    features: [
      "A static page",
      "A single page website",
      "Delivery in 1 week",
      "1 revision round",
    ],
    highlight: false,
    featured: false,
  },
  {
    name: "Essential",
    price: "20,000",
    tag: "Popular",
    features: [
      "A dynamic website",
      "Multipages",
      "Delivery in 2-3 weeks",
      "2 revision rounds",
    ],
    highlight: false,
    featured: true,
  },
  {
    name: "Premium",
    price: "35,000",
    tag: "Advanced",
    prefix: "Starting from",
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
function PricingCard({
  tier,
  index,
  onBook,
}: {
  tier: (typeof tiers)[number];
  index: number;
  onBook: (plan: BookingPlan) => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      className={cn(
        "group relative flex flex-col transition-all duration-300",
        tier.featured
          ? "z-10 bg-background text-foreground-dark ring-2 ring-accent md:scale-[1.02] shadow-2xl"
          : tier.highlight
          ? "bg-foreground-dark text-white border-t-2 border-t-border-dark"
          : "bg-background text-foreground-dark border-t-2 border-t-border-light hover:border-t-accent"
      )}
    >
      {/* Tag badge */}
      <div
        className={cn(
          "absolute top-0 right-0 font-display text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-1.5",
          tier.featured
            ? "bg-accent text-foreground-dark"
            : tier.highlight
            ? "bg-white text-foreground-dark"
            : "bg-foreground-dark text-white"
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
                tier.highlight ? "text-muted-dark" : "text-muted-darker"
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
            <span className="font-display text-2xl font-medium leading-none mt-1">₹</span>
            <span
              className="font-display font-extrabold leading-none"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              {tier.price}
            </span>
          </div>
        </div>

        {/* CTA — opens booking drawer */}
        <button
          onClick={() =>
            onBook({
              name: tier.name,
              price: tier.price,
              tag: tier.tag,
              prefix: tier.prefix,
            })
          }
          id={`pricing-cta-${tier.name.toLowerCase().replace(/\s+/g, "-")}`}
          className={cn(
            "w-full inline-flex items-center justify-center gap-2",
            "font-display font-semibold tracking-widest uppercase text-xs",
            "px-6 py-3 rounded-none cursor-pointer select-none",
            "transition-all duration-200 ease-out",
            "hover:scale-[1.02] active:scale-[0.98]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            tier.featured
              ? "bg-accent text-foreground-dark border border-accent hover:bg-transparent hover:text-accent"
              : tier.highlight
              ? "bg-white text-foreground-dark border border-white hover:bg-transparent hover:text-white"
              : "bg-transparent border border-current hover:border-accent hover:text-accent"
          )}
        >
          Get started →
        </button>

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
                  "mt-1 shrink-0",
                  tier.featured ? "text-accent" : tier.highlight ? "text-white" : "text-muted-darker"
                )}
              >
                <CheckIcon />
              </span>
              <span
                className={cn(
                  "font-body text-sm leading-snug",
                  tier.highlight ? "text-muted-dark" : "text-foreground-dark"
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
  const { openDrawer } = useBooking();

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
      <div className="border border-border-dark divide-y divide-border-dark md:divide-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 lg:divide-x lg:divide-border-dark">
        {tiers.map((tier, i) => (
          <PricingCard key={tier.name} tier={tier} index={i} onBook={openDrawer} />
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
        All prices are in Indian Rupees (₹). Maintenance &amp; hosting plans available separately.
      </motion.p>
    </SectionWrapper>
  );
}
