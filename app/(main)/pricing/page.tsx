import type { Metadata } from "next";
import Pricing from "@/components/sections/Pricing";

export const metadata: Metadata = {
  title: "Pricing — Transparent Web Design Packages",
  description:
    "Clear, upfront pricing for web design and development in India. From static sites to fully bespoke eCommerce — find the right plan for your business.",
  keywords: [
    "web design pricing India",
    "website development cost India",
    "ecommerce website price",
    "affordable web agency India",
  ],
  openGraph: {
    title: "Pricing — Functional Enterprises",
    description:
      "Transparent web design pricing. From ₹8,000 static sites to ₹75,000+ bespoke eCommerce builds.",
  },
};

export default function PricingPage() {
  return (
    <main>
      {/* Page intro header */}
      <section className="bg-foreground-dark pt-40 pb-0">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <p className="font-body text-accent text-xs tracking-[0.28em] uppercase mb-6">
            Investment
          </p>
          <h1
            className="font-display font-extrabold text-white tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
          >
            No surprises.
            <br />
            <span className="text-accent">Just results.</span>
          </h1>
          <p className="font-body text-sm text-muted-dark leading-relaxed max-w-xl mt-8">
            Every package is built around delivering measurable value — not
            just a pretty website. Pick the tier that fits your growth stage
            and we&apos;ll take it from there.
          </p>
        </div>
      </section>

      {/* Reuse the Pricing section component */}
      <Pricing />
    </main>
  );
}
