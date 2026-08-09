const fs = require("fs");
const path = require("path");

function svg(title, subtitle, w = 1200, h = 750) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d0d12"/>
      <stop offset="55%" stop-color="#12121a"/>
      <stop offset="100%" stop-color="#0a1528"/>
    </linearGradient>
    <radialGradient id="r" cx="70%" cy="20%" r="50%">
      <stop offset="0%" stop-color="#5b8cff" stop-opacity="0.35"/>
      <stop offset="100%" stop-color="#5b8cff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#g)"/>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect x="48" y="48" width="${w - 96}" height="${h - 96}" rx="28" fill="none" stroke="rgba(255,255,255,0.1)"/>
  <text x="80" y="${h / 2 - 10}" fill="#f5f5f7" font-family="Segoe UI, Arial, sans-serif" font-size="48" font-weight="700">${title}</text>
  <text x="80" y="${h / 2 + 40}" fill="#a1a1aa" font-family="Segoe UI, Arial, sans-serif" font-size="24">${subtitle}</text>
</svg>`;
}

const projects = [
  ["HR Management System", "Laravel • PHP • MySQL"],
  ["BMW Car Website", "Next.js • React • Tailwind"],
  ["Student Management", "MERN • JWT • APIs"],
  ["Bookstore Website", "React • Redux • Node"],
  ["Food Delivery", "Next.js • Full Stack"],
  ["Movie Website", "React • Redux • REST"],
];

projects.forEach((p, i) => {
  fs.writeFileSync(
    path.join("public/images/projects", `project-${i + 1}.svg`),
    svg(p[0], p[1])
  );
});

for (let i = 1; i <= 4; i += 1) {
  fs.writeFileSync(
    path.join("public/images/ui-ux", `design-${i}.svg`),
    svg(`UI Concept 0${i}`, "Figma • Wireframe • Prototype", 1200, 800)
  );
}

fs.writeFileSync(
  "public/images/profile.svg",
  svg("Anamta Imran", "Full Stack Web Developer", 800, 1000)
);

console.log("placeholders created");
