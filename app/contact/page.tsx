import type { Metadata } from 'next';
import ContactForm from './ContactForm';

const BASE_URL = 'https://soygarfield.com';

export const metadata: Metadata = {
  title: 'Contacto',
  description: '¿Tienes preguntas sobre SEO o IA? Ponte en contacto con nosotros para consultorías o colaboraciones.',
  alternates: { canonical: `${BASE_URL}/contact` },
};

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Contacto', item: `${BASE_URL}/contact` },
      ],
    },
    {
      '@type': 'ContactPage',
      name: 'Contacto - Soy Garfield',
      url: `${BASE_URL}/contact`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${BASE_URL}/#organization`,
        name: 'Soy Garfield',
        email: 'marketing@manyadigital.com.ar',
      },
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ContactForm />
    </>
  );
}
