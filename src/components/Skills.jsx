"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Code2,
  Database,
  Layers,
  Wrench,
  Braces,
  Server,
  Palette,
  GitBranch,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skills } from "@/data/skills";

const categoryMeta = {
  Frontend: { icon: Code2, accent: "#5b8cff" },
  Backend: { icon: Server, accent: "#8b5cf6" },
  Database: { icon: Database, accent: "#34d399" },
  Tools: { icon: Wrench, accent: "#fbbf24" },
};

const iconMap = {
  "React.js": Braces,
  "Next.js": Layers,
  Redux: Layers,
  "Redux Toolkit": Layers,
  Figma: Palette,
  Git: GitBranch,
  GitHub: GitBranch,
};

export default function Skills() {
  const prefersReduced = useReducedMotion();

  return (
    <section id="skills" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Toolkit"
          title="Technical Skills"
          description="Technologies I use to design, build, and ship full-stack web applications."
        />

        <div className="space-y-10 md:space-y-12">
          {Object.entries(skills).map(([category, items], catIndex) => {
            const meta = categoryMeta[category] || categoryMeta.Tools;
            const Icon = meta.icon;

            return (
              <motion.div
                key={category}
                initial={prefersReduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: prefersReduced ? 0 : catIndex * 0.05,
                }}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10"
                    style={{ color: meta.accent }}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl font-semibold">{category}</h3>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {items.map((skill) => {
                    const SkillIcon = iconMap[skill] || Code2;
                    return (
                      <motion.div
                        key={skill}
                        whileHover={
                          prefersReduced
                            ? undefined
                            : { y: -4, borderColor: "rgba(91,140,255,0.4)" }
                        }
                        transition={{ duration: 0.2 }}
                        className="group flex items-center gap-3 rounded-xl border border-white/8 bg-[#0d0d0d]/80 px-3.5 py-3.5"
                        data-cursor="hover"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white/5 text-[var(--accent)] transition-colors group-hover:bg-[rgba(91,140,255,0.12)]">
                          <SkillIcon size={15} aria-hidden="true" />
                        </span>
                        <span className="text-sm md:text-[15px] text-white/85">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
