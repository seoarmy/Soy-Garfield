import { MetadataRoute } from 'next';
import { client } from '../services/sanity';

export const revalidate = 3600; // regenerar cada hora

const BASE_URL = 'https://soygarfield.com';

const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date() },
    { url: `${BASE_URL}/about`, lastModified: new Date('2025-01-01') },
    { url: `${BASE_URL}/author/pietro-fiorillo`, lastModified: new Date('2025-01-01') },
    { url: `${BASE_URL}/contact`, lastModified: new Date('2025-01-01') },
    { url: `${BASE_URL}/authors`, lastModified: new Date('2025-01-01') },
    { url: `${BASE_URL}/tag`, lastModified: new Date() },
    { url: `${BASE_URL}/category/seo`, lastModified: new Date() },
    { url: `${BASE_URL}/category/ia`, lastModified: new Date() },
    { url: `${BASE_URL}/sobre/politica-editorial`, lastModified: new Date('2025-01-01') },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [articles, tagResults, authors] = await Promise.all([
        client.fetch<{ slug: string; updatedAt: string }[]>(
            `*[_type == "article"] | order(_updatedAt desc) { "slug": slug.current, "updatedAt": _updatedAt }`
        ),
        client.fetch<string[][]>(
            `*[_type == "article" && defined(tags)] { tags }.tags`
        ),
        client.fetch<{ slug: string }[]>(
            `*[_type == "author" && defined(slug.current)] { "slug": slug.current }`
        ),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
        url: `${BASE_URL}/article/${a.slug}`,
        lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
    }));

    // Deduplicate after normalization to prevent duplicate slugs from case variants (e.g. "google" / "Google")
    const normalizedTagMap = new Map<string, number>();
    tagResults.flat().forEach((t) => {
        const slug = t.toLowerCase().replace(/\s+/g, '-');
        normalizedTagMap.set(slug, (normalizedTagMap.get(slug) || 0) + 1);
    });
    // Tags with <3 posts are noindex on page-level metadata, so exclude them from sitemap.
    const tagRoutes: MetadataRoute.Sitemap = [...normalizedTagMap.entries()]
        .filter(([, count]) => count >= 3)
        .map(([slug]) => ({
        url: `${BASE_URL}/tag/${encodeURIComponent(slug)}`,
        lastModified: new Date(),
    }));

    const authorRoutes: MetadataRoute.Sitemap = authors.map((a) => ({
        url: `${BASE_URL}/author/${a.slug}`,
        lastModified: new Date(),
    }));

    return [...staticRoutes, ...authorRoutes, ...articleRoutes, ...tagRoutes];
}
