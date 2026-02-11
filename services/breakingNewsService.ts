import { client } from './sanity';

export interface BreakingNews {
    _id: string;
    title: string;
    slug: string;
    summary: string;
    category: string;
    publishedAt: string;
    expiresAt?: string;
    isActive: boolean;
    priority: number;
    relatedArticle?: {
        slug: string;
        title: string;
    };
    externalLink?: string;
}

export const getBreakingNews = async (): Promise<BreakingNews[]> => {
    const now = new Date().toISOString();
    const query = `*[_type == "breakingNews" && isActive == true && publishedAt <= $now && (expiresAt == null || expiresAt > $now)] | order(priority desc, publishedAt desc) [0...5] {
    "_id": _id,
    title,
    "slug": slug.current,
    summary,
    category,
    publishedAt,
    expiresAt,
    isActive,
    priority,
    "relatedArticle": relatedArticle->{
      "slug": slug.current,
      title
    },
    externalLink
  }`;

    try {
        const results = await client.fetch(query, { now });
        console.log('Breaking News fetched:', results.length);
        return results;
    } catch (err) {
        console.error('Error fetching breaking news:', err);
        return [];
    }
};
