import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const client = createClient({
    projectId: 'f3fmo00w',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-10',
});

const baseUrl = 'https://soygarfield.com';

const normalizeTag = (tag) => tag.toLowerCase().replace(/\s+/g, '-');

const escapeXml = (str = '') =>
    str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

async function generateSitemaps() {
    console.log('Generando sitemaps...');

    try {
        const [articles, tagResults, authors] = await Promise.all([
            client.fetch(
                `*[_type == "article"] | order(_updatedAt desc) {
                  "slug": slug.current,
                  "date": date,
                  "createdAt": _createdAt,
                  "updatedAt": _updatedAt,
                  title,
                  category,
                  tags
                }`
            ),
            client.fetch(`*[_type == "article" && defined(tags)] { tags }.tags`),
            client.fetch(`*[_type == "author" && defined(slug.current)] { "slug": slug.current }`),
        ]);
        console.log(`${articles.length} artículos encontrados.`);

        const tagCountMap = new Map();
        tagResults.flat().forEach((tag) => {
            const normalized = normalizeTag(tag);
            tagCountMap.set(normalized, (tagCountMap.get(normalized) || 0) + 1);
        });
        const sitemapTags = [...tagCountMap.entries()]
            .filter(([, count]) => count >= 3)
            .map(([tag]) => tag)
            .sort();

        const staticRoutes = [
            { path: '', lastmod: new Date().toISOString() },
            { path: '/about', lastmod: '2025-01-01T00:00:00.000Z' },
            { path: '/author/pietro-fiorillo', lastmod: '2025-01-01T00:00:00.000Z' },
            { path: '/contact', lastmod: '2025-01-01T00:00:00.000Z' },
            { path: '/authors', lastmod: '2025-01-01T00:00:00.000Z' },
            { path: '/tag', lastmod: new Date().toISOString() },
            { path: '/category/seo', lastmod: new Date().toISOString() },
            { path: '/category/ia', lastmod: new Date().toISOString() },
            { path: '/sobre/politica-editorial', lastmod: '2025-01-01T00:00:00.000Z' },
        ];

        // ── Main sitemap ──────────────────────────────────────────────────────────
        let mainXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        mainXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticRoutes.forEach(r => {
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}${r.path}</loc>\n`;
            mainXml += `    <lastmod>${new Date(r.lastmod).toISOString()}</lastmod>\n`;
            mainXml += `  </url>\n`;
        });

        authors.forEach((a) => {
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}/author/${a.slug}</loc>\n`;
            mainXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            mainXml += `  </url>\n`;
        });

        articles.forEach(a => {
            const lastMod = a.updatedAt ? new Date(a.updatedAt).toISOString() : new Date().toISOString();
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}/article/${a.slug}</loc>\n`;
            mainXml += `    <lastmod>${lastMod}</lastmod>\n`;
            mainXml += `  </url>\n`;
        });

        sitemapTags.forEach(tag => {
            const tagSlug = encodeURIComponent(tag);
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}/tag/${tagSlug}</loc>\n`;
            mainXml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
            mainXml += `  </url>\n`;
        });

        mainXml += `</urlset>`;

        // ── Google News sitemap (articles from last 48 hours) ────────────────────
        const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const recentArticles = articles.filter(a => a.createdAt && new Date(a.createdAt) >= cutoff);

        let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
        newsXml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

        recentArticles.forEach(a => {
            const pubDate = a.createdAt ? new Date(a.createdAt).toISOString() : new Date().toISOString();
            newsXml += `  <url>\n`;
            newsXml += `    <loc>${baseUrl}/article/${a.slug}</loc>\n`;
            newsXml += `    <news:news>\n`;
            newsXml += `      <news:publication>\n`;
            newsXml += `        <news:name>Soy Garfield</news:name>\n`;
            newsXml += `        <news:language>es</news:language>\n`;
            newsXml += `      </news:publication>\n`;
            newsXml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
            newsXml += `      <news:title>${escapeXml(a.title)}</news:title>\n`;
            newsXml += `    </news:news>\n`;
            newsXml += `  </url>\n`;
        });

        newsXml += `</urlset>`;

        // ── Write files ───────────────────────────────────────────────────────────
        const publicDir = path.join(process.cwd(), 'public');
        const distDir = path.join(process.cwd(), 'dist');

        fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), mainXml);
        fs.writeFileSync(path.join(publicDir, 'sitemap-news.xml'), newsXml);
        console.log(`sitemap.xml: ${articles.length} URLs`);
        console.log(`sitemap-news.xml: ${recentArticles.length} artículos recientes (últimas 48h)`);

        if (fs.existsSync(distDir)) {
            fs.writeFileSync(path.join(distDir, 'sitemap.xml'), mainXml);
            fs.writeFileSync(path.join(distDir, 'sitemap-news.xml'), newsXml);
        }

        console.log('Sitemaps generados con éxito.');
    } catch (error) {
        console.error('Error generando sitemaps:', error);
        process.exit(1);
    }
}

generateSitemaps();
