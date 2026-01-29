import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Términos de Servicio</h1>
          <p className="text-slate-500">Última actualización: {new Date().toLocaleDateString('es-ES')}</p>
        </div>

        <div className="prose prose-slate max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-garfield-600 prose-a:no-underline hover:prose-a:underline">
          <p className="lead">
            Lea detenidamente estos Términos de Servicio ("Términos", "Términos de Servicio") antes de utilizar el sitio web SoyGarfield (el "Servicio") operado por SoyGarfield ("nosotros", "nuestro" o "la web").
          </p>
          <p>
            Su acceso y uso del Servicio está condicionado a su aceptación y cumplimiento de estos Términos. Estos Términos se aplican a todos los visitantes, usuarios y otras personas que accedan o utilicen el Servicio.
          </p>

          <h2>1. Propiedad Intelectual</h2>
          <p>
            El Servicio y su contenido original, características y funcionalidad son y seguirán siendo propiedad exclusiva de SoyGarfield y sus licenciantes. El Servicio está protegido por derechos de autor, marcas registradas y otras leyes tanto de España como de otros países.
          </p>

          <h2>2. Enlaces a otros sitios web</h2>
          <p>
            Nuestro Servicio puede contener enlaces a sitios web o servicios de terceros que no pertenecen ni están controlados por SoyGarfield.
          </p>
          <p>
            SoyGarfield no tiene control ni asume ninguna responsabilidad por el contenido, las políticas de privacidad o las prácticas de los sitios web o servicios de terceros. Además, reconoce y acepta que SoyGarfield no será responsable, directa o indirectamente, de ningún daño o pérdida causados o supuestamente causados por o en relación con el uso o la confianza en dicho contenido, bienes o servicios disponibles en o a través de dichos sitios web o servicios.
          </p>

          <h2>3. Conducta del usuario</h2>
          <p>
            Usted acepta no utilizar el sitio web para ningún propósito ilegal o cualquier propósito prohibido bajo esta cláusula. Usted acepta no utilizar el sitio web de ninguna manera que pueda dañar el sitio web, los servicios o el negocio general de SoyGarfield.
          </p>
          <ul>
            <li>No debe acosar, abusar o amenazar a otros ni violar los derechos legales de ninguna persona.</li>
            <li>No debe violar ningún derecho de propiedad intelectual del sitio web ni de terceros.</li>
            <li>No debe cargar ni difundir de ninguna otra manera virus informáticos u otro software que pueda dañar la propiedad de otros.</li>
          </ul>

          <h2>4. Descargo de responsabilidad</h2>
          <p>
            El uso del Servicio es bajo su propio riesgo. El Servicio se proporciona "TAL CUAL" y "SEGÚN DISPONIBILIDAD". El Servicio se proporciona sin garantías de ningún tipo, ya sean expresas o implícitas.
          </p>

          <h2>5. Limitación de responsabilidad</h2>
          <p>
            En ningún caso SoyGarfield, ni sus directores, empleados, socios, agentes, proveedores o afiliados, serán responsables de ningún daño indirecto, incidental, especial, consecuente o punitivo, incluyendo, sin limitación, la pérdida de beneficios, datos, uso, fondo de comercio u otras pérdidas intangibles, resultantes de su acceso o uso o de su incapacidad para acceder o utilizar el Servicio.
          </p>

          <h2>6. Cambios</h2>
          <p>
            Nos reservamos el derecho, a nuestra exclusiva discreción, de modificar o reemplazar estos Términos en cualquier momento. Si una revisión es sustancial, intentaremos proporcionar un aviso de al menos 30 días antes de que entren en vigor los nuevos términos.
          </p>

          <h2>7. Contáctenos</h2>
          <p>
            Si tiene alguna pregunta sobre estos Términos, contáctenos en <a href="mailto:hello@soygarfield.com">hello@soygarfield.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;