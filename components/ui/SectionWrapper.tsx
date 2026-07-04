import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Container from "./Container";

export type SectionTheme = "light" | "dark";

export interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  /**
   * Theme controls background + foreground text color automatically.
   * "light" → #FAFAF8 background, dark text
   * "dark"  → #0A0A0A background, white text
   */
  theme?: SectionTheme;
  /** Pass to <Container> — narrows content to reading width */
  narrow?: boolean;
  /** Override the outer <section> element tag */
  as?: "section" | "div" | "article" | "aside";
  /** Opt out of Container wrapping (e.g. for full-bleed inner layouts) */
  noContainer?: boolean;
}

/**
 * SectionWrapper — the standard page-section shell.
 *
 * Every page section should be wrapped in this component.
 * It owns:
 *   - Background & foreground colour switching (light / dark)
 *   - Vertical padding rhythm:
 *       Mobile  → py-16 (64px)
 *       md      → py-24 (96px)
 *       xl      → py-32 (128px)
 *   - Horizontal Container (optional, on by default)
 *
 * Usage:
 *   <SectionWrapper theme="dark" id="services">
 *     <Heading level="h2">Our Services</Heading>
 *   </SectionWrapper>
 */
export default function SectionWrapper({
  theme = "light",
  narrow = false,
  as: Tag = "section",
  noContainer = false,
  className,
  children,
  ...props
}: SectionWrapperProps) {
  const themeClasses =
    theme === "dark"
      ? "bg-foreground-dark text-white"
      : "bg-background text-foreground-dark";

  const inner = noContainer ? (
    children
  ) : (
    <Container narrow={narrow}>{children}</Container>
  );

  return (
    <Tag
      className={cn(
        themeClasses,
        // Generous vertical padding — the "bold minimal" agency whitespace rhythm
        "py-16 md:py-24 xl:py-32",
        className
      )}
      {...props}
    >
      {inner}
    </Tag>
  );
}
