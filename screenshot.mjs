// Full-page screenshot via puppeteer-core driving the system Chrome.
// Usage: node screenshot.mjs http://localhost:3000 [label]
// Saves auto-incremented PNGs to ./temporary screenshots/ (never overwrites).
import puppeteer from 'puppeteer-core';
import { mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const url = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const outDir = fileURLToPath(new URL('./temporary screenshots/', import.meta.url));

await mkdir(outDir, { recursive: true });

// Determine next index so we never overwrite.
let next = 1;
try {
  const files = await readdir(outDir);
  const nums = files
    .map((f) => /^screenshot-(\d+)/.exec(f))
    .filter(Boolean)
    .map((m) => parseInt(m[1], 10));
  if (nums.length) next = Math.max(...nums) + 1;
} catch {}

const outPath = join(outDir, `screenshot-${next}${label}.png`);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--force-device-scale-factor=1'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
// Give web fonts / lazy assets a moment to settle.
await new Promise((r) => setTimeout(r, 1200));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Saved ${outPath}`);
