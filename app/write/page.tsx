import type { Metadata } from 'next';
import WriteForm from './WriteForm';

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Colabora con Nosotros',
  description: 'Únete al equipo editorial de Soy Garfield. Buscamos expertos en SEO e IA que quieran compartir su conocimiento.',
  alternates: { canonical: `${BASE_URL}/write` },
  robots: { index: false, follow: false },
};

export default function WritePage() {
  return <WriteForm />;
}
