"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface BookingPlan {
  name: string;
  price: string;
  tag: string;
  prefix?: string;
}

interface BookingContextValue {
  open: boolean;
  plan: BookingPlan | null;
  openDrawer: (plan?: BookingPlan) => void;
  closeDrawer: () => void;
}

// ── Context ───────────────────────────────────────────────────────────────────
const BookingContext = createContext<BookingContextValue | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────
export function BookingProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [plan, setPlan] = useState<BookingPlan | null>(null);

  const openDrawer = useCallback((selectedPlan?: BookingPlan) => {
    setPlan(selectedPlan ?? null);
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
    setTimeout(() => setPlan(null), 400);
  }, []);

  return (
    <BookingContext.Provider value={{ open, plan, openDrawer, closeDrawer }}>
      {children}
    </BookingContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────
export function useBooking(): BookingContextValue {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error("useBooking must be used within a <BookingProvider>");
  }
  return ctx;
}
