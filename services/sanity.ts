import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'f3fmo00w',
    dataset: 'production',
    useCdn: false,
    apiVersion: '2024-02-10',
    withCredentials: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    if (!source || !source.asset) return null;
    return builder.image(source);
}

/** Sanity image URL optimized for Google Discover (1200×628, WebP, 16:9) */
export function discoverImageUrl(rawUrl: string | null | undefined): string {
    if (!rawUrl) return '';
    // Append Sanity CDN transformation params
    return `${rawUrl}?w=1200&h=628&fit=crop&fm=webp&q=85`;
}

/** Thumbnail for compact cards (400×225, WebP) */
export function thumbImageUrl(rawUrl: string | null | undefined): string {
    if (!rawUrl) return '';
    return `${rawUrl}?w=400&h=225&fit=crop&fm=webp&q=80`;
}

/** Small square thumbnail for compact sidebar (200×200) */
export function squareThumbUrl(rawUrl: string | null | undefined): string {
    if (!rawUrl) return '';
    return `${rawUrl}?w=200&h=200&fit=crop&fm=webp&q=75`;
}
