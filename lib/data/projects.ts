export interface Project {
  slug: string;
  title: string;
  client: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  coverImage: string;
  year: number;
}

export const projects: Project[] = [
  {
    slug: "meridian-rebrand",
    title: "Meridian Digital Rebrand",
    client: "Meridian Financial Group",
    problem:
      "An outdated visual identity was eroding trust with younger demographics and failing to reflect the firm's modern advisory capabilities.",
    solution:
      "Full brand identity overhaul — new design language, component library, and a Next.js marketing site with personalised content based on visitor segment.",
    result:
      "42% increase in qualified lead submissions within 90 days of launch. Bounce rate dropped by 31%.",
    tags: ["Branding", "Web Design", "Next.js", "Finance"],
    coverImage: "/images/projects/meridian-cover.jpg",
    year: 2024,
  },
  {
    slug: "nova-saas-launch",
    title: "Nova SaaS Product Launch",
    client: "Nova Labs",
    problem:
      "A technically strong B2B product had no compelling web presence. The founding team needed to establish credibility and drive trial sign-ups pre-launch.",
    solution:
      "Zero-to-one marketing site with animated feature showcase, pricing calculator, and Calendly-integrated demo booking flow.",
    result:
      "Acquired 1,200 waitlist sign-ups in the first two weeks post-launch. Featured on Product Hunt #2 of the day.",
    tags: ["SaaS", "Product Marketing", "Animation", "Conversion"],
    coverImage: "/images/projects/nova-cover.jpg",
    year: 2024,
  },
  {
    slug: "bloom-ecommerce",
    title: "Bloom E-Commerce Experience",
    client: "Bloom Botanicals",
    problem:
      "A DTC brand with strong Instagram following had a Shopify store that didn't match the premium feel of their products, causing cart abandonment.",
    solution:
      "Custom Shopify theme with bespoke product visualiser, editorial editorial content blocks, and a loyalty programme micro-site built in Next.js.",
    result:
      "Average order value up 28%. Conversion rate improved from 1.4% to 3.1% within 60 days.",
    tags: ["E-Commerce", "Shopify", "DTC", "UX Design"],
    coverImage: "/images/projects/bloom-cover.jpg",
    year: 2023,
  },
  {
    slug: "atlas-platform",
    title: "Atlas Data Platform",
    client: "Atlas Analytics",
    problem:
      "A complex enterprise data platform needed a public-facing marketing site that could explain sophisticated technical concepts to non-technical buyers.",
    solution:
      "Interactive explainer website with scroll-driven animations, live data visualisation demos, and a gated resource hub built on Next.js + MDX.",
    result:
      "Enterprise demo requests tripled within the first quarter. Average session duration: 4 min 12 sec.",
    tags: ["Enterprise", "Data", "Interactive", "MDX"],
    coverImage: "/images/projects/atlas-cover.jpg",
    year: 2023,
  },
];
