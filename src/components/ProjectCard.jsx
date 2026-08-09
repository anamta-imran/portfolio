"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

export default function ProjectCard({ project, onOpen, index = 0 }) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const onMove = (e) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setSpotlight({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
      opacity: 1,
    });
  };

  const handleActivate = () => {
    if (project.liveDemo) {
      window.open(project.liveDemo, "_blank", "noopener,noreferrer");
      return;
    }
    onOpen(project);
  };

  return (
    <motion.article
      layout
      ref={cardRef}
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{
        duration: 0.45,
        delay: prefersReduced ? 0 : index * 0.04,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseMove={onMove}
      onMouseLeave={() => setSpotlight((s) => ({ ...s, opacity: 0 }))}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleActivate();
        }
      }}
      role="button"
      tabIndex={0}
      data-cursor="hover"
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] text-left focus-ring"
      aria-label={
        project.liveDemo
          ? `Open live demo for ${project.title}`
          : `View details for ${project.title}`
      }
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(500px circle at ${spotlight.x}% ${spotlight.y}%, rgba(91,140,255,0.12), transparent 40%)`,
        }}
      />

      <div className="relative aspect-[16/10] overflow-hidden bg-[#111]">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/20 to-transparent opacity-80" />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm font-medium backdrop-blur-md">
            {project.liveDemo ? "View Live →" : "View Project →"}
          </span>
        </div>
      </div>

      <div className="relative z-[1] p-5 md:p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {project.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-white/40 transition-colors group-hover:text-[var(--accent)]"
            aria-hidden="true"
          />
        </div>

        <p className="mb-4 text-sm text-[var(--text-muted)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/75 hover:border-[var(--accent)]/40 hover:text-white focus-ring"
            >
              <Github size={14} aria-hidden="true" />
              GitHub
            </a>
          ) : null}
          {project.liveDemo ? (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-white/75 hover:border-[var(--accent)]/40 hover:text-white focus-ring"
            >
              <ExternalLink size={14} aria-hidden="true" />
              Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.article>
  );
}
