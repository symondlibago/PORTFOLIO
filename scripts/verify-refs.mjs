/**
 * Checks that every image path referenced from src/ actually exists on disk.
 * Public-root paths ("/kohi/x.avif") resolve against public/; relative imports
 * resolve against the referencing file.
 */
import fs from 'node:fs';
import path from 'node:path';

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (e.name !== 'node_modules') walk(p, out); }
    else if (/\.(jsx?|tsx?)$/i.test(e.name)) out.push(p);
  }
  return out;
}

const missing = [];
let checked = 0;

for (const file of walk('src')) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/['"]([^'"]*\.(?:avif|png|jpe?g|webp|svg))['"]/gi)) {
    const ref = m[1];
    if (/^https?:\/\//i.test(ref)) continue;
    const resolved = ref.startsWith('/')
      ? path.join('public', ref)
      : path.resolve(path.dirname(file), ref);
    checked++;
    if (!fs.existsSync(resolved)) missing.push(`${file} -> ${ref}`);
  }
}

console.log(`checked ${checked} image references`);
if (missing.length) {
  console.log(`MISSING (${missing.length}):`);
  for (const m of missing) console.log(`  ${m}`);
  process.exitCode = 1;
} else {
  console.log('all referenced images exist');
}
