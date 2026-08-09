import { siteConfig } from "./site";
import { projects } from "./projects";
import { skills } from "./skills";

export const resumeData = {
  name: siteConfig.name,
  title: siteConfig.title,
  email: siteConfig.email,
  github: siteConfig.github,
  linkedin: siteConfig.linkedin,
  location: "Available for remote / on-site opportunities",
  summary:
    "Full Stack Web Developer skilled in building modern, scalable, and user-focused web applications. Experienced across frontend and backend development with Laravel, PHP, Node.js, Express.js, MERN Stack, Next.js, React.js, and Redux. Comfortable delivering complete products including APIs, authentication, databases, and responsive interfaces.",
  skills,
  projects: projects.map((project) => ({
    title: project.title,
    description: project.description,
    technologies: project.technologies,
    liveDemo: project.liveDemo,
  })),
  journey: [
    "Built full-stack applications covering frontend, backend, databases, and REST APIs",
    "Developed authentication systems, CRUD workflows, and role-based application features",
    "Created responsive UI experiences with React, Next.js, and modern CSS tooling",
    "Worked with MongoDB, MySQL, Laravel, Node.js, and Express.js across project-based work",
  ],
  educationNote:
    "Continuously learning and applying modern web technologies through real project development.",
};
