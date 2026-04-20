import type { Metadata } from 'next';
import Script from 'next/script';
import '../index.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://soygarfield.com'),
  title: { default: 'Soy Garfield — SEO & IA', template: '%s | Soy Garfield' },
  description: 'El medio de referencia para dominar el futuro del marketing digital con noticias de última hora y estrategias avanzadas de IA.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Soy Garfield',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SSDCBZCNRV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-SSDCBZCNRV');
        `}</Script>
      </head>
      <body className="flex min-h-screen flex-col bg-white font-sans text-slate-900">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
