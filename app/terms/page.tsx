import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description: 'Términos y condiciones de uso de Soy Garfield.',
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Términos de Servicio</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          <p>Al acceder y utilizar SoyGarfield, aceptas los presentes términos de servicio. Si no estás de acuerdo, por favor no utilices este sitio.</p>
          <h2 className="text-2xl font-bold text-slate-900">Propiedad intelectual</h2>
          <p>Todo el contenido publicado en SoyGarfield — artículos, imágenes y elementos de diseño — es propiedad de SoyGarfield o de sus respectivos autores. Queda prohibida su reproducción sin autorización previa.</p>
          <h2 className="text-2xl font-bold text-slate-900">Uso del sitio</h2>
          <p>El contenido de este sitio es únicamente para fines informativos. No constituye asesoramiento profesional. SoyGarfield no se responsabiliza por decisiones tomadas a partir del contenido publicado.</p>
          <h2 className="text-2xl font-bold text-slate-900">Contacto</h2>
          <p>Para cualquier consulta, escríbenos a <a href="mailto:marketing@manyadigital.com.ar" className="text-garfield-600 underline">marketing@manyadigital.com.ar</a>.</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-garfield-600 hover:text-garfield-700">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
