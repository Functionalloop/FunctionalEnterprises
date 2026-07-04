export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  /** Optional project slug for cross-linking to the case study */
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Working with this team was the first time a web agency genuinely understood our business before touching a pixel. The new site practically sells for us.",
    author: "Sarah Chen",
    role: "Chief Marketing Officer",
    company: "Meridian Financial Group",
    projectSlug: "meridian-rebrand",
  },
  {
    quote:
      "We went from zero web presence to a Product Hunt top pick in six weeks. The quality, speed, and strategic thinking were unlike anything we'd experienced with a freelancer or larger studio.",
    author: "James Okafor",
    role: "Co-founder & CEO",
    company: "Nova Labs",
    projectSlug: "nova-saas-launch",
  },
  {
    quote:
      "Our Shopify store finally looks as premium as our products. The new experience converted customers who had bounced three times before. The data speaks for itself.",
    author: "Priya Menon",
    role: "Head of E-Commerce",
    company: "Bloom Botanicals",
    projectSlug: "bloom-ecommerce",
  },
];
