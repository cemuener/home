import type { APIRoute } from 'astro';

const BASE = 'https://cemuener.de';

// Pages that should appear in the sitemap.
// Each entry = one canonical slug shared by both languages.
// x-default points to the German (primary) version.
const pages = [
  { slug: 'dj' },
  { slug: 'developer' },
  { slug: 'impressum' },
  { slug: 'datenschutz' },
];

function url(lang: 'de' | 'en', slug: string) {
  return `${BASE}/${lang}/${slug}/`;
}

function urlEntry(lang: 'de' | 'en', slug: string) {
  const de = url('de', slug);
  const en = url('en', slug);
  return `
  <url>
    <loc>${url(lang, slug)}</loc>
    <xhtml:link rel="alternate" hreflang="x-default" href="${de}"/>
    <xhtml:link rel="alternate" hreflang="de" href="${de}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
  </url>`;
}

export const GET: APIRoute = () => {
  const entries = pages.flatMap(({ slug }) => [
    urlEntry('de', slug),
    urlEntry('en', slug),
  ]);

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
>${entries.join('')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};

