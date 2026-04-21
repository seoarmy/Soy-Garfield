import { client, discoverImageUrl, squareThumbUrl } from './sanity';
import { Article } from '../types';

export const getArticles = async (): Promise<Article[]> => {
  const query = `*[_type == "article"] | order(date desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "author": author->name,
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorImage": author->image.asset->url,
    "authorBio": author->description,
    date,
    "_updatedAt": _updatedAt,
    category,
    readTime,
    tags,
    "imageUrl": mainImage.asset->url,
    isFeatured,
    content
  }`;

  try {
    const results = await client.fetch(query);
    return results.map((a: Article & { imageUrl?: string; authorImage?: string }) => ({
      ...a,
      imageUrl: discoverImageUrl(a.imageUrl),
      authorImage: squareThumbUrl(a.authorImage),
    }));
  } catch (err) {
    console.error('Sanity Fetch Error (getArticles):', err);
    return [];
  }
};

export const getArticleBySlug = async (slug: string): Promise<Article | null> => {
  const query = `*[_type == "article" && slug.current == $slug][0] {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "author": author->name,
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorImage": author->image.asset->url,
    "authorBio": author->description,
    "authorLinkedIn": author->socials.linkedin,
    "authorTwitter": author->socials.twitter,
    date,
    "updatedAt": _updatedAt,
    category,
    readTime,
    tags,
    "imageUrl": mainImage.asset->url,
    "imageWidth": mainImage.asset->metadata.dimensions.width,
    "imageHeight": mainImage.asset->metadata.dimensions.height,
    "seoTitle": coalesce(seoTitle, title),
    "seoDescription": coalesce(seoDescription, excerpt),
    isFeatured,
    content,
    faq
  }`;

  try {
    const result = await client.fetch(query, { slug });
    if (!result) return null;
    return {
      ...result,
      imageUrl: discoverImageUrl(result.imageUrl),
      authorImage: squareThumbUrl(result.authorImage),
    };
  } catch (err) {
    console.error('Sanity Fetch Error (getArticleBySlug):', err);
    return null;
  }
};

export const getArticlesByTag = async (tag: string): Promise<Article[]> => {
  const query = `*[_type == "article" && $tag in tags] | order(date desc) {
    "id": _id,
    title,
    "slug": slug.current,
    excerpt,
    "author": author->name,
    "authorSlug": author->slug.current,
    "authorRole": author->role,
    "authorImage": author->image.asset->url,
    "authorBio": author->description,
    date,
    "_updatedAt": _updatedAt,
    category,
    readTime,
    tags,
    "imageUrl": mainImage.asset->url,
    isFeatured,
    content
  }`;

  try {
    const results = await client.fetch(query, { tag } as Record<string, unknown>);
    return results.map((a: Article & { imageUrl?: string; authorImage?: string }) => ({
      ...a,
      imageUrl: discoverImageUrl(a.imageUrl),
      authorImage: squareThumbUrl(a.authorImage),
    }));
  } catch (err) {
    console.error('Sanity Fetch Error (getArticlesByTag):', err);
    return [];
  }
};

export const getAllTags = async (): Promise<string[]> => {
  try {
    const tags: string[][] = await client.fetch(
      `*[_type == "article" && defined(tags)] { tags }.tags`,
    );
    return [...new Set(tags.flat())].sort();
  } catch (err) {
    console.error('Sanity Fetch Error (getAllTags):', err);
    return [];
  }
};
