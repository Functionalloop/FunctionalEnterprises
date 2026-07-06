"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm, type ContactFormState } from "@/app/(main)/contact/actions";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { BookingPlan } from "@/lib/context/BookingContext";

// ── Styles ────────────────────────────────────────────────────────────────────
const fieldBase =
  "w-full bg-white/5 border border-white/10 text-white font-body text-sm px-4 py-3.5 placeholder:text-white/30 focus:outline-none focus:border-accent transition-colors duration-200 rounded-none";

const initialState: ContactFormState = { status: "idle", message: "" };

// ── Component ─────────────────────────────────────────────────────────────────
export default function BookingForm({
  plan,
  onClose,
}: {
  plan: BookingPlan | null;
  onClose: () => void;
}) {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-start gap-6 py-8"
      >
        {/* Success icon */}
        <div className="w-14 h-14 bg-accent flex items-center justify-center shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0A0A0A"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <div>
          <h3 className="font-display font-bold text-white text-2xl md:text-3xl tracking-tight mb-3">
            Booking received!
          </h3>
          <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
            {state.message} We&apos;ll review your request and get back to you with next steps.
          </p>
        </div>

        <button
          onClick={onClose}
          className="font-display font-semibold tracking-widest uppercase text-xs text-accent border border-accent px-6 py-3 hover:bg-accent hover:text-foreground-dark transition-all duration-200 cursor-pointer"
        >
          Close →
        </button>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      {/* Hidden: plan name pre-filled into projectType */}
      {plan && (
        <input
          type="hidden"
          name="projectType"
          value={`${plan.name} Plan (₹${plan.price})`}
        />
      )}

      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-name"
            className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase"
          >
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="booking-name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={fieldBase}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-email"
            className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase"
          >
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="booking-email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={fieldBase}
            autoComplete="email"
          />
        </div>
      </div>

      {/* Phone row */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="booking-phone"
          className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase"
        >
          Phone Number <span className="text-accent">*</span>
        </label>
        <input
          id="booking-phone"
          name="phone"
          type="tel"
          required
          placeholder="+91 98765 43210"
          className={fieldBase}
          autoComplete="tel"
        />
      </div>

      {/* Budget — shown only when no plan is pre-selected */}
      {!plan && (
        <div className="flex flex-col gap-2">
          <label
            htmlFor="booking-budget"
            className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase"
          >
            Budget Range
          </label>
          <select
            id="booking-budget"
            name="budget"
            className={cn(fieldBase, "cursor-pointer")}
            defaultValue=""
          >
            <option value="" disabled>Select a range…</option>
            <option value="Under ₹8k">Under ₹8k</option>
            <option value="₹8k – ₹20k">₹8k – ₹20k</option>
            <option value="₹20k – ₹35k">₹20k – ₹35k</option>
            <option value="₹35k – ₹75k">₹35k – ₹75k</option>
            <option value="₹75k+">₹75k+</option>
          </select>
        </div>
      )}

      {/* When plan IS pre-selected, pre-fill budget as hidden */}
      {plan && (
        <input
          type="hidden"
          name="budget"
          value={`₹${plan.price}`}
        />
      )}

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label
          htmlFor="booking-message"
          className="font-body text-[10px] text-white/40 tracking-[0.2em] uppercase"
        >
          Tell us about your project <span className="text-accent">*</span>
        </label>
        <textarea
          id="booking-message"
          name="message"
          required
          rows={4}
          placeholder="What are your goals, timeline, and anything else we should know?"
          className={cn(fieldBase, "resize-none")}
        />
      </div>

      {/* Error */}
      {state.status === "error" && (
        <p className="font-body text-sm text-red-400 border border-red-900/50 bg-red-900/20 px-4 py-3">
          {state.message}
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center gap-5 pt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isPending}
          id="booking-submit"
          className="min-w-[180px]"
        >
          {isPending ? "Sending…" : "Book this plan →"}
        </Button>
        <p className="font-body text-[10px] text-white/30 tracking-wide leading-snug">
          We respond within<br />1 business day.
        </p>
      </div>
    </form>
  );
}
