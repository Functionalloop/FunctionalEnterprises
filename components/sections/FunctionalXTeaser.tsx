"use client";

/**
 * FunctionalXTeaser — intentionally minimal dark strip.
 *
 * Positioned after <Process /> at the bottom of the homepage.
 * Single-line content only — does NOT compete with the agency pitch.
 * No card grid, no heading hierarchy, no Framer Motion section animation.
 */

import Image from "next/image";
import Link from "next/link";

interface Props {
  count: number;
}

export default function FunctionalXTeaser({ count }: Props) {
  return (
    <div className="bg-foreground-dark border-t border-border-dark">
      <div className="max-w-[1360px] mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-5">
        <Link
          href="/functionalx"
          className="group flex items-center gap-3 w-fit"
          aria-label="FunctionalX — our hackathon team"
        >
          {/* FX logo badge — small, decorative */}
          <div className="relative w-6 h-6 flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity duration-200">
            <Image src="/fx-logo.png" alt="" fill className="object-contain" aria-hidden="true" />
          </div>

          {/* Single-line label */}
          <span className="font-body text-xs text-muted-darker tracking-[0.18em] uppercase group-hover:text-accent transition-colors duration-200">
            FunctionalX
          </span>
          <span className="font-body text-xs text-border-dark tracking-widest" aria-hidden="true">·</span>
          <span className="font-body text-xs text-muted-darker tracking-[0.18em] uppercase group-hover:text-accent transition-colors duration-200">
            Hackathon Team
          </span>
          {count > 0 && (
            <>
              <span className="font-body text-xs text-border-dark tracking-widest" aria-hidden="true">·</span>
              <span className="font-body text-xs text-muted-darker tracking-[0.18em] uppercase group-hover:text-accent transition-colors duration-200">
                {count} {count === 1 ? "project" : "projects"} built
              </span>
            </>
          )}
          <span
            className="font-body text-xs text-accent opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-0 group-hover:translate-x-1"
            aria-hidden="true"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
