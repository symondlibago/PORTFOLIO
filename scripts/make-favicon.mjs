/**
 * Generates the favicon set from a path-based SVG (no font dependency, so the
 * mark renders identically everywhere).
 *
 * Usage: node scripts/make-favicon.mjs [variant]   variant: mark | bracket | slab
 * Writes public/favicon.svg, favicon-16/32/48.png, apple-touch-icon.png,
 * favicon.ico and og-icon.png.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const BRAND = '#A855F7';
const BRAND_DEEP = '#7E22CE';
const INK = '#FFFFFF';

/* The S is drawn as a stroked bezier rather than text: thick, round-capped and
   legible down to 16px, and it can't be broken by a missing font. */
const S_PATH = 'M70 32 C70 21 30 21 30 37 C30 51 70 51 70 67 C70 83 30 83 30 71';

const variants = {
  // Solid brand tile, white S. Highest legibility at 16px.
  mark: `
    <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#g)"/>
    <path d="${S_PATH}" fill="none" stroke="${INK}" stroke-width="13"
          stroke-linecap="round" stroke-linejoin="round"/>`,
  // Developer bracket mark: </>
  bracket: `
    <rect x="0" y="0" width="100" height="100" rx="24" fill="url(#g)"/>
    <path d="M38 34 L22 50 L38 66" fill="none" stroke="${INK}" stroke-width="11"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M62 34 L78 50 L62 66" fill="none" stroke="${INK}" stroke-width="11"
          stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M56 26 L44 74" fill="none" stroke="${INK}" stroke-width="9"
          stroke-linecap="round" opacity="0.85"/>`,
  // Echoes the hero photo's slanted clip-path; S knocked out of the slab.
  slab: `
    <rect x="0" y="0" width="100" height="100" rx="24" fill="${INK}"/>
    <path d="M26 0 H100 V100 H74 Z" fill="url(#g)"/>
    <path d="${S_PATH}" fill="none" stroke="${BRAND_DEEP}" stroke-width="13"
          stroke-linecap="round" stroke-linejoin="round"/>`,
};

const svgFor = (name) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}"/>
      <stop offset="100%" stop-color="${BRAND_DEEP}"/>
    </linearGradient>
  </defs>
  ${variants[name]}
</svg>`;

/** Minimal ICO writer. ICO directory entries may hold raw PNG payloads. */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + 16 * pngs.length;
  const entries = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0); // width
    e.writeUInt8(size >= 256 ? 0 : size, 1); // height
    e.writeUInt8(0, 2); // palette
    e.writeUInt8(0, 3); // reserved
    e.writeUInt16LE(1, 4); // colour planes
    e.writeUInt16LE(32, 6); // bits per pixel
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const variant = process.argv[2] || 'mark';
if (!variants[variant]) {
  console.error(`unknown variant "${variant}" — choose: ${Object.keys(variants).join(' | ')}`);
  process.exit(1);
}

const svg = svgFor(variant);
const outDir = 'public';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);

const render = (size) => sharp(Buffer.from(svg), { density: 384 }).resize(size, size).png().toBuffer();

const icoSizes = [16, 32, 48];
const icoPngs = [];
for (const size of icoSizes) icoPngs.push({ size, data: await render(size) });
fs.writeFileSync(path.join(outDir, 'favicon.ico'), buildIco(icoPngs));

for (const size of [16, 32]) {
  fs.writeFileSync(path.join(outDir, `favicon-${size}.png`), await render(size));
}
fs.writeFileSync(path.join(outDir, 'apple-touch-icon.png'), await render(180));
fs.writeFileSync(path.join(outDir, 'og-icon.png'), await render(512));

console.log(`favicon set written from variant "${variant}":`);
for (const f of ['favicon.svg', 'favicon.ico', 'favicon-16.png', 'favicon-32.png', 'apple-touch-icon.png', 'og-icon.png']) {
  console.log(`  public/${f}  ${fs.statSync(path.join(outDir, f)).size} B`);
}
