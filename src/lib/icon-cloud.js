import {
  siReact, siLaravel, siTailwindcss, siMysql,
  siJavascript, siPhp, siTypescript, siAstro,
} from 'simple-icons';

/**
 * Stack icons that drift around the portrait — the equivalent of the floating
 * logo clouds on the reference site, built from the stack this portfolio
 * actually uses.
 *
 * Paths come from the `simple-icons` package rather than being transcribed by
 * hand: they are long, and a single mistyped character silently corrupts the
 * glyph. All are 24x24 viewBox, CC0.
 */
export const ICON_PATHS = {
  React: siReact.path,
  Laravel: siLaravel.path,
  'Tailwind CSS': siTailwindcss.path,
  MySQL: siMysql.path,
  JavaScript: siJavascript.path,
  PHP: siPhp.path,
  TypeScript: siTypescript.path,
  Astro: siAstro.path,
};

/** Where each cluster sits relative to the portrait, and how big it is. */
export const CLOUD_ITEMS = [
  { key: 'React', x: -2.55, y: 1.15, z: -1.6, s: 0.62 },
  { key: 'Laravel', x: 2.45, y: 1.45, z: -1.9, s: 0.58 },
  { key: 'Tailwind CSS', x: -2.95, y: -0.55, z: -1.2, s: 0.6 },
  { key: 'JavaScript', x: 2.85, y: -0.35, z: -1.4, s: 0.55 },
  { key: 'MySQL', x: -2.15, y: -1.75, z: -2.1, s: 0.55 },
  { key: 'PHP', x: 2.25, y: -1.85, z: -1.7, s: 0.58 },
  { key: 'TypeScript', x: -3.35, y: 0.35, z: -2.4, s: 0.48 },
  { key: 'Astro', x: 3.3, y: 0.6, z: -2.3, s: 0.5 },
];
