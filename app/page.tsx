import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import FeaturedWork from "@/components/sections/FeaturedWork";
import SocialProof from "@/components/sections/SocialProof";
import Stats from "@/components/sections/Stats";
import Process from "@/components/sections/Process";

/**
 * Home page — /
 *
 * Server component. Client-only sections are imported individually so each
 * section self-selects into the client bundle via its own "use client"
 * directive — the page shell stays a server component.
 *
 * Scroll order:
 *   Hero → Services → FeaturedWork → SocialProof → Stats → Process → Footer CTA
 */
export default function HomePage() {
  return (
    <main>
      <Hero />
      <Services />
      <FeaturedWork />
      <SocialProof />
      <Stats />
      <Process />
    </main>
  );
}
