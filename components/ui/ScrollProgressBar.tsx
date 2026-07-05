"use client";

import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollProgressBar — a 2px lime bar fixed at the very top of the viewport.
 * Uses Framer Motion's useScroll to track document scroll progress (0→1)
 * and useSpring to smooth out the motion.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-accent z-[60] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
