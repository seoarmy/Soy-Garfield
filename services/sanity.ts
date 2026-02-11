import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'f3fmo00w',
    dataset: 'production',
    useCdn: false, // Set to false to see changes instantly
    apiVersion: '2024-02-10',
    withCredentials: false,
});

// Added a simple debug tool
console.log('Sanity Client Initialized with Project ID:', client.config().projectId);

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
    if (!source || !source.asset) return null;
    return builder.image(source);
}
