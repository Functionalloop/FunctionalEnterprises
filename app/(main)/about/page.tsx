import type { Metadata } from "next";
import BookingCTAButton from "@/components/ui/BookingCTAButton";

export const metadata: Metadata = {
  title: "About",
  description:
    "We are Functional Enterprises — a web design and development studio for ambitious brands. Strategy, design, and engineering, end to end.",
};

const values = [
  {
    num: "01",
    title: "Function first",
    description:
      "Beautiful design that doesn't convert is decoration. We obsess over performance, conversion, and measurable outcomes — aesthetics serve the goal.",
  },
  {
    num: "02",
    title: "Fewer, better clients",
    description:
      "We deliberately limit our roster so every project gets full creative and engineering focus. You are never a ticket number.",
  },
  {
    num: "03",
    title: "Radical transparency",
    description:
      "No black boxes. You see work early, get plain-English explanations, and always know where your project stands.",
  },
  {
    num: "04",
    title: "Built to last",
    description:
      "We write code the next developer will thank us for. We design systems that scale. Nothing disposable.",
  },
];

const stats = [
  { value: "2019", label: "Founded" },
  { value: "42+", label: "Projects Delivered" },
  { value: "₹4M+", label: "Revenue Driven" },
  { value: "98%", label: "Client Retention" },
];

export default function AboutPage() {
  return (
    <main className="bg-background min-h-screen">
      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            About Us
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
            style={{ fontSize: "clamp(3rem, 8vw, 6.5rem)" }}
          >
            We build for{" "}
            <span className="text-accent">outcomes.</span>
          </h1>
        </div>
      </section>

      {/* ── Story ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 border-b border-border-light">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            <div>
              <p className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase mb-6 bg-foreground-dark px-3 py-1.5 rounded-sm">
                Our Story
              </p>
              <h2
                className="font-display font-extrabold text-foreground-dark tracking-tight leading-[0.97] mb-8"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
              >
                Built by builders,
                <br />
                for ambitious brands.
              </h2>
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-body text-base text-muted-light leading-relaxed">
                Functional Enterprises was founded in 2019 with a single belief: that great
                web design should be measurably good, not just visually impressive.
              </p>
              <p className="font-body text-base text-muted-light leading-relaxed">
                We started as a two-person studio taking on projects we were excited about.
                That discipline hasn&apos;t changed. We&apos;re a deliberately small team — senior
                strategists, designers, and engineers — who believe in doing fewer projects
                exceptionally well rather than many projects adequately.
              </p>
              <p className="font-body text-base text-muted-light leading-relaxed">
                Today we work with DTC brands, SaaS founders, and financial services
                firms who want digital products that perform — not just impress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark border-b border-border-dark">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border-dark">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center justify-center text-center px-6 py-16 md:py-20">
                <span
                  className="font-display font-extrabold text-accent leading-none tracking-tight mb-3"
                  style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
                >
                  {s.value}
                </span>
                <span className="font-body text-xs text-muted-dark tracking-widest uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="inline-block font-body text-accent text-xs tracking-[0.28em] uppercase mb-6 bg-foreground-dark px-3 py-1.5 rounded-sm">
            Our Values
          </p>
          <h2
            className="font-display font-extrabold text-foreground-dark tracking-tight leading-[0.97] mb-16 md:mb-20"
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            How we think
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border-light border border-border-light">
            {values.map((v) => (
              <div key={v.num} className="bg-background p-10 md:p-14 flex flex-col gap-5">
                <span className="font-display font-extrabold text-5xl text-muted-lighter leading-none select-none">
                  {v.num}
                </span>
                <h3 className="font-display font-bold text-xl md:text-2xl tracking-tight text-foreground-dark">
                  {v.title}
                </h3>
                <p className="font-body text-sm text-muted-light leading-relaxed">
                  {v.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="bg-foreground-dark border-t border-border-dark py-20 md:py-28">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 flex flex-col md:flex-row items-start md:items-end justify-between gap-10">
          <h2
            className="font-display font-extrabold text-white tracking-tight leading-[0.97]"
            style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
          >
            Want to work together?
          </h2>
          <BookingCTAButton variant="primary" size="lg">
            Start a project
          </BookingCTAButton>
        </div>
      </section>
    </main>
  );
}
