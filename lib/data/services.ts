export interface Service {
  title: string;
  description: string;
  /** Lucide icon name or custom SVG key — resolved in the component layer */
  icon: string;
}

export const services: Service[] = [
  {
    title: "Web Design & Development",
    description:
      "From brand-led landing pages to complex web applications — we design and build performant, accessible digital products using Next.js, React, and modern CSS.",
    icon: "monitor",
  },
  {
    title: "Brand Identity & Strategy",
    description:
      "We craft visual identities that hold up at every touchpoint. Strategy, naming, logo systems, typography, colour, and full brand guidelines delivered.",
    icon: "layers",
  },
  {
    title: "Digital Growth & Conversion",
    description:
      "Performance-focused work: CRO audits, A/B testing frameworks, SEO architecture, and analytics instrumentation to turn traffic into pipeline.",
    icon: "trending-up",
  },
];
