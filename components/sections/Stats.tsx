"use client";

import { motion } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";

const stats = [
  { value: "42+", label: "Projects Delivered" },
  { value: "£4M+", label: "Revenue Driven for Clients" },
  { value: "98%", label: "Client Retention Rate" },
  { value: "6 Wks", label: "Average Launch Timeline" },
];

export default function Stats() {
  return (
    <SectionWrapper theme="dark" id="stats">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border-dark border border-border-dark">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className="bg-foreground-dark flex flex-col items-center justify-center text-center px-6 py-12 md:py-16 lg:py-20 gap-4"
          >
            <span
              className="font-display font-extrabold text-accent leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
            >
              {stat.value}
            </span>
            <span className="font-body text-xs text-muted-dark tracking-widest uppercase max-w-[12ch] leading-relaxed">
              {stat.label}
            </span>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
