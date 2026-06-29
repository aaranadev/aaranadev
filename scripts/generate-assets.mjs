// Generates raster brand assets (app icons + OG image) from inline SVG.
// Run with: pnpm gen:assets
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = join(root, "public");

const CANVAS = "#0f172a";
const SURFACE = "#1e293b";
const BORDER = "#334155";
const TEXT = "#eaf1ff";
const MUTED = "#94a3b8";
const PRIMARY = "#38bdf8";
const SECONDARY = "#8792fe";

// The filled AA >_ logo mark, parameterised by fill colour.
function logoMark(fg) {
  return `
    <text x="24" y="30" text-anchor="middle" fill="${fg}" font-family="sans-serif" font-weight="800" font-size="30" letter-spacing="-1">AA</text>
    <text x="24" y="44" text-anchor="middle" fill="${fg}" font-family="monospace" font-weight="700" font-size="12">&gt;_</text>`;
}

function iconSvg(size) {
  const r = Math.round(size * 0.22);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${r}" fill="${CANVAS}" />
    <g transform="translate(${size * 0.14} ${size * 0.14}) scale(${(size * 0.72) / 48})">
      ${logoMark(TEXT)}
    </g>
  </svg>`;
}

const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="dot" cx="0" cy="0" r="1">
      <stop offset="0" stop-color="${BORDER}" stop-opacity="0.5"/>
      <stop offset="1" stop-color="${BORDER}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1.5" cy="1.5" r="1.5" fill="${BORDER}" fill-opacity="0.35"/>
    </pattern>
    <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${CANVAS}" stop-opacity="0.1"/>
      <stop offset="1" stop-color="${CANVAS}" stop-opacity="0.9"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="${CANVAS}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#fade)"/>

  <!-- window frame -->
  <rect x="64" y="64" width="1072" height="502" rx="20" fill="${SURFACE}" fill-opacity="0.55" stroke="${BORDER}"/>
  <line x1="64" y1="116" x2="1136" y2="116" stroke="${BORDER}"/>
  <circle cx="96" cy="90" r="6" fill="${BORDER}"/>
  <circle cx="118" cy="90" r="6" fill="${BORDER}"/>
  <circle cx="140" cy="90" r="6" fill="${BORDER}"/>
  <text x="168" y="95" fill="${MUTED}" font-family="monospace" font-size="16">portfolio.ts — node</text>

  <g transform="translate(110 168)">
    <text fill="${PRIMARY}" font-family="monospace" font-size="22" letter-spacing="2">&gt; INITIALIZING STRICT_MODE...</text>
    <text y="120" fill="${TEXT}" font-family="sans-serif" font-weight="700" font-size="104" letter-spacing="-3">Alberto Arana</text>

    <g transform="translate(0 165)">
      <rect width="430" height="44" rx="6" fill="${SURFACE}" stroke="${BORDER}"/>
      <text x="20" y="29" fill="${SECONDARY}" font-family="monospace" font-size="18">PRINCIPAL_SOFTWARE_ENGINEER.js</text>
    </g>

    <text y="268" fill="${MUTED}" font-family="monospace" font-size="22">
      <tspan fill="${MUTED}">const</tspan> <tspan fill="${SECONDARY}">profiles</tspan> = { <tspan fill="${PRIMARY}">github</tspan>, <tspan fill="${PRIMARY}">linkedin</tspan> };
    </text>
  </g>

  <g transform="translate(980 150) scale(2.4)">
    ${logoMark(TEXT)}
  </g>
</svg>`;

await mkdir(publicDir, { recursive: true });

const targets = [
  { name: "favicon-32.png", svg: iconSvg(32) },
  { name: "apple-touch-icon.png", svg: iconSvg(180) },
  { name: "icon-192.png", svg: iconSvg(192) },
  { name: "icon-512.png", svg: iconSvg(512) },
];

for (const t of targets) {
  const out = join(publicDir, t.name);
  await sharp(Buffer.from(t.svg)).png().toFile(out);
  console.log("wrote", t.name);
}

await sharp(Buffer.from(ogSvg)).png().toFile(join(publicDir, "og.png"));
console.log("wrote og.png");

// Optimize the decorative hero "code wall" background to WebP.
const heroSource = join(root, "scripts", "sources", "hero-bg.png");
await mkdir(join(publicDir, "images"), { recursive: true });
await sharp(heroSource)
  .resize({ width: 1600, withoutEnlargement: true })
  .webp({ quality: 70 })
  .toFile(join(publicDir, "images", "hero-bg.webp"));
console.log("wrote images/hero-bg.webp");

// Keep a copy of the raw OG SVG for future edits.
await writeFile(join(root, "scripts", "og.svg"), ogSvg);
console.log("done");
