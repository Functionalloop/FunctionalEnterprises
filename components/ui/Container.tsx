import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  /** Opt into a narrower reading-width container for prose/article content */
  narrow?: boolean;
}

/**
 * Container — horizontal max-width wrapper.
 *
 * Widths:
 *   Default  → max-w-[1360px]  (full agency canvas — headlines + grids)
 *   Narrow   → max-w-[740px]   (prose — blog posts, long-form copy)
 *
 * Padding:
 *   Mobile   → px-5   (20px)
 *   sm       → px-6   (24px)
 *   md       → px-10  (40px)
 *   lg       → px-16  (64px)
 *   xl       → px-20  (80px)
 *
 * The padding scales intentionally from tight on small screens to
 * generous on large screens, giving that "breathing room" agency feel
 * without content ever touching the viewport edge.
 */
export default function Container({
  narrow = false,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        "px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20",
        narrow ? "max-w-[740px]" : "max-w-[1360px]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
