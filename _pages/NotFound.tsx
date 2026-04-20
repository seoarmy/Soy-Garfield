import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <SEO
        title="404 — Página no encontrada"
        description="La página que buscas no existe."
      />
      <div className="text-center">
        <p className="text-[0.65rem] font-black text-garfield-500 uppercase tracking-[0.4em] mb-4">Error 404</p>
        <h1 className="text-6xl font-black text-slate-900 mb-4">Página no encontrada</h1>
        <p className="text-slate-500 mb-8 max-w-md">La URL que visitaste no existe o fue movida.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[0.65rem] font-black uppercase tracking-widest hover:bg-garfield-600 transition-all"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
