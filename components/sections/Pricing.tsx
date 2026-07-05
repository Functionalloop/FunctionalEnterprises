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
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

// ── Data ─────────────────────────────────────────────────────────────────────
const tiers = [
  {
    name: "Basic",
    price: "20,000",
    features: ["A static page", "A single page website"],
  },
  {
    name: "Essential",
    price: "30,000",
    features: ["A dynamic website", "Multipages"],
  },
  {
    name: "Premium",
    price: "40,000",
    features: [
      "A dynamic, multipage, transactional, eCommerce ready website (simple/limited number of products)",
      "Online Booking, reservations, orders",
      "More pages / more complex",
    ],
  },
  {
    name: "Bespoke eCommerce",
    price: "60,000",
    prefix: "Starting from",
    features: [
      "A bespoke eCommerce website",
      "Multiple categories, product variants, more products",
      "Fully Customised",
    ],
    highlight: true,
  },
];

export default function Pricing() {
  return (
    <SectionWrapper theme="light" id="pricing" aria-label="Pricing plans">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <motion.div
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mb-16 md:mb-20 text-center flex flex-col items-center"
      >
        <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-4">
          Pricing
        </p>
        <Heading level="h2" size="h2" className="text-foreground-dark">
          Clear, upfront <span className="text-accent">pricing.</span>
        </Heading>
        <p className="font-body text-sm text-muted-light leading-relaxed max-w-xl mt-6">
          Find the perfect package to accelerate your digital growth. No hidden fees.
        </p>
      </motion.div>

      {/* ── Pricing Grid ──────────────────────────────────────────────────── */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch max-w-7xl mx-auto">
        {tiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className={cn(
              "flex flex-col p-8 rounded-xl",
              tier.highlight
                ? "bg-gradient-to-b from-[#e0f7fa] to-[#e1bee7]/50 shadow-lg border border-transparent"
                : "bg-[#f8f9fa] shadow-sm border border-transparent"
            )}
          >
            <h3 className={cn("text-center font-display font-medium text-2xl mb-8", tier.highlight ? "text-foreground-dark" : "text-foreground-dark")}>
              {tier.name}
            </h3>
            
            <div className="text-center mb-8 flex-1">
              {tier.prefix && (
                <p className="font-body text-xs text-muted-dark mb-2 font-medium">{tier.prefix}</p>
              )}
              <div className="flex items-start justify-center gap-1 text-foreground-dark">
                <span className="font-display text-2xl font-semibold leading-tight mt-1">₹</span>
                <span className="font-display text-4xl font-bold">{tier.price}</span>
              </div>
            </div>

            <Button
              href="/contact"
              variant={tier.highlight ? "primary" : "secondary"}
              className={cn(
                "w-full mb-10 rounded-full", // The image has rounded full buttons
                !tier.highlight && "bg-[#d96c14] hover:bg-[#b55810] text-white border-transparent hover:border-transparent",
                tier.highlight && "bg-[#1c1c1c] hover:bg-black text-white border-transparent hover:border-transparent"
              )}
            >
              Buy Now
            </Button>

            <ul className="flex flex-col gap-4 text-sm font-body text-muted-darker">
              {tier.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="mt-0.5 text-black bg-white rounded-full p-[2px] shadow-sm shrink-0">
                    <CheckIcon />
                  </div>
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
