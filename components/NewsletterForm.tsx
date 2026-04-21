'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function NewsletterForm({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? 'success' : 'error');
      if (res.ok) setEmail('');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return <p className={`font-black uppercase tracking-widest text-sm ${variant === 'light' ? 'text-garfield-500' : 'text-garfield-400 mb-8'}`}>¡Suscrito! Revisa tu bandeja de entrada.</p>;
  }

  const inputClass = variant === 'light'
    ? 'flex-1 rounded-2xl border border-slate-200 bg-white px-6 py-4 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-garfield-500 transition-all outline-none'
    : 'flex-1 rounded-2xl border-transparent bg-white/10 px-6 py-4 text-white placeholder-slate-500 focus:bg-white/20 focus:ring-2 focus:ring-garfield-500 transition-all outline-none';

  const formClass = variant === 'light'
    ? 'flex flex-col gap-3 mb-4'
    : 'flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-8';

  return (
    <>
      <form onSubmit={handleSubmit} className={formClass}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Tu mejor email"
          className={inputClass}
        />
        <button
          type="submit"
          disabled={status === 'sending'}
          className="rounded-2xl bg-garfield-500 px-8 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-garfield-600 transition-all shadow-lg active:scale-95 disabled:opacity-70"
        >
          {status === 'sending' ? 'Enviando...' : <span>Suscribirse <ArrowRight size={18} className="inline ml-1" /></span>}
        </button>
      </form>
      {status === 'error' && (
        <p className="text-red-400 text-sm mb-4">Error al suscribir. Escríbenos a <a href="mailto:marketing@manyadigital.com.ar" className="underline">marketing@manyadigital.com.ar</a></p>
      )}
    </>
  );
}
