import type { Metadata } from "next";
import { getServices } from "@/lib/db/services";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Functional Enterprises offers web design & development, brand identity, and digital growth services for ambitious brands.",
};

export const dynamic = "force-dynamic";

const ICONS: Record<string, React.ReactNode> = {
  monitor: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  layers: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  ),
  "trending-up": (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  ),
};

const faqs = [
  {
    q: "What is your typical project timeline?",
    a: "Most projects take 4–10 weeks from kick-off to launch. Simple marketing sites run 4–6 weeks; complex products with custom functionality typically run 8–12 weeks. We agree timelines up front in the proposal.",
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "Both. We've taken products from zero-to-launch and we've overhauled established brands. What matters is that you have a clear goal and are ready to invest in doing it properly.",
  },
  {
    q: "What does the engagement look like day-to-day?",
    a: "You'll have a dedicated point of contact throughout. We work in weekly sprints with async updates and a weekly check-in call. You see work early and often — no big-reveal surprises.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes. We offer monthly retainers covering maintenance, performance monitoring, and iterative improvements. Many clients stay with us for years after initial build.",
  },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            What We Do
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97] mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            Services
          </h1>
          <p className="font-body text-muted-dark text-sm md:text-base max-w-xl leading-relaxed">
            Three disciplines. One integrated team. We embed strategy into every deliverable
            so your investment compounds over time.
          </p>
        </div>
      </section>

      {/* ── Services grid ─────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          {services.length === 0 ? (
            <p className="font-body text-muted-light text-sm text-center py-20">
              Services coming soon.
            </p>
          ) : (
            <div className="flex flex-col gap-0 border border-border-light">
              {services.map((service, i) => (
                <div
                  key={service.id}
                  className={`group flex flex-col md:flex-row gap-8 md:gap-16 p-10 md:p-14 border-t-2 border-t-transparent hover:border-t-accent transition-colors duration-300 ${i !== 0 ? "border-t border-border-light" : ""}`}
                >
                  {/* Number + icon */}
                  <div className="flex md:flex-col items-start gap-6 md:gap-4 md:w-24 shrink-0">
                    <span className="font-display font-extrabold text-5xl md:text-6xl text-muted-lighter leading-none select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-muted-light group-hover:text-accent transition-colors duration-300">
                      {ICONS[service.icon]}
                    </span>
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <h2 className="font-display font-bold text-2xl md:text-3xl tracking-tight text-foreground-dark mb-5 group-hover:text-accent transition-colors duration-300">
                      {service.title}
                    </h2>
                    <p className="font-body text-sm md:text-base text-muted-light leading-relaxed max-w-2xl">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section className="bg-surface-light border-t border-border-light py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            FAQ
          </p>
          <h2
            className="font-display font-extrabold text-foreground-dark tracking-tight leading-[0.97] mb-16"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Common questions
          </h2>
          <div className="flex flex-col gap-0 border border-border-light">
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-b border-border-light last:border-b-0 bg-background">
                <summary className="flex items-start justify-between gap-6 p-8 cursor-pointer list-none font-display font-bold text-lg md:text-xl text-foreground-dark hover:text-accent transition-colors duration-200">
                  {faq.q}
                  <span className="shrink-0 mt-1 text-accent transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="font-body text-sm md:text-base text-muted-light leading-relaxed px-8 pb-8">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark border-t border-border-dark py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 text-center">
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-[0.97] mb-8"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            Ready to get started?
          </h2>
          <Button href="/contact" variant="primary" size="lg">
            Start a project →
          </Button>
        </div>
      </section>
    </main>
  );
}
