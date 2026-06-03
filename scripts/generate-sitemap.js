/**
 * generate-sitemap.js
 *
 * Generates public/sitemap.xml from the PAGES list below.
 * Runs automatically before every build via the "prebuild" npm hook.
 *
 * To add a new page:
 *   1. Add its slug to the PAGES array
 *   2. The script handles DE + EN + hreflang + x-default automatically
 */

import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE = 'https://cemuener.de';

// ─── Add new pages here ────────────────────────────────────────────────────
const PAGES = [
  'dj',
  'developer',
  'impressum',
  'datenschutz',
];
// ──────────────────────────────────────────────────────────────────────────

function urlEntry(slug) {
  const de = `${BASE}/de/${slug}/`;
  const en = `${BASE}/en/${slug}/`;
  return [
    `  <url>`,
    `    <loc>${de}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${de}"/>`,
    `    <xhtml:link rel="alternate" hreflang="de" href="${de}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
    `  </url>`,
    `  <url>`,
    `    <loc>${en}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${de}"/>`,
    `    <xhtml:link rel="alternate" hreflang="de" href="${de}"/>`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>`,
    `  </url>`,
  ].join('\n');
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset`,
  `  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `  xmlns:xhtml="http://www.w3.org/1999/xhtml">`,
  ``,
  PAGES.map(urlEntry).join('\n\n'),
  ``,
  `</urlset>`,
].join('\n');

const out = resolve(__dirname, '../public/sitemap.xml');
writeFileSync(out, xml, 'utf-8');
console.log(`[sitemap] Generated ${PAGES.length * 2} URLs → public/sitemap.xml`);

