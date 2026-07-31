/**
 * Converts every PNG under public/ and src/ to AVIF, written alongside the
 * original. Originals are left in place; run scripts/archive-png.mjs afterwards
 * to move them out of the build.
 *
 * chromaSubsampling 4:4:4 is deliberate: these are UI mockups full of small
 * text, and the default 4:2:0 blurs coloured text edges.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const QUALITY = 62;
const EFFORT = 6; // 0-9, higher = slower encode, smaller file
const CONCURRENCY = 4;

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.png$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = [...walk('public'), ...walk('src')];
let done = 0;
let pngBytes = 0;
let avifBytes = 0;
const failures = [];

async function convert(src) {
  const dest = src.replace(/\.png$/i, '.avif');
  try {
    await sharp(src)
      .avif({ quality: QUALITY, effort: EFFORT, chromaSubsampling: '4:4:4' })
      .toFile(dest);
    const before = fs.statSync(src).size;
    const after = fs.statSync(dest).size;
    pngBytes += before;
    avifBytes += after;
    done++;
    const pct = (100 - (after / before) * 100).toFixed(0);
    console.log(`[${done}/${files.length}] ${src} -${pct}%`);
  } catch (err) {
    failures.push({ src, err: err.message });
    console.error(`FAIL ${src}: ${err.message}`);
  }
}

// simple fixed-size worker pool
const queue = [...files];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) await convert(queue.shift());
  })
);

const mb = (b) => (b / 1048576).toFixed(1);
console.log('\n=== done ===');
console.log(`converted : ${done}/${files.length}`);
console.log(`png       : ${mb(pngBytes)} MB`);
console.log(`avif      : ${mb(avifBytes)} MB`);
console.log(`saved     : ${mb(pngBytes - avifBytes)} MB (${(100 - (avifBytes / pngBytes) * 100).toFixed(1)}%)`);
if (failures.length) {
  console.log(`\nfailures (${failures.length}):`);
  for (const f of failures) console.log(`  ${f.src}: ${f.err}`);
  process.exitCode = 1;
}
