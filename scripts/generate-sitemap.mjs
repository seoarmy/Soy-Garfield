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

async function generateSitemaps() {
    console.log('Generando sitemaps...');

    try {
        const [articles, tagResults] = await Promise.all([
            client.fetch(
                `*[_type == "article"] | order(_updatedAt desc) { "slug": slug.current, "date": date, "updatedAt": _updatedAt, title, category, tags }`
            ),
            client.fetch(`*[_type == "article" && defined(tags)] { tags }.tags`),
        ]);
        console.log(`${articles.length} artículos encontrados.`);

        const allTags = [...new Set(tagResults.flat())];

        const staticRoutes = [
            { path: '', freq: 'daily', priority: '1.0' },
            { path: '/about', freq: 'weekly', priority: '0.8' },
            { path: '/contact', freq: 'weekly', priority: '0.7' },
            { path: '/authors', freq: 'weekly', priority: '0.6' },
            { path: '/category/seo', freq: 'daily', priority: '0.9' },
            { path: '/category/ia', freq: 'daily', priority: '0.9' },
            { path: '/sobre/politica-editorial', freq: 'monthly', priority: '0.5' },
        ];

        const today = new Date().toISOString().split('T')[0];

        // ── Main sitemap ──────────────────────────────────────────────────────────
        let mainXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        mainXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        staticRoutes.forEach(r => {
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}${r.path}</loc>\n`;
            mainXml += `    <lastmod>${today}</lastmod>\n`;
            mainXml += `    <changefreq>${r.freq}</changefreq>\n`;
            mainXml += `    <priority>${r.priority}</priority>\n`;
            mainXml += `  </url>\n`;
        });

        articles.forEach(a => {
            const lastMod = a.updatedAt ? new Date(a.updatedAt).toISOString().split('T')[0] : today;
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}/article/${a.slug}</loc>\n`;
            mainXml += `    <lastmod>${lastMod}</lastmod>\n`;
            mainXml += `    <changefreq>monthly</changefreq>\n`;
            mainXml += `    <priority>0.9</priority>\n`;
            mainXml += `  </url>\n`;
        });

        allTags.forEach(tag => {
            const tagSlug = encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
            mainXml += `  <url>\n`;
            mainXml += `    <loc>${baseUrl}/tag/${tagSlug}</loc>\n`;
            mainXml += `    <lastmod>${today}</lastmod>\n`;
            mainXml += `    <changefreq>weekly</changefreq>\n`;
            mainXml += `    <priority>0.6</priority>\n`;
            mainXml += `  </url>\n`;
        });

        mainXml += `</urlset>`;

        // ── Google News sitemap (articles from last 48 hours) ────────────────────
        const cutoff = new Date(Date.now() - 48 * 60 * 60 * 1000);
        const recentArticles = articles.filter(a => a.date && new Date(a.date) >= cutoff);

        let newsXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        newsXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
        newsXml += `        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n`;

        recentArticles.forEach(a => {
            const pubDate = a.date ? new Date(a.date).toISOString() : new Date().toISOString();
            newsXml += `  <url>\n`;
            newsXml += `    <loc>${baseUrl}/article/${a.slug}</loc>\n`;
            newsXml += `    <news:news>\n`;
            newsXml += `      <news:publication>\n`;
            newsXml += `        <news:name>Soy Garfield</news:name>\n`;
            newsXml += `        <news:language>es</news:language>\n`;
            newsXml += `      </news:publication>\n`;
            newsXml += `      <news:publication_date>${pubDate}</news:publication_date>\n`;
            newsXml += `      <news:title>${a.title.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</news:title>\n`;
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
