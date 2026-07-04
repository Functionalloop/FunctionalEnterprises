/**
 * lib/tokens.ts
 *
 * Single source of truth for all design tokens.
 * These values are mirrored into tailwind.config.ts as theme extensions
 * so they can be used both in Tailwind classes and in JS/TS (e.g. Framer Motion).
 *
 * ─────────────────────────────────────────────
 * COLOUR PALETTE
 * ─────────────────────────────────────────────
 */
export const colors = {
  /** Near-white background for light sections */
  background: "#FAFAF8",

  /** Deep black for dark sections, hero, footer */
  foregroundDark: "#0A0A0A",

  /**
   * ACCENT — Lime #C8FF00
   * High-contrast, editorial, distinctly modern agency feel.
   * Use sparingly: CTAs, highlighted text, interactive indicators.
   */
  accent: "#C8FF00",

  /** Accent at reduced opacity — hover states, background tints */
  accentMuted: "#C8FF0033",

  // ── Muted text ───────────────────────────────
  /** Body copy on light backgrounds */
  mutedLight: "#6B6B6B",

  /** Captions / labels on light backgrounds */
  mutedLighter: "#A0A0A0",

  /** Body copy on dark backgrounds */
  mutedDark: "#A8A8A0",

  /** Captions / labels on dark backgrounds */
  mutedDarker: "#5C5C58",

  // ── Surface tones ───────────────────────────
  /** Subtle card / section background on light */
  surfaceLight: "#F0F0EC",

  /** Subtle card / section background on dark */
  surfaceDark: "#141414",

  /** Border on light sections */
  borderLight: "#E4E4E0",

  /** Border on dark sections */
  borderDark: "#2A2A2A",
} as const;

/**
 * ─────────────────────────────────────────────
 * TYPOGRAPHY
 * ─────────────────────────────────────────────
 *
 * Fonts are loaded via next/font/google in app/layout.tsx
 * and injected as CSS variables. These constants are the
 * variable names to reference in Tailwind / inline styles.
 *
 * Display font  → General Sans (confident, editorial, geometric)
 * Body font     → DM Mono (technical, mono-adjacent — adds personality contrast)
 */
export const fonts = {
  /** CSS variable for the display / headline font */
  display: "--font-display",

  /** CSS variable for the body / prose font */
  body: "--font-body",
} as const;

/**
 * Tailwind-ready font-family references (use in tailwind.config.ts extend)
 */
export const fontFamilies = {
  display: ["var(--font-display)", "system-ui", "sans-serif"],
  body: ["var(--font-body)", "monospace"],
} as const;

/**
 * ─────────────────────────────────────────────
 * SPACING SCALE EXTENSIONS
 * ─────────────────────────────────────────────
 *
 * Tailwind's default scale goes to 96 (24rem).
 * We extend with generous agency-style section padding values.
 * These map to: 128px, 160px, 192px.
 */
export const spacing = {
  /** 8rem — inner section padding, generous breathing room */
  "32": "8rem",

  /** 10rem — hero / feature section vertical padding */
  "40": "10rem",

  /** 12rem — full-bleed statement sections */
  "48": "12rem",
} as const;

/**
 * ─────────────────────────────────────────────
 * ANIMATION EASINGS (Framer Motion)
 * ─────────────────────────────────────────────
 */
export const easing = {
  /** Smooth page / section entrances */
  smooth: [0.25, 0.1, 0.25, 1] as [number, number, number, number],

  /** Snappy interactive elements */
  snappy: [0.4, 0, 0.2, 1] as [number, number, number, number],

  /** Dramatic hero reveals */
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
} as const;

/**
 * ─────────────────────────────────────────────
 * TRANSITION DURATIONS (ms)
 * ─────────────────────────────────────────────
 */
export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.6,
  xslow: 1.0,
} as const;
