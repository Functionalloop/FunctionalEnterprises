import { type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Visual size scale ─────────────────────────────────────────────────────────
// Size controls APPEARANCE — level controls SEMANTICS (h1-h4).
// This lets you use an h2 that looks like an h1, etc. for SEO-correct output.
//
// Scale philosophy: headlines should feel oversized and confident.
// The tight tracking (-0.03em to -0.04em) and compressed line-height
// give them that bold editorial feel.
const headingVariants = cva(
  [
    "font-display font-extrabold",
    "tracking-tight leading-[0.97]",  // Slightly compressed — agency feel
  ],
  {
    variants: {
      size: {
        /**
         * display — statement-level scale.
         * Desktop: ~120px. Used for the single biggest headline per page.
         */
        display: "text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.95] tracking-[-0.04em]",

        /**
         * h1 — primary page heading.
         * Desktop: ~80px.
         */
        h1: "text-[clamp(2.75rem,7vw,5rem)] leading-[0.97] tracking-[-0.035em]",

        /**
         * h2 — section headings.
         * Desktop: ~56px.
         */
        h2: "text-[clamp(2rem,5vw,3.5rem)] leading-[1.0] tracking-[-0.03em]",

        /**
         * h3 — sub-section headings, card titles.
         * Desktop: ~36px.
         */
        h3: "text-[clamp(1.5rem,3.5vw,2.25rem)] leading-[1.05] tracking-[-0.025em]",

        /**
         * h4 — labels, callouts, captions.
         * Desktop: ~24px.
         */
        h4: "text-[clamp(1.1rem,2vw,1.5rem)] leading-[1.1] tracking-[-0.015em]",
      },
    },
    defaultVariants: {
      size: "h2",
    },
  }
);

// ── Props ────────────────────────────────────────────────────────────────────
type HeadingLevel = "h1" | "h2" | "h3" | "h4";

export interface HeadingProps
  extends HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  /** Semantic HTML level — determines DOM element (h1/h2/h3/h4) */
  level?: HeadingLevel;
  /** Optional inline color override — defaults to inheriting from parent */
  accent?: boolean;
}

/**
 * Heading — semantic + visual size decoupled.
 *
 * @example
 * // Section title: h2 element but looks like display size
 * <Heading level="h2" size="display">
 *   We build boldly.
 * </Heading>
 *
 * // Card title: h3 element at h3 size
 * <Heading level="h3" size="h3">
 *   Brand Identity
 * </Heading>
 */
export default function Heading({
  level: Tag = "h2",
  size,
  accent = false,
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Tag
      className={cn(
        headingVariants({ size }),
        accent && "text-accent",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { headingVariants };
