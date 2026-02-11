import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, ArrowRight, Loader2 } from 'lucide-react';
import SEO from '../components/SEO';
import { Author, getAllAuthors } from '../services/authorService';

const Authors: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAuthors = async () => {
            setLoading(true);
            try {
                const data = await getAllAuthors();
                setAuthors(data);
            } catch (error) {
                console.error('Error fetching authors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAuthors();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <Loader2 className="animate-spin text-garfield-500" size={48} />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50/50 py-12 lg:py-24 pb-32">
            <SEO
                title="Nuestro Equipo de Expertos"
                description="Conoce a los especialistas en SEO e IA que crean contenido de autoridad para Soy Garfield."
                schemaData={{
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    "name": "Equipo de Autores",
                    "description": "Especialistas en SEO e Inteligencia Artificial"
                }}
            />

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 lg:mb-24">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-garfield-50 border border-garfield-100 mb-6">
                        <Users size={20} className="text-garfield-600" />
                        <span className="text-[0.65rem] font-black text-garfield-600 uppercase tracking-[0.4em]">
                            Equipo Editorial
                        </span>
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 sm:text-7xl tracking-tighter mb-6">
                        Nuestros Expertos
                    </h1>
                    <p className="mt-4 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
                        Especialistas en SEO e Inteligencia Artificial creando contenido de autoridad.
                    </p>
                </div>

                {/* Authors Grid */}
                {authors.length === 0 ? (
                    <div className="text-center py-20">
                        <Users size={64} className="mx-auto text-slate-300 mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">
                            Próximamente más autores
                        </h2>
                        <p className="text-slate-500">
                            Estamos construyendo nuestro equipo de expertos.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authors.map((author) => (
                            <Link
                                key={author.slug}
                                to={`/author/${author.slug}`}
                                className="group relative overflow-hidden rounded-3xl bg-white border border-slate-100 hover:border-garfield-200 transition-all hover:shadow-2xl hover:-translate-y-1"
                            >
                                {/* Card Content */}
                                <div className="p-8">
                                    {/* Avatar */}
                                    <div className="relative mb-6">
                                        <div className="h-24 w-24 mx-auto overflow-hidden rounded-2xl bg-garfield-500 flex items-center justify-center shadow-lg">
                                            {author.image ? (
                                                <img
                                                    src={author.image}
                                                    alt={author.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-4xl font-black text-white">
                                                    {author.name.charAt(0)}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="text-center">
                                        <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-garfield-600 transition-colors">
                                            {author.name}
                                        </h3>
                                        <p className="text-sm font-bold text-garfield-600 uppercase tracking-widest mb-4">
                                            {author.role}
                                        </p>
                                        {author.description && (
                                            <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {author.description}
                                            </p>
                                        )}

                                        {/* Skills */}
                                        {author.skills && author.skills.length > 0 && (
                                            <div className="flex flex-wrap justify-center gap-2 mb-6">
                                                {author.skills.slice(0, 3).map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                                {author.skills.length > 3 && (
                                                    <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-400">
                                                        +{author.skills.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* CTA */}
                                        <div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 group-hover:text-garfield-600 transition-colors">
                                            Ver perfil
                                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                                        </div>
                                    </div>
                                </div>

                                {/* Decorative gradient */}
                                <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 rounded-full bg-garfield-500/5 blur-3xl transition-all group-hover:bg-garfield-500/10" />
                            </Link>
                        ))}
                    </div>
                )}

                {/* CTA Section */}
                <div className="mt-24 text-center">
                    <div className="inline-block p-8 md:p-12 rounded-3xl bg-slate-900 text-white max-w-3xl">
                        <h2 className="text-3xl font-black mb-4">¿Quieres escribir con nosotros?</h2>
                        <p className="text-slate-300 mb-8 text-lg">
                            Buscamos expertos en SEO e IA para colaborar en nuestro medio.
                        </p>
                        <Link
                            to="/write"
                            className="inline-flex items-center gap-2 bg-garfield-500 hover:bg-garfield-600 text-white px-8 py-4 rounded-2xl text-sm font-black uppercase tracking-widest transition-all hover:shadow-2xl"
                        >
                            Únete al equipo
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authors;
