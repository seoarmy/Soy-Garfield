import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="text-center">
        <p className="text-[0.65rem] font-black uppercase tracking-[0.4em] text-garfield-600 mb-4">Error 404</p>
        <h1 className="text-6xl sm:text-8xl font-black text-slate-900 mb-6 tracking-tighter">Página no encontrada</h1>
        <p className="text-lg text-slate-500 max-w-md mx-auto mb-10">La página que buscas no existe o fue movida.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[0.6rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
