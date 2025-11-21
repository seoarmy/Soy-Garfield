import React from 'react';
import { MapPin, Briefcase, Mail, Code, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Background */}
      <div className="h-64 w-full bg-gradient-to-r from-garfield-50 to-slate-100"></div>
      
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-32">
        <div className="relative rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 ring-1 ring-slate-100 sm:p-12">
          
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <div className="h-32 w-32 overflow-hidden rounded-2xl bg-slate-200 ring-4 ring-white shadow-lg">
                {/* Placeholder for Garfield */}
                <img 
                  src="https://picsum.photos/seed/garfield-orange/400/400" 
                  alt="Garfield" 
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">Garfield</h1>
                  <p className="text-lg font-medium text-garfield-600">SEO Expert & AI Engineer</p>
                </div>
                <div className="hidden sm:block">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                        <span className="h-2.5 w-2.5 rounded-full bg-orange-500"></span>
                    </span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <MapPin size={16} />
                  <span>Digital Nomad</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={16} />
                  <span>Founder, SoyGarfield</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  <span>hello@soygarfield.com</span>
                </div>
              </div>

              <div className="mt-8 prose prose-slate">
                <p className="text-slate-600 leading-relaxed">
                  Hi, I'm Garfield. I live at the intersection of search algorithms and artificial intelligence. 
                  With over a decade of experience in technical SEO, I pivoted early to AI Engineering to understand how 
                  Large Language Models (LLMs) reconstruct the way we find information.
                </p>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  My favorite color is orange (obviously), and my mission is simple: to deconstruct complex digital marketing 
                  concepts and rebuild them with data-driven, AI-enhanced strategies.
                </p>
              </div>

              {/* Skills Section */}
              <div className="mt-8 border-t border-gray-100 pt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 mb-4">Core Competencies</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="mb-2 flex items-center gap-2 text-garfield-600">
                      <TrendingUp size={20} />
                      <span className="font-semibold text-slate-900">Advanced SEO</span>
                    </div>
                    <p className="text-sm text-slate-500">Technical audits, schema markup, and semantic search optimization.</p>
                  </div>
                  <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="mb-2 flex items-center gap-2 text-garfield-600">
                      <Code size={20} />
                      <span className="font-semibold text-slate-900">AI Engineering</span>
                    </div>
                    <p className="text-sm text-slate-500">Prompt engineering, RAG implementation, and LLM fine-tuning.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;