/**
 * Generates the favicon set.
 *
 * The panda is pure geometry (circles and ellipses), so it renders identically
 * everywhere with no font dependency and stays readable at 16px — ears, eye
 * patches and nose are the only features that survive at that size, so nothing
 * finer is drawn.
 *
 * Usage: node scripts/make-favicon.mjs [variant]
 *   variant: brand | ink | paper   (default: brand)
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const BRAND = '#6d28d9';
const INK = '#0b0b0b';
const PAPER = '#ffffff';

const variants = {
  // Flat brand tile — visible against both light and dark browser chrome.
  brand: { bg: BRAND, fur: PAPER, mark: INK },
  // Near-black tile, matching the site's solid black buttons.
  ink: { bg: INK, fur: PAPER, mark: '#0b0b0b' },
  // Paper tile, matching the light theme.
  paper: { bg: PAPER, fur: '#f4f4f4', mark: INK },
  // No tile at all — the panda alone on transparency.
  plain: { bg: null, fur: PAPER, mark: INK },
};

const variant = process.argv[2] || 'brand';
if (!variants[variant]) {
  console.error(`unknown variant "${variant}" — choose: ${Object.keys(variants).join(' | ')}`);
  process.exit(1);
}
const v = variants[variant];

/**
 * On the ink variant the ears would disappear into the tile, so they get a thin
 * fur-coloured ring to keep the silhouette readable.
 */
const earStroke = variant === 'ink' ? `stroke="${v.fur}" stroke-width="10"` : '';

/**
 * With no tile, the black ears sit directly on the browser's own tab colour and
 * vanish against a dark one. An SVG favicon can respond to the browser theme,
 * so on dark chrome the black shapes get a light keyline to keep the silhouette.
 * (The .ico fallback is static and is rendered for light chrome.)
 */
const themeAwareCss = v.bg
  ? ''
  : `<style>
      @media (prefers-color-scheme: dark) {
        .k { stroke: #fafafa; stroke-width: 16; paint-order: stroke; }
      }
    </style>`;

/**
 * The tile is a full-bleed circle, not a square. The panda is scaled to 0.88
 * about the centre and nudged up so the ears and chin sit inside the disc —
 * at r=256 the untouched artwork grazes the edge.
 */
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  ${themeAwareCss}
  ${v.bg ? `<circle cx="256" cy="256" r="256" fill="${v.bg}"/>` : ''}

  <g transform="translate(256 248) scale(0.88) translate(-256 -256)">
    <!-- ears, drawn first so the face overlaps their base -->
    <circle class="k" cx="142" cy="152" r="68" fill="${v.mark}" ${earStroke}/>
    <circle class="k" cx="370" cy="152" r="68" fill="${v.mark}" ${earStroke}/>

    <!-- face -->
    <ellipse cx="256" cy="288" rx="174" ry="160" fill="${v.fur}"/>

    <!-- eye patches, tilted inward the way a panda's actually sit -->
    <ellipse cx="180" cy="266" rx="55" ry="73" fill="${v.mark}" transform="rotate(-20 180 266)"/>
    <ellipse cx="332" cy="266" rx="55" ry="73" fill="${v.mark}" transform="rotate(20 332 266)"/>

    <!-- eyes -->
    <circle cx="188" cy="256" r="19" fill="${v.fur}"/>
    <circle cx="324" cy="256" r="19" fill="${v.fur}"/>

    <!-- nose + mouth -->
    <ellipse cx="256" cy="356" rx="32" ry="24" fill="${v.mark}"/>
    <path d="M256 380 q0 26 -30 26 M256 380 q0 26 30 26"
          fill="none" stroke="${v.mark}" stroke-width="13" stroke-linecap="round"/>
  </g>
</svg>`;

/** Minimal ICO writer. ICO directory entries may hold raw PNG payloads. */
function buildIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);

  let offset = 6 + 16 * pngs.length;
  const entries = [];
  for (const { size, data } of pngs) {
    const e = Buffer.alloc(16);
    e.writeUInt8(size >= 256 ? 0 : size, 0);
    e.writeUInt8(size >= 256 ? 0 : size, 1);
    e.writeUInt8(0, 2);
    e.writeUInt8(0, 3);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(data.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += data.length;
    entries.push(e);
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.data)]);
}

const outDir = 'public';
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'favicon.svg'), svg);

const render = (size) =>
  sharp(Buffer.from(svg), { density: 512 }).resize(size, size, { kernel: 'lanczos3' }).png().toBuffer();

const icoPngs = [];
for (const size of [16, 32, 48]) icoPngs.push({ size, data: await render(size) });
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
