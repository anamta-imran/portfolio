"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { projects } from "@/data/projects";

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" className="relative py-20 md:py-28">
      <div className="section-pad container-max">
        <SectionHeading
          eyebrow="Selected Work"
          title="Featured Projects"
          description="Some of the projects I've built using modern frontend and backend technologies."
        />

        <motion.div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={setSelected}
            />
          ))}
        </motion.div>
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
