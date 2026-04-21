import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Shield, Search, Users, AlertCircle, RefreshCw, Mail } from 'lucide-react';

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Política Editorial — Soy Garfield',
  description:
    'Conoce cómo Soy Garfield crea, revisa y actualiza su contenido. Estándares editoriales, criterios de precisión, transparencia sobre IA y política de correcciones.',
  alternates: { canonical: `${BASE_URL}/sobre/politica-editorial` },
  openGraph: {
    title: 'Política Editorial — Soy Garfield',
    description:
      'Estándares editoriales, criterios de precisión, transparencia sobre IA y política de correcciones de Soy Garfield.',
    url: `${BASE_URL}/sobre/politica-editorial`,
    locale: 'es_AR',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/sobre/politica-editorial#webpage`,
      url: `${BASE_URL}/sobre/politica-editorial`,
      name: 'Política Editorial — Soy Garfield',
      description:
        'Estándares editoriales, criterios de precisión, transparencia sobre uso de IA y política de correcciones de Soy Garfield.',
      inLanguage: 'es',
      isPartOf: { '@id': `${BASE_URL}/#website` },
      breadcrumb: { '@id': `${BASE_URL}/sobre/politica-editorial#breadcrumb` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${BASE_URL}/sobre/politica-editorial#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Sobre Nosotros', item: `${BASE_URL}/about` },
        { '@type': 'ListItem', position: 3, name: 'Política Editorial', item: `${BASE_URL}/sobre/politica-editorial` },
      ],
    },
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Soy Garfield',
      url: BASE_URL,
      founder: {
        '@type': 'Person',
        name: 'Pietro Fiorillo',
        url: `${BASE_URL}/author/pietro-fiorillo`,
        sameAs: [
          'https://www.linkedin.com/in/pietrofiorillo/',
          'https://twitter.com/pietrofiorillo',
          'https://www.youtube.com/@thegarfieldofseo',
        ],
      },
    },
  ],
};

