"use client";

/**
 * Hero — scroll-scrubbed reveal (Phase 3 — uses design system components)
 *
 * ── Scroll architecture ──────────────────────────────────────────────────────
 *
 *  Section element (heroRef)  →  120vh mobile / 170vh desktop
 *  │ Tall outer shell gives the browser scroll room to drive the animation.
 *  │ The extra height beyond 100vh is the "scrub runway."
 *  │
 *  └─ Inner sticky div  →  h-screen, position:sticky top-0
 *       Content stays pinned to the viewport while the outer section
 *       scrolls past. scrollYProgress 0→1 maps across the full section height.
 *
 *  useScroll  →  target=heroRef, offset ["start start","end start"]
 *  useSpring  →  wraps raw progress for smooth, non-robotic feel
 *  useReducedMotion  →  collapses all scale/y transforms; opacity still fades
 *
 * ── Stagger map (scrollYProgress 0 → 1) ─────────────────────────────────────
 *
 *   Eyebrow     [0.00 ──── 0.18]
 *   Headline    [0.00 ──────────── 0.40]   ← spec-exact: 0→0.4
 *   Rule        [0.12 ──────── 0.42]
 *   Subhead     [0.20 ─────────────── 0.60] ← spec-exact: 0.2→0.6
 *   CTA         [0.50 ────── 0.70]          ← spec-exact: 0.5→0.7
 *   Indicator   [0.00 ─ 0.15]               ← spec-exact: 0→0.15
 *   BG wordmark [0 ──────────────────── 1]  (parallax at 0.4× speed)
 *   BG outline  [0 ──────────────────── 1]  (parallax at 0.25× speed, slower)
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import { useBooking } from "@/lib/context/BookingContext";

// ── motion()-wrapped design system components ─────────────────────────────────
// motion() creates a version of the component that can receive MotionValues
// in its `style` prop. The component must forward its ref for this to work
// correctly — Heading passes spread ...props to the heading element so style
// is forwarded naturally.
const MotionHeading = motion(Heading);

// ── Constants ─────────────────────────────────────────────────────────────────
const SPRING = { stiffness: 80, damping: 22, restDelta: 0.001 } as const;

const INDICATOR_TRANSITION = {
  duration: 1.6,
  repeat: Infinity,
  ease: "easeInOut" as const,
  repeatDelay: 0.3,
} as const;

// ── Component ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const rm = useReducedMotion(); // true when user prefers reduced motion
  const { openDrawer } = useBooking();

  // ── Scroll progress scoped to this section only ───────────────────────────
  const { scrollYProgress } = useScroll({
    target: heroRef,
    /**
     * offset ["start start", "end end"]:
     *   progress=0 → section top at viewport top  (scrollY = 0)
     *   progress=1 → section bottom at viewport bottom (scrollY = sectionHeight − 100vh)
     *
     * For h-[170vh]: progress=1 fires at scrollY=70vh.
     * This is EXACTLY when position:sticky unlatches — so the spring can never
     * run past 1.0 while the hero is still visible, eliminating the un-settle bug.
     *
     * For h-[120vh] mobile: progress=1 at scrollY=20vh (fast settle, less scrub).
     */
    offset: ["start start", "end end"],
  });

  // Spring layer — prevents the mechanical "dragging on a wire" feel
  const smoothed = useSpring(scrollYProgress, SPRING);

  // Reduced motion: use raw (instantly-settling) progress, skip spring lag
  const p = rm ? scrollYProgress : smoothed;

  // ── Background depth layers ───────────────────────────────────────────────
  // Parallax: background moves at a fraction of the foreground scroll speed.
  // The different rates between BG layers create perceived 3D depth.

  // Ghosted wordmark — 0.4× parallax rate
  const bgWordmarkY  = useTransform(p, [0, 1], ["0%", "-16%"]);
  const bgWordmarkOp = useTransform(p, [0, 0.06, 0.55, 0.85], [0.03, 0.055, 0.025, 0]);

  // Lime geometric outline square — 0.25× rate (even slower = deeper layer)
  const bgShapeY     = useTransform(p, [0, 1], ["0%", "-8%"]);
  const bgShapeOp    = useTransform(p, [0, 0.08, 0.6, 0.8], [0.06, 0.10, 0.04, 0]);
  const bgShapeRot   = useTransform(p, [0, 1], rm ? ["12deg", "12deg"] : ["12deg", "32deg"]);

  // Lime radial glow — atmospheric, fades as content settles
  const glowOp       = useTransform(p, [0, 0.2, 0.75], [0.07, 0.055, 0.01]);

  // ── Foreground element transforms ─────────────────────────────────────────

  // Eyebrow
  const eyebrowOp = useTransform(p, [0.00, 0.18], [0, 1]);
  const eyebrowY  = useTransform(p, [0.00, 0.18], rm ? ["0px", "0px"] : ["16px", "0px"]);

  // Headline — spec: 0 → 0.4
  const headlineScale = useTransform(p, [0, 0.40], rm ? [1, 1] : [1.1, 1]);
  const headlineY     = useTransform(p, [0, 0.40], rm ? ["0%", "0%"] : ["6%", "0%"]);

  // Accent rule
  const ruleScaleX    = useTransform(p, [0.12, 0.42], [0, 1]);

  // Subheadline — spec: 0.2 → 0.6
  const subOp = useTransform(p, [0.20, 0.60], [0, 1]);
  const subY  = useTransform(p, [0.20, 0.60], rm ? ["0px", "0px"] : ["28px", "0px"]);

  // CTA — spec: 0.5 → 0.7
  const ctaOp = useTransform(p, [0.50, 0.70], [0, 1]);
  const ctaY  = useTransform(p, [0.50, 0.70], rm ? ["0px", "0px"] : ["20px", "0px"]);

  // Scroll indicator — spec: opacity 1 → 0 over 0 → 0.15
  const indOp = useTransform(p, [0, 0.15], [1, 0]);

  return (
    <section
      ref={heroRef}
      /**
       * Height creates the scrub runway:
       *   100vh content + extra vh = total scroll distance available.
       *   Mobile 120vh → 20vh of scrub room (fast settle on touch)
       *   Desktop 170vh → 70vh of scrub room (cinematic reveal)
       */
      className="relative bg-foreground-dark h-[120vh] md:h-[170vh]"
      aria-label="Hero — We build the websites your competitors wish they had"
      id="hero"
    >
      {/* ─────────────────────────────────────────────────────────────────────
          STICKY VIEWPORT — stays fixed while outer section provides scroll
          ───────────────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* ── LAYER 0: Lime atmospheric glow ─────────────────────────────── */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: glowOp }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 72% 56% at 50% 46%, #C8FF00 0%, transparent 68%)",
            }}
          />
        </motion.div>

        {/* ── LAYER 1: Lime geometric outline (deepest parallax layer) ────── */}
        {/* Visible on md+ only — too distracting on small screens */}
        <motion.div
          className="absolute inset-0 items-center justify-center pointer-events-none select-none hidden md:flex"
          style={{ y: bgShapeY, opacity: bgShapeOp, rotate: bgShapeRot }}
          aria-hidden="true"
        >
          <div
            style={{
              width:  "clamp(280px, 38vw, 560px)",
              height: "clamp(280px, 38vw, 560px)",
              border: "1.5px solid #C8FF00",
              transform: "translateX(18%)",
            }}
          />
        </motion.div>

        {/* ── LAYER 2: Ghosted wordmark (slower parallax — shallower depth) ── */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ y: bgWordmarkY, opacity: bgWordmarkOp, willChange: "transform" }}
          aria-hidden="true"
        >
          <span
            className="font-display font-extrabold text-white whitespace-nowrap"
            style={{ fontSize: "clamp(72px, 16vw, 260px)", lineHeight: 1 }}
          >
            FUNCTIONAL
          </span>
        </motion.div>

        {/* ── LAYER 3: Noise grain (premium texture — static, no animation) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: 0.022,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "300px 300px",
          }}
          aria-hidden="true"
        />

        {/* ── LAYER 4: Foreground content ─────────────────────────────────── */}
        {/*
          Container provides responsive horizontal padding and max-width.
          text-center is applied here rather than inside Container so it only
          affects this hero's content, not Container's behaviour generally.
        */}
        <Container className="relative z-10 text-center">

          {/* Eyebrow tag */}
          <motion.p
            className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6 md:mb-8"
            style={{ opacity: eyebrowOp, y: eyebrowY }}
          >
            Web Design &amp; Development
          </motion.p>

          {/*
            Primary headline — uses MotionHeading so Framer Motion motion values
            (scale, y) are passed as style props to the rendered <h1> element.
            `level="h1"` for correct semantics; `size="h1"` for visual scale.
            We override the size visually via inline style fontSize clamp so it
            can be slightly larger than the design token definition — hero-specific.
          */}
          <MotionHeading
            level="h1"
            size="h1"
            className="text-white mb-0"
            style={{
              scale: headlineScale,
              y: headlineY,
              willChange: "transform",
              // Slightly larger than the h1 token — this IS the hero statement
              fontSize: "clamp(2.5rem, 6.5vw, 6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            We build the websites{" "}
            <br className="hidden sm:block" />
            {/* Accent phrase — lime against white headline */}
            <span className="text-accent">your competitors</span>
            <br className="hidden sm:block" />{" "}
            wish they had.
          </MotionHeading>

          {/* Accent horizontal rule — scaleX reveals left→right */}
          <div className="flex justify-center mt-6 mb-6 md:mt-8 md:mb-8" aria-hidden="true">
            <motion.div
              className="h-px bg-accent origin-left"
              style={{ width: "5rem", scaleX: ruleScaleX, willChange: "transform" }}
            />
          </div>

          {/* Subheadline */}
          <motion.p
            className="font-body text-muted-dark text-sm md:text-base lg:text-[1.0625rem] max-w-xl md:max-w-2xl mx-auto leading-relaxed mb-10 md:mb-14"
            style={{ opacity: subOp, y: subY, willChange: "transform" }}
          >
            A web development agency for ambitious brands who want fast, modern,
            conversion-focused sites — not another template.
          </motion.p>

          {/* CTA — Button component, variant="primary", size="lg" per spec */}
          <motion.div style={{ opacity: ctaOp, y: ctaY, willChange: "transform" }}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => openDrawer()}
              id="hero-cta"
            >
              Start a project
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
          </motion.div>
        </Container>

        {/* ── Scroll indicator ─────────────────────────────────────────────── */}
        {/* Spec: opacity 1→0 mapped across 0→0.15 of progress */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
          style={{ opacity: indOp }}
          aria-hidden="true"
        >
          <span className="font-body text-muted-darker text-[9px] tracking-[0.22em] uppercase">
            Scroll
          </span>
          {/* Lime line pulses downward — CSS animation, no scroll dependency */}
          <div className="relative w-px h-12 overflow-hidden" style={{ background: "rgba(200,255,0,0.15)" }}>
            <motion.div
              className="absolute inset-x-0 top-0 bg-accent"
              style={{ height: "100%" }}
              animate={{ y: ["-100%", "100%"] }}
              transition={INDICATOR_TRANSITION}
            />
          </div>
        </motion.div>

        {/* ── Bottom fade — blends hero floor into next section ────────────── */}
        <div
          className="absolute bottom-0 inset-x-0 h-40 pointer-events-none"
          style={{
            background: "linear-gradient(to bottom, transparent 0%, #0A0A0A 100%)",
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
