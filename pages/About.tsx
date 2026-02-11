import React from 'react';
import {
  Linkedin,
  Mail,
  Twitter,
  Instagram,
  ExternalLink,
  ArrowRight,
  FileText,
  MessageCircle,
  TrendingUp,
  Cpu,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import ArticleCard from '../components/ArticleCard';
import { Category, Article } from '../types';

// Mock articles by Pietro
const pietroArticles: Article[] = [
  {
    id: 'pietro-1',
    title: 'Estrategia de SEO Técnico para E-commerce en 2025',
    excerpt: 'Cómo optimizar la arquitectura de información y el crawl budget para tiendas con miles de productos.',
    author: 'Pietro Fiorillo',
    date: 'Jan 15, 2025',
    category: Category.SEO,
    readTime: '12 min read',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&auto=format&fit=crop&q=60',
    content: [],
  },
  {
    id: 'pietro-2',
    title: 'El Impacto de Social Media en las señales de búsqueda',
    excerpt: '¿Realmente ayudan los shares a rankear mejor? Desmitificando los factores de ranking social.',
    author: 'Pietro Fiorillo',
    date: 'Dec 20, 2024',
    category: Category.SOCIAL,
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1611162147679-51f3ef92d42a?q=80&w=2072&auto=format&fit=crop',
    content: [],
  },
  {
    id: 'pietro-3',
    title: 'Analítica Avanzada: Más allá de GA4',
    excerpt: 'Configuración de tracking server-side y modelos de atribución personalizados para marketing digital.',
    author: 'Pietro Fiorillo',
    date: 'Nov 10, 2024',
    category: Category.ANALYTICS,
    readTime: '15 min read',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60',
    content: [],
  }
];

const externalPublications = [
  {
    title: 'Optimización de búsqueda en un mundo multi-plataforma',
    medium: 'Digital Journal',
    date: '2024',
    link: '#'
  },
  {
    title: 'El futuro del marketing de contenidos',
    medium: 'Tech Trends',
    date: '2023',
    link: '#'
  }
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <SEO
        title="Sobre Pietro Fiorillo"
        description="Director de Marketing y Consultor de SEO Técnico. Conoce la trayectoria de Pietro Fiorillo y su enfoque estratégico."
        schemaData={{
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "mainEntity": {
            "@type": "Person",
            "name": "Pietro Fiorillo",
            "jobTitle": "Director de Marketing & Consultor de SEO Técnico",
            "description": "Estratega digital enfocado en el crecimiento a través de datos y tecnología.",
            "url": "https://soygarfield.com/about",
            "image": "https://soygarfield.com/assets/pietro.png",
            "sameAs": [
              "https://linkedin.com/in/pietrofiorillo",
              "https://twitter.com/pietrofiorillo"
            ]
          }
        }}
      />

      {/* --- HERO SECTION --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 md:p-16 text-white shadow-2xl">
          {/* Decorative gradients */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 h-96 w-96 rounded-full bg-garfield-500/10 blur-[100px]"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 h-96 w-96 rounded-full bg-blue-500/10 blur-[100px]"></div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="relative mb-8">
              <div className="h-40 w-40 md:h-48 md:48 overflow-hidden rounded-full border-4 border-white shadow-2xl">
                <img
                  src="/assets/pietro.png"
                  alt="Pietro Fiorillo"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Social Icons Float */}
              <div className="mt-6 flex justify-center gap-4">
                <a href="https://linkedin.com/in/pietrofiorillo" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                  <Linkedin size={20} />
                </a>
                <a href="mailto:hello@soygarfield.com" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                  <Mail size={20} />
                </a>
                <a href="https://twitter.com/pietrofiorillo" target="_blank" rel="noopener noreferrer" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all text-white border border-white/10">
                  <Twitter size={20} />
                </a>
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Pietro Fiorillo</h1>
            <p className="text-xl md:text-2xl font-medium text-slate-300 mb-8 max-w-2xl">
              Director de Marketing & Consultor de SEO Técnico.
              Estratega digital enfocado en el crecimiento a través de datos y tecnología.
            </p>

            {/* Specializations */}
            <div className="flex flex-wrap justify-center gap-3">
              {['SEO Técnico', 'Analítica Web', 'Marketing Digital', 'Growth Strategy', 'Web Performance'].map((skill) => (
                <span
                  key={skill}
                  className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-slate-200 backdrop-blur-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BIOGRAPHY & STATS --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          <div className="lg:col-span-12">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-4xl font-bold text-slate-900 font-serif">Biografía</h2>
              <div className="h-1 w-24 bg-garfield-500 rounded-full"></div>
            </div>

            <div className="prose prose-xl prose-slate max-w-none text-slate-600 leading-relaxed">
              <p className="mb-6">
                Como <strong>Director de Marketing</strong> y apasionado por la tecnología, he dedicado mi carrera a descifrar los algoritmos que mueven la economía digital. Mi enfoque combina la <strong>rigurosidad analítica</strong> con la <strong>creatividad estratégica</strong>, permitiendo que marcas de todos los tamaños escalen su visibilidad de manera sostenible.
              </p>
              <p className="mb-6">
                Especializado en <strong>SEO Técnico y Arquitectura de Datos</strong>, entiendo que una web rápida y bien estructurada es el cimiento de cualquier éxito online. A través de <strong>SoyGarfield</strong>, busco democratizar el conocimiento avanzado en marketing, ofreciendo una perspectiva fresca y pragmática sobre las últimas tendencias del sector.
              </p>
              <p>
                Actualmente, lidero proyectos de transformación digital donde la <strong>optimización de la conversión (CRO)</strong> y la <strong>experiencia de usuario</strong> son pilares fundamentales para alcanzar objetivos de negocio reales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- ARTICLES GRID --- */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-4xl font-bold text-slate-900">Últimos Artículos</h2>
                <span className="flex items-center justify-center h-8 w-8 rounded-full bg-slate-200 text-xs font-bold text-slate-600">
                  {pietroArticles.length}
                </span>
              </div>
              <p className="text-lg text-slate-500">Perspectivas y análisis sobre el mundo digital.</p>
            </div>
            <Link to="/category/seo" className="hidden sm:flex items-center gap-2 text-sm font-bold text-garfield-600 hover:text-garfield-700 uppercase tracking-widest transition-colors">
              Ver todo el blog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {pietroArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* --- EXTERNAL PUBLICATIONS --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-2xl font-bold text-slate-900 mb-10 border-b border-gray-100 pb-4 flex items-center gap-3">
          <FileText className="text-garfield-500" size={24} />
          Publicaciones en otros medios
        </h2>

        <div className="space-y-6">
          {externalPublications.map((pub, i) => (
            <a
              key={i}
              href={pub.link}
              className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 hover:border-garfield-200 hover:shadow-lg transition-all"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-garfield-600 transition-colors mb-1">{pub.title}</h3>
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{pub.medium}</span>
                  <span>•</span>
                  <span>{pub.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-garfield-500 transition-colors uppercase tracking-widest">
                Leer artículo <ExternalLink size={16} />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* --- CONTACT CARDS --- */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/pietrofiorillo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-[#0077B5] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl"
          >
            <div className="relative z-10">
              <Linkedin size={48} className="mb-6 opacity-30" />
              <h3 className="text-3xl font-bold mb-2">Conecta en LinkedIn</h3>
              <p className="text-blue-100 mb-8 max-w-xs">Sígueme para ver actualizaciones diarias sobre estrategia digital y SEO.</p>
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                Seguir perfil <ArrowRight size={18} />
              </span>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-[60px]"></div>
          </a>

          {/* Instagram Card */}
          <a
            href="https://instagram.com/pietrofiorillo"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-[2rem] bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] p-10 text-white transition-transform hover:-translate-y-1 shadow-xl"
          >
            <div className="relative z-10">
              <Instagram size={48} className="mb-6 opacity-30" />
              <h3 className="text-3xl font-bold mb-2">Sígueme en Instagram</h3>
              <p className="text-white/80 mb-8 max-w-xs">Un vistazo detrás de cámaras en proyectos y nomadismo digital.</p>
              <span className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm">
                Seguir perfil <ArrowRight size={18} />
              </span>
            </div>
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-white/10 blur-[60px]"></div>
          </a>
        </div>
      </section>

    </div>
  );
};

export default About;