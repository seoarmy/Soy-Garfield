import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags } from '../../services/articleService';

const BASE_URL = 'https://soygarfield.com';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Etiquetas',
  description: 'Explora todas las etiquetas editoriales de Soy Garfield.',
  alternates: { canonical: `${BASE_URL}/tag` },
};

function tagToSlug(tag: string): string {
  return encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'));
}

function tagToLabel(tag: string): string {
  return tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ');
}

export default async function TagIndexPage() {
  const tags = await getAllTags();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${BASE_URL}/tag#collection`,
    url: `${BASE_URL}/tag`,
    name: 'Etiquetas de Soy Garfield',
    inLanguage: 'es',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: tags.map((tag, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: tagToLabel(tag),
        url: `${BASE_URL}/tag/${tagToSlug(tag)}`,
      })),
    },
  };

  return (
    <main className="min-h-screen bg-white py-16 lg:py-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">Etiquetas</h1>
        <p className="text-slate-500 mb-10">Navega por todos los temas que cubre Soy Garfield.</p>

        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <Link
              key={tag}
              href={`/tag/${tagToSlug(tag)}`}
              className="inline-flex items-center rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-garfield-500 hover:text-garfield-600 transition-colors"
            >
              #{tagToLabel(tag)}
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
