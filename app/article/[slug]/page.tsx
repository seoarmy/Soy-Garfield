import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticleBySlug, getArticles } from '../../../services/articleService';
import ArticleClient from './ArticleClient';

export const revalidate = 60;
export const dynamicParams = true;

const BASE_URL = 'https://soygarfield.com';
const categorySlugMap: Record<string, string> = { 'SEO': 'seo', 'IA': 'ia', 'Social Media': 'social-media', 'Analítica': 'analitica' };

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: 'Artículo no encontrado' };

  return {
    title: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    keywords: article.tags?.join(', '),
    alternates: { canonical: `${BASE_URL}/article/${article.slug}` },
    openGraph: {
      type: 'article',
      url: `${BASE_URL}/article/${article.slug}`,
      title: article.seoTitle || article.title,
      description: article.seoDescription || article.excerpt,
      images: [{ url: article.imageUrl, width: 1200, height: 628 }],
      publishedTime: article.date,
      authors: [article.author],
      locale: 'es_AR',
    },
    twitter: { card: 'summary_large_image', title: article.seoTitle || article.title },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const [article, allArticles] = await Promise.all([
    getArticleBySlug(slug),
    getArticles(),
  ]);

  if (!article) notFound();

  const relatedArticles = allArticles.filter(a => a.category === article.category && a.slug !== slug).slice(0, 2);
  const sidebarArticles = allArticles.filter(a => a.slug !== slug).slice(0, 3);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['NewsArticle', 'Article'],
        headline: article.seoTitle || article.title,
        image: { '@type': 'ImageObject', url: article.imageUrl, width: 1200, height: 675 },
        author: { '@type': 'Person', name: article.author, url: `${BASE_URL}/author/${article.authorSlug || 'pietro-fiorillo'}` },
        publisher: {
          '@type': 'Organization',
          '@id': `${BASE_URL}/#organization`,
          name: 'Soy Garfield',
          logo: { '@type': 'ImageObject', url: `${BASE_URL}/SOY-garfiel-logo.png`, width: 600, height: 60 },
        },
        datePublished: article.date,
        dateModified: (article as any).updatedAt || article.date,
        description: article.seoDescription || article.excerpt,
        isAccessibleForFree: 'True',
        inLanguage: 'es',
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', 'h2'] },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/article/${article.slug}` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: article.category, item: `${BASE_URL}/category/${categorySlugMap[article.category] || article.category.toLowerCase()}` },
          { '@type': 'ListItem', position: 3, name: article.title, item: `${BASE_URL}/article/${article.slug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ArticleClient article={article} relatedArticles={relatedArticles} sidebarArticles={sidebarArticles} />
    </>
  );
}
