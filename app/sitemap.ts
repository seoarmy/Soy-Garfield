import { MetadataRoute } from 'next';
import { client } from '../services/sanity';

export const revalidate = 3600; // regenerar cada hora

const BASE_URL = 'https://soygarfield.com';

const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE_URL}/about`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/authors`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE_URL}/category/seo`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/category/ia`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/sobre/politica-editorial`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const [articles, tagResults] = await Promise.all([
        client.fetch<{ slug: string; updatedAt: string }[]>(
            `*[_type == "article"] | order(_updatedAt desc) { "slug": slug.current, "updatedAt": _updatedAt }`
        ),
        client.fetch<string[][]>(
            `*[_type == "article" && defined(tags)] { tags }.tags`
        ),
    ]);

    const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
        url: `${BASE_URL}/article/${a.slug}`,
        lastModified: a.updatedAt ? new Date(a.updatedAt) : new Date(),
        changeFrequency: 'monthly',
        priority: 0.9,
    }));

    const allTags = [...new Set(tagResults.flat())];
    const tagRoutes: MetadataRoute.Sitemap = allTags.map((tag) => ({
        url: `${BASE_URL}/tag/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [...staticRoutes, ...articleRoutes, ...tagRoutes];
}
