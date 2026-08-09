const { PDFDocument, StandardFonts, rgb } = require("pdf-lib");
const fs = require("fs");
const path = require("path");

const resume = {
  name: "Anamta Imran",
  title: "Full Stack Web Developer",
  email: "anamtaimran208@gmail.com",
  github: "https://github.com/anamta-imran",
  linkedin: "https://www.linkedin.com/in/anamtaimran/",
  summary:
    "Full Stack Web Developer skilled in building modern, scalable, and user-focused web applications. Experienced across frontend and backend development with Laravel, PHP, Node.js, Express.js, MERN Stack, Next.js, React.js, and Redux. Comfortable delivering complete products including APIs, authentication, databases, and responsive interfaces.",
  skills: {
    Frontend: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Next.js",
      "Tailwind CSS",
      "Redux",
      "Redux Toolkit",
    ],
    Backend: [
      "PHP",
      "Laravel",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "JWT",
    ],
    Database: ["MongoDB", "MongoDB Atlas", "MySQL"],
    Tools: ["Git", "GitHub", "Postman", "VS Code", "Figma", "Cursor"],
  },
  projects: [
    {
      title: "HR Management System",
      description:
        "Human resources platform for employee management, attendance, leave workflows, and role-based access.",
      tech: "Laravel, PHP, MySQL, REST APIs",
      link: "https://hr-management-systum.netlify.app/",
    },
    {
      title: "BMW Car Website",
      description:
        "Premium automotive showcase website with modern UI and immersive browsing experience.",
      tech: "React.js, Next.js, Tailwind CSS",
      link: "https://bmw-showcase.netlify.app/",
    },
    {
      title: "Bookstore Website",
      description:
        "Online bookstore with catalog browsing, category filters, and shopping-focused interface.",
      tech: "React.js, Redux Toolkit, Node.js, MongoDB",
      link: "https://mybookstorelibrary.netlify.app/",
    },
    {
      title: "Biya's Kitchen",
      description:
        "Food and kitchen web experience with menu browsing and polished restaurant-style UI.",
      tech: "Next.js, React.js, Tailwind CSS",
      link: "https://biyas-kitchen.netlify.app/",
    },
    {
      title: "Movie Website",
      description:
        "Movie discovery website with browsing, search, and detailed title pages.",
      tech: "React.js, Redux, REST APIs",
      link: "https://m0viehub.netlify.app/",
    },
    {
      title: "Student Management System",
      description:
        "Full-stack system for students, courses, enrollments, and academic records with authentication.",
      tech: "Node.js, Express.js, MongoDB, React.js, JWT",
      link: "",
    },
  ],
  highlights: [
    "Built full-stack applications covering frontend, backend, databases, and REST APIs",
    "Developed authentication systems, CRUD workflows, and role-based application features",
    "Created responsive interfaces with React, Next.js, and modern CSS tooling",
    "Worked with MongoDB, MySQL, Laravel, Node.js, and Express.js on project-based work",
  ],
};

async function createResume() {
  const pdfDoc = await PDFDocument.create();
  const pageSize = [595.28, 841.89]; // A4
  let page = pdfDoc.addPage(pageSize);
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  const black = rgb(0.08, 0.08, 0.08);
  const muted = rgb(0.35, 0.35, 0.38);
  const accent = rgb(0.28, 0.42, 0.85);
  const line = rgb(0.85, 0.85, 0.88);

  let y = height - 48;
  const left = 48;
  const right = width - 48;
  const maxWidth = right - left;

  const ensureSpace = (needed) => {
    if (y - needed < 48) {
      page = pdfDoc.addPage(pageSize);
      y = height - 48;
    }
  };

  const wrapText = (text, usedFont, size, max) => {
    const words = text.split(/\s+/);
    const lines = [];
    let current = "";
    words.forEach((word) => {
      const next = current ? `${current} ${word}` : word;
      if (usedFont.widthOfTextAtSize(next, size) <= max) {
        current = next;
      } else {
        if (current) lines.push(current);
        current = word;
      }
    });
    if (current) lines.push(current);
    return lines;
  };

  const drawText = (text, x, size, usedFont, color = black) => {
    page.drawText(text, {
      x,
      y,
      size,
      font: usedFont,
      color,
    });
  };

  const sectionTitle = (title) => {
    ensureSpace(36);
    y -= 10;
    drawText(title.toUpperCase(), left, 11, fontBold, accent);
    y -= 8;
    page.drawLine({
      start: { x: left, y },
      end: { x: right, y },
      thickness: 1,
      color: line,
    });
    y -= 16;
  };

  // Header
  drawText(resume.name, left, 24, fontBold, black);
  y -= 22;
  drawText(resume.title, left, 13, font, accent);
  y -= 18;

  const contact = `${resume.email}  |  ${resume.github}  |  ${resume.linkedin}`;
  wrapText(contact, font, 9, maxWidth).forEach((l) => {
    drawText(l, left, 9, font, muted);
    y -= 12;
  });

  y -= 8;
  sectionTitle("Professional Summary");
  wrapText(resume.summary, font, 10, maxWidth).forEach((l) => {
    ensureSpace(14);
    drawText(l, left, 10, font, black);
    y -= 13;
  });

  sectionTitle("Technical Skills");
  Object.entries(resume.skills).forEach(([category, items]) => {
    ensureSpace(28);
    drawText(`${category}:`, left, 10, fontBold, black);
    y -= 13;
    wrapText(items.join(" • "), font, 10, maxWidth).forEach((l) => {
      ensureSpace(14);
      drawText(l, left, 10, font, muted);
      y -= 13;
    });
    y -= 4;
  });

  sectionTitle("Featured Projects");
  resume.projects.forEach((project) => {
    ensureSpace(70);
    drawText(project.title, left, 11, fontBold, black);
    y -= 14;
    wrapText(project.description, font, 10, maxWidth).forEach((l) => {
      ensureSpace(14);
      drawText(l, left, 10, font, black);
      y -= 13;
    });
    wrapText(`Tech: ${project.tech}`, font, 9, maxWidth).forEach((l) => {
      ensureSpace(12);
      drawText(l, left, 9, font, muted);
      y -= 12;
    });
    if (project.link) {
      wrapText(project.link, font, 9, maxWidth).forEach((l) => {
        ensureSpace(12);
        drawText(l, left, 9, font, accent);
        y -= 12;
      });
    }
    y -= 8;
  });

  sectionTitle("Development Highlights");
  resume.highlights.forEach((item) => {
    ensureSpace(28);
    const lines = wrapText(`•  ${item}`, font, 10, maxWidth);
    lines.forEach((l) => {
      ensureSpace(14);
      drawText(l, left, 10, font, black);
      y -= 13;
    });
    y -= 2;
  });

  y -= 8;
  ensureSpace(24);
  drawText(
    "Open to internships, freelance work, and full-time opportunities.",
    left,
    9,
    font,
    muted
  );

  const outPath = path.join(process.cwd(), "public", "resume.pdf");
  fs.writeFileSync(outPath, await pdfDoc.save());
  console.log(`Resume written to ${outPath}`);
}

createResume().catch((err) => {
  console.error(err);
  process.exit(1);
});
