"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/lib/context/BookingContext";
import BookingForm from "./BookingForm";

// ── Animation variants ────────────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

const backdropVariants: import("framer-motion").Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35, ease: "easeOut" as const } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: "easeIn" as const, delay: 0.05 } },
};

const panelVariants: import("framer-motion").Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.55, ease: EASE } },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.4, 0, 1, 1] as [number, number, number, number] } },
};

// ── Close Icon ────────────────────────────────────────────────────────────────
function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

// ── Rupee Icon ────────────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
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
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function BookingDrawer() {
  const { open, plan, closeDrawer } = useBooking();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape key handler
  useEffect(() => {
    if (!open) return;

    // Focus the close button when drawer opens
    const timer = setTimeout(() => closeButtonRef.current?.focus(), 100);

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeDrawer();

      // Basic focus trap
      if (e.key === "Tab" && panelRef.current) {
        const focusable = panelRef.current.querySelectorAll<HTMLElement>(
          'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first)?.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [open, closeDrawer]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="booking-backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-sm"
            onClick={closeDrawer}
            aria-hidden="true"
          />

          {/* ── Drawer Panel ─────────────────────────────────────────────── */}
          <motion.div
            key="booking-panel"
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Book a plan"
            className="fixed inset-y-0 right-0 z-[100] w-full md:w-[560px] lg:w-[640px] bg-[#0D0D0D] flex flex-col overflow-y-auto"
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* ── Header bar ─────────────────────────────────────────────── */}
            <div
              className="flex items-center justify-between px-8 py-5 shrink-0"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                {/* Lime dot */}
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-display font-semibold text-xs tracking-[0.25em] uppercase text-white/60">
                  Start a Project
                </span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeDrawer}
                className="w-9 h-9 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-150 cursor-pointer"
                aria-label="Close booking drawer"
                id="booking-close"
              >
                <CloseIcon />
              </button>
            </div>

            {/* ── Content ────────────────────────────────────────────────── */}
            <div className="flex flex-col flex-1 px-8 py-8 gap-10">

              {/* Plan summary card — only shown when a plan is pre-selected */}
              {plan ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: EASE }}
                  className="relative p-6 overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,255,51,0.08) 0%, rgba(212,255,51,0.02) 100%)",
                    border: "1px solid rgba(212,255,51,0.2)",
                  }}
                >
                  {/* Background glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
                    style={{
                      background: "radial-gradient(circle, rgba(212,255,51,0.15) 0%, transparent 70%)",
                    }}
                    aria-hidden="true"
                  />

                  <div className="relative z-10">
                    {/* Tag */}
                    <span className="inline-block font-display text-[9px] font-bold tracking-[0.22em] uppercase px-2.5 py-1 bg-accent text-foreground-dark mb-4">
                      {plan.tag}
                    </span>

                    {/* Plan name */}
                    <h2 className="font-display font-bold text-white text-2xl tracking-tight mb-3">
                      {plan.name}
                    </h2>

                    {/* Price */}
                    <div className="flex items-start gap-1 mb-4">
                      {plan.prefix && (
                        <span className="font-body text-[10px] text-white/40 tracking-[0.18em] uppercase mt-2 mr-1">
                          {plan.prefix}
                        </span>
                      )}
                      <span className="font-display text-xl font-medium text-accent leading-none mt-1">₹</span>
                      <span className="font-display font-extrabold text-accent leading-none text-3xl">
                        {plan.price}
                      </span>
                    </div>

                    {/* Included note */}
                    <div className="flex items-center gap-2 text-white/40">
                      <CheckIcon />
                      <span className="font-body text-xs">Plan pre-selected — we&apos;ll confirm details via email</span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Generic heading when opened without a plan (e.g. from Hero CTA) */
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: EASE }}
                >
                  <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-3">
                    Let&apos;s work together
                  </p>
                  <h2 className="font-display font-bold text-white text-3xl md:text-4xl tracking-tight leading-tight">
                    Tell us about<br />
                    <span className="text-accent">your project.</span>
                  </h2>
                  <p className="font-body text-sm text-white/40 leading-relaxed mt-4 max-w-sm">
                    Fill in the form below and we&apos;ll get back to you within 1 business day to discuss the details.
                  </p>
                </motion.div>
              )}

              {/* ── Form ─────────────────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.5, ease: EASE }}
              >
                <BookingForm plan={plan} onClose={closeDrawer} />
              </motion.div>
            </div>

            {/* ── Footer ─────────────────────────────────────────────────── */}
            <div
              className="px-8 py-5 shrink-0 flex items-center gap-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/20 shrink-0"
                aria-hidden="true"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <p className="font-body text-[10px] text-white/20 tracking-wide">
                Your details are encrypted and never shared with third parties.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
