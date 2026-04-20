import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PortableText } from '@portabletext/react';
import { Linkedin, Mail, Twitter, Instagram, ExternalLink, ArrowRight, FileText } from 'lucide-react';
import { getAuthorBySlug } from '../../services/authorService';
import { getArticles } from '../../services/articleService';
import ArticleCard from '../../components/ArticleCard';

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Sobre Pietro Fiorillo',
  description: 'Consultor estratégico de SEO e IA. Experto en posicionamiento y marketing digital.',
  alternates: { canonical: `${BASE_URL}/about` },
};

export default async function AboutPage() {
  const [author, allArticles] = await Promise.all([
    getAuthorBySlug('pietro-fiorillo'),
    getArticles(),
  ]);

  if (!author) notFound();

  const articles = allArticles.filter(a => a.author === author.name);

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
          { '@type': 'ListItem', position: 2, name: 'Sobre Mí', item: `${BASE_URL}/about` },
        ],
      },
      {
        '@type': 'ProfilePage',
        mainEntity: {
          '@type': 'Person',
          name: author.name,
          jobTitle: author.role,
          description: author.description || '',
          url: `${BASE_URL}/about`,
          image: author.image || '',
          inLanguage: 'es',
          knowsAbout: ['Search Engine Optimization', 'Generative Engine Optimization', 'SEO Técnico', 'SEO Local', 'Inteligencia Artificial aplicada al Marketing'],
          sameAs: ['https://www.linkedin.com/in/pietrofiorillo/', 'https://www.instagram.com/theseoarmy/'].filter(Boolean),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-16 text-white shadow-2xl">
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-garfield-500/10 blur-[100px]"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="relative mb-8">
              <div className="h-40 w-40 md:h-48 md:w-48 overflow-hidden rounded-full border-4 border-white shadow-2xl bg-garfield-500 relative">
                {author.image && <Image src={author.image} alt={author.name} fill sizes="192px" className="object-cover" />}
              </div>
              <div className="mt-6 flex justify-center gap-4">
                {author.socials?.linkedin && <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"><Linkedin size={20} /></a>}
                {author.socials?.email && <a href={`mailto:${author.socials.email}`} className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"><Mail size={20} /></a>}
                {author.socials?.twitter && <a href={author.socials.twitter} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"><Twitter size={20} /></a>}
                {author.socials?.instagram && <a href={author.socials.instagram} target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10"><Instagram size={20} /></a>}
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">{author.name}</h1>
            <p className="text-xl md:text-2xl font-medium text-slate-300 mb-8 max-w-2xl">{author.role}{author.description ? `. ${author.description}` : ''}</p>
            {author.skills?.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3">
                {author.skills.map(skill => <span key={skill} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-200">{skill}</span>)}
              </div>
            )}
          </div>
        </div>
      </section>

      {author.biography && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-4xl font-bold text-slate-900">Biografía</h2>
            <div className="h-1 w-24 bg-garfield-500 rounded-full"></div>
          </div>
          <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-relaxed">
            <PortableText value={author.biography} />
          </div>
        </section>
      )}

      {articles.length > 0 && (
        <section className="bg-slate-50 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-slate-900 mb-12">Artículos de {author.name.split(' ')[0]}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {articles.map(article => <ArticleCard key={article.id} article={article} />)}
            </div>
          </div>
        </section>
      )}

      {author.externalPublications?.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-10 border-b border-gray-100 pb-4 flex items-center gap-3">
            <FileText className="text-garfield-500" size={24} />
            Publicaciones en otros medios
          </h2>
          <div className="space-y-6">
            {author.externalPublications.map((pub, i) => (
              <a key={i} href={pub.link} target="_blank" rel="noopener noreferrer" className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 hover:border-garfield-200 hover:shadow-lg transition-all">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-garfield-600 transition-colors mb-1">{pub.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    <span className="font-semibold text-slate-700">{pub.medium}</span>
                    <span>•</span>
                    <span>{pub.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-garfield-500 transition-colors uppercase tracking-widest mt-4 sm:mt-0">
                  Leer artículo <ExternalLink size={16} />
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {author.socials?.linkedin && (
            <a href={author.socials.linkedin} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-[#0077B5] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl">
              <div className="relative z-10">
                <Linkedin size={48} className="mb-6 opacity-30" />
                <h3 className="text-3xl font-bold mb-2">Conecta en LinkedIn</h3>
                <p className="text-blue-100 mb-8 max-w-xs">Sígueme para ver actualizaciones diarias sobre estrategia digital y SEO.</p>
                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">Seguir perfil <ArrowRight size={18} /></span>
              </div>
            </a>
          )}
          {author.socials?.instagram && (
            <a href={author.socials.instagram} target="_blank" rel="noopener noreferrer" className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl">
              <div className="relative z-10">
                <Instagram size={48} className="mb-6 opacity-30" />
                <h3 className="text-3xl font-bold mb-2">Sígueme en Instagram</h3>
                <p className="text-white/80 mb-8 max-w-xs">Un vistazo detrás de cámaras en proyectos y nomadismo digital.</p>
                <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">Seguir perfil <ArrowRight size={18} /></span>
              </div>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}
