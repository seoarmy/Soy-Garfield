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

async function generateSitemap() {
    console.log('🚀 Iniciando generación de sitemap dinámico...');

    try {
        // 1. Fetch articles from Sanity
        const articles = await client.fetch(`*[_type == "article"] { "slug": slug.current, "date": _updatedAt }`);
        console.log(`✅ ${articles.length} artículos encontrados.`);

        // 2. Define static routes
        const staticRoutes = [
            '',
            '/about',
            '/contact',
            '/authors',
            '/write',
            '/category/seo',
            '/category/ia',
        ];

        const today = new Date().toISOString().split('T')[0];

        // 3. Construct XML
        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
        xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        // Static routes
        staticRoutes.forEach(route => {
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}${route}</loc>\n`;
            xml += `    <lastmod>${today}</lastmod>\n`;
            xml += `    <changefreq>${route === '' ? 'daily' : 'weekly'}</changefreq>\n`;
            xml += `    <priority>${route === '' ? '1.0' : '0.8'}</priority>\n`;
            xml += `  </url>\n`;
        });

        // Dynamic article routes
        articles.forEach(article => {
            const lastMod = article.date ? new Date(article.date).toISOString().split('T')[0] : today;
            xml += `  <url>\n`;
            xml += `    <loc>${baseUrl}/article/${article.slug}</loc>\n`;
            xml += `    <lastmod>${lastMod}</lastmod>\n`;
            xml += `    <changefreq>monthly</changefreq>\n`;
            xml += `    <priority>0.9</priority>\n`;
            xml += `  </url>\n`;
        });

        xml += `</urlset>`;

        // 4. Write to public and dist folders
        const publicPath = path.join(process.cwd(), 'public', 'sitemap.xml');
        const distPath = path.join(process.cwd(), 'dist', 'sitemap.xml');

        fs.writeFileSync(publicPath, xml);
        console.log(`✨ Sitemap guardado en: ${publicPath}`);

        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
            fs.writeFileSync(distPath, xml);
            console.log(`✨ Sitemap copiado a: ${distPath}`);
        }

        console.log('🎯 Generación de sitemap completada con éxito.');
    } catch (error) {
        console.error('❌ Error generando sitemap:', error);
        process.exit(1);
    }
}

generateSitemap();
