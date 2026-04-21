'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (!items || items.length === 0) return null;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      aria-labelledby="faq-heading"
      className="my-16"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="h-10 w-10 rounded-2xl bg-garfield-500 flex items-center justify-center text-white shadow-lg shadow-garfield-500/20 shrink-0">
          <HelpCircle size={20} strokeWidth={2.5} />
        </div>
        <h3
          id="faq-heading"
          className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight m-0"
        >
          Preguntas frecuentes
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'border-garfield-400 bg-white shadow-md shadow-garfield-500/10'
                  : 'border-slate-100 bg-slate-50 hover:border-slate-200'
              }`}
            >
              <button
                onClick={() => toggle(i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
              >
                <h4 className="text-base font-bold text-slate-900 leading-snug m-0">
                  {item.question}
                </h4>
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  className={`shrink-0 text-garfield-500 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-6 text-base text-slate-600 font-medium leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
