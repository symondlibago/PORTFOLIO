/**
 * Moves every PNG that now has an AVIF sibling into _png-originals/, preserving
 * directory structure. Nothing is deleted — _png-originals/ sits outside public/
 * and src/, so it is not served in dev and not included in the build.
 *
 * To restore: move the files back from _png-originals/.
 */
import fs from 'node:fs';
import path from 'node:path';

const ARCHIVE = '_png-originals';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.png$/i.test(e.name)) out.push(p);
  }
  return out;
}

const files = [...walk('public'), ...walk('src')];
let moved = 0;
const skipped = [];

for (const src of files) {
  const avif = src.replace(/\.png$/i, '.avif');
  if (!fs.existsSync(avif)) {
    skipped.push(src); // no AVIF counterpart — leave it alone
    continue;
  }
  const dest = path.join(ARCHIVE, src);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.renameSync(src, dest);
  moved++;
}

console.log(`moved ${moved} PNG(s) into ${ARCHIVE}/`);
if (skipped.length) {
  console.log(`left in place (no AVIF sibling): ${skipped.length}`);
  for (const s of skipped) console.log(`  ${s}`);
}
