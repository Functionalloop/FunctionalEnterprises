import { forwardRef, type ButtonHTMLAttributes } from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// ── Variant + size definitions via cva ───────────────────────────────────────
const buttonVariants = cva(
  // Base — applied to every variant
  [
    "inline-flex items-center justify-center gap-2",
    "font-display font-semibold tracking-widest uppercase",
    "rounded-none",                        // Sharp corners — agency aesthetic
    "cursor-pointer select-none",
    "transition-all duration-200 ease-out",
    // Tactile scale on hover (all variants share this)
    "hover:scale-[1.02] active:scale-[0.98]",
    // Accessible focus ring — always lime-accented
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-accent",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-foreground-dark",
    "disabled:pointer-events-none disabled:opacity-40",
  ],
  {
    variants: {
      variant: {
        /**
         * primary — lime fill, dark text.
         * Works on both dark and light section backgrounds.
         * The fill-to-outline inversion on hover makes it feel tactile.
         */
        primary: [
          "bg-accent text-foreground-dark border border-accent",
          "hover:bg-transparent hover:text-accent",
        ],

        /**
         * secondary — transparent with border in the current text color.
         * On dark bg: white border → lime border + text on hover.
         * On light bg: dark border → lime border + text on hover.
         */
        secondary: [
          "bg-transparent border border-current",
          "hover:border-accent hover:text-accent",
        ],

        /**
         * ghost — text only, no border, no fill.
         * Lime underline slides in from left on hover.
         * Use for tertiary actions (e.g. "Read more →" inline links).
         */
        ghost: [
          "bg-transparent border-none px-0",
          "relative after:absolute after:bottom-0 after:left-0",
          "after:h-px after:w-0 after:bg-accent",
          "after:transition-[width] after:duration-300 after:ease-out",
          "hover:text-accent hover:after:w-full",
          // Ghost doesn't scale — the underline animation is the hover tell
          "hover:scale-100",
        ],
      },

      size: {
        /** Default — nav-level CTAs, inline actions */
        default: "px-6 py-3 text-xs",
        /** Large — hero CTAs, section CTAs */
        lg: "px-9 py-4 text-xs",
        /** Small — compact contexts */
        sm: "px-4 py-2.5 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

// ── Props ────────────────────────────────────────────────────────────────────
export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** When provided, renders as a Next.js <Link> (anchor) instead of <button> */
  href?: string;
  /** Pass className to override or extend styles via cn() */
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, className, href, children, ...props },
    ref
  ) => {
    const classes = cn(buttonVariants({ variant, size }), className);

    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { buttonVariants };
export default Button;
