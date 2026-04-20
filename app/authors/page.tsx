import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Users, ArrowRight } from 'lucide-react';
import { getAllAuthors } from '../../services/authorService';

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Nuestro Equipo de Expertos',
  description: 'Conoce a los especialistas en SEO e IA que crean contenido de autoridad para Soy Garfield.',
  alternates: { canonical: `${BASE_URL}/authors` },
};

export default async function AuthorsPage() {
  const authors = await getAllAuthors();

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL }, { '@type': 'ListItem', position: 2, name: 'Expertos', item: `${BASE_URL}/authors` }] },
      { '@type': 'CollectionPage', name: 'Equipo de Autores', description: 'Especialistas en SEO e Inteligencia Artificial' },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 lg:py-24 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-garfield-50 border border-garfield-100 mb-6">
            <Users size={20} className="text-garfield-600" />
            <span className="text-[0.65rem] font-black text-garfield-600 uppercase tracking-[0.4em]">Equipo Editorial</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 sm:text-7xl tracking-tighter mb-6">Nuestros Expertos</h1>
          <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">Especialistas en SEO e Inteligencia Artificial creando contenido de autoridad.</p>
        </div>

        {authors.length === 0 ? (
          <div className="text-center py-20">
            <Users size={64} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Próximamente más autores</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {authors.map((author) => (
              <Link key={author.slug} href={`/author/${author.slug}`} className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 hover:border-garfield-200 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className="p-8">
                  <div className="relative mb-6">
                    <div className="h-24 w-24 mx-auto overflow-hidden rounded-2xl bg-garfield-500 flex items-center justify-center shadow-lg relative">
                      {author.image ? (
                        <Image src={author.image} alt={author.name} fill sizes="96px" className="object-cover" />
                      ) : (
                        <span className="text-4xl font-black text-white">{author.name.charAt(0)}</span>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-garfield-600 transition-colors">{author.name}</h3>
                    <p className="text-sm font-bold text-garfield-600 uppercase tracking-widest mb-4">{author.role}</p>
                    {author.description && <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">{author.description}</p>}
                    {author.skills?.slice(0, 3).map(skill => (
                      <span key={skill} className="inline-block mr-1 mb-1 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">{skill}</span>
                    ))}
                    <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-garfield-600 transition-colors mt-4">
                      Ver perfil <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-24 text-center">
          <div className="inline-block p-8 md:p-12 rounded-3xl bg-slate-900 text-white max-w-3xl">
            <h2 className="text-3xl font-black mb-4">¿Quieres escribir con nosotros?</h2>
            <p className="text-slate-300 mb-8 text-lg">Buscamos expertos en SEO e IA para colaborar en nuestro medio.</p>
            <Link href="/write" className="inline-flex items-center gap-2 bg-garfield-500 hover:bg-garfield-600 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all">
              Únete al equipo <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
