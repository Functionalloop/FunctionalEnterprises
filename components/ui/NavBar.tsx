"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import { cn } from "@/lib/utils";
import { useBooking } from "@/lib/context/BookingContext";

// ── Nav links ─────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",        href: "/",            fx: false },
  { label: "About",       href: "/about",        fx: false },
  { label: "Services",    href: "/services",     fx: false },
  { label: "Work",        href: "/work",         fx: false },
  { label: "Pricing",     href: "/pricing",      fx: false },
  { label: "Blog",        href: "/blog",         fx: false },
  { label: "Contact",     href: "/contact",      fx: false },
  { label: "FunctionalX", href: "/functionalx",  fx: true  },
] as const;


// ── Animation variants ────────────────────────────────────────────────────────
// Easing tuple typed explicitly so Framer Motion's Easing type is satisfied
const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const overlayVariants = {
  closed: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  open:   { opacity: 1, clipPath: "inset(0 0 0% 0)" },
};

const overlayLinkVariants = {
  closed: { opacity: 0, x: -24 },
  open:   (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.08 + i * 0.06, duration: 0.4, ease: EXPO_EASE },
  }),
};

const overlayTransition = { duration: 0.5, ease: EXPO_EASE };

// ── Wordmark SVG ──────────────────────────────────────────────────────────────
function Wordmark({ light }: { light: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Functional Enterprises — Home"
      className="flex items-center gap-2 group"
    >
      {/* Lime accent square mark */}
      <span
        className="inline-block w-6 h-6 bg-accent flex-shrink-0 transition-transform duration-300 group-hover:rotate-45"
        aria-hidden="true"
      />
      <span
        className={cn(
          "font-display font-extrabold text-sm tracking-widest uppercase transition-colors duration-300",
          light ? "text-foreground-dark" : "text-white"
        )}
      >
        Functional
      </span>
    </Link>
  );
}

// ── Hamburger icon ────────────────────────────────────────────────────────────
function HamburgerIcon({ isOpen, light }: { isOpen: boolean; light: boolean }) {
  const lineClass = cn(
    "block absolute left-0 h-px w-full bg-current transition-all duration-300 origin-center",
    light && !isOpen ? "text-foreground-dark" : "text-white"
  );

  return (
    <span className="relative w-5 h-[14px] flex items-center" aria-hidden="true">
      <span
        className={cn(lineClass, isOpen ? "top-1/2 rotate-45" : "top-0")}
      />
      <span
        className={cn(
          lineClass,
          "top-1/2 -translate-y-1/2",
          isOpen ? "opacity-0 scale-x-0" : "opacity-100"
        )}
      />
      <span
        className={cn(lineClass, isOpen ? "top-1/2 -rotate-45" : "bottom-0")}
      />
    </span>
  );
}

// ── NavBar ────────────────────────────────────────────────────────────────────
export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openDrawer } = useBooking();

  // Scroll listener — switches to solid-bg after 80px
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close overlay on route change
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const isLight = scrolled || menuOpen;

  return (
    <>
      {/* ── Main nav bar ─────────────────────────────────────────────────── */}
      <motion.header
        className="fixed top-0 inset-x-0 z-50"
        animate={{
          backgroundColor: isLight ? "rgba(250,250,248,0.96)" : "rgba(10,10,10,0)",
          borderBottomColor: isLight ? "rgba(228,228,224,1)" : "rgba(228,228,224,0)",
          backdropFilter: isLight ? "blur(12px)" : "blur(0px)",
        }}
        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ borderBottomWidth: 1, borderBottomStyle: "solid" }}
      >
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-16 md:h-[4.5rem]">
            {/* Left: wordmark */}
            <Wordmark light={isLight} />

            {/* Center: desktop links */}
            <nav
              aria-label="Primary navigation"
              className="hidden md:flex items-center gap-8"
            >
              {NAV_LINKS.map(({ label, href, fx }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-body text-xs tracking-[0.18em] uppercase transition-all duration-200",
                      "relative after:absolute after:bottom-[-2px] after:left-0",
                      "after:h-px after:bg-accent after:transition-[width] after:duration-300",
                      active ? "after:w-full" : "after:w-0 hover:after:w-full",
                      fx
                        ? isLight
                          // White nav: dark pill so lime is visible against white
                          ? "text-accent bg-foreground-dark px-2.5 py-1 hover:bg-foreground-dark/80 after:hidden"
                          // Transparent dark nav: plain lime text
                          : "text-accent hover:text-accent/80"
                        : isLight
                          ? active ? "text-foreground-dark" : "text-muted-light hover:text-foreground-dark"
                          : active ? "text-white" : "text-muted-dark hover:text-white"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Button
                onClick={() => openDrawer()}
                variant="primary"
                size="default"
                className={cn(
                  "hidden md:inline-flex",
                  // On transparent nav, keep lime-on-dark; on light nav same primary
                  !isLight && "focus-visible:ring-offset-foreground-dark"
                )}
                id="nav-cta"
              >
                Start a project
              </Button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "md:hidden w-10 h-10 flex items-center justify-center",
                  "rounded-none focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-accent focus-visible:ring-offset-2",
                  isLight
                    ? "focus-visible:ring-offset-background"
                    : "focus-visible:ring-offset-foreground-dark"
                )}
              >
                <HamburgerIcon isOpen={menuOpen} light={isLight} />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay menu ──────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-label="Mobile navigation menu"
            aria-modal="true"
            className="fixed inset-0 z-40 bg-foreground-dark flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            transition={overlayTransition}
          >
            {/* Lime accent bar top */}
            <div className="h-px bg-accent w-full" aria-hidden="true" />

            {/* Spacer — clears the fixed nav bar */}
            <div className="h-16" aria-hidden="true" />

            {/* Nav links — large, bold, lime-accented */}
            <nav
              className="flex-1 flex flex-col justify-center px-8 gap-2"
              aria-label="Mobile navigation"
            >
              {NAV_LINKS.map(({ label, href, fx }, i) => {
                const active = pathname === href;
                return (
                  <motion.div
                    key={href}
                    custom={i}
                    variants={overlayLinkVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block font-display font-extrabold",
                        "text-[clamp(2.5rem,10vw,4.5rem)] leading-[1.1] tracking-[-0.03em]",
                        "border-b border-border-dark py-4",
                        "transition-colors duration-200 group",
                        // FunctionalX always lime in mobile overlay too
                        fx || active ? "text-accent" : "text-white hover:text-accent"
                      )}
                    >
                      <span className="flex items-center justify-between">
                        {label}
                        {/* Right arrow — appears on hover */}
                        <span
                          className={cn(
                            "text-accent text-2xl transition-transform duration-300",
                            "opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                            (active || fx) && "opacity-100"
                          )}
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer of overlay — contact CTA */}
            <motion.div
              className="px-8 py-10 border-t border-border-dark"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.4 } }}
              exit={{ opacity: 0 }}
            >
              <p className="font-body text-muted-dark text-xs tracking-widest uppercase mb-4">
                Ready to build?
              </p>
              <Button
                onClick={() => {
                  setMenuOpen(false);
                  setTimeout(() => openDrawer(), 300);
                }}
                variant="primary"
                size="lg"
                className="w-full justify-center"
                id="mobile-nav-cta"
              >
                Start a project
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
