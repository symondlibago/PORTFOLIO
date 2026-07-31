/**
 * Captures full-page screenshots of a live site for a portfolio gallery.
 * Uses the locally installed Chrome (channel: 'chrome') so no browser download
 * is needed. Scrolls the whole page first so lazy-loaded images render.
 *
 * Usage: node scripts/capture-site.mjs <outDir> <prefix> <url> [url...]
 * Example: node scripts/capture-site.mjs public/nourish nourish https://atnourish.ca
 */
import { chromium } from 'playwright-core';
import fs from 'node:fs';
import path from 'node:path';

const [outDir, prefix, ...urls] = process.argv.slice(2);
if (!outDir || !prefix || !urls.length) {
  console.error('usage: node scripts/capture-site.mjs <outDir> <prefix> <url> [url...]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome' });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();

let i = 0;
for (const url of urls) {
  i++;
  const dest = path.join(outDir, `${prefix}${i}.png`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });

    // Scroll top-to-bottom to trigger lazy loading and scroll-linked animations,
    // then return to the top before capturing.
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          y += window.innerHeight;
          window.scrollTo(0, y);
          if (y < document.body.scrollHeight) setTimeout(step, 220);
          else resolve();
        };
        step();
      });
    });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(1500);

    // Let every image finish decoding before the shot.
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images)
          .filter((img) => !img.complete)
          .map((img) => new Promise((r) => { img.onload = img.onerror = r; }))
      )
    );

    await page.screenshot({ path: dest, fullPage: true });
    const { width, height } = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.body.scrollHeight,
    }));
    const mb = (fs.statSync(dest).size / 1048576).toFixed(2);
    console.log(`${dest}  ${width}x${height}  ${mb} MB  <- ${url}`);
  } catch (err) {
    console.error(`FAIL ${url}: ${err.message}`);
  }
}

await browser.close();
