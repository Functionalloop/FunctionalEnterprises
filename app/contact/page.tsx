import type { Metadata } from "next";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Functional Enterprises. Tell us about your goals and we'll be in touch within one business day.",
};

export default function ContactPage() {
  return (
    <main className="bg-foreground-dark min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 border-b border-border-dark">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            Get in Touch
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            Let&apos;s build{" "}
            <span className="text-accent">something bold.</span>
          </h1>
          <p className="font-body text-muted-dark text-sm md:text-base max-w-lg mt-6 leading-relaxed">
            Tell us about your project. We respond to every enquiry within one
            business day.
          </p>
        </div>
      </section>

      {/* ── Form + Sidebar ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-16 lg:gap-24">
            {/* Form — client component with Server Action */}
            <ContactForm />

            {/* Sidebar */}
            <aside className="flex flex-col gap-10">
              <div>
                <p className="font-body text-muted-darker text-[10px] tracking-[0.22em] uppercase mb-4">
                  Email us
                </p>
                <a
                  href="mailto:hello@functional.studio"
                  className="font-display font-bold text-white text-lg md:text-xl hover:text-accent transition-colors duration-200"
                >
                  hello@functional.studio
                </a>
              </div>

              <div>
                <p className="font-body text-muted-darker text-[10px] tracking-[0.22em] uppercase mb-4">
                  Call us
                </p>
                <a
                  href="tel:+447700000000"
                  className="font-display font-bold text-white text-lg md:text-xl hover:text-accent transition-colors duration-200"
                >
                  +44 (0) 7700 000 000
                </a>
              </div>

              <div>
                <p className="font-body text-muted-darker text-[10px] tracking-[0.22em] uppercase mb-4">
                  Response time
                </p>
                <p className="font-body text-muted-dark text-sm leading-relaxed">
                  We respond to all enquiries within{" "}
                  <span className="text-white">1 business day.</span> For
                  urgent projects, call us directly.
                </p>
              </div>

              <div className="border-t border-border-dark pt-10">
                <p className="font-body text-muted-darker text-[10px] tracking-[0.22em] uppercase mb-4">
                  What happens next
                </p>
                <ol className="space-y-4">
                  {[
                    "We review your brief and respond within 24 hrs",
                    "A 30-min discovery call to align on goals and scope",
                    "We send a proposal with timeline and investment",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="font-display font-bold text-accent text-sm shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-body text-sm text-muted-dark leading-relaxed">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
