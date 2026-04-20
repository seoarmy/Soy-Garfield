'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Send, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ContactForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        window.scrollTo(0, 0);
      } else throw new Error();
    } catch {
      alert('Error al enviar. Por favor escríbenos directamente a marketing@manyadigital.com.ar');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Mensaje enviado!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en menos de 24 horas.</p>
          <button onClick={() => router.push('/')} className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-colors">
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">Comencemos una conversación</h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">¿Tienes alguna pregunta sobre SEO, una propuesta de colaboración o simplemente quieres saludar?</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Información de contacto</h2>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-garfield-50 flex items-center justify-center text-garfield-600"><Mail size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Escríbenos</h3>
                  <a href="mailto:marketing@manyadigital.com.ar" className="text-garfield-600 font-semibold hover:text-garfield-700">marketing@manyadigital.com.ar</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600"><MessageSquare size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Redes Sociales</h3>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/theseoarmy/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors font-medium text-sm">Instagram</a>
                    <a href="https://es.linkedin.com/in/pietrofiorillo" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors font-medium text-sm">LinkedIn</a>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600"><MapPin size={24} /></div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Ubicación</h3>
                  <p className="text-slate-500 text-sm">Agencia digital con base en España.<br />Actualmente en: <span className="font-medium text-slate-900">Madrid, España</span></p>
                </div>
              </div>
            </div>
            <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white">
              <h3 className="font-bold text-xl mb-2">¿Necesitas una Auditoría SEO?</h3>
              <p className="text-slate-300 text-sm mb-6 max-w-xs">Obtén un análisis exhaustivo del rendimiento de tu sitio.</p>
              <Link href="/write" className="inline-flex items-center text-sm font-bold text-white hover:text-garfield-400 transition-colors">Solicitar Auditoría <ArrowRight size={16} className="ml-2" /></Link>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                  <input type="text" name="name" id="name" required value={formData.name} onChange={handleChange} className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white outline-none transition-all" placeholder="Tu nombre" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input type="email" name="email" id="email" required value={formData.email} onChange={handleChange} className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white outline-none transition-all" placeholder="tu@empresa.com" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                <select name="subject" id="subject" value={formData.subject} onChange={handleChange} className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white outline-none appearance-none transition-all">
                  <option value="" disabled>Selecciona un tema...</option>
                  <option value="Editorial">Consulta Editorial</option>
                  <option value="Partnership">Colaboración / Publicidad</option>
                  <option value="Consulting">Consultoría SEO</option>
                  <option value="Other">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                <textarea name="message" id="message" rows={6} required value={formData.message} onChange={handleChange} className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white outline-none resize-none transition-all" placeholder="¿En qué podemos ayudarte?" />
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex items-center justify-center gap-2 rounded-xl bg-garfield-500 px-8 py-4 text-base font-bold text-white transition-all hover:bg-garfield-600 hover:shadow-lg disabled:opacity-70">
                {isSubmitting ? 'Enviando...' : <><span>Enviar Mensaje</span><Send size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
