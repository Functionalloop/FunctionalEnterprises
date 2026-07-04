import Link from "next/link";
import Button from "./Button";
import Container from "./Container";
import { cn } from "@/lib/utils";

// ── Data ──────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "About",    href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/work" },
  { label: "Blog",     href: "/blog" },
  { label: "Contact",  href: "/contact" },
] as const;

const SOCIAL_LINKS = [
  { label: "LinkedIn",  href: "https://linkedin.com", external: true },
  { label: "X / Twitter", href: "https://x.com", external: true },
  { label: "Dribbble",  href: "https://dribbble.com", external: true },
  { label: "GitHub",    href: "https://github.com", external: true },
] as const;

// ── Inline divider ────────────────────────────────────────────────────────────
function Divider({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-px w-full bg-border-dark", className)}
      aria-hidden="true"
    />
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground-dark text-white" aria-label="Site footer">

      {/* ── Pre-footer CTA — key lead-gen strip ──────────────────────────── */}
      <div className="border-t border-border-dark">
        <Container>
          <div className="py-20 md:py-28 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
            {/* Statement line */}
            <div className="max-w-2xl">
              <p
                className="font-body text-muted-darker text-xs tracking-[0.22em] uppercase mb-4"
                aria-hidden="true"
              >
                Next Step
              </p>
              <h2
                className={cn(
                  "font-display font-extrabold text-white",
                  "text-[clamp(2.25rem,6vw,4.5rem)] leading-[0.97] tracking-[-0.035em]"
                )}
              >
                Ready to build <br />
                <span className="text-accent">something bold?</span>
              </h2>
            </div>

            {/* CTA cluster */}
            <div className="flex flex-col sm:flex-row gap-4 md:flex-col xl:flex-row xl:items-center flex-shrink-0">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                id="footer-cta-primary"
              >
                Start a project
              </Button>
              <Button
                href="/work"
                variant="secondary"
                size="lg"
                className="text-white border-border-dark hover:border-accent hover:text-accent"
                id="footer-cta-secondary"
              >
                View our work
              </Button>
            </div>
          </div>
        </Container>
      </div>

      <Divider />

      {/* ── Main footer body ─────────────────────────────────────────────── */}
      <Container>
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 md:gap-16">

          {/* Column 1: Brand + tagline */}
          <div className="max-w-xs">
            {/* Wordmark */}
            <Link
              href="/"
              aria-label="Functional Enterprises — Home"
              className="inline-flex items-center gap-2 group mb-6"
            >
              <span
                className="inline-block w-5 h-5 bg-accent flex-shrink-0 transition-transform duration-300 group-hover:rotate-45"
                aria-hidden="true"
              />
              <span className="font-display font-extrabold text-sm tracking-widest uppercase text-white">
                Functional
              </span>
            </Link>
            <p className="font-body text-muted-dark text-sm leading-relaxed">
              A web design & development agency for ambitious brands. We build
              digital products that perform — not just impress.
            </p>

            {/* Contact */}
            <div className="mt-8 space-y-1">
              <p className="font-body text-muted-darker text-[10px] tracking-[0.2em] uppercase mb-3">
                Get in touch
              </p>
              <a
                href="mailto:hello@functional.studio"
                className="block font-body text-sm text-muted-dark hover:text-accent transition-colors duration-200"
              >
                hello@functional.studio
              </a>
              <a
                href="tel:+447700000000"
                className="block font-body text-sm text-muted-dark hover:text-accent transition-colors duration-200"
              >
                +44 (0) 7700 000 000
              </a>
            </div>
          </div>

          {/* Column 2: Nav links */}
          <div>
            <p className="font-body text-muted-darker text-[10px] tracking-[0.2em] uppercase mb-6">
              Navigation
            </p>
            <nav aria-label="Footer navigation">
              <ul className="space-y-3">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="font-body text-sm text-muted-dark hover:text-accent transition-colors duration-200 hover:translate-x-1 inline-block transition-transform"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 3: Social links */}
          <div>
            <p className="font-body text-muted-darker text-[10px] tracking-[0.2em] uppercase mb-6">
              Follow us
            </p>
            <ul className="space-y-3" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, href, external }) => (
                <li key={href}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={`${label}${external ? " (opens in new tab)" : ""}`}
                    className="font-body text-sm text-muted-dark hover:text-accent transition-colors duration-200 inline-flex items-center gap-2 group"
                  >
                    {label}
                    {external && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="opacity-50 group-hover:opacity-100 transition-opacity"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      <Divider />

      {/* ── Copyright bar ────────────────────────────────────────────────── */}
      <Container>
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-muted-darker text-xs tracking-wide">
            © {year} Functional Enterprises Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="font-body text-muted-darker text-xs hover:text-muted-dark transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="font-body text-muted-darker text-xs hover:text-muted-dark transition-colors duration-200"
            >
              Terms
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
