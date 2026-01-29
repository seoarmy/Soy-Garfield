import React, { useState } from 'react';
import { WriterForm } from '../types';
import { Send, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Write: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<WriterForm>({
    fullName: '',
    email: '',
    linkedinUrl: '',
    topicProposal: '',
    sampleContent: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">¡Solicitud recibida!</h2>
          <p className="text-slate-500 mb-6">Gracias por tu interés en escribir para SoyGarfield. Revisaremos tu propuesta y te responderemos en menos de 48 horas.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600 mb-4">
            Únete al equipo
          </span>
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">Escribe en SoyGarfield</h1>
          <p className="mt-4 text-slate-500">
            Comparte tu experiencia con nuestra comunidad de SEOs y especialistas en marketing.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-12 border border-gray-100">
          <div className="space-y-8">
            {/* Personal Info */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                  placeholder="tu@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="linkedinUrl" className="block text-sm font-medium text-slate-700 mb-1">Perfil de LinkedIn</label>
              <input
                type="url"
                name="linkedinUrl"
                id="linkedinUrl"
                value={formData.linkedinUrl}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div>
              <label htmlFor="topicProposal" className="block text-sm font-medium text-slate-900 mb-2">Propuesta de tema / Titular</label>
              <input
                type="text"
                name="topicProposal"
                id="topicProposal"
                required
                value={formData.topicProposal}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                placeholder="ej: El futuro del link building..."
              />
            </div>

            <div>
              <label htmlFor="sampleContent" className="block text-sm font-medium text-slate-700 mb-2">Muestra de escritura (Intro)</label>
              <textarea
                name="sampleContent"
                id="sampleContent"
                rows={4}
                value={formData.sampleContent}
                onChange={handleInputChange}
                className="block w-full rounded-xl border-gray-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-garfield-500 focus:bg-white focus:ring-garfield-500 sm:text-sm transition-colors"
                placeholder="Pega el primer párrafo de tu artículo propuesto aquí..."
              />
            </div>

            {/* File Upload */}
            <div>
              <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700 mb-2">Subir CV/Portfolio (Opcional)</label>
              <input
                type="file"
                id="file-upload"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-garfield-50 file:text-garfield-700 hover:file:bg-garfield-100"
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white transition-all hover:bg-slate-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-garfield-500 focus:ring-offset-2"
              >
                Enviar solicitud <Send size={18} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Write;