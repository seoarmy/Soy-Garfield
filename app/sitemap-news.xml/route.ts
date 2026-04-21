import { client } from '../../services/sanity';

export const revalidate = 3600; // regenerar cada hora

const BASE_URL = 'https://soygarfield.com';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString();

  const articles = await client.fetch<
    { slug: string; title: string; createdAt: string }[]
  >(
    `*[_type == "article" && _createdAt >= $cutoff] | order(_createdAt desc) {
      "slug": slug.current,
      "title": coalesce(seoTitle, title),
      "createdAt": _createdAt
    }`,
    { cutoff },
  );

  const urls = articles
    .map(
      (a) => `  <url>
    <loc>${BASE_URL}/article/${a.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>Soy Garfield</news:name>
        <news:language>es</news:language>
      </news:publication>
      <news:publication_date>${new Date(a.createdAt).toISOString()}</news:publication_date>
      <news:title>${escapeXml(a.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
