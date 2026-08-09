"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  AppWindow,
  Blocks,
  Database,
  KeyRound,
  LayoutTemplate,
  ServerCog,
  Smartphone,
  Workflow,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { services } from "@/data/skills";

const icons = [
  AppWindow,
  ServerCog,
  Blocks,
  Workflow,
  LayoutTemplate,
  Smartphone,
  KeyRound,
  Database,
];

export default function Services() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="services" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Offerings"
          title="What I Can Build"
          description="Practical product surfaces and systems I can design, develop, and deliver end to end."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.article
                key={service.id}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReduced ? 0 : index * 0.04,
                }}
                whileHover={prefersReduced ? undefined : { y: -5 }}
                className="card-surface group p-5 md:p-6"
                data-cursor="hover"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span className="font-mono text-xs text-[var(--accent)]">
                    {service.id}
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-[var(--accent)] transition-colors group-hover:border-[rgba(91,140,255,0.35)]">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold leading-snug">
                  {service.title}
                </h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
