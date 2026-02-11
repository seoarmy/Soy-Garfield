import { client } from './sanity';

export interface Author {
    name: string;
    slug: string;
    role: string;
    image: string;
    description: string;
    skills: string[];
    biography: any[];
    socials: {
        linkedin?: string;
        twitter?: string;
        instagram?: string;
        email?: string;
    };
    externalPublications: Array<{
        title: string;
        medium: string;
        date: string;
        link: string;
    }>;
    seoTitle?: string;
    seoDescription?: string;
}

export const getAuthorBySlug = async (slug: string): Promise<Author | null> => {
    const query = `*[_type == "author" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    role,
    "image": image.asset->url,
    description,
    skills,
    biography,
    socials,
    externalPublications,
    seoTitle,
    seoDescription
  }`;
    return await client.fetch(query, { slug });
};

export const getAllAuthors = async (): Promise<Author[]> => {
    const query = `*[_type == "author"] {
    name,
    "slug": slug.current,
    role,
    "image": image.asset->url,
    description,
    skills,
    biography,
    socials,
    externalPublications,
    seoTitle,
    seoDescription
  }`;
    return await client.fetch(query);
};
