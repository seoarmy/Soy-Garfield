import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Conoce cómo protegemos tus datos personales en Soy Garfield.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">Política de Privacidad</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-6">
          <p>En SoyGarfield nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información personal.</p>
          <h2 className="text-2xl font-bold text-slate-900">Datos que recopilamos</h2>
          <p>Recopilamos información que nos proporcionas directamente, como tu nombre y correo electrónico cuando te suscribes a nuestra newsletter o nos envías un mensaje de contacto.</p>
          <h2 className="text-2xl font-bold text-slate-900">Uso de la información</h2>
          <p>Utilizamos tu información para enviarte actualizaciones editoriales y responder a tus consultas. No vendemos ni compartimos tus datos con terceros sin tu consentimiento.</p>
          <h2 className="text-2xl font-bold text-slate-900">Contacto</h2>
          <p>Para ejercer tus derechos de acceso, rectificación o eliminación, escríbenos a <a href="mailto:marketing@manyadigital.com.ar" className="text-garfield-600 underline">marketing@manyadigital.com.ar</a>.</p>
        </div>
        <div className="mt-12">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-garfield-600 hover:text-garfield-700">← Volver al inicio</Link>
        </div>
      </div>
    </div>
  );
}