export default function PoliticaEditorialPage() {
  const lastUpdated = '21 de abril de 2026';

  return (
    <div className="min-h-screen bg-white pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* Hero */}
      <div className="bg-slate-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 bg-garfield-500 rounded-full opacity-10 blur-3xl" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <nav className="flex items-center text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-500 mb-10">
            <Link href="/" className="hover:text-white transition-colors">Inicio</Link>
            <ChevronRight size={14} className="mx-4 opacity-30" />
            <Link href="/about" className="hover:text-white transition-colors">Sobre nosotros</Link>
            <ChevronRight size={14} className="mx-4 opacity-30" />
            <span className="text-garfield-500">Política Editorial</span>
          </nav>
          <div className="inline-flex items-center gap-3 text-garfield-500 text-xs font-black uppercase tracking-[0.4em] mb-8">
            <Shield size={16} />
            Transparencia editorial
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 tracking-tighter">
            Política Editorial
          </h1>
          <p className="text-xl text-slate-400 font-medium leading-relaxed max-w-2xl">
            Cómo creamos, verificamos y actualizamos el contenido en Soy Garfield. Nuestro compromiso con la precisión, independencia y transparencia.
          </p>
          <p className="mt-8 text-xs text-slate-600 font-medium uppercase tracking-widest">
            Última actualización: {lastUpdated}
          </p>
        </div>
      </div>

      {/* Contenido */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

        {/* Misión */}
        <section className="mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-garfield-500 rounded-2xl flex items-center justify-center">
              <Search size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Nuestra misión editorial</h2>
              <p className="text-slate-600 leading-relaxed">
                Soy Garfield nació para cubrir el espacio que nadie ha reclamado en español: la intersección entre <strong>SEO técnico e inteligencia artificial</strong>. No somos un medio de clickbait ni de opinión sin datos — somos un laboratorio de ideas donde cada artículo parte de evidencia real, experimentos propios o fuentes primarias verificables.
              </p>
            </div>
          </div>
          <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <p className="text-slate-700 font-medium leading-relaxed">
              <strong>Propuesta de valor:</strong> El único medio en español que trata el SEO desde la óptica de la IA — no solo cómo Google funciona hoy, sino cómo va a funcionar mañana. Escribimos para SEOs intermedios y avanzados que necesitan profundidad técnica, no resúmenes de blog corporativo.
            </p>
          </div>
        </section>

        {/* Criterios de publicación */}
        <section className="mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
              <Shield size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Criterios de publicación</h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                Todo contenido publicado en Soy Garfield debe cumplir los siguientes requisitos antes de ser aprobado:
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Precisión factual', body: 'Los datos, estadísticas y afirmaciones técnicas deben estar respaldados por fuentes verificables: documentación oficial de Google, estudios con metodología clara, o experimentos con datos propios.' },
              { title: 'Profundidad técnica', body: 'Rechazamos el contenido superficial. Cada artículo debe aportar un análisis original, no una reescritura de lo que ya existe. Si otro medio lo ha cubierto mejor, no lo publicamos.' },
              { title: 'Actualidad', body: 'El SEO y la IA cambian rápido. Priorizamos contenido cuya vigencia podemos garantizar al menos 6 meses, y marcamos explícitamente cuándo algo puede quedar obsoleto.' },
              { title: 'Atribución de autoría', body: 'Todo artículo lleva byline visible. Ningún contenido se publica de forma anónima. Los autores colaboradores deben tener experiencia práctica demostrable en el tema que tratan.' },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-3xl p-8 border-2 border-slate-100 hover:border-garfield-200 transition-colors">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Transparencia sobre IA */}
        <section className="mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-garfield-500 rounded-2xl flex items-center justify-center">
              <AlertCircle size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Transparencia sobre el uso de IA</h2>
            </div>
          </div>
          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-8 mb-6">
            <p className="text-amber-900 font-medium leading-relaxed">
              <strong>Posición clara:</strong> En Soy Garfield usamos herramientas de IA como asistentes de investigación y revisión, nunca como sustitutos del criterio editorial humano.
            </p>
          </div>
          <div className="prose prose-slate max-w-none">
            <ul className="space-y-4 list-none pl-0">
              {[
                'Los artículos son escritos, revisados y aprobados por personas con experiencia real en el tema.',
                'Las herramientas de IA pueden usarse para estructurar borradores o verificar coherencia, pero el análisis y las conclusiones son siempre del autor.',
                'Cuando un artículo use datos generados o asistidos por IA, se indicará explícitamente.',
                'No publicamos contenido masivo generado íntegramente por IA. La calidad sobre el volumen.',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-600">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-garfield-100 text-garfield-600 flex items-center justify-center text-xs font-black">{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Proceso editorial */}
        <section className="mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center">
              <Users size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Proceso editorial</h2>
              <p className="text-slate-600 leading-relaxed">
                Cada artículo pasa por un proceso de revisión antes de publicarse:
              </p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { step: '01', title: 'Propuesta y brief', body: 'El autor o el equipo editorial define el ángulo del artículo, el público objetivo, las fuentes primarias y el objetivo informacional.' },
              { step: '02', title: 'Redacción con fuentes', body: 'El artículo se redacta citando fuentes verificables. Los datos deben ser comprobables por el lector.' },
              { step: '03', title: 'Revisión editorial', body: 'Pietro Fiorillo o un editor designado revisa la precisión técnica, el tono y la alineación con los estándares de la publicación.' },
              { step: '04', title: 'Publicación y metadatos', body: 'Se añaden fecha de publicación, fecha de actualización (si aplica), categorías y etiquetas. La autoría es siempre visible.' },
              { step: '05', title: 'Mantenimiento', body: 'Los artículos de mayor tráfico se revisan trimestralmente. Los afectados por cambios de algoritmo se actualizan con prioridad alta.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="flex-shrink-0 text-3xl font-black text-garfield-500 opacity-40">{item.step}</span>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Política de correcciones */}
        <section className="mb-20">
          <div className="flex items-start gap-6 mb-8">
            <div className="flex-shrink-0 w-12 h-12 bg-garfield-500 rounded-2xl flex items-center justify-center">
              <RefreshCw size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Política de correcciones</h2>
              <p className="text-slate-600 leading-relaxed">
                Nos equivocamos. Cuando ocurre, lo reconocemos sin eufemismos.
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">Errores menores</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Erratas, datos incorrectos secundarios o afirmaciones imprecisas se corrigen directamente en el artículo. Se añade una nota al pie con la fecha de corrección y la descripción del cambio.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">Errores sustanciales</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Si el error afecta a la conclusión principal del artículo, se añade un recuadro destacado al inicio del artículo explicando el error, la corrección y la fecha. No se borran artículos para esconder errores.
              </p>
            </div>
            <div className="bg-white border-2 border-slate-100 rounded-3xl p-8">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-3">Retirada de contenido</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Solo retiramos contenido si ha resultado ser fundamentalmente incorrecto y no tiene valor histórico para los lectores, o si infringe derechos de terceros. En ese caso, explicamos por qué el contenido fue retirado.
              </p>
            </div>
          </div>
        </section>

        {/* Independencia y conflictos de interés */}
        <section className="mb-20">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-6">Independencia y conflictos de interés</h2>
          <div className="prose prose-slate max-w-none space-y-4 text-slate-600">
            <p>
              Soy Garfield puede incluir enlaces de afiliado a herramientas SEO. Cuando esto ocurre, lo indicamos en el artículo con la etiqueta <strong>"enlace de afiliado"</strong>. Los ingresos de afiliación no influyen en el contenido editorial ni en las conclusiones de los análisis.
            </p>
            <p>
              Las reseñas de herramientas son independientes. Si una empresa nos facilita acceso gratuito a su herramienta para una reseña, lo indicamos. Un acceso gratuito no garantiza una valoración positiva.
            </p>
            <p>
              Pietro Fiorillo presta servicios de consultoría SEO. Las opiniones expresadas en Soy Garfield son personales y no constituyen asesoramiento contratado.
            </p>
          </div>
        </section>

        {/* Contacto */}
        <section>
          <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 h-40 w-40 bg-garfield-500 rounded-full opacity-20 blur-3xl" />
            <div className="flex items-start gap-6 relative z-10">
              <Mail size={28} className="text-garfield-500 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-black tracking-tighter mb-4">¿Detectaste un error o tienes una queja editorial?</h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  Escríbenos a través del formulario de contacto. Nos comprometemos a responder en un plazo máximo de 5 días hábiles.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-garfield-500 hover:bg-garfield-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all"
                >
                  Contactar al equipo editorial
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
