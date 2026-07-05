import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import SocialProof from "@/components/sections/SocialProof";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";
import { getProjects } from "@/lib/db/projects";
import { getServices } from "@/lib/db/services";
import { getTestimonials } from "@/lib/db/testimonials";
import { getStats, getProcessSteps } from "@/lib/db/content";

export const dynamic = "force-dynamic";

/**
 * Home page — /
 *
 * Async Server Component. Fetches all section data from the database in
 * parallel and passes it down as props to the client section components.
 * Each section keeps its own "use client" directive for Framer Motion
 * animations — the page shell stays a server component.
 */
export default async function HomePage() {
  // Fetch all data in parallel — single round-trip cost
  const [projects, services, testimonials, stats, processSteps] =
    await Promise.all([
      getProjects(true),
      getServices(),
      getTestimonials(true),
      getStats(),
      getProcessSteps(),
    ]);

  return (
    <main>
      <Hero />
      <Services services={services} />
      <FeaturedWork projects={projects} />
      <SocialProof testimonials={testimonials} />
      <Stats stats={stats} />
      <Process steps={processSteps} />
    </main>
  );
}
