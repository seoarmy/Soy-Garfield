import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4 py-20">
        <div className="max-w-md w-full bg-slate-50 rounded-3xl p-10 text-center border border-slate-100 shadow-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
            <CheckCircle size={40} />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">¡Mensaje enviado!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Gracias por contactarnos. Hemos recibido tu mensaje y te responderemos en menos de 24 horas.
          </p>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-xl bg-slate-900 px-6 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-slate-50 border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <span className="inline-block rounded-full bg-garfield-100 px-3 py-1 text-xs font-bold text-garfield-600 uppercase tracking-wider mb-6">
            Ponte en contacto
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
            Comencemos una conversación
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            ¿Tienes alguna pregunta sobre SEO, una propuesta de colaboración o simplemente quieres saludar?
            Nos encantaría saber de ti.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contact Info & Context */}
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Información de contacto</h2>
            <p className="text-slate-600 mb-10 leading-relaxed">
              Ya sea que busques consultoría para tu próximo proyecto digital o necesites claridad sobre la última actualización de Google,
              nuestra bandeja de entrada siempre está abierta para otros especialistas en marketing.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-garfield-50 flex items-center justify-center text-garfield-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Escríbenos</h3>
                  <p className="text-slate-500 text-sm mb-2">Para consultas generales y propuestas editoriales.</p>
                  <a href="mailto:hello@soygarfield.com" className="text-garfield-600 font-semibold hover:text-garfield-700">
                    hello@soygarfield.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Redes Sociales</h3>
                  <p className="text-slate-500 text-sm mb-2">Síguenos para actualizaciones en tiempo real.</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors font-medium text-sm">Twitter</a>
                    <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors font-medium text-sm">LinkedIn</a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">Ubicación</h3>
                  <p className="text-slate-500 text-sm">
                    Nómada digital con base global.<br />
                    Actualmente en: <span className="font-medium text-slate-900">Tokio, Japón</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="font-bold text-xl mb-2">¿Necesitas una Auditoría SEO?</h3>
                <p className="text-slate-300 text-sm mb-6 max-w-xs">
                  Obtén un análisis exhaustivo del rendimiento de tu sitio por nuestro equipo.
                </p>
                <a href="/write" className="inline-flex items-center text-sm font-bold text-white hover:text-garfield-400 transition-colors">
                  Solicitar Auditoría <ArrowRight size={16} className="ml-2" />
                </a>
              </div>
              <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-1/4 translate-y-1/4">
                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="100" fill="white" />
                </svg>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 transition-all outline-none"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 transition-all outline-none"
                    placeholder="tu@empresa.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">Asunto</label>
                <select
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Selecciona un tema...</option>
                  <option value="Editorial">Consulta Editorial</option>
                  <option value="Partnership">Colaboración / Publicidad</option>
                  <option value="Consulting">Consultoría SEO</option>
                  <option value="Other">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                <textarea
                  name="message"
                  id="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 transition-all outline-none resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-garfield-500 px-8 py-4 text-base font-bold text-white transition-all hover:bg-garfield-600 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                {!isSubmitting && <Send size={18} />}
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;