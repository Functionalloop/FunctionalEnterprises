import Link from "next/link";
import type { Metadata } from "next";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "404 — Page Not Found",
  description: "The page you were looking for doesn't exist.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-foreground-dark flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background wordmark */}
      <span
        className="absolute select-none pointer-events-none font-display font-extrabold text-white/[0.03] leading-none"
        style={{ fontSize: "clamp(12rem, 40vw, 28rem)" }}
        aria-hidden="true"
      >
        404
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-xl gap-8">
        {/* Eyebrow */}
        <p className="font-body text-accent text-xs tracking-[0.28em] uppercase">
          Error 404
        </p>

        {/* Headline */}
        <h1
          className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
          style={{ fontSize: "clamp(3rem, 10vw, 7rem)" }}
        >
          Lost in the{" "}
          <span className="text-accent">void.</span>
        </h1>

        {/* Subtext */}
        <p className="font-body text-sm text-muted-dark leading-relaxed max-w-sm">
          This page doesn&apos;t exist — or maybe it did once, and we built
          something better. Either way, let&apos;s get you back on track.
        </p>

        {/* Divider */}
        <div className="h-px w-16 bg-border-dark" aria-hidden="true" />

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Button href="/" variant="primary" size="lg" id="not-found-home">
            Back to Home
          </Button>
          <Button
            href="/pricing"
            variant="secondary"
            size="lg"
            className="text-white border-border-dark hover:border-accent hover:text-accent"
            id="not-found-contact"
          >
            View pricing →
          </Button>
        </div>
      </div>

      {/* Lime dot glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(200,255,0,0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
    </main>
  );
}
