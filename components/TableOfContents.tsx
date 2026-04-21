'use client';

import React, { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

interface Props {
  items: TocItem[];
}

export function extractTocItems(content: any[]): TocItem[] {
  if (!Array.isArray(content)) return [];
  const items: TocItem[] = [];
  for (const block of content) {
    if (block._type === 'block' && (block.style === 'h2' || block.style === 'h3')) {
      const text = block.children?.map((c: any) => c.text).join('') || '';
      if (!text) continue;
      const id = text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      items.push({ id, text, level: block.style === 'h2' ? 2 : 3 });
    }
  }
  return items;
}

export default function TableOfContents({ items }: Props) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!items.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <nav
      aria-label="Tabla de contenidos"
      className="my-10 rounded-[2rem] border border-slate-100 bg-slate-50 p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="h-9 w-9 rounded-xl bg-garfield-500 flex items-center justify-center text-white shadow-md shadow-garfield-500/20 shrink-0">
          <List size={18} strokeWidth={2.5} />
        </div>
        <h2 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] m-0 p-0 border-none">
          Índice de contenidos
        </h2>
      </div>
      <ol className="space-y-1 list-none m-0 p-0">
        {items.map(({ id, text, level }) => (
          <li key={id} className={level === 3 ? 'pl-5' : ''}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(id);
                if (el) {
                  const y = el.getBoundingClientRect().top + window.scrollY - 100;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}
              className={`block py-1.5 text-sm font-semibold leading-snug transition-colors duration-200 no-underline ${
                activeId === id
                  ? 'text-garfield-600'
                  : 'text-slate-500 hover:text-slate-900'
              } ${level === 3 ? 'text-[0.8rem]' : ''}`}
            >
              {level === 3 && (
                <span className="inline-block w-3 h-px bg-slate-300 mr-2 align-middle" />
              )}
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
