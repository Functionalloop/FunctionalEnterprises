"use client";

import { useActionState } from "react";
import { motion } from "framer-motion";
import { submitContactForm, type ContactFormState } from "./actions";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle", message: "" };

const fieldBase =
  "w-full bg-surface-dark border border-border-dark text-white font-body text-sm px-4 py-3.5 placeholder:text-muted-darker focus:outline-none focus:border-accent transition-colors duration-200";

export default function ContactForm() {
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
        className="flex flex-col items-start gap-6 py-12"
      >
        <div className="w-12 h-12 bg-accent flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
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
        <h2 className="font-display font-bold text-white text-3xl md:text-4xl tracking-tight">
          Message received.
        </h2>
        <p className="font-body text-muted-dark text-sm leading-relaxed max-w-md">
          {state.message}
        </p>
        <Button href="/" variant="secondary" className="text-white border-border-dark hover:border-accent hover:text-accent mt-4">
          Back to Home
        </Button>
      </motion.div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-6" noValidate>
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase">
            Name <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Jane Smith"
            className={fieldBase}
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className={fieldBase}
            autoComplete="email"
          />
        </div>
      </div>

      {/* Project type + Budget row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase">
            Project Type
          </label>
          <select
            id="projectType"
            name="projectType"
            className={cn(fieldBase, "cursor-pointer")}
            defaultValue=""
          >
            <option value="" disabled>Select a type…</option>
            <option value="Web Design & Development">Web Design & Development</option>
            <option value="Brand Identity">Brand Identity</option>
            <option value="E-Commerce">E-Commerce</option>
            <option value="SaaS / Product">SaaS / Product</option>
            <option value="Digital Growth">Digital Growth</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase">
            Budget Range
          </label>
          <select
            id="budget"
            name="budget"
            className={cn(fieldBase, "cursor-pointer")}
            defaultValue=""
          >
            <option value="" disabled>Select a range…</option>
            <option value="Under £5k">Under £5k</option>
            <option value="£5k – £15k">£5k – £15k</option>
            <option value="£15k – £30k">£15k – £30k</option>
            <option value="£30k – £60k">£30k – £60k</option>
            <option value="£60k+">£60k+</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label htmlFor="message" className="font-body text-[10px] text-muted-darker tracking-[0.2em] uppercase">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="Tell us about your project, goals, and timeline…"
          className={cn(fieldBase, "resize-none")}
        />
      </div>

      {/* Error state */}
      {state.status === "error" && (
        <p className="font-body text-sm text-red-400 border border-red-900/50 bg-red-900/20 px-4 py-3">
          {state.message}
        </p>
      )}

      {/* Submit */}
      <div className="flex items-center gap-6 pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isPending}
          id="contact-submit"
          className="min-w-[180px]"
        >
          {isPending ? "Sending…" : "Send message →"}
        </Button>
        <p className="font-body text-[10px] text-muted-darker tracking-wide">
          We respond within 1 business day.
        </p>
      </div>
    </form>
  );
}
